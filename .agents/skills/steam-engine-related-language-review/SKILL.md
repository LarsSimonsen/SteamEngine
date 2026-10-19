---
name: steam-engine-related-language-review
description: >-
  Compare existing Steam Engine translations within a related-language group against
  canonical English, correct clear meaning errors, and report uncertain differences.
  Use for language pairs or regional variants; not for adding locales, whole-locale
  quality cycles, parity migrations, or publishing.
---

# Related-language translation review

Read [the shared translation contract](../_shared/i18n-translation-contract.md)
first. It owns locale scope, protected tokens, uncertainty, glossaries, per-ID review
states and publication boundaries. This skill adds a scoped comparison across related
languages; agreement between translations is a clue, never a vote.

## Scope and comparison

- Resolve the requested group through `src/i18n/locales.ts`. Distinguish separate
  languages from regional variants. English (`en`) remains the source for every
  comparison, including Nynorsk; never translate Nynorsk from Bokmål.
- State the calculators, pages and message namespaces covered. Include labels,
  validation messages, help, safety text, accessible names, page metadata and relevant
  catalog consumers. A pilot is not a whole-locale critique or approval.
- Run `npm run i18n:review:check` before relying on review records. Save a baseline
  of selected English and target entries, signatures and existing human attribution.
- The helper loads current source through the project's translation collector:

  ```text
  node .agents/skills/steam-engine-related-language-review/scripts/compare.mjs pt,pt-BR calculators.batt
  node .agents/skills/steam-engine-related-language-review/scripts/compare.mjs nb,nn,da,sv calculators.batt
  ```

  Supply at least two target locales; English is included automatically and must not
  appear in the requested group. Optional arguments select semantic-ID prefixes
  at dot boundaries; omit them only for an intentional complete collector export.
  The helper emits JSON and does not edit translations or score quality. It rejects
  unknown locales, empty selections and missing aligned entries.
  Collection uses a one-shot Vite loader with watching and WebSockets disabled.
  It intentionally loads the complete collector before selecting rows so correction
  overlays stay authoritative; it does not guess locale file paths or use stale exports.
- The collector covers shared messages, calculator messages, comparison messages and
  catalog presentation text. Inspect the source components and locale files for
  surrounding UI context and any metadata outside that collector. Do not claim the
  export covers every rendered surface. Functional messages contain placeholder
  sentinels: render representative real arguments to review agreement and plurals.
- Read bounded batches, track inspected semantic IDs and recover truncated output.
  Exported rows do not count as reviewed rows. Preserve legitimate regional spelling,
  register and vocabulary; similarity alone is not evidence of correctness.

## Decisions and corrections

Classify findings as translation defects, wording improvements, legitimate variants,
uncertain terminology, or English-source/content concerns. Check negation, actor and
object, comparison direction, conditions, modality, quantities and unit meaning.

Pay particular attention to resistance versus resistivity, power versus energy,
capacity versus current rating, continuous versus pulse ratings, series versus parallel
cells, temperature versus temperature change, wire diameter versus gauge, and nicotine
concentration versus total quantity. These are review prompts, not permission to
change calculator formulas, limits, presets or safety advice.

Consult the encyclopedia concept content under `src/catalogs/concepts/` for technical
concepts. For disputed vaping terminology or factual/safety wording, prefer authoritative
published sources such as standards, manufacturer documentation and independent tests.
Record what each source actually establishes. Dictionary support for a lemma does not establish sentence
grammar or technical usage; reread case, agreement, prepositions and interpolation.

Apply the smallest clear correction in locale-owned source files. Preserve semantic
IDs, typed arguments, placeholders, unit symbols, formulas, canonical product identity,
URLs, enums, persistence keys and user-entered content. Keep localized number formatting
at the presentation boundary. Inspect every consumer of a changed shared template.

Retain existing target wording when a suspected defect cannot be established and
record the precise uncertainty using the contract's per-ID metadata. Do not insert
English fallback or homogenize regional variants. Preserve earlier evidence-backed
corrections when English is inconsistent; report the English issue separately rather
than changing scientific claims or calculator behavior during a translation pilot.

## Review records and queue boundaries

Before finalizing corrections, use a separately prompted independent agent to check
the changed locale/ID pairs and unresolved findings against English and UI context.
Give it the before/after text and relevant source material without the first reviewer's
conclusions. Reconcile disagreements using evidence; retain the original wording when
a proposed correction remains uncertain. This scoped second pass does not require a
whole-locale critique. If independent review is unavailable, record `unavailable`, the
reason, and the remaining uncertainty; never describe a self-reread as independent.

Copy [the report template](assets/report-template.json) and follow
[the report field guide](references/report-format.md). Save the completed report as
`translation-quality/group-reviews/YYYY-MM-DD-group-scope.json` with:

- source `en`, target group, exact namespaces/pages and inspected semantic IDs;
- baseline and final entry signatures, before/after text, dispositions, rationale,
  consulted evidence and unresolved questions;
- whether the same agent reviewed and edited, and any independent or human review
  actually performed;
- validation, rendered checks, limitations and counts of changed locale/ID pairs.

Distinguish changed entries from independent errors and rendered occurrences. Verify
that every cited ID contains the passage supporting the finding. Document ordering
and hash inputs for aggregate signatures. Keep temporary comparison exports until the
final report is verified, then remove task-created temporary files.

Update affected per-entry records and locale glossaries under `src/i18n/`; preserve
unaffected human attribution. Machine comparison does not advance entries to human
`reviewed` or maintainer `approved`. Retain the machine-draft notice as required by
the shared contract. A group report supplements existing review data; it is not a
replacement for `translation-quality/findings.schema.json` or a queue checkpoint.

If this work is part of an active resumable quality cycle, also follow
[improve-translations](../steam-engine-improve-translations/SKILL.md), including its
independent critique, correction limits, findings schema and checkpoint commands.
Do not mark several locales stable or complete their whole-locale critique solely
because a scoped pair/group comparison finished. Leave unrelated active cycles alone.

## Validation and handoff

Finish the linguistic reread before refreshing records with `npm run i18n:review`.
Inspect the resulting diff for unrelated metadata changes. Derive the final audit from
that same source state; any subsequent edit requires refreshed dependent records.

For translation changes, run `npm run i18n:review:check`,
`npm run i18n:critique-queue`, `npm run typecheck`, applicable focused translation and
calculator tests, and `npm run build`. Follow `AGENTS.md` for the IIS slot broker and
host-identity execution requirements. Skill-only edits need skill/helper validation,
not an application build.
Run `node --test .agents/skills/steam-engine-related-language-review/scripts/compare.test.mjs`
for helper changes; it checks real exports against the shared collector and invalid inputs.

Inspect changed calculator interactions, validation/help text and shared catalog
consumers in the local browser. Confirm actual locale routing before testing; draft
source files alone do not prove preview availability. Report missing rendered checks
honestly and preserve locale availability. Use generated-site/link checks required by
the affected surfaces; route-contract changes belong to their own coordinated task.

Steam Engine permits validated machine drafts with a visible pending-human-review
notice; do not add locale authorization or signature gates from other projects. This
workflow does not itself authorize enabling locales, accepting owner risk, merging, deploying
or synchronizing an external translation repository. Follow the shared contract and
any explicit user authorization. For requested commits, use
[commit-changes](../commit-changes/SKILL.md) and separate skill changes from translation
results. Report corrections and exact remaining uncertainty without claiming fluency.
