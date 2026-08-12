# ORHAR Website Deployment Guide

The ORHAR website is deployed through Cloudflare Pages from GitHub.

Production domain:

https://orhar.com

Cloudflare Pages domain:

https://orhar.pages.dev

GitHub repository:

https://github.com/Instiledge/orhar

Production branch:

main

## Deployment flow

Local branch
→ Push to GitHub
→ Cloudflare Preview Deployment
→ Review preview URL
→ Merge into main
→ Cloudflare Production Deployment
→ https://orhar.com

## Preview deployments

Every non-main branch pushed to GitHub should create a Cloudflare Preview Deployment.

Use previews to validate changes before production.

## Rollback

If production has a problem, use Cloudflare Pages deployment rollback if available.

Alternatively, revert the Git commit:

git checkout main
git pull origin main
git revert <commit_hash>
git push origin main
