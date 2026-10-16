# Steam Engine advertising runtime

This directory contains the stable, first-party advertising runtime and its remotely replaceable configuration.
Pages render semantic `data-ad-placement` placeholders and load `/advertising/runtime.js`; provider tags do not live
in page bundles or generated blog HTML.

## Placement contract

- `calculator-footer`
- `home-footer`
- `blog-article-inline`
- `blog-index-sidebar`
- `catalog-index-footer`
- `catalog-battery-inline`
- `catalog-mod-inline`
- `catalog-material-inline`
- `catalog-concept-inline`
- `legacy-calculator-footer`
- `legacy-main-footer`

Each placement owns an ordered waterfall in `config.json`. The current order is AdSense, then the local house ad.
Adsterra is disabled by omission from the production configuration. Network attempts use a soft timeout: an attempt
transitions from `requesting` to `slow`, remains mounted,
and shows the house message as a separate sibling below it. A slow attempt is not cancelled or treated as no-fill,
and no second network provider starts while it remains pending. A later `filled` result removes the temporary house
message; only an explicit `error` or confirmed `no-fill` cleans up the attempt and advances the waterfall. AdSense
uses its documented `data-ad-status` result, while Adsterra can also report `se-ad-error` or `se-ad-no-fill` from its
reviewed frame. The total waterfall limit applies while advancing between definitive provider results.

The published Google CMP is bootstrapped by the reviewed AdSense tag in each advertising page's `head`, before the
advertising runtime or an ad placement loads. Google creates and publishes the European regulations message in
AdSense under **Privacy & messaging**; there is no publisher-authored Funding Choices URL in this repository. The
privacy-policy page is intentionally not tagged, in line with Google's policy-page guidance. Its settings button loads
the tag only after a user asks to reopen Google's revocation flow. The bootstrap request does not create or push an
AdSense ad unit. When that asynchronous bootstrap tag already exists, the runtime queues the manual unit immediately;
it must not wait for the tag to emit another `load` event because that event may have fired before the runtime started.

Production uses `adsense-tcf` consent mode. AdSense communicates with the Google-certified CMP and consumes its TCF
signal directly, so the first-party runtime does not query `__tcfapi`, impose a consent timeout, or interpret consent.
This avoids suppressing ad requests when the CMP API is not exposed to publisher code while leaving consent decisions
with Google's documented integration. The validator permits only AdSense and the local house fallback in this mode;
another network requires a separately reviewed consent contract. AdSense retains Google Advertising Products vendor
ID 755 as a validated provider declaration. The staged Adsterra adapter is not enabled in production.
The repository creates only the reviewed manual units and does not initialize legacy page-level ads. Keep Auto ads
disabled for `steam-engine.org` in the AdSense dashboard; that account-side setting cannot be enforced by this runtime.
The validator rejects arbitrary adapter names and unreviewed script hosts.

The house provider includes copy for every published locale. The runtime selects the page's `html lang` value, then
its base language when applicable, and finally English. The advertising validator requires every published locale to
provide the complete label, title, body, qualifier, and call-to-action copy.

## Routine changes

Run `npm run ads:validate` after editing any advertising file. Advertising files
are deployed as part of the validated Cloudflare Pages artifact with
`npm run build:cloudflare` and the shared Pages publishing workflow. A new Pages
deployment is the common cache-invalidation event for advertising and all other
frontend uploads.

Adding a new provider requires a reviewed runtime adapter and hostname validation. Unit IDs, waterfall order,
placement assignments, and timeouts may be changed in configuration without rebuilding pages.

The house-ad email address is assembled only after a click and is not present as plain text in HTML or configuration.
This discourages simple address harvesters but is not a guarantee against a determined script-aware crawler.

## Delivery telemetry

The runtime sends bounded Google Analytics 4 events when the shared Analytics helper is available. `se_ad_delivery`
records meaningful lifecycle transitions only: `requested`, `slow`, `filled`, `unfilled`, `error`, and `house_shown`.
Its low-cardinality parameters are `placement`, `context`, `provider`, `status`, `reason`, and `elapsed_bucket`.
`se_house_ad_click` records clicks on the local sponsorship call to action. Register those parameters as event-scoped
custom dimensions in the GA4 property before relying on them in reports.

`provider_unavailable` is a diagnostic heuristic, not proof of an ad blocker. Network failures, DNS filtering, browser
privacy features, content blockers, and policy enforcement can produce the same result, while Analytics itself may
also be blocked. AdSense remains authoritative for network-ad impressions, coverage, and clicks; the runtime neither
reads nor attempts to track clicks inside provider-controlled frames. Never add consent strings, identifiers, raw
errors, URLs, or other high-cardinality values to these events.
