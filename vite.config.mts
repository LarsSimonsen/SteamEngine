import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { batteryPresets } from "./src/catalogs/batteries/defaults";
import {
    includesEncyclopediaDetails,
    includesEncyclopediaPages,
    includesBatteryComparison,
    includesModComparison,
    includesEntityRecordPages,
    includesEnglish,
    includesLocalizedPages,
    isPartialBuild,
    parseBuildScope,
} from "./src/build/build-scope";
import { createEntityRecordsPlugin } from "./src/build/entity-records-plugin";
import { createPartialLocaleDataPlugin } from "./src/build/partial-locale-data-plugin";
import {
    compactEntriesFor,
    createCompactPages,
    materializeCompactPages,
} from "./src/build/compact-pages";
import type { CompactPage } from "./src/build/compact-pages";
import {
    cleanLocalizedPages,
    createLocalizedPageInputs,
    localizedInputKey,
} from "./src/build/i18n-pages";
import { normalizeExternalHtmlLinks } from "./src/build/normalize-external-links";
import { googleAdsenseScriptUrl } from "./src/shared/ui/google-adsense";
import { buildBlog, getBlogSitemapPaths } from "./src/blog/generator";
import { concepts } from "./src/catalogs/concepts/catalog";
import { materials } from "./src/catalogs/materials/catalog";
import { builtInPresets } from "./src/catalogs/mods/presets";
import {
    localeDefinitions,
    localizedRoute,
    routeMetadataFor,
    translatedRoutes,
    type Locale,
} from "./src/i18n/locales";
import { catalogCategoryPath, type CatalogCategory } from "./src/pages/encyclopedia/routes";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.join(projectRoot, "src");
const pagesRoot = path.join(sourceRoot, "pages");
const blogSourceRoot = path.join(sourceRoot, "blog");
const configuredBuildWorkspace = process.env.STEAM_ENGINE_BUILD_WORKSPACE;
const buildWorkspaceRoot = path.resolve(
    configuredBuildWorkspace ?? path.join(projectRoot, ".build-runs", "direct"),
);
const generatedPageWorkspace = path.join(pagesRoot, ".build-runs", path.basename(buildWorkspaceRoot));
const compactHtmlBuild = process.env.STEAM_ENGINE_BUILD_COMPACT_HTML === "1";
const fastBuild = process.env.STEAM_ENGINE_BUILD_FAST === "1";
const shardLocaleBuild = process.env.STEAM_ENGINE_BUILD_SHARD_LOCALE === "1";

const sourceFolders = {
    about: "about",
    batt: "batt",
    "compare/batteries": "compare/batteries",
    "compare/materials": "compare/materials",
    "compare/mods": "compare/mods",
    coil: "coil",
    converter: "converter",
    juice: "juice",
    modrange: "modrange",
    ohm: "ohm",
    privacy: "privacy",
    tcr: "tcr",
    wirewiz: "wirewiz"
} as const;

const routeNames = [
    "about",
    "batt",
    "compare/batteries",
    "compare/materials",
    "compare/mods",
    "coil",
    "converter",
    "juice",
    "modrange",
    "ohm",
    "privacy",
    "tcr",
    "wirewiz",
] as const;

const encyclopediaDetailRoutes = [
    ...concepts.map((item) => ({ category: "concepts" as const, slug: item.slug })),
    ...batteryPresets.map((item) => ({ category: "batteries" as const, slug: item.slug })),
    ...materials.map((item) => ({ category: "materials" as const, slug: item.slug })),
    ...builtInPresets.map((item) => ({ category: "mods" as const, slug: item.slug })),
].filter((item): item is { readonly category: CatalogCategory; readonly slug: string } => item.slug !== undefined)
    .map(({ category, slug }) => `${catalogCategoryPath(category)}/${slug}`)
    .filter((route, index, routes) => routes.indexOf(route) === index);

const generatedEncyclopediaRoot = path.join(generatedPageWorkspace, "generated-encyclopedia-pages");
const generatedLocalizedRoot = path.join(generatedPageWorkspace, "generated-localized-pages");
const generatedOutputRoot = (publicRoot: string): string =>
    path.join(publicRoot, ".build-runs", path.basename(buildWorkspaceRoot));

const escapeHtml = (value: string): string => value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

