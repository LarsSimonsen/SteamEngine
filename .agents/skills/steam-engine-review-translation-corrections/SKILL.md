---
name: steam-engine-review-translation-corrections
description: >-
  Validate and apply submitted human translation corrections with attribution and
  per-ID review state. Not for new locales or English-source parity work.
---

# Review Steam Engine translation corrections

Process a bounded correction set without treating the rest of the locale as reviewed.
Read `../_shared/i18n-translation-contract.md`.

## Accepted inputs

Accept corrections from:

- contributor pull requests or commits;
- review comments on a machine-draft pull request;
- the translation correction issue form; or
- correction text supplied directly by the user.

Capture the contributor's identifiable GitHub identity or user-provided attribution,
the locale, page or bundle, current text, proposed text, explanation when available,
and the affected semantic ID. Locate the semantic ID from page context when the
contributor does not know it. Do not invent a reviewer identity.

## Validation

1. Inspect the English source, target-locale context, current review record, glossary,
   contribution, and pull-request diff.
2. Validate that the correction changes translation presentation only. Reject changes
   to executable structure, English source, placeholders, formulas, IDs, slugs, URLs,
   enums, persistence values, units, product identity, CSV columns, or user data.
3. Check consistency with the locale glossary and surrounding UI. If the correction is
   ambiguous, internally inconsistent, or appears to change meaning, request
   clarification through the contribution rather than silently rewriting it.
4. Apply only minimal mechanical adjustments needed for formatting or project syntax.
   Do not replace a contributor's wording with a new machine translation and still call
   it human-reviewed.
5. For a pooled catalog semantic ID, enumerate every rendered catalog entry that uses
   it. Accept a shared correction only when it is valid for every consumer. If the
   correction is intentionally entry-specific, introduce a distinct semantic ID and
   resolver mapping through the parity workflow rather than narrowing the shared text
   silently.

## Review state and glossary

- Mark only accepted, human-corrected semantic IDs `reviewed` and record reviewer and
  review date. Leave all other IDs at their prior state.
- Reserve `approved` for an explicit maintainer instruction. A successful build, agent
  judgment, provider agreement, or contributor submission is not approval.
- Update a preferred glossary term when the accepted correction establishes reusable
  terminology. Preserve its contributor provenance and apply it to other entries only
  through an explicit parity or correction scope; do not silently broaden this task.
- Recompute the locale-wide machine-draft notice from the per-ID states. Remove it only
  when every required entry is `reviewed` or `approved`.

## Application and repository workflow

1. Work on the contributor's pull request or a focused correction branch in this
   repository. Accept only translation files and review metadata from the contribution;
   never copy other files across.
2. Update the application locale and review metadata. Preserve canonical calculation,
   catalog, route, persistence, and user-data behavior.
3. Use `npm run build:partial -- <locale>` or
   `npm run build:partial -- <route> all-locales` for fast inspection when
   useful. Partial output under `.build-runs/<run-id>/public/` is not a translation-parity
   or release check. Run focused tests, full typecheck, tests, and
   `npm run build`. Perform browser or IIS checks for the affected pages,
   including visible and accessible copy and layout.
4. Prepare or update the correction pull request with changed IDs, attribution, review
   states, glossary changes, validation, and screenshots or findings when relevant.
5. Report exactly what was accepted, rejected, or left awaiting clarification. Stop
   before merge, deployment, or `approved` status unless the maintainer explicitly asks.

Both file-editing pull requests and low-friction correction issues enter this same
workflow and receive the same structural validation.
