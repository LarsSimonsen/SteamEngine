# Translation contributions

Steam Engine publishes machine-drafted translations for people to use and improve.
Translations are reviewed through a separate translation-only GitHub workspace; the
application repository is not mirrored there.

## Translation scope

Each enabled locale covers the shared interface, home page, current calculators, and
localized catalog or encyclopedia content. About, blog, and historical `/old` pages are
outside the current translation surface.

English is the canonical source. Every target locale has explicit, human-editable
files; translations are not generated at runtime from English or another locale.
Norwegian Bokmål uses `nb`, Nynorsk uses `nn`, and there is no generic `no` locale.

Contributor-editable artifacts include:

- locale-owned shared and calculator message files;
- locale-owned catalog presentation data;
- per-semantic-ID review metadata;
- locale glossaries; and
- presentation-only catalog translation bundles when enabled.

Generated locale data, translation caches, application logic, canonical catalog
identity, routes, persistence formats, and protected historical references are outside
the contribution surface.

## Machine drafts and review status

A complete machine draft may be enabled before human language review after structural,
automated, and visual checks pass. The application identifies a locale as
machine-drafted and links here while any required entry still needs human review.

Review state is tracked per semantic ID:

- `machine`: an unreviewed model or provider draft;
- `needs-review`: a draft with material linguistic uncertainty;
- `reviewed`: wording corrected or confirmed by an identifiable human; and
- `approved`: explicitly approved by the maintainer.

A correction advances only the affected IDs to `reviewed`. It does not imply review of
the whole page, bundle, or locale. Automated checks and provider agreement are not human
review.

## Suggest a correction

Contributors may either edit translation files in a pull request or open the translation
correction issue form. The issue form asks for:

- language or locale;
- page or calculator;
- current translated text;
- suggested replacement; and
- an optional explanation or terminology source.

Maintainers locate the semantic ID when an issue reporter does not know it. Accepted
corrections retain contributor attribution in review metadata and GitHub history.

When editing files, change translation presentation only. Preserve:

- interpolation placeholders and markup;
- formulas and mathematical symbols;
- IDs, slugs, URLs, enum and persistence values;
- unit symbols and product identity; and
- user-created names, notes, wires, coils, and recipes.

Report ambiguity instead of changing meaning to make a phrase sound smoother. Technical
accuracy takes priority, especially for safety text, electrical terms, calculator
explanations, and catalog descriptions.

## Terminology and glossaries

Each locale has a reviewable glossary containing preferred technical terms, usage
context, and discouraged alternatives where useful. Follow the glossary for consistency.
If a correction establishes a better reusable term, propose the glossary change in the
same contribution.

## Maintainer workflow

Maintainers use three separate workflows:

1. Add one new locale from English and open a locale-specific draft pull request.
2. Update all enabled locales when English changes and open one combined draft pull
   request organized by language.
3. Validate and apply incoming human corrections without broadening their review state.

All workflows stop before merge and deployment unless the maintainer explicitly asks
for those actions. New or changed translations are synchronized only through the
application repository's allowlisted translation tool. That boundary rejects executable
changes, English-source edits from the translation checkout, structural changes, and
protected-token changes.

After import, maintainers run the application's typecheck, tests, build, route and link
checks, and relevant browser checks.

Translation providers are never called by the build. Automated research and drafting
must respect provider limits, record provenance and uncertainty, and never use English
as a silent fallback.

## License

The translation repository, including machine drafts, glossaries, review metadata, and
human corrections, is licensed under the MIT License. By submitting a translation
contribution, you agree to license your contribution under that repository license.
