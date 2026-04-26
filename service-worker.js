// ORHAR — Service Worker for offline caching
const CACHE_NAME = 'orhar-cache-v1';

const ASSETS_TO_CACHE = [
    '/',
    '/en/',
    '/fr/',
    '/es/',
    '/de/',
    '/it/',
    '/pt/',
    '/pl/',
    '/updates.html',
    '/index.html',
    '/contact.html',
    '/privacy.html',
    '/terms.html',
    '/licenses.html',
    '/404.html',
    '/manifest.json',
    '/logo.png',
    '/og-image.png',
    '/icon-192.png',
    '/icon-512.png',
    '/apple-touch-icon.png',
    '/favicon.ico',
    '/favicon-96x96.png',
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Work+Sans:wght@400;500;600&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
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

    // Skip POST requests and API calls
    if (event.request.method !== 'GET') {
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
