# Steam Engine translations

This repository contains only the translation source files used by the Steam Engine
application. It is intentionally not a copy of the application repository.

The initial review language is Bokmål (`nb`). Nynorsk (`nn`) is a separate locale; do
not introduce a generic `no` locale. Each translation bundle keeps one source file per
locale so reviews can be scoped cleanly.

## Translation source

- `src/i18n/messages/{en,nb,nn}.ts`
- `src/i18n/calculator-messages/{batt,coil,converter,juice,modrange,tcr,wirewiz}/`
  with `en.ts`, `nb.ts`, and `nn.ts` inside each calculator folder
- `src/i18n/catalog-presentations/{en,nb,nn}.ts`
- `src/i18n/translation-review.json`
- `src/i18n/catalog-data/` for future encyclopedia presentation bundles

Do not add calculator logic, catalog identity, route definitions, generated output,
translation caches, or protected reference files here. The application repository
imports reviewed changes through its translation-only synchronization workflow.

Catalog bundles use stable catalog IDs and presentation-only fields. Their schema and
English/Bokmål category scaffolds are included for future encyclopedia work; they are
not consumed by the application until that migration is explicitly enabled.

See [CONTRIBUTING.md](CONTRIBUTING.md) for review rules. This repository is licensed
under the [MIT License](LICENSE).
