# Owner handoff and authority boundaries

## Separate assessments

The findings report keeps these independent:

- automated structural and quality checks;
- independent linguistic critique;
- review by a competent target-language human; and
- publication authorization.

Never describe model agreement, automated checks, or a non-speaker's authorization as
competent human language review. Human review is valuable but optional. The agent may
prepare translations, corrections, evidence, critique artifacts, quality reports, and
owner-facing assessments, but may not authorize publication or accept residual risk on
the owner's behalf.

## Handoff rules

Use `needs-owner` only after automatable work is complete and one or more findings has
an exact `ownerQuestion`. Use `blocked` only when a concrete missing prerequisite makes
safe work impossible; name that prerequisite and the action that would unblock it.
Language difficulty, low resources, unavailable optional research, or lack of a human
reviewer are not blockers.

An owner may explicitly accept a documented residual risk. Record the decision and
identity as `owner-accepted`; do not reinterpret it as language review or publication
authorization. Hard integrity failures involving coverage, structure, numbers, units,
formulas, IDs, placeholders, builds, complete critique scope, or visitor feedback cannot
be overridden.

When independent passes or automated checks remain in material disagreement after the
permitted evidence search, preserve both positions and ask the owner a specific
question. Do not silently choose a publication-risk outcome.
