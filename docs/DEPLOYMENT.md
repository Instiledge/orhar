# ORHAR Website Deployment Guide

The ORHAR website is deployed to GitHub Pages and served under the custom domain **[orhar.com](https://orhar.com)**.

## Infrastructure

- **Production URL**: `https://orhar.com`
- **GitHub Repository**: `https://github.com/Instiledge/orhar`
- **Production Branch**: `main`
- **Backup Branch**: `backup-live-pre-1.3` (snapshots the previous production state)

## Deployment Flow

1. Complete and test all changes locally on a development branch.
2. Run automated validation:
   ```bash
   node scripts/build-homepages.mjs
   node scripts/check-site.mjs
   ```
3. Merge into the local `main` branch.
4. Push to remote:
   ```bash
   git push origin main
   ```
5. GitHub Pages automatically builds and publishes the new site version in 1 to 2 minutes.

## Rollback Strategy

If an unexpected issue occurs in production, you can immediately roll back to the previous stable state:

```bash
# Option 1: Fast rollback using the pre-1.3 backup branch
git checkout -B main origin/backup-live-pre-1.3
git push -f origin main

# Option 2: Revert a specific commit
git revert <commit_hash>
git push origin main
```
