import { builtInPresets } from "./presets";
import type { CustomMod, DefaultMod, Mod } from "./catalog";
import {
    clearModState,
    initialModState,
    loadModState,
    modStorageKey,
    saveModState,
    type ModPersistentState,
    type ModStorage,
} from "./persistence";
import { validateCustomMod } from "./validation";

export type ModRepositorySnapshot = {
    readonly defaultMods: readonly DefaultMod[];
    readonly customMods: readonly CustomMod[];
    readonly allMods: readonly Mod[];
    readonly visibleDefaultMods: readonly DefaultMod[];
    readonly hiddenDefaultModIds: ReadonlySet<string>;
    readonly error?: string;
};

export type ModRepositoryResult =
    | { readonly kind: "success"; readonly mod?: CustomMod }
    | { readonly kind: "invalid"; readonly message: string }
    | { readonly kind: "blocked"; readonly references: readonly string[] };

export type ModReferenceSource = {
    readonly label: string;
    readonly modIds: () => Iterable<string>;
};

export type ModStorageEvents = {
    addEventListener(type: "storage", listener: (event: StorageEvent) => void): void;
    removeEventListener(type: "storage", listener: (event: StorageEvent) => void): void;
};

export type ModRepository = {
    readonly getSnapshot: () => ModRepositorySnapshot;
    readonly subscribe: (listener: () => void) => () => void;
    readonly setDefaultVisible: (modId: string, visible: boolean) => ModRepositoryResult;
    readonly saveCustomMod: (candidate: unknown) => ModRepositoryResult;
    readonly referencesFor: (modId: string) => readonly string[];
    readonly deleteCustomMod: (modId: string) => ModRepositoryResult;
    readonly reset: () => ModRepositoryResult;
    readonly registerReferences: (sourceId: string, source: ModReferenceSource) => () => void;
    readonly dispose: () => void;
};

const snapshotFromState = (
    defaultMods: readonly DefaultMod[],
    state: ModPersistentState,
    error?: string,
): ModRepositorySnapshot => {
    const hiddenDefaultModIds = new Set(state.hiddenDefaultModIds);
    const customMods = [...state.customMods].sort(
        (left, right) => left.displayName.localeCompare(right.displayName),
    );
    return {
        defaultMods,
        customMods,
        allMods: [...defaultMods, ...customMods],
        visibleDefaultMods: defaultMods.filter((mod) => !hiddenDefaultModIds.has(mod.id)),
        hiddenDefaultModIds,
        ...(error === undefined ? {} : { error }),
    };
};

export const createModRepository = ({
    storage = typeof localStorage === "undefined" ? undefined : localStorage,
    storageEvents = typeof window === "undefined" ? undefined : window,
    defaultMods = builtInPresets,
}: {
    readonly storage?: ModStorage;
    readonly storageEvents?: ModStorageEvents;
    readonly defaultMods?: readonly DefaultMod[];
} = {}): ModRepository => {
    const listeners = new Set<() => void>();
    const references = new Map<string, ModReferenceSource>();
    let state: ModPersistentState;
    let snapshot: ModRepositorySnapshot;

    const applyLoadedState = (): void => {
        const loaded = loadModState(storage, defaultMods);
        if (loaded.kind === "valid") {
            state = loaded.state;
            snapshot = snapshotFromState(defaultMods, state);
        } else {
            state = initialModState(defaultMods);
            snapshot = snapshotFromState(defaultMods, state, loaded.message);
        }
    };
    applyLoadedState();

    const publish = (): void => listeners.forEach((listener) => listener());
    const referencesFor = (modId: string): readonly string[] => [...references.values()]
        .filter((source) => new Set(source.modIds()).has(modId))
        .map((source) => source.label);
    const commit = (next: ModPersistentState): ModRepositoryResult => {
        if (snapshot.error) return { kind: "invalid", message: "Reset malformed mod data before editing it." };
        const error = saveModState(storage, next);
        if (error) {
            snapshot = snapshotFromState(defaultMods, state, error);
            publish();
            return { kind: "invalid", message: error };
        }
        state = next;
        snapshot = snapshotFromState(defaultMods, state);
        publish();
        return { kind: "success" };
    };

    const onStorage = (event: StorageEvent): void => {
        if (event.key !== modStorageKey && event.key !== null) return;
        applyLoadedState();
        publish();
    };
    storageEvents?.addEventListener("storage", onStorage);

    return {
        getSnapshot: () => snapshot,
        subscribe: (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        setDefaultVisible: (modId, visible) => {
            if (!defaultMods.some((mod) => mod.id === modId)) {
                return { kind: "invalid", message: "The built-in mod is unavailable." };
            }
            const hidden = new Set(state.hiddenDefaultModIds);
            if (visible) hidden.delete(modId);
            else hidden.add(modId);
            return commit({ ...state, hiddenDefaultModIds: [...hidden] });
        },
        saveCustomMod: (candidate) => {
            const validation = validateCustomMod(candidate, defaultMods);
            if (validation.kind === "invalid") return validation;
            const index = state.customMods.findIndex((mod) => mod.id === validation.mod.id);
            const customMods = [...state.customMods];
            if (index === -1) customMods.push(validation.mod);
            else customMods[index] = validation.mod;
            const result = commit({ ...state, customMods });
            return result.kind === "success" ? { kind: "success", mod: validation.mod } : result;
        },
        referencesFor,
        deleteCustomMod: (modId) => {
            if (!state.customMods.some((mod) => mod.id === modId)) {
                return { kind: "invalid", message: "The custom mod is unavailable." };
            }
            const blockingReferences = referencesFor(modId);
            if (blockingReferences.length > 0) return { kind: "blocked", references: blockingReferences };
            return commit({
                ...state,
                customMods: state.customMods.filter((mod) => mod.id !== modId),
            });
        },
        reset: () => {
            const error = clearModState(storage);
            if (error) return { kind: "invalid", message: error };
            state = initialModState(defaultMods);
            snapshot = snapshotFromState(defaultMods, state);
            publish();
            return { kind: "success" };
        },
        registerReferences: (sourceId, source) => {
            references.set(sourceId, source);
            return () => references.delete(sourceId);
        },
        dispose: () => {
            storageEvents?.removeEventListener("storage", onStorage);
            listeners.clear();
            references.clear();
        },
    };
};
