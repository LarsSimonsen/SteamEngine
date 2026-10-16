import {
    defaultTcrSettings,
    materialsWithTemperatureData,
    tcrMaterials,
    type SelectedMaterial,
    type TcrSettings,
    type TemperatureScale,
} from "./domain";
import { canonicalMaterialId, type Material } from "../../catalogs/materials/catalog";

export type StorageLike = Readonly<Pick<Storage, "getItem" | "setItem" | "removeItem">>;

export type TcrPersistence = {
    readonly clear: () => void;
    readonly load: () => TcrSettings;
    readonly save: (settings: TcrSettings) => void;
};

export const tcrStorageKey = "steamengine.tcr.settings.v1";

const isScale = (value: unknown): value is TemperatureScale =>
    value === "celsius" || value === "fahrenheit";

const normalizeTemperatures = (value: unknown): readonly number[] | undefined => {
    if (!Array.isArray(value) || value.length === 0 || value.some(
        (temperature) => typeof temperature !== "number" || !Number.isFinite(temperature),
    )) return undefined;
    if (value.some((temperature, index) => index > 0 && temperature <= value[index - 1])) return undefined;
    return value;
};

const normalizeMaterials = (
    value: unknown,
    availableMaterials: readonly Material[],
): readonly SelectedMaterial[] | undefined => {
    if (!Array.isArray(value)) return undefined;
    const validIds = new Set(
        materialsWithTemperatureData(availableMaterials).map((material) => material.id),
    );
    const normalized: SelectedMaterial[] = [];
    for (let index = 0; index < value.length; index += 1) {
        const selected = value[index] as Partial<SelectedMaterial> | undefined;
        const materialId = typeof selected?.materialId === "string"
            ? canonicalMaterialId(selected.materialId)
            : undefined;
        if (!selected || materialId === undefined || !validIds.has(materialId)
            || typeof selected.resistance !== "number" || !Number.isFinite(selected.resistance)
            || selected.resistance <= 0) return undefined;
        normalized.push({
            id: typeof selected.id === "number" && Number.isInteger(selected.id) && selected.id > 0
                ? selected.id
                : index + 1,
            materialId,
            resistance: selected.resistance,
        });
    }
    return normalized;
};

export const normalizeTcrSettings = (
    value: unknown,
    availableMaterials: readonly Material[] = tcrMaterials,
): TcrSettings | undefined => {
    if (!value || typeof value !== "object") return undefined;
    const candidate = value as Partial<TcrSettings>;
    const temperaturesCelsius = normalizeTemperatures(candidate.temperaturesCelsius);
    const selectedMaterials = normalizeMaterials(candidate.selectedMaterials, availableMaterials);
    if (!isScale(candidate.scale) || !temperaturesCelsius || !selectedMaterials) return undefined;
    return { scale: candidate.scale, temperaturesCelsius, selectedMaterials };
};

export const createTcrPersistence = (
    storage: StorageLike | undefined = typeof localStorage === "undefined" ? undefined : localStorage,
    availableMaterials: () => readonly Material[] = () => tcrMaterials,
): TcrPersistence => ({
    clear: () => storage?.removeItem(tcrStorageKey),
    load: () => {
        try {
            const raw = storage?.getItem(tcrStorageKey);
            if (!raw) return defaultTcrSettings();
            const parsed = JSON.parse(raw) as { readonly version?: unknown; readonly settings?: unknown };
            return parsed.version === 1
                ? normalizeTcrSettings(parsed.settings, availableMaterials()) ?? defaultTcrSettings()
                : defaultTcrSettings();
        } catch {
            return defaultTcrSettings();
        }
    },
    save: (settings) => storage?.setItem(tcrStorageKey, JSON.stringify({ version: 1, settings })),
});
