import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsRoot = path.dirname(fileURLToPath(import.meta.url));
const workerSource = path.join(toolsRoot, "cloudflare-pages-worker.mjs");
const notFoundPage = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Not found | Steam Engine</title></head>
<body><main><h1>Page not found</h1><p><a href="/">Return to Steam Engine</a></p></main></body>
</html>
`;

const listIndexPages = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listIndexPages(entryPath);
    return entry.name === "index.html" ? [entryPath] : [];
});

const removeEmptyDirectories = (directory, preserveRoot = true) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (entry.isDirectory()) removeEmptyDirectories(path.join(directory, entry.name), false);
    }
    if (!preserveRoot && fs.readdirSync(directory).length === 0) fs.rmdirSync(directory);
};

// Static files bypass the Worker so they do not count against the Workers daily request limit. Every path here
// must resolve to an asset in the Worker, so excluding it does not change the response.
export const cloudflareRoutes = {
    version: 1,
    include: ["/*"],
    exclude: [
        "/assets/*",
        "/advertising/*",
        "/blog/assets/*",
        "/catalog/data/*",
        "/old/static/*",
        "/old/analytics.js",
        "/old/se.css",
        "/old/steam-engine.js",
        "/old/tcr.js",
        "/old/wirewiz2.css",
        "/ads.txt",
        "/blog/feed.xml",
        "/favicon.ico",
        "/sitemap.xml",
    ],
};

export const cloudflareRouteExcludes = (pathname) => cloudflareRoutes.exclude.some((rule) => rule.endsWith("/*")
    ? pathname.startsWith(rule.slice(0, -1))
    : pathname === rule);

export const cloudflareArtifactPathForOrigin = (originPath) => originPath === "index.html"
    ? originPath
    : originPath.endsWith("/index.html")
        ? `${originPath.slice(0, -"/index.html".length)}.html`
        : originPath;

export const prepareCloudflarePagesArtifact = (artifactRoot) => {
    fs.rmSync(path.join(artifactRoot, "web.config"), { force: true });

    for (const indexPath of listIndexPages(artifactRoot)) {
        if (indexPath === path.join(artifactRoot, "index.html")) continue;
        const relativePath = path.relative(artifactRoot, indexPath).split(path.sep).join("/");
        const destination = path.join(artifactRoot, cloudflareArtifactPathForOrigin(relativePath));
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.renameSync(indexPath, destination);
    }

    removeEmptyDirectories(artifactRoot);
    fs.writeFileSync(path.join(artifactRoot, "404.html"), notFoundPage, "utf8");
    fs.copyFileSync(workerSource, path.join(artifactRoot, "_worker.js"));
    fs.writeFileSync(path.join(artifactRoot, "_routes.json"), `${JSON.stringify(cloudflareRoutes, null, 4)}\n`, "utf8");
};
