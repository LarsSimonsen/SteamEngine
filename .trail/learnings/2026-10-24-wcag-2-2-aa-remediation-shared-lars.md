---
title: "WCAG 2.2 AA remediation: shared accessible components and blocking axe checks"
author: Lars
date: 2026-10-24
branch: master
cost: { minutes: 124, tokens: 874381 }
touches:
  - src/blog/generator.ts
  - ".agents/skills/steam-engine-cloudflare-pages-publishing/SKILL.md"
  - ".github/workflows/public-repository-checks.yml"
  - CONTRIBUTING.md
  - package.json
  - tests/e2e/accessibility-baseline.json
  - tests/e2e/accessibility.spec.ts
  - tools/update-accessibility-baseline.mjs
  - src/blog/generator.test.ts
  - src/pages/encyclopedia/encyclopedia-hub.test.tsx
---

## Decided
- Issues #25–#47 and #49 of tracking issue #51 are implemented on master (Oct 24, 2026). The axe baseline from #24 reached zero and was removed: `tests/e2e/accessibility.spec.ts` now requires zero WCAG 2.2 A/AA violations. Scans of pages that never call the calculation API are tagged `@static`; they block `**/api/**` and fail if a page calls it. CI runs `npm run test:a11y:static`; the full `npm run test:a11y` is a pre-deployment step in the Pages publishing skill.
- Shared accessible building blocks to reuse instead of re-creating: `ResultAnnouncement`/`resultSummary` (src/shared/ui/result-announcement.tsx, announces once after user input settles, silent on load), `ManagerDialog` (native `<dialog>` + showModal), `BackendErrorBoundary` on `<dialog>`, `TransientMessage` (persistent status region + Dismiss button, 20 s), `NumericInput`'s localized error text (`numericInputErrorMessage`), `ComparisonPicker` and `ComparisonSection` (src/pages/compare/), `useStickyScrollPadding`, and `axeViolations` (src/shared/test-axe.ts) for jsdom component tests.
- `NumericField`/`SelectField` name their control with `aria-labelledby` (label span + unit) so help and error text inside the `<label>` stay out of the accessible name. A bare `NumericInput` inside a label shows its error text with `aria-hidden` and links it through `aria-describedby`, so the text is still read as the description.
- New UI strings go into every locale file (base draft file, not `-corrections`), then `npm run i18n:review`; the new review entries are marked `machine` with provenance "Accessibility remediation machine draft" (model Claude Opus 5.5), confidence medium.
- Blog images: `src/blog/generator.ts` fails the build on images with no alt or a file-name alt (separator, extension, or the upload's file stem). The content fix lives in the blog content repository.

## Tried and ruled out
- Keeping the comparison picker's compact label ("Battery A"): it compared against English text and never worked in other locales; every locale now shows the full label.
- Fixed `scroll-padding` for the E-liquid sticky warning: its height varies by locale, so `useStickyScrollPadding` measures it. In Chromium focus was never hidden even without it.

## Watch out
- The translation critique queue (`translation-quality/work-queue.json`) rejects `stable` locales whose review signatures changed, and its `requeue` command validates first, so it cannot fix that state. Set the stale stable entries to `queued` with a reason and `lastOutcome: "requeued"` directly.
- Pages now hold several status regions; tests must target a specific one (by text or class), not `getByRole("status")`. `<summary>` has no button role in Testing Library or Playwright; query it with `locator("summary", { hasText })`.
- Seven older e2e assertions are stale and were hidden by the CORS failures until every spec forwarded API calls: Battery drain "Estimated runtime"/"Battery preset", Mod range `.mod-range-page-header + #mod-manager`, a duplicate "Resistance wire length" text match in Coil, and two Wire Wizard labels ("Temperature resistance factor graph", "DNA200 CSV output"). The Converter swap assertion is racy. Many parallel workers hitting the live API cause timeouts; use `--workers=2`.
- Still open: #48 (manual NVDA/Narrator/Magnifier pass) and #50 (statement, after #48). Coil and Wire Wizard mobile summaries still use an English "summary" suffix in their aria-label, and Mod range shows a struck-through theoretical median with no text cue.
