import { defaultLockSettings, normalizeLockSettings, type LockSettings } from './domain';

export type StorageLike = Readonly<Pick<Storage, 'getItem' | 'setItem'>>;

export type OhmPersistence = {
    readonly load: () => LockSettings;
    readonly save: (lockSettings: LockSettings) => void;
};

const versionedKey = 'steamengine.ohm.settings.v3' as const;
const legacyCookieKey = 'steamengine-ohm' as const;

const readCookie = (name: string, cookie: string): string | undefined => {
    const prefix = `${encodeURIComponent(name)}=`;
    const part = cookie.split(';').map((item) => item.trim()).find((item) => item.startsWith(prefix));
    return part ? decodeURIComponent(part.slice(prefix.length)) : undefined;
};

const parse = (raw: string | null | undefined): LockSettings | undefined => {
    if (!raw) return undefined;
    try {
        const parsed = JSON.parse(raw) as { lockSettings?: unknown };
        return normalizeLockSettings(parsed.lockSettings ?? parsed);
    } catch { return undefined; }
};

export const createOhmPersistence = (
    storage: StorageLike | undefined = typeof localStorage === 'undefined' ? undefined : localStorage,
    cookie = typeof document === 'undefined' ? '' : document.cookie
): OhmPersistence => ({
    load: () => parse(storage?.getItem(versionedKey))
        ?? parse(readCookie(legacyCookieKey, cookie))
        ?? { ...defaultLockSettings },
    save: (lockSettings) => {
        const payload = { version: 3, lockSettings: normalizeLockSettings(lockSettings) };
        storage?.setItem(versionedKey, JSON.stringify(payload));
    }
});
