const siteHosts = new Set(["steam-engine.org", "www.steam-engine.org"]);
const anchorTagPattern = /<a\b[^>]*>/gi;
const hrefPattern = /\bhref\s*=\s*(["'])(.*?)\1/i;
const relPattern = /\brel\s*=\s*(["'])(.*?)\1/i;

const isExternalHttpHref = (href: string): boolean => {
    if (!/^(?:https?:)?\/\//i.test(href)) return false;
    try {
        const url = new URL(href, "https://www.steam-engine.org");
        return !siteHosts.has(url.hostname.toLowerCase());
    } catch {
        return false;
    }
};

const addNofollow = (tag: string): string => {
    const rel = tag.match(relPattern);
    if (!rel) return tag.replace(/>$/, ' rel="nofollow">');

    const relTokens = rel[2].trim().split(/\s+/).filter(Boolean);
    if (relTokens.some((token) => token.toLowerCase() === "nofollow")) return tag;
    const nextRel = [...relTokens, "nofollow"].join(" ");
    return tag.replace(rel[0], rel[0].replace(rel[2], nextRel));
};

export const normalizeExternalHtmlLinks = (html: string): string => html.replace(anchorTagPattern, (tag) => {
    const href = tag.match(hrefPattern)?.[2];
    return href && isExternalHttpHref(href) ? addNofollow(tag) : tag;
});
