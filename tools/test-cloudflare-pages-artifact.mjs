import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cloudflareArtifactPathForOrigin } from "./cloudflare-pages-artifact.mjs";
import cloudflareWorker, { blogRedirectTargetFor, resolveCloudflareRequest } from "./cloudflare-pages-worker.mjs";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const contract = JSON.parse(fs.readFileSync(path.join(projectRoot, "tools", "route-contract.json"), "utf8"));
const artifactRoot = path.resolve(
    process.env.STEAM_ENGINE_CLOUDFLARE_ARTIFACT
        ?? path.join(projectRoot, ".build-runs", "cloudflare-artifact"),
);

const assert = (condition, message) => {
    if (!condition) throw new Error(message);
};

assert(fs.existsSync(path.join(artifactRoot, "_worker.js")), "Cloudflare artifact is missing _worker.js.");
assert(fs.existsSync(path.join(artifactRoot, "404.html")), "Cloudflare artifact is missing 404.html.");
assert(!fs.existsSync(path.join(artifactRoot, "web.config")), "Cloudflare artifact includes local IIS web.config.");
const sitemap = fs.readFileSync(path.join(artifactRoot, "sitemap.xml"), "utf8");
assert(sitemap.includes("<loc>https://www.steam-engine.org/blog</loc>"),
    "The sitemap should include the canonical blog landing page.");
assert(!sitemap.includes("blog.steam-engine.org"),
    "The sitemap should not list the retired blog compatibility hostname.");
assert([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .every(([, location]) => location.startsWith("https://www.steam-engine.org/")),
    "Every sitemap URL should use the canonical HTTPS www origin.");
assert(resolveCloudflareRequest("/nb/catalog/battery").kind === "redirect",
    "A published localized catalog shortcut should redirect.");
for (const locale of contract.localization.publishedLocales) {
    const prefix = locale === contract.localization.defaultLocale ? "" : `/${locale}`;
    for (const shortcut of contract.catalogDetail.categoryShortcuts) {
        const pathname = `${prefix}${shortcut.path}`;
        const result = resolveCloudflareRequest(pathname);
        assert(result.kind === "redirect" && result.status === shortcut.status
            && result.location === `${prefix}${shortcut.location}`,
        `Catalog shortcut must preserve every published locale: ${pathname}`);
    }
}
assert(resolveCloudflareRequest("/xx/catalog/battery").kind === "asset",
    "An unknown locale must not receive a localized catalog redirect.");
assert(resolveCloudflareRequest("/ohm.html").location === "/ohm",
    "An HTML implementation suffix should redirect to the canonical path.");
assert(resolveCloudflareRequest("/ohm.asp").location === "/ohm",
    "An ASP implementation suffix should redirect to the canonical path.");
assert(resolveCloudflareRequest("/nb/converter.html").kind === "reject",
    "A localized calculator HTML suffix should remain unsupported.");
assert(resolveCloudflareRequest("/catalog.html").kind === "reject",
    "A non-calculator HTML implementation suffix should remain unsupported.");
assert(resolveCloudflareRequest("/old/ohm.asp").kind === "reject",
    "A legacy calculator ASP suffix should remain unsupported.");
assert(resolveCloudflareRequest("/default.asp").location === "/",
    "The legacy default ASP page should redirect to the site root.");
assert(resolveCloudflareRequest("/index.html").location === "/",
    "The root index HTML page should redirect to the site root.");
assert(blogRedirectTargetFor("/") === "https://www.steam-engine.org/blog",
    "The blog hostname root should redirect to the canonical blog landing page.");
assert(blogRedirectTargetFor("/2017/04/18/qa-tc-precision/")
    === "https://www.steam-engine.org/blog/2017/04/18/qa-tc-precision",
    "The blog hostname should normalize and preserve existing article paths.");

const suffixRedirect = await cloudflareWorker.fetch(
    new Request("https://steam-engine.example/ohm.html?source=legacy"),
    { ASSETS: { fetch: () => new Response("unexpected asset request", { status: 500 }) } },
);
assert(suffixRedirect.status === 301, "An implementation suffix redirect should be permanent.");
assert(suffixRedirect.headers.get("Location") === "https://steam-engine.example/ohm?source=legacy",
    "An implementation suffix redirect should preserve the query string.");

const wireWizRedirect = await cloudflareWorker.fetch(
    new Request("https://steam-engine.example/wirewiz.asp?source=legacy"),
    { ASSETS: { fetch: () => new Response("unexpected asset request", { status: 500 }) } },
);
assert(wireWizRedirect.status === 301, "The Wire Wizard ASP redirect should be permanent.");
assert(wireWizRedirect.headers.get("Location") === "https://steam-engine.example/wirewiz",
    "The Wire Wizard ASP redirect should drop the legacy query string.");

const originalFetch = globalThis.fetch;
try {
    globalThis.fetch = async () => new Response("article", { status: 200 });
    const blogArticleRedirect = await cloudflareWorker.fetch(
        new Request("https://blog.steam-engine.org/2017/04/18/qa-tc-precision/?source=legacy"),
        { ASSETS: { fetch: () => new Response("unexpected asset request", { status: 500 }) } },
    );
    assert(blogArticleRedirect.status === 301, "An existing blog article should redirect permanently.");
    assert(blogArticleRedirect.headers.get("Location")
        === "https://www.steam-engine.org/blog/2017/04/18/qa-tc-precision",
    "An existing blog article should redirect to its canonical main-site path.");

    globalThis.fetch = async () => new Response("not found", { status: 404 });
    const missingBlogPathRedirect = await cloudflareWorker.fetch(
        new Request("https://blog.steam-engine.org/retired-post"),
        { ASSETS: { fetch: () => new Response("unexpected asset request", { status: 500 }) } },
    );
    assert(missingBlogPathRedirect.headers.get("Location") === "https://www.steam-engine.org/blog",
        "A missing blog path should fall back to the canonical blog landing page.");
} finally {
    globalThis.fetch = originalFetch;
}

for (const routeCase of contract.routeCases) {
    const resolution = resolveCloudflareRequest(routeCase.publicPath);
    const outcome = routeCase.outcome;
    if (outcome.kind === "canonicalRedirect") {
        assert(resolution.kind === "redirect", `${routeCase.publicPath} should redirect.`);
        assert(resolution.location === outcome.location, `${routeCase.publicPath} has the wrong redirect target.`);
        assert(resolution.status === outcome.status, `${routeCase.publicPath} has the wrong redirect status.`);
        continue;
    }
    if (outcome.kind === "unsupported") {
        if (resolution.kind === "reject") {
            assert(resolution.status === outcome.status, `${routeCase.publicPath} has the wrong rejection status.`);
        } else {
            const relativePath = routeCase.publicPath.slice(1);
            assert(!fs.existsSync(path.join(artifactRoot, relativePath)),
                `${routeCase.publicPath} unexpectedly has an exact artifact.`);
            assert(!fs.existsSync(path.join(artifactRoot, `${relativePath}.html`)),
                `${routeCase.publicPath} unexpectedly has a Pages HTML artifact.`);
        }
        continue;
    }
    assert(resolution.kind === "asset", `${routeCase.publicPath} should be served as an asset.`);
    const artifactPath = cloudflareArtifactPathForOrigin(outcome.path);
    assert(fs.existsSync(path.join(artifactRoot, artifactPath)),
        `${routeCase.publicPath} is missing Cloudflare artifact ${artifactPath}.`);
}

console.log(`Cloudflare Pages artifact validation passed. Checked ${contract.routeCases.length} route cases.`);
