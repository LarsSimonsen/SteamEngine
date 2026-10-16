import {
    excludedDefaultMaterialIds,
    isLegacyDefaultMaterialId,
    type CustomMaterial,
    type DefaultMaterial,
} from "./catalog";
import { validateCustomMaterial } from "./validation";

export const materialStorageKey = "steamengine.materials.v1";

const legacyVersionOneDefaultMaterialIds = new Set([
    "ka1", "ka", "kd", "n20", "n40", "n60", "n70", "n80", "ss304", "ss316", "ss316l", "ss317l",
    "ss321", "ss430", "au", "ag", "cu", "ti1", "ti2", "tie", "w", "nio", "ni200", "nife30", "dicodes",
    "reactor", "nife30stealth", "invar36", "nidh", "nft70", "nft52", "zr",
]);

const legacyInitiallyVisibleDefaultMaterialIds = new Set(["ka1", "n80", "ss316l", "ni200"]);

/** Initial visibility is a curated catalog decision published as each entry's `initiallyVisible` flag. */
export const initiallyVisibleDefaultMaterialIds = (
    defaultMaterials: readonly DefaultMaterial[],
): ReadonlySet<string> => new Set(defaultMaterials
    .filter((material) => material.initiallyVisible === true)
    .map((material) => material.id));

export type MaterialPersistentState = {
    readonly customMaterials: readonly CustomMaterial[];
    readonly hiddenDefaultMaterialIds: readonly string[];
    readonly defaultVisibilityCustomized: boolean;
    readonly knownDefaultMaterialIds: readonly string[];
};

export type MaterialPersistenceLoadResult =
    | { readonly kind: "valid"; readonly state: MaterialPersistentState }
    | { readonly kind: "invalid"; readonly message: string };

export type MaterialStorage = Readonly<Pick<Storage, "getItem" | "setItem" | "removeItem">>;

export const initialMaterialState = (
    defaultMaterials: readonly DefaultMaterial[],
): MaterialPersistentState => {
    const initiallyVisibleIds = initiallyVisibleDefaultMaterialIds(defaultMaterials);
    return {
        customMaterials: [],
        hiddenDefaultMaterialIds: defaultMaterials
            .filter((material) => !initiallyVisibleIds.has(material.id))
            .map((material) => material.id),
        defaultVisibilityCustomized: false,
        knownDefaultMaterialIds: defaultMaterials.map((material) => material.id),
    };
};

const canonicalSavedIds = (
    ids: unknown[],
    defaultIds: ReadonlySet<string>,
    dropLegacyAliases = false,
    dropExcludedIds = true,
): readonly string[] | undefined => {
    if (ids.some((id) => typeof id !== "string"
            || (!defaultIds.has(id) && !excludedDefaultMaterialIds.has(id)
                && !isLegacyDefaultMaterialId(id)))) return undefined;
    const canonicalIds = ids
        .filter((id): id is string => typeof id === "string")
        .filter((id) => !dropLegacyAliases || !isLegacyDefaultMaterialId(id))
        .filter((id) => !dropExcludedIds || !excludedDefaultMaterialIds.has(id))
        .map((id) => isLegacyDefaultMaterialId(id) ? "ni200" : id);
    return new Set(canonicalIds).size === canonicalIds.length ? canonicalIds : undefined;
};

export const parseMaterialEnvelope = (
    raw: string | null,
    defaultMaterials: readonly DefaultMaterial[],
): MaterialPersistenceLoadResult => {
    if (raw === null) return { kind: "valid", state: initialMaterialState(defaultMaterials) };
    try {
        const envelope = JSON.parse(raw) as Record<string, unknown>;
        if (!envelope || typeof envelope !== "object"
            || !Array.isArray(envelope.customMaterials) || !Array.isArray(envelope.hiddenDefaultMaterialIds)) {
            return { kind: "invalid", message: "Saved material data has an unsupported or malformed format." };
        }
        const defaultIds = new Set(defaultMaterials.map((material) => material.id));
        const savedHiddenIds = canonicalSavedIds(envelope.hiddenDefaultMaterialIds, defaultIds, true, false);
        if (savedHiddenIds === undefined) {
            return { kind: "invalid", message: "Saved default-material visibility is invalid." };
        }
        const hiddenIds = savedHiddenIds.filter((id) => defaultIds.has(id));
        const customMaterials: CustomMaterial[] = [];
        const customIds = new Set<string>();
        for (const candidate of envelope.customMaterials) {
            const validation = validateCustomMaterial(candidate, defaultMaterials);
            if (validation.kind === "invalid") {
                return { kind: "invalid", message: `Saved custom material is invalid: ${validation.message}` };
            }
            if (customIds.has(validation.material.id)) {
                return { kind: "invalid", message: "Saved custom material IDs must be unique." };
            }
            customIds.add(validation.material.id);
            customMaterials.push(validation.material);
        }
        if (envelope.version === 1) {
            const legacyHiddenIds = [...legacyVersionOneDefaultMaterialIds]
                .filter((id) => !legacyInitiallyVisibleDefaultMaterialIds.has(id));
            const visibilityCustomized = savedHiddenIds.length !== legacyHiddenIds.length
                || savedHiddenIds.some((id) => !legacyHiddenIds.includes(id));
            if (!visibilityCustomized) {
                return {
                    kind: "valid",
                    state: { ...initialMaterialState(defaultMaterials), customMaterials },
                };
            }
            return {
                kind: "valid",
                state: {
                    customMaterials,
                    hiddenDefaultMaterialIds: hiddenIds,
                    defaultVisibilityCustomized: true,
                    knownDefaultMaterialIds: [...legacyVersionOneDefaultMaterialIds],
                },
            };
        }
        if (envelope.version !== 2 || typeof envelope.defaultVisibilityCustomized !== "boolean"
                || !Array.isArray(envelope.knownDefaultMaterialIds)) {
            return { kind: "invalid", message: "Saved material data has an unsupported or malformed format." };
        }
        const knownIds = canonicalSavedIds(envelope.knownDefaultMaterialIds, defaultIds);
        if (knownIds === undefined) {
            return { kind: "invalid", message: "Saved default-material visibility is invalid." };
        }
        if (!envelope.defaultVisibilityCustomized) {
            return {
                kind: "valid",
                state: { ...initialMaterialState(defaultMaterials), customMaterials },
            };
        }
        return {
            kind: "valid",
            state: {
                customMaterials,
                hiddenDefaultMaterialIds: hiddenIds,
                defaultVisibilityCustomized: true,
                knownDefaultMaterialIds: knownIds,
            },
        };
    } catch {
        return { kind: "invalid", message: "Saved material data is not valid JSON." };
    }
};

export const loadMaterialState = (
    storage: MaterialStorage | undefined,
    defaultMaterials: readonly DefaultMaterial[],
): MaterialPersistenceLoadResult => {
    try {
        return parseMaterialEnvelope(storage?.getItem(materialStorageKey) ?? null, defaultMaterials);
    } catch {
        return { kind: "invalid", message: "Saved material data could not be read." };
    }
};

export const saveMaterialState = (
    storage: MaterialStorage | undefined,
    state: MaterialPersistentState,
): string | undefined => {
    try {
        storage?.setItem(materialStorageKey, JSON.stringify({ version: 2, ...state }));
        return undefined;
    } catch {
        return "Material changes could not be saved.";
    }
};

export const clearMaterialState = (storage: MaterialStorage | undefined): string | undefined => {
    try {
        storage?.removeItem(materialStorageKey);
        return undefined;
    } catch {
        return "Saved material data could not be reset.";
    }
};
