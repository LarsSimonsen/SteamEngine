---
title: Project skills must stay tool-neutral and match AGENTS.md
author: Lars
date: 2026-10-19
branch: master
cost: { minutes: 6, tokens: 94236 }
touches:
  - ".agents/skills/commit-changes/SKILL.md"
  - ".agents/skills/local-iis-web-config-maintenance/SKILL.md"
  - ".agents/skills/steam-engine-add-locale/SKILL.md"
  - ".agents/skills/steam-engine-cloudflare-pages-publishing/SKILL.md"
  - ".agents/skills/steam-engine-i18n-migration/SKILL.md"
  - ".agents/skills/steam-engine-i18n-migration/references/number-input-policy.md"
  - ".agents/skills/steam-engine-i18n-migration/references/phase-prompts.md"
  - ".agents/skills/steam-engine-improve-translations/references/cycle.md"
  - ".agents/skills/steam-engine-maintain-locale-parity/SKILL.md"
  - ".agents/skills/steam-engine-related-language-review/SKILL.md"
---

## Decided
- The `.agents/skills/` folder is shared by every coding agent, so skills must not name one agent's tools, sandbox rules, branch prefixes or absolute local paths. The Codex-era `apply_patch`, "elevated repository write permission", `codex/locale-*` branches and `C:\htdocs\steamengine` were removed on 2026-10-19.
- Routing skills name `SITE-STRUCTURE.md` as normative and `tools/route-contract.json` as its executable matrix, and run `npm run test:routes` plus `npm run test:links`, matching AGENTS.md.
- Drafting a new locale uses the model's own knowledge; an external translation provider needs explicit per-task authorization. The add-locale skill no longer claims that a locale request authorizes Google Translate.
- The i18n-migration skill is kept as architecture rules; its phase files are generalized from `en`/`nb` to every enabled locale rather than deleted.

## Tried and ruled out
- Deleting the phase reference files: they still describe the surfaces an architecture change must cover, so they were generalized instead.

## Watch out
- `cycle.md` and the Cloudflare skill referenced skills that do not exist in this repo ("vaping-source", "Cloudflare Wrangler skill"); check `.agents/skills/` and AGENTS.md before citing a skill by name.
- The local IIS route-family list must include `/catalog/concept/<slug>`, `/compare/<topic>`, `/privacy` and the locale-prefixed routes; the locale alternation in `tools/local-iis-web.config` must match `src/i18n/locales.ts`.
- The related-language-review helper has its own tests: `node --test .agents/skills/steam-engine-related-language-review/scripts/compare.test.mjs` (about 10 s).
