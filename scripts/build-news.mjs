import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ui, navGalleryLabels } from './secondary-pages.mjs';

const titles = {
  en:['News & updates','What’s new in ORHAR','Product updates, spiritual reading and the next steps on our journey.','Back to the app'],
  fr:['Actualité','L’actualité d’ORHAR','Évolutions de l’app, lectures spirituelles et prochaines étapes de notre chemin.','Retour à l’app'],
  es:['Novedades','Lo nuevo en ORHAR','Actualizaciones de la app, lecturas espirituales y próximos pasos de nuestro camino.','Volver a la app'],
  de:['Neuigkeiten','Neues bei ORHAR','App-Updates, geistliche Lektüre und die nächsten Schritte auf unserem Weg.','Zurück zur App'],
  it:['Novità','Le novità di ORHAR','Aggiornamenti dell’app, letture spirituali e prossimi passi del nostro cammino.','Torna all’app'],
  pt:['Novidades','Novidades do ORHAR','Atualizações do app, leituras espirituais e próximos passos do nosso caminho.','Voltar ao app'],
  pl:['Aktualności','Co nowego w ORHAR','Aktualizacje aplikacji, lektury duchowe i kolejne kroki naszej drogi.','Wróć do aplikacji']
};
const flags = {en:'🇬🇧',fr:'🇫🇷',es:'🇪🇸',de:'🇩🇪',it:'🇮🇹',pt:'🇵🇹',pl:'🇵🇱'};
const htmlEscape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');

export function writeNewsPages(root, locales) {
  const updates = JSON.parse(readFileSync(resolve(root,'actuality-data.json'),'utf8')).updates.sort((a,b)=>b.date.localeCompare(a.date));
  for (const [code,t] of Object.entries(locales)) {
    const n = titles[code],u=ui[code];
    const cards = updates.map(update => {
      const item = update.translations[code];
      if (!item) throw new Error(`Missing news translation for ${code}: ${update.id}`);
      const date = new Intl.DateTimeFormat(code,{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${update.date}T12:00:00Z`));
      return `<article class="news-card reveal"><time datetime="${update.date}">${htmlEscape(date)}</time><span class="news-badge">${htmlEscape(item.badge)}</span><h2>${htmlEscape(item.title)}</h2><p>${htmlEscape(item.content)}</p></article>`;
    }).join('');
    const doc = `<!doctype html><html lang="${code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${n[0]} — ORHAR</title><meta name="description" content="${n[2]}"><meta name="theme-color" content="#0b182a"><meta property="og:type" content="website"><meta property="og:title" content="${n[0]} — ORHAR"><meta property="og:description" content="${n[2]}"><meta property="og:url" content="https://orhar.com/${code}/actuality.html"><meta property="og:image" content="https://orhar.com/og-image.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@orhar_app"><meta name="twitter:title" content="${n[0]} — ORHAR"><meta name="twitter:image" content="https://orhar.com/og-image.png"><link rel="canonical" href="https://orhar.com/${code}/actuality.html">${Object.keys(locales).map(lang=>`<link rel="alternate" hreflang="${lang}" href="https://orhar.com/${lang}/actuality.html">`).join('')}<link rel="alternate" hreflang="x-default" href="https://orhar.com/en/actuality.html"><link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-96x96.png"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1A2E4A"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="/site.css?v=21"></head><body><a class="skip-link" href="#main">${u.skip}</a><header class="site-header"><div class="header-inner"><a class="brand" href="/${code}/index.html"><img src="/logo.png" alt=""><strong>ORHAR</strong></a><nav class="nav" data-nav aria-label="${u.nav}"><a href="/${code}/index.html">${n[3]}</a><a href="/${code}/preview.html">${navGalleryLabels[code]}</a><a href="/${code}/app.html">${t.actions[1]}</a><a href="/contact.html">${u.contact}</a></nav><select class="language" data-language aria-label="${u.language}">${Object.keys(locales).map(lang=>`<option value="${lang}" ${lang===code?'selected':''}>${flags[lang]} ${lang.toUpperCase()}</option>`).join('')}</select><button class="mode-toggle" data-mode-toggle type="button"><span aria-hidden="true">☾</span></button><button class="menu-button" data-menu aria-label="Menu" aria-expanded="false">☰</button></div></header><main id="main"><section class="news-hero"><div class="section-inner"><p class="eyebrow">ORHAR · ${n[0]}</p><h1>${n[1]}</h1><p>${n[2]}</p></div></section><section class="section"><div class="section-inner"><div class="news-grid">${cards}</div></div></section></main><footer class="site-footer"><div class="section-inner"><div class="footer-grid"><div class="footer-brand"><a class="brand" href="/${code}/index.html"><img src="/logo.png" alt=""><strong>ORHAR</strong></a><p>${t.footer}</p><p class="footer-verse">« ${u.quote} » <span class="footer-verse-ref">— ${u.psalm}:105</span></p></div><nav class="footer-links" aria-label="${u.footer}">${[['/privacy.html',t.legal[0]],['/terms.html',t.legal[1]],['/licenses.html',t.legal[2]],['/contact.html',t.legal[3]],[`/${code}/preview.html`,t.legal[4]]].map(([href,label])=>`<a href="${href}">${label}</a>`).join('')}</nav></div><div class="footer-bottom"><span>© 2026 ORHAR. ${t.copyright}</span><span>אוֹר הַר</span></div></div></footer><script src="/site.js?v=22" defer></script></body></html>`;
    writeFileSync(resolve(root,code,'actuality.html'),doc);
  }
}
