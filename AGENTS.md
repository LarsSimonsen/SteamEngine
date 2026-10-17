# Steam Engine agent guide

## Project boundaries

Steam Engine uses a React/TypeScript frontend on Cloudflare Pages and a proprietary TypeScript calculation Worker
that is not part of this repository. Keep UI and browser persistence in the frontend. `src/pages/<route>/domain.ts`
holds only types and browser-side helpers; calculations belong to the calculation API, called through the adapters
in `src/pages/<route>/api.ts`. Do not add calculation implementations to this repository.

## Generated catalog data

These files are generated from a private research repository and must not be edited here:

- `src/catalogs/batteries/defaults.ts`
- `src/catalogs/materials/defaults.ts`
- `src/catalogs/mods/presets.json`
- `src/catalogs/entity-records/`

They contain only the fields the site displays and are licensed under CC BY 4.0 (`DATA-LICENSE.md`). Do not add
research metadata, scores, provenance or internal source paths to them or to the types that read them.
`npm run validate:public` rejects unknown catalog fields and private research identifiers. Code that reads the
data may be changed normally; a change that needs a new catalog field requires a matching generator change in the
private repository and an update to the allowlist in `tools/validate-public-repository.mjs`.

## Versioned project skills

The project skills are versioned in the tool-neutral `.agents/skills/<name>/SKILL.md` layout. Agents that do not
discover that folder automatically must list it and read the matching `SKILL.md` before an operational or
multi-step task. Keep this guide current when adding, renaming, or removing a skill.

The `.agents/skills/commit-changes/` skill is the required workflow for explicit commit requests. Use
`$commit-changes` to stage only task-related paths, validate the staged diff, and create a concise Conventional
Commit; do not use broad Git staging commands when following that workflow. An explicit `push` request authorizes
pushing the resulting commit to the current branch's configured upstream.

The `.agents/skills/steam-engine-cloudflare-pages-publishing/` skill is the canonical workflow for frontend
deployment to the `steam-engine` Cloudflare Pages Direct Upload project.

For local IIS configuration, use `.agents/skills/local-iis-web-config-maintenance/` and
`.agents/skills/url-rewrite-maintenance/`.

For translation work, use the workflow matching the task:

- `.agents/skills/steam-engine-add-locale/` for a complete new locale;
- `.agents/skills/steam-engine-improve-translations/` for resumable critique and quality improvement of an
  existing locale;
- `.agents/skills/steam-engine-related-language-review/` for a scoped comparison of related languages or regional
  variants;
- `.agents/skills/steam-engine-maintain-locale-parity/` when canonical English changes;
- `.agents/skills/steam-engine-review-translation-corrections/` for incoming human fixes; and
- `.agents/skills/steam-engine-i18n-migration/` for broader application i18n architecture.

All translation workflows share `.agents/skills/_shared/i18n-translation-contract.md`. Machine drafts may be
released after validation but must remain visibly pending human review. Translation workflows stop before merge
and deployment unless the user explicitly requests those actions.

## Site structure contract

Before changing public routes, navigation, page names, catalog links, locale prefixes, canonical URLs, redirects,
rewrites, sitemap generation, or generated internal links, read `SITE-STRUCTURE.md` and
`tools/route-contract.json`.

Treat `SITE-STRUCTURE.md` as the normative product specification and `tools/route-contract.json` as its executable
route matrix. Do not introduce a route or link convention that conflicts with either. If they disagree, treat the
disagreement as a defect and determine which artifact must change rather than silently choosing one.

Site-structure changes must update the specification, executable contract, implementation, and relevant tests
together. Run `npm run test:routes` and `npm run test:links`, plus the normal validation required for affected
files.

## Editing conventions

