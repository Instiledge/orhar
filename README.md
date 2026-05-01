# ORHAR — The Mountain of Light ⛰️✨ — Official app website

<div align="center">
  <img src="logo.png" alt="ORHAR Logo" width="120" />
  <p><em>אוֹר הַר — Where God's Word and the human soul meet on the heights</em></p>
</div>

---

## 📖 About

ORHAR is a faith-based mobile application. **OR** (אוֹר) means *light* — God's first gift to creation. **HAR** (הַר) means *mountain* — the biblical place of divine encounter. Together, ORHAR is the Mountain of Light, designed for the daily ascent through Scripture.

This repository contains the **official website** for ORHAR — a multilingual showcase and support hub for the application.

---

## 🌍 Website Structure

| Page | Description |
|------|-------------|
| `index.html` | Homepage — hero section, icon narrative, features grid, theme color picker |
| `contact.html` | Contact & Support — email, FAQ, ways to contribute, donate section |
| `privacy.html` | Privacy Policy — complete legal document |
| `terms.html` | Terms of Service — complete legal document |
| `licenses.html` | Open Source Licenses — third-party attributions |
| `action.html` | Firebase Auth Actions — password reset, email verification |

---

## 🌐 Languages

The website is fully translated into **7 languages** with 1:1 content parity:

| Code | Language | Status |
|------|----------|--------|
| 🇬🇧 `en` | English | ✅ Complete |
| 🇫🇷 `fr` | French | ✅ Complete |
| 🇪🇸 `es` | Spanish | ✅ Complete |
| 🇩🇪 `de` | German | ✅ Complete |
| 🇮🇹 `it` | Italian | ✅ Complete |
| 🇵🇹 `pt` | Portuguese | ✅ Complete |
| 🇵🇱 `pl` | Polish | ✅ Complete |

Language is auto-detected from the browser and can be switched via the dropdown in the navigation bar. The preference is persisted in `localStorage`.

---

## ✨ Features

- **🎨 9 Customizable Themes** — Users can preview ORHAR's in-app color themes directly on the website
- **📱 App Store Deep Linking** — Smart redirect to the app with store fallback if not installed
- **🔐 Firebase Auth Integration** — Handles password reset and email verification flows
- **📄 Complete Legal Suite** — Privacy Policy, Terms of Service, and Open Source Licenses
- **💌 Contact & Support Hub** — FAQ section, donation card, contribution opportunities
- **🧭 Fully Responsive** — Optimized for desktop, tablet, and mobile devices

---

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/orhar-website.git
   cd orhar-website

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5 / CSS3 / Vanilla JavaScript** | Core website — no framework, no build step |
| **Font Awesome 6** | Icon library |
| **Google Fonts** | Cormorant Garamond (display) + Work Sans (body) |
| **Firebase Auth** | Password reset and email verification flows |
| **localStorage** | Language preference persistence |

## 📁 File Structure

orhar-website/
- ├── .well-known/security.txt
- ├── .github/workflows/auto-sitemap.yml
- ├── index.html              # Root → language redirector
- ├── en/index.html           # English homepage
- ├── fr/index.html           # French homepage
- ├── es/index.html           # Spanish homepage
- ├── de/index.html           # German homepage
- ├── it/index.html           # Italian homepage
- ├── pt/index.html           # Portuguese homepage
- ├── pl/index.html           # Polish homepage
- ├── en/qr-subscribe-en.png  # EN QR code
- ├── fr/qr-subscribe-fr.png  # FR QR code
- ├── es/qr-subscribe-es.png  # ES QR code
- ├── de/qr-subscribe-de.png  # DE QR code
- ├── it/qr-subscribe-it.png  # IT QR code
- ├── pt/qr-subscribe-pt.png  # PT QR code
- ├── pl/qr-subscribe-pl.png  # PL QR code
- ├── .gitignore              # Git ignore rules
- ├── 404.html                # Custom error page
- ├── CNAME
- ├── LICENSE                 # MIT License
- ├── README.md               # Documentation
- ├── _headers
- ├── action.html             # Firebase Auth Actions
- ├── app.html             # Firebase Auth Actions
- ├── apple-splash-2048.png    # iOS icon
- ├── apple-touch-icon.png    # iOS icon
- ├── browserconfig.xml
- ├── contact.html            # Contact & Support
- ├── favicon-96x96.png       # Browser icon (large)
- ├── favicon.ico             # Browser icon
- ├── humans.txt
- ├── icon-192.png            # PWA icon (small)
- ├── icon-512.png            # PWA icon (large)
- ├── licenses.html           # Open Source Licenses
- ├── logo.png                # ORHAR logo
- ├── manifest.json           # PWA manifest
- ├── mstile-150x150.png
- ├── og-image.png            # Social sharing image
- ├── privacy.html            # Privacy Policy
- ├── robots.txt              # SEO instructions
- ├── safari-pinned-tab.svg   # Safari pinned tab
- ├── service-worker.js       # Offline caching
- ├── sitemap.xml             # Search engine map
- ├── terms.html              # Terms of Service
- └── updates.html            # Central update feed

## 📄 License

This website's code is available under the [MIT License](LICENSE).

The ORHAR name, logo, and branding are proprietary. Third-party libraries and services are listed on the [Licenses](licenses.html) page.

## 🙏 Acknowledgments

ORHAR is built with gratitude on the shoulders of:

- **The open-source community** — React Native, Expo, Firebase, and hundreds of libraries
- **The translators and contributors** who make ORHAR accessible across 7 languages
- **Every user** who climbs the mountain daily through Scripture

## 📬 Contact

| Channel | Link |
|---------|------|
| 🌐 Website | [orhar.com](https://orhar.com) |
| 📧 Email | [contact@orhar.com](mailto:contact@orhar.com) |
| 📱 App | Available on the App Store and Google Play |

---

<div align="center">
  <p><em>"Your word is a lamp to my feet and a light to my path."</em></p>
  <p>— Psalm 119:105</p>
</div>
