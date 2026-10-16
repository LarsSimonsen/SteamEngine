import fs from "node:fs";
import path from "node:path";
import type { BuildScope } from "./build-scope";
import {
    includesEncyclopediaDetails,
    includesEnglish,
} from "./build-scope";
import {
    localeDefinitions,
    localizedRoute,
    routeMetadataFor,
    type Locale,
} from "../i18n/locales";
import { googleAnalyticsHeadMarkup } from "../shared/ui/google-analytics";
import { googleAdsenseHeadMarkup } from "../shared/ui/google-adsense";

export type CompactPage = Readonly<{
    readonly outputPath: string;
    readonly locale: Locale;
    readonly route: string;
    readonly entryPath: string;
}>;

export type CompactEntry = Readonly<{
    readonly entryPath: string;
    readonly pages: readonly CompactPage[];
}>;

const addUniquePage = (pages: CompactPage[], page: CompactPage): void => {
    if (pages.some((candidate) => candidate.outputPath === page.outputPath)) return;
    pages.push(page);
};

const publicPathForRoute = (route: string): string => route === "/" ? "index.html" : `${route.slice(1)}.html`;

const entryPathForRoute = (route: string): string => {
    if (route === "/") return "home/entry.tsx";
    if (route === "/catalog" || route.startsWith("/catalog/")) return "encyclopedia/entry.tsx";
    return `${route.slice(1)}/entry.tsx`;
};

const dataRouteFor = (route: string): string => route === "/" || route.startsWith("/catalog/")
    ? route === "/" ? "index" : "catalog"
    : route.slice(1);

const addPage = (pages: CompactPage[], locale: Locale, route: string): void => {
    const localizedPath = localizedRoute(locale, route);
    addUniquePage(pages, {
        outputPath: publicPathForRoute(localizedPath),
        locale,
        route,
        entryPath: entryPathForRoute(route),
    });
};

export const createCompactPages = (
    scope: BuildScope,
    encyclopediaDetailRoutes: readonly string[],
    routeNames: readonly string[],
    shardLocale = false,
): readonly CompactPage[] => {
    const pages: CompactPage[] = [];
    const localizedLocales = scope.locales.filter((locale) => locale !== "en");

    if (includesEnglish(scope)) {
        if (scope.kind === "full" || scope.kind === "locale") {
            addPage(pages, "en", "/");
            addPage(pages, "en", "/catalog");
            for (const route of routeNames) addPage(pages, "en", `/${route}`);
        } else {
            addPage(pages, "en", scope.route === "catalog" ? "/catalog" : `/${scope.route}`);
        }
    }

    for (const locale of localizedLocales) {
        if (scope.kind === "full" || scope.kind === "locale") {
            addPage(pages, locale, "/");
            addPage(pages, locale, "/catalog");
            for (const route of scope.routes) {
                if (route !== "catalog") addPage(pages, locale, `/${route}`);
            }
        } else {
            addPage(pages, locale, scope.route === "catalog" ? "/catalog" : `/${scope.route}`);
        }
    }

    if (includesEncyclopediaDetails(scope)) {
        for (const route of encyclopediaDetailRoutes) {
            if (includesEnglish(scope) || !shardLocale) addPage(pages, "en", `/${route}`);
            if (!shardLocale || !includesEnglish(scope)) {
                for (const locale of localizedLocales) addPage(pages, locale, `/${route}`);
            }
        }
    }

    return pages;
};

export const compactEntriesFor = (pages: readonly CompactPage[]): readonly CompactEntry[] => {
    const byEntry = new Map<string, CompactPage[]>();
    for (const page of pages) {
        const entryPages = byEntry.get(page.entryPath) ?? [];
        entryPages.push(page);
        byEntry.set(page.entryPath, entryPages);
    }
    return [...byEntry.entries()].map(([entryPath, entryPages]) => ({ entryPath, pages: entryPages }));
};

type ManifestEntry = Readonly<{
    readonly file: string;
    readonly css?: readonly string[];
    readonly imports?: readonly string[];
}>;

type Manifest = Readonly<Record<string, ManifestEntry>>;

const escapeHtml = (value: string): string => value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const relativeAssetPath = (outputDirectory: string, outputPath: string, assetPath: string): string => {
    const relative = path.relative(path.dirname(outputPath), path.join(outputDirectory, assetPath))
        .split(path.sep)
        .join("/");
    return relative || ".";
};

