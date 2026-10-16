import { batteryPresets } from "./defaults";
import type { Battery, CustomBattery, DefaultBattery } from "./catalog";
import {
    batteryStorageKey,
    clearBatteryState,
    initialBatteryState,
    loadBatteryState,
    saveBatteryState,
    type BatteryPersistentState,
    type BatteryStorage,
} from "./persistence";
import { validateCustomBattery } from "./validation";

export type BatteryRepositorySnapshot = {
    readonly defaultBatteries: readonly DefaultBattery[];
    readonly customBatteries: readonly CustomBattery[];
    readonly allBatteries: readonly Battery[];
    readonly visibleDefaultBatteries: readonly DefaultBattery[];
    readonly hiddenDefaultBatteryIds: ReadonlySet<string>;
    readonly error?: string;
};

export type BatteryRepositoryResult =
    | { readonly kind: "success"; readonly battery?: CustomBattery }
    | { readonly kind: "invalid"; readonly message: string }
    | { readonly kind: "blocked"; readonly references: readonly string[] };

export type BatteryReferenceSource = {
    readonly label: string;
    readonly batteryIds: () => Iterable<string>;
};

export type BatteryStorageEvents = {
    addEventListener(type: "storage", listener: (event: StorageEvent) => void): void;
    removeEventListener(type: "storage", listener: (event: StorageEvent) => void): void;
};

export type BatteryRepository = {
    readonly getSnapshot: () => BatteryRepositorySnapshot;
    readonly subscribe: (listener: () => void) => () => void;
    readonly setDefaultVisible: (batteryId: string, visible: boolean) => BatteryRepositoryResult;
    readonly saveCustomBattery: (candidate: unknown) => BatteryRepositoryResult;
    readonly referencesFor: (batteryId: string) => readonly string[];
    readonly deleteCustomBattery: (batteryId: string) => BatteryRepositoryResult;
    readonly reset: () => BatteryRepositoryResult;
    readonly registerReferences: (sourceId: string, source: BatteryReferenceSource) => () => void;
    readonly dispose: () => void;
};

const snapshotFromState = (
    defaultBatteries: readonly DefaultBattery[],
    state: BatteryPersistentState,
    error?: string,
): BatteryRepositorySnapshot => {
    const hiddenDefaultBatteryIds = new Set(state.hiddenDefaultBatteryIds);
    const customBatteries = [...state.customBatteries].sort(
        (left, right) => left.displayName.localeCompare(right.displayName),
    );
    return {
        defaultBatteries,
        customBatteries,
        allBatteries: [...defaultBatteries, ...customBatteries],
        visibleDefaultBatteries: defaultBatteries.filter(
            (battery) => !hiddenDefaultBatteryIds.has(battery.id),
        ),
        hiddenDefaultBatteryIds,
        ...(error === undefined ? {} : { error }),
    };
};

export const createBatteryRepository = ({
    storage = typeof localStorage === "undefined" ? undefined : localStorage,
    storageEvents = typeof window === "undefined" ? undefined : window,
    defaultBatteries = batteryPresets,
}: {
    readonly storage?: BatteryStorage;
    readonly storageEvents?: BatteryStorageEvents;
    readonly defaultBatteries?: readonly DefaultBattery[];
} = {}): BatteryRepository => {
    const listeners = new Set<() => void>();
    const references = new Map<string, BatteryReferenceSource>();
    let state: BatteryPersistentState;
    let snapshot: BatteryRepositorySnapshot;

    const applyLoadedState = (): void => {
        const loaded = loadBatteryState(storage, defaultBatteries);
        if (loaded.kind === "valid") {
            state = loaded.state;
            snapshot = snapshotFromState(defaultBatteries, state);
        } else {
            state = initialBatteryState(defaultBatteries);
            snapshot = snapshotFromState(defaultBatteries, state, loaded.message);
        }
    };
    applyLoadedState();

    const publish = (): void => listeners.forEach((listener) => listener());
    const referencesFor = (batteryId: string): readonly string[] => [...references.values()]
        .filter((source) => new Set(source.batteryIds()).has(batteryId))
        .map((source) => source.label);
    const commit = (next: BatteryPersistentState): BatteryRepositoryResult => {
        if (snapshot.error) return { kind: "invalid", message: "Reset malformed battery data before editing it." };
        const error = saveBatteryState(storage, next);
        if (error) {
            snapshot = snapshotFromState(defaultBatteries, state, error);
            publish();
            return { kind: "invalid", message: error };
        }
        state = next;
        snapshot = snapshotFromState(defaultBatteries, state);
        publish();
        return { kind: "success" };
    };

    const onStorage = (event: StorageEvent): void => {
        if (event.key !== batteryStorageKey && event.key !== null) return;
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
        setDefaultVisible: (batteryId, visible) => {
            if (!defaultBatteries.some((battery) => battery.id === batteryId)) {
                return { kind: "invalid", message: "The built-in battery is unavailable." };
            }
            const hidden = new Set(state.hiddenDefaultBatteryIds);
            if (visible) hidden.delete(batteryId);
            else hidden.add(batteryId);
            return commit({ ...state, hiddenDefaultBatteryIds: [...hidden] });
        },
        saveCustomBattery: (candidate) => {
            const validation = validateCustomBattery(candidate, defaultBatteries);
            if (validation.kind === "invalid") return validation;
            const index = state.customBatteries.findIndex(
                (battery) => battery.id === validation.battery.id,
            );
            const customBatteries = [...state.customBatteries];
            if (index === -1) customBatteries.push(validation.battery);
            else customBatteries[index] = validation.battery;
            const result = commit({ ...state, customBatteries });
            return result.kind === "success"
                ? { kind: "success", battery: validation.battery }
                : result;
        },
        referencesFor,
        deleteCustomBattery: (batteryId) => {
            if (!state.customBatteries.some((battery) => battery.id === batteryId)) {
                return { kind: "invalid", message: "The custom battery is unavailable." };
            }
            const blockingReferences = referencesFor(batteryId);
            if (blockingReferences.length > 0) {
                return { kind: "blocked", references: blockingReferences };
            }
            return commit({
                ...state,
                customBatteries: state.customBatteries.filter((battery) => battery.id !== batteryId),
            });
        },
        reset: () => {
            const error = clearBatteryState(storage);
            if (error) return { kind: "invalid", message: error };
            state = initialBatteryState(defaultBatteries);
            snapshot = snapshotFromState(defaultBatteries, state);
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
