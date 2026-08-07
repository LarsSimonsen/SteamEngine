# Contributing translations

Submit translation changes as pull requests. Edit only target-locale presentation
values in the allowlisted files; do not change the English source, TypeScript types,
application imports, or calculation data.

Preserve:

- interpolation placeholders;
- formulas and mathematical symbols;
- IDs, slugs, URLs, enum values, and unit symbols;
- product, manufacturer, model, and user-created names.

Review wording in page context. Report ambiguity instead of guessing, especially for
safety text, electrical terms, calculator explanations, and catalog descriptions.
Keep Bokmål terminology consistent with the project glossary. Machine-generated text
and agreement between translation providers are drafting signals, not approval.

Use the review states `machine`, `needs-review`, `reviewed`, and `approved` in review
notes where applicable. Safety and technically sensitive content should receive an
additional reviewer before it is imported into the application.

By submitting a pull request, you agree that your contribution is provided under the
MIT License in this repository and that you have the right to contribute it.
