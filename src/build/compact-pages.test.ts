import { describe, expect, it } from "vitest";
import { cssAssetsForManifestEntry } from "./compact-pages";

describe("compact page stylesheet dependencies", () => {
    it("includes imported chunk CSS before the entry CSS", () => {
        const manifest = {
            "src/pages/home/entry.tsx": {
                file: "assets/home.js",
                css: ["assets/home.css"],
                imports: ["assets/site-layout.js"],
            },
            "assets/site-layout.js": {
                file: "assets/site-layout.js",
                css: ["assets/site-layout.css"],
            },
        } as const;

        expect(cssAssetsForManifestEntry(manifest, "home/entry.tsx")).toEqual([
            "assets/site-layout.css",
            "assets/home.css",
        ]);
    });

    it("deduplicates CSS shared by multiple imported chunks", () => {
        const manifest = {
            "src/pages/home/entry.tsx": {
                file: "assets/home.js",
                imports: ["assets/site-layout.js", "assets/icons.js"],
            },
            "assets/site-layout.js": {
                file: "assets/site-layout.js",
                css: ["assets/shared.css"],
            },
            "assets/icons.js": {
                file: "assets/icons.js",
                css: ["assets/shared.css", "assets/icons.css"],
            },
        } as const;

        expect(cssAssetsForManifestEntry(manifest, "src/pages/home/entry.tsx")).toEqual([
            "assets/shared.css",
            "assets/icons.css",
        ]);
    });
});
