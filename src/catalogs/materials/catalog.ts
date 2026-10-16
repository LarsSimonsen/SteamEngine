import type { CatalogEntryMetadata } from "../entry-metadata";
import { materials } from "./defaults";

const legacyDefaultMaterialAliases: Readonly<Record<string, string>> = {
    ni200lin: "ni200",
};

export const canonicalMaterialId = (id: string): string => legacyDefaultMaterialAliases[id] ?? id;

export const isLegacyDefaultMaterialId = (id: string): boolean => id in legacyDefaultMaterialAliases;

export type TemperaturePoint = readonly [
    temperatureCelsius: number,
    resistanceFactor: number,
];

export type MaterialProperties = {
    readonly id: string;
    readonly slug?: string;
    readonly aliases?: readonly string[];
    readonly description?: string;
    readonly name: string;
    /** Resistivity in Î© mmÂ²/m. */
    readonly resistivity: number;
    /** Specific heat capacity in J/gÃ—K, or null when unknown. */
    readonly heatCapacity: number | null;
    /** Density in g/cmÂ³, or null when unknown. */
    readonly density: number | null;
};

export type DefaultMaterial = MaterialProperties & CatalogEntryMetadata & {
    /** Melting point in °C, or null when unknown. */
    readonly meltingPoint: number | null;
    readonly tcr?: number;
    readonly tfr?: readonly TemperaturePoint[];
};

export type CustomMaterial = MaterialProperties & (
    | { readonly tcr?: never; readonly tfr?: never }
    | { readonly tcr: number; readonly tfr?: never }
    | { readonly tcr?: never; readonly tfr: readonly TemperaturePoint[] }
) & {
    readonly clonedFrom?: string;
};

export type Material = DefaultMaterial | CustomMaterial;

export { excludedDefaultMaterialIds, materials } from "./defaults";

export const materialFor = (id: string): DefaultMaterial | undefined =>
    materials.find((material) => material.id === canonicalMaterialId(id));
