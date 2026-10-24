import fs from "node:fs";
import path from "node:path";
import type { BlogBuildOptions, BlogPost, BlogPostMetadata } from "./types";
import { googleAnalyticsHeadMarkup } from "../shared/ui/google-analytics";
import { googleAdsenseHeadMarkup } from "../shared/ui/google-adsense";
import { normalizeExternalHtmlLinks } from "../build/normalize-external-links";

export const blogBasePath = "/blog";
const blogContentEnvironmentVariable = "STEAM_ENGINE_BLOG_CONTENT";
const postsPerPage = 10;
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
    "steam-engine-qa",
]);

const publicPosts = (posts: readonly BlogPost[]): BlogPost[] => posts.filter(
    (post) => !hiddenPostSlugs.has(post.slug),
);

const siteRelativeTarget = (value: string): string => value.replace(/^\/+/, "") || ".";

const siteRootBaseHref = (currentPath: string): string => {
    const depth = Math.max(currentPath.split("/").filter(Boolean).length - 1, 0);
    return depth === 0 ? "./" : "../".repeat(depth);
};

const escapeHtml = (value: string): string => value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const attribute = (value: string): string => escapeHtml(value);

const renderAdPlacement = (placement: string): string => `<div class="ad-slot se-ad-placement text-center"
    aria-label="Advertisement" data-ad-placement="${attribute(placement)}"
    style="margin:1.5em auto;min-height:250px"></div>`;

const paragraphOpeningTag = /<p(?:\s[^>]*)?>/gi;

const insertArticleBanner = (body: string): string => {
    const paragraphs = [...body.matchAll(paragraphOpeningTag)];
    const banner = `\n${renderAdPlacement("blog-article-inline")}\n`;
    if (paragraphs.length < 4) return `${body.trimEnd()}${banner}`;

    const fourthParagraphStart = paragraphs[3].index!;
    return `${body.slice(0, fourthParagraphStart)}${banner}${body.slice(fourthParagraphStart)}`;
};

const normalizeBlogLinks = (body: string): string => normalizeExternalHtmlLinks(body.replace(
    'href="http://nb.gravatar.com/calvinkamos"',
    'href="https://gravatar.com/calvinkamos"',
));

const formatDate = (value: string): string => {
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) return value.slice(0, 10);
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        timeZone: "UTC",
        year: "numeric",
    }).format(date);
};

const readMetadata = (directory: string): BlogPostMetadata => {
    const metadataPath = path.join(directory, "post.json");
    const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8")) as BlogPostMetadata;
    if (!metadata.slug || !metadata.title || !metadata.published) {
        throw new Error(`Blog post metadata is incomplete: ${metadataPath}`);
    }
    return {
        ...metadata,
        excerpt: metadata.excerpt ?? "",
    };
};

// Blog posts are not part of the public repository. The build reads them from the folder named by
// STEAM_ENGINE_BLOG_CONTENT, otherwise from a gitignored `.blog-content` folder or link in the checkout,
// and builds a blog without posts when that folder is missing.
export const resolveBlogContentDirectory = (projectRoot: string): string => {
    const configured = process.env[blogContentEnvironmentVariable];
    if (!configured) return path.join(projectRoot, ".blog-content");

    const directory = path.resolve(configured);
    if (!fs.existsSync(path.join(directory, "posts"))) {
        throw new Error(`${blogContentEnvironmentVariable} does not contain a posts folder: ${directory}`);
    }
    return directory;
};

export const readBlogPosts = (contentDirectory: string): BlogPost[] => {
    const postsDirectory = path.join(contentDirectory, "posts");
    if (!fs.existsSync(postsDirectory)) return [];

    const posts = fs.readdirSync(postsDirectory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => {
            const bodyDirectory = path.join(postsDirectory, entry.name);
            return {
                ...readMetadata(bodyDirectory),
                body: fs.readFileSync(path.join(bodyDirectory, "body.html"), "utf8"),
                bodyDirectory,
            } satisfies BlogPost;
        })
        .sort((left, right) => right.published.localeCompare(left.published));

    const slugs = new Set<string>();
    for (const post of posts) {
        if (!/^[-a-z0-9]+$/.test(post.slug)) {
            throw new Error(`Blog post slug is not URL-safe: ${post.slug}`);
        }
        if (slugs.has(post.slug)) throw new Error(`Duplicate blog post slug: ${post.slug}`);
        slugs.add(post.slug);
    }
    return posts;
};

const postPath = (post: BlogPost): string => {
    const date = post.published.slice(0, 10).split("-");
    return `${blogBasePath}/${date[0]}/${date[1]}/${date[2]}/${post.slug}`;
};

