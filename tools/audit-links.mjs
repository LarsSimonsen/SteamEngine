import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicRoot = path.join(projectRoot, "public");
const reportPath = path.join(projectRoot, "LINK-AUDIT.md");
const origin = "https://www.steam-engine.org";
const internalHosts = new Set(["steam-engine.org", "www.steam-engine.org"]);
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

const listHtmlFiles = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
        ? listHtmlFiles(entryPath)
        : entry.name.endsWith(".html") ? [entryPath] : [];
});

const toPosixPath = (value) => value.split(path.sep).join("/");

const routeForPublicFile = (filePath) => {
    const relativePath = toPosixPath(path.relative(publicRoot, filePath));
    if (relativePath === "index.html") return "/";
    if (relativePath.endsWith("/index.html")) return `/${relativePath.slice(0, -"/index.html".length)}`;
    return `/${relativePath.slice(0, -".html".length)}`;
};

const isHiddenBlogPostRoute = (route) => {
    const match = route.match(/^\/blog\/\d{4}\/\d{2}\/\d{2}\/([^/]+)$/);
    return match !== null && hiddenPostSlugs.has(match[1]);
};

const artifactForRoute = (pathname) => {
    if (pathname === "/") return "index.html";
    if (pathname === "/blog" || pathname.startsWith("/blog/")) {
        return `blog/${pathname.slice("/blog/".length)}/index.html`;
    }
    return `${pathname.slice(1)}.html`;
};

const staticFileExists = (pathname) => {
    const segments = pathname.split("/").filter(Boolean).map((segment) => decodeURIComponent(segment));
    if (segments.some((segment) => segment === "." || segment === "..")) return false;
    const filePath = path.join(publicRoot, ...segments);
    return path.extname(filePath) !== "" && fs.existsSync(filePath) && fs.statSync(filePath).isFile();
};

const routeExists = (pathname) => fs.existsSync(path.join(publicRoot, ...artifactForRoute(pathname).split("/")));

const internalRedirect = (pathname) => {
    if (/^\/(about|privacy|batt|coil|converter|juice|modrange|ohm|tcr|wirewiz)\/$/.test(pathname)) {
        return pathname.slice(0, -1);
    }
    if (/^\/old\/[^/.]+\/$/.test(pathname)) return pathname.slice(0, -1);
    if (/^\/catalog\/(concept|battery|mod|material)\/[^/.]+\/$/.test(pathname)) {
        return pathname.slice(0, -1);
    }
    return undefined;
};

const isIgnoredScheme = (url) => ["mailto:", "tel:", "javascript:", "data:", "blob:"].includes(url.protocol);

const sourceLabel = (filePath, route) => `${toPosixPath(path.relative(projectRoot, filePath))} (${route})`;

const uniqueBy = (items, key) => [...new Map(items.map((item) => [key(item), item])).values()];

const fetchExternal = async (url) => {
    let response;
    let lastError;
    for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
            response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(15000) });
            break;
        } catch (error) {
            lastError = error;
        }
    }
    if (!response) throw lastError;
    const location = response.headers.get("location");
    if (response.status >= 300 && response.status < 400 && location) {
        const nextUrl = new URL(location, url).href;
        const next = await fetchExternal(nextUrl);
        return { status: response.status, finalUrl: next.finalUrl, redirect: true, chain: [url, ...next.chain] };
    }
    return { status: response.status, finalUrl: url, redirect: false, chain: [url] };
};

const formatSources = (sources) => sources.map((source) => "`" + source + "`").join(", ");

