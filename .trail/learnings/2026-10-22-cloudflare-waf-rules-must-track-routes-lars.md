---
title: Cloudflare WAF rules must track _routes.json static paths
author: Lars
date: 2026-10-22
branch: master
cost: { minutes: 43, tokens: 254770 }
touches:
  - ".agents/skills/steam-engine-cloudflare-pages-publishing/SKILL.md"
  - tools/cloudflare-pages-artifact.mjs
  - tools/test-cloudflare-pages-artifact.mjs
---

## Decided
On Oct 22, 2026 the steam-engine.org zone (free plan) got three Cloudflare security rules, set in the dashboard, not in this repo:
- Custom rule "Block scrapers": block user agents containing `Lightpanda` or `aiohttp`. Lightpanda, a headless scraper spread over ~1,500 US proxy IPs, caused the Oct 21 Workers-limit spike.
- Custom rule "Block scanner probes": block `/.env`, `*.php`, `/wp-` and `phpinfo` paths.
- Rate limiting rule "Rate limit pages": 15 requests / 10 s per IP, Block for 10 s, on every path except `/assets/`, `/advertising/`, `/blog/assets/` and `/catalog/data/`, and skipping verified bots.
Tested live: burst of 40 asset requests all 200; page requests get 429 after the 15th and recover after 10 s.

## Tried and ruled out
A per-IP rate limit alone: Lightpanda made at most 200 requests per IP per day, so only the user-agent rule stops it. Bot Fight Mode: can't be skipped by rules and might challenge the Pages Worker's own HEAD subrequests from `blog.steam-engine.org`; kept in reserve. The Wrangler OAuth login can't read or write zone WAF rules; changes go through the dashboard.

## Watch out
The rate-limit exclusions mirror the static folders in `cloudflareRoutes` (`tools/cloudflare-pages-artifact.mjs`). If a new static folder is added there, add it to the rate-limit expression too, or a page view loading ~25 files from it gets visitors blocked. The calculation API on workers.dev is outside the zone, so none of these rules protect it.
