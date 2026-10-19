# Steam Engine site structure

Status: Normative

This document specifies the public information architecture of the Steam Engine website. It defines canonical URLs,
page families, navigation relationships, public calculator names, catalog organization, and language-version behavior.

The specification describes intended behavior. Existing code, generated files, captured historical pages, and deployed
behavior are evidence, but they do not silently override a decision recorded here.

## Authority and enforcement

The responsibilities are divided as follows:

- This document is the normative product specification for public site structure and navigation behavior.
- `tools/route-contract.json` is the executable matrix of route, rewrite, redirect, and unsupported-route cases.
- Source code and generated hosting configuration implement the specification and executable contract.
- Automated route, link, build, and browser checks enforce the implemented behavior.

`web.config` is generated only for the local IIS preview. It is required for local extensionless-route behavior but is
not part of the production deployment artifact and does not define production routing. Production hosting implements
the same provider-independent route contract through its own configuration.

When these sources disagree, treat the disagreement as a defect. Do not silently choose one. Determine whether the
product specification or its implementation needs to change, update the affected artifacts together, and record any
intentional compatibility exception in this document and the executable contract.

Any change to public routes, navigation, page names, locale prefixes, canonicalization, redirects, the sitemap, or
generated internal links must review this document. When applicable, update this document, `tools/route-contract.json`,
the implementation, and relevant tests in the same change.

## URL conventions

### Canonical form

- Public canonical URLs do not end in a trailing slash.
- The origin root `/` is the unavoidable root-path exception; it is not considered a trailing-slash URL.
- Public page URLs do not expose implementation suffixes such as `.html`.
- Internal links must use the canonical public URL, not a redirecting or origin-file URL.
- Canonical metadata, alternate-language links, sitemap entries, and navigation links must agree on the same URL.
- A trailing slash appended to a canonical non-root page URL is unsupported and may return 404. The site does not need
  to redirect trailing-slash variants to their canonical forms.
- A current calculator URL ending in `.asp` or `.html` is a compatibility variant and permanently redirects to the same
  calculator path without the implementation suffix. This applies to `batt`, `coil`, `converter`, `juice`, `modrange`,
  `ohm`, `tcr`, and `wirewiz` in English only. Language-prefixed implementation-suffix URLs, along with suffix URLs for
  catalog, blog, legacy, privacy, and other non-calculator paths, remain unsupported and return 404.
- The historical root paths `/default.asp` and `/index.html` permanently redirect to `/`.
- The historical root paths `/default.asp` and `/index.html` permanently redirect to `/`.

Examples:

| Purpose | Canonical URL | Not canonical |
| --- | --- | --- |
| English catalog | `/catalog` | `/catalog/`, `/catalog.html`, `/catalog.asp` |
| English calculator | `/ohm` | `/ohm/`, `/ohm.html`, `/ohm.asp` |
| Legacy calculator | `/old/ohm` | `/old/ohm/`, `/old/ohm.html`, `/old/ohm.asp` |
| Catalog detail | `/catalog/battery/lg-18650hg2` | `/catalog/battery/lg-18650hg2/`, `/catalog/battery/lg-18650hg2.html` |
| Localized calculator | `/nb/ohm` | `/nb/ohm/`, `/nb/ohm.html`, `/nb/ohm.asp` |

### Slugs and path segments

- Stable route identifiers use lowercase ASCII words without spaces.
- Multiword calculator identifiers retain their established compact form where one exists, such as `modrange` and
  `wirewiz`.
- Catalog entry slugs use lowercase ASCII kebab-case.
- Locale prefixes use the locale code and casing specified in the language-version section.
- A public route identifier must not be renamed merely to match a changed display name.

## Site areas

The public site has six distinct areas:

