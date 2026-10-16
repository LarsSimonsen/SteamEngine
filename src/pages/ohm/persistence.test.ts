import { describe, expect, it } from 'vitest';
import { createOhmPersistence } from './persistence';

const fakeStorage = (values: Record<string, string> = {}) => ({
    getItem: (key: string) => values[key] ?? null,
    setItem: (key: string, value: string) => { values[key] = value; }
});

describe('OhmCalc persistence', () => {
    it('migrates the legacy cookie format and writes only the versioned format', () => {
        const storage = fakeStorage();
        const adapter = createOhmPersistence(storage, 'steamengine-ohm=%7B%22rlock%22%3A%22p%22%7D');
        const settings = adapter.load();
        expect(settings.resistanceTarget).toBe('power');
        adapter.save(settings);
        const saved = storage.getItem('steamengine.ohm.settings.v3')!;
        expect(saved).toContain('"version":3');
        expect(saved).toContain('"resistanceTarget":"power"');
        expect(saved).not.toContain('"rlock"');
        expect(storage.getItem('steamengine.ohm.settings.v2')).toBeNull();
    });

    it('prefers the new versioned settings', () => {
        const storage = fakeStorage({
            'steamengine.ohm.settings.v3': JSON.stringify({
                version: 3,
                lockSettings: { resistanceTarget: 'current' }
            }),
            'steamengine-ohm': JSON.stringify({ rlock: 'p' })
        });
        expect(createOhmPersistence(storage).load().resistanceTarget).toBe('current');
    });
});