const writePage = (directory: string, html: string): void => {
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, "index.html"), html, "utf8");
};

const writeRoutedPage = (outputDirectory: string, route: string, html: string): void => {
    writePage(path.join(outputDirectory, ...route.split("/").filter(Boolean)), html);
};

const sunIconPath = [
    "M288-32c8.4 0 16.3 4.4 20.6 11.7L364.1 72.3 468.9 46c8.2-2 16.9 .4 22.8 6.3S500 67 498 75.1",
    "l-26.3 104.7 92.7 55.5c7.2 4.3 11.7 12.2 11.7 20.6s-4.4 16.3-11.7 20.6L471.7 332.1",
    "498 436.8c2 8.2-.4 16.9-6.3 22.8S477 468 468.9 466l-104.7-26.3-55.5 92.7c-4.3 7.2-12.2 11.7-20.6 11.7",
    "s-16.3-4.4-20.6-11.7L211.9 439.7 107.2 466c-8.2 2-16.8-.4-22.8-6.3S76 445 78 436.8l26.2-104.7",
    "-92.6-55.5C4.4 272.2 0 264.4 0 256s4.4-16.3 11.7-20.6L104.3 179.9 78 75.1c-2-8.2 .3-16.8 6.3-22.8S99 44 107.2 46",
    "l104.7 26.2 55.5-92.6 1.8-2.6c4.5-5.7 11.4-9.1 18.8-9.1zm0 144a144 144 0 1 0 0 288 144 144 0 1 0 0-288z",
    "m0 240a96 96 0 1 1 0-192 96 96 0 1 1 0 192z",
].join(" ");

const moonIconPath = [
    "M256 0C114.6 0 0 114.6 0 256S114.6 512 256 512c68.8 0 131.3-27.2 177.3-71.4 7.3-7 9.4-17.9 5.3-27.1",
    "s-13.7-14.9-23.8-14.1c-4.9 .4-9.8 .6-14.8 .6-101.6 0-184-82.4-184-184 0-72.1 41.5-134.6 102.1-164.8",
    "9.1-4.5 14.3-14.3 13.1-24.4S322.6 8.5 312.7 6.3C294.4 2.2 275.4 0 256 0z",
].join(" ");

const themeIconMarkup = (kind: "moon" | "sun"): string => {
    const viewBox = kind === "sun" ? "0 0 576 512" : "0 0 512 512";
    const path = kind === "sun" ? sunIconPath : moonIconPath;
    return `<svg class="theme-icon" viewBox="${viewBox}" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="${path}"></path>
</svg>`;
};

const renderSiteNavigation = (): string => {
    const globalLinks = [
        ["catalog", "Catalog"],
    ].map(([href, label]) => `<a href="${siteRelativeTarget(href)}">${label}</a>`);
    globalLinks.push(`<a href="${siteRelativeTarget(blogBasePath)}" aria-current="page">Blog</a>`);
    globalLinks.push(`<button class="theme-toggle" type="button" data-theme-toggle
        aria-label="Switch to light mode" title="Switch to light mode">${themeIconMarkup("sun")}</button>`);
    globalLinks.push(`<a href="about">About</a>`);

    return `<div class="site-nav__global">
    ${globalLinks.join("\n")}
</div>`;
};

const renderCalculatorNavigation = (): string => {
    const calculatorLinks = [
        ["ohm", "Ohm's law"],
        ["coil", "Coil wrapping"],
        ["wirewiz", "Wire Wizard"],
        ["batt", "Battery drain"],
        ["modrange", "Mod range"],
        ["juice", "E-liquid"],
    ].map(([href, label]) => {
        const target = siteRelativeTarget(href);
        return `<a class="site-nav__calculator-link" href="${target}">${label}</a>`;
    });
    return `<div class="site-nav__calculator-list">
    ${calculatorLinks.join("\n")}
</div>`;
};

const themeBootstrapScript = `<script>
(() => {
    let theme = "dark";
    try {
        const saved = JSON.parse(localStorage.getItem("steamengine.theme.v1") || "null");
        if (saved && saved.version === 1 && (saved.theme === "dark" || saved.theme === "light")) theme = saved.theme;
    } catch (error) {
        // A blocked or malformed preference should not prevent the page from rendering.
    }
    document.documentElement.dataset.theme = theme;
})();
</script>`;

const themeToggleScript = `<script>
(() => {
    const button = document.querySelector("[data-theme-toggle]");
    if (!button) return;
    const darkIcon = ${JSON.stringify(themeIconMarkup("sun"))};
    const lightIcon = ${JSON.stringify(themeIconMarkup("moon"))};
    const updateButton = (theme) => {
        const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
        button.innerHTML = theme === "dark" ? darkIcon : lightIcon;
    };
    let theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    updateButton(theme);
    button.addEventListener("click", () => {
        theme = theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = theme;
        updateButton(theme);
        try {
            localStorage.setItem("steamengine.theme.v1", JSON.stringify({ version: 1, theme }));
        } catch (error) {
            // Theme switching still works when browser storage is unavailable.
        }
    });
})();
</script>`;

