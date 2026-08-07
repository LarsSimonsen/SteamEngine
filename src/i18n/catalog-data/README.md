# Encyclopedia catalog translation data

This directory reserves a contributor-friendly data format for future encyclopedia
catalog presentation content. It is not consumed by the application yet; the current
runtime source remains `src/i18n/catalog-presentations.ts` until the catalog migration
is explicitly implemented.

Keep this data separate from canonical catalog identity and calculator data. Entries
are keyed by stable catalog IDs and contain presentation only:

- localized display names, descriptions, summaries, notes, and safety text;
- concept sections, paragraphs, formulas, examples, and tables;
- optional research links, which remain maintainer-reviewed.

Do not add slugs, formulas used by calculators, enum values, persistence fields,
manufacturer/model identity, or user-created data. Validate bundles against
`catalog-presentation.schema.json` and compare their IDs and protected fields with the
canonical catalog before importing them.

Use one file per locale and catalog category under this directory. The initial scaffold
contains English and Bokmål placeholders for concepts, materials, batteries, and mods.
Do not create a generic `no` bundle; Nynorsk requires its own complete locale review.
