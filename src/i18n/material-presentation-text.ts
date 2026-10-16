import { materials } from "../catalogs/materials/catalog";
import type { CatalogPresentationMap } from "./catalog-presentations";

const materialTextIds = [
    "material.profile",
    "material.safety.verifiedProfile",
] as const;

export type MaterialTextId = (typeof materialTextIds)[number];

export type MaterialTextDictionary = Readonly<{
    readonly "material.profile": (displayName: string) => string;
    readonly "material.safety.verifiedProfile": string;
}>;

export type MaterialDisplayNames = Readonly<Partial<Record<string, string>>>;

export const materialPresentationsFor = (
    texts: MaterialTextDictionary,
    displayNames: MaterialDisplayNames = {},
): CatalogPresentationMap => Object.fromEntries(materials.map((material) => {
    const displayName = displayNames[material.id] ?? material.name;
    const profile = texts["material.profile"](displayName);
    return [material.id, {
        displayName,
        description: profile,
        summary: profile,
        safetyText: texts["material.safety.verifiedProfile"],
    }];
}));

export const materialTextKeys = (): readonly MaterialTextId[] => materialTextIds;
