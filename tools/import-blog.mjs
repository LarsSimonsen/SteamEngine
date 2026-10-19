import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const positionalArguments = process.argv.slice(2).filter((argument) => !argument.startsWith("--"));
const captureRoot = positionalArguments[0] ?? "F:\\backup\\blog.steam-engine.org\\blog.steam-engine.org\\blog.steam-engine.org";
// Blog content is kept outside the public repository; see resolveBlogContentDirectory in src/blog/generator.ts.
const destinationRoot = process.env.STEAM_ENGINE_BLOG_CONTENT
    ? path.resolve(process.env.STEAM_ENGINE_BLOG_CONTENT)
    : path.join(projectRoot, ".blog-content");
const force = process.argv.includes("--force");
const postsDestination = path.join(destinationRoot, "posts");
const uploadsDestination = path.join(destinationRoot, "assets", "uploads");
const uploadsSource = path.join(captureRoot, "wp-content", "uploads");

if (fs.existsSync(postsDestination) && fs.readdirSync(postsDestination).length > 0 && !force) {
    throw new Error(`Refusing to overwrite imported posts; pass --force to re-import the backup.`);
}

if (force) {
    fs.rmSync(postsDestination, { force: true, recursive: true });
    fs.rmSync(uploadsDestination, { force: true, recursive: true });
    fs.rmSync(path.join(destinationRoot, "about.html"), { force: true });
}

const decodeEntities = (value) => value.replace(/&(#x?[0-9a-f]+|[a-z][a-z0-9]+);/gi, (match, entity) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
        return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    const entities = {
        amp: "&",
        apos: "'",
        hellip: "…",
        laquo: "«",
        ldquo: "“",
        lt: "<",
        mdash: "—",
        nbsp: " ",
        ndash: "–",
        quot: '"',
        raquo: "»",
        rdquo: "”",
        rsquo: "’",
        gt: ">",
    };
    return entities[entity.toLowerCase()] ?? match;
});

