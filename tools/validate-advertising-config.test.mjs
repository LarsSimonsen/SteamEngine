import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { validateAdvertisingConfig } from "./validate-advertising-config.mjs";

describe("advertising configuration validation", () => {
    it("rejects an unreviewed provider script host", () => {
        const config = JSON.parse(fs.readFileSync(path.resolve("advertising/config.json"), "utf8"));
        config.providers.adsense.scriptUrl = "https://unreviewed.example/ads.js";

        expect(() => validateAdvertisingConfig(config)).toThrow("unreviewed script host");
    });

    it("rejects AdSense without its provider-specific TCF vendor ID", () => {
        const config = JSON.parse(fs.readFileSync(path.resolve("advertising/config.json"), "utf8"));
        delete config.providers.adsense.tcfVendorId;

        expect(() => validateAdvertisingConfig(config)).toThrow("TCF vendor ID");
    });

    it("rejects a network that cannot use AdSense-managed TCF consent", () => {
        const config = JSON.parse(fs.readFileSync(path.resolve("advertising/config.json"), "utf8"));
        config.providers.other = {
            adapter: "adsterra-frame",
            format: "banner",
            height: 250,
            scriptUrl: "https://www.highperformanceformat.com/reviewed/invoke.js",
            width: 300,
        };
        config.placements["calculator-footer"].waterfall.unshift({ provider: "other", timeoutMs: 100 });

        expect(() => validateAdvertisingConfig(config)).toThrow("AdSense-managed TCF consent");
    });

    it("requires house-ad copy for every published locale", () => {
        const config = JSON.parse(fs.readFileSync(path.resolve("advertising/config.json"), "utf8"));
        delete config.providers.house.translations.de;

        expect(() => validateAdvertisingConfig(config)).toThrow("published locale list");
    });
});
