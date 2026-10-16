import { materials, type CustomMaterial, type DefaultMaterial, type Material } from "./catalog";
import {
    clearMaterialState,
    initialMaterialState,
    loadMaterialState,
    materialStorageKey,
    saveMaterialState,
    type MaterialPersistentState,
    type MaterialStorage,
} from "./persistence";
import { validateCustomMaterial, type CustomMaterialValidation } from "./validation";

export type MaterialRepositorySnapshot = {
    readonly defaultMaterials: readonly DefaultMaterial[];
    readonly customMaterials: readonly CustomMaterial[];
    readonly allMaterials: readonly Material[];
    readonly visibleDefaultMaterials: readonly DefaultMaterial[];
    readonly hiddenDefaultMaterialIds: ReadonlySet<string>;
    readonly error?: string;
};

export type MaterialRepositoryResult =
    | { readonly kind: "success"; readonly material?: CustomMaterial }
    | { readonly kind: "invalid"; readonly message: string }
    | { readonly kind: "blocked"; readonly references: readonly string[] };

export type MaterialReferenceSource = {
    readonly label: string;
    readonly materialIds: () => Iterable<string>;
};

export type MaterialStorageEvents = {
    addEventListener(type: "storage", listener: (event: StorageEvent) => void): void;
    removeEventListener(type: "storage", listener: (event: StorageEvent) => void): void;
};

export type MaterialRepository = {
    readonly getSnapshot: () => MaterialRepositorySnapshot;
    readonly subscribe: (listener: () => void) => () => void;
    readonly setDefaultVisible: (materialId: string, visible: boolean) => MaterialRepositoryResult;
    readonly saveCustomMaterial: (candidate: unknown) => MaterialRepositoryResult;
    readonly referencesFor: (materialId: string) => readonly string[];
    readonly deleteCustomMaterial: (materialId: string) => MaterialRepositoryResult;
    readonly reset: () => MaterialRepositoryResult;
    readonly registerReferences: (sourceId: string, source: MaterialReferenceSource) => () => void;
    readonly dispose: () => void;
};

const snapshotFromState = (
    defaultMaterials: readonly DefaultMaterial[],
    state: MaterialPersistentState,
    error?: string,
): MaterialRepositorySnapshot => {
    const hiddenDefaultMaterialIds = new Set(state.hiddenDefaultMaterialIds);
    if (state.defaultVisibilityCustomized) {
        const knownDefaultMaterialIds = new Set(state.knownDefaultMaterialIds);
        defaultMaterials
            .filter((material) => !knownDefaultMaterialIds.has(material.id))
            .forEach((material) => hiddenDefaultMaterialIds.add(material.id));
    }
    const customMaterials = [...state.customMaterials].sort((left, right) => left.name.localeCompare(right.name));
    return {
        defaultMaterials,
        customMaterials,
        allMaterials: [...defaultMaterials, ...customMaterials],
        visibleDefaultMaterials: defaultMaterials.filter((material) => !hiddenDefaultMaterialIds.has(material.id)),
        hiddenDefaultMaterialIds,
        ...(error === undefined ? {} : { error }),
    };
};

export const createMaterialRepository = ({
    storage = typeof localStorage === "undefined" ? undefined : localStorage,
    storageEvents = typeof window === "undefined" ? undefined : window,
    defaultMaterials = materials,
}: {
    readonly storage?: MaterialStorage;
    readonly storageEvents?: MaterialStorageEvents;
    readonly defaultMaterials?: readonly DefaultMaterial[];
} = {}): MaterialRepository => {
    const listeners = new Set<() => void>();
    const references = new Map<string, MaterialReferenceSource>();
    let state: MaterialPersistentState;
    let snapshot: MaterialRepositorySnapshot;

    const applyLoadedState = (): void => {
        const loaded = loadMaterialState(storage, defaultMaterials);
        if (loaded.kind === "valid") {
            state = loaded.state;
            snapshot = snapshotFromState(defaultMaterials, state);
        } else {
            state = initialMaterialState(defaultMaterials);
            snapshot = snapshotFromState(defaultMaterials, state, loaded.message);
        }
    };
    applyLoadedState();

    const publish = (): void => listeners.forEach((listener) => listener());
    const referencesFor = (materialId: string): readonly string[] => [...references.values()]
        .filter((source) => new Set(source.materialIds()).has(materialId))
        .map((source) => source.label);
    const commit = (next: MaterialPersistentState): MaterialRepositoryResult => {
        if (snapshot.error) return { kind: "invalid", message: "Reset malformed material data before editing it." };
        const error = saveMaterialState(storage, next);
        if (error) {
            snapshot = snapshotFromState(defaultMaterials, state, error);
            publish();
            return { kind: "invalid", message: error };
        }
        state = next;
        snapshot = snapshotFromState(defaultMaterials, state);
        publish();
        return { kind: "success" };
    };

    const onStorage = (event: StorageEvent): void => {
        if (event.key !== materialStorageKey && event.key !== null) return;
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
        setDefaultVisible: (materialId, visible) => {
            if (!defaultMaterials.some((material) => material.id === materialId)) {
                return { kind: "invalid", message: "The built-in material is unavailable." };
            }
            const hidden = new Set(state.hiddenDefaultMaterialIds);
            if (visible) hidden.delete(materialId);
            else hidden.add(materialId);
            return commit({
                ...state,
                hiddenDefaultMaterialIds: [...hidden],
                defaultVisibilityCustomized: true,
                knownDefaultMaterialIds: defaultMaterials.map((material) => material.id),
            });
        },
        saveCustomMaterial: (candidate) => {
            const validation: CustomMaterialValidation = validateCustomMaterial(candidate, defaultMaterials);
            if (validation.kind === "invalid") return validation;
            const existingIndex = state.customMaterials.findIndex((material) => material.id === validation.material.id);
            const customMaterials = [...state.customMaterials];
            if (existingIndex === -1) customMaterials.push(validation.material);
            else customMaterials[existingIndex] = validation.material;
            const result = commit({ ...state, customMaterials });
            return result.kind === "success" ? { kind: "success", material: validation.material } : result;
        },
        referencesFor,
        deleteCustomMaterial: (materialId) => {
            if (!state.customMaterials.some((material) => material.id === materialId)) {
                return { kind: "invalid", message: "The custom material is unavailable." };
            }
            const blockingReferences = referencesFor(materialId);
            if (blockingReferences.length > 0) return { kind: "blocked", references: blockingReferences };
            return commit({
                ...state,
                customMaterials: state.customMaterials.filter((material) => material.id !== materialId),
            });
        },
        reset: () => {
            const error = clearMaterialState(storage);
            if (error) return { kind: "invalid", message: error };
            state = initialMaterialState(defaultMaterials);
            snapshot = snapshotFromState(defaultMaterials, state);
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