- Preserve existing behavior unless the task explicitly changes it.
- Prefer small, calculator-specific changes over broad rewrites.
- Apply KISS (Keep It Simple, Stupid): choose the simplest clear solution that meets current requirements.
- Apply YAGNI (You Aren't Gonna Need It): do not add functionality or abstractions for speculative future needs.
- Use the rule of three as a rule of thumb: consider extracting a shared abstraction when the same pattern
  appears for the third time; use judgment rather than treating this as a rigid requirement.
- Preserve UTF-8 text and existing line-ending style.
- Maximum line length is 120 characters for source code, CSS, and HTML. Wrap long attributes, expressions, and
  declarations without changing behavior.
- Avoid unrelated formatting changes.
- Keep route names and page/body identifiers stable: `about`, `batt`, `coil`, `converter`, `juice`, `modrange`,
  `ohm`, `tcr`, and `wirewiz`.
- `legacy-ad-site/` and `advertising/` are published as they are; change them only when the task is about them.
- Do not add server-side persistence, telemetry, advertising, another backend, or new third-party services
  without explicit authorization. Preserve the frontend/backend responsibility split and the versioned API
  contracts.
- Calculation API changes are made in the private Worker repository. Treat a backend behavior change as an
  API-versioning decision before deployment. If the same request can produce a
  different successful response, serialization, or validation result, give the changed contract a new versioned route or
  another explicit version component in the browser cache identity. Update the frontend adapter and contract tests in the
  same change. Keep the previous version available with its previous behavior unless retirement is explicitly planned and
  authorized. A deployment or page reload is not cache invalidation: successful API responses may remain in browser
  `localStorage` for one year.

### Accessibility and semantic HTML

- Apply the accessibility requirements in this section to all new or modified frontend code.
- Treat WCAG 2.2 Level AA as the minimum target. Meet stricter Level AAA criteria wherever they are practically
  achievable and appropriate for the affected interface.
- Prefer the correct, sensible semantic HTML element over a generic `<div>` or `<span>` whenever doing so improves
  accessibility, document structure, or machine parseability. Use native elements and behavior before adding ARIA.
- When preserving historical behavior conflicts with these requirements, retain compatibility only as far as necessary
  and document any accessibility limitation that cannot reasonably be corrected in the current change.

### Source style

- Use four spaces per indentation level; do not use tabs for indentation.
- Keep TypeScript, TSX, CSS, and HTML readable and within the 120-character line limit.
- Match the surrounding file's wrapping, naming, and declaration style when making a focused change.
- Prefer clear names and small functions; comments should explain intent or non-obvious constraints rather than
  restate code.
- Keep domain logic, UI, and persistence concerns separated according to the existing calculator structure.
- Do not apply broad formatting changes to unrelated files.

## Validation

Run checks proportional to the files changed:

- Always build after completing any source, CSS, or HTML change. On the maintainer's machine, `npm run build`
  validates the inactive local IIS slot and asks the `SteamEngineIisSlotBroker` service to switch the configured
  IIS site to it. If the broker is unavailable, do not invoke AppCmd directly or run the build as administrator;
  install or start the broker through `tools/iis-slot-broker/`. Sandboxed processes may run under a different
  Windows identity; if the build reports that the host Windows identity is required, rerun the same command with
  host execution approval. Elsewhere, use `npm run build:cloudflare`, which builds and validates the complete
  Cloudflare Pages artifact without contacting the broker.
- Run `npm run typecheck`, `npm test`, and `npm run validate:public`.
- End-to-end tests forward calculation requests to the live API; set `PLAYWRIGHT_PUBLIC_ROOT` to a fresh build.
- After HTML changes, inspect the affected page in a browser.
- Exercise local settings save/load behavior after changing persistence keys or value formats.

At minimum, test the calculator or page directly affected by a change. For shared utilities, smoke-test all twelve
live routes when practical. Do not claim that a source edit is deployed until the corresponding preview or
deployment has deliberately been rebuilt and tested.

## Documentation

Update `README.md` or `CONTRIBUTING.md` when a change alters the build process, deployment behavior, contribution
workflow or licensing.

<!-- trail:start -->
## Trail — repo context graph

This repo is indexed in `.trail/cache/`: small linked markdown nodes that explain each
system and carry exact file:line spans, kept in sync with the code through git.

For ANY task here — understanding how something works, finding where code lives,
or scoping a change — get context from the graph before grepping or opening
source files. Re-ask freely (it's cheap) and reuse literal identifiers you
already have (symbol, error string, file name) as the query. New to this repo?
Run `trail map` first — a token-budgeted orientation (dir clusters, hubs,
hotspots), no LLM, no key.

- Run `trail ask "<your question>" --source` → ranked nodes with the relevant
  code spans inlined (each hit's ≤8-line crux by default; `--full` for whole
  definitions when the crux isn't enough). Match the tool to the task shape:
  for understanding or editing, the top node IS the answer — cite its
  `covers:` file:line spans and edit straight from `--source`. For
  exhaustive tasks ("every occurrence / every caller of this pattern"), ranked
  results are top-N, not complete — run `trail grep "<literal>"` instead
  (exhaustive over indexed files, grouped by enclosing symbol), falling back
  to raw `grep -rn` only for unindexed files.
- `trail skeleton <file>` → every definition's signature + span, ~10× cheaper
  than reading the file; use it to skim an API surface.
- `trail callers <symbol>` gives precomputed, exact edges — who calls this.
  Add `--direction out` for what it calls, or `--depth N` to walk
  transitively for the full blast radius. For structural questions, skip
  ranking and use this directly.
- Or browse: `.trail/cache/INDEX.md` lists every node; follow the links.
- Monorepos and folders of multiple repos rank fairly across sub-projects —
  hits carry `[scope/]` labels naming which one they're from. Narrow with
  `trail ask "<task>" --in <scope>/` once you know where you're working.

If a returned span is truncated ("+N more lines"), open the file at that exact
range before finalizing. Only open source files when a node genuinely lacks a
needed detail, and then at the exact file:line the node points to — never
re-read whole files.

After big code changes, refresh the graph with `trail build` (deterministic,
no API key, $0).
<!-- trail:end -->

### Learnings are public

This repository is public, and `.trail/learnings/` is committed with it. Write team learnings only about this
repository's public code and data. Save anything about the private calculation Worker or research repository, such
as its paths, scripts, deployment steps or open findings, in that repository's own trail or with
`trail note --personal`. `npm run validate:public` rejects known private identifiers in learnings as in every other
file, but it cannot recognize every private detail.
