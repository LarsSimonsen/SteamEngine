import { describe, expect, it } from "vitest";
import { encyclopediaDetailMetadataFor, localizedRoute } from "./locales";

describe("localized encyclopedia metadata", () => {
    it("uses the localized presentation for stable detail routes", () => {
        const english = encyclopediaDetailMetadataFor("en", "/catalog/material/titanium-1");
        const bokmaal = encyclopediaDetailMetadataFor("nb", "/catalog/material/titanium-1");

        expect(english).toMatchObject({ route: "/catalog/material/titanium-1", title: "Titanium 1" });
        expect(bokmaal).toMatchObject({ route: "/catalog/material/titanium-1", title: "Titan 1" });
        expect(localizedRoute("nb", english!.route)).toBe("/nb/catalog/material/titanium-1");
    });

    it("rejects unknown detail routes without inventing metadata", () => {
        expect(encyclopediaDetailMetadataFor("nb", "/catalog/material/not-a-real-material")).toBeUndefined();
        expect(encyclopediaDetailMetadataFor("nb", "/catalog/material")).toBeUndefined();
    });
});
