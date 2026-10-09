import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const languages = ['en', 'fr', 'es', 'de', 'it', 'pt', 'pl'];
const today = new Date().toISOString().split('T')[0];

function generateHreflangs(pagePath = '') {
  return languages.map(lang => 
    `        <xhtml:link rel="alternate" hreflang="${lang}" href="https://orhar.com/${lang}/${pagePath}" />`
  ).join('\n') + `\n        <xhtml:link rel="alternate" hreflang="x-default" href="https://orhar.com/en/${pagePath}" />`;
}

const localizedPages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'appdemo', priority: '0.9', changefreq: 'weekly' },
  { path: 'preview', priority: '0.8', changefreq: 'monthly' },
  { path: 'app', priority: '0.8', changefreq: 'monthly' },
  { path: 'actuality', priority: '0.7', changefreq: 'weekly' },
];

const staticPages = [
  { url: 'https://orhar.com/contact', priority: '0.8', changefreq: 'monthly' },
  { url: 'https://orhar.com/privacy', priority: '0.5', changefreq: 'yearly' },
  { url: 'https://orhar.com/terms', priority: '0.5', changefreq: 'yearly' },
  { url: 'https://orhar.com/licenses', priority: '0.5', changefreq: 'yearly' },
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

// Localized pages
for (const page of localizedPages) {
  for (const lang of languages) {
    const loc = `https://orhar.com/${lang}/${page.path}`;
    xml += `    <url>
        <loc>${loc}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
${generateHreflangs(page.path)}
    </url>
`;
  }
}

// Static pages
for (const page of staticPages) {
  xml += `    <url>
        <loc>${page.url}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>
`;
}

xml += `</urlset>\n`;

writeFileSync(resolve(root, 'sitemap.xml'), xml);
console.log(`Generated sitemap.xml with ${localizedPages.length * languages.length + staticPages.length} URLs.`);
