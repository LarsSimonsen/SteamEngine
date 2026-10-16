import path from "node:path";
import { pathToFileURL } from "node:url";
import type { Plugin } from "vite";
import type { Locale } from "../i18n/locales";

const virtualPrefix = "\0steam-engine-partial-locale:";

const fileImport = (filePath: string): string => JSON.stringify(pathToFileURL(filePath).href);

const normalizedCandidates = (source: string, importer: string | undefined): string[] => {
    const candidates = [source];
    if (importer && !importer.startsWith("\0")) candidates.push(path.resolve(path.dirname(importer), source));
    return candidates.flatMap((candidate) => {
        const normalized = path.normalize(candidate);
        return [normalized, normalized.endsWith(".ts") ? normalized.slice(0, -3) : `${normalized}.ts`];
    });
};

const makeMessagesFacade = (root: string, locale: Locale): string => {
    const englishPath = path.join(root, "src", "i18n", "messages", "en.ts");
    const selectedPath = path.join(root, "src", "i18n", "messages", `${locale}.ts`);
    if (locale === "en") {
        return `import { messages as english } from ${fileImport(englishPath)};
export { english };
export const messages = { en: english };
export const messagesFor = (locale) => messages[locale] ?? english;
`;
    }
    return `import { messages as english } from ${fileImport(englishPath)};
import { messages as selected } from ${fileImport(selectedPath)};
export { english };
export const messages = { en: english, ${JSON.stringify(locale)}: selected };
export const messagesFor = (locale) => messages[locale] ?? selected;
`;
};

const makeCalculatorMessagesFacade = (root: string, locale: Locale): string => {
    const routes = ["batt", "coil", "converter", "juice", "modrange", "tcr", "wirewiz"] as const;
    const imports = routes.map((route) => {
        const modulePath = path.join(root, "src", "i18n", "calculator-messages", route, `${locale}.ts`);
        return `import { messages as ${route} } from ${fileImport(modulePath)};`;
    }).join("\n");
    const calculatorMessages = `{ ${routes.map((route) => `${route}`).join(", ")} }`;
    return `${imports}
export const calculatorMessages = { ${JSON.stringify(locale)}: ${calculatorMessages} };
export const calculatorMessagesFor = (locale) => calculatorMessages[locale] ?? ${calculatorMessages};
`;
};

const makeComparisonMessagesFacade = (root: string, locale: Locale): string => {
    const batteryPath = path.join(root, "src", "i18n", "comparison-messages", "batteries", `${locale}.ts`);
    const materialPath = path.join(root, "src", "i18n", "comparison-messages", "materials", `${locale}.ts`);
    const modPath = path.join(root, "src", "i18n", "comparison-messages", "mods", `${locale}.ts`);
    return `import { messages as batteries } from ${fileImport(batteryPath)};
import { messages as materials } from ${fileImport(materialPath)};
import { messages as mods } from ${fileImport(modPath)};
export const comparisonMessages = { ${JSON.stringify(locale)}: { batteries, materials, mods } };
export const comparisonMessagesFor = (locale) => comparisonMessages[locale] ?? { batteries, materials, mods };
`;
};

const makeCatalogPresentationsFacade = (root: string, locale: Locale): string => {
    const selectedPath = path.join(root, "src", "i18n", "catalog-presentations", `${locale}.ts`);
    return `import { presentations as selected } from ${fileImport(selectedPath)};
export const catalogPresentations = { ${JSON.stringify(locale)}: selected };
export const catalogPresentationFor = (locale, category, id) => {
    const presentation = (catalogPresentations[locale] ?? selected)[category]?.[id];
    if (!presentation) throw new Error(\`Missing \${locale} catalog presentation for \${category}:\${id}\`);
    return presentation;
};
export const missingCatalogPresentationKeys = () => [];
export const assertCatalogPresentationCoverage = () => undefined;
`;
};

export const createPartialLocaleDataPlugin = (root: string, locale: Locale): Plugin => {
    const targets = new Map([
        [path.normalize(path.join(root, "src", "i18n", "messages.ts")), makeMessagesFacade(root, locale)],
        [path.normalize(path.join(root, "src", "i18n", "calculator-messages.ts")),
            makeCalculatorMessagesFacade(root, locale)],
        [path.normalize(path.join(root, "src", "i18n", "comparison-messages.ts")),
            makeComparisonMessagesFacade(root, locale)],
        [path.normalize(path.join(root, "src", "i18n", "catalog-presentations.ts")),
            makeCatalogPresentationsFacade(root, locale)],
    ]);

    return {
        name: "partial-locale-data",
        enforce: "pre",
        resolveId(source, importer) {
            const target = normalizedCandidates(source, importer).find((candidate) => targets.has(candidate));
            return target ? `${virtualPrefix}${target}` : undefined;
        },
        load(id) {
            return id.startsWith(virtualPrefix) ? targets.get(id.slice(virtualPrefix.length)) : undefined;
        },
    };
};