const renderShell = (
    title: string,
    description: string,
    canonicalPath: string,
    content: string,
): string => {
    const siteRootBase = siteRootBaseHref(canonicalPath);
    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${googleAdsenseHeadMarkup()}
    ${googleAnalyticsHeadMarkup()}
    <base href="${attribute(siteRootBase)}">
    <meta name="description" content="${attribute(description)}">
    <link rel="canonical" href="https://www.steam-engine.org${attribute(canonicalPath)}">
    <link rel="icon" href="favicon.ico">
    <link rel="stylesheet" href="blog/assets/blog.css?v=2">
    <title>${escapeHtml(title)} | Steam Engine</title>
    ${themeBootstrapScript}
</head>
<body>
    <div class="app-shell">
        <a class="skip-link" href="#main">Skip to main content</a>
        <header class="site-header">
            <div class="site-header__primary">
                <div class="site-header__inner">
                    <a class="brand" href="." aria-label="Steam Engine home">
                        <img class="brand__logo" src="blog/assets/logotype.svg" alt="" aria-hidden="true">
                    </a>
                    <nav class="site-nav" aria-label="Primary navigation">
                        ${renderSiteNavigation()}
                    </nav>
                </div>
            </div>
            <div class="site-header__tools">
                <div class="site-header__tools-inner">
                    <nav class="site-tool-nav" aria-label="Calculator navigation">
                        ${renderCalculatorNavigation()}
                    </nav>
                </div>
            </div>
        </header>
        <main id="main" class="blog-main">
            ${content}
        </main>
        <footer class="site-footer">
            <div class="site-footer__inner">
                <a class="site-footer__home-link" href=".">www.steam-engine.org</a>
            </div>
        </footer>
    </div>
    ${themeToggleScript}
    <script async src="advertising/runtime.js"></script>
</body>
</html>
`;
};

const renderPostCard = (post: BlogPost): string => `<article class="blog-card">
    <p class="blog-card__date">${escapeHtml(formatDate(post.published))}</p>
    <h2><a href="${siteRelativeTarget(postPath(post))}">${escapeHtml(post.title)}</a></h2>
    <p>${escapeHtml(post.excerpt)}</p>
</article>`;

const renderListing = (
    posts: readonly BlogPost[],
    page: number,
    pageCount: number,
    heading: string,
    canonicalPath: string,
    includeSidebarAd = false,
): string => {
    const start = (page - 1) * postsPerPage;
    const pagePosts = posts.slice(start, start + postsPerPage);
    const previousPath = page > 1 ? page === 2 ? blogBasePath : `${blogBasePath}/page/${page - 1}` : "";
    const nextPath = page < pageCount
        ? canonicalPath === blogBasePath ? `${blogBasePath}/page/2` : `${blogBasePath}/page/${page + 1}`
        : "";
    const previous = previousPath
        ? `<a href="${siteRelativeTarget(previousPath)}">Newer posts</a>`
        : "";
    const next = nextPath ? `<a href="${siteRelativeTarget(nextPath)}">Older posts</a>` : "";
    const pagination = pageCount > 1 ? `<nav class="blog-pagination" aria-label="Blog pages">
        ${previous}<span>Page ${page} of ${pageCount}</span>${next}
    </nav>` : "";
    const listing = pagePosts.map((post, index) =>
        `${index === 0 ? "" : "<hr>\n"}${renderPostCard(post)}`)
        .join("\n");
    const listingSection = `<section class="blog-listing">
    <div class="blog-listing__intro">
        <p class="blog-eyebrow">Steam Engine</p>
        <h1>${escapeHtml(heading)}</h1>
        <p>Notes, tutorials, reviews, and development updates from Steam Engine.</p>
    </div>
    <div class="blog-card-grid">
        ${listing}
    </div>
    ${pagination}
</section>`;

    if (!includeSidebarAd) return listingSection;
    return `<div class="blog-listing-layout">
    ${listingSection}
    <aside class="blog-listing__ad" aria-label="Advertisement">
        ${renderAdPlacement("blog-index-sidebar")}
    </aside>
</div>`;
};

const renderPost = (post: BlogPost): string => `<article class="blog-article">
    <header class="blog-article__header">
        <p class="blog-eyebrow">${escapeHtml(formatDate(post.published))}</p>
        <h1>${escapeHtml(post.title)}</h1>
    </header>
    <div class="blog-article__body">
        ${insertArticleBanner(normalizeBlogLinks(post.body))}
    </div>
    <footer class="blog-article__footer">
        ${post.updated && post.updated.slice(0, 10) !== post.published.slice(0, 10)
            ? `<p>Updated ${escapeHtml(formatDate(post.updated))}.</p>` : ""}
        <a href="${siteRelativeTarget(blogBasePath)}">Back to the blog</a>
    </footer>
</article>`;

const readAboutBody = (contentDirectory: string): string => {
    const aboutPath = path.join(contentDirectory, "about.html");
    return fs.existsSync(aboutPath) ? fs.readFileSync(aboutPath, "utf8") :
        "<p>This blog contains historical notes and updates from Steam Engine.</p>";
};

const copyDirectory = (source: string, destination: string): void => {
    if (!fs.existsSync(source)) return;
    fs.cpSync(source, destination, { recursive: true });
};

const renderFeed = (posts: readonly BlogPost[]): string => {
    const items = posts.slice(0, 20).map((post) => {
        const url = `https://www.steam-engine.org${postPath(post)}`;
        return `    <item>
        <title>${escapeHtml(post.title)}</title>
        <link>${escapeHtml(url)}</link>
        <guid>${escapeHtml(url)}</guid>
        <pubDate>${new Date(post.published).toUTCString()}</pubDate>
        <description>${escapeHtml(post.excerpt)}</description>
    </item>`;
    }).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
    <title>Steam Engine</title>
    <link>https://www.steam-engine.org${blogBasePath}</link>
    <description>Notes, tutorials, reviews, and development updates from Steam Engine.</description>
