import type { CustomBattery, DefaultBattery } from "./catalog";
import { validateCustomBattery } from "./validation";

export const batteryStorageKey = "steamengine.batteries.v1";
export const batteryPersistenceVersion = 2;

/** Initial visibility is a curated catalog decision published as each entry's `initiallyVisible` flag. */
export const initiallyVisibleDefaultBatteryIds = (
    defaultBatteries: readonly DefaultBattery[],
): ReadonlySet<string> => new Set(
    defaultBatteries
        .filter((battery) => battery.initiallyVisible === true)
        .map((battery) => battery.id),
);

export type BatteryPersistentState = {
    readonly customBatteries: readonly CustomBattery[];
    readonly hiddenDefaultBatteryIds: readonly string[];
};

export type BatteryPersistenceLoadResult =
    | { readonly kind: "valid"; readonly state: BatteryPersistentState }
    | { readonly kind: "invalid"; readonly message: string };

export type BatteryStorage = Readonly<Pick<Storage, "getItem" | "setItem" | "removeItem">>;

export const initialBatteryState = (
    defaultBatteries: readonly DefaultBattery[],
): BatteryPersistentState => {
    const visibleIds = initiallyVisibleDefaultBatteryIds(defaultBatteries);
    return {
        customBatteries: [],
        hiddenDefaultBatteryIds: defaultBatteries
            .filter((battery) => !visibleIds.has(battery.id))
            .map((battery) => battery.id),
    };
};

export const parseBatteryEnvelope = (
    raw: string | null,
    defaultBatteries: readonly DefaultBattery[],
): BatteryPersistenceLoadResult => {
    if (raw === null) return { kind: "valid", state: initialBatteryState(defaultBatteries) };
    try {
        const envelope = JSON.parse(raw) as Record<string, unknown>;
        if (!envelope || typeof envelope !== "object"
            || (envelope.version !== 1 && envelope.version !== batteryPersistenceVersion)
            || !Array.isArray(envelope.customBatteries) || !Array.isArray(envelope.hiddenDefaultBatteryIds)) {
            return { kind: "invalid", message: "Saved battery data has an unsupported or malformed format." };
        }
        const defaultIds = new Set(defaultBatteries.map((battery) => battery.id));
        const hiddenIds = envelope.hiddenDefaultBatteryIds;
        if (hiddenIds.some((id) => typeof id !== "string" || !defaultIds.has(id))
            || new Set(hiddenIds).size !== hiddenIds.length) {
            return { kind: "invalid", message: "Saved default-battery visibility is invalid." };
        }
        const customBatteries: CustomBattery[] = [];
        const customIds = new Set<string>();
        for (const candidate of envelope.customBatteries) {
            const validation = validateCustomBattery(candidate, defaultBatteries, {
                allowUnknownFormFactor: envelope.version === 1,
            });
            if (validation.kind === "invalid") {
                return { kind: "invalid", message: `Saved custom battery is invalid: ${validation.message}` };
            }
            if (customIds.has(validation.battery.id)) {
                return { kind: "invalid", message: "Saved custom battery IDs must be unique." };
            }
            customIds.add(validation.battery.id);
            customBatteries.push(validation.battery);
        }
        return {
            kind: "valid",
            state: {
                customBatteries,
                hiddenDefaultBatteryIds: hiddenIds as string[],
            },
        };
    } catch {
        return { kind: "invalid", message: "Saved battery data is not valid JSON." };
    }
};

export const loadBatteryState = (
    storage: BatteryStorage | undefined,
    defaultBatteries: readonly DefaultBattery[],
): BatteryPersistenceLoadResult => {
    try {
        return parseBatteryEnvelope(storage?.getItem(batteryStorageKey) ?? null, defaultBatteries);
    } catch {
        return { kind: "invalid", message: "Saved battery data could not be read." };
    }
};

export const saveBatteryState = (
    storage: BatteryStorage | undefined,
    state: BatteryPersistentState,
): string | undefined => {
    try {
        storage?.setItem(batteryStorageKey, JSON.stringify({ version: batteryPersistenceVersion, ...state }));
        return undefined;
    } catch {
        return "Battery changes could not be saved.";
    }
};

export const clearBatteryState = (storage: BatteryStorage | undefined): string | undefined => {
    try {
        storage?.removeItem(batteryStorageKey);
        return undefined;
    } catch {
        return "Saved battery data could not be reset.";
    }
};
