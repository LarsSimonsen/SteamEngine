---
title: "Keep agent skills in .agents/skills, not skills/"
author: Lars
date: 2026-10-16
standing: true
touches:
  - AGENTS.md
---

## Decided
Project agent skills live in `.agents/skills/`. They were moved from `skills/` in commit cca4bd9a. They are standard agent skills, not Claude-specific ones.
Scripts under that folder find the repo root with `parents[4]`. Keep references in `AGENTS.md` and docs pointing at the new path.

## Watch out
Don't recreate `skills/` or use Azure-era wording in skill docs. An empty `skills/steam-engine-frontend-publishing` folder may still exist as a leftover.

_Told to Claude in 2 past sessions here, most recently on Oct 14._