| Area | Root | Purpose |
| --- | --- | --- |
| Main site | `/` | Current home page and calculators |
| Catalog | `/catalog` | Reference concepts and calculator catalog data |
| Comparisons | `/compare` | Side-by-side comparisons of catalog entries |
| Blog | `/blog` | Restored historical and current articles |
| Legacy calculators | `/old` | Archived calculator implementations |
| Language versions | `/<locale>` | Localized versions of supported current-site pages |

Static origin filenames and build directories are implementation details and are not public information architecture.

## Current calculator routes

The established current calculator route identifiers are:

| Route | Primary navigation | Localized |
| --- | --- | --- |
| `/ohm` | Yes | Yes |
| `/coil` | Yes | Yes |
| `/wirewiz` | Yes | Yes |
| `/batt` | Yes | Yes |
| `/modrange` | Yes | Yes |
| `/juice` | Yes | Yes |
| `/converter` | No | Yes |
| `/tcr` | No | Yes |

Route identifiers are language-independent structural identifiers. Each locale owns its visible page title, heading,
navigation label, and descriptive text. A compact navigation label may differ from the page heading. Changing visible
copy does not rename a route. Every published locale must provide the labels required by every route it exposes.

`/about` and `/privacy` are informational pages rather than calculators. `/catalog`, `/blog`, `/old`, and localized
home pages are also not calculators. `/privacy` is linked from the shared footer rather than the global header.

## Main-site navigation

The global site header distinguishes general site navigation from calculator navigation.

- General navigation presents Catalog, Blog, and About, in exactly that order, followed by the language and theme
  controls.
- Calculator navigation contains `/ohm`, `/coil`, `/wirewiz`, `/batt`, `/modrange`, and `/juice`, in exactly that order.
- `/converter` remains reachable from the home page but is not in the calculator navigation strip.
- `/tcr` remains publicly routable but intentionally omitted from primary navigation.
- The home-page tool list contains `/ohm`, `/coil`, `/wirewiz`, `/batt`, `/modrange`, `/juice`, `/converter`, and
  `/old`, in exactly that order. `/tcr` is omitted.

All navigation links must preserve the visitor's locale when the destination has a version in that locale. Links to
English-only areas must deliberately leave the locale rather than constructing a nonexistent localized URL.

## Legacy calculators

`/old` is the landing page for archived Steam Engine calculators. It is a separate site area, not a language version
or a source-file directory exposed to users.

- Links from `/old` to archived calculators must use `/old/<calculator>` canonical public URLs.
- The legacy landing page must not link to root-level current calculator routes when labeling them as old calculators.
- Legacy calculator pages may link back to their current counterpart, the current home page, or other legacy pages.
- Legacy assets may remain under `/old`, but asset filenames are not page URLs and may include extensions.

The `/old` landing page links exactly these seven archived calculators, in this order:

1. `/old/ohm`
2. `/old/coil`
3. `/old/wirewiz`
4. `/old/batt`
5. `/old/modrange`
6. `/old/juice`
7. `/old/converter`

The archived pages `/old/tcr`, `/old/about`, `/old/customdata`, and `/old/themes` may remain directly addressable but do
not appear in the legacy landing page's calculator list.

## Catalog

`/catalog` is the catalog landing page and the only top-level entry point for catalog browsing.

Catalog detail pages use exactly this public pattern:

```text
/catalog/<category>/<slug>
```

The established singular category path segments are:

| Category | Detail pattern | Intended contents |
| --- | --- | --- |
| Concepts | `/catalog/concept/<slug>` | Principles and reference concepts |
| Batteries | `/catalog/battery/<slug>` | Cells, packs, and integrated power sources |
| Mods | `/catalog/mod/<slug>` | Devices and control boards |
| Materials | `/catalog/material/<slug>` | Resistance and temperature-control materials |

- `/catalog` must link to entries using these category paths.
- Calculators must link to catalog details using the same paths.
- Plural alternatives such as `/catalog/batteries/<slug>` are not canonical.
- Former top-level alternatives such as `/batteries/<slug>`, `/mods/<slug>`, and `/materials/<slug>` are not current
  catalog routes.
