import type { CustomMod, DefaultMod } from "./catalog";
import { validateCustomMod } from "./validation";

export const modStorageKey = "steamengine.mods.v1";

/** Initial visibility is a curated catalog decision published as each entry's `initiallyVisible` flag. */
export const initiallyVisibleDefaultModIds = (
    defaultMods: readonly DefaultMod[],
): ReadonlySet<string> => new Set(
    defaultMods
        .filter((mod) => mod.initiallyVisible === true)
        .map((mod) => mod.id),
);

export type ModPersistentState = {
    readonly customMods: readonly CustomMod[];
    readonly hiddenDefaultModIds: readonly string[];
};

export type ModPersistenceLoadResult =
    | { readonly kind: "valid"; readonly state: ModPersistentState }
    | { readonly kind: "invalid"; readonly message: string };

export type ModStorage = Readonly<Pick<Storage, "getItem" | "setItem" | "removeItem">>;

export const initialModState = (defaultMods: readonly DefaultMod[]): ModPersistentState => {
    const visibleIds = initiallyVisibleDefaultModIds(defaultMods);
    return {
        customMods: [],
        hiddenDefaultModIds: defaultMods
            .filter((mod) => !visibleIds.has(mod.id))
            .map((mod) => mod.id),
    };
};

export const parseModEnvelope = (
    raw: string | null,
    defaultMods: readonly DefaultMod[],
): ModPersistenceLoadResult => {
    if (raw === null) return { kind: "valid", state: initialModState(defaultMods) };
    try {
        const envelope = JSON.parse(raw) as Record<string, unknown>;
        if (!envelope || typeof envelope !== "object" || envelope.version !== 1
            || !Array.isArray(envelope.customMods) || !Array.isArray(envelope.hiddenDefaultModIds)) {
            return { kind: "invalid", message: "Saved mod data has an unsupported or malformed format." };
        }
        const defaultIds = new Set(defaultMods.map((mod) => mod.id));
        const hiddenIds = envelope.hiddenDefaultModIds;
        if (hiddenIds.some((id) => typeof id !== "string" || !defaultIds.has(id))
            || new Set(hiddenIds).size !== hiddenIds.length) {
            return { kind: "invalid", message: "Saved default-mod visibility is invalid." };
        }
        const customMods: CustomMod[] = [];
        const customIds = new Set<string>();
        for (const candidate of envelope.customMods) {
            const validation = validateCustomMod(candidate, defaultMods);
            if (validation.kind === "invalid") {
                return { kind: "invalid", message: `Saved custom mod is invalid: ${validation.message}` };
            }
            if (customIds.has(validation.mod.id)) {
                return { kind: "invalid", message: "Saved custom mod IDs must be unique." };
            }
            customIds.add(validation.mod.id);
            customMods.push(validation.mod);
        }
        return {
            kind: "valid",
            state: { customMods, hiddenDefaultModIds: hiddenIds as string[] },
        };
    } catch {
        return { kind: "invalid", message: "Saved mod data is not valid JSON." };
    }
};

export const loadModState = (
    storage: ModStorage | undefined,
    defaultMods: readonly DefaultMod[],
): ModPersistenceLoadResult => {
    try {
        return parseModEnvelope(storage?.getItem(modStorageKey) ?? null, defaultMods);
    } catch {
        return { kind: "invalid", message: "Saved mod data could not be read." };
    }
};

export const saveModState = (
    storage: ModStorage | undefined,
    state: ModPersistentState,
): string | undefined => {
    try {
        storage?.setItem(modStorageKey, JSON.stringify({ version: 1, ...state }));
        return undefined;
    } catch {
        return "Mod changes could not be saved.";
    }
};

export const clearModState = (storage: ModStorage | undefined): string | undefined => {
    try {
        storage?.removeItem(modStorageKey);
        return undefined;
    } catch {
        return "Saved mod data could not be reset.";
    }
};
