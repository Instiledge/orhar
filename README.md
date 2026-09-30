# ORHAR — The Mountain of Light ⛰️✨

<div align="center">
  <img src="logo.png" alt="ORHAR Logo" width="130" />
  <br />
  <h3>אוֹר הַר</h3>
  <p><em>Where God's Word and the human soul meet on the heights</em></p>
  <p>
    <a href="https://orhar.com"><strong>orhar.com</strong></a> • 
    <a href="#-languages">7 Languages</a> • 
    <a href="#-features">Version 1.3</a> • 
    <a href="LICENSE">MIT License</a>
  </p>
</div>

---

## 📖 About ORHAR

**ORHAR** is a Christian faith-based mobile application designed for the daily spiritual ascent through Scripture.
- **OR** (אוֹר) means *Light* — God's first gift to creation (*Genesis 1:3*).
- **HAR** (הַר) means *Mountain* — the biblical place of divine encounter, prayer, and revelation.

Together, **ORHAR is the Mountain of Light**. This repository contains the **official website** for ORHAR — a fast, responsive, and multilingual showcase, support hub, and companion for the mobile application.

---

## 🌍 Website Pages & Architecture

The website is structured with dedicated localized sections and centralized support/legal pages:

| Section / Page | Route | Description |
| :--- | :--- | :--- |
| **🏠 Homepage** | `/[lang]/index.html` | Hero banner, news alert, daily Scripture carousel, core feature highlights, reading tools, interactive theme picker, and newsletter. |
| **📱 App & Download** | `/[lang]/app.html` | Official Android download hub with Google Play deep-linking and store fallbacks. |
| **🖼️ Gallery Showcase** | `/[lang]/preview.html` | Interactive showcase displaying real, high-resolution application screenshots in each language. |
| **📰 News & Updates** | `/[lang]/actuality.html` | Dynamic feed of new releases, feature announcements, and updates powered by `actuality-data.json`. |
| **💌 Contact & Support** | `contact.html` | Support center with contact form, FAQ, volunteer contribution info, and donation details. |
| **🔒 Privacy Policy** | `privacy.html` | Complete GDPR-compliant legal privacy notice. |
| **📜 Terms of Service** | `terms.html` | Complete terms and conditions of use. |
| **⚖️ Open Source Licenses**| `licenses.html` | Full third-party software attributions and Bible text copyrights. |
| **🔐 Account Actions** | `action.html` | Firebase Auth actions handler (password reset, email verification). |
| **🚫 404 Fallback** | `404.html` | Custom branded error page with smart language redirection. |

---

## 🌐 Languages & Internationalization

The website is fully translated into **7 languages** with 100% feature and screenshot parity:

| Flag | Code | Language | Native Name | Status |
| :---: | :---: | :--- | :--- | :---: |
| 🇬🇧 | `en` | English | English | ✅ 100% |
| 🇫🇷 | `fr` | French | Français | ✅ 100% |
| 🇪🇸 | `es` | Spanish | Español | ✅ 100% |
| 🇩🇪 | `de` | German | Deutsch | ✅ 100% |
| 🇮🇹 | `it` | Italian | Italiano | ✅ 100% |
| 🇵🇹 | `pt` | Portuguese | Português | ✅ 100% |
| 🇵🇱 | `pl` | Polish | Polski | ✅ 100% |

- **Smart Language Routing**: The root files (`index.html`, `app.html`, `preview.html`, `actuality.html`) automatically detect the browser's language or restore the user's saved preference from `localStorage`.
- **Language Switcher**: Present in the header of every page with national flags for instant switching while preserving the current route.

---

## ✨ Key Features (ORHAR 1.3)

- **📖 Scripture & Daily Verse Carousel**: Interactive Bible verse carousel with copy-to-clipboard, native social sharing, and read-tracking checkmarks.
- **🎨 Dark / Light Theme & 4 Color Palettes**: Smooth theme engine with persistent user preferences saved across visits.
- **🔔 Live Actuality Banner**: Dynamic top notification banner on the homepage linked to the latest release notes.
- **🖼️ Localized 9:20 WebP Galleries**: Authentic captures of the app in English, French, Spanish, German, Italian, Portuguese, and Polish.
- **⚡ PWA & Offline Support**: Progressive Web App with `manifest.json` and `service-worker.js` Cache-First strategy.
- **🚀 SEO & Social Sharing Optimized**: Complete OpenGraph, Twitter Cards, Schema.org `SoftwareApplication` JSON-LD structured data, and multilingual `hreflang` XML sitemap.
- **🔗 Android App Deep Linking**: Cryptographic App Links verification via `/.well-known/assetlinks.json`.
- **🛡️ Secure Contact & Newsletter Forms**: FormSubmit integration with invisible honeypot anti-spam protection.

