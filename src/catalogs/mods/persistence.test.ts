import { describe, expect, it } from "vitest";
import { builtInPresets } from "./presets";
import {
    initialModState,
    modStorageKey,
    parseModEnvelope,
    saveModState,
    type ModStorage,
} from "./persistence";

const memoryStorage = (): ModStorage & { readonly values: Record<string, string> } => {
    const values: Record<string, string> = {};
    return {
        values,
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
    weightGrams: 82.5,
};

describe("custom mod persistence", () => {
    it("starts with the score-and-profile filter visible", () => {
        const state = initialModState(builtInPresets);
        const visible = builtInPresets.filter((mod) => !state.hiddenDefaultModIds.includes(mod.id));
        expect(visible.map((mod) => mod.displayName)).toEqual([
            "Evolv DNA60 (non-color)",
            "Geekvape Aegis Legend 5",
            "Evolv DNA60C",
            "Evolv DNA100C",
            "Evolv DNA250C (2S)",
            "VOOPOO DRAG 6",
            "YiHi SXmini MQ Class",
            "Evolv DNA80C",
            "Dovpo x TVC Topside Dual",
            "VOOPOO DRAG 5",
            "VAPORESSO ARMOUR MAX",
        ]);
    });

    it("round-trips versioned custom mods and visibility", () => {
        const storage = memoryStorage();
        const state = { customMods: [customMod], hiddenDefaultModIds: ["preset-1"] } as const;
        expect(saveModState(storage, state)).toBeUndefined();
        expect(parseModEnvelope(storage.values[modStorageKey], builtInPresets)).toEqual({
            kind: "valid",
            state,
        });
    });

    it("rejects malformed envelopes", () => {
        expect(parseModEnvelope('{"version":2}', builtInPresets)).toMatchObject({ kind: "invalid" });
        expect(parseModEnvelope("{broken", builtInPresets)).toEqual({
            kind: "invalid",
            message: "Saved mod data is not valid JSON.",
        });
    });
});