const manifestKeyFor = (manifest: Manifest, pathOrFile: string): string | undefined => {
    if (manifest[pathOrFile]) return pathOrFile;
    const match = Object.entries(manifest).find(([key, entry]) =>
        key.endsWith(`/${pathOrFile}`) || entry.file === pathOrFile);
    return match?.[0];
};

const manifestEntryFor = (manifest: Manifest, entryPath: string): ManifestEntry => {
    const manifestKey = manifestKeyFor(manifest, entryPath);
    if (!manifestKey) throw new Error(`Build manifest has no entry for ${entryPath}.`);
    return manifest[manifestKey];
};

export const cssAssetsForManifestEntry = (manifest: Manifest, entryPath: string): readonly string[] => {
    const entryKey = manifestKeyFor(manifest, entryPath);
    if (!entryKey) throw new Error(`Build manifest has no entry for ${entryPath}.`);

    const visited = new Set<string>();
    const cssAssets: string[] = [];
    const visit = (manifestKey: string): void => {
        if (visited.has(manifestKey)) return;
        visited.add(manifestKey);

        const entry = manifest[manifestKey];
        if (!entry) return;
        for (const importedPath of entry.imports ?? []) {
            const importedKey = manifestKeyFor(manifest, importedPath);
            if (importedKey) visit(importedKey);
        }
        for (const cssAsset of entry.css ?? []) {
            if (!cssAssets.includes(cssAsset)) cssAssets.push(cssAsset);
        }
    };

    visit(entryKey);
    return cssAssets;
};

const alternateLinksFor = (locale: Locale, route: string): string => {
    const canonical = `<link rel="canonical" href="https://www.steam-engine.org${localizedRoute(locale, route)}">`;
    if (route === "/about" || route === "/privacy") return canonical;
    return [
        canonical,
        ...localeDefinitions.map(({ code, htmlLang }) =>
            `<link rel="alternate" hreflang="${htmlLang}" href="https://www.steam-engine.org${
                localizedRoute(code, route)}">`),
    ].join("\n    ");
};

const htmlFor = (
    outputDirectory: string,
    page: CompactPage,
    manifest: Manifest,
): string => {
    const metadata = routeMetadataFor(page.locale, page.route);
    if (!metadata) throw new Error(`Missing ${page.locale} metadata for ${page.route}.`);
    const outputPath = path.join(outputDirectory, page.outputPath);
    const title = page.route === "/" ? metadata.title : `${metadata.title} | Steam Engine`;
    const description = metadata.description === undefined
        ? ""
        : `\n    <meta name="description" content="${escapeHtml(metadata.description)}" />`;
    const manifestEntry = manifestEntryFor(manifest, page.entryPath);
    const css = cssAssetsForManifestEntry(manifest, page.entryPath).map((assetPath) =>
        `    <link rel="stylesheet" href="${relativeAssetPath(outputDirectory, outputPath, assetPath)}">`).join("\n");
    const script = relativeAssetPath(outputDirectory, outputPath, manifestEntry.file);
    const route = page.route === "/" ? "index" : dataRouteFor(page.route);
    const localeAttribute = ` data-locale="${page.locale}"`;
    const direction = page.locale === "ar" ? ' dir="rtl"' : "";
    const favicon = relativeAssetPath(outputDirectory, outputPath, "favicon.ico");
    const dataDescription = metadata.description === undefined
        ? ""
        : `\n      data-description="${escapeHtml(metadata.description)}"`;
    return `<!doctype html>
<html lang="${escapeHtml(
        localeDefinitions.find(({ code }) => code === page.locale)?.htmlLang ?? page.locale)}"${direction}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />${description}${
        page.route === "/privacy" ? "" : googleAdsenseHeadMarkup()}${googleAnalyticsHeadMarkup()}
    ${alternateLinksFor(page.locale, page.route)}
    <link rel="icon" href="${favicon}">
${css}
    <title>${escapeHtml(title)}</title>
  </head>
  <body>
    <div id="root" data-route="${escapeHtml(route)}"${localeAttribute}
      data-title="${escapeHtml(metadata.title)}"${dataDescription}></div>
    <script type="module" src="${script}"></script>
  </body>
</html>
`;
};

export const materializeCompactPages = (
    outputDirectory: string,
    pages: readonly CompactPage[],
): void => {
    const manifestPath = path.join(outputDirectory, ".vite", "manifest.json");
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as Record<string, ManifestEntry>;
    for (const page of pages) {
        const outputPath = path.join(outputDirectory, page.outputPath);
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, htmlFor(outputDirectory, page, manifest), "utf8");
    }
    fs.rmSync(path.join(outputDirectory, ".vite"), { recursive: true, force: true });
};
