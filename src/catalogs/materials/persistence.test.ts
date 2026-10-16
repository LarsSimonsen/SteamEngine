import { describe, expect, it } from "vitest";
import { excludedDefaultMaterialIds, materials } from "./catalog";
import {
    initialMaterialState,
    materialStorageKey,
    parseMaterialEnvelope,
    saveMaterialState,
    type MaterialStorage,
} from "./persistence";

const memoryStorage = (): MaterialStorage & { readonly values: Record<string, string> } => {
    const values: Record<string, string> = {};
    return {
        values,
        getItem: (key) => values[key] ?? null,
        setItem: (key, value) => { values[key] = value; },
        removeItem: (key) => { delete values[key]; },
    };
};

describe("custom material persistence", () => {
    it("starts with the ten highest-scored default materials visible", () => {
        const state = initialMaterialState(materials);
        const visible = materials.filter((material) => !state.hiddenDefaultMaterialIds.includes(material.id));
        expect(visible.map((material) => material.id)).toEqual([
            "ka1", "n80", "ss316", "ss316l", "ss317l", "ss430", "ni200", "nife30stealth", "zr", "n90",
        ]);
        expect(state.defaultVisibilityCustomized).toBe(false);
    });

    it("round-trips normalized versioned data", () => {
        const storage = memoryStorage();
        const state = {
            customMaterials: [{
                id: "23b62a99-6c54-44ca-bf05-a80b9a665586",
                name: "Custom",
                resistivity: 0.8,
                heatCapacity: null,
                density: null,
                tfr: [[0, 1], [40, 2]],
            }],
            hiddenDefaultMaterialIds: ["ka"],
            defaultVisibilityCustomized: true,
            knownDefaultMaterialIds: materials.map((material) => material.id),
        } as const;
        expect(saveMaterialState(storage, state)).toBeUndefined();
        expect(parseMaterialEnvelope(storage.values[materialStorageKey], materials)).toMatchObject({
            kind: "valid",
            state: {
                customMaterials: [{ tfr: [[0, 2 / 3], [20, 1], [40, 4 / 3]] }],
                defaultVisibilityCustomized: true,
            },
        });
    });

    it("rejects malformed envelopes without interpreting legacy keys", () => {
        expect(parseMaterialEnvelope('{"version":2}', materials)).toMatchObject({ kind: "invalid" });
        expect(parseMaterialEnvelope('{broken', materials)).toEqual({
            kind: "invalid",
            message: "Saved material data is not valid JSON.",
        });
    });

    it("migrates retired Ni200 visibility and clone provenance without hiding Ni200", () => {
        const result = parseMaterialEnvelope(JSON.stringify({
            version: 1,
            customMaterials: [{
                id: "23b62a99-6c54-44ca-bf05-a80b9a665586",
                name: "Linear Nickel 200",
                resistivity: 0.096,
                heatCapacity: 0.456,
                density: 8.89,
                tcr: 0.006,
                clonedFrom: "ni200lin",
            }],
            hiddenDefaultMaterialIds: ["ka", "ni200lin"],
        }), materials);

        expect(result).toMatchObject({
            kind: "valid",
            state: {
                customMaterials: [{ clonedFrom: "ni200" }],
                hiddenDefaultMaterialIds: ["ka"],
                defaultVisibilityCustomized: true,
            },
        });
    });

    it("migrates untouched version-one visibility to the current scored top ten", () => {
        const oldInitiallyVisible = new Set(["ka1", "n80", "ss316l", "ni200"]);
        const oldCatalogIds = [...materials
            .map((material) => material.id)
            .filter((id) => id !== "n90" && id !== "ss904l"), ...excludedDefaultMaterialIds];
        const result = parseMaterialEnvelope(JSON.stringify({
            version: 1,
            customMaterials: [],
            hiddenDefaultMaterialIds: oldCatalogIds.filter((id) => !oldInitiallyVisible.has(id)),
        }), materials);

        expect(result).toMatchObject({
            kind: "valid",
            state: { defaultVisibilityCustomized: false },
        });
        if (result.kind !== "valid") throw new Error("Expected valid migrated state");
        const visible = materials.filter(
            (material) => !result.state.hiddenDefaultMaterialIds.includes(material.id),
        );
        expect(visible).toHaveLength(10);
    });
});
