---
name: steam-engine-add-locale
description: >-
  Add and validate a complete Steam Engine locale from English. Use for a new
  language or regional/script locale, not parity updates or human corrections.
---

# Add a Steam Engine locale

Create one complete locale after resolving its exact BCP 47 tag. Read
`../_shared/i18n-translation-contract.md`; it owns translation style, research,
metadata, glossary, route, and publication rules. Use
`$steam-engine-i18n-migration` only for broader i18n architecture changes.

## Boundaries

- Scope only the current translatable surface. Do not add About, blog, or `/old`.
- Translate directly from English locale-owned content; other locales are terminology
  evidence only.
- Ask only when a material locale/script choice remains ambiguous.
- Complete every required entry without runtime English fallback.
- A request to add a locale authorizes Google Translate for the bounded bulk draft
  unless the user or project forbids external services. Evaluate its output and retain
  machine provenance; it is never human review.
- Stop before merge, deployment, or `approved` status unless explicitly requested.

## Implementation workflow

1. Inspect the worktree and inventory the complete English surface: messages,
   calculator and catalog bundles, overrides, routes, metadata, accessible copy,
   validations, exports, and review records. Translate pooled catalog semantic IDs,
   not expanded per-entry output.
2. Add the locale definition, explicit locale-owned files, generated routes, language
   link, metadata, glossary, and per-entry review records. Keep English routes
   unprefixed and use the agreed locale tag for translated routes and `hreflang`.
3. Draft from English, research uncertainty under the shared contract, and validate
   keys, interpolation, protected tokens, and resolver consumers. A cache is resumable
   drafting support, not runtime data or approval.
4. Implement scoped language requirements such as `dir="rtl"`, bidirectional layout,
   system-font fallbacks, logical CSS, line wrapping, and label expansion. Do not add
   external fonts or broadly redesign the interface without approval.
5. Show the locale-wide machine-draft notice and correction link while any entry is
   `machine` or `needs-review`.
6. Use `npm run build:partial -- <locale>` only for iteration. Finish with focused
   tests, full typecheck, tests, `npm run build`, and available narrow/wide browser or
   IIS checks of the full locale, including keyboard access, numeric input,
   persistence, exports, metadata, links, overflow, and bidi behavior.
7. Create a `codex/locale-<tag>` branch in this repository, stage only the locale's
   translation, review, glossary, and required application files, commit, push, and open
   one draft pull request for the locale. Organize its description by bundle and list
   uncertain semantic IDs with confidence and consulted sources.
8. Report application files changed, locale coverage, checks, visual findings, glossary
   decisions, unresolved uncertainties, and the draft PR. Stop before merge or deploy.

Ask only for a material product decision, external font, or ambiguous locale variant.
Record ordinary linguistic uncertainty and continue.
