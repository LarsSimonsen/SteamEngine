---
title: npm 10 in CI rejects lock files written by local npm 11
author: Lars
date: 2026-10-24
branch: master
cost: { minutes: 3, tokens: 59451 }
touches:
  - package-lock.json
  - src/blog/generator.ts
  - ".agents/skills/steam-engine-cloudflare-pages-publishing/SKILL.md"
  - ".github/workflows/public-repository-checks.yml"
  - CONTRIBUTING.md
  - package.json
  - tests/e2e/accessibility-baseline.json
  - tests/e2e/accessibility.spec.ts
  - tools/update-accessibility-baseline.mjs
  - src/blog/generator.test.ts
---

## Decided
- CI installs with Node 22 (npm 10). Check a lock-file change with `npx -y npm@10 ci --dry-run --ignore-scripts` before pushing; the local npm 11 accepts lock files that npm 10 rejects.

## Tried and ruled out
- Regenerating the lock file with `npm install --package-lock-only`: it also upgraded `axe-core` and `@axe-core/playwright` to 4.14.0.

## Watch out
- Adding axe with the local npm 11.6.1 removed the optional top-level `node_modules/@emnapi/runtime` 1.11.3 entry, which only wasm bindings use. `npm ci` on the Windows CI runner then failed with "Missing: @emnapi/runtime@1.11.3 from lock file". The fix was to restore that one entry by hand.
