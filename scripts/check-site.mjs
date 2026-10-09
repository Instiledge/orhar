import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { localizedScreenshotPaths } from './secondary-pages.mjs';

const root = resolve(import.meta.dirname, '..');
const languages = ['en','fr','es','de','it','pt','pl'];
const serviceWorker = readFileSync(resolve(root,'service-worker.js'),'utf8');
const sharedScript = readFileSync(resolve(root,'site.js'),'utf8');
const headers = readFileSync(resolve(root,'_headers'),'utf8');
const oldShots = ['bible-reader.jpg','bible-versions.jpg','home-daily-verse.jpg','notes.jpg','quiz.jpg','random-verse.jpg','reading-plan.jpg','spiritual-books.jpg'];
let checks = 0;
function assert(condition, message) { if (!condition) throw new Error(message); checks++; }
for (const code of languages) {
  for (const page of ['index.html','preview.html','app.html','actuality.html','appdemo.html']) {
    const fullPath = resolve(root, code, page);
    const html = readFileSync(fullPath, 'utf8');
    assert(html.includes(`<html lang="${code}">`), `${code}/${page}: language missing`);
    assert(html.includes('/site.js?v=29'), `${code}/${page}: shared header/footer script missing`);
    assert(html.includes(`/${code}/preview.html`), `${code}/${page}: gallery link missing`);
    if (page !== 'app.html') assert(html.includes(`/${code}/app.html`), `${code}/${page}: app link missing`);
    assert(!oldShots.some(name => html.includes(name)), `${code}/${page}: old screenshot linked`);
    for (const image of html.matchAll(/src="(\/screenshots\/[^"?]+)"/g)) {
      assert(existsSync(resolve(root, image[1].slice(1))), `${code}/${page}: missing ${image[1]}`);
    }
  }
  const appdemo = readFileSync(resolve(root,code,'appdemo.html'),'utf8');
  assert(appdemo.includes(`/assets/videos/${code}/teaser.mp4`), `${code}/appdemo.html: localized mp4 teaser missing`);
  assert(appdemo.includes(`/assets/videos/${code}/reader.mp4`), `${code}/appdemo.html: localized mp4 reader missing`);
  assert(appdemo.includes(`/assets/videos/${code}/reader.webm`), `${code}/appdemo.html: localized webm reader missing`);
  assert(appdemo.includes('id="quizCard"'), `${code}/appdemo.html: quizCard widget missing`);
  assert(appdemo.includes('AudioObject'), `${code}/appdemo.html: AudioObject schema missing`);
  assert(appdemo.includes('VideoObject'), `${code}/appdemo.html: VideoObject schema missing`);
  assert(appdemo.includes('BreadcrumbList'), `${code}/appdemo.html: BreadcrumbList schema missing`);
  assert(appdemo.includes('google-play-app'), `${code}/appdemo.html: google-play-app meta missing`);
  assert(appdemo.includes('/assets/audio/garden_of_god_ambient.mp3'), `${code}/appdemo.html: Garden of God audio missing`);
  assert(appdemo.includes('/assets/audio/piano_sacre_ambient.mp3'), `${code}/appdemo.html: Piano Sacre audio missing`);
  assert(!appdemo.includes('/assets/audio/evening_prayer_ambient.mp3'), `${code}/appdemo.html: legacy short loop retained`);
  assert(!appdemo.includes('/assets/audio/romantic_piano_masterpiece.mp3'), `${code}/appdemo.html: legacy piano demo retained`);
  const home = readFileSync(resolve(root,code,'index.html'),'utf8');
  assert(home.includes('id="faq"'), `${code}: FAQ section missing`);
  assert(home.includes('href="#faq"'), `${code}: FAQ nav link missing`);
  assert(home.includes('FAQPage'), `${code}: FAQPage JSON-LD schema missing`);
  assert(home.includes('google-play-app'), `${code}: google-play-app meta missing`);
  assert(home.includes(`/assets/videos/${code}/teaser.mp4`), `${code}: localized mp4 teaser missing`);
  assert(home.includes(`/assets/videos/${code}/teaser.webm`), `${code}: localized webm teaser missing`);
  assert(existsSync(resolve(root, 'assets', 'videos', code, 'teaser.mp4')), `${code}: teaser.mp4 missing on disk`);
  assert(existsSync(resolve(root, 'assets', 'videos', code, 'teaser.webm')), `${code}: teaser.webm missing on disk`);
  assert(existsSync(resolve(root, 'assets', 'videos', code, 'reader.mp4')), `${code}: reader.mp4 missing on disk`);
  assert(existsSync(resolve(root, 'assets', 'videos', code, 'reader.webm')), `${code}: reader.webm missing on disk`);
  assert((home.match(/class="feature reveal"/g)||[]).length===13, `${code}: module grid incomplete`);
  const gallery = readFileSync(resolve(root,code,'preview.html'),'utf8');
  assert((gallery.match(/class="shot reveal"/g)||[]).length===Object.keys(localizedScreenshotPaths[code]).length, `${code}: localized gallery incomplete`);
  for (const [module, path] of Object.entries(localizedScreenshotPaths[code])) {
    assert(path.startsWith(`/screenshots/locales/${code}/`), `${code}: ${module} image not localized`);
    assert(gallery.includes(`src="${path}"`), `${code}: ${module} image missing from gallery`);
    const cachedModules = new RegExp(`\\b${code}: \\[([^\\]]+)\\]`).exec(serviceWorker)?.[1] ?? '';
    assert(cachedModules.includes(`'${module}'`), `${code}: ${module} image missing from offline cache`);
  }
  assert(Object.hasOwn(localizedScreenshotPaths[code], 'quiz'), `${code}: quiz screenshot missing`);
  assert(Object.hasOwn(localizedScreenshotPaths[code], 'plan'), `${code}: reading-plan screenshot missing`);
  assert(Object.hasOwn(localizedScreenshotPaths[code], 'home'), `${code}: home screenshot missing`);
  assert(Object.hasOwn(localizedScreenshotPaths[code], 'mypath'), `${code}: mypath screenshot missing`);
  assert(Object.hasOwn(localizedScreenshotPaths[code], 'meditbrary'), `${code}: meditbrary screenshot missing`);
  assert(!Object.hasOwn(localizedScreenshotPaths[code], 'prayers'), `${code}: prayers should not appear in the gallery`);
  assert(!gallery.includes('/screenshots/app-home-2026.webp'), `${code}: shared Home image found in localized gallery`);
  assert(!gallery.includes('/screenshots/app-quiz-2026.webp'), `${code}: account-specific quiz image found`);
  const news = readFileSync(resolve(root,code,'actuality.html'),'utf8');
  assert((news.match(/class="news-card reveal"/g)||[]).length===4, `${code}: news incomplete`);
  assert(news.includes('BreadcrumbList'), `${code}/actuality.html: BreadcrumbList schema missing`);
  assert(news.includes('google-play-app'), `${code}/actuality.html: google-play-app meta missing`);
  if (code !== 'en') assert(!home.includes('A home shaped around today'), `${code}: English fallback found`);
}
for (const name of oldShots) assert(!existsSync(resolve(root,'screenshots',name)), `Old screenshot retained: ${name}`);
for (const page of ['404.html','action.html','contact.html','privacy.html','terms.html','licenses.html']) {
  const html = readFileSync(resolve(root,page),'utf8');
  assert(html.includes('/legacy-layout.css'), `${page}: shared layout missing`);
  assert(html.includes('/site.js?v=29'), `${page}: shared header/footer script missing`);
  assert(html.includes('class="logo-container"'), `${page}: brand link missing`);
}
assert(readFileSync(resolve(root,'updates.html'),'utf8').includes('/actuality.html'), 'Updates route does not lead to current news');
const rootIndex = readFileSync(resolve(root,'index.html'),'utf8');
assert(rootIndex.includes('http-equiv="refresh"'), 'root index.html: meta refresh missing');
assert(rootIndex.includes('google-play-app'), 'root index.html: google-play-app meta missing');
const sitemap = readFileSync(resolve(root,'sitemap.xml'),'utf8');
assert(sitemap.includes('appdemo.html'), 'sitemap.xml: appdemo.html missing');
assert(existsSync(resolve(root,'assets/audio/garden_of_god_ambient.mp3')), 'Garden of God audio file missing');
assert(existsSync(resolve(root,'assets/audio/piano_sacre_ambient.mp3')), 'Piano Sacre audio file missing');
assert(serviceWorker.includes("orhar-cache-v24"), 'Service worker cache version is stale');
assert(sharedScript.includes("updateViaCache: 'none'"), 'Service worker update must bypass HTTP cache');
assert(sharedScript.includes("/service-worker.js?v=24"), 'Service worker URL must be release-versioned');
assert(sharedScript.includes("controllerchange"), 'Service worker activation must refresh the current page');
assert(headers.includes('/service-worker.js') && headers.includes('no-cache, no-store, must-revalidate'), 'Service worker cache headers are not strict enough');
console.log(`ORHAR static checks passed: ${checks} assertions across 7 languages.`);
