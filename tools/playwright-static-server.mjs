import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.resolve(process.env.PLAYWRIGHT_PUBLIC_ROOT ?? path.join(projectRoot, "public"));
const host = process.env.PLAYWRIGHT_HOST ?? "127.0.0.1";
const port = Number(process.env.PLAYWRIGHT_PORT ?? 4229);
const routeContract = JSON.parse(readFileSync(path.join(projectRoot, "tools", "route-contract.json"), "utf8"));

const escapePattern = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const alternation = (values) => `(?:${values.map(escapePattern).join("|")})`;
const localizedLocales = routeContract.localization.publishedLocales
    .filter((locale) => locale !== routeContract.localization.defaultLocale);
const localePattern = alternation(localizedLocales);
const calculatorPattern = alternation(routeContract.navigation.routableCalculators
    .map((route) => route.slice(1)));
const comparisonPattern = alternation(routeContract.navigation.comparisonPages
    .map((route) => route.slice(1)));
const categoryPattern = alternation(routeContract.catalogDetail.categories);
const legacyPagePattern = alternation([
    ...routeContract.legacy.listedPages,
    ...routeContract.legacy.addressableOnlyPages,
].map((route) => route.slice(route.lastIndexOf("/") + 1)));
const localizedPage = new RegExp(
    `^/(${localePattern})(?:/catalog|/${calculatorPattern}|/${comparisonPattern})?$`,
);
const catalogDetailPage = new RegExp(`^/(?:(${localePattern})/)?catalog/${categoryPattern}/[^/.]+$`);
const legacyPage = new RegExp(`^/old/${legacyPagePattern}$`);
const blogPaginationPage = /^\/blog\/page\/[1-9][0-9]*$/;
const blogArticlePage = /^\/blog\/[0-9]{4}\/[0-9]{2}\/[0-9]{2}\/[a-z0-9]+(?:-[a-z0-9]+)*$/;
const categoryShortcuts = new Map(routeContract.catalogDetail.categoryShortcuts
    .map((shortcut) => [shortcut.path, shortcut]));

const contentTypes = new Map([
    [".css", "text/css; charset=utf-8"],
    [".html", "text/html; charset=utf-8"],
    [".ico", "image/x-icon"],
    [".js", "text/javascript; charset=utf-8"],
    [".json", "application/json; charset=utf-8"],
    [".map", "application/json; charset=utf-8"],
    [".png", "image/png"],
    [".svg", "image/svg+xml"],
    [".txt", "text/plain; charset=utf-8"],
    [".webp", "image/webp"],
    [".jpg", "image/jpeg"],
    [".jpeg", "image/jpeg"],
]);

const routeFile = (pathname) => {
    if (pathname === "/") return "index.html";
    if (pathname === "/old") return "old/index.html";
    if (pathname === "/blog") return "blog/index.html";
    if (blogPaginationPage.test(pathname) || blogArticlePage.test(pathname)) {
        return `blog${pathname.slice("/blog".length)}/index.html`;
    }

    if (new RegExp(
        `^/(?:about|batt|coil|converter|juice|modrange|ohm|tcr|wirewiz|catalog|${comparisonPattern})$`,
    ).test(pathname)) {
        return `${pathname.slice(1)}.html`;
    }
    if (localizedPage.test(pathname)) {
        return `${pathname.slice(1)}.html`;
    }
    if (catalogDetailPage.test(pathname)) {
        return `${pathname.slice(1)}.html`;
    }
    if (legacyPage.test(pathname)) return `${pathname.slice(1)}.html`;
    return undefined;
};

const safeFilePath = (relativePath) => {
    const filePath = path.resolve(publicRoot, relativePath);
    const relative = path.relative(publicRoot, filePath);
    return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative)) ? filePath : undefined;
};

const sendNotFound = (response) => {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
};

const server = createServer((request, response) => {
    let pathname;
    try {
        pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
    } catch {
        response.writeHead(400);
        response.end("Bad request");
        return;
    }

    if (pathname === "/__playwright_health") {
        response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
        response.end("ok");
        return;
    }

    if (pathname !== "/" && (pathname.endsWith("/") || /\.html?$/i.test(pathname))) {
        sendNotFound(response);
        return;
    }

    const localizedShortcutMatch = pathname.match(new RegExp(`^/(${localePattern})(/catalog/[^/]+)$`));
    const shortcut = categoryShortcuts.get(localizedShortcutMatch?.[2] ?? pathname);
    if (shortcut) {
        const localePrefix = localizedShortcutMatch ? `/${localizedShortcutMatch[1]}` : "";
        response.writeHead(shortcut.status, { location: `${localePrefix}${shortcut.location}` });
        response.end();
        return;
    }

    const route = routeFile(pathname);
    const relativePath = route ?? pathname.slice(1);
    const filePath = safeFilePath(relativePath);
    if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
        sendNotFound(response);
        return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
        "cache-control": "no-cache",
        "content-type": contentTypes.get(extension) ?? "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
    console.log(`Playwright static server listening at http://${host}:${port}`);
});
