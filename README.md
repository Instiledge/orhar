# ORHAR website

The official multilingual website for ORHAR — the Mountain of Light. It presents the current Android app (version 1.3.0), its daily Scripture experience, prayer, spiritual reading, learning tools and account options.

## Local preview

From this repository directory:

```sh
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/fr/index.html` (or another locale's `index.html`). The explicit file path avoids stale cache entries left by older local previews. No build server or package install is required.

## Content and structure

- `scripts/build-homepages.mjs` generates the seven localized homepages and coordinates the secondary-page generators.
- `scripts/locale-overrides.mjs` holds complete Spanish, German, Italian, Portuguese and Polish homepage copy. English and French copy is in the main generator.
- `scripts/secondary-pages.mjs` generates a localized gallery and Android download page for each language. Gallery screenshots are selected by locale; the shared Home shot is the approved incognito/guest screen.
- `scripts/build-news.mjs` generates the seven news pages from the translated entries in `actuality-data.json`.
- `site.css` and `site.js` provide the shared visual system, responsive navigation, language switcher and theme preview.
- `screenshots/locales/<locale>/` contains optimized, 9:20 WebP captures from the matching app-language/Bible set. Only screens with consistent localized text are shown; account-specific quiz/settings images and mixed-language screens are excluded. The shared `screenshots/app-home-2026.webp` remains unchanged.
- Root `index.html`, `preview.html`, `app.html` and `actuality.html` redirect to localized pages. Contact, legal, account-action and 404 pages retain their established content and behavior while using `legacy-layout.css` and the same responsive header and localized, icon-led footer rendered by `site.js` across the site. `updates.html` leads to the current localized news.

After changing generator data, rebuild and check:

```sh
node scripts/build-homepages.mjs
node scripts/check-site.mjs
```

The checker verifies the seven languages, their routes, images, feature cards, news entries and gallery completeness. The website is deployed separately through GitHub/Cloudflare Pages; running the commands above does not publish anything.

## Languages

English (`en`), French (`fr`), Spanish (`es`), German (`de`), Italian (`it`), Portuguese (`pt`) and Polish (`pl`) each have a homepage, gallery, Android download page and news page. The language selector preserves the current page type and stores the choice locally.

## Product links

The Android package is `com.orhar.bible`. The site links to Google Play, with a note that availability may vary by country and release phase. It does not advertise an iOS download until a public link exists.

## License

The website code is available under [MIT](LICENSE). The ORHAR name, logo and branding are proprietary; third-party attributions are on the [licenses page](licenses.html).
