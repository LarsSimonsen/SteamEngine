---
name: url-rewrite-maintenance
description: Coordinate shared URL-routing changes across local IIS and deployed static hosting.
---

# URL Rewrite Maintenance

Use this as the entry point for any routing change that may affect both the local
IIS preview and the deployed static site. It coordinates repository-side route
work and deployment verification without replacing their implementation details.

## Ownership boundaries

| Area | Owner |
| --- | --- |
| Cross-environment intent, sequencing, parity, and exceptions | This skill |
| IIS template, generated config, and local validation | Local IIS maintenance skill |
| Remote deployment verification and provider configuration | The applicable deployment workflow |

When a request concerns only one provider, use that provider's skill directly.
Use this skill whenever the requested behavior should be available in both.

## Shared route contract

`SITE-STRUCTURE.md` is the normative specification of the public site
structure, and `tools/route-contract.json` is its executable route matrix. The
contract records the generated origin layout, canonical slash policy, catalog
categories, and route cases for generated origins, canonical redirects, and
unsupported public paths. If the two disagree, treat that as a defect and decide
which artifact must change; never silently follow one of them.

The provider implementations are then:

- root pages: `public/<page>.html`
- catalog details: `public/catalog/<category>/<slug>.html` (including `concept`)
- legacy pages: `public/old/<page>.html`
- local IIS configuration: `tools/local-iis-web.config`, copied to
  `public/web.config` during the build

`tools/local-iis-web.config` is the IIS implementation of the contract, not a
remote hosting configuration source. `public/web.config` is generated and
local-only; Cloudflare Pages does not interpret it, and the Cloudflare
publishing artifact removes it. The deployed site remains responsible for
serving the matching origin files described by the contract.

The scoped build writes isolated previews under `.build-runs/<run-id>/public/`.
Those previews are intentionally incomplete and must not be used for
route-contract acceptance, local/deployed parity checks, upload manifests, or
deployment.

The canonical public URL policy is slashless for React pages, `/catalog`, catalog
details, and legacy detail pages. `/catalog` is an exact-match route; `/catalog/`
is intentionally not redirected or rewritten. The legacy index is the exception:
`/old` redirects to `/old/` so its relative assets resolve beneath the legacy
directory. Local IIS and the deployed site must implement this policy consistently.

## Coordinated workflow

1. Classify the request as a rewrite, redirect, rule-order, route-layout, or
   exception change. Record the public source path, action, origin path or
   destination, query-string behavior, and whether the rule is local-only,
   remote-only, or shared.
2. Read `SITE-STRUCTURE.md` and `tools/route-contract.json` first, then inspect
   `tools/local-iis-web.config` and the generated origin layout before proposing
   changes.
3. Prepare one paired change plan. Show the repository route or IIS template
   diff together with the expected deployed origin layout. Keep provider syntax
   separate from IIS rules.
4. Apply the repository-side IIS change through the local-IIS skill. Never edit
   generated `public/web.config` directly.
5. If a remote deployment change is requested, treat it as a separate external
   change requiring explicit approval and post-change HTTP verification. Do not
   infer permission to change remote hosting from permission to edit the
   repository.
6. Complete the repository-side contract validation with `npm run test:routes`
   and `npm run test:links`, then complete the local build/XML/path checks from
   the IIS skill and HTTP checks against the deployed site. If one side cannot
   mirror the other, document the deliberate exception and its affected paths.

## Consistency rules

- Treat adding, removing, updating, or reordering shared routing as one paired
  change, not two independent edits.
- Update `SITE-STRUCTURE.md` and the route contract before changing either
  provider implementation, and keep the specification, contract, implementation,
  and tests in one change.
- Treat a mismatch between the route contract and the deployed site as deployment
  drift; do not silently change the contract to match an old live rule.
- Keep rules narrow enough that real files, assets, and nested paths are not
  accidentally rewritten.
- Preserve the distinction between internal rewrites and external redirects.
- Do not remove a legacy route solely because the current application no longer
  links to it; check compatibility and backlinks first.
- Keep local-only IIS configuration out of deployment manifests.
