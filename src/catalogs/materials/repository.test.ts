import { describe, expect, it } from "vitest";
import { materials } from "./catalog";
import { type MaterialStorage } from "./persistence";
import { createMaterialRepository } from "./repository";

const memoryStorage = (): MaterialStorage => {
    const values: Record<string, string> = {};
    return {
        getItem: (key) => values[key] ?? null,
        setItem: (key, value) => { values[key] = value; },
        removeItem: (key) => { delete values[key]; },
    };
};

const customMaterial = {
    id: "653f5bf9-b283-4484-b7a2-77f694015346",
    name: "Custom wire",
    resistivity: 0.9,
    heatCapacity: null,
    density: null,
};

const futureMaterial = {
    ...materials[0],
    id: "future-material",
    name: "Future material",
    initiallyVisible: true,
};

describe("material repository", () => {
    it("persists visibility and custom materials", () => {
        const storage = memoryStorage();
        const repository = createMaterialRepository({ storage, storageEvents: undefined, defaultMaterials: materials });
        expect(repository.setDefaultVisible("n90", true).kind).toBe("success");
        expect(repository.saveCustomMaterial(customMaterial)).toMatchObject({ kind: "success" });

        const reloaded = createMaterialRepository({ storage, storageEvents: undefined, defaultMaterials: materials });
        expect(reloaded.getSnapshot().visibleDefaultMaterials.some(({ id }) => id === "n90")).toBe(true);
        expect(reloaded.getSnapshot().customMaterials).toEqual([customMaterial]);
    });

    it("hides later catalog additions after visibility has been customized", () => {
        const storage = memoryStorage();
        const repository = createMaterialRepository({ storage, storageEvents: undefined, defaultMaterials: materials });
        expect(repository.setDefaultVisible("ss430", false).kind).toBe("success");

        const reloaded = createMaterialRepository({
            storage,
            storageEvents: undefined,
            defaultMaterials: [...materials, futureMaterial],
        });
        expect(reloaded.getSnapshot().visibleDefaultMaterials.some(({ id }) => id === "ss430")).toBe(false);
        expect(reloaded.getSnapshot().hiddenDefaultMaterialIds.has(futureMaterial.id)).toBe(true);
    });

    it("applies a later catalog's initial visibility when visibility has never been customized", () => {
        const storage = memoryStorage();
        const repository = createMaterialRepository({ storage, storageEvents: undefined, defaultMaterials: materials });
        expect(repository.saveCustomMaterial(customMaterial).kind).toBe("success");

        const reloaded = createMaterialRepository({
            storage,
            storageEvents: undefined,
            defaultMaterials: [...materials, futureMaterial],
        });
        expect(reloaded.getSnapshot().visibleDefaultMaterials).toHaveLength(11);
        expect(reloaded.getSnapshot().visibleDefaultMaterials.some(({ id }) => id === futureMaterial.id)).toBe(true);
    });

    it("blocks deletion while a registered source refers to the material", () => {
        const repository = createMaterialRepository({
            storage: memoryStorage(),
            storageEvents: undefined,
            defaultMaterials: materials,
        });
        repository.saveCustomMaterial(customMaterial);
        repository.registerReferences("wirewiz", { label: "Current Wire Wizard design", materialIds: () => [
            customMaterial.id,
        ] });
        expect(repository.deleteCustomMaterial(customMaterial.id)).toEqual({
            kind: "blocked",
            references: ["Current Wire Wizard design"],
        });
    });

    it("requires an explicit reset for malformed versioned data", () => {
        const storage = memoryStorage();
        storage.setItem("steamengine.materials.v1", "{broken");
        const repository = createMaterialRepository({ storage, storageEvents: undefined, defaultMaterials: materials });
        expect(repository.getSnapshot().error).toContain("not valid JSON");
        expect(repository.saveCustomMaterial(customMaterial).kind).toBe("invalid");
        expect(repository.reset().kind).toBe("success");
        expect(repository.getSnapshot().error).toBeUndefined();
    });
});
