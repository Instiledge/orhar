import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

const locales = {
  en: {
    lang: 'English', nav: ['Experience', 'Daily life', 'Features', 'News'],
    eyebrow: 'Scripture · Prayer · Growth', title: 'Your faith,', accent: 'every day.',
    hero: 'ORHAR brings the Bible, the liturgy, prayer, spiritual reading and meaningful progress together in one calm, multilingual companion.',
    actions: ['Discover the experience', 'Get ORHAR'], status: ['Version 1.3', '7 interface languages', 'Offline Bible reading'],
    facts: [['5', 'essential spaces'], ['7', 'interface languages'], ['9', 'visual themes'], ['1', 'daily spiritual rhythm']],
    journey: ['One app. A complete spiritual rhythm.', 'Open ORHAR for a verse, stay for a reading, a prayer, a plan or a moment of quiet. Each space supports a different step of the same journey.'],
    paths: [
      ['Read', 'A full Bible library designed for focused, offline reading.', ['Multiple Bible versions', 'Bookmarks and personal notes', 'Search and text settings']],
      ['Meditate', 'Let Scripture meet the moment through ParoBible and the Catechism.', ['Daily and random passages', 'Catechism of the Catholic Church', 'Recent reading history']],
      ['Advance', 'Create a rhythm that fits your life and see your progress.', ['Flexible reading plans', 'Daily Psalm and Proverb', 'Reminders and streaks']],
      ['Learn', 'Turn discovery into lasting knowledge with SianAQuiz.', ['Progressive levels', 'Several game modes', 'Custom quizzes and rankings']]
    ],
    real: ['Inside the app today', 'A home shaped around today', 'Your daily verse, spiritual quotation and liturgical path sit together on a living home screen. Notes, bookmarks and progress remain close at hand.', ['Verse and quotation of the day', 'Liturgical readings in Mon Chemin', 'Shareable cards and quick note-taking']],
    depth: ['Scripture, without friction', 'Read the Bible your way', 'Move between Testaments, Psalms and downloadable versions. Adjust typography, listen aloud and keep meaningful passages with you.', ['Offline-first Bible library', 'System and natural voices', 'Notes, bookmarks and cross-device sync for eligible accounts']],
    beyond: ['More than a reader', 'Practice, listen and go deeper', 'ORHAR connects structured plans, spiritual books, prayers, soundscapes and an evolving Bible quiz in one coherent experience.', ['Reading-plan library', 'Meditbrary, prayers and spiritual books', 'Natural voices and contemplative soundscapes']],
    featureTitle: ['Built for a life of faith', 'Rich enough to grow with you, quiet enough to use every day.'],
    features: [['Daily home', 'Verse, quotation and liturgical readings for the day.'], ['Bible library', 'Multiple versions, focused reading and offline access.'], ['Mon Chemin', 'A daily liturgical path with readings and prayer.'], ['Notes & bookmarks', 'Keep insights and return to important passages.'], ['Voice & sound', 'System voices, natural voices and ambient soundscapes.'], ['Reading plans', 'Build or download a plan and follow it at your pace.'], ['SianAQuiz', 'Levels, streaks, rankings and custom quizzes.'], ['Spiritual library', 'Books, prayers, Meditbrary and spiritual exercises.'], ['Personal space', 'Guest mode, profiles, premium and family options.']],
    theme: ['A space that feels like yours', 'Choose light or dark mode, tune text for comfort and select from nine color worlds drawn directly from ORHAR.', 'Default'],
    release: ['Current app', '1.3', 'The website now reflects the real ORHAR experience.', 'This update is grounded in the current application: its five main spaces, daily content, spiritual library, voice experience and account options.', ['Explore the gallery', 'Read the latest news']],
    footer: 'The Mountain of Light — Scripture, prayer and growth in one place.', legal: ['Privacy', 'Terms', 'Licenses', 'Contact', 'App preview', 'GitHub'], copyright: 'All rights reserved.'
  },
  fr: {
    lang: 'Français', nav: ['Expérience', 'Au quotidien', 'Fonctionnalités', 'Actualité'],
    eyebrow: 'Écriture · Prière · Cheminement', title: 'Votre foi,', accent: 'chaque jour.',
    hero: 'ORHAR réunit la Bible, la liturgie, la prière, la lecture spirituelle et une progression porteuse de sens dans un compagnon serein et multilingue.',
    actions: ['Découvrir l’expérience', 'Obtenir ORHAR'], status: ['Version 1.3', '7 langues d’interface', 'Lecture biblique hors ligne'],
    facts: [['5', 'espaces essentiels'], ['7', 'langues d’interface'], ['9', 'univers visuels'], ['1', 'rythme spirituel quotidien']],
    journey: ['Une app. Un rythme spirituel complet.', 'Ouvrez ORHAR pour un verset, poursuivez par une lecture, une prière, un plan ou un temps de silence. Chaque espace accompagne une étape du même chemin.'],
    paths: [
      ['Lire', 'Une bibliothèque biblique complète, pensée pour une lecture attentive et hors ligne.', ['Plusieurs versions de la Bible', 'Signets et notes personnelles', 'Recherche et réglages du texte']],
      ['Méditer', 'Laissez l’Écriture rejoindre le présent avec ParoBible et le Catéchisme.', ['Passages du jour et aléatoires', 'Catéchisme de l’Église catholique', 'Historique des lectures']],
      ['Avancer', 'Créez un rythme adapté à votre vie et suivez votre progression.', ['Plans de lecture flexibles', 'Psaume et Proverbe quotidiens', 'Rappels et séries']],
      ['Apprendre', 'Transformez la découverte en connaissance durable avec SianAQuiz.', ['Niveaux progressifs', 'Plusieurs modes de jeu', 'Quiz personnalisés et classements']]
    ],
    real: ['Dans l’app aujourd’hui', 'Un accueil construit autour du jour présent', 'Le verset, la pensée spirituelle et le parcours liturgique du jour se rejoignent sur un accueil vivant. Notes, signets et progression restent à portée de main.', ['Verset et pensée du jour', 'Lectures liturgiques dans Mon Chemin', 'Cartes à partager et prise de notes rapide']],
    depth: ['L’Écriture, sans friction', 'Lisez la Bible à votre manière', 'Passez des Testaments aux Psaumes et aux versions téléchargeables. Adaptez la typographie, écoutez le texte et gardez les passages importants.', ['Bibliothèque biblique hors ligne', 'Voix système et voix naturelles', 'Notes, signets et synchronisation pour les comptes éligibles']],
    beyond: ['Bien plus qu’un lecteur', 'Pratiquez, écoutez et allez plus loin', 'ORHAR relie plans structurés, livres spirituels, prières, paysages sonores et quiz biblique évolutif dans une seule expérience.', ['Bibliothèque de plans', 'Meditbrary, prières et livres spirituels', 'Voix naturelles et ambiances contemplatives']],
    featureTitle: ['Pensée pour une vie de foi', 'Assez riche pour grandir avec vous, assez paisible pour vous accompagner chaque jour.'],
    features: [['Accueil quotidien', 'Verset, pensée et lectures liturgiques du jour.'], ['Bibliothèque biblique', 'Versions multiples, lecture attentive et accès hors ligne.'], ['Mon Chemin', 'Un parcours liturgique quotidien avec lectures et prière.'], ['Notes et signets', 'Conservez vos éclairages et retrouvez les passages importants.'], ['Voix et son', 'Voix système, voix naturelles et paysages sonores.'], ['Plans de lecture', 'Créez ou téléchargez un plan et avancez à votre rythme.'], ['SianAQuiz', 'Niveaux, séries, classements et quiz personnalisés.'], ['Bibliothèque spirituelle', 'Livres, prières, Meditbrary et exercices spirituels.'], ['Espace personnel', 'Mode invité, profil, Premium et options Famille.']],
    theme: ['Un espace qui vous ressemble', 'Choisissez le mode clair ou sombre, adaptez la lecture et sélectionnez l’un des neuf univers colorés issus directement d’ORHAR.', 'Défaut'],
    release: ['App actuelle', '1.3', 'Le site reflète désormais l’expérience ORHAR réelle.', 'Cette mise à jour s’appuie sur l’application actuelle : ses cinq espaces, ses contenus quotidiens, sa bibliothèque spirituelle, ses voix et ses options de compte.', ['Explorer la galerie', 'Lire l’actualité']],
    footer: 'La Montagne de Lumière — Écriture, prière et cheminement en un seul lieu.', legal: ['Confidentialité', 'Conditions', 'Licences', 'Contact', 'Aperçu de l’app', 'GitHub'], copyright: 'Tous droits réservés.'
  }
};

