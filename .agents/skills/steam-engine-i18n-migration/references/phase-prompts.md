# Phase prompts for simpler agents

Use one prompt at a time. Each prompt assumes the agent has read `AGENTS.md` and the
main `SKILL.md`.

## Phase 0: audit

> Use `$steam-engine-i18n-migration` and execute Phase 0 only. Inventory user-facing
> strings, generated content, numeric input paths, protected paths, and excluded content.
> Do not modify source files. Report the inventory, proposed translation boundaries, and
> any ambiguity that must be resolved before Phase 1.

## Phase 1: foundation

> Use `$steam-engine-i18n-migration` and execute Phase 1 only. Add the typed build-time
> locale model for every enabled locale, preserve existing English routes, and generate
> complete locale-prefixed static pages and metadata for the foundation slice. Update
> IIS and route checks
> together. Do not translate calculator copy yet. Run typecheck, tests, and build.

## Phase 2: shared chrome and home

> Use `$steam-engine-i18n-migration` and execute Phase 2 only. Localize shared navigation,
> language links, footer, theme controls, shared messages, and the home page for every
> enabled locale. Keep About, blog, and `/old` out of scope. Run focused tests and build
> every locale output.

## Phase 3: numeric input

> Use `$steam-engine-i18n-migration` and read `references/number-input-policy.md`.
> Execute Phase 3 only. Add and test the shared locale-aware numeric parser without
> changing calculator formulas. Cover native number inputs, text fallback, every enabled
> locale's separators, grouping separators, ambiguous separators, and existing field
> constraints.

## Phase 4: calculators

> Use `$steam-engine-i18n-migration` and execute Phase 4 only for [ROUTE]. Start with
> `ohm` unless another route is explicitly named. Localize visible and accessible copy,
> preserve domain and persistence behavior, and add or update focused tests. Do not
> modify other calculator routes. Run typecheck, tests, and build.

## Phase 5: encyclopedia

> Use `$steam-engine-i18n-migration` and execute Phase 5 only. Localize the encyclopedia
> hub, filters, breadcrumbs, metadata, property labels, notes, and all built-in catalog
> presentation fields for every enabled locale. Preserve IDs, slugs, formulas, and saved
> data. Verify representative generated detail pages and run the build.

## Phase 6: verification

> Use `$steam-engine-i18n-migration` and execute Phase 6 only. Run the full typecheck,
> test, build, route/link, and available browser checks for every enabled locale. Verify
> language metadata, canonical and `hreflang` links, locale navigation, numeric inputs,
> persistence, exports, and unchanged `/old` and protected reference trees. Report any
> remaining parity or translation issues without starting new implementation work.

For initial translation, English-source parity, or human corrections, use the matching
dedicated translation workflow skill instead of starting another migration phase.
