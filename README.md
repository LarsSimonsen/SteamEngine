# Steam Engine

Steam Engine ([steam-engine.org](https://www.steam-engine.org)) is a set of vaping calculators and an
encyclopedia: Ohm's law, coil building, battery drain, mod range, temperature coefficients, Wire Wizard, juice
mixing and unit conversion, together with curated battery, coil-material and mod catalogs.

This repository contains the public website: the React/TypeScript frontend, the translations and the curated
catalog data that the site publishes. The calculators get their results from Steam Engine's calculation API, a
proprietary service that is not part of this repository.

## Repository layout

- `src/` – the multi-page React/TypeScript application. Each calculator lives under `src/pages/<route>/` with
  its own UI, domain logic, persistence and tests. Shared catalog modules live under `src/catalogs/`.
- `src/i18n/` – English source messages and every translated locale, with glossaries and per-entry review
  metadata. See [CONTRIBUTING.md](CONTRIBUTING.md).
- `src/pages/<route>/api.ts` – the adapters that call the versioned calculation API (`/api/v1/` and later).
- Generated catalog data under `src/catalogs/` – curated catalog data produced from a private research
  repository. See [Catalog data](#catalog-data).
- `advertising/` and `legacy-ad-site/` – the consent-aware advertising runtime and the legacy pages that the
  build publishes unchanged.
- `translation-quality/` – translation critique reports and the critique work queue.
- `tests/` – Playwright end-to-end tests. Unit tests sit next to the code they test.
- `tools/` – build, validation and translation tooling.
- `SITE-STRUCTURE.md` and `tools/route-contract.json` – the normative route and URL specification.

## Getting started

Use Node.js 22 or later.

```text
npm ci
npm run dev
```

Validation:

```text
npm run typecheck
npm test
npm run test:e2e
npm run validate:public
npm run build:cloudflare
```

`npm run build:cloudflare` builds and validates the complete site into `.build-runs/cloudflare-artifact/`, the
artifact deployed to Cloudflare Pages. It runs on any machine.

`npm run build` is the maintainer's local preview build: it builds into the inactive local IIS slot and asks the
Windows `SteamEngineIisSlotBroker` service to switch IIS to it. Without that service, use `npm run build:cloudflare`.
For focused work, `npm run build:partial -- nb`, `npm run build:partial -- coil all-locales` and
`npm run build:partial -- nb coil fast` build one locale, one route or one fast slice.

End-to-end tests forward calculation requests to the live API, so they need network access. Point
`PLAYWRIGHT_PUBLIC_ROOT` at a fresh build (for example `.build-runs/cloudflare-artifact`) when running them.

## Catalog data

The battery, coil-material and mod catalogs and the encyclopedia research summaries are generated from a private
research repository that curates them using a proprietary methodology. The generated files are:

- `src/catalogs/batteries/defaults.ts`
- `src/catalogs/materials/defaults.ts`
- `src/catalogs/mods/presets.json`
- `src/catalogs/entity-records/`

They contain only what the site displays. Pull requests that edit them cannot be merged; open a catalog issue
instead. See [CONTRIBUTING.md](CONTRIBUTING.md#catalog-data).

## Licenses

- Code, translations and documentation in this repository: [MIT License](LICENSE). The calculation API and its
  calculation code are proprietary and not covered.
- Curated catalog data: [Creative Commons Attribution 4.0](DATA-LICENSE.md).
- The Steam Engine name and logo are not licensed; see [TRADEMARKS.md](TRADEMARKS.md).
