---
title: About page is hardcoded English and partly out of date
author: Lars
date: 2026-10-17
branch: master
cost: { minutes: 2, tokens: 39060 }
touches:
  - src/pages/about/about-page.tsx
  - DATA-LICENSE.md
---

## Decided
Nothing yet; a note about the public GitHub repository on /about is pending the maintainer's answers (purpose, placement, whether to mention the private calculation API, licence wording).

## Tried and ruled out
Nothing.

## Watch out
- `src/pages/about/about-page.tsx` is plain English JSX, not routed through `src/i18n` messages like the calculators.
- Its "Translations" paragraph still tells readers to use browser translation, although the site now ships its own locales.
- Its fine print says "All rights are mine", while the repo is MIT (LICENSE) and catalog data is CC BY 4.0 (DATA-LICENSE.md).