---

## 🏗️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | HTML5, Modern CSS3, ES6+ JavaScript | Ultra-fast vanilla stack, zero heavy frameworks, zero runtime dependencies. |
| **Typography** | Cormorant Garamond & Work Sans | Elegant display serif for sacred Scripture and clean sans-serif for UI readability. |
| **Build System** | Node.js (`scripts/`) | Fast automated static site generation and multi-language compilation. |
| **Testing Suite** | Custom Node.js test runner | 550+ automated validation assertions verifying routes, links, SEO, and images. |
| **Hosting & CDN** | GitHub Pages (`orhar.com`) | Deployed on GitHub Pages with custom domain binding and SSL. |

---

## 🚀 Local Development & Build Workflow

### 1. Local Preview

Start a local static server from the repository directory:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/fr/index.html` (or any other language route) in your web browser.

### 2. Regenerating Static Pages

When updating translations, navigation headers, or templates, re-run the build generator:

```bash
# Rebuilds all 7 localized homepages, preview, app and actuality pages
node scripts/build-homepages.mjs
```

### 3. Running Automated Integrity Checks

Before pushing any changes, run the validation test suite (550+ assertions):

```bash
node scripts/check-site.mjs
```

---

## 📁 Repository Structure

```
├── CNAME                         # Production domain binding (orhar.com)
├── _headers                      # HTTP security & cache headers
├── robots.txt                    # Search crawler indexing rules
├── sitemap.xml                   # Multilingual XML sitemap with hreflang tags
├── manifest.json                 # PWA Web App Manifest
├── service-worker.js             # Service Worker for offline asset caching
├── site.css                      # Global design system & theme CSS variables
├── site.js                       # Interactive carousel, theme switcher & form handlers
├── actuality-data.json           # News & release updates feed
├── .well-known/
│   ├── assetlinks.json           # Android Digital Asset Links (App Links)
│   └── security.txt              # RFC 9116 security contact policy
├── scripts/
│   ├── build-homepages.mjs       # Static homepages generator
│   ├── secondary-pages.mjs       # Gallery (/preview.html) & download (/app.html) generator
│   ├── build-news.mjs            # Actuality (/actuality.html) pages generator
│   ├── locale-overrides.mjs      # Translation dictionaries for 5 secondary languages
│   └── check-site.mjs            # 550+ validation test assertions
├── screenshots/
│   ├── locales/                  # Localized WebP app screenshots by language
│   └── *.webp                    # Generic WebP screenshots & UI assets
├── [en|fr|es|de|it|pt|pl]/        # Localized website directories
│   ├── index.html                # Localized homepage
│   ├── preview.html              # Localized screenshot gallery
│   ├── app.html                  # Localized app download page
│   ├── actuality.html            # Localized news & releases
│   └── qr-subscribe-*.png        # Localized newsletter QR codes
├── contact.html                  # Support & contact form (honeypot protected)
├── privacy.html                  # Privacy policy
├── terms.html                    # Terms of service
├── licenses.html                 # Third-party open source licenses
└── 404.html                      # 404 error page
```

---

## 📱 Mobile Application

The official Android package identifier is `com.orhar.bible`. The website links to Google Play, with automatic detection and fallbacks for regions where rollout is in progress.

---

## 📄 License & Legal

- **Code**: The website source code is open source and available under the [MIT License](LICENSE).
- **Brand & Assets**: The ORHAR name, logo, iconography, and spiritual art assets are proprietary.
- **Attributions**: Third-party libraries, icon credits, and Bible translation copyrights are listed on the [Licenses Page](licenses.html).

---

## 📬 Contact & Community

| Channel | Link |
| :--- | :--- |
| 🌐 **Official Website** | [orhar.com](https://orhar.com) |
| 📧 **Contact & Support** | [contact@orhar.com](mailto:contact@orhar.com) |
| 🔒 **Security Inquiries** | [contact@orhar.com](mailto:contact@orhar.com) |
| 📱 **Android App** | Available on [Google Play](https://play.google.com/store/apps/details?id=com.orhar.bible) |

---

<div align="center">
  <p><em>« Ta parole est une lampe à mes pieds, une lumière sur mon sentier. »</em></p>
  <p><strong>— Psaume 119:105</strong></p>
</div>
