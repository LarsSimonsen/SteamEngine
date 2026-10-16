# Bounded critique-and-improvement cycle

## Start or resume

1. Run `npm run i18n:critique-queue`, then use `select` and `start` from
   `tools/translation-critique-queue.mjs`. Resume the active or paused checkpoint before
   selecting another locale.
2. Confirm the locale is currently published. Capture fresh source and content
   signatures, regenerate translation review metadata, and run the deterministic
   structural and locale-specific checks available for the complete scope.
3. Assess the resource profile. Record `standard` or `limited`, available evidence, and
   material limitations in the cycle findings report. An owner may confirm a limited
   profile, but difficulty or scarce resources alone are not blockers.

## Independent critique

Prompt a fresh independent linguistic pass without giving it suspected defects,
proposed fixes, or earlier conclusions. Supply the canonical English, the complete
published target-locale scope, UI context, glossary, and protected-token rules. Require
the pass to identify stable semantic translation IDs where available and classify each
finding as:

- `translation-defect`;
- `source-content-defect`;
- `factual-or-safety-risk`;
- `terminology-disagreement`; or
- `tool-false-positive`.

Search established target-language practice only when independent passes disagree,
meaning or terminology is disputed, wording is safety-sensitive, or the recorded
resource profile requires more evidence. Follow the add-locale research rules and the
vaping-source skill when applicable. For a limited profile, use the best reasonably
available evidence and preserve the limitation; never require a service, corpus, or
specialist that does not exist.

## Fix and measure

Apply at most 25 actionable findings in one coherent iteration. Preserve structure,
numbers, units, formulas, IDs, placeholders, full-locale coverage, visitor feedback,
and build checks regardless of resource profile. Regenerate manifests and reports,
then rerun structural, linguistic, build, and generated-site checks.

Record each finding as `resolved`, `rejected-with-evidence`, `owner-accepted`, or
`awaiting-owner`. Measurable improvement means a confirmed defect was resolved or an
uncertainty was resolved with evidence; stylistic churn does not count. Record the
iteration with `checkpoint`. Stop after three iterations in the run or two consecutive
iterations without measurable improvement.

## Finish

Use `finish` with one of these outcomes:

- `improved`: verified corrections landed but another bounded cycle remains useful;
- `stable`: current signatures have no unresolved actionable automated findings;
- `needs-owner`: automated work is complete and the findings report asks a specific
  owner decision; or
- `blocked`: a concrete prerequisite is missing and prevents safe progress.

Use `pause` when work must stop mid-cycle and `requeue` only for an explicit new trigger.
A stable locale must be requeued when English changes, visitor feedback arrives, or a
stronger check becomes available.
