import { describe, expect, it } from "vitest";
import { readTheme, saveTheme, themeStorageKey } from "./theme";

const memoryStorage = () => {
    const values: Record<string, string> = {};
    return {
        values,
        getItem: (key: string) => values[key] ?? null,
        setItem: (key: string, value: string) => { values[key] = value; },
    };
};

describe("site theme persistence", () => {
    it("defaults to dark and round-trips a versioned preference", () => {
        const storage = memoryStorage();
        expect(readTheme(storage)).toBe("dark");
        saveTheme("light", storage);
        expect(storage.values[themeStorageKey]).toBe('{"version":1,"theme":"light"}');
        expect(readTheme(storage)).toBe("light");
    });

    it("falls back to dark for malformed saved data", () => {
        const storage = memoryStorage();
        storage.setItem(themeStorageKey, '{"version":1,"theme":"sepia"}');
        expect(readTheme(storage)).toBe("dark");
    });
});
