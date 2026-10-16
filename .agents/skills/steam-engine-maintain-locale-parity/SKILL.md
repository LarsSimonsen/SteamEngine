---
name: steam-engine-maintain-locale-parity
description: >-
  Update every enabled Steam Engine locale after canonical English content changes.
  Not for new locales or submitted human corrections.
---

# Maintain Steam Engine locale parity

Keep all enabled locales aligned with a canonical English change. Read
`../_shared/i18n-translation-contract.md`.

## Invariants

- Treat the English locale-owned files and semantic IDs as canonical.
- Finish every affected enabled locale in the same application change. Missing content
  is a validation failure; never add a runtime English fallback.
- Preserve unaffected human-reviewed translations and their attribution.
- Stop after creating or updating the validated combined draft pull request. Never
  merge, deploy, or assign `approved` without explicit maintainer instruction.

## Change classification

Compare English source signatures and semantic IDs to identify:

- added IDs or newly translatable pages and fields;
- changed text, interpolation shape, purpose, or UI context;
- semantic moves or renames;
- deliberate removals; and
- source-only edits that do not alter meaning.

Do not invalidate unaffected IDs merely because another entry in the bundle changed.
Preserve a translation across a move only when identity and context demonstrably remain
equivalent. Remove locale entries only for deliberate English removals.

For pooled catalog text, distinguish a semantic-message change from a resolver-mapping
change. Audit every catalog entry that consumes a changed ID. Reuse an existing ID only
when all consumers retain equivalent meaning and context; split the ID when the change
applies to a subset.

## Translation workflow

1. Inventory the English delta and all affected enabled locales, routes, glossaries,
   review records, UI contexts, generated artifacts, and pooled catalog-text consumers.
2. For each locale, translate new entries and re-evaluate materially changed entries
   directly from English. Preserve sound text for non-semantic source edits.
3. Use the target locale's glossary. Update it when the English change introduces or
   changes a reusable concept.
4. Follow the research and style rules in `$steam-engine-add-locale` for uncertain
   wording. Complete the best translation even when online resources are unavailable or
   inconclusive, then mark that semantic ID `needs-review`.
5. Retain existing `reviewed` or `approved` status only for unaffected entries. Set new
   machine drafts to `machine`; return materially changed or uncertain entries to
   `needs-review` with current source signatures, provenance, confidence, reasons, and
   consulted resources.
6. Update the locale-wide review notice state from the per-ID records.

## Verification and GitHub workflow

- Validate exact key, placeholder, formula, protected-token, glossary, route, and page
  parity for every enabled locale.
- Use `npm run build:partial -- <locale>` for fast inspection of one locale, or
  `npm run build:partial -- <route> all-locales` for a focused cross-locale
  slice. Partial output under `.build-runs/<run-id>/public/` does not validate parity.
  Run focused tests, full typecheck, tests, and `npm run build`. Perform browser
  or IIS checks proportional to the affected surface, including narrow and wide
  layouts and accessibility text.
- Put all locale updates
  caused by the same English change into one `codex/locale-parity-<topic>` branch and
  one combined draft pull request.
- Organize the PR description by locale and semantic ID. Distinguish preserved human
  translations from machine-updated entries, and include uncertainty and source
  summaries.
- Report the English delta, affected locales and IDs, preserved review states, checks,
  visual findings, and draft PR. Stop before merge or deployment.
