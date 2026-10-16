import { describe, expect, it } from "vitest";
import { batteryPresets } from "../catalogs/batteries/defaults";
import { batteryPresentationsFor, batteryTextKeys } from "./battery-presentation-text";
import { batteryTextTranslations } from "./catalog-presentations";
import { batteryTexts as englishBatteryTexts } from "./catalog-presentations/en";

describe("battery presentation text", () => {
    it("stores each canonical English battery message once", () => {
        const keys = batteryTextKeys();
        expect(keys).toHaveLength(26);
        expect(new Set(keys).size).toBe(keys.length);
        expect(new Set(Object.values(englishBatteryTexts)).size).toBe(keys.length);
    });

    it("materializes every battery from shared semantic messages", () => {
        const texts = {
            ...englishBatteryTexts,
            "battery.summary.removable": "shared removable summary",
            "battery.note.capacityBelowLabel": "shared capacity note",
            "battery.note.approvedResearch": "shared approval note",
        };
        const presentations = batteryPresentationsFor(texts);
        const removableIds = batteryPresets
            .filter((battery) => battery.batteryAccess !== "integrated")
            .map((battery) => battery.id);

        expect(Object.keys(presentations).sort()).toEqual(batteryPresets.map(({ id }) => id).sort());
        expect(removableIds.every((id) => presentations[id].summary === "shared removable summary")).toBe(true);
        expect(presentations["battery-72"].notes).toEqual(["shared capacity note"]);
        expect(presentations["battery-73"].notes).toEqual(["shared capacity note"]);
        expect(presentations["battery-97"].notes).toEqual(["shared approval note"]);
        expect(presentations["battery-124"].notes).toEqual(["shared approval note"]);
    });

    it("keeps every locale text pool complete and localizes newly added shared copy", () => {
        const englishKeys = Object.keys(batteryTextTranslations.en).sort();
        for (const [locale, texts] of Object.entries(batteryTextTranslations)) {
            expect(Object.keys(texts).sort()).toEqual(englishKeys);
            if (locale === "en") continue;
            expect(texts["battery.summary.removable"]).not.toBe(
                englishBatteryTexts["battery.summary.removable"],
            );
            expect(texts["battery.note.approvedResearch"]).not.toBe(
                englishBatteryTexts["battery.note.approvedResearch"],
            );
        }
    });
});
