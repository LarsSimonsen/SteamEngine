# Encyclopedia catalog translation data

This directory reserves a contributor-friendly JSON format for future encyclopedia
catalog presentation content. It is not consumed by the application yet. Runtime
presentation assembly lives in `src/i18n/catalog-presentations.ts`, with locale-owned
source under `src/i18n/catalog-presentations/`.

Battery, material, and mod presentation text use a normalized runtime model. Each locale file
exports one translation for each semantic text ID, while the category-specific text
modules map those IDs to every catalog entry that uses them. The resolvers materialize
the existing presentation shape for the UI. Do not copy a shared sentence into
individual entry records; add or reuse a semantic ID or typed template.

Exact duplicate English messages must share an ID. Near-identical messages may share an
ID only when their meaning and translation context are the same. Keep distinct IDs for
differences in current limits, temperature conditions, tested revisions, evidence, or
other safety-relevant qualifications.

Some older machine-materialized locale modules still keep their concept objects on one
generated line. The catalog text migrations deliberately preserve those unrelated
objects; their historical line-length exception should disappear when concepts move to
the normalized model.

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
Machine catalog drafts may be used by the application, but must carry review metadata
and be replaced only after human review. Do not create a generic `no` bundle; Nynorsk
requires its own complete locale review.
