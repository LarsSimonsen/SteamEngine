import type { Mod } from "../../catalogs/mods/catalog";
import type { ModRangeDrafts } from "./domain";

export const modRangeStorageKey = "steamengine.modRange.settings.v1";

export type ModRangeSettings = {
    readonly drafts: ModRangeDrafts;
    readonly selectedPresetId: string;
};

export type ModRangeStorage = Readonly<Pick<Storage, "getItem" | "setItem" | "removeItem">>;

const normalizeDrafts = (value: unknown): ModRangeDrafts | undefined => {
    if (!value || typeof value !== "object") return undefined;
    const candidate = value as Partial<Record<keyof ModRangeDrafts, unknown>>;
    const keys: readonly (keyof ModRangeDrafts)[] = [
        "maxPower",
        "maxVoltage",
        "maxCurrent",
        "minResistance",
        "maxResistance",
    ];
    if (keys.some((key) => typeof candidate[key] !== "string")) return undefined;
    return Object.fromEntries(keys.map((key) => [key, candidate[key]])) as ModRangeDrafts;
};

export const loadModRangeSettings = (
    storage: ModRangeStorage | undefined,
    availableMods: readonly Mod[],
    defaults: ModRangeDrafts,
): ModRangeSettings => {
    try {
        const raw = storage?.getItem(modRangeStorageKey);
        if (!raw) return { drafts: defaults, selectedPresetId: "" };
        const envelope = JSON.parse(raw) as Record<string, unknown>;
        const drafts = envelope.version === 1 ? normalizeDrafts(envelope.drafts) : undefined;
        const selectedPresetId = typeof envelope.selectedPresetId === "string"
            && (envelope.selectedPresetId === ""
                || availableMods.some((mod) => mod.id === envelope.selectedPresetId))
            ? envelope.selectedPresetId
            : undefined;
        return drafts && selectedPresetId !== undefined
            ? { drafts, selectedPresetId }
            : { drafts: defaults, selectedPresetId: "" };
    } catch {
        return { drafts: defaults, selectedPresetId: "" };
    }
};

export const saveModRangeSettings = (
    storage: ModRangeStorage | undefined,
    settings: ModRangeSettings,
): void => storage?.setItem(modRangeStorageKey, JSON.stringify({ version: 1, ...settings }));

export const clearModRangeSettings = (storage: ModRangeStorage | undefined): void =>
    storage?.removeItem(modRangeStorageKey);
