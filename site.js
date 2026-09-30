(function () {
  const supportedLanguages = ['en','fr','es','de','it','pt','pl'];
  const languageNames = { en:'🇬🇧 EN', fr:'🇫🇷 FR', es:'🇪🇸 ES', de:'🇩🇪 DE', it:'🇮🇹 IT', pt:'🇵🇹 PT', pl:'🇵🇱 PL' };
  const initialLocale = (() => {
    const pathLocale = location.pathname.match(/^\/(en|fr|es|de|it|pt|pl)\//)?.[1];
    const actionLocale = location.pathname === '/action.html' ? new URLSearchParams(location.search).get('lang') : null;
    const stored = localStorage.getItem('orhar_lang');
    const browser = navigator.language.slice(0,2);
    return (supportedLanguages.includes(actionLocale) ? actionLocale : null) || pathLocale || (supportedLanguages.includes(stored) ? stored : supportedLanguages.includes(browser) ? browser : 'en');
  })();
  const themeModeLabels = {
    en: ['Switch to dark mode', 'Switch to light mode'],
    fr: ['Passer en mode sombre', 'Passer en mode clair'],
    es: ['Cambiar a modo oscuro', 'Cambiar a modo claro'],
    de: ['In den Dunkelmodus wechseln', 'In den Hellmodus wechseln'],
    it: ['Passa alla modalità scura', 'Passa alla modalità chiara'],
    pt: ['Mudar para modo escuro', 'Mudar para modo claro'],
    pl: ['Przełącz na tryb ciemny', 'Przełącz na tryb jasny']
  };
  const storedThemeMode = localStorage.getItem('orhar_theme_mode');
  const preferredThemeMode = storedThemeMode || (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  function syncThemeModeButton(button, mode) {
    const labels = themeModeLabels[initialLocale] || themeModeLabels.en;
    button.setAttribute('aria-label', mode === 'dark' ? labels[1] : labels[0]);
    button.setAttribute('aria-pressed', String(mode === 'dark'));
    const icon = button.querySelector('span') || button;
    icon.textContent = mode === 'dark' ? '☀' : '☾';
  }
  function setThemeMode(mode, persist = true) {
    const safeMode = mode === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = safeMode;
    if (persist) localStorage.setItem('orhar_theme_mode', safeMode);
    document.querySelectorAll('[data-mode-toggle]').forEach(button => syncThemeModeButton(button, safeMode));
  }
  function createThemeModeButton() {
    const button = document.createElement('button');
    button.className = 'mode-toggle';
    button.dataset.modeToggle = '';
    button.type = 'button';
    button.innerHTML = '<span aria-hidden="true">☾</span>';
    return button;
  }
  setThemeMode(preferredThemeMode, false);

  // Bring the legacy utility pages onto the same header structure as the localized site.
  const legacyHeader = document.querySelector('body > header:not(.site-header)');
  if (legacyHeader) {
    const brand = legacyHeader.querySelector('.logo-container');
    const nav = legacyHeader.querySelector('nav');
    let languageSelect = legacyHeader.querySelector('select');
    if (brand && nav) {
      if (!languageSelect) {
        languageSelect = document.createElement('select');
        languageSelect.id = 'langSwitch';
        languageSelect.className = 'lang-select';
        languageSelect.setAttribute('aria-label', initialLocale === 'fr' ? 'Langue' : 'Language');
        languageSelect.innerHTML = supportedLanguages.map(code => `<option value="${code}">${languageNames[code]}</option>`).join('');
        languageSelect.value = initialLocale;
        languageSelect.addEventListener('change', () => {
          localStorage.setItem('orhar_lang', languageSelect.value);
          if (location.pathname === '/action.html') {
            const params = new URLSearchParams(location.search);
            params.set('lang', languageSelect.value);
            location.search = params.toString();
          } else {
            translateNotFound(languageSelect.value);
            renderFooter();
          }
        });
      }
      brand.classList.add('brand');
      const logo = brand.querySelector('img');
      if (logo) logo.alt = '';
      const brandLabel = brand.querySelector('.logo-text');
      if (brandLabel) brandLabel.classList.add('brand-name');
      nav.classList.add('nav');
      nav.dataset.nav = '';
      languageSelect.classList.add('language');
      const inner = document.createElement('div');
      inner.className = 'header-inner';
      const menuButton = document.createElement('button');
      menuButton.className = 'menu-button';
      menuButton.dataset.menu = '';
      menuButton.setAttribute('aria-label', initialLocale === 'fr' ? 'Menu' : 'Menu');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.type = 'button';
      menuButton.textContent = '☰';
      const modeButton = createThemeModeButton();
      legacyHeader.className = 'site-header';
      legacyHeader.replaceChildren(inner);
      inner.append(brand, nav, languageSelect, modeButton, menuButton);
      const main = document.querySelector('main');
      if (main && !main.id) main.id = 'main';
      if (!document.querySelector('.skip-link') && main) {
        const skip = document.createElement('a');
        skip.className = 'skip-link'; skip.href = '#main';
        skip.textContent = initialLocale === 'fr' ? 'Aller au contenu' : 'Skip to content';
        document.body.prepend(skip);
      }
    }
  }

  document.querySelectorAll('[data-mode-toggle]').forEach(button => {
    syncThemeModeButton(button, document.documentElement.dataset.theme || preferredThemeMode);
  });
  document.addEventListener('click', event => {
    const button = event.target.closest?.('[data-mode-toggle]');
    if (!button) return;
    event.preventDefault();
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    setThemeMode(current === 'dark' ? 'light' : 'dark');
  });

  const menu = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }

  const language = document.querySelector('[data-language]');
  if (language) {
    language.addEventListener('change', event => {
      const code = event.target.value;
      localStorage.setItem('orhar_lang', code);
      const current = window.location.pathname.match(/^\/(en|fr|es|de|it|pt|pl)\/(preview|app|actuality)\.html$/);
      window.location.href = current ? `/${code}/${current[2]}.html` : `/${code}/index.html`;
    });
  }

  const preview = document.querySelector('[data-theme-preview]');
  const themeLabel = document.querySelector('[data-theme-label]');
  document.querySelectorAll('[data-theme]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-theme]').forEach(item => item.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
      if (preview) preview.style.setProperty('--theme', button.dataset.theme);
      if (themeLabel) themeLabel.textContent = button.getAttribute('aria-label');
    });
  });


  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .1 });
    document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  } else {
    document.querySelectorAll('.reveal').forEach(item => item.classList.add('visible'));
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js').catch(() => {}));
  }

  const footerCopy = {
    en: ['The Mountain of Light — Scripture, prayer and growth in one place.','Footer','Gallery','News','Get the app','Contact','Privacy','Terms','Licenses','All rights reserved.'],
    fr: ['La Montagne de Lumière — Écriture, prière et cheminement en un seul lieu.','Pied de page','Galerie','Actualité','Obtenir l’app','Contact','Confidentialité','Conditions','Licences','Tous droits réservés.'],
    es: ['La Montaña de Luz — Escritura, oración y crecimiento en un solo lugar.','Pie de página','Galería','Novedades','Descargar la app','Contacto','Privacidad','Condiciones','Licencias','Todos los derechos reservados.'],
    de: ['Der Berg des Lichts — Schrift, Gebet und Wachstum an einem Ort.','Fußzeile','Galerie','Neuigkeiten','App herunterladen','Kontakt','Datenschutz','Bedingungen','Lizenzen','Alle Rechte vorbehalten.'],
    it: ['La Montagna di Luce — Scrittura, preghiera e crescita in un solo luogo.','Piè di pagina','Galleria','Novità','Scarica l’app','Contatto','Privacy','Condizioni','Licenze','Tutti i diritti riservati.'],
    pt: ['A Montanha da Luz — Escritura, oração e crescimento em um só lugar.','Rodapé','Galeria','Novidades','Baixar o app','Contato','Privacidade','Termos','Licenças','Todos os direitos reservados.'],
    pl: ['Góra Światła — Pismo, modlitwa i rozwój w jednym miejscu.','Stopka','Galeria','Aktualności','Pobierz aplikację','Kontakt','Prywatność','Warunki','Licencje','Wszelkie prawa zastrzeżone.']
  };
  const notFoundCopy = {
    en: ['Home','Gallery','Contact','Page Not Found','The path you are looking for does not exist on this mountain. Perhaps it has been moved, or perhaps it was never here. Either way, the Word remains.','Return Home','Contact Us','Your word is a lamp to my feet and a light to my path.','Psalm 119:105'],
    fr: ['Accueil','Galerie','Contact','Page introuvable','Le chemin que vous cherchez n’existe pas sur cette montagne. Il a peut-être été déplacé, ou n’a jamais existé. Quoi qu’il en soit, la Parole demeure.','Retour à l’accueil','Nous contacter','Ta parole est une lampe à mes pieds et une lumière sur mon sentier.','Psaume 119:105'],
    es: ['Inicio','Galería','Contacto','Página no encontrada','El camino que buscas no existe en esta montaña. Quizá se haya movido o quizá nunca estuvo aquí. En cualquier caso, la Palabra permanece.','Volver al inicio','Contactar','Tu palabra es una lámpara a mis pies y una luz en mi camino.','Salmo 119:105'],
    de: ['Startseite','Galerie','Kontakt','Seite nicht gefunden','Der gesuchte Weg existiert auf diesem Berg nicht. Vielleicht wurde er verschoben oder war nie hier. Das Wort bleibt.','Zur Startseite','Kontakt aufnehmen','Dein Wort ist meines Fußes Leuchte und ein Licht auf meinem Weg.','Psalm 119,105'],
    it: ['Inizio','Galleria','Contatto','Pagina non trovata','Il percorso che cerchi non esiste su questa montagna. Forse è stato spostato o forse non è mai stato qui. In ogni caso, la Parola rimane.','Torna all’inizio','Contattaci','La tua parola è lampada ai miei passi e luce sul mio cammino.','Salmo 119,105'],
    pt: ['Início','Galeria','Contato','Página não encontrada','O caminho que você procura não existe nesta montanha. Talvez tenha sido movido ou talvez nunca tenha estado aqui. De qualquer forma, a Palavra permanece.','Voltar ao início','Fale conosco','A tua palavra é lâmpada para os meus pés e luz para o meu caminho.','Salmo 119:105'],
    pl: ['Strona główna','Galeria','Kontakt','Nie znaleziono strony','Ścieżka, której szukasz, nie istnieje na tej górze. Być może została przeniesiona albo nigdy jej tu nie było. Słowo pozostaje.','Wróć na stronę główną','Skontaktuj się z nami','Twoje słowo jest lampą dla moich stóp i światłem na mojej ścieżce.','Psalm 119,105']
  };
  function translateNotFound(code) {
    const page = document.querySelector('.error-container');
    if (!page) return;
    const t = notFoundCopy[code] || notFoundCopy.en;
    const links = document.querySelector('header .nav')?.querySelectorAll('a');
    if (links?.length >= 3) {
      [0,1,2].forEach(i => links[i].textContent = t[i]);
      links[0].href = `/${code}/index.html`; links[1].href = `/${code}/preview.html`; links[2].href = '/contact.html';
    }
    const logo = document.querySelector('header .logo-container');
    if (logo) logo.href = `/${code}/index.html`;
    const actions = page.querySelectorAll('.button-group a');
    const heading = page.querySelector('h1');
    const paragraphs = page.querySelectorAll('p');
    if (heading) heading.textContent = t[3];
    if (paragraphs[0]) paragraphs[0].textContent = t[4];
    if (actions[0]) { actions[0].href = `/${code}/index.html`; actions[0].lastChild.textContent = ` ${t[5]}`; }
    if (actions[1]) { actions[1].href = '/contact.html'; actions[1].lastChild.textContent = ` ${t[6]}`; }
    if (paragraphs[1]) paragraphs[1].innerHTML = `“${t[7]}”<br>— ${t[8]}`;
    const skip = document.querySelector('.skip-link');
    if (skip) skip.textContent = code === 'fr' ? 'Aller au contenu' : 'Skip to content';
    document.documentElement.lang = code;
  }
  if (document.querySelector('.error-container')) translateNotFound(initialLocale);
  const iconPaths = {
    gallery: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
    news: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h7M7 12h7M7 16h10M17 8h1v4h-1"/>',
    app: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3"/>',
    contact: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/>',
    privacy: '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
    terms: '<path d="M8 3h8l4 4v14H4V3h4Zm8 0v4h4M8 12h8M8 16h8"/>',
    licenses: '<path d="M7 3h10l3 3v15H4V3h3Zm10 0v4h3M8 12h8M8 16h6"/>',
    github: '<path d="M9 19c-4 1-4-2-6-2m12 4v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.8a5.3 5.3 0 0 0-1.5-3.7 4.9 4.9 0 0 0-.1-3.7S17.5 0 15 2a13 13 0 0 0-6 0C6.5 0 5.3.3 5.3.3a4.9 4.9 0 0 0-.1 3.7 5.3 5.3 0 0 0-1.5 3.7c0 5.3 3.2 6.5 6.2 6.8A3.4 3.4 0 0 0 9 17.1V21"/>',
  };
  const svg = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;
  const localeFromPath = location.pathname.match(/^\/(en|fr|es|de|it|pt|pl)\//)?.[1];
  const footerVerseCopy = {
    en: ['Your word is a lamp to my feet, a light on my path.', 'Psalm 119:105'],
    fr: ['Ta parole est une lampe à mes pieds, une lumière sur mon sentier.', 'Psaume 119:105'],
    es: ['Tu palabra es una lámpara a mis pies y una luz en mi camino.', 'Salmo 119:105'],
    de: ['Dein Wort ist meines Fußes Leuchte und ein Licht auf meinem Weg.', 'Psalm 119:105'],
    it: ['La tua parola è lampada ai miei passi, luce sul mio cammino.', 'Salmo 119:105'],
    pt: ['Tua palavra é lâmpada para os meus pés e luz para o meu caminho.', 'Salmo 119:105'],
    pl: ['Twoje słowo jest lampą dla moich stóp i światłem na mojej ścieżce.', 'Psalm 119:105']
  };
  function buildFooterMarkup() {
    const selectedLocale = document.querySelector('#langSwitch')?.value;
    const sharedSelector = document.querySelector('[data-language]')?.value;
    const preferredLocale = localeFromPath || selectedLocale || sharedSelector || localStorage.getItem('orhar_lang') || navigator.language.slice(0, 2);
    const footerLocale = footerCopy[preferredLocale] ? preferredLocale : 'en';
    const f = footerCopy[footerLocale];
    const v = footerVerseCopy[footerLocale] || footerVerseCopy.en;
    const footerLinks = [
      [`/${footerLocale}/preview.html`, f[2], 'gallery'],
      [`/${footerLocale}/actuality.html`, f[3], 'news'],
      [`/${footerLocale}/app.html`, f[4], 'app'],
      ['/contact.html', f[5], 'contact'],
      ['/privacy.html', f[6], 'privacy'],
      ['/terms.html', f[7], 'terms'],
      ['/licenses.html', f[8], 'licenses']
    ];
    return `<div class="section-inner"><div class="footer-grid"><div class="footer-brand"><a class="brand" href="/${footerLocale}/index.html"><img src="/logo.png" alt=""><strong>ORHAR</strong></a><p>${f[0]}</p><p class="footer-verse">« ${v[0]} » <span class="footer-verse-ref">— ${v[1]}</span></p><span class="footer-script">אוֹר הַר · The Mountain of Light</span></div><nav class="footer-links" aria-label="${f[1]}">${footerLinks.map(([url,label,icon]) => `<a href="${url}">${svg(icon)}<span>${label}</span></a>`).join('')}</nav></div><div class="footer-bottom"><span>© 2026 ORHAR. ${f[9]}</span><span>אוֹר הַר</span></div></div>`;
  }
  const footerContainer = document.querySelector('#footer-container');
  const footerElement = document.querySelector('.site-footer') || document.querySelector('body > footer');
  function renderFooter() {
    if (footerContainer) {
      footerContainer.innerHTML = `<footer class="site-footer unified-footer" data-unified-footer>${buildFooterMarkup()}</footer>`;
    } else if (footerElement) {
      footerElement.className = 'site-footer unified-footer';
      footerElement.dataset.unifiedFooter = '';
      footerElement.innerHTML = buildFooterMarkup();
    }
  }
  if (footerContainer) {
    new MutationObserver(() => {
      if (footerContainer.children.length !== 1 || !footerContainer.firstElementChild?.hasAttribute('data-unified-footer')) renderFooter();
    }).observe(footerContainer, { childList: true });
  }
  document.querySelector('#langSwitch')?.addEventListener('change', renderFooter);
  document.querySelector('[data-language]')?.addEventListener('change', renderFooter);
  renderFooter();
})();