type BuildInputs = Readonly<{
    readonly pageInputs: Record<string, string>;
    readonly encyclopediaDetailRoutes: readonly string[];
    readonly localizedLocales: readonly Locale[];
    readonly flatPageNames: readonly string[];
    readonly localizedFlatPageNames: readonly string[];
}>;

type EncyclopediaDetailInputs = Readonly<{
    readonly english: readonly (readonly [string, string])[];
    readonly localized: readonly (readonly [string, string])[];
}>;

const createEncyclopediaDetailInputs = (
    routes: readonly string[],
    locales: readonly Locale[],
): EncyclopediaDetailInputs => {
    const english = routes.map((route) => {
        const metadata = routeMetadataFor("en", `/${route}`);
        if (!metadata) throw new Error(`Missing en encyclopedia metadata for /${route}`);
        const pageDirectory = path.join(generatedEncyclopediaRoot, route);
        const scriptPath = path.relative(pageDirectory, path.join(pagesRoot, "encyclopedia", "entry.tsx"))
            .split(path.sep)
            .join("/");
        fs.mkdirSync(pageDirectory, { recursive: true });
        fs.writeFileSync(path.join(pageDirectory, "index.html"), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(metadata.title)} | Steam Engine</title>
    <meta name="description" content="${escapeHtml(metadata.description ?? metadata.title)}" />
  </head>
  <body>
    <div id="root" data-route="catalog"></div>
    <script type="module" src="${scriptPath}"></script>
  </body>
</html>
`, "utf8");
        return [route, path.join(pageDirectory, "index.html")] as const;
    });

    const localized = localeDefinitions
        .filter(({ code }) => code !== "en" && locales.includes(code))
        .flatMap((definition) => routes.map((route) => {
            const locale = definition.code;
            const metadata = routeMetadataFor(locale, `/${route}`);
            if (!metadata) throw new Error(`Missing ${locale} encyclopedia metadata for /${route}`);
            const localizedRoutePath = localizedRoute(locale, `/${route}`);
            const pageDirectory = path.join(generatedEncyclopediaRoot, locale, route);
            const scriptPath = path.relative(pageDirectory, path.join(pagesRoot, "encyclopedia", "entry.tsx"))
                .split(path.sep)
                .join("/");
            fs.mkdirSync(pageDirectory, { recursive: true });
            fs.writeFileSync(path.join(pageDirectory, "index.html"), `<!doctype html>
<html lang="${definition.htmlLang}" dir="${definition.code === "ar" ? "rtl" : "ltr"}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(metadata.title)} | Steam Engine</title>
    <meta name="description" content="${escapeHtml(metadata.description ?? metadata.title)}" />
  </head>
  <body>
    <div id="root" data-route="catalog" data-locale="${locale}"></div>
    <script type="module" src="${scriptPath}"></script>
  </body>
</html>
`, "utf8");
            return [localizedRoutePath.slice(1), path.join(pageDirectory, "index.html")] as const;
        }));

    return { english, localized };
};

const createBuildInputs = (scope: ReturnType<typeof parseBuildScope>): BuildInputs => {
    const localizedLocales = scope.locales.filter((locale) => locale !== "en");
    const selectedDetailRoutes = includesEncyclopediaDetails(scope) ? encyclopediaDetailRoutes : [];
    const detailInputs = createEncyclopediaDetailInputs(selectedDetailRoutes, localizedLocales);
    const localizedPageInputs = createLocalizedPageInputs(pagesRoot, generatedLocalizedRoot, {
        locales: localizedLocales,
        routes: scope.routes,
        includeHome: scope.kind !== "route" && scope.kind !== "slice",
    });
    const includeAllEnglishPages = includesEnglish(scope)
        && (scope.kind === "full" || scope.kind === "locale");
    const englishInputs: Array<readonly [string, string]> = [];
    if (includesEnglish(scope)) {
        if (includeAllEnglishPages) {
            englishInputs.push(["index", path.join(pagesRoot, "index.html")]);
            englishInputs.push(["catalog.html", path.join(pagesRoot, "catalog", "index.html")]);
            englishInputs.push(...routeNames.map((routeName) => [
                `${routeName}.html`,
                path.join(pagesRoot, sourceFolders[routeName], "index.html"),
            ] as const));
        } else if (scope.kind === "route") {
            if (scope.route === "catalog") {
                englishInputs.push(["catalog.html", path.join(pagesRoot, "catalog", "index.html")]);
            } else {
                englishInputs.push([
                    `${scope.route}.html`,
                    path.join(pagesRoot, sourceFolders[scope.route], "index.html"),
                ]);
            }
        }
    }

    const pageInputs = Object.fromEntries([
        ...englishInputs,
        ...detailInputs.english.map(([route, input]) => [`${route}.html`, input]),
        ...detailInputs.localized.map(([route, input]) => [`${route}.html`, input]),
        ...localizedPageInputs.map((input) => [localizedInputKey(input), input.inputPath]),
    ]);
    const flatPageNames = includeAllEnglishPages
        ? ["catalog", ...routeNames]
        : scope.kind === "route" ? [scope.route] : [];
    const localizedFlatPageNames = scope.kind === "route"
        ? [scope.route === "catalog" ? "catalog" : scope.route]
        : scope.kind === "slice"
            ? [scope.route === "catalog" ? "catalog" : scope.route]
        : ["", "catalog", ...scope.routes.filter((route) => route !== "catalog")];

    return {
        pageInputs,
        encyclopediaDetailRoutes: selectedDetailRoutes,
        localizedLocales,
        flatPageNames,
        localizedFlatPageNames,
    };
};

const sitemapRoutesForBuild = () => [
    { path: "/", priority: "1.0" },
    { path: "/ohm", priority: "0.5" },
    { path: "/coil", priority: "0.8" },
    { path: "/wirewiz", priority: "0.6" },
    { path: "/batt", priority: "0.4" },
    { path: "/modrange", priority: "0.3" },
    { path: "/juice", priority: "0.9" },
    { path: "/converter", priority: "0.2" },
    { path: "/tcr", priority: "0.2" },
    { path: "/about", priority: "0.2" },
    { path: "/privacy", priority: "0.1" },
    { path: "/catalog", priority: "0.8" },
    { path: "/compare/batteries", priority: "0.4" },
    { path: "/compare/materials", priority: "0.4" },
    { path: "/compare/mods", priority: "0.4" },
    ...encyclopediaDetailRoutes.map((routePath) => ({ path: `/${routePath}`, priority: "0.3" })),
    ...getBlogSitemapPaths(blogSourceRoot).map((routePath) => ({ path: routePath, priority: "0.3" })),
    ...localeDefinitions.filter(({ code }) => code !== "en").flatMap(({ code }) => [
        ...translatedRoutes(code).map((routePath) => ({
            path: routePath,
            priority: routePath === `${localizedRoute(code, "/")}` ? "1.0" : "0.5",
        })),
        ...encyclopediaDetailRoutes.map((routePath) => ({
            path: localizedRoute(code, `/${routePath}`),
            priority: "0.3",
        })),
    ]),
];

function copyLegacyAdSite(publicRoot: string) {
    const normalizeLegacyNavigationLinks = (html: string): string => html.replace(
        /(<ul\b[^>]*id="choo-topnav"[^>]*>)([\s\S]*?)(<\/ul>)/i,
        (_match, opening: string, navigation: string, closing: string) => {
            const legacyRoutes = "ohm|coil|wirewiz|batt|modrange|juice|converter|about";
            const normalizedNavigation = navigation.replace(
                new RegExp(`href="(?:/old/)?(${legacyRoutes})(?:\\.html)?"`, "g"),
                'href="/old/$1"',
            );
            return `${opening}${normalizedNavigation}${closing}`;
        },
    );

    return {
        name: "copy-legacy-ad-site",
        closeBundle() {
            const source = path.join(projectRoot, "legacy-ad-site");
            const destination = path.join(publicRoot, "old");

            fs.rmSync(destination, { recursive: true, force: true });
            fs.mkdirSync(destination, { recursive: true });

            for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
                if (entry.name === "sitemap.xml") continue;

                const sourcePath = path.join(source, entry.name);
                if (entry.name === "ads.txt") {
                    fs.copyFileSync(sourcePath, path.join(publicRoot, entry.name));
                    continue;
                }
                const destinationPath = path.join(destination, entry.name);

                if (entry.isDirectory()) {
                    fs.cpSync(sourcePath, destinationPath, { recursive: true });
                } else if (/\.html?$/i.test(entry.name)) {
                    const sourceHtml = fs.readFileSync(sourcePath, "utf8");
                    fs.writeFileSync(destinationPath, normalizeExternalHtmlLinks(
                        normalizeLegacyNavigationLinks(sourceHtml),
                    ), "utf8");
                } else {
                    fs.copyFileSync(sourcePath, destinationPath);
                }
            }

            fs.mkdirSync(path.join(publicRoot, "old", "static"), { recursive: true });
            fs.copyFileSync(
                path.join(projectRoot, "src", "assets", "logo.png"),
                path.join(publicRoot, "old", "static", "logo.png"),
            );
        },
    };
}

function copyFavicon(publicRoot: string) {
    return {
        name: "copy-favicon",
        closeBundle() {
            const source = path.join(projectRoot, "src", "assets", "favicon.ico");
            fs.mkdirSync(publicRoot, { recursive: true });
            fs.copyFileSync(source, path.join(publicRoot, "favicon.ico"));
        },
    };
}

function copyLocalIisWebConfig(publicRoot: string) {
    return {
        name: "copy-local-iis-web-config",
        closeBundle() {
            fs.copyFileSync(
                path.join(projectRoot, "tools", "local-iis-web.config"),
                path.join(publicRoot, "web.config"),
            );
        },
    };
}

function copyAdvertisingAssets(publicRoot: string) {
    return {
        name: "copy-advertising-assets",
        closeBundle() {
            fs.cpSync(
                path.join(projectRoot, "advertising"),
                path.join(publicRoot, "advertising"),
                { recursive: true },
            );
        },
    };
}

function addGoogleAdsenseHeadTag() {
    return {
        name: "add-google-adsense-head-tag",
        transformIndexHtml: {
            order: "pre" as const,
            handler(html: string, context: { readonly filename: string }) {
                if (path.basename(path.dirname(context.filename)) === "privacy") return html;
                return {
                    html,
                    tags: [{
                        tag: "script",
                        attrs: {
                            async: true,
                            crossorigin: "anonymous",
                            src: googleAdsenseScriptUrl,
                        },
                        injectTo: "head-prepend" as const,
                    }],
                };
            },
        },
    };
}

function buildBlogSite(publicRoot: string) {
    return {
        name: "build-blog-site",
        closeBundle() {
            buildBlog({
                sourceDirectory: blogSourceRoot,
                outputDirectory: path.join(publicRoot, "blog"),
            });
        },
    };
}

function materializeCompactPageFiles(publicRoot: string, pages: readonly CompactPage[]) {
    return {
        name: "materialize-compact-pages",
        writeBundle() {
            materializeCompactPages(publicRoot, pages);
        },
    };
}

function listHtmlFiles(directory: string): string[] {
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);
        return entry.isDirectory() ? listHtmlFiles(entryPath) : entry.name.endsWith(".html") ? [entryPath] : [];
    });
}

function ensureFavicons(publicRoot: string) {
    return {
        name: "ensure-favicons",
        closeBundle() {
            for (const htmlPath of listHtmlFiles(publicRoot)) {
                const html = fs.readFileSync(htmlPath, "utf8");
                if (/<link\b[^>]*rel=["'][^"']*icon/i.test(html)) continue;

                const relativeDirectory = path.relative(publicRoot, path.dirname(htmlPath));
                const directoryDepth = relativeDirectory === ""
                    ? 0
                    : relativeDirectory.split(path.sep).filter(Boolean).length;
                const faviconPath = directoryDepth === 0
                    ? "favicon.ico"
                    : `${"../".repeat(directoryDepth)}favicon.ico`;
                const updatedHtml = html.replace(
                    /<head\b[^>]*>/i,
                    (headTag) => `${headTag}\n    <link rel="icon" href="${faviconPath}">`,
                );
                fs.writeFileSync(htmlPath, updatedHtml, "utf8");
            }
        },
    };
}

function cleanGeneratedEncyclopediaPages() {
    return {
        name: "clean-generated-encyclopedia-pages",
        closeBundle() {
            fs.rmSync(generatedEncyclopediaRoot, { recursive: true, force: true });
            cleanLocalizedPages(generatedLocalizedRoot);
        },
    };
}

function placeFlatPages(publicRoot: string, flatPageNames: readonly string[]) {
    return {
        name: "place-flat-pages",
        writeBundle() {
            for (const pageName of flatPageNames) {
                const source = path.join(publicRoot, pageName, "index.html");
                const destination = path.join(publicRoot, `${pageName}.html`);
                const html = fs.readFileSync(source, "utf8").replaceAll("../assets/", "./assets/");

                fs.writeFileSync(destination, html, "utf8");
                if (pageName === "catalog") {
                    fs.rmSync(source, { force: true });
                } else {
                    fs.rmSync(path.dirname(source), { recursive: true, force: true });
                }
            }
        },
    };
}

function placeLocalizedFlatPages(
    publicRoot: string,
    localizedLocales: readonly Locale[],
    localizedFlatPageNames: readonly string[],
) {
    return {
        name: "place-localized-flat-pages",
        writeBundle() {
            const generatedPublicRoot = path.join(generatedOutputRoot(publicRoot), "generated-localized-pages");
            for (const definition of localeDefinitions.filter(({ code }) =>
                code !== "en" && localizedLocales.includes(code))) {
                for (const pageName of localizedFlatPageNames) {
                    const route = pageName === "" ? definition.code : `${definition.code}/${pageName}`;
                    const source = path.join(generatedPublicRoot, route, "index.html");
                    const destination = path.join(publicRoot, `${route}.html`);
                    const destinationDirectory = path.relative(publicRoot, path.dirname(destination));
                    const directoryDepth = destinationDirectory === ""
                        ? 0
                        : destinationDirectory.split(path.sep).filter(Boolean).length;
                    const assetPath = directoryDepth === 0
                        ? "./assets/"
                        : `${"../".repeat(directoryDepth)}assets/`;
                    const html = fs.readFileSync(source, "utf8")
                        .replace(/(?:\.\.\/)*(?:\.\/)?assets\//g, assetPath);

                    fs.mkdirSync(path.dirname(destination), { recursive: true });
                    fs.writeFileSync(destination, html, "utf8");
                    fs.rmSync(source, { force: true });
                }
            }
            fs.rmSync(generatedPublicRoot, { recursive: true, force: true });
        },
    };
}

function placeGeneratedEncyclopediaPages(publicRoot: string, encyclopediaDetailRoutes: readonly string[]) {
    return {
        name: "place-generated-encyclopedia-pages",
        writeBundle() {
            const generatedPublicRoot = path.join(generatedOutputRoot(publicRoot), "generated-encyclopedia-pages");
            for (const route of encyclopediaDetailRoutes) {
                const source = path.join(generatedPublicRoot, route, "index.html");
                const destination = path.join(publicRoot, `${route}.html`);
                fs.mkdirSync(path.dirname(destination), { recursive: true });
                const html = fs.readFileSync(source, "utf8").replaceAll("../../../../assets/", "../../assets/");
                fs.writeFileSync(destination, html, "utf8");
                fs.rmSync(source);
            }
            fs.rmSync(path.join(generatedPublicRoot, "catalog"), { recursive: true, force: true });
        },
    };
}

function placeLocalizedEncyclopediaPages(
    publicRoot: string,
    localizedLocales: readonly Locale[],
    encyclopediaDetailRoutes: readonly string[],
) {
    return {
        name: "place-localized-encyclopedia-pages",
        writeBundle() {
            for (const definition of localeDefinitions.filter(({ code }) =>
                code !== "en" && localizedLocales.includes(code))) {
                const generatedPublicRoot = path.join(
                    generatedOutputRoot(publicRoot),
                    "generated-encyclopedia-pages",
                    definition.code,
                );
                for (const route of encyclopediaDetailRoutes) {
                    const source = path.join(generatedPublicRoot, route, "index.html");
                    const destination = path.join(publicRoot, definition.code, `${route}.html`);
                    fs.mkdirSync(path.dirname(destination), { recursive: true });
                    const html = fs.readFileSync(source, "utf8")
                        .replace(/(?:\.\.\/)*(?:\.\/)?assets\//g, "../../../assets/");
                    fs.writeFileSync(destination, html, "utf8");
                    fs.rmSync(source);
                }
            }
            fs.rmSync(path.join(generatedOutputRoot(publicRoot), "generated-encyclopedia-pages"), {
                recursive: true,
                force: true,
            });
        },
    };
}

const publicRouteForFile = (publicRoot: string, filePath: string): string => {
    const relativePath = path.relative(publicRoot, filePath).split(path.sep).join("/");
    if (relativePath === "index.html") return "/";
    if (relativePath.endsWith(".html")) return `/${relativePath.slice(0, -".html".length)}`;
    return `/${relativePath.slice(0, -"/index.html".length)}`;
};

const appRouteForLocale = (route: string): { readonly locale: Locale; readonly route: string } | null => {
    const localizedDefinition = localeDefinitions.find(({ prefix }) =>
        prefix !== "" && (route === prefix || route.startsWith(`${prefix}/`)));
    if (localizedDefinition) {
        return {
            locale: localizedDefinition.code,
            route: route === localizedDefinition.prefix ? "/" : route.slice(localizedDefinition.prefix.length),
        };
    }
    const isEnglishOnlyPage = route === "/about" || route === "/privacy";
    const isCalculator = /^\/(?:batt|coil|converter|juice|modrange|ohm|tcr|wirewiz)$/.test(route);
    if (route === "/" || route === "/catalog" || isEnglishOnlyPage || isCalculator
        || route.startsWith("/catalog/")) {
        return { locale: "en", route };
    }
    return null;
};

function generateLocalizedMetadata(publicRoot: string) {
    return {
        name: "generate-localized-metadata",
        closeBundle() {
            for (const htmlPath of listHtmlFiles(publicRoot)) {
                const route = publicRouteForFile(publicRoot, htmlPath);
                const page = appRouteForLocale(route);
                if (!page) continue;

                const html = fs.readFileSync(htmlPath, "utf8");
                const canonicalRoute = localizedRoute(page.locale, page.route);
                const metadata = routeMetadataFor(page.locale, page.route);
                if (!metadata) throw new Error(`Missing localized metadata for ${page.locale}:${page.route}`);
                const equivalents = page.route === "/" || page.route === "/catalog"
                    || translatedRoutes("en").includes(page.route)
                    || page.route.startsWith("/catalog/");
                const canonical = `<link rel="canonical" href="https://www.steam-engine.org${canonicalRoute}">`;
                const alternateLinks = equivalents
                    ? [
                        canonical,
                        ...localeDefinitions.map(({ code, htmlLang }) =>
                            `<link rel="alternate" hreflang="${htmlLang}" href="https://www.steam-engine.org${
                                localizedRoute(code, page.route)
                            }">`),
                    ].join("\n    ")
                    : canonical;
                const withLanguage = html.replace(
                    /<html lang="[^"]+"(?: dir="[^"]+")?>/,
                    `<html lang="${page.locale}" dir="${page.locale === "ar" ? "rtl" : "ltr"}">`,
                );
                const withoutExistingLinks = withLanguage.replace(/\n    <link rel="canonical"[^>]*>/g, "")
                    .replace(/\n    <link rel="alternate"[^>]*>/g, "");
                const withLinks = withoutExistingLinks.replace("</head>", `\n    ${alternateLinks}\n  </head>`);
                const title = page.route === "/" ? metadata.title : `${metadata.title} | Steam Engine`;
                const withoutExistingTitle = withLinks.replace(/\n    <title>[^<]*<\/title>/g, "");
                const withTitle = withoutExistingTitle.replace(
                    "</head>",
                    `\n    <title>${escapeHtml(title)}</title>\n  </head>`,
                );
                const withoutExistingDescription = withTitle.replace(/\n    <meta name="description"[^>]*>/g, "");
                const descriptionTag = metadata.description === undefined
                    ? ""
                    : `\n    <meta name="description" content="${escapeHtml(metadata.description)}" />`;
                const withDescription = descriptionTag === ""
                    ? withoutExistingDescription
                    : withoutExistingDescription.replace("</head>", `${descriptionTag}\n  </head>`);
                fs.writeFileSync(htmlPath, withDescription, "utf8");
            }
        },
    };
}

