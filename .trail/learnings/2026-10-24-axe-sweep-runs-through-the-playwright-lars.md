---
title: axe sweep runs through the Playwright static server now
author: Lars
date: 2026-10-24
branch: master
cost: { minutes: 12, tokens: 87475 }
touches:
  - CONTRIBUTING.md
  - package-lock.json
  - package.json
  - tools/playwright-static-server.mjs
  - tests/e2e/accessibility-baseline.json
  - tests/e2e/accessibility.spec.ts
  - tools/update-accessibility-baseline.mjs
  - README.md
---

## Decided
- Issue #24: `tests/e2e/accessibility.spec.ts` runs axe (WCAG 2.0/2.1/2.2 A and AA tags only, no best-practice rules) on 396 page and theme combinations. It is included in `npm run test:e2e` and runs alone with `npm run test:a11y`.
- Known violations live in `tests/e2e/accessibility-baseline.json` as rule → selector → page families (route without its locale prefix, or `"*"`). `npm run test:a11y:baseline` rewrites the file from `test-results/**/axe-violations.json`. Each fix should shrink it.
- `tools/playwright-static-server.mjs` now serves both build layouts: IIS folder indexes (`blog/index.html`) and the Cloudflare artifact's flat files (`blog.html`, `blog/page/2.html`, `privacy.html`). It also returns the build's `404.html` with a 404 status. This replaces the Oct 24 note that ruled out running axe through this server.
- The sweep aborts every third-party request and forwards only calculation API calls, through `routeToLiveApi`.

## Tried and ruled out
- Pinning `@axe-core/playwright` 4.14.0: it was 9 days old. 4.13.0 from August is used instead.

## Watch out
- On Oct 24, 2026, many existing calculator specs (converter, tcr, coil, battery-drain, mod-range, juice, wirewiz, numeric-drafts) fail with "Failed to fetch", with or without this change. They don't call `routeToLiveApi`, so the API's CORS allowlist rejects requests from 127.0.0.1.
- Playwright 1.61.1 needs `chromium_headless_shell-1228`. Run `npx playwright install chromium` after upgrading.
- Some header selectors differ between pages (`a[href$="catalog"]` vs `.site-nav__global > a[href$="catalog"]`), so the same contrast failure can appear under two baseline keys.
