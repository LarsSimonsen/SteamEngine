import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicRoot = path.resolve(process.env.STEAM_ENGINE_PUBLIC_ROOT ?? path.join(projectRoot, "public"));
const contractPath = path.join(projectRoot, "tools", "route-contract.json");
const internalHosts = new Set(["steam-engine.org", "www.steam-engine.org"]);
const checkOrigin = "https://www.steam-engine.org";
const hiddenPostSlugs = new Set([
    "custom-data",
    "cloud-chasing",
    "tfr-bug-in-the-wire-wizard-fixed",
    "xtar-pb2s",
    "site-integration",
    "new-version-of-steam-engine-in-the-works",
    "new-version-out-and-about",
    "themes-are-back",
    "gmo-takes-a-look-at-steam-engine",
    "dna-200",
    "add-steam-engine-home-screen",
    "steam-engine-with-no-internet-access",
    "dutch-clouds-coil-calculator-video-tutorial",
]);

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));

const listHtmlFiles = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
        ? listHtmlFiles(entryPath)
        : entry.name.endsWith(".html") ? [entryPath] : [];
});

const toPosixPath = (value) => value.split(path.sep).join("/");

const routeForPublicFile = (filePath, publicDirectory = publicRoot) => {
    const relativePath = toPosixPath(path.relative(publicDirectory, filePath));
    if (relativePath === "index.html") return "/";
    if (relativePath.endsWith("/index.html")) {
        return `/${relativePath.slice(0, -"/index.html".length)}`;
    }
    if (relativePath.endsWith(".html")) {
        return `/${relativePath.slice(0, -".html".length)}`;
    }
    throw new Error(`Unable to derive a public route from ${relativePath}`);
};

const isHiddenBlogPostRoute = (route) => {
    const match = route.match(/^\/blog\/\d{4}\/\d{2}\/\d{2}\/([^/]+)$/);
    return match !== null && hiddenPostSlugs.has(match[1]);
};

const escapePattern = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const placeholderPatternsFor = (contract) => {
    const valuesPattern = (values) => `(?:${values.map(escapePattern).join("|")})`;
    const localizedLocales = contract.localization.publishedLocales
        .filter((locale) => locale !== contract.localization.defaultLocale);
    const calculatorRoutes = contract.navigation.routableCalculators.map((route) => route.slice(1));
    const legacyPages = [...contract.legacy.listedPages, ...contract.legacy.addressableOnlyPages]
        .map((route) => route.slice(route.lastIndexOf("/") + 1));

    return new Map([
        ["locale", valuesPattern(localizedLocales)],
        ["calculator", valuesPattern(calculatorRoutes)],
        ["category", valuesPattern(contract.catalogDetail.categories)],
        ["legacyPage", valuesPattern(legacyPages)],
        ["page", "[1-9][0-9]*"],
        ["year", "[0-9]{4}"],
        ["month", "(?:0[1-9]|1[0-2])"],
        ["day", "(?:0[1-9]|[12][0-9]|3[01])"],
        ["slug", "[a-z0-9]+(?:-[a-z0-9]+)*"],
        ["path", ".+"],
    ]);
};

const templatePattern = (template, placeholderPatterns) => {
    const parts = template.split(/(<[^>]+>)/g).filter(Boolean);
    const pattern = parts.map((part) => {
        const placeholder = part.match(/^<([^>]+)>$/)?.[1];
        if (placeholder) return placeholderPatterns.get(placeholder) ?? "[^/]+";
        return escapePattern(part);
    }).join("");
    return new RegExp(`^${pattern}$`);
};

const routePatternsFor = (contract) => {
    const placeholderPatterns = placeholderPatternsFor(contract);
    return [
        ...contract.canonicalization.slashless,
        ...(contract.generatedLinkPatterns ?? []),
    ].map((template) => ({ template, pattern: templatePattern(template, placeholderPatterns) }));
};

const routeMatchesContract = (route, routePatterns) => routePatterns.some(({ pattern }) => pattern.test(route));

const publicArtifactForRoute = (route) => {
    if (route === "/") return "index.html";
    if (route === "/old") return "old/index.html";
    if (route === "/blog" || route.startsWith("/blog/")) {
        return `blog/${route.slice("/blog/".length)}/index.html`;
    }
    return `${route.slice(1)}.html`;
};

const publicArtifactExists = (publicDirectory, route) =>
    fs.existsSync(path.join(publicDirectory, ...publicArtifactForRoute(route).split("/")));

const isFragmentOnly = (href) => href.startsWith("#");

const isInternalHttpUrl = (url) =>
    (url.protocol === "http:" || url.protocol === "https:") && internalHosts.has(url.hostname.toLowerCase());

const publicStaticFileExists = (publicDirectory, pathname) => {
    let segments;
    try {
        segments = pathname.split("/").filter(Boolean).map(decodeURIComponent);
    } catch {
        return false;
    }
    if (segments.length === 0 || segments.some((segment) => segment === "." || segment === "..")) return false;

    const filePath = path.join(publicDirectory, ...segments);
    return path.extname(filePath) !== "" && fs.existsSync(filePath) && fs.statSync(filePath).isFile();
};

