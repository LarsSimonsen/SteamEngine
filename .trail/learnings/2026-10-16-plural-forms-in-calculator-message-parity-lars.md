---
title: Plural forms in calculator message parity
author: Lars
date: 2026-10-16
branch: master
cost: { minutes: 5, tokens: 52229 }
touches:
  - ".github/ISSUE_TEMPLATE/translation-correction.yml"
  - CONTRIBUTING.md
  - README.md
  - src/i18n/calculator-messages/batt/ar.ts
  - src/i18n/calculator-messages/batt/bn.ts
  - src/i18n/calculator-messages/batt/da.ts
  - src/i18n/calculator-messages/batt/de.ts
  - src/i18n/calculator-messages/batt/el.ts
  - src/i18n/calculator-messages/batt/en.ts
  - src/i18n/calculator-messages/batt/es.ts
---

## Decided
- Calculator message parity (`calculatorMessageParityIssues` in src/i18n/calculator-messages.ts) accepts extra
  plural forms as a rule, not an allowlist: a locale key passes if it is an English key + `Zero`/`Two`/`Few`/`Many`
  (via `pluralFormKey`) and that category is in `Intl.PluralRules(locale).resolvedOptions().pluralCategories`.
- English keys carry the "one" (`cell`) and "other" (`cells`) forms; e.g. Polish adds `cellsFew`.
- `cellCountLabel` (batt) uses the same `pluralFormKey` lookup, falling back to `cells`.

## Tried and ruled out
- Removing `pl` `cellsFew`: Polish needs it for 2–4, 22–24 cells ("ogniwa" vs "ogniw").
- Per-key optional allowlist: doesn't scale to uk/ar and would let a pointless `cellsFew` into da/en.

## Watch out
- Real English keys can look like plural forms: tcr has `about` and `aboutTwo`, and Arabic has a "two" category.
  The check skips any key that exists in English; keep that guard.
- Testing an extra key on `en` proves nothing (it changes the reference set); use another locale such as `da`.
