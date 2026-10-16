import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const catalogOnly = args[0] === "--catalog-only";
const locale = args[catalogOnly ? 1 : 0];
if (!locale) {
    throw new Error(
        "Usage: node tools/materialize-generated-locale.mjs [--catalog-only] <locale> <language-name>",
    );
}

const languageName = args.slice(catalogOnly ? 2 : 1).join(" ");
if (!languageName) throw new Error("A language name is required for the generated-file headers.");

const write = (relativePath, content) => {
    const destination = path.join(projectRoot, relativePath);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, content, "utf8");
};

const serialize = (value, sourceValue = value) => {
    if (typeof value === "function") {
        const placeholders = Array.from({ length: sourceValue.length }, (_, index) => `__SE_ARG_${index}__`);
        const template = value(...placeholders);
        return `(...args: unknown[]) => ${JSON.stringify(template)}`
            + `.replace(/__SE_ARG_(\\d+)__/g, (_, index) => String(args[Number(index)] ?? ""))`
            + `.replace(/__se_arg_(\\d+)__/g, (_, index) => String(args[Number(index)] ?? ""))`;
    }
    if (Array.isArray(value)) {
        return `[${value.map((child, index) => serialize(child, sourceValue[index])).join(", ")}]`;
    }
    if (value !== null && typeof value === "object") {
        return `{ ${Object.entries(value).map(([key, child]) =>
            `${JSON.stringify(key)}: ${serialize(child, sourceValue[key])}`).join(", ")} }`;
    }
    return JSON.stringify(value);
};

const protectedCatalogKeys = new Set(["expression", "formula", "formulas", "id", "slug", "unit", "url", "wikipediaUrl"]);
const restoreProtectedCatalogValues = (translated, source, key = "") => {
    if (protectedCatalogKeys.has(key)) return source;
    if (Array.isArray(translated)) {
        return translated.map((item, index) => restoreProtectedCatalogValues(item, source[index]));
    }
    if (translated !== null && typeof translated === "object") {
        const restored = Object.fromEntries(Object.entries(translated).map(([childKey, childValue]) => [
            childKey,
            restoreProtectedCatalogValues(childValue, source[childKey], childKey),
        ]));
        const symbolColumn = Array.isArray(source?.headers) ? source.headers.indexOf("Symbol") : -1;
        if (symbolColumn >= 0 && Array.isArray(source.rows) && Array.isArray(restored.rows)) {
            restored.rows = restored.rows.map((row, index) => {
                if (!Array.isArray(row) || !Array.isArray(source.rows[index])) return row;
                const restoredRow = [...row];
                restoredRow[symbolColumn] = source.rows[index][symbolColumn];
                return restoredRow;
            });
        }
        return restored;
    }
    return translated;
};