const historicalExceptionKey = (sourceRoute, href) => `${sourceRoute}\u0000${href}`;

const formatLinkError = ({ filePath, route, href, resolvedPath, reason }) =>
    `${toPosixPath(path.relative(projectRoot, filePath))} (${route}) href=${JSON.stringify(href)} `
    + `${resolvedPath ? `resolved to ${resolvedPath}` : "could not be resolved"}: ${reason}`;

const decodeHtmlAttribute = (value) => value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

const linksForHtml = (html) => {
    const links = [];
    const linkPattern = /<a\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
    for (const match of html.matchAll(linkPattern)) {
        links.push(decodeHtmlAttribute(match[1] ?? match[2] ?? match[3] ?? ""));
    }
    return links;
};

const baseUrlForHtml = (html, pageUrl) => {
    const match = html.match(/<base\b[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const href = match ? decodeHtmlAttribute(match[1] ?? match[2] ?? match[3] ?? "") : "";
    return href ? new URL(href, pageUrl).href : pageUrl.href;
};

export const checkGeneratedLinks = ({ publicDirectory = publicRoot, contract = readJson(contractPath) } = {}) => {
    if (!fs.existsSync(publicDirectory)) throw new Error(`Generated public directory not found: ${publicDirectory}`);

    const routePatterns = routePatternsFor(contract);
    const historicalExceptions = new Map((contract.generatedLinkExceptions ?? [])
        .map((exception) => [historicalExceptionKey(exception.sourceRoute, exception.href), exception]));
    const errors = [];
    let linkCount = 0;
    let exceptionCount = 0;
    const htmlFiles = listHtmlFiles(publicDirectory)
        .filter((filePath) => !isHiddenBlogPostRoute(routeForPublicFile(filePath, publicDirectory)));

    for (const filePath of htmlFiles) {
        const route = routeForPublicFile(filePath, publicDirectory);
        const pageUrl = new URL(route, checkOrigin);
        const html = fs.readFileSync(filePath, "utf8");
        const baseUrl = baseUrlForHtml(html, pageUrl);

        for (const hrefValue of linksForHtml(html)) {
            const href = hrefValue.trim();
            if (!href || isFragmentOnly(href)) continue;

            let resolvedUrl;
            try {
                resolvedUrl = new URL(href, baseUrl);
            } catch (error) {
                errors.push(formatLinkError({
                    filePath,
                    route,
                    href,
                    reason: `invalid URL (${error instanceof Error ? error.message : String(error)})`,
                }));
                continue;
            }

            if (!isInternalHttpUrl(resolvedUrl)) continue;
            linkCount += 1;

            const exception = historicalExceptions.get(historicalExceptionKey(route, href));
            if (exception) {
                exceptionCount += 1;
                continue;
            }

            if (resolvedUrl.username || resolvedUrl.password || resolvedUrl.port) {
                errors.push(formatLinkError({
                    filePath,
                    route,
                    href,
                    resolvedPath: resolvedUrl.pathname,
                    reason: "internal links must not contain credentials or a non-standard port",
                }));
                continue;
            }

            const resolvedPath = resolvedUrl.pathname;
            if (resolvedPath !== "/" && resolvedPath.endsWith("/")) {
                errors.push(formatLinkError({
                    filePath,
                    route,
                    href,
                    resolvedPath,
                    reason: "internal page links must not have a trailing slash",
                }));
                continue;
            }
            if (/\.html?$/i.test(resolvedPath)) {
                errors.push(formatLinkError({
                    filePath,
                    route,
                    href,
                    resolvedPath,
                    reason: "internal page links must not expose an HTML implementation suffix",
                }));
                continue;
            }
            if (publicStaticFileExists(publicDirectory, resolvedPath)) continue;

            if (!routeMatchesContract(resolvedPath, routePatterns)) {
                errors.push(formatLinkError({
                    filePath,
                    route,
                    href,
                    resolvedPath,
                    reason: "target is not a canonical route in route-contract.json",
                }));
                continue;
            }

            if (!publicArtifactExists(publicDirectory, resolvedPath)) {
                errors.push(formatLinkError({
                    filePath,
                    route,
                    href,
                    resolvedPath,
                    reason: `no generated public artifact at ${publicArtifactForRoute(resolvedPath)}`,
                }));
            }
        }
    }

    if (errors.length > 0) {
        throw new Error([
            `Generated internal-link validation failed with ${errors.length} error(s):`,
            ...errors.map((error) => `- ${error}`),
        ].join("\n"));
    }

    return { exceptionCount, htmlFileCount: htmlFiles.length, linkCount };
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        const result = checkGeneratedLinks();
        const exceptionSummary = result.exceptionCount > 0
            ? ` (${result.exceptionCount} documented historical exception(s))`
            : "";
        console.log(
            `Generated internal-link validation passed. Checked ${result.linkCount} links in `
            + `${result.htmlFileCount} HTML files${exceptionSummary}.`,
        );
    } catch (error) {
        console.error(error instanceof Error ? error.message : String(error));
        process.exitCode = 1;
    }
}
