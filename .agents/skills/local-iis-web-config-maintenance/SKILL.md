---
name: local-iis-web-config-maintenance
description: Maintain Steam Engine local IIS rewrites, preview slots, and route validation.
---

# Local IIS Web Config Maintenance

Own the local IIS implementation only. The checked-in rewrite source is
`tools/local-iis-web.config`; each local build generates `web.config` into the
inactive `.iis-slots/blue` or `.iis-slots/green` directory.

## Boundaries

This skill may edit the IIS template, build integration, and local IIS preview
documentation when required. It does not inspect or modify remote deployment
resources, Cloudflare Pages deployments, upload artifacts, or IIS bindings. It
may change only the selected IIS root virtual directory's `physicalPath` as part
of a validated slot switch.

The intended cross-provider routes are defined in
`tools/route-contract.json`. This skill owns the IIS translation of that
contract; `tools/local-iis-web.config` remains the checked-in provider template.

The installed `SteamEngineIisSlotBroker` is the sole elevated boundary. Read
[broker-contract.md](references/broker-contract.md) only when changing, installing,
starting, or diagnosing the broker. Never use direct AppCmd or administrator builds.

For a change that must apply to both local IIS and the deployed site, use
`.agents/skills/url-rewrite-maintenance/SKILL.md` as the coordinator.

## Current local route families

The template maps these canonical extensionless paths to generated files:

- `/catalog` -> `catalog.html`
- `/about`, `/batt`, `/coil`, `/converter`, `/juice`, `/modrange`, `/ohm`,
  `/tcr`, and `/wirewiz` -> the matching root `.html` file
- `/catalog/battery/<slug>`, `/catalog/mod/<slug>`, and
  `/catalog/material/<slug>` -> the matching category `.html` file
- `/old/` -> `old/index.html`
- `/old/<page>` -> `old/<page>.html`

Legacy rules must remain extension-aware: requests for assets such as
`old/se.css` and `old/tcr.js` must not be rewritten as pages.

## Canonical slash policy

Generated React and catalog pages use relative asset URLs that resolve correctly
when their public URL has no trailing slash. Legacy index assets resolve correctly
only when the index URL ends in a slash. Enforce these canonical forms before the
internal rewrite rules:

- Redirect calculator-page slashes, catalog-detail slashes, and `/old/<page>/`
  to the matching slashless URL.
- Match `/catalog` exactly. `/catalog/` is intentionally neither redirected nor
  rewritten.
- Redirect `/old` to `/old/`.
- Preserve query strings on every canonical redirect.
- Keep redirect substitutions relative to this distributed `web.config` so a
  virtual-directory mount remains within its application path.

## Workflow

1. Inspect `tools/route-contract.json`, `tools/local-iis-web.config`, and the
   active `.iis-slots/` layout. Confirm the target file exists and identify
   whether the requested path is a page, asset, directory, rewrite, or redirect.
2. Update the template with `apply_patch`. Use IIS rule backreferences such as
   `{R:1}` for captures; keep IIS syntax independent from remote hosting
   configuration syntax.
3. If broker setup or diagnosis is in scope, follow `references/broker-contract.md`.
4. Run `npm run build` from an ordinary Windows terminal. It holds the
   deployment lock, asks the broker to inspect IIS and create one lease, cleans
   and builds the inactive slot, validates that same slot, asks the broker to
   switch with only the lease ID, and reports the broker's verification result.
   A scoped build may be used for a focused page preview, but its output under
   `.build-runs/<run-id>/public/` is not an IIS deployment slot and cannot satisfy
   this skill's route-contract validation.
   If the build reports that the host identity is required, rerun it with
   host/unsandboxed approval as the pinned ordinary user. Do not call the broker
   unavailable until a host-side service query confirms it.
5. Run `powershell -NoProfile -ExecutionPolicy Bypass -File
   tools/test-route-contract.ps1`. It validates the contract's representative
   origin, canonical-redirect, and unsupported-route cases against the IIS
   template and generated slot `web.config`, including IIS rule order. Also
   confirm that canonical redirects precede exact-path rewrites and that no
   generated page folders or unintended asset rewrites remain.
6. If an IIS site is available, run `powershell -NoProfile
   -ExecutionPolicy Bypass -File tools/test-route-contract.ps1 -IisBaseUrl
   http://your-iis-host`. It requests every shared route case through IIS,
   including expected 404s. Then request representative extensionless pages and
   assets through its configured host. Test at least one root calculator, one
   catalog detail, `/catalog`, `/old/`, one legacy page, and one legacy asset. For
   each route family, verify the expected canonical behavior, preserves a sample
   query string, and loads at least one referenced asset.

## Safety and deployment

- Require the Microsoft IIS URL Rewrite module for these rules to execute.
- Do not edit generated slot `web.config` files directly.
- Never clean the active slot. Hold the deployment lock from active-slot
  discovery through verification, and fail if IIS state changes meanwhile.
- Treat `.build-runs/cloudflare-artifact/` as the separate production publishing
  artifact. Generate it with `npm run build:cloudflare`; never point IIS at it.
- Do not change IIS bindings or unrelated server configuration.
- The broker's installed binary and ProgramData configuration are outside the
  repository. Repository edits cannot change its elevated behavior. If it is
  absent or stopped, fail with the install/start hint and never fall back to
  direct AppCmd access.
- If a deployed-site behavior cannot be represented locally, record that
  exception in the coordinated routing change rather than adding a misleading
  local rule.
