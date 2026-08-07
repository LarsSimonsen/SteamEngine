# Steam Engine translations

This repository contains only the translation source files used by the Steam Engine
application. It is intentionally not a copy of the application repository.

The initial review language is Bokmål (`nb`). Nynorsk (`nn`) is a separate locale; do
not introduce a generic `no` locale.

## Translation source

- `src/i18n/messages.ts`
- `src/i18n/calculator-messages.ts`
- `src/i18n/catalog-presentations.ts`

Do not add calculator logic, catalog identity, route definitions, generated output,
translation caches, or protected reference files here. The application repository
imports reviewed changes through its translation-only synchronization workflow.

See [CONTRIBUTING.md](CONTRIBUTING.md) for review rules. This repository is licensed
under the [MIT License](LICENSE).
