# Locale-aware numeric input policy

Use this policy for numeric fields in the migrated calculators. It applies to both
native number-input behavior and browsers that expose an unsupported `type="number"` as
a text input.

## Input behavior

- Keep `type="number"` on numeric controls.
- Add `inputMode="decimal"` when useful for a text fallback keyboard.
- Prefer `event.currentTarget.valueAsNumber` when it is finite and valid.
- Retain the raw string in draft state while the user is typing.
- Parse and normalize on blur, explicit commit, or calculation; do not rewrite every
  keystroke.
- Preserve the existing field's allowed range, step, empty-value, and exponent policy.

## Separator resolution

Resolve a raw value in this order:

1. Use the page locale from `src/i18n/locales.ts` with
   `Intl.NumberFormat(...).formatToParts()`.
2. Use `navigator.languages` and `navigator.language` as secondary browser hints when
   the page locale cannot explain the input.
3. Remove recognized grouping separators, including regular spaces, non-breaking spaces,
   narrow non-breaking spaces, and the locale's grouping separator.
4. If both `.` and `,` occur, treat the final one as the decimal separator and earlier
   occurrences as grouping separators.
5. If only one separator occurs, prefer the page-locale interpretation before applying
   digit-count heuristics.
6. Accept a plain integer, a sign, and ordinary scientific notation when the field's
   existing behavior permits them.

If no plausible interpretation remains, return a validation result rather than silently
changing the user's value.

## Required tests

Cover at least these cases for English, Bokmål, and every enabled locale whose
decimal or grouping separators differ from both:

- `1.5` and `1,5`;
- `1234`, `1,234`, and `1.234`;
- `1 234,5`, `1\u00A0234,5`, and `1\u202F234,5`;
- `1,234.5` and `1.234,5`;
- leading signs, empty input, invalid text, and negative values where permitted;
- exponent notation where permitted by the field;
- native `valueAsNumber` and raw-text fallback paths.

Tests should assert the normalized numeric result and validation state, not only whether
`parseFloat` returned a value. In particular, never use bare `parseFloat` for localized
input because `parseFloat("1,5")` returns `1`.