const run = async () => {
    const htmlFiles = listHtmlFiles(publicRoot).filter((filePath) => !isHiddenBlogPostRoute(routeForPublicFile(filePath)));
    const dead = [];
    const unverified = [];
    const redirects = [];
    const links = [];

    for (const filePath of htmlFiles) {
        const route = routeForPublicFile(filePath);
        const dom = new JSDOM(fs.readFileSync(filePath, "utf8"), { url: new URL(route, origin).href });
        for (const anchor of dom.window.document.querySelectorAll("a[href]")) {
            const href = anchor.getAttribute("href")?.trim() ?? "";
            if (!href) continue;
            let resolved;
            try {
                resolved = new URL(href, dom.window.document.baseURI);
            } catch {
                dead.push({ target: href, reason: "invalid URL", sources: [sourceLabel(filePath, route)] });
                continue;
            }
            if (resolved.hash && resolved.pathname === new URL(dom.window.document.baseURI).pathname) continue;
            if (isIgnoredScheme(resolved) || (resolved.hash && !resolved.pathname)) continue;
            links.push({ filePath, route, href, resolved });
        }
        dom.window.close();
    }

    const groupedInternal = new Map();
    for (const link of links) {
        const { resolved } = link;
        if (!internalHosts.has(resolved.hostname.toLowerCase())) continue;
        const key = resolved.pathname;
        const entry = groupedInternal.get(key) ?? { target: resolved.href, pathname: key, sources: [] };
        entry.sources.push(sourceLabel(link.filePath, link.route));
        groupedInternal.set(key, entry);
    }

    for (const entry of groupedInternal.values()) {
        const redirect = internalRedirect(entry.pathname);
        const exists = routeExists(entry.pathname);
        if (redirect) redirects.push({ target: entry.target, destination: `${origin}${redirect}`, kind: "internal", sources: uniqueBy(entry.sources, (source) => source) });
        else if (!exists && !staticFileExists(entry.pathname)) {
            dead.push({ target: entry.target, reason: "no generated public page or static file", sources: uniqueBy(entry.sources, (source) => source) });
        }
    }

    const externalLinks = links.filter(({ resolved }) => resolved.protocol.match(/^https?:$/)
        && !internalHosts.has(resolved.hostname.toLowerCase()));
    const externalByUrl = new Map();
    for (const link of externalLinks) {
        const key = link.resolved.href;
        const entry = externalByUrl.get(key) ?? { url: key, sources: [] };
        entry.sources.push(sourceLabel(link.filePath, link.route));
        externalByUrl.set(key, entry);
    }

    const externalResults = [];
    for (const entry of externalByUrl.values()) {
        try {
            externalResults.push({ ...entry, ...(await fetchExternal(entry.url)) });
        } catch (error) {
            externalResults.push({ ...entry, status: "error", finalUrl: "", error: error instanceof Error ? error.message : String(error) });
        }
    }
    for (const result of externalResults) {
        const sources = uniqueBy(result.sources, (source) => source);
        if (result.status === "error") {
            unverified.push({ target: result.url, reason: result.error, sources });
        } else if (result.status >= 400) {
            dead.push({ target: result.url, reason: `HTTP ${result.status}`, sources });
        } else if (result.redirect) {
            redirects.push({ target: result.url, destination: result.finalUrl, kind: `external HTTP ${result.status}`, sources });
        }
    }

    const renderRows = (rows, columns) => rows.length === 0
        ? "_None found._"
        : rows.map((row) => `| ${columns.map((column) => row[column]).join(" | ")} |`).join("\n");
    const deadRows = dead.sort((a, b) => a.target.localeCompare(b.target)).map((item) => ({
        target: `\`${item.target}\``, reason: item.reason, sources: formatSources(item.sources),
    }));
    const redirectRows = redirects.sort((a, b) => a.target.localeCompare(b.target)).map((item) => ({
        target: `\`${item.target}\``, destination: `\`${item.destination}\``, kind: item.kind,
        sources: formatSources(item.sources),
    }));
    const unverifiedRows = unverified.sort((a, b) => a.target.localeCompare(b.target)).map((item) => ({
        target: `\`${item.target}\``, reason: item.reason, sources: formatSources(item.sources),
    }));
    const report = [
        "# Link audit",
        "",
        `Generated ${new Date().toISOString()}. Audited ${htmlFiles.length} generated HTML pages and ${links.length} non-empty links.`,
        "",
        "The audit treats the generated `public/` directory as the website surface. Internal route results use the repository's IIS route contract; external HTTP results were checked with redirects disabled and followed manually.",
        "",
        `## Dead links (${deadRows.length})`,
        "",
        "| Target | Reason | Found on |",
        "| --- | --- | --- |",
        renderRows(deadRows, ["target", "reason", "sources"]),
        "",
        `## Redirecting links (${redirectRows.length})`,
        "",
        "| Target | Destination | Kind | Found on |",
        "| --- | --- | --- | --- |",
        renderRows(redirectRows, ["target", "destination", "kind", "sources"]),
        "",
        `## Unverified external links (${unverifiedRows.length})`,
        "",
        "These targets could not be checked because the remote host or network connection failed. They are not counted as confirmed dead links.",
        "",
        "| Target | Reason | Found on |",
        "| --- | --- | --- |",
        renderRows(unverifiedRows, ["target", "reason", "sources"]),
        "",
        "## Notes",
        "",
        `- Unique external HTTP targets checked: ${externalResults.length}.`,
        "- Fragment-only links were excluded from HTTP checks.",
        "- Links to the site's own domain were checked against the generated route artifacts and known IIS redirects.",
        "",
    ].join("\n");
    fs.writeFileSync(reportPath, report, "utf8");
    console.log(`Audited ${htmlFiles.length} HTML pages and ${links.length} links.`);
    console.log(`Found ${dead.length} dead links, ${redirects.length} redirecting links, and ${unverified.length} unverified links.`);
    console.log(`Wrote ${path.relative(projectRoot, reportPath)}.`);
};

await run();
