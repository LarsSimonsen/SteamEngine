export class BackendRequestError extends Error {
    readonly endpoint: string;
    readonly status?: number;
    readonly responseMessage?: string;

    constructor(message: string, endpoint: string, status?: number, responseMessage?: string) {
        super(message);
        this.name = "BackendRequestError";
        this.endpoint = endpoint;
        this.status = status;
        this.responseMessage = responseMessage;
    }
}

const apiCachePrefix = "steamengine.api-cache.v1.";
const apiCacheSchemaVersion = 1;
const apiCacheTtlMilliseconds = 365 * 24 * 60 * 60 * 1000;
const apiCacheHighWaterMarkBytes = 2 * 1024 * 1024;
const apiCacheLowWaterMarkBytes = 1 * 1024 * 1024;

type StoredCacheEntry = {
    readonly key: string;
    readonly value: unknown;
    readonly lastUsed: number;
};

type StoredEndpointCache = {
    readonly schemaVersion: number;
    readonly entries: Readonly<Record<string, StoredCacheEntry>>;
};

type EndpointCacheState = {
    readonly storageKey: string;
    cache: StoredEndpointCache;
    sizeBytes: number;
};

type RequestCacheIdentity = Readonly<{
    readonly method: string;
    readonly url: string;
    readonly headers: readonly (readonly [string, string])[];
    readonly body: string | null;
}>;

type CacheLookup<T> = Readonly<{
    readonly hit: boolean;
    readonly value?: T;
}>;

const cacheStorage = (): Storage | undefined => {
    try {
        return typeof localStorage === "undefined" ? undefined : localStorage;
    } catch {
        return undefined;
    }
};

const byteLength = (value: string): number => {
    if (typeof TextEncoder !== "undefined") return new TextEncoder().encode(value).byteLength;
    return value.length;
};

const absoluteUrl = (url: string): string => {
    try {
        return typeof window === "undefined" ? new URL(url).href : new URL(url, window.location.href).href;
    } catch {
        return url;
    }
};

const endpointStorageKey = (url: string): string => {
    const parsedUrl = absoluteUrl(url);
    try {
        const parsed = new URL(parsedUrl);
        return `${apiCachePrefix}${encodeURIComponent(`${parsed.origin}${parsed.pathname}`)}`;
    } catch {
        return `${apiCachePrefix}${encodeURIComponent(parsedUrl.split("?")[0])}`;
    }
};

const requestBody = (body: BodyInit | null | undefined): string | null => {
    if (body === undefined || body === null) return null;
    if (typeof body === "string") return body;
    if (body instanceof URLSearchParams) return body.toString();
    return String(body);
};

const requestCacheKey = (url: string, init: RequestInit | undefined): string => {
    const headers = [...new Headers(init?.headers).entries()].sort(([first], [second]) => first.localeCompare(second));
    const identity: RequestCacheIdentity = {
        method: (init?.method ?? "GET").toUpperCase(),
        url: absoluteUrl(url),
        headers,
        body: requestBody(init?.body),
    };
    return JSON.stringify(identity);
};

const removeCacheEntry = (storage: Storage, storageKey: string): void => {
    try {
        storage.removeItem(storageKey);
    } catch {
        // Storage restrictions should not prevent using the backend.
    }
};

export const purgeApiResponseCache = (): void => {
    const storage = cacheStorage();
    if (!storage) return;
    const storageKeys: string[] = [];
    for (let index = 0; index < storage.length; index += 1) {
        const storageKey = storage.key(index);
        if (storageKey?.startsWith(apiCachePrefix)) storageKeys.push(storageKey);
    }
    storageKeys.forEach((storageKey) => removeCacheEntry(storage, storageKey));
};

const readEndpointCache = (
    storage: Storage,
    storageKey: string,
    now: number,
): EndpointCacheState | undefined => {
    let serialized: string | null;
    try {
        serialized = storage.getItem(storageKey);
    } catch {
        return undefined;
    }
    if (!serialized) return undefined;
    try {
        const parsed = JSON.parse(serialized) as StoredEndpointCache;
        if (parsed.schemaVersion !== apiCacheSchemaVersion || typeof parsed.entries !== "object"
            || parsed.entries === null) {
            removeCacheEntry(storage, storageKey);
            return undefined;
        }
        const entries: Record<string, StoredCacheEntry> = {};
        for (const [key, entry] of Object.entries(parsed.entries)) {
            if (entry?.key !== key || !Number.isFinite(entry.lastUsed)
                || now - entry.lastUsed > apiCacheTtlMilliseconds) continue;
            entries[key] = entry;
        }
        if (Object.keys(entries).length === 0) {
            removeCacheEntry(storage, storageKey);
            return undefined;
        }
        const cache: StoredEndpointCache = { schemaVersion: apiCacheSchemaVersion, entries };
        const nextSerialized = JSON.stringify(cache);
        if (nextSerialized !== serialized) storage.setItem(storageKey, nextSerialized);
        return { storageKey, cache, sizeBytes: byteLength(storageKey) + byteLength(nextSerialized) };
    } catch {
        removeCacheEntry(storage, storageKey);
        return undefined;
    }
};