const fallbackTranslations = {
  es: ['Español', 'Tu fe,', 'cada día.', 'ORHAR reúne la Biblia, la liturgia, la oración, la lectura espiritual y un progreso con sentido en un compañero sereno y multilingüe.'],
  de: ['Deutsch', 'Dein Glaube,', 'jeden Tag.', 'ORHAR vereint Bibel, Liturgie, Gebet, geistliche Lektüre und sinnvollen Fortschritt in einem ruhigen, mehrsprachigen Begleiter.'],
  it: ['Italiano', 'La tua fede,', 'ogni giorno.', 'ORHAR riunisce Bibbia, liturgia, preghiera, lettura spirituale e crescita consapevole in un compagno sereno e multilingue.'],
  pt: ['Português', 'Sua fé,', 'todos os dias.', 'ORHAR reúne Bíblia, liturgia, oração, leitura espiritual e progresso com propósito em um companheiro sereno e multilíngue.'],
  pl: ['Polski', 'Twoja wiara,', 'każdego dnia.', 'ORHAR łączy Biblię, liturgię, modlitwę, lekturę duchową i świadomy rozwój w spokojnym, wielojęzycznym przewodniku.']
};

for (const [code, [lang, title, accent, hero]] of Object.entries(fallbackTranslations)) {
  locales[code] = structuredClone(locales.en);
  Object.assign(locales[code], { lang, title, accent, hero });
}

