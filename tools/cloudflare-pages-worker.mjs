const categorySections = {
    concept: "concepts",
    battery: "batteries",
    mod: "mods",
    material: "materials",
};

const localizedPrefixes = [
    "nb", "nn", "zh-Hans", "ar", "es", "fr", "pl", "uk", "it", "vi", "de", "sv", "da", "is", "hi", "bn",
    "pt", "pt-BR", "ja", "ko", "el", "es-419", "tr", "id", "fi",
];
const localePattern = localizedPrefixes.join("|");
const categoryShortcut = new RegExp(
    `^/(?:(${localePattern})/)?catalog/(concept|battery|mod|material)$`,
);
const calculatorNames = ["batt", "coil", "converter", "juice", "modrange", "ohm", "tcr", "wirewiz"];
const calculatorPath = new RegExp(
    `^/(${calculatorNames.join("|")})$`,
);
const blogHost = "blog.steam-engine.org";
const canonicalBlogOrigin = "https://www.steam-engine.org";

export const blogRedirectTargetFor = (pathname) => {
    const normalizedPath = pathname === "/" ? "" : pathname.replace(/\/+$/, "");
    return `${canonicalBlogOrigin}/blog${normalizedPath}`;
};

export const resolveCloudflareRequest = (pathname) => {
    if (pathname === "/404" || (pathname !== "/" && pathname.endsWith("/"))) {
        return { kind: "reject", status: 404 };
    }

    const lowerPathname = pathname.toLowerCase();
    if (lowerPathname === "/default.asp" || lowerPathname === "/index.html") {
        return {
            kind: "redirect",
            location: "/",
            preserveQuery: true,
            status: 301,
        };
    }

    const implementationSuffix = lowerPathname.endsWith(".asp")
        ? ".asp"
        : lowerPathname.endsWith(".html")
            ? ".html"
            : "";
    if (implementationSuffix) {
        const canonicalPath = pathname.slice(0, -implementationSuffix.length);
        if (!calculatorPath.test(canonicalPath)) {
            return { kind: "reject", status: 404 };
        }
        return {
            kind: "redirect",
            location: canonicalPath,
            preserveQuery: !(canonicalPath === "/wirewiz" && implementationSuffix === ".asp"),
            status: 301,
        };
    }

    const shortcut = pathname.match(categoryShortcut);
    if (shortcut) {
        const category = shortcut[2];
        const catalogPath = pathname.slice(0, -(`/${category}`).length);
        return {
            kind: "redirect",
            location: `${catalogPath}#${categorySections[category]}`,
            status: 301,
        };
    }

    return { kind: "asset" };
};

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.hostname === blogHost) {
            let target = new URL(blogRedirectTargetFor(url.pathname));
            if (target.pathname !== "/blog") {
                try {
                    const targetResponse = await fetch(new Request(target, { method: "HEAD" }));
                    if (!targetResponse.ok) target = new URL(`${canonicalBlogOrigin}/blog`);
                } catch {
                    target = new URL(`${canonicalBlogOrigin}/blog`);
                }
            }
            return Response.redirect(target, 301);
        }

        const route = resolveCloudflareRequest(url.pathname);
        if (route.kind === "reject") return new Response("Not found", { status: route.status });
        if (route.kind === "redirect") {
            const target = new URL(route.location, url.origin);
            if (route.preserveQuery) target.search = url.search;
            return Response.redirect(target, route.status);
        }
        return env.ASSETS.fetch(request);
    },
};