const header = `/* Machine-materialized ${languageName} draft. Human review may edit string values. */\n`;
const server = await createServer({
    root: projectRoot,
    logLevel: "error",
    configFile: false,
    appType: "custom",
    optimizeDeps: { noDiscovery: true },
    server: { middlewareMode: true, watch: null, hmr: false, ws: false },
});
try {
    const messagesModule = catalogOnly ? null : await server.ssrLoadModule("/src/i18n/messages.ts");
    const calculatorModule = catalogOnly ? null : await server.ssrLoadModule("/src/i18n/calculator-messages.ts");
    const comparisonModule = catalogOnly ? null : await server.ssrLoadModule("/src/i18n/comparison-messages.ts");
    const generatedModule = catalogOnly ? null : await server.ssrLoadModule("/src/i18n/generated-locale.ts");
    const catalogModule = catalogOnly
        ? await (async () => {
            const englishModule = await server.ssrLoadModule("/src/i18n/catalog-presentations/en.ts");
            const localePresentationModule = await server.ssrLoadModule(
                `/src/i18n/catalog-presentations/${locale}.ts`,
            );
            const localeTextModule = localePresentationModule.batteryTexts
                ? localePresentationModule
                : await server.ssrLoadModule(`/src/i18n/catalog-presentations/${locale}-texts.ts`);
            return {
                catalogPresentations: {
                    en: englishModule.presentations,
                    [locale]: localePresentationModule.presentations,
                },
                batteryTextTranslations: {
                    en: englishModule.batteryTexts,
                    [locale]: localeTextModule.batteryTexts,
                },
                materialTextTranslations: {
                    en: englishModule.materialTexts,
                    [locale]: localeTextModule.materialTexts,
                },
                modTextTranslations: {
                    en: englishModule.modTexts,
                    [locale]: localeTextModule.modTexts,
                },
            };
        })()
        : await server.ssrLoadModule("/src/i18n/catalog-presentations.ts");

    if (!catalogOnly) {
        const messages = generatedModule.applyGeneratedLocale(messagesModule.english, locale, "messages");
        write(
            `src/i18n/messages/${locale}.ts`,
            `${header}export const messages = ${serialize(messages, messagesModule.english)} as const;\n`,
        );

        const calculators = generatedModule.applyGeneratedLocale(calculatorModule.english, locale, "calculators");
        for (const [calculator, values] of Object.entries(calculators)) {
            write(
                `src/i18n/calculator-messages/${calculator}/${locale}.ts`,
                `${header}export const messages = ${serialize(
                    values,
                    calculatorModule.english[calculator],
                )} as const;\n`,
            );
        }

        const comparisons = generatedModule.applyGeneratedLocale(
            comparisonModule.comparisonMessages.en,
            locale,
            "comparisons",
        );
        for (const [category, values] of Object.entries(comparisons)) {
            write(
                `src/i18n/comparison-messages/${category}/${locale}.ts`,
                `${header}export const messages = ${serialize(
                    values,
                    comparisonModule.comparisonMessages.en[category],
                )} as const;\n`,
            );
        }
    }

    const {
        batteries: _batteries,
        materials: _materials,
        mods: _mods,
        ...englishCatalogPresentations
    } = catalogModule.catalogPresentations.en;
    const catalog = catalogOnly
        ? Object.fromEntries(Object.entries(catalogModule.catalogPresentations[locale])
            .filter(([key]) => !["batteries", "materials", "mods"].includes(key)))
        : restoreProtectedCatalogValues(
            generatedModule.applyGeneratedLocale(englishCatalogPresentations, locale, "catalog"),
            englishCatalogPresentations,
        );
    const batteryTexts = catalogOnly
        ? catalogModule.batteryTextTranslations[locale]
        : generatedModule.applyGeneratedLocale(
            catalogModule.batteryTextTranslations.en,
            locale,
            "catalogText",
        );
    const materialTexts = catalogOnly
        ? catalogModule.materialTextTranslations[locale]
        : generatedModule.applyGeneratedLocale(
            catalogModule.materialTextTranslations.en,
            locale,
            "catalogText",
        );
    const modTexts = catalogOnly
        ? catalogModule.modTextTranslations[locale]
        : generatedModule.applyGeneratedLocale(
            catalogModule.modTextTranslations.en,
            locale,
            "catalogText",
        );
    write(
        `src/i18n/catalog-presentations/${locale}.ts`,
        `${header}\nimport type { CatalogPresentationSet } from "../catalog-presentations";\n`
        + "import { batteryPresentationsFor, type BatteryTextDictionary } from "
        + '"../battery-presentation-text";\n'
        + "import { materialPresentationsFor, type MaterialTextDictionary } from "
        + '"../material-presentation-text";\n'
        + "import { modPresentationsFor, type ModTextDictionary } from "
        + '"../mod-presentation-text";\n\n'
        + `export const batteryTexts: BatteryTextDictionary = ${serialize(
            batteryTexts,
            catalogModule.batteryTextTranslations.en,
        )};\n\n`
        + `export const materialTexts: MaterialTextDictionary = ${serialize(
            materialTexts,
            catalogModule.materialTextTranslations.en,
        )};\n\n`
        + `export const modTexts: ModTextDictionary = ${serialize(
            modTexts,
            catalogModule.modTextTranslations.en,
        )};\n\n`
        + `export const presentations: CatalogPresentationSet = { ${Object.entries(catalog).map(([key, value]) =>
            `${JSON.stringify(key)}: ${serialize(value, englishCatalogPresentations[key])}`).join(", ")}, `
        + "materials: materialPresentationsFor(materialTexts), "
        + "batteries: batteryPresentationsFor(batteryTexts), mods: modPresentationsFor(modTexts) };\n",
    );
} finally {
    await server.close();
}

console.log(`Materialized locale-owned ${languageName} files for ${locale}.`);
