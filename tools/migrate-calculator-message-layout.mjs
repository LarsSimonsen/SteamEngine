import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const locales = ["en", "nb", "nn"];
const routes = ["batt", "coil", "converter", "juice", "modrange", "tcr", "wirewiz"];
const bundleDirectory = path.join(projectRoot, "src", "i18n", "calculator-messages");

const identifierPattern = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

const serialize = (value, indent = 0) => {
    if (typeof value === "string") return JSON.stringify(value);
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (value === null) return "null";
    if (Array.isArray(value)) {
        const entries = value.map((item) => serialize(item, indent + 4));
        return entries.length === 0
            ? "[]"
            : `[\n${" ".repeat(indent + 4)}${entries.join(`,\n${" ".repeat(indent + 4)}`)}\n${" ".repeat(indent)}]`;
    }
    if (typeof value !== "object") throw new Error("Calculator messages contain an unsupported value");
    const entries = Object.entries(value);
    if (entries.length === 0) return "{}";
    const lines = entries.map(([key, item]) => {
        const property = identifierPattern.test(key) ? key : JSON.stringify(key);
        return `${" ".repeat(indent + 4)}${property}: ${serialize(item, indent + 4)}`;
    });
    return `{\n${lines.join(",\n")}\n${" ".repeat(indent)}}`;
};

const importsFor = (locale, variablePrefix) => routes.map((route) =>
    `import { messages as ${variablePrefix}${route} } from "./calculator-messages/${route}/${locale}";`
).join("\n");

const objectForLocale = (variablePrefix) => `{
    batt: ${variablePrefix}batt,
    coil: ${variablePrefix}coil,
    converter: ${variablePrefix}converter,
    juice: ${variablePrefix}juice,
    modrange: ${variablePrefix}modrange,
    tcr: ${variablePrefix}tcr,
    wirewiz: ${variablePrefix}wirewiz,
}`;

const writeAggregator = () => {
    const imports = locales.map((locale) => {
        const prefix = locale === "en" ? "english" : locale === "nb" ? "bokmaal" : "nynorsk";
        return importsFor(locale, prefix);
    }).join("\n");
    const declarations = [
        ["english", "english"],
        ["bokmaal", "bokmaal"],
        ["nynorsk", "nynorsk"],
    ].map(([name, prefix]) => `const ${name}: CalculatorMessages = ${objectForLocale(prefix)};`).join("\n\n");
    const content = `import type { Locale } from "./locales";\n\n`
        + `export type CalculatorRouteMessages = Readonly<Record<string, string>>;\n\n`
        + `export type CalculatorMessages = Readonly<{\n`
        + routes.map((route) => `    readonly ${route}: CalculatorRouteMessages;`).join("\n")
        + `\n}>;\n\n${imports}\n\n${declarations}\n\n`
        + `export { english, bokmaal, nynorsk };\n\n`
        + `export const calculatorMessages: Readonly<Record<Locale, CalculatorMessages>> = {\n`
        + `    en: english,\n    nb: bokmaal,\n    nn: nynorsk,\n};\n\n`
        + `export const calculatorMessagesFor = (locale: Locale): CalculatorMessages => calculatorMessages[locale];\n\n`
        + `export const calculatorMessageParityIssues = (): readonly string[] => {\n`
        + `    const issues: string[] = [];\n`
        + `    for (const route of Object.keys(english) as Array<keyof CalculatorMessages>) {\n`
        + `        const englishKeys = Object.keys(english[route]).sort();\n`
        + `        for (const locale of Object.keys(calculatorMessages) as Locale[]) {\n`
        + `            const localeKeys = Object.keys(calculatorMessages[locale][route]).sort();\n`
        + `            if (JSON.stringify(englishKeys) !== JSON.stringify(localeKeys)) {\n`
        + `                issues.push(\`${"${locale}"}:${"${route}"}\`);\n`
        + `            }\n        }\n    }\n    return issues;\n};\n`;
    fs.writeFileSync(path.join(projectRoot, "src", "i18n", "calculator-messages.ts"), content, "utf8");
};

const server = await createServer({ root: projectRoot, logLevel: "error" });
try {
    const modules = {};
    for (const locale of locales) {
        modules[locale] = await server.ssrLoadModule(`/src/i18n/calculator-messages/${locale}.ts`);
    }
    for (const route of routes) {
        const routeDirectory = path.join(bundleDirectory, route);
        fs.mkdirSync(routeDirectory, { recursive: true });
        for (const locale of locales) {
            const messages = modules[locale].messages?.[route];
            if (!messages) throw new Error(`Missing ${locale} messages for ${route}`);
            const formatted = serialize(messages);
            fs.writeFileSync(
                path.join(routeDirectory, `${locale}.ts`),
                `import type { CalculatorRouteMessages } from "../../calculator-messages";\n\n`
                    + `export const messages: CalculatorRouteMessages = ${formatted};\n`,
                "utf8",
            );
        }
    }
} finally {
    await server.close();
}

writeAggregator();
for (const locale of locales) fs.rmSync(path.join(bundleDirectory, `${locale}.ts`));
console.log("Moved calculator messages into per-calculator locale folders.");
