import { localeDefinitions, localeForCode, type Locale, type LocaleDefinition } from "./locales";

export const languagePreferenceStorageKey = "steamengine.language.v1";

export type LanguagePreferenceStorage = Pick<Storage, "getItem" | "setItem">;

type StoredLanguagePreference = {
    readonly version: 1;
    readonly locale: Locale;
};

const browserStorage = (): LanguagePreferenceStorage | undefined => {
    if (typeof localStorage === "undefined") return undefined;
    try {
        return localStorage;
    } catch {
        return undefined;
    }
};

const normalizedLanguageTag = (value: string): string => value.trim().replaceAll("_", "-").toLowerCase();

const definitionForLanguageTag = (
    languageTag: string,
    definitions: readonly LocaleDefinition[] = localeDefinitions,
): LocaleDefinition | undefined => {
    const normalized = normalizedLanguageTag(languageTag);
    if (!normalized) return undefined;

    const exact = definitions.find((definition) => [definition.code, definition.htmlLang]
        .some((value) => normalizedLanguageTag(value) === normalized));
    if (exact) return exact;

    const base = normalized.split("-")[0];
    if (base === "no") return definitions.find(({ code }) => code === "nb");
    if (base === "zh") return definitions.find(({ code }) => code === "zh-Hans");
    return definitions.find((definition) => [definition.code, definition.htmlLang]
        .some((value) => normalizedLanguageTag(value).split("-")[0] === base));
};

export const localeForLanguageTag = (languageTag: string): Locale | undefined =>
    definitionForLanguageTag(languageTag)?.code;

export const localeForBrowserLanguages = (languageTags: readonly string[]): Locale | undefined => {
    for (const languageTag of languageTags) {
        const locale = localeForLanguageTag(languageTag);
        if (locale) return locale;
    }
    return undefined;
};

export const readSavedLocale = (
    storage: LanguagePreferenceStorage | undefined = browserStorage(),
): Locale | undefined => {
    if (!storage) return undefined;
    try {
        const parsed = JSON.parse(storage.getItem(languagePreferenceStorageKey) ?? "null") as
            Partial<StoredLanguagePreference> | null;
        return parsed?.version === 1 && typeof parsed.locale === "string"
            ? localeForCode(parsed.locale)
            : undefined;
    } catch {
        return undefined;
    }
};

export const saveLocalePreference = (
    locale: Locale,
    storage: LanguagePreferenceStorage | undefined = browserStorage(),
): void => {
    if (!storage) return;
    try {
        const preference: StoredLanguagePreference = { version: 1, locale };
        storage.setItem(languagePreferenceStorageKey, JSON.stringify(preference));
    } catch {
        // Storage may be unavailable or blocked; language selection still works for this visit.
    }
};

const compareDefinitions = (left: LocaleDefinition, right: LocaleDefinition): number =>
    left.englishAlias.localeCompare(right.englishAlias, "en", { sensitivity: "base" })
    || left.code.localeCompare(right.code, "en", { sensitivity: "base" });

export const orderedLocaleDefinitions = (
    currentLocale: Locale,
    savedLocale: Locale | undefined,
    browserLanguages: readonly string[],
): readonly LocaleDefinition[] => {
    const detectedLocale = savedLocale === undefined ? localeForBrowserLanguages(browserLanguages) : undefined;
    const prioritizedCodes: Locale[] = [];
    const prioritize = (locale: Locale | undefined): void => {
        if (locale !== undefined && !prioritizedCodes.includes(locale)) prioritizedCodes.push(locale);
    };

    if (currentLocale !== "en") prioritize(currentLocale);
    prioritize(savedLocale);
    prioritize(detectedLocale);
    prioritize("en");

    const prioritized = prioritizedCodes.flatMap((code) => {
        const definition = localeDefinitions.find(({ code: definitionCode }) => definitionCode === code);
        return definition ? [definition] : [];
    });
    const remaining = [...localeDefinitions]
        .filter(({ code }) => !prioritizedCodes.includes(code))
        .sort(compareDefinitions);
    return [...prioritized, ...remaining];
};
