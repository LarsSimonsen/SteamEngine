export const themeStorageKey = "steamengine.theme.v1";

export type SiteTheme = "dark" | "light";

type ThemeStorage = Readonly<Pick<Storage, "getItem" | "setItem">>;

export const readTheme = (
    storage: ThemeStorage | undefined = typeof localStorage === "undefined" ? undefined : localStorage,
): SiteTheme => {
    try {
        const raw = storage?.getItem(themeStorageKey);
        if (!raw) return "dark";
        const saved = JSON.parse(raw) as { readonly version?: unknown; readonly theme?: unknown };
        return saved.version === 1 && (saved.theme === "dark" || saved.theme === "light")
            ? saved.theme
            : "dark";
    } catch {
        return "dark";
    }
};

export const applyTheme = (theme: SiteTheme): void => {
    if (typeof document !== "undefined") document.documentElement.dataset.theme = theme;
};

export const saveTheme = (
    theme: SiteTheme,
    storage: ThemeStorage | undefined = typeof localStorage === "undefined" ? undefined : localStorage,
): void => {
    try {
        storage?.setItem(themeStorageKey, JSON.stringify({ version: 1, theme }));
    } catch {
        // Storage restrictions should not prevent switching themes.
    }
};
