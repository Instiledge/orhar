# ORHAR Website Development Guide

Local repository:

/Users/kalain/Documents/APKDev2024/OrharAppProject/OrharWebsite/repo

The website repository is separate from the mobile app source code.

Mobile app source:

/Users/kalain/Documents/APKDev2024/OrharAppProject/OrharBibleApp

## Local preview

Run:

python3 -m http.server 8080

Open:

http://localhost:8080

Stop with CTRL + C.

## Branch workflow

Do not work directly on main for meaningful changes.

Use:

git checkout main
git pull origin main
git checkout -b fix/example-change

Recommended branch names:

fix/privacy-policy-data-flows
fix/store-links
feature/voices-marketplace
chore/readme-cleanup
chore/security-headers

## Before committing

Run:

git status
git diff

Never commit private files, credentials, Firebase service account JSON files, .env files, node_modules, or .DS_Store.

## Commit and push

git add .
git commit -m "Describe the change"
git push -u origin branch-name

After pushing, Cloudflare Pages should create a Preview Deployment for the branch.
