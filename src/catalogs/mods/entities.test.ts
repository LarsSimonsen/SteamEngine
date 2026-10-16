import { describe, expect, it } from "vitest";
import { modCatalogEntities, modCatalogEntityForSlug } from "./entities";

describe("mod catalog entities", () => {
    it("merges operating profiles that share one catalog identity", () => {
        const dna40 = modCatalogEntityForSlug("dna40")!;

        expect(dna40.profiles.map((profile) => profile.id)).toEqual(["preset-31", "preset-32"]);
        expect(dna40.mod).toMatchObject({
            displayName: "Evolv DNA-40",
            minimumAtomizerResistanceOhms: 0.1,
            maximumAtomizerResistanceOhms: 2,
        });
        expect(dna40.mod.aliases).toEqual([
            "Evolv DNA-40 (std. wire)",
            "Evolv DNA-40 (Ni 200)",
        ]);
    });

    it("has exactly one catalog entity per slug", () => {
        expect(new Set(modCatalogEntities.map(({ slug }) => slug)).size).toBe(modCatalogEntities.length);
    });
});
