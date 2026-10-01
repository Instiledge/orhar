// ORHAR — Service Worker for offline caching
const CACHE_NAME = 'orhar-cache-v22';

const LOCALIZED_SCREEN_MODULES = {
    en: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary'],
    fr: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary'],
    es: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary'],
    de: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary'],
    it: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary'],
    pt: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary'],
    pl: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary']
};
const LOCALIZED_SCREEN_ASSETS = Object.entries(LOCALIZED_SCREEN_MODULES).flatMap(([locale, modules]) =>
    modules.map(module => `/screenshots/locales/${locale}/app-${module}-2026.webp`)
);
const LOCALIZED_NEWSLETTER_QR = ['en','fr','es','de','it','pt','pl'].map(code => `/${code}/qr-subscribe-${code}.png`);
const LOCALIZED_QUIZ_BUNDLES = ['en','fr','es','de','it','pt','pl'].map(code => `/assets/quiz/bundle_${code}.json`);

const ASSETS_TO_CACHE = [
    ...['en','fr','es','de','it','pt','pl'].flatMap(code => [`/${code}/index.html`, `/${code}/preview.html`, `/${code}/appdemo.html`, `/${code}/app.html`, `/${code}/actuality.html`]),
    '/preview.html',
    '/app.html',
    '/action.html',
    '/updates.html',
    '/contact.html',
    '/footer.html',
    '/privacy.html',
    '/terms.html',
    '/licenses.html',
    '/404.html',
    '/manifest.json',
    '/actuality-data.json',
    '/site.css',
    '/legacy-layout.css',
    '/site.js',
    '/logo.png',
    '/assets/background_light.webp',
    '/assets/background_dark.webp',
    '/og-image.png',
    '/icon-192.png',
    '/icon-512.png',
    '/apple-touch-icon.png',
    '/favicon.ico',
    '/favicon-96x96.png',
    '/assets/sounds/correct.mp3',
    '/assets/sounds/wrong.mp3',
    '/screenshots/app-home-2026.webp',
    '/screenshots/app-bible-2026.webp',
    '/screenshots/app-parobible-2026.webp',
    '/screenshots/app-reader-2026.webp',
    '/screenshots/app-my-path-2026.webp',
    '/screenshots/app-books-2026.webp',
    '/screenshots/app-meditbrary-2026.webp',
    '/screenshots/app-voices-2026.webp',
    '/screenshots/app-chapters-2026.webp',
    '/screenshots/app-notes-2026.webp',
    '/screenshots/app-bookmarks-2026.webp',
    ...LOCALIZED_NEWSLETTER_QR,
    ...LOCALIZED_QUIZ_BUNDLES,
    ...LOCALIZED_SCREEN_ASSETS
];

// Install event — cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('ORHAR: Caching assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .catch((error) => {
                console.log('ORHAR: Cache failed for some assets', error);
            })
    );
    // Activate immediately
    self.skipWaiting();
});

// Activate event — clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('ORHAR: Deleting old cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event — serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip Firebase Auth requests
    if (event.request.url.includes('firebase') || 
        event.request.url.includes('googleapis') ||
        event.request.url.includes('gstatic')) {
        return;
    }

    // Skip POST requests, video streaming, and API calls
    if (event.request.method !== 'GET' || 
        event.request.url.match(/\.(mp4|webm)$/i) || 
        event.request.headers.get('range')) {
        return;
    }

    // Pages must update promptly after a release; retain cache only as offline fallback.
    if (event.request.mode === 'navigate') {
        event.respondWith(fetch(event.request).then(async response => {
            if (response.redirected && response.url) {
                const finalResponse = await fetch(response.url, { cache: 'reload' });
                if (finalResponse.ok && finalResponse.type === 'basic' && !finalResponse.redirected) {
                    const copy = finalResponse.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
                }
                return finalResponse;
            }

            if (response.ok && response.type === 'basic' && !response.redirected) {
                const copy = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
            }
            return response;
        }).catch(() => caches.match(event.request).then(cached => {
            if (cached && !cached.redirected) return cached;
            return caches.match('/404.html');
        })));
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache non-success responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                        return response;
                    })
                    .catch(() => {
                        // If both cache and network fail, show 404 for navigation requests
                        if (event.request.mode === 'navigate') {
                            return caches.match('/404.html');
                        }
                        return null;
                    });
            })
    );
});
