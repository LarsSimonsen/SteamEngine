---
name: steam-engine-i18n-migration
description: >-
  Implement Steam Engine's build-time i18n architecture. Not for adding locales,
  English-source parity updates, or submitted translation corrections.
---

# Steam Engine static i18n migration

Use this skill for bounded internationalization work under `C:\htdocs\steamengine`.
Read `AGENTS.md` first. Keep the migration incremental and build-time: the site is a
static multi-page Vite application, not a server-rendered application.

## Locked decisions

- `src/i18n/locales.ts` is the enabled-locale authority. Do not duplicate its list here
  or infer enablement from cached/generated text. Keep explicit locale-owned source
  files for every message, calculator-message, and catalog-presentation bundle.
- Never create generic `no`. Translate Nynorsk directly from English, not from Bokmål.
- Keep existing unprefixed English routes unchanged. Generate translated routes under
  a locale prefix, for example `/nb/ohm` and `/nb/catalog/material/kanthal-a1`.
- Translate the current React calculators, shared chrome, home, and encyclopedia. Use
  `tools/route-contract.json` for the current route set.
- Do not add translation functionality to `old/`. Its existing Google Translate
  integration is historical behavior and must remain untouched.
- Leave blog and About translation outside the initial scope unless the user explicitly
  expands it. Do not make the translated site link to nonexistent translated pages.
- Localize all built-in catalog presentation fields, including names, descriptions,
  notes, category labels, enum labels, and safety text. Keep IDs, slugs, formulas,
  units, storage keys, and user-entered custom data language-neutral.
- Generate all localized content during `npm run build`. Do not add runtime locale
  detection, a locale cookie, or a locale `localStorage` setting for this migration.
- For development inspection, `npm run build:partial -- <locale>` can build one
  language, and `npm run build:partial -- <route> all-locales` can build one
  vertical slice across languages. Partial output is isolated under
  `.build-runs/<run-id>/public/`; it does not establish locale parity, complete link
  coverage, or deployment readiness.
- Make missing translation keys or incomplete locale content fail validation. Do not
  silently fall back to English in a completed locale.
- Treat drafting, parity maintenance, and human correction as separate workflows. Use
  their dedicated skills.

## Source and safety boundaries

- Put new implementation code under `src/` and build integration in `vite.config.mts`
  or focused build modules.
- Do not modify `legacy-ad-site/` or generated `public/old/` behavior.
- Preserve existing route names, extensionless IIS behavior, relative asset paths, and
  the 120-character source line limit.
- Do not reintroduce analytics, advertising, social integrations, browser translation
  scripts, or backend services.
- Before changing an overlapping file, inspect its current working-tree state and
  preserve unrelated user changes.

## Workflow

Execute one bounded phase at a time. Read [phases.md](references/phases.md) only for
the active phase and [number-input-policy.md](references/number-input-policy.md) only
for numeric-input work. Resolve failed checks before advancing. Report changed files,
validation, generated routes, and blocked decisions after each phase.

## Translation design rules

Read `../_shared/i18n-translation-contract.md` before creating message or catalog
structures. Use one source of truth for message IDs and validate locale parity. Do not
put translated display text into calculation formulas, URL construction, persistence
formats, or comparison logic. Keep unit symbols such as `V`, `A`, `W`, `Ω`, `°C`, and
`°F` stable; localize surrounding prose and use `Intl` for displayed numeric formatting.

Use `$steam-engine-add-locale` for complete English-based initial translation,
uncertainty research, locale glossaries, per-ID machine provenance, UI adaptation, and a
locale-specific draft PR. Use `$steam-engine-maintain-locale-parity` when canonical
English changes, and `$steam-engine-review-translation-corrections` when a human submits
corrected wording.

Read `references/phase-prompts.md` only when handing off a phase.

## Completion criteria

The migration slice is complete only when:

- English routes still work and every affected enabled locale route is generated.
- All in-scope visible and accessible copy is localized.
- Built-in catalog content is localized without changing calculation identity or saved
  data formats.
- Number parsing works for locale-appropriate input and unsupported-number-input
  fallback cases covered by tests.
- Locale metadata, IIS rewrites, sitemap entries, and internal links agree.
- Build, typecheck, tests, route checks, and available browser checks pass.
- `old/` and protected recovery artifacts remain unchanged.
