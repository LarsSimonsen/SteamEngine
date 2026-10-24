---
title: "WCAG 2.2 AA audit and remediation plan (issue #51)"
author: Lars
date: 2026-10-24
branch: master
cost: { minutes: 21, tokens: 387278 }
touches:
  - tools/playwright-static-server.mjs
  - src/blog/generator.ts
---

## Decided
- The frontend targets WCAG 2.2 AA. The plan lives in tracking issue #51, with sub-issues #24–#50 grouped A (guard rails), B (shared chrome), C (calculators), D (catalog/compare/blog) and E (verification and statement).
- Scope: the current site, catalog, comparisons, blog, ad containers and every locale. `/old` (legacy-ad-site) and third-party ad content are out of scope and will be listed as known limitations.
- Order: axe regression guard first, with a known-violations baseline that each step shrinks; then shared chrome; then calculators.
- Wire Wizard's temperature switcher becomes `aria-pressed` toggle buttons, not full tabs. The comparison picker becomes a plain button list, not a listbox or combobox.
- In CI, the axe sweep covers only pages that don't call the calculation API. The full sweep, calculators included, runs locally before deployment.
- Manual AT testing uses NVDA (Firefox and Chrome) and Narrator/Magnifier.

## Tried and ruled out
- Running axe through `tools/playwright-static-server.mjs` against the `build:cloudflare` artifact: it returns 404 for `/privacy`, `/blog`, blog pages and the 404 page, because the artifact has `blog.html` and `privacy.html` while the server expects `blog/index.html`. The scans looked like missing `lang`/`title` failures, but that was the server, not the pages. Serve the artifact with plain path → `.html` fallback instead.

## Watch out
- Header white on `--se-brand-blue` `#428bca` is 3.63:1. It is the single biggest axe failure, on almost every page.
- `--se-panel`, used by the backend error dialog, is undefined, so the dialog is unreadable in the light theme.
- `--se-border` is about 1.3–1.6:1, too faint for form control boundaries (1.4.11).
- The blog shell in `src/blog/generator.ts` duplicates the React header and footer, so chrome fixes must be made in both places.
- Under Git Bash, arguments like `/ohm` get rewritten into Windows paths. Use `MSYS_NO_PATHCONV=1`.
