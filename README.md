# ORHAR Website

The official multilingual companion website for **ORHAR — the Mountain of Light** ([orhar.com](https://orhar.com)). It presents the ORHAR Android mobile application (v1.3), its daily Scripture reading experience, meditation, prayer life, reading plans, learning tools, and legal compliance pages.

---

## 🌐 Overview & Features

- **7 Supported Languages**: Full multilingual parity across English (`en`), French (`fr`), Spanish (`es`), German (`de`), Italian (`it`), Portuguese (`pt`), and Polish (`pl`).
- **Zero-Dependency Architecture**: Lightweight static stack using vanilla HTML5, modern CSS3 (custom properties, responsive grid, light/dark theme engine), and ES6+ JavaScript.
- **Interactive Experience**:
  - Scripture of the day & themed Bible verses carousel with copy, share, and read tracking.
  - Dynamic update notification banner fed by `actuality-data.json`.
  - Light / Dark theme toggle with persistent user preference storage.
- **Progressive Web App (PWA)**: Offline-first asset caching via `service-worker.js` and `manifest.json`.
- **Search Engine Optimization (SEO)**: OpenGraph tags, Twitter Cards, Schema.org `SoftwareApplication` JSON-LD metadata, and multilingual `hreflang` XML sitemap.
- **Android App Deep Linking**: Cryptographic App Links verification via `/.well-known/assetlinks.json`.

---

## 🚀 Local Development

### 1. Local Preview

Start a local static server from the repository root:

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080/fr/index.html` (or any other language route) in your browser.

### 2. Building Static Pages

When translations, templates, or navigation components are updated, regenerate all localized pages:

```sh
node scripts/build-homepages.mjs
```

### 3. Automated Integrity Verification

Run the test suite to validate all 550+ assertions (routes, metadata, language flags, canonical links, asset integrity):

```sh
node scripts/check-site.mjs
```

---

## 📁 Repository Structure

```
├── CNAME                         # Production domain (orhar.com)
├── _headers                      # HTTP security & cache headers
├── robots.txt                    # Search crawler indexing rules
├── sitemap.xml                   # Multilingual XML sitemap
├── manifest.json                 # PWA Web App Manifest
├── service-worker.js             # Service Worker for offline asset caching
├── site.css                      # Global design system & theme variables
├── site.js                       # Client-side interactions & analytics
├── actuality-data.json           # News & release updates data feed
├── .well-known/
│   ├── assetlinks.json           # Android Digital Asset Links
│   └── security.txt              # RFC 9116 security policy
├── scripts/
│   ├── build-homepages.mjs       # Static homepages generator
│   ├── secondary-pages.mjs       # Gallery (/preview.html) & download (/app.html) generator
│   ├── build-news.mjs            # Actuality (/actuality.html) pages generator
│   ├── locale-overrides.mjs      # Localized copy & translation dictionaries
│   └── check-site.mjs            # 550+ validation test assertions
├── screenshots/
│   ├── locales/                  # Localized WebP app screenshots by language
│   └── *.webp                    # Generic WebP screenshots & UI assets
├── [en|fr|es|de|it|pt|pl]/        # Localized website directories
│   ├── index.html
│   ├── preview.html
│   ├── app.html
│   ├── actuality.html
│   └── qr-subscribe-*.png
├── contact.html                  # Support & contact form (anti-spam protected)
├── privacy.html                  # Privacy policy
├── terms.html                    # Terms of service
├── licenses.html                 # Third-party open source licenses
└── 404.html                      # 404 error fallback
```

---

## 📱 Product Links

The official Android package identifier is `com.orhar.bible`. The website links directly to Google Play, with fallbacks for regions where availability is rolling out.

---

## 📄 License & Attribution

- The website source code is licensed under the [MIT License](LICENSE).
- The ORHAR name, logo, iconography, and branding assets are proprietary.
- Third-party open source attributions and Bible translation credits are listed on the [Licenses Page](licenses.html).
