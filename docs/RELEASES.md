# ORHAR Website Releases

This document tracks notable updates and releases for the ORHAR official website.

## 2026-09-30 — ORHAR 1.3 Major Website Refresh

Comprehensive redesign and alignment with ORHAR Mobile App v1.3:

- **Full Feature Parity**: Added sections for ParoBible, SianAQuiz, Meditbrary, Reading Plans, Voices Marketplace, and Liturgical Path.
- **Multilingual Support (7 Languages)**: Localized homepages, app pages, gallery previews, and actuality feeds across `en`, `fr`, `es`, `de`, `it`, `pt`, `pl`.
- **Localized Screenshots**: Integrated high-resolution WebP screenshots in all 7 supported languages.
- **Interactive Bible Carousel**: Verse of the day and themed scripture carousel with copy, share, and read-tracking controls.
- **Theme Engine**: Light/Dark mode switcher with persistent user preference storage across sessions.
- **Live Actuality Feed**: Dynamic update notification banner powered by `actuality-data.json`.
- **SEO & Social Sharing**: Complete OpenGraph, Twitter Cards, Schema.org `SoftwareApplication` JSON-LD, and multi-language `hreflang` XML sitemap.
- **Form & Contact**: FormSubmit contact integration with honeypot spam filtering and newsletter signup.
- **Automated Tooling**: Automated static generation scripts (`build-homepages.mjs`, `secondary-pages.mjs`, `build-news.mjs`) and comprehensive 550+ assertion test suite (`check-site.mjs`).

## 2026-06-26 — Workflow & Infrastructure Setup

Initial repository workflow and technical documentation:
- Architecture, development, and deployment guides.
- Initial static multi-language routing structure.
