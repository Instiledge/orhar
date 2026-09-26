(function () {
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
      window.location.href = `/${code}/`;
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
})();
