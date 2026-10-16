# Contributing to Steam Engine

Contributions to the code and the translations are welcome as pull requests. The curated catalog data is
generated elsewhere and is corrected through issues instead; see [Catalog data](#catalog-data).

## Code contributions

- Keep changes small and focused, and preserve existing behavior unless the change is meant to alter it.
- Use four spaces for indentation and keep lines within 120 characters.
- Treat WCAG 2.2 Level AA as the minimum accessibility target and prefer semantic HTML.
- Read `SITE-STRUCTURE.md` and `tools/route-contract.json` before changing routes, navigation, canonical URLs,
  redirects or generated links, and update them together.
- The calculation API is a separate, proprietary service. Frontend changes must keep using its existing versioned
  routes through the adapters in `src/pages/<route>/api.ts`; propose API changes in an issue.
- Run `npm run typecheck`, `npm test`, `npm run validate:public` and `npm run build:cloudflare` before opening a
  pull request. Add `npm run test:routes` and `npm run test:links` for route or link changes.

## Catalog data

The battery, coil-material and mod catalogs and the encyclopedia research summaries are generated from a private
research repository that curates them using a proprietary research methodology. These generated files are
overwritten by every catalog update:

- `src/catalogs/batteries/defaults.ts`
- `src/catalogs/materials/defaults.ts`
- `src/catalogs/mods/presets.json`
- `src/catalogs/entity-records/`

Pull requests that edit them cannot be merged, and the repository checks reject them. To suggest a new entry or
report an error, open a **Catalog suggestion** or **Catalog correction** issue and include your sources. Accepted
suggestions are researched privately and appear in a later catalog update.

Code that reads the catalog data is ordinary code and may be changed by pull request. Translations of catalog
text under `src/i18n/` are translations and follow the rules below.

## Translations

Steam Engine publishes machine-drafted translations for people to use and improve.

### Translation scope

Each enabled locale covers the shared interface, home page, current calculators, and localized catalog or
encyclopedia content. About, blog, and historical `/old` pages are outside the current translation surface.

English is the canonical source. Every target locale has explicit, human-editable files; translations are not
generated at runtime from English or another locale. Norwegian Bokmål uses `nb`, Nynorsk uses `nn`, and there is
no generic `no` locale.

Contributor-editable artifacts include:

- locale-owned shared and calculator message files;
- locale-owned catalog presentation data;
- per-semantic-ID review metadata;
- locale glossaries; and
- presentation-only catalog translation bundles when enabled.

Generated locale data, translation caches, application logic, canonical catalog identity, routes and persistence
formats are outside the translation surface. Change English source text only as part of a deliberate source
change, not in a translation pull request.

### Machine drafts and review status

A complete machine draft may be enabled before human language review after structural, automated, and visual
checks pass. The application identifies a locale as machine-drafted and links here while any required entry
still needs human review.

Review state is tracked per semantic ID:

- `machine`: an unreviewed model or provider draft;
- `needs-review`: a draft with material linguistic uncertainty;
- `reviewed`: wording corrected or confirmed by an identifiable human; and
- `approved`: explicitly approved by the maintainer.

A correction advances only the affected IDs to `reviewed`. It does not imply review of the whole page, bundle, or
locale. Automated checks and provider agreement are not human review.

### Suggest a correction

Contributors may either edit translation files in a pull request or open the translation correction issue form.
The issue form asks for:

- language or locale;
- page or calculator;
- current translated text;
- suggested replacement; and
- an optional explanation or terminology source.

Maintainers locate the semantic ID when an issue reporter does not know it. Accepted corrections retain
contributor attribution in review metadata and Git history.

When editing files, change translation presentation only. Preserve:

- interpolation placeholders and markup;
- formulas and mathematical symbols;
- IDs, slugs, URLs, enum and persistence values;
- unit symbols and product identity; and
- user-created names, notes, wires, coils, and recipes.

Report ambiguity instead of changing meaning to make a phrase sound smoother. Technical accuracy takes priority,
especially for safety text, electrical terms, calculator explanations, and catalog descriptions.

### Terminology and glossaries

Each locale has a reviewable glossary containing preferred technical terms, usage context, and discouraged
alternatives where useful. Follow the glossary for consistency. If a correction establishes a better reusable
term, propose the glossary change in the same contribution.

### Maintainer workflow

Maintainers use three separate workflows:

1. Add one new locale from English and open a locale-specific draft pull request.
2. Update all enabled locales when English changes and open one combined draft pull request organized by
   language.
3. Validate and apply incoming human corrections without broadening their review state.

All workflows stop before merge and deployment unless the maintainer explicitly asks for those actions. Before
merging, maintainers run the typecheck, tests, build, route and link checks, and relevant browser checks.

Translation providers are never called by the build. Automated research and drafting must respect provider
limits, record provenance and uncertainty, and never use English as a silent fallback.

## License of contributions

By submitting a contribution you agree to license it under the license of the area it changes: the
[MIT License](LICENSE) for code, translations and documentation. Catalog data is not accepted by pull request, so
no separate data contribution license applies.
