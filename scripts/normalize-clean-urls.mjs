import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const languages = '(?:en|fr|es|de|it|pt|pl)';
const localizedPages = '(?:preview|appdemo|app|actuality)';
const staticPages = '(?:contact|privacy|terms|licenses|preview|app|actuality|updates|action|404)';
const textExtensions = new Set(['.html', '.xml', '.js', '.txt']);
const skippedDirectories = new Set(['.git', 'assets', 'screenshots', 'scripts', '.github', '.well-known']);

function cleanPublicUrls(input) {
  return input
    // Absolute canonical URLs.
    .replace(new RegExp(`https://orhar\\.com/(${languages.slice(3, -1)})/index\\.html`, 'g'), 'https://orhar.com/$1/')
    .replace(new RegExp(`https://orhar\\.com/(${languages.slice(3, -1)})/(${localizedPages.slice(3, -1)})\\.html`, 'g'), 'https://orhar.com/$1/$2')
    .replace(/https:\/\/orhar\.com\/index\.html/g, 'https://orhar.com/')
    .replace(new RegExp(`https://orhar\\.com/(${staticPages.slice(3, -1)})\\.html`, 'g'), 'https://orhar.com/$1')

    // Root-relative URLs in HTML attributes, scripts and JSON-LD.
    .replace(new RegExp(`/(${languages.slice(3, -1)})/index\\.html`, 'g'), '/$1/')
    .replace(new RegExp(`/(${languages.slice(3, -1)})/(${localizedPages.slice(3, -1)})\\.html`, 'g'), '/$1/$2')
    .replace(/\/index\.html/g, '/')
    .replace(new RegExp(`/(${staticPages.slice(3, -1)})\\.html`, 'g'), '/$1')

    // Legacy relative links on root utility pages.
    .replace(/(["'=(])index\.html/g, '$1/')
    .replace(/(["'=(])contact\.html/g, '$1/contact')
    .replace(/(["'=(])privacy\.html/g, '$1/privacy')
    .replace(/(["'=(])terms\.html/g, '$1/terms')
    .replace(/(["'=(])licenses\.html/g, '$1/licenses')
    .replace(/(["'=(])preview\.html/g, '$1/en/preview')
    .replace(/(["'=(])app\.html/g, '$1/en/app')
    .replace(/(["'=(])actuality\.html/g, '$1/en/actuality')
    .replace(/(["'=(])action\.html/g, '$1/action')
    .replace(/(["'=(])404\.html/g, '$1/404')

    // Template strings in inline scripts.
    .replace(/\/\$\{([^}]+)\}\/index\.html/g, '/${$1}/')
    .replace(/\/\$\{([^}]+)\}\/(preview|appdemo|app|actuality)\.html/g, '/${$1}/$2');
}

function collectFiles(directory, files = []) {
  for (const entry of readdirSync(directory)) {
    if (skippedDirectories.has(entry)) continue;

    const path = join(directory, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      collectFiles(path, files);
    } else if (textExtensions.has(extname(entry))) {
      files.push(path);
    }
  }
  return files;
}

let changed = 0;
for (const file of collectFiles(root)) {
  const before = readFileSync(file, 'utf8');
  const after = cleanPublicUrls(before);
  if (after !== before) {
    writeFileSync(file, after);
    changed += 1;
  }
}

console.log(`Normalized clean public URLs in ${changed} files.`);
