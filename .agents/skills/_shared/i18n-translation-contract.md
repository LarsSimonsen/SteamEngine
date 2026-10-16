# i18n translation contract

Use this reference when creating, maintaining, reviewing, importing, or materializing
localized Steam Engine content.

## Locale model and scope

- English (`en`) is the canonical source locale and keeps its unprefixed routes.
- `src/i18n/locales.ts` is the locale registry; never duplicate its changing locale list
  in a skill. Nynorsk is independent: translate it from English, never from `nb`.
- Do not create a generic Norwegian `no` locale.
- Resolve the exact BCP 47 locale before drafting. Ask the user when regional or script
  variants materially differ; otherwise use the normal language tag.
- Locales retain route segments and catalog slugs under a locale prefix. Emit
  `hreflang` only for complete equivalent pages.
- Match the current translatable surface: shared chrome, home, calculators, and
  localized catalog or encyclopedia content. About, blog, and `/old` remain outside
  scope until a separate application change expands it.
- Enable only complete locales. Every locale must have explicit locale-owned source
  files, a definition, routes, review metadata, parity validation, focused tests, and
  any required writing-system support.
- Do not use runtime English fallback for a supported locale. When a translation remains
  uncertain, use the agent's best target-language wording and mark it `needs-review`.

## Canonical source and message structure

Translate from English locale-owned content, not another translation. Use stable
semantic IDs grouped by responsibility, for example:

```text
nav.catalog
common.reset
ohm.validation.invalidResistance
encyclopedia.search.placeholder
```

Do not use visible English sentences or translated text as IDs. Keep interpolation
values structured and typed where practical:

```text
catalog.resultsCount({ count })
wirewiz.temperatureAt({ temperature, unit })
```

Every locale must provide the same required key set as English. Extend the shared
message API when a target language genuinely requires plural forms, agreement, or a
different grammatical structure. Update all enabled locales and tests with that narrow
extension rather than forcing an unnatural translation.

## Translation standard

- Use concise, precise, friendly contemporary language, natural address, official
  orthography, and established technical usage. Prefer accuracy over elegance.
- Preserve placeholders, markup, formulas, mathematical symbols, IDs, slugs, URLs,
  enums, persistence fields, unit symbols, product identity, CSV columns, and user data.
- Separate identity from presentation. Translate names, labels, help, notes, safety
  text, and descriptions only where they are explicitly presentation fields.
- Keep user-created names, notes, markings, wires, coils, and recipes as entered.
- Keep long-form content in dedicated locale files. Calculator messages remain split by
  calculator and locale.

## Machine drafting and research

The active model's target-language knowledge is the primary drafting method. External
providers and online references are optional research tools, never runtime or build
dependencies.

Research terminology, register, safety wording, or meaning when confidence is low.
When available, compare two independent authoritative or native-usage resources;
machine-provider agreement is weak evidence. For vaping terminology, prefer standards,
manufacturer documentation, independent tests, and established reference works. If
evidence is unavailable or inconclusive, translate as well as possible and record
uncertainty instead of falling back to English or blocking.

Do not copy substantial source text. Record consulted resource names or links, the
conclusion, and a short uncertainty reason against the semantic ID.

## Per-entry review metadata

Track review at semantic-ID granularity. Each required target entry records:

- the current English source signature;
- state: `machine`, `needs-review`, `reviewed`, or `approved`;
- provenance and drafting method, including active model identity when known;
- confidence and any uncertainty reason or consulted resources; and
- reviewer identity and review date for `reviewed` or `approved` entries.

English entries use `source`. Model or provider agreement never constitutes human
review. A human correction advances only the corrected IDs to `reviewed`; `approved`
requires explicit maintainer action. When English meaning or context changes, return
only affected target IDs to machine review. Preserve unaffected human-reviewed text and
attribution.

Machine-drafted locales may be enabled and released after structural, automated, and
visual validation. While any required entry remains `machine` or `needs-review`, show a
locale-wide machine-draft notice with a link to correction instructions. Remove it only
when every required entry is `reviewed` or `approved`.

## Locale glossary

Maintain one locale-owned, versioned glossary as non-runtime review data. Include the
English concept, preferred target term, usage context, discouraged alternatives when
useful, provenance, confidence, and review state. Keep it consistent with translations
and synchronize it to the translation repository. Do not use translated text as a
calculation or persistence identity.

## Catalog, formatting, and page metadata

Catalog localization separates canonical IDs and display-name overrides from reusable
typed presentation dictionaries. Translate each shared message or template once per
semantic ID; use entry-specific IDs only for distinct meaning or context. Split a
shared ID when a correction applies to only some consumers.

Do not copy canonical calculation inputs, persistence fields, or product identity merely
to provide translation context. Preserve interpolation arguments and verify the rendered
fan-out across every catalog entry that consumes a changed semantic ID.

Use `Intl.NumberFormat` and `Intl.DateTimeFormat` at the presentation boundary. Keep
unit symbols stable and never pass localized number strings into domain functions.

Every localized page has the correct `lang`, writing direction where required,
localized title and description, canonical URL, complete-locale `hreflang` links, and
locale-preserving internal links. Preserve existing English URLs and IIS behavior.

## Contribution and publication boundary

Translation drafts, glossaries, metadata, and human corrections in the translation
repository use its MIT License. Contribution instructions must state that submissions
are licensed under that repository license. Git history and pull requests retain
contributor attribution.

New locales use one locale-specific draft pull request. One English-source change uses
one combined draft pull request covering every affected enabled locale. Corrections may
arrive through pull requests, review comments, a GitHub correction issue form, or text
provided directly by the user. Workflows stop before merge, deployment, and maintainer
approval unless explicitly instructed otherwise.