- Catalog data endpoints and generated JSON files are implementation details and must not appear as catalog pages.

The catalog does not have separate category pages. These category-root shortcuts permanently redirect with status 301
to the corresponding section of the combined catalog page:

| Shortcut | Destination |
| --- | --- |
| `/catalog/concept` | `/catalog#concepts` |
| `/catalog/battery` | `/catalog#batteries` |
| `/catalog/mod` | `/catalog#mods` |
| `/catalog/material` | `/catalog#materials` |

The shortcut uses the same singular category segment as detail URLs, while the fragment identifier matches the plural
catalog section. The destination with its fragment is a client-side location within the canonical `/catalog` document,
not a separate page URL.

## Comparisons

Comparison pages use a stable page route and keep the selected catalog-entry slugs in the query string. A comparison
combination is page state, not a separately generated or canonical page.

| Purpose | Canonical page | Shareable state example |
| --- | --- | --- |
| Battery comparison | `/compare/batteries` | `/compare/batteries?a=molicel-inr21700-p45b&b=samsung-inr21700-50s` |
| Material comparison | `/compare/materials` | `/compare/materials?a=kanthal-a1&b=ss316l` |
| Mod/board comparison | `/compare/mods` | `/compare/mods?a=geekvape-aegis-solo-3&b=dna30d` |

- The query parameters `a` and `b` contain catalog slugs from the compared category and determine the left and right
  selections.
- The canonical URL, sitemap entry, and alternate-language metadata omit the query string.
- Unknown or duplicate slugs do not create routes. The page handles them as selection state.
- Every published locale provides both comparison pages, and language switching preserves `a` and `b`.
- The comparison pages are linked from the catalog and their corresponding detail pages. They are not in the
  calculator navigation.

Every published locale provides equivalent locale-preserving shortcuts. For example, `/nb/catalog/battery` redirects
with status 301 to `/nb/catalog#batteries`. A localized category shortcut must not redirect visitors to English.

## Blog

The supported blog page families are exactly:

| Purpose | Pattern |
| --- | --- |
| Blog landing page | `/blog` |
| Pagination | `/blog/page/<number>` |
| Article | `/blog/<year>/<month>/<day>/<slug>` |

The year, month, and day segments reflect the article's publication date. Pagination numbers are positive integers in
the generated range. Article slugs use lowercase ASCII kebab-case.

Blog page URLs follow the site-wide slashless policy. Asset URLs may contain file extensions. Historical inbound URLs
may receive compatibility redirects when explicitly recorded, but generated internal blog links must use canonical
public URLs.

The retired hostname `blog.steam-engine.org` is a Cloudflare compatibility hostname. Its root permanently redirects to
`https://www.steam-engine.org/blog`. A path is preserved only when the corresponding canonical main-site blog page
exists; unknown paths fall back to the canonical blog landing page. The sitemap contains only canonical
`www.steam-engine.org` URLs and never lists the compatibility hostname.

Blog posts are not part of the public repository. The build reads them from the folder named by
`STEAM_ENGINE_BLOG_CONTENT`, or from a gitignored `.blog-content` folder in the checkout. Without that content it
builds the landing and about pages with no articles. Route cases marked `requiresBlogContent` in the executable
contract are checked only when the build includes posts.

Category, tag, author, date-archive, feed-as-page, and alternate-permalink routes are unsupported. Adding another blog
page family requires an explicit specification and executable-contract change.

## Language versions

English is unprefixed. Every other published language uses a leading locale segment:

```text
/<locale>
/<locale>/<calculator>
/<locale>/catalog
/<locale>/catalog/<category>/<slug>
```

The site publishes English plus these prefixed locales:

`nb`, `nn`, `zh-Hans`, `ar`, `es`, `es-419`, `fr`, `pl`, `uk`, `it`, `vi`, `de`, `sv`, `da`, `is`, `hi`, `bn`, `pt`, `pt-BR`,
`ja`, `ko`, `el`, `tr`, `id`, and `fi`.