const stripTags = (value) => decodeEntities(value.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const extract = (raw, expression) => raw.match(expression)?.[1]?.trim() ?? "";

const extractBody = (raw) => {
    const body = raw.match(/<div[^>]*class=["'][^"']*entry-content[^"']*["'][^>]*>([\s\S]*?)<\/div><!-- \.entry-content -->/i)?.[1];
    if (!body) throw new Error("Could not find .entry-content");
    return body
        .replace(/<script\b[\s\S]*?<\/script>/gi, "")
        .replace(/<iframe\b[^>]*class=["'][^"']*wp-embedded-content[^"']*["'][^>]*>[\s\S]*?<\/iframe>/gi, "")
        .trim();
};

const readArticleFiles = () => fs.readdirSync(captureRoot, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name === "index.html")
    .map((entry) => path.join(entry.parentPath, entry.name))
    .filter((file) => {
        const relative = path.relative(captureRoot, file).split(path.sep);
        return relative.length === 5 && /^\d{4}$/.test(relative[0]) && /^\d{2}$/.test(relative[1]) &&
            /^\d{2}$/.test(relative[2]) && relative[3] !== "feed" && relative[3] !== "embed";
    })
    .sort();

const articles = readArticleFiles().map((file) => {
    const relative = path.relative(captureRoot, file).split(path.sep);
    const [year, month, day, slug] = relative;
    const raw = fs.readFileSync(file, "utf8");
    const title = decodeEntities(extract(raw, /<h1[^>]*class=["'][^"']*entry-title[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i));
    const published = extract(raw, /<time[^>]*class=["'][^"']*entry-date[^"']*published[^"']*["'][^>]*datetime=["']([^"']+)/i)
        || `${year}-${month}-${day}`;
    const updated = extract(raw, /<time[^>]*class=["'][^"']*updated[^"']*["'][^>]*datetime=["']([^"']+)/i);
    const description = decodeEntities(extract(raw, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)/i));
    const image = extract(raw, /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)/i);
    return {
        file,
        raw,
        slug,
        title,
        published,
        updated,
        excerpt: description,
        featuredImage: image,
        body: extractBody(raw),
        datePath: `${year}/${month}/${day}`,
    };
});

const postBySlug = new Map(articles.map((article) => [article.slug, article]));

const withoutTrailingSlash = (value) => value.length > 1 ? value.replace(/\/+$/, "") : value;
const siteRelativePath = (value) => withoutTrailingSlash(value.replace(/^\/+/, "")) || ".";
const blogArticlePath = (article) => siteRelativePath(`/blog/${article.datePath}/${article.slug}`);

const normalizeExternalLink = (value) => {
    const marker = "external.html?link=";
    const markerIndex = value.indexOf(marker);
    if (markerIndex < 0) return value;
    const linked = value.slice(markerIndex + marker.length).replaceAll("&amp;", "&");
    try {
        return decodeURIComponent(linked);
    } catch {
        return linked;
    }
};

const normalizeUrl = (value) => {
    let normalized = normalizeExternalLink(value);
    if (/^(?:https?:\/\/blog\.steam-engine\.org)?(?:\.\.\/)*\/?wp-content\/uploads\//i
        .test(normalized)) {
        normalized = normalized.replace(/^(?:https?:\/\/blog\.steam-engine\.org)?(?:\.\.\/)*\/?wp-content\/uploads\//i,
            "blog/assets/uploads/");
    }

    const hashIndex = normalized.indexOf("#");
    const fragment = hashIndex < 0 ? "" : normalized.slice(hashIndex);
    const route = hashIndex < 0 ? normalized : normalized.slice(0, hashIndex);
    const datedArticle = route.match(
        /^(?:\.\.\/)+(\d{4}\/\d{2}\/\d{2})\/([^/]+)(?:\/index\.html)?\/?$/,
    );
    if (datedArticle) {
        const articlePath = `/blog/${datedArticle[1]}/${datedArticle[2]}`;
        return `${siteRelativePath(articlePath)}${fragment}`;
    }

    const monthArticle = route.match(
        /^(?:\.\.\/)+(\d{4}\/\d{2})\/([^/]+)(?:\/index\.html)?\/?$/,
    );
    if (monthArticle && postBySlug.has(monthArticle[2])) {
        const article = postBySlug.get(monthArticle[2]);
        return `${blogArticlePath(article)}${fragment}`;
    }

    const slugArticle = route.match(
        /^(?:\.\.\/)+([^/]+)(?:\/index\.html)?\/?$/,
    );
    if (slugArticle && postBySlug.has(slugArticle[1])) {
        const article = postBySlug.get(slugArticle[1]);
        return `${blogArticlePath(article)}${fragment}`;
    }

    const mirroredExternal = route.match(/^(?:\.\.\/)+((?:www\.)?[^/]+\.[a-z]{2,})(\/.*)$/i);
    if (mirroredExternal) return `https://${mirroredExternal[1]}${mirroredExternal[2]}${fragment}`;

    const steamEngine = route.match(/^https?:\/\/(?:www\.)?steam-engine\.org(\/.*)?$/i);
    if (steamEngine) {
        const internalPath = steamEngine[1] ?? "/";
        const cleanPath = internalPath.replace(/\.(?:html?|asp)$/i, "");
        return `${siteRelativePath(cleanPath)}${fragment}`;
    }

    const oldBlog = route.match(
        /^https?:\/\/blog\.steam-engine\.org(\/.*)?$/i,
    );
    if (oldBlog) {
        const internalPath = oldBlog[1] ?? "/";
        const blogPath = internalPath === "/" ? "/blog" : `/blog${internalPath}`;
        return `${siteRelativePath(blogPath)}${fragment}`;
    }

    if (route.startsWith("/") && !route.startsWith("//")) {
        return `${siteRelativePath(route)}${fragment}`;
    }

    return normalized;
};

const normalizeBody = (body) => {
    let normalized = body.replace(/\b(?:href|src|poster|cite|action|data-src)=(['"])(.*?)\1/gi,
        (match, quote, value) => `${match.slice(0, match.indexOf("=") + 2)}${normalizeUrl(value)}${quote}`);

    normalized = normalized.replace(
        /<a\b[^>]*\bhref=(['"])blog\/(?:category|tag)\/[^"']*\1[^>]*>[\s\S]*?<\/a>/gi,
        "",
    );

    normalized = normalized.replace(/\b(?:href|src|poster|cite|action|data-src)=(['"])(.*?)\1/gi,
        (match, quote, value) => {
            let link = value;
            for (const article of articles) {
                const articlePattern = new RegExp(`^(?:\.\./)+${escapeRegExp(article.slug)}(?:/index\\.html)?\\/?(?:#.*)?$`);
                if (articlePattern.test(link)) {
                    link = blogArticlePath(article);
                    break;
                }
            }
            return `${match.slice(0, match.indexOf("=") + 2)}${link}${quote}`;
        });

    normalized = normalized.replace(/\b(srcset)=(['"])(.*?)\2/gi, (match, name, quote, value) => {
        const rewritten = value.split(",").map((candidate) => {
            const [url, ...descriptor] = candidate.trim().split(/\s+/);
            const normalizedUrl = normalizeUrl(url);
            if (normalizedUrl.startsWith("blog/assets/uploads/")) {
                const relativeAssetPath = normalizedUrl.slice("blog/assets/uploads/".length);
                let decodedAssetPath = relativeAssetPath;
                try {
                    decodedAssetPath = decodeURIComponent(relativeAssetPath);
                } catch {
                    // Keep the encoded path when it is not valid URI syntax.
                }
                if (!fs.existsSync(path.join(uploadsSource, ...decodedAssetPath.split("/")))) return "";
            }
            return [normalizedUrl, ...descriptor].join(" ");
        }).filter(Boolean).join(", ");
        return `${name}=${quote}${rewritten}${quote}`;
    });
    return normalized;
};

fs.mkdirSync(destinationRoot, { recursive: true });
fs.mkdirSync(postsDestination, { recursive: true });
fs.mkdirSync(path.join(destinationRoot, "assets"), { recursive: true });

for (const article of articles) {
    const directory = path.join(postsDestination, `${article.published.slice(0, 10)}-${article.slug}`);
    fs.mkdirSync(directory, { recursive: true });
    const metadata = {
        slug: article.slug,
        title: article.title,
        published: article.published,
        ...(article.updated ? { updated: article.updated } : {}),
        excerpt: article.excerpt || stripTags(article.body).slice(0, 240),
        ...(article.featuredImage ? { featuredImage: normalizeUrl(article.featuredImage) } : {}),
    };
    fs.writeFileSync(path.join(directory, "post.json"), `${JSON.stringify(metadata, null, 4)}\n`, "utf8");
    fs.writeFileSync(path.join(directory, "body.html"), `${normalizeBody(article.body)}\n`, "utf8");
}

const aboutSource = path.join(captureRoot, "sample-page-2", "index.html");
if (fs.existsSync(aboutSource)) {
    const aboutRaw = fs.readFileSync(aboutSource, "utf8");
    const aboutBody = extractBody(aboutRaw);
    fs.writeFileSync(path.join(destinationRoot, "about.html"), `${normalizeBody(aboutBody)}\n`, "utf8");
}

fs.cpSync(uploadsSource, uploadsDestination, { recursive: true });
fs.copyFileSync(path.join(projectRoot, "src", "blog", "blog.css"), path.join(destinationRoot, "blog.css"));

console.log(`Imported ${articles.length} blog posts and local assets from ${captureRoot}`);