${items}
</channel>
</rss>
`;
};

export const getBlogSitemapPaths = (contentDirectory: string): readonly string[] => {
    const posts = publicPosts(readBlogPosts(contentDirectory));
    return [
        blogBasePath,
        `${blogBasePath}/about`,
        ...posts.map(postPath),
    ];
};

export const buildBlog = ({ sourceDirectory, contentDirectory, outputDirectory }: BlogBuildOptions): void => {
    const posts = readBlogPosts(contentDirectory);
    const visiblePosts = publicPosts(posts);
    if (posts.length === 0) {
        console.warn(`Building the blog without posts: no blog content in ${contentDirectory}.`);
    }
    fs.rmSync(outputDirectory, { force: true, recursive: true });
    fs.mkdirSync(outputDirectory, { recursive: true });

    copyDirectory(path.join(sourceDirectory, "assets"), path.join(outputDirectory, "assets"));
    copyDirectory(path.join(contentDirectory, "assets"), path.join(outputDirectory, "assets"));
    fs.copyFileSync(
        path.resolve(sourceDirectory, "../shared/styles/site-chrome.css"),
        path.join(outputDirectory, "assets", "site-chrome.css"),
    );
    fs.copyFileSync(path.join(sourceDirectory, "blog.css"), path.join(outputDirectory, "assets", "blog.css"));

    const pageCount = Math.max(1, Math.ceil(visiblePosts.length / postsPerPage));
    for (let page = 1; page <= pageCount; page += 1) {
        const route = page === 1 ? "" : `page/${page}`;
        const canonicalPath = page === 1 ? blogBasePath : `${blogBasePath}/${route}`;
        writeRoutedPage(
            outputDirectory,
            route,
            renderShell("Blog", "Notes, tutorials, reviews, and development updates from Steam Engine.",
                canonicalPath, renderListing(visiblePosts, page, pageCount, "Steam Engine blog", canonicalPath,
                    page === 1 && canonicalPath === blogBasePath)),
        );
    }

    for (const post of posts) {
        const route = postPath(post).slice(`${blogBasePath}/`.length);
        writeRoutedPage(outputDirectory, route,
            renderShell(post.title, post.excerpt, postPath(post), renderPost(post)));
    }

    const aboutBody = readAboutBody(contentDirectory);
    const aboutContent = `<article class="blog-article">
    <header class="blog-article__header"><p class="blog-eyebrow">Steam Engine</p><h1>About this blog</h1></header>
    <div class="blog-article__body">${normalizeBlogLinks(aboutBody)}</div>
</article>`;
    writeRoutedPage(outputDirectory, "about",
        renderShell("About this blog", "About the Steam Engine blog.", `${blogBasePath}/about`, aboutContent));
    writeRoutedPage(outputDirectory, "sample-page-2",
        renderShell("About this blog", "About the Steam Engine blog.", `${blogBasePath}/sample-page-2`, aboutContent));

    fs.writeFileSync(path.join(outputDirectory, "feed.xml"), renderFeed(visiblePosts), "utf8");
};
