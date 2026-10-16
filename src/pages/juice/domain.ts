export type FlavorSettings = {
    readonly nm: string;
    readonly perc: number;
    readonly vg: boolean;
};

export type JuiceSettings = {
    readonly batchSize: number;
    readonly mixByWeight: boolean;
    readonly baseStrength: number;
    readonly basePg: number;
    readonly targetStrength: number;
    readonly targetPg: number;
    readonly flavors: readonly FlavorSettings[];
};

export type IngredientAmount = {
    readonly volume: number;
    readonly weight: number;
};

export type RecipeRow = IngredientAmount & {
    readonly name: string;
    readonly italic?: boolean;
};

export type IngredientTable = {
    readonly rows: readonly RecipeRow[];
    readonly totalVolume: number;
    readonly totalWeight: number;
    readonly density: number;
};

export type JuiceCalculation = {
    readonly nicBase: IngredientTable;
    readonly target: IngredientTable;
    readonly recipe: IngredientTable;
    readonly canMix: boolean;
    readonly targetNicotineWarning: boolean;
};

export type LegacyExportBatch = {
    readonly flavors?: readonly Partial<FlavorSettings>[];
    readonly batchSize?: unknown;
    readonly baseStrength?: unknown;
    readonly targetStrength?: unknown;
    readonly basePg?: unknown;
    readonly targetPg?: unknown;
    readonly mixByWeight?: unknown;
};

export const density = {
    pg: 1.0373,
    vg: 1.2613,
    nicotine: 1.00925,
    water: 0.9982,
    flavor: 1.06,
} as const;

export const defaultSettings: JuiceSettings = {
    batchSize: 10,
    mixByWeight: false,
    baseStrength: 2.7,
    basePg: 100,
    targetStrength: 1.8,
    targetPg: 70,
    flavors: [],
};

export const cloneSettings = (settings: JuiceSettings): JuiceSettings => ({
    ...settings,
    flavors: settings.flavors.map((flavor) => ({ ...flavor })),
});

const finiteOr = (value: unknown, fallback: number): number =>
    typeof value === "number" && Number.isFinite(value) ? value : fallback;

/** Normalize the historical ej2 cookie payload without carrying its mutable Ingredient objects forward. */
export const fromLegacyExport = (value: unknown): JuiceSettings | null => {
    if (!value || typeof value !== "object") return null;
    const saved = value as LegacyExportBatch;
    if (typeof saved.batchSize !== "number" && typeof saved.baseStrength !== "number") return null;
    const flavors = Array.isArray(saved.flavors)
        ? saved.flavors.map((flavor) => ({
            nm: typeof flavor.nm === "string" ? flavor.nm : "Flavor",
            perc: finiteOr(flavor.perc, 0),
            vg: flavor.vg === true,
        }))
        : [];
    return {
        batchSize: finiteOr(saved.batchSize, defaultSettings.batchSize),
        // The legacy toggle mixed nicotine-strength units with batch measurement. The calculator now
        // consistently accepts strength in mg/mL and batch volume in mL while reporting both recipe units.
        mixByWeight: false,
        baseStrength: finiteOr(saved.baseStrength, defaultSettings.baseStrength),
        basePg: finiteOr(saved.basePg, defaultSettings.basePg),
        targetStrength: finiteOr(saved.targetStrength, defaultSettings.targetStrength),
        targetPg: finiteOr(saved.targetPg, defaultSettings.targetPg),
        flavors,
    };
};

/** Match the historical Mth.round behavior used by the legacy page. */
export const legacyRound = (value: number, decimals = 2): string => {
    if (decimals < 1) return Math.round(value || 0).toString();
    return (value || 0).toFixed(decimals);
};
