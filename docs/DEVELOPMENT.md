# ORHAR Website Development Guide

Local repository path:
`/Users/kalain/Documents/APKDev2024/OrharAppProject/OrharWebsite/repo`

The website repository is maintained separately from the mobile app codebase (`/Users/kalain/Documents/APKDev2024/OrharAppProject/OrharBibleApp`).

## Build & Test Workflow

The website features an automated Node.js build system to ensure 100% consistency across all 7 supported languages.

### 1. Rebuilding Localized Pages

Whenever translations, templates, meta tags, or navigation headers change, re-generate all static pages:

```bash
# Rebuild all 7 localized homepages, preview, app and actuality pages
node scripts/build-homepages.mjs
```

### 2. Running Automated Validation Tests

Before committing any changes, run the validation test suite (550+ assertions):

```bash
# Run integrity checks (SEO, meta tags, language flags, links, cache versions)
node scripts/check-site.mjs
```

All tests must pass with zero errors.

### 3. Local Preview

To preview the website locally in your browser:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` and stop the server with `CTRL + C`.

## Asset & Screenshot Management

- **Format**: All screenshots must be encoded in **WebP** format for optimal compression and fast mobile loading times.
- **Storage**:
  - Localized screenshots are placed in `screenshots/locales/<lang>/`.
  - Generic screenshots are placed in `screenshots/`.
  - Uncompressed raw simulator captures (`.png`) are excluded via `.gitignore` to keep the repository lightweight.
- **Cache Busting**: When modifying CSS or JS files, update the version query parameter (e.g. `?v=21`) in the build scripts and check assertions in `check-site.mjs`.

## Branch Workflow

1. Create a descriptive feature/fix branch:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/my-feature
   ```

2. Make changes and run the build + test script:
   ```bash
   node scripts/build-homepages.mjs
   node scripts/check-site.mjs
   ```

3. Commit and push:
   ```bash
   git add .
   git commit -m "feat: description of change"
   git push origin feat/my-feature
   ```