function generateSitemap(publicRoot: string) {
    return {
        name: "generate-sitemap",
        closeBundle() {
            const sitemapRoutes = sitemapRoutesForBuild();
            const sitemap = [
                '<?xml version="1.0" encoding="UTF-8"?>',
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                ...sitemapRoutes.flatMap(({ path: routePath, priority }) => [
                    "    <url>",
                    `        <loc>https://www.steam-engine.org${routePath}</loc>`,
                    `        <priority>${priority}</priority>`,
                    "    </url>",
                ]),
                "</urlset>",
                "",
            ].join("\n");

            fs.writeFileSync(path.join(publicRoot, "sitemap.xml"), sitemap, "utf8");
        },
    };
}

export default defineConfig(() => {
    const scope = parseBuildScope(process.env);
    const compactPages = compactHtmlBuild
        ? createCompactPages(scope, encyclopediaDetailRoutes, routeNames, shardLocaleBuild)
        : [];
    const compactEntries = compactEntriesFor(compactPages);
    const inputs: BuildInputs = compactHtmlBuild
        ? {
            pageInputs: Object.fromEntries(compactEntries.map(({ entryPath }) => [
                entryPath,
                path.join(pagesRoot, entryPath),
            ])),
            encyclopediaDetailRoutes: [],
            localizedLocales: [],
            flatPageNames: [],
            localizedFlatPageNames: [],
        }
        : createBuildInputs(scope);
    const partial = isPartialBuild(scope);
    const configuredOutput = process.env.STEAM_ENGINE_BUILD_OUT_DIR;
    const publicRoot = path.resolve(configuredOutput ?? (
        partial ? path.join(buildWorkspaceRoot, "public") : path.join(projectRoot, "public")
    ));
    const plugins = [
        ...(scope.kind === "locale" ? [createPartialLocaleDataPlugin(projectRoot, scope.locale)] : []),
        addGoogleAdsenseHeadTag(),
        react(),
        ...(includesEntityRecordPages(scope)
            ? [createEntityRecordsPlugin(
                path.join(projectRoot, "src", "catalogs", "entity-records"),
                {
                    batteryEntityIds: batteryPresets.map((battery) => battery.id),
                    modEntityIds: builtInPresets.map((mod) => mod.id),
                    outputDirectory: includesEncyclopediaDetails(scope) || includesBatteryComparison(scope)
                        || includesModComparison(scope)
                        ? publicRoot : undefined,
                    loadRecords: includesEncyclopediaDetails(scope) || includesBatteryComparison(scope)
                        || includesModComparison(scope),
                    exposeRecordsToClient: false,
                },
            )]
            : []),
        ...(inputs.flatPageNames.length > 0 ? [placeFlatPages(publicRoot, inputs.flatPageNames)] : []),
        ...(inputs.localizedFlatPageNames.length > 0 && includesLocalizedPages(scope)
            ? [placeLocalizedFlatPages(publicRoot, inputs.localizedLocales, inputs.localizedFlatPageNames)]
            : []),
        ...(inputs.encyclopediaDetailRoutes.length > 0
            ? [
                ...(includesEnglish(scope)
                    ? [placeGeneratedEncyclopediaPages(publicRoot, inputs.encyclopediaDetailRoutes)]
                    : []),
                ...(inputs.localizedLocales.length > 0
                    ? [placeLocalizedEncyclopediaPages(
                        publicRoot,
                        inputs.localizedLocales,
                        inputs.encyclopediaDetailRoutes,
                    )]
                    : []),
            ]
            : []),
        ...(compactHtmlBuild ? [materializeCompactPageFiles(publicRoot, compactPages)] : []),
        cleanGeneratedEncyclopediaPages(),
        copyAdvertisingAssets(publicRoot),
        copyFavicon(publicRoot),
        copyLocalIisWebConfig(publicRoot),
        ...(partial ? [] : [copyLegacyAdSite(publicRoot), buildBlogSite(publicRoot), generateSitemap(publicRoot)]),
        ...(compactHtmlBuild ? [] : [ensureFavicons(publicRoot), generateLocalizedMetadata(publicRoot)]),
    ];

    return {
        root: pagesRoot,
        cacheDir: path.resolve(
            process.env.STEAM_ENGINE_BUILD_CACHE_DIR ?? path.join(projectRoot, "node_modules", ".vite"),
        ),
        // Keep generated assets usable when IIS serves `public/` below a virtual path.
        base: "./",
        plugins,
        build: {
            outDir: publicRoot,
            emptyOutDir: true,
            manifest: compactHtmlBuild ? ".vite/manifest.json" : false,
            minify: fastBuild ? false : undefined,
            sourcemap: !fastBuild,
            rollupOptions: {
                input: inputs.pageInputs,
            },
        },
    };
});
