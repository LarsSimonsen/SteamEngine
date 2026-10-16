# i18n migration phases

Read only the active phase.

## 0. Audit

Inventory visible and accessible strings, generated metadata, calculators, home,
encyclopedia, and numeric-input paths. Record excluded About, blog, and `/old` content.
Do not refactor broadly.

## 1. Locale and build foundation

Add a small typed locale model and build-time context. Use semantic IDs, typed message
dictionaries, and locale content modules. Emit English at existing paths and translated
pages under their locale prefix. Update HTML metadata, route contract, sitemap, and link
checks together. Require complete static artifacts; never emit a partial enabled locale.

## 2. Shared chrome and home

Localize header, navigation, language links, theme controls, footer, home, shared
messages, visible text, and accessibility names. Link out-of-scope pages to English;
never fabricate translated routes.

## 3. Numeric input

Read `number-input-policy.md`. Keep `type="number"`; add `inputMode="decimal"` where
helpful. Prefer valid `valueAsNumber`, otherwise use one locale-aware parser. Preserve
the raw draft while typing and normalize on blur, commit, or calculation. Return a
localized validation state for ambiguous input. Unit-test the parser before page wiring.

## 4. Calculators

Migrate one calculator at a time. Localize all visible, accessible, validation, graph,
and export copy without changing domain logic, persistence, routes, or catalog IDs.
Run focused tests, typecheck, build, and browser smoke tests after each calculator.
Include navigation-hidden TCR.

## 5. Encyclopedia

Localize the hub, filters, breadcrumbs, metadata, labels, notes, and built-in catalog
presentation. Keep URLs and entity IDs stable. Generate locale content without mutating
canonical calculation data.

## 6. Full verification

Run `npm run typecheck`, `npm run test`, `npm run build`, and `npm run test:e2e` when
IIS/browser support is available. Smoke-test all English and translated routes, links,
numeric inputs, exports, theme, persistence, refresh, and representative catalog pages.
Inspect `lang`, title, canonical, and `hreflang`; confirm protected trees and `/old`
remain unchanged.
