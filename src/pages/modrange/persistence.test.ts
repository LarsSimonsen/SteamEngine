import { describe, expect, it } from "vitest";
import { builtInPresets } from "../../catalogs/mods/presets";
import {
    loadModRangeSettings,
    modRangeStorageKey,
    saveModRangeSettings,
    type ModRangeStorage,
} from "./persistence";

const defaults = {
    maxPower: "15",
    maxVoltage: "6",
    maxCurrent: "3.5",
    minResistance: "1.2",
    maxResistance: "",
};

const memoryStorage = (): ModRangeStorage & { readonly values: Record<string, string> } => {
    const values: Record<string, string> = {};
    return {
        values,
        getItem: (key) => values[key] ?? null,
        setItem: (key, value) => { values[key] = value; },
        removeItem: (key) => { delete values[key]; },
    };
};

describe("Mod Range settings persistence", () => {
    it("round-trips drafts and the selected mod", () => {
        const storage = memoryStorage();
        const settings = { drafts: { ...defaults, maxPower: "75" }, selectedPresetId: "preset-34" };
        saveModRangeSettings(storage, settings);
        expect(loadModRangeSettings(storage, builtInPresets, defaults)).toEqual(settings);
        expect(storage.values[modRangeStorageKey]).toContain('"version":1');
    });

    it("falls back when saved settings refer to an unavailable mod", () => {
        const storage = memoryStorage();
        storage.setItem(modRangeStorageKey, JSON.stringify({
            version: 1,
            drafts: defaults,
            selectedPresetId: "missing",
        }));
        expect(loadModRangeSettings(storage, builtInPresets, defaults)).toEqual({
            drafts: defaults,
            selectedPresetId: "",
        });
    });
});
