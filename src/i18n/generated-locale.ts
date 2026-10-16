import { generatedLocaleData, generatedLocaleProvenance } from "./generated-locale-data";
import type { Locale } from "./locales";

type GeneratedLocale = Exclude<Locale, "en" | "nb" | "nn">;
type GeneratedRecord = Readonly<Record<string, string>>;

const generatedDataFor = (locale: Locale): GeneratedRecord | undefined =>
    generatedLocaleData[locale as GeneratedLocale] as GeneratedRecord | undefined;

const replaceArguments = (template: string, argumentsList: readonly unknown[]): string =>
    argumentsList.reduce<string>(
        (current, argument, index) => current.replaceAll(`__SE_ARG_${index}__`, String(argument)),
        template,
    );

const applyValue = <T>(value: T, key: string, translations: GeneratedRecord): T => {
    if (typeof value === "string") return (translations[key] ?? value) as T;
    if (typeof value === "function") {
        return ((...argumentsList: readonly unknown[]) => {
            const result = (value as (...args: readonly unknown[]) => unknown)(...argumentsList);
            const template = translations[key];
            return template === undefined ? result : replaceArguments(template, argumentsList);
        }) as T;
    }
    if (Array.isArray(value)) return value.map((item, index) => applyValue(item, `${key}.${index}`, translations)) as T;
    if (value !== null && typeof value === "object") {
        return Object.fromEntries(Object.entries(value).map(([childKey, childValue]) => [
            childKey,
            applyValue(childValue, `${key}.${childKey}`, translations),
        ])) as T;
    }
    return value;
};

export const applyGeneratedLocale = <T>(source: T, locale: Locale, group: string): T => {
    const translations = generatedDataFor(locale);
    return translations === undefined ? source : applyValue(source, group, translations);
};

export const generatedLocaleParityIssues = (): readonly string[] => {
    const issues: string[] = [];
    for (const [locale, data] of Object.entries(generatedLocaleData)) {
        if (!data || Object.keys(data).length === 0) issues.push(`${locale}:empty`);
        if (generatedLocaleProvenance[locale]?.reviewState !== "machine") issues.push(`${locale}:review-state`);
        if (generatedLocaleProvenance[locale]?.sources.length < 2) issues.push(`${locale}:sources`);
    }
    return issues;
};
