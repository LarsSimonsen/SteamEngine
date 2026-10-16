import {
    canonicalMaterialId,
    materials,
    type Material,
} from "../../catalogs/materials/catalog";
import { hasTemperatureData } from "../../catalogs/materials/temperature";
import {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    type TemperatureScale,
} from "../../shared/domain/temperature";

export type { TemperatureScale } from "../../shared/domain/temperature";

export type SelectedMaterial = {
    readonly id: number;
    readonly materialId: string;
    readonly resistance: number;
};

export type TcrSettings = {
    readonly scale: TemperatureScale;
    readonly temperaturesCelsius: readonly number[];
    readonly selectedMaterials: readonly SelectedMaterial[];
};

export const defaultTemperaturesCelsius = [
    -73.33333333333333,
    -17.77777777777778,
    21.11111111111111,
    93.33333333333333,
    204.44444444444446,
    315.55555555555554,
    426.6666666666667,
] as const;

export const defaultTcrSettings = (): TcrSettings => ({
    scale: "fahrenheit",
    temperaturesCelsius: [...defaultTemperaturesCelsius],
    selectedMaterials: [],
});

export const tcrMaterials: readonly Material[] = materials.filter(
    hasTemperatureData,
);

export const materialsWithTemperatureData = (
    availableMaterials: readonly Material[],
): readonly Material[] => availableMaterials.filter(
    hasTemperatureData,
);

export { celsiusToFahrenheit, fahrenheitToCelsius } from "../../shared/domain/temperature";

export const materialById = (
    materialId: string,
    availableMaterials: readonly Material[],
): Material | undefined => availableMaterials.find(
    (material) => material.id === canonicalMaterialId(materialId),
);

export const addSelectedMaterial = (
    settings: TcrSettings,
    materialId: string,
    availableMaterials: readonly Material[] = tcrMaterials,
): TcrSettings => {
    const material = materialById(materialId, availableMaterials);
    if (!material || !hasTemperatureData(material)) return settings;
    const nextId = settings.selectedMaterials.reduce(
        (highest, material) => Math.max(highest, material.id),
        0,
    ) + 1;
    return {
        ...settings,
        selectedMaterials: [
            ...settings.selectedMaterials,
            { id: nextId, materialId: material.id, resistance: 1 },
        ],
    };
};

export const removeSelectedMaterial = (
    settings: TcrSettings,
    selectedMaterialId: number,
): TcrSettings => ({
    ...settings,
    selectedMaterials: settings.selectedMaterials.filter(
        (material) => material.id !== selectedMaterialId,
    ),
});

export const updateSelectedResistance = (
    settings: TcrSettings,
    selectedMaterialId: number,
    resistance: number,
): TcrSettings => ({
    ...settings,
    selectedMaterials: settings.selectedMaterials.map((material) =>
        material.id === selectedMaterialId ? { ...material, resistance } : material,
    ),
});

export type TemperatureParseResult =
    | { readonly kind: "valid"; readonly temperaturesCelsius: readonly number[] }
    | { readonly kind: "invalid"; readonly message: string };

export const parseTemperaturePoints = (
    draft: string,
    scale: TemperatureScale,
): TemperatureParseResult => {
    const parts = draft.split(",").map((part) => part.trim());
    if (parts.length === 0 || parts.some((part) => part === "")) {
        return { kind: "invalid", message: "Enter one or more comma-separated temperatures." };
    }
    const values = parts.map(Number);
    if (values.some((value) => !Number.isFinite(value))) {
        return { kind: "invalid", message: "Every temperature must be a finite number." };
    }
    if (values.some((value, index) => index > 0 && value <= values[index - 1])) {
        return { kind: "invalid", message: "Temperature points must be in ascending order." };
    }
    return {
        kind: "valid",
        temperaturesCelsius: scale === "celsius"
            ? values
            : values.map(fahrenheitToCelsius),
    };
};

const formatDraftNumber = (value: number): string => {
    const rounded = Math.round(value * 10000) / 10000;
    return String(Object.is(rounded, -0) ? 0 : rounded);
};

export const formatTemperaturePoints = (
    temperaturesCelsius: readonly number[],
    scale: TemperatureScale,
): string => temperaturesCelsius
    .map((temperature) => scale === "celsius"
        ? formatDraftNumber(temperature)
        : formatDraftNumber(celsiusToFahrenheit(temperature)))
    .join(",");

export type MaterialResistanceRow = {
    readonly id: number;
    readonly material: Material;
    readonly resistance: number;
    readonly resistances: readonly number[];
    readonly extrapolated: boolean;
};

export type CsvResult =
    | { readonly kind: "ready"; readonly text: string }
    | { readonly kind: "unavailable"; readonly message: string };

export type ValidTcrCalculation = {
    readonly kind: "valid";
    readonly rows: readonly MaterialResistanceRow[];
    readonly totalResistances: readonly number[];
    readonly normalizedFactors: readonly number[];
    readonly extrapolated: boolean;
    readonly sensitivityPercent: number;
    readonly csv: CsvResult;
};

export type TcrCalculation =
    | { readonly kind: "empty" }
    | { readonly kind: "invalid"; readonly message: string }
    | ValidTcrCalculation;

export const isDefaultTcrSettings = (settings: TcrSettings): boolean =>
    settings.scale === "fahrenheit"
    && settings.selectedMaterials.length === 0
    && formatTemperaturePoints(settings.temperaturesCelsius, "fahrenheit")
        === formatTemperaturePoints(defaultTemperaturesCelsius, "fahrenheit");
