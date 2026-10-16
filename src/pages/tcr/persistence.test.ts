import { describe, expect, it } from "vitest";
import type { CustomMaterial } from "../../catalogs/materials/catalog";
import { addSelectedMaterial, defaultTcrSettings } from "./domain";
import { createTcrPersistence, tcrStorageKey } from "./persistence";

const fakeStorage = (values: Record<string, string> = {}) => ({
    getItem: (key: string) => values[key] ?? null,
    setItem: (key: string, value: string) => { values[key] = value; },
    removeItem: (key: string) => { delete values[key]; },
});

describe("TCR persistence", () => {
    it("round-trips versioned settings", () => {
        const storage = fakeStorage();
        const persistence = createTcrPersistence(storage);
        const settings = addSelectedMaterial(defaultTcrSettings(), "ss316l");
        persistence.save(settings);
        expect(storage.getItem(tcrStorageKey)).toContain('"version":1');
        expect(persistence.load()).toEqual(settings);
    });

    it("rejects malformed saved state", () => {
        const storage = fakeStorage({
            [tcrStorageKey]: JSON.stringify({
                version: 1,
                settings: {
                    scale: "kelvin",
                    temperaturesCelsius: [20],
                    selectedMaterials: [],
                },
            }),
        });
        expect(createTcrPersistence(storage).load()).toEqual(defaultTcrSettings());
    });

    it("restores a selected custom material from the shared catalog", () => {
        const custom: CustomMaterial = {
            id: "29fb9436-5502-4800-9d38-54a9fa63183d",
            name: "Saved custom alloy",
            resistivity: 0.9,
            heatCapacity: null,
            density: null,
            tcr: 0.003,
        };
        const storage = fakeStorage();
        const persistence = createTcrPersistence(storage, () => [custom]);
        const settings = addSelectedMaterial(defaultTcrSettings(), custom.id, [custom]);

        persistence.save(settings);

        expect(persistence.load()).toEqual(settings);
    });

    it("migrates the retired linear Ni200 preset to canonical Ni200", () => {
        const storage = fakeStorage({
            [tcrStorageKey]: JSON.stringify({
                version: 1,
                settings: {
                    ...defaultTcrSettings(),
                    selectedMaterials: [{ id: 1, materialId: "ni200lin", resistance: 1 }],
                },
            }),
        });

        expect(createTcrPersistence(storage).load().selectedMaterials).toEqual([
            { id: 1, materialId: "ni200", resistance: 1 },
        ]);
    });

    it("clears saved settings", () => {
        const storage = fakeStorage({ [tcrStorageKey]: "saved" });
        createTcrPersistence(storage).clear();
        expect(storage.getItem(tcrStorageKey)).toBeNull();
    });
});
