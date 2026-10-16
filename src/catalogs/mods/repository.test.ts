import { describe, expect, it } from "vitest";
import { builtInPresets } from "./presets";
import type { ModStorage } from "./persistence";
import { createModRepository } from "./repository";

const memoryStorage = (): ModStorage => {
    const values: Record<string, string> = {};
    return {
        getItem: (key) => values[key] ?? null,
        setItem: (key, value) => { values[key] = value; },
        removeItem: (key) => { delete values[key]; },
    };
};

const customMod = {
    id: "136dfacd-d2f1-48b2-aaf1-c501fe921951",
    manufacturer: "Test",
    model: "Mod",
    displayName: "Test Mod",
    maximumOutputVoltageVolts: 8,
    maximumOutputPowerWatts: 100,
    maximumOutputCurrentAmps: 30,
};

describe("mod repository", () => {
    it("persists visibility and custom mods", () => {
        const storage = memoryStorage();
        const repository = createModRepository({ storage, storageEvents: undefined });
        expect(repository.setDefaultVisible("preset-1", true).kind).toBe("success");
        expect(repository.saveCustomMod(customMod)).toMatchObject({ kind: "success" });

        const reloaded = createModRepository({ storage, storageEvents: undefined });
        expect(reloaded.getSnapshot().visibleDefaultMods.some(({ id }) => id === "preset-1"))
            .toBe(true);
        expect(reloaded.getSnapshot().customMods).toEqual([customMod]);

        expect(reloaded.saveCustomMod({ ...customMod, model: "Mod 2" })).toMatchObject({ kind: "success" });
        expect(reloaded.getSnapshot().customMods[0]?.displayName).toBe("Test Mod 2");
        expect(reloaded.deleteCustomMod(customMod.id)).toEqual({ kind: "success" });
        expect(reloaded.getSnapshot().customMods).toEqual([]);
    });

    it("blocks deletion while registered settings refer to the mod", () => {
        const repository = createModRepository({ storage: memoryStorage(), storageEvents: undefined });
        repository.saveCustomMod(customMod);
        repository.registerReferences("modrange", {
            label: "Current Mod Range settings",
            modIds: () => [customMod.id],
        });
        expect(repository.deleteCustomMod(customMod.id)).toEqual({
            kind: "blocked",
            references: ["Current Mod Range settings"],
        });
    });

    it("uses the complete built-in preset catalog", () => {
        const repository = createModRepository({ storage: memoryStorage(), storageEvents: undefined });
        expect(repository.getSnapshot().defaultMods).toHaveLength(builtInPresets.length);
    });
});
