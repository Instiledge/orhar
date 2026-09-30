import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { localizedScreenshotPaths } from './secondary-pages.mjs';

const root = resolve(import.meta.dirname, '..');
const languages = ['en','fr','es','de','it','pt','pl'];
const serviceWorker = readFileSync(resolve(root,'service-worker.js'),'utf8');
const oldShots = ['bible-reader.jpg','bible-versions.jpg','home-daily-verse.jpg','notes.jpg','quiz.jpg','random-verse.jpg','reading-plan.jpg','spiritual-books.jpg'];
let checks = 0;
function assert(condition, message) { if (!condition) throw new Error(message); checks++; }
for (const code of languages) {
  for (const page of ['index.html','preview.html','app.html','actuality.html']) {
    const fullPath = resolve(root, code, page);
    const html = readFileSync(fullPath, 'utf8');
    assert(html.includes(`<html lang="${code}">`), `${code}/${page}: language missing`);
    assert(html.includes('/site.js?v=24'), `${code}/${page}: shared header/footer script missing`);
    assert(html.includes(`/${code}/preview.html`), `${code}/${page}: gallery link missing`);
    if (page !== 'app.html') assert(html.includes(`/${code}/app.html`), `${code}/${page}: app link missing`);
    assert(!oldShots.some(name => html.includes(name)), `${code}/${page}: old screenshot linked`);
    for (const image of html.matchAll(/src="(\/screenshots\/[^"?]+)"/g)) {
      assert(existsSync(resolve(root, image[1].slice(1))), `${code}/${page}: missing ${image[1]}`);
    }
  }
  const home = readFileSync(resolve(root,code,'index.html'),'utf8');
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
  if (code !== 'en') assert(!home.includes('A home shaped around today'), `${code}: English fallback found`);
}
for (const name of oldShots) assert(!existsSync(resolve(root,'screenshots',name)), `Old screenshot retained: ${name}`);
for (const page of ['404.html','action.html','contact.html','privacy.html','terms.html','licenses.html']) {
  const html = readFileSync(resolve(root,page),'utf8');
  assert(html.includes('/legacy-layout.css'), `${page}: shared layout missing`);
  assert(html.includes('/site.js?v=24'), `${page}: shared header/footer script missing`);
  assert(html.includes('class="logo-container"'), `${page}: brand link missing`);
}
assert(readFileSync(resolve(root,'updates.html'),'utf8').includes('/actuality.html'), 'Updates route does not lead to current news');
console.log(`ORHAR static checks passed: ${checks} assertions across 7 languages.`);