const languages = [['en','🇬🇧'],['fr','🇫🇷'],['es','🇪🇸'],['de','🇩🇪'],['it','🇮🇹'],['pt','🇵🇹'],['pl','🇵🇱']];
const icons = ['fa-sun','fa-book-bible','fa-route','fa-bookmark','fa-headphones','fa-calendar-check','fa-puzzle-piece','fa-book-open','fa-user-group'];
const themeColors = [['Default','#915b27'],['Blue','#0b9ac3'],['Sunset','#ef476f'],['Forest','#38a169'],['Violet','#845ec2'],['Oceanic','#088395'],['Earthy','#ac7060'],['Graphite','#4a4a4a'],['Sakura','#cc929d']];

function pathCards(items) {
  return items.map((item, index) => `<article class="path-card reveal"><span class="path-number">0${index + 1}</span><h3>${item[0]}</h3><p>${item[1]}</p><ul>${item[2].map(value => `<li>${value}</li>`).join('')}</ul></article>`).join('');
}

function story(data, images, klass = '') {
  return `<article class="story-row reveal"><div class="story-copy"><span class="story-kicker">${data[0]}</span><h3>${data[1]}</h3><p>${data[2]}</p><div class="story-list">${data[3].map(value => `<span>${value}</span>`).join('')}</div></div><div class="story-visual ${klass}">${images.map(({src,alt}) => `<img src="${src}" alt="${alt}" loading="lazy" width="1080" height="2400">`).join('')}</div></article>`;
}

