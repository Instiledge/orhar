# ORHAR Website Architecture

The ORHAR website is a high-performance, multilingual static website supporting the **ORHAR Bible app (v1.3)**.

## Purpose

The website provides:

- Commercial presentation and feature parity with the ORHAR Android mobile app
- Interactive Biblical verse carousel with sharing and read-tracking capabilities
- Multilingual screenshots and feature galleries (7 supported languages)
- Public updates and release messaging (`/actuality.html` and `actuality-data.json`)
- App deep links (`/.well-known/assetlinks.json`) and store download fallbacks
- Support and contact forms with anti-spam protection (`/contact.html`)
- Newsletter subscription integration with localized QR code support
- Legal compliance pages (Privacy Policy, Terms of Service, Open Source Licenses)
- Offline support and asset caching via Progressive Web App (PWA) Service Worker

## Technology & Standards

The website is built with vanilla, lightweight, zero-dependency web technologies:

- **HTML5 & CSS3**: Modern semantic markup, CSS custom properties, responsive design, dark/light theme engine (`site.css`).
- **Vanilla JavaScript (ES6+)**: Fast, framework-free client-side scripts (`site.js`).
- **Build & Verification Tooling**: Node.js automated templating and test assertion suite (`scripts/`).
- **Hosting**: GitHub Pages (custom domain `https://orhar.com`) + `.nojekyll` and `_headers`.
- **Forms**: FormSubmit integration with AJAX and invisible honeypot anti-spam.
- **PWA & Offline**: `manifest.json` and `service-worker.js` with Cache-First asset caching.

## Multilingual Support

The website natively supports seven languages with full content and screenshot parity:

- **EN** (`/en/`): English
- **FR** (`/fr/`): Français
- **ES** (`/es/`): Español
- **DE** (`/de/`): Deutsch
- **IT** (`/it/`): Italiano
- **PT** (`/pt/`): Português
- **PL** (`/pl/`): Polski

Root routing files (`index.html`, `app.html`, `preview.html`, `actuality.html`) detect the user's browser language or saved preference (`localStorage`) and automatically route to the corresponding localized folder.

## File Structure

```
├── CNAME                         # Production domain binding (orhar.com)
├── _headers                      # HTTP security & cache headers
├── robots.txt                    # Search crawler indexing rules
├── sitemap.xml                   # Multilingual XML sitemap with hreflang links
├── manifest.json                 # PWA Web App Manifest
├── service-worker.js             # Service Worker for PWA caching & offline support
├── site.css                      # Global design system, theme variables & components
├── site.js                       # Interactive carousel, theme switcher, forms, analytics
├── actuality-data.json           # Dynamic JSON feed for news and update notifications
├── .well-known/
│   ├── assetlinks.json           # Android Digital Asset Links for deep linking
│   └── security.txt              # RFC 9116 security contact policy
├── scripts/
│   ├── build-homepages.mjs       # Generates localized homepages (/en/, /fr/, etc.)
│   ├── secondary-pages.mjs       # Generates localized /preview.html and /app.html
│   ├── build-news.mjs            # Generates localized /actuality.html pages
│   ├── locale-overrides.mjs      # Translations and localized copy data
│   └── check-site.mjs            # 550+ automated validation assertions
├── screenshots/
│   ├── locales/                  # Localized WebP screenshots for each language
│   └── *.webp                    # Generic WebP screenshots & UI assets
├── docs/                         # Project documentation
├── [en|fr|es|de|it|pt|pl]/        # Localized website directories
│   ├── index.html
│   ├── preview.html
│   ├── app.html
│   ├── actuality.html
│   └── qr-subscribe-*.png
├── contact.html                  # Multilingual contact & support form
├── privacy.html                  # Privacy policy
├── terms.html                    # Terms of service
├── licenses.html                 # Open-source third-party licenses
└── 404.html                      # Branded 404 error fallback
```

## Security & Privacy Rules

1. **No Private Secrets**: The public repository must never contain private API keys, service credentials, or confidential database configurations.
2. **User Privacy**: Anonymous analytics and strict compliance with global privacy regulations (no unauthorized tracking cookies).
3. **App Link Verification**: Android App Links are cryptographically bound to the official app signing certificates via `assetlinks.json`.

## App Relationship

The website is the public companion to the official Android application located at:
`/Users/kalain/Documents/APKDev2024/OrharAppProject/OrharBibleApp`
