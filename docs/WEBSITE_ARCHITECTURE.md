# ORHAR Website Architecture

The ORHAR website is a static multilingual website supporting the ORHAR Bible app.

## Purpose

The website provides:

- Commercial presentation of ORHAR
- Support and contact pages
- Legal pages
- Firebase Auth action handling
- App deep links and store fallbacks
- Natural Voice marketplace presentation
- Public updates and release messaging

## Technology

The website uses:

- HTML
- CSS
- Vanilla JavaScript
- Cloudflare Pages
- GitHub
- FormSubmit for contact forms
- Sender.net for newsletter forms
- Firebase web configuration where needed for auth actions

There is no build step.

## Main files

index.html
en/index.html
fr/index.html
es/index.html
de/index.html
it/index.html
pt/index.html
pl/index.html
contact.html
privacy.html
terms.html
licenses.html
action.html
app.html
updates.html
footer.html
service-worker.js
manifest.json
_headers
sitemap.xml
robots.txt

## Multilingual rule

The website supports seven languages:

en, fr, es, de, it, pt, pl

When a legal or marketing claim changes, all visible languages must stay aligned unless a page is intentionally language-specific.

## Security rule

The public website must never contain private secrets.

Firebase web configuration may be public when needed, but security must rely on Firebase Auth authorized domains, Firestore and Storage rules, API key restrictions, App Check where applicable, monitoring, and abuse controls.

## App relationship

The website is not the mobile app source code.

The real app source code is local to:

/Users/kalain/Documents/APKDev2024/OrharAppProject/OrharBibleApp

The website must accurately reflect the real app features and data flows.