function render(code, t) {
  const title = `ORHAR — ${t.title} ${t.accent}`;
  return `<!doctype html>
<html lang="${code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${t.hero}"><meta name="theme-color" content="#0b182a">
<link rel="canonical" href="https://orhar.com/${code}/">${languages.map(([value]) => `<link rel="alternate" hreflang="${value}" href="https://orhar.com/${value}/">`).join('')}<link rel="alternate" hreflang="x-default" href="https://orhar.com/en/">
<meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${t.hero}"><meta property="og:url" content="https://orhar.com/${code}/"><meta property="og:image" content="https://orhar.com/og-image.png">
<link rel="icon" href="/favicon.ico"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/manifest.json">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"><link rel="stylesheet" href="/site.css?v=2">
</head><body><a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="header-inner"><a class="brand" href="/${code}/"><img src="/logo.png" alt=""><strong>ORHAR</strong></a><nav class="nav" data-nav aria-label="Main navigation"><a href="#experience">${t.nav[0]}</a><a href="#daily">${t.nav[1]}</a><a href="#features">${t.nav[2]}</a><a href="/${code}/actuality.html">${t.nav[3]}</a><a href="/contact.html">Contact</a></nav><select class="language" data-language aria-label="Language">${languages.map(([value, flag]) => `<option value="${value}" ${value === code ? 'selected' : ''}>${flag} ${value.toUpperCase()}</option>`).join('')}</select><button class="menu-button" data-menu aria-label="Menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button></div></header>
<main id="main"><section class="hero"><div class="hero-inner"><div><p class="eyebrow">${t.eyebrow}</p><h1>${t.title}<em>${t.accent}</em></h1><p class="hero-copy">${t.hero}</p><div class="hero-actions"><a class="button button-primary" href="#experience">${t.actions[0]} <span aria-hidden="true">↓</span></a><a class="button button-secondary" href="/app.html">${t.actions[1]} <span aria-hidden="true">↗</span></a></div><div class="status-line">${t.status.map(value => `<span><i></i>${value}</span>`).join('')}</div></div><div class="phone-stage" aria-label="ORHAR app screens"><span class="orb orb-a"></span><span class="orb orb-b"></span><figure class="phone phone-left"><img src="/screenshots/app-bible-2026.webp" alt="Bible library in ORHAR"></figure><figure class="phone phone-main"><img src="/screenshots/app-home-2026.webp" alt="ORHAR daily home screen"></figure><figure class="phone phone-right"><img src="/screenshots/app-quiz-2026.webp" alt="SianAQuiz in ORHAR"></figure></div></div></section>
<aside class="facts"><div class="facts-inner">${t.facts.map(([big,small]) => `<div class="fact"><strong>${big}</strong><span>${small}</span></div>`).join('')}</div></aside>
<section class="section" id="experience"><div class="section-inner"><div class="section-heading center reveal"><p class="eyebrow">ORHAR 1.3</p><h2 class="section-title">${t.journey[0]}</h2><p class="section-intro">${t.journey[1]}</p></div><div class="paths">${pathCards(t.paths)}</div></div></section>
<section class="section showcase" id="daily"><div class="section-inner">${story(t.real,[{src:'/screenshots/app-home-2026.webp',alt:'ORHAR home screen'}])}${story(t.depth,[{src:'/screenshots/app-bible-2026.webp',alt:'ORHAR Bible library'},{src:'/screenshots/bible-reader.jpg',alt:'ORHAR Bible reader'}],'double')}${story(t.beyond,[{src:'/screenshots/app-quiz-2026.webp',alt:'ORHAR Bible quiz'},{src:'/screenshots/app-reading-plan-2026.webp',alt:'ORHAR reading plan'}],'double')}</div></section>
<section class="section" id="features"><div class="section-inner"><div class="section-heading reveal"><p class="eyebrow">${t.featureTitle[0]}</p><h2 class="section-title">${t.featureTitle[1]}</h2></div><div class="feature-grid">${t.features.map((item,index) => `<article class="feature reveal"><span class="feature-icon"><i class="fa-solid ${icons[index]}"></i></span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join('')}</div></div></section>
<section class="section themes"><div class="section-inner theme-layout"><div class="reveal"><p class="eyebrow">Personalisation</p><h2 class="section-title">${t.theme[0]}</h2><p class="section-intro">${t.theme[1]}</p><div class="palette" aria-label="ORHAR themes">${themeColors.map(([name,color],index) => `<button type="button" data-theme="${color}" style="background:${color}" aria-label="${name}" aria-pressed="${index === 0}"></button>`).join('')}</div><div class="theme-label" data-theme-label>${t.theme[2]}</div></div><div class="theme-preview reveal" data-theme-preview><div class="preview-bar"></div><div class="preview-card"><small>ORHAR · Psalm 119</small><blockquote>“Your word is a lamp for my feet, a light on my path.”</blockquote><div class="preview-progress"></div></div></div></div></section>
<section class="section"><div class="section-inner"><article class="release-card reveal"><div class="release-side"><span>${t.release[0]}</span><strong>${t.release[1]}</strong></div><div class="release-body"><h2>${t.release[2]}</h2><p>${t.release[3]}</p><div class="release-links"><a class="button button-primary" href="/preview.html">${t.release[4][0]}</a><a class="button button-secondary" href="/${code}/actuality.html">${t.release[4][1]}</a></div></div></article></div></section></main>
<footer class="site-footer"><div class="section-inner"><div class="footer-grid"><div class="footer-brand"><a class="brand" href="/${code}/"><img src="/logo.png" alt=""><strong>ORHAR</strong></a><p>${t.footer}</p></div><nav class="footer-links" aria-label="Footer">${[['/privacy.html',t.legal[0]],['/terms.html',t.legal[1]],['/licenses.html',t.legal[2]],['/contact.html',t.legal[3]],['/preview.html',t.legal[4]],['https://github.com/Instiledge/orhar',t.legal[5]]].map(([href,label]) => `<a href="${href}">${label}</a>`).join('')}</nav></div><div class="footer-bottom"><span>© 2026 ORHAR. ${t.copyright}</span><span>אוֹר הַר · The Mountain of Light</span></div></div></footer><script src="/site.js?v=2" defer></script></body></html>`;
}

for (const [code, locale] of Object.entries(locales)) {
  writeFileSync(resolve(root, code, 'index.html'), render(code, locale));
}
