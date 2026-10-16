import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import config from "../../../advertising/config.json";
import {
    googleAdsenseHeadMarkup,
    googleAdsensePublisherId,
    googleAdsenseScriptUrl,
} from "./google-adsense";

describe("Google AdSense page-head configuration", () => {
    it("uses the configured publisher ID in the standard asynchronous AdSense tag", () => {
        const markup = googleAdsenseHeadMarkup();

        expect(config.providers.adsense.client).toBe(googleAdsensePublisherId);
        expect(markup).toContain(`src="${googleAdsenseScriptUrl}"`);
        expect(markup).toContain("async");
        expect(markup).toContain('crossorigin="anonymous"');
    });

    it("does not initialize legacy page-level or Auto ads in page markup", () => {
        const markup = googleAdsenseHeadMarkup();

        expect(markup).not.toContain("enable_page_level_ads");
        expect(markup).not.toContain("adsbygoogle.push");
    });

    it("tags every ad-bearing legacy page in its head", () => {
        const legacyRoot = path.resolve("legacy-ad-site");
        const pages = fs.readdirSync(legacyRoot).filter((name) => name.endsWith(".html"));
        const advertisingPages = pages.filter((name) => fs.readFileSync(path.join(legacyRoot, name), "utf8")
            .includes("data-ad-placement"));

        expect(advertisingPages.length).toBeGreaterThan(0);
        for (const name of advertisingPages) {
            const source = fs.readFileSync(path.join(legacyRoot, name), "utf8");
            const head = source.slice(source.indexOf("<head>"), source.indexOf("</head>"));
            expect(head, name).toContain(googleAdsenseScriptUrl);
        }
    });
});
