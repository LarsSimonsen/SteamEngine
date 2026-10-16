# Group review report

Copy `../assets/report-template.json`; an empty template is not a completed review.
Use ISO dates, actual reviewer identities (including model identity when known), and
exact semantic IDs. Do not include English in `targetLocales`. All inspected target
locale/ID pairs, including unchanged wording, need an entry. Exported but unread rows
must not appear in `inspectedIdsByLocale` or the inspected count.

Each `entries` item has this shape:

```json
{
    "locale": "pt",
    "id": "calculators.batt.example",
    "source": {
        "before": "Exact baseline English text",
        "after": "Exact final English text",
        "baselineSignature": "computed SHA-256",
        "finalSignature": "computed SHA-256"
    },
    "target": {
        "before": "Exact baseline target text",
        "after": "Exact final target text",
        "baselineSignature": "computed SHA-256",
        "finalSignature": "computed SHA-256"
    },
    "baselineReviewRecord": null,
    "finalReviewRecord": null,
    "disposition": "unchanged",
    "findingIds": [],
    "rationale": "Why this wording was retained or changed",
    "evidence": [],
    "unresolvedQuestions": []
}
```

Replace the illustrative ID and text; never count this example as reviewed. Copy the
actual per-entry metadata into both review-record fields, preserving human attribution.
Use null only if no record existed and explain that limitation. Signatures come from
`entrySignatureFor(id, text)` in `tools/translation-review-data.mjs`; use the comparison
helper's baseline and final exports. Preserve placeholder sentinels in this text.

Use dispositions `unchanged`, `corrected`, `legitimate-variant`, `uncertain`, or
`source-concern`. Each finding has `findingId`, `category`, `pairs` (objects with
`locale` and `id`), `rationale`, `evidence`, and `resolution`. Categories are
`translation-defect`, `wording-improvement`, `legitimate-variant`,
`uncertain-terminology`, or `english-source-concern`. Reuse a finding ID for one root
error affecting several entries; distinct errors receive distinct IDs. Evidence items
contain `source` (path or URL), `conclusion`, and `limitation`.

Review `checkedPairs` arrays contain `{ "locale": "pt", "id": "..." }` objects.
Independent status is `completed`, `unavailable`, or `not-performed`; completed requires
reviewer, date, exact checked pairs and conclusions, including how disagreements were
resolved. Unavailable requires a reason. Human status is `completed` or `not-performed`;
machine reviewers must never populate a completed human review.

Validation items contain `command`, `status` (`passed`, `failed`, or `not-run`) and
`details`. Rendered checks contain `locale`, `page`, `id`, `arguments`, `consumer`,
`status`, and `details`. Identify the actual route and catalog consumer where applicable.
Record skipped browser checks and untested plural/interpolation cases as limitations.

Before finalizing, check these invariants against the final source and diff:

- Every inspected pair occurs once in `entries` and `scope.inspectedIdsByLocale`.
- Recompute all four entry signatures; every referenced finding and pair exists.
- `inspectedLocaleIdPairs` equals the number of entries; `changedLocaleIdPairs`
  counts entries whose target text changed, not metadata-only edits.
- `independentErrors` counts distinct `translation-defect` findings, not reviewers,
  changed entries, wording improvements, or rendered uses of one shared template.
- `renderedOccurrencesChecked` counts actual completed checks with status `passed`
  or `failed`, never `not-run` checks or assumed catalog fan-out.
- Baseline/final review records and human attribution match the saved source states.
- All required validation and independent-review outcomes are recorded honestly.

Keep the per-entry signatures instead of adding aggregate hashes. If an aggregate is
needed, document its exact serialization, ordering, and hash inputs in `signatureMethod`.
