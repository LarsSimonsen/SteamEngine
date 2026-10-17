---
title: Public repo is frontend only; learnings here are public
author: Lars
date: 2026-10-17
branch: master
cost: { minutes: 1, tokens: 2430 }
touches:
  - AGENTS.md
  - tools/validate-public-repository.mjs
---

## Decided
- This repository is public. It holds the frontend, translations and curated catalog data. The calculation code,
  the Worker and the research methodology live in a separate private repository.
- `.trail/learnings/` is committed and published like any other file. Save anything about the private repository
  (its paths, scripts, open findings) in that repository's own trail, or with `trail note --personal`.
- `npm run validate:public` scans every tracked and untracked file, learnings included, for private identifiers.

## Tried and ruled out
- Keeping cross-repository audit notes here and relying on review before commit: two such notes nearly got
  committed on 2026-10-17.

## Watch out
- Contributors can't change the catalog directly; it is derived from private curation, so point them to issues.
- API-dependent e2e tests run against the live API.
