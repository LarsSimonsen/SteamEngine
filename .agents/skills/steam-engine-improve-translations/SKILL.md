---
name: steam-engine-improve-translations
description: >-
  Audit and improve an existing Steam Engine locale through the resumable quality
  queue. Not for new locales, parity updates, human corrections, or publishing.
---

# Improve Steam Engine translations

Run one resumable locale cycle from `translation-quality/work-queue.json`. Read
`../_shared/i18n-translation-contract.md`; it owns translation style, research,
uncertainty, glossaries, and per-ID metadata.

Before work, validate and select or resume through
`tools/translation-critique-queue.mjs`. Read [references/cycle.md](references/cycle.md)
for the bounded critique/fix procedure. Read
[references/owner-handoff.md](references/owner-handoff.md) before assigning
`needs-owner`, `blocked`, or any residual-risk disposition.

Use a separately prompted independent pass to critique the complete published scope.
Apply only a bounded, coherent correction batch, record every finding in a file matching
`translation-quality/findings.schema.json`, and let the queue command enforce iteration
and stopping limits. A linguistic critique is not competent human review, maintainer
approval, or publication authorization.

Finish with translation checks, typecheck, tests, the complete production build, and
generated-site checks. Commit a verified improvement batch and checkpoint the queue,
but do not change locale availability, publish, deploy, merge, or accept risk for the
owner unless separately authorized.
