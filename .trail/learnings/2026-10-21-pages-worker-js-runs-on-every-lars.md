---
title: Pages _worker.js runs on every static request
author: Lars
date: 2026-10-21
branch: master
cost: { minutes: 2, tokens: 56210 }
touches:
  - tools/cloudflare-pages-artifact.mjs
---

## Decided
Nothing changed yet. In Oct 2026 the free-plan Workers daily limit (100k requests, shared by every Worker in the account) reached 75%. Almost all of it was the Pages `_worker.js` copied in by `tools/cloudflare-pages-artifact.mjs`. The build writes no `_routes.json`, so every JS chunk, CSS file and `/advertising/runtime.js` request runs the Worker, which is about 20+ invocations per page view. The proposed fix is a build-generated `_routes.json` that excludes `/assets/*`, `/advertising/*` and other static files. The Worker only needs page paths: blog-host redirects, `.asp`/`.html` redirects, rejecting trailing slashes and the `/catalog/<category>` shortcuts.

## Tried and ruled out
Blaming the calculation API calls: the calculators debounce them and cache them in localStorage, so they were only a small share of the daily total.

## Watch out
Pages Functions counts are in the GraphQL dataset `pagesFunctionsInvocationsAdaptiveGroups`, not in `workersInvocationsAdaptive`. Per-path counts come from the zone's `httpRequestsAdaptiveGroups`. The GraphQL rate limit runs out after a few queries, so batch them. `npx wrangler auth token` supplies a token. Spikes come from encyclopedia page traffic, possibly a crawler that runs JavaScript (not confirmed).
