import { describe, expect, it } from "vitest";
import { normalizeExternalHtmlLinks } from "./normalize-external-links";

describe("normalizeExternalHtmlLinks", () => {
    it("adds nofollow to external anchors and preserves existing rel values", () => {
        const html = [
            '<a href="https://example.com">external</a>',
            '<a href="https://example.org" rel="noreferrer noopener">another</a>',
            '<a href="https://www.steam-engine.org/about">internal</a>',
            '<a href="/catalog">relative</a>',
        ].join(" ");

        const normalized = normalizeExternalHtmlLinks(html);

        expect(normalized).toContain('<a href="https://example.com" rel="nofollow">external</a>');
        expect(normalized).toContain(
            '<a href="https://example.org" rel="noreferrer noopener nofollow">another</a>',
        );
        expect(normalized).toContain('<a href="https://www.steam-engine.org/about">internal</a>');
        expect(normalized).toContain('<a href="/catalog">relative</a>');
    });
});
