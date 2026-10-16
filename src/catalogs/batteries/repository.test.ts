import { describe, expect, it } from "vitest";
import { batteryPresets } from "./defaults";
import type { BatteryStorage } from "./persistence";
import { createBatteryRepository } from "./repository";

const memoryStorage = (): BatteryStorage => {
    const values: Record<string, string> = {};
    return {
        getItem: (key) => values[key] ?? null,
        setItem: (key, value) => { values[key] = value; },
        removeItem: (key) => { delete values[key]; },
    };
};

const customBattery = {
    id: "f1c6f4bc-9f8f-4b08-a179-a0eb252a77fa",
    manufacturer: "Test",
    model: "Cell",
    displayName: "Test Cell",
    formFactor: {
        kind: "cylindrical" as const,
        sizeCode: "18650",
        nominalDiameterMm: 18,
        nominalLengthMm: 65,
    },
    ratedCapacityMah: 3000,
    continuousDischargeCurrentAmps: 20,
};

describe("battery repository", () => {
    it("persists visibility and custom batteries", () => {
        const storage = memoryStorage();
        const repository = createBatteryRepository({
            storage,
            storageEvents: undefined,
            defaultBatteries: batteryPresets,
        });
        expect(repository.setDefaultVisible("battery-1", true).kind).toBe("success");
        expect(repository.saveCustomBattery(customBattery)).toMatchObject({ kind: "success" });

        const reloaded = createBatteryRepository({
            storage,
            storageEvents: undefined,
            defaultBatteries: batteryPresets,
        });
        expect(reloaded.getSnapshot().visibleDefaultBatteries.some(({ id }) => id === "battery-1"))
            .toBe(true);
        expect(reloaded.getSnapshot().customBatteries).toEqual([customBattery]);
    });

    it("blocks deletion while registered settings refer to the battery", () => {
        const repository = createBatteryRepository({
            storage: memoryStorage(),
            storageEvents: undefined,
            defaultBatteries: batteryPresets,
        });
        repository.saveCustomBattery(customBattery);
        repository.registerReferences("batt", {
            label: "Current Battery Drain settings",
            batteryIds: () => [customBattery.id],
        });
        expect(repository.deleteCustomBattery(customBattery.id)).toEqual({
            kind: "blocked",
            references: ["Current Battery Drain settings"],
        });
    });
});