Every published locale has complete parity across the localized current site: its home page, catalog landing page,
battery comparison page, all eight current calculator routes (`batt`, `coil`, `converter`, `juice`, `modrange`, `ohm`,
`tcr`, and `wirewiz`), and every catalog detail page.

`/about`, `/blog`, `/old`, and `/privacy`, including their descendants, are English-only site areas. Do not construct
localized versions of those routes.

Machine-drafted translations awaiting human review remain publicly available and visible in the language selector.
Their pending-review status must remain clearly disclosed to visitors. Human review improves a published locale; it is
not a prerequisite for that locale to remain routable.

Switching languages preserves the equivalent route. For example, `/nb/ohm` switches to `/de/ohm`, and
`/catalog/battery/<slug>` switches to `/fr/catalog/battery/<slug>`. Full published-locale parity means that an
equivalent route is expected to exist throughout the localized current site.

The language selector remains present on the English-only `/about`, `/blog`, `/old`, and `/privacy` areas, but it is
disabled,
noninteractive, and visually greyed out. It must remain understandable to assistive technology and must not imply that
a localized version of the current page is available.

Locale prefixes use exactly the code and casing in the published locale list. In particular, `pt-BR` and `zh-Hans`
retain their canonical casing. Casing variants such as `/pt-br/ohm` and `/PT-BR/ohm` are unsupported, may return 404,
and do not require redirects.

Every localized page must identify its language correctly in document metadata. Alternate-language metadata must link
equivalent pages together and must not advertise a localized route that is unavailable.

## Redirects, retired routes, and compatibility

Redirects exist to preserve intentional public compatibility, not to conceal inconsistent internal links.

- Generated internal links must never rely on a redirect.
- Permanent canonicalization redirects must point directly to the final canonical URL without redirect chains.
- Historical `.asp` and `.html` implementation suffixes on current calculators permanently redirect to the corresponding
  extensionless URL while preserving the query string. Non-calculator implementation-suffix URLs remain 404s.
- Retired routes return 404 unless an explicit compatibility redirect is documented.
- A redirect must not revive a retired page family or conflict with the current site hierarchy.
- Local IIS and production hosting rules must implement the same route outcome even though their configuration formats
  and deployment artifacts differ. The local IIS `web.config` must never be published as production configuration.

Every compatibility exception should record the old URL or pattern, its outcome, its reason, and whether it is
permanent or temporary in `tools/route-contract.json`.

## Sitemap and metadata

- The sitemap contains canonical indexable page URLs only.
- Redirecting, unsupported, origin-file, asset, data, and administrative URLs do not belong in the sitemap.
- Canonical metadata uses the same slashless public URL listed in the sitemap.
- Localized equivalents use correct `hreflang` values and reciprocal alternate links.
- Pages intentionally hidden from primary navigation may still be indexable unless this specification says otherwise.
- Query-selected comparison states use the canonical page URL without query parameters in canonical and sitemap data.

## Required validation

Structural changes must be checked at the level they affect. The complete validation suite should establish that:

- Generated internal page links use canonical slashless URLs.
- No generated page link exposes an `.html` implementation filename.
- `/old` links to archived calculators below `/old`.
- `/catalog` and calculators use the established catalog category paths.
- Every generated page has one expected canonical URL.
- Sitemap and alternate-language URLs correspond to generated canonical pages.
- Redirect and 404 behavior matches `tools/route-contract.json`.
- Locale navigation never constructs a route that is not generated.

Run `npm run test:routes` for the executable route contract and its local IIS implementation, and run
`npm run test:links` for generated-link validation. Local IIS validation does not establish that production routing is
configured correctly; production routing must be checked through its deployment workflow. Run the normal build and
browser checks required by `AGENTS.md` when implementation or generated output changes.