const writeEndpointCache = (storage: Storage, state: EndpointCacheState): void => {
    try {
        if (Object.keys(state.cache.entries).length === 0) {
            removeCacheEntry(storage, state.storageKey);
            return;
        }
        storage.setItem(state.storageKey, JSON.stringify(state.cache));
    } catch {
        // Storage restrictions should not prevent using the backend.
    }
};

const endpointCacheStates = (storage: Storage, now: number): EndpointCacheState[] => {
    const states: EndpointCacheState[] = [];
    const storageKeys: string[] = [];
    for (let index = 0; index < storage.length; index += 1) {
        const storageKey = storage.key(index);
        if (storageKey) storageKeys.push(storageKey);
    }
    for (const storageKey of storageKeys) {
        if (!storageKey?.startsWith(apiCachePrefix)) continue;
        const state = readEndpointCache(storage, storageKey, now);
        if (state) states.push(state);
    }
    return states;
};

const reduceCacheIfNeeded = (storage: Storage, now: number): void => {
    let states: EndpointCacheState[];
    try {
        states = endpointCacheStates(storage, now);
    } catch {
        return;
    }
    let totalSizeBytes = states.reduce((total, state) => total + state.sizeBytes, 0);
    if (totalSizeBytes <= apiCacheHighWaterMarkBytes) return;

    const entries = states.flatMap((state) => Object.values(state.cache.entries)
        .map((entry) => ({ state, entry }))
        .sort((first, second) => first.entry.lastUsed - second.entry.lastUsed));
    for (const { state, entry } of entries) {
        if (totalSizeBytes <= apiCacheLowWaterMarkBytes) break;
        const entriesWithoutOldest = { ...state.cache.entries };
        delete entriesWithoutOldest[entry.key];
        const nextCache: StoredEndpointCache = {
            schemaVersion: apiCacheSchemaVersion,
            entries: entriesWithoutOldest,
        };
        const nextSerialized = JSON.stringify(nextCache);
        totalSizeBytes += byteLength(nextSerialized) - (state.sizeBytes - byteLength(state.storageKey));
        state.sizeBytes = byteLength(state.storageKey) + byteLength(nextSerialized);
        state.cache = nextCache;
    }
    states.forEach((state) => writeEndpointCache(storage, state));
};

const readCachedResponse = <T>(
    url: string,
    init: RequestInit | undefined,
    now: number,
): CacheLookup<T> => {
    try {
        const storage = cacheStorage();
        if (!storage) return { hit: false };
        const storageKey = endpointStorageKey(url);
        const state = readEndpointCache(storage, storageKey, now);
        const key = requestCacheKey(url, init);
        const entry = state?.cache.entries[key];
        if (!state || !entry) return { hit: false };
        const nextCache: StoredEndpointCache = {
            schemaVersion: apiCacheSchemaVersion,
            entries: { ...state.cache.entries, [key]: { ...entry, lastUsed: now } },
        };
        writeEndpointCache(storage, { ...state, cache: nextCache });
        reduceCacheIfNeeded(storage, now);
        return { hit: true, value: entry.value as T };
    } catch {
        return { hit: false };
    }
};

const storeResponse = (url: string, init: RequestInit | undefined, value: unknown, now: number): void => {
    try {
        const storage = cacheStorage();
        if (!storage) return;
        const storageKey = endpointStorageKey(url);
        const key = requestCacheKey(url, init);
        const current = readEndpointCache(storage, storageKey, now);
        const cache: StoredEndpointCache = {
            schemaVersion: apiCacheSchemaVersion,
            entries: {
                ...(current?.cache.entries ?? {}),
                [key]: { key, value, lastUsed: now },
            },
        };
        writeEndpointCache(storage, { storageKey, cache, sizeBytes: 0 });
        reduceCacheIfNeeded(storage, now);
    } catch {
        // Storage restrictions should not prevent using the backend.
    }
};

type BackendErrorListener = (
    error: BackendRequestError,
    retry: () => Promise<unknown>,
    cancel: () => void,
    reset: () => void,
) => void;
const listeners = new Set<BackendErrorListener>();

export const subscribeToBackendErrors = (listener: BackendErrorListener): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

export const requestJson = async <T>(
    url: string,
    init: RequestInit | undefined,
    label: string,
    cancel?: () => void,
    reset?: () => void,
): Promise<T> => {
    const now = Date.now();
    const cached = readCachedResponse<T>(url, init, now);
    if (cached.hit) return cached.value as T;

    try {
        const response = await fetch(url, init);
        const body = await response.json().catch(() => undefined) as { error?: string } | undefined;
        if (!response.ok) {
            throw new BackendRequestError(
                body?.error ?? `${label} returned HTTP ${response.status}.`,
                url,
                response.status,
                body?.error,
            );
        }
        if (body !== undefined) storeResponse(url, init, body, Date.now());
        return body as T;
    } catch (error: unknown) {
        const backendError = error instanceof BackendRequestError
            ? error
            : new BackendRequestError(
                error instanceof Error ? error.message : `${label} failed.`,
                url,
            );
        const retry = (): Promise<unknown> => requestJson<T>(url, init, label, cancel, reset);
        listeners.forEach((listener) => listener(backendError, retry, cancel ?? (() => undefined),
            reset ?? (() => undefined)));
        throw backendError;
    }
};
