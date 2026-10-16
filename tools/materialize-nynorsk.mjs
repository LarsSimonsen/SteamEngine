import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { toNynorskText, toNynorskValue } from "./nynorsk-machine-draft.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const force = process.argv.includes("--force");

const sourceText = (relativePath) => fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

const initializerFor = (relativePath, variableName) => {
    const filePath = path.join(projectRoot, relativePath);
    const source = sourceText(relativePath);
    const file = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    for (const statement of file.statements) {
        if (!ts.isVariableStatement(statement)) continue;
        for (const declaration of statement.declarationList.declarations) {
            if (ts.isIdentifier(declaration.name) && declaration.name.text === variableName
                && declaration.initializer) {
                return declaration.initializer.getText(file);
            }
        }
    }
    throw new Error(`Could not find ${variableName} in ${relativePath}`);
};

const serialize = (value, level = 0) => {
    const indent = "    ".repeat(level);
    const childIndent = "    ".repeat(level + 1);
    if (typeof value === "string") return JSON.stringify(value);
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (value === undefined) return "undefined";
    if (value === null) return "null";
    if (Array.isArray(value)) {
        if (value.length === 0) return "[]";
        const serialized = value.map((item) => serialize(item, level + 1)).join(`,\n${childIndent}`);
        return `[\n${childIndent}${serialized}\n${indent}]`;
    }
    if (typeof value === "function") throw new Error("Nynorsk catalog data contains an executable value");
    const entries = Object.entries(value);
    if (entries.length === 0) return "{}";
    return `{\n${childIndent}${entries.map(([key, item]) => `${JSON.stringify(key)}: ${serialize(item, level + 1)}`)
        .join(`,\n${childIndent}`)}\n${indent}}`;
};

const writeDraft = (relativePath, content) => {
    const destination = path.join(projectRoot, relativePath);
    if (fs.existsSync(destination) && !force) {
        throw new Error(`${relativePath} already exists; use --force only to regenerate a machine draft`);
    }
    fs.writeFileSync(destination, content, "utf8");
};

const server = await createServer({ root: projectRoot, logLevel: "error" });
try {
    const catalog = await server.ssrLoadModule("/src/i18n/catalog-presentations/nb.ts");
    const messagesObject = initializerFor("src/i18n/messages/nb.ts", "messages");
    const calculatorObject = initializerFor("src/i18n/calculator-messages/nb.ts", "messages");
    const header = "/* Machine-materialized draft. Human review may edit string values. */\n\n";

    const messagesDraft = `${header}import type { SharedMessages } from "../messages";\n\n`
        + `export const messages: SharedMessages = ${toNynorskText(messagesObject)};\n`;
    const calculatorDraft = `${header}import type { CalculatorMessages } from "../calculator-messages";\n\n`
        + `export const messages: CalculatorMessages = ${toNynorskText(calculatorObject)};\n`;
    writeDraft("src/i18n/messages/nn.ts", messagesDraft);
    writeDraft("src/i18n/calculator-messages/nn.ts", calculatorDraft);
    const catalogDraft = `${header}import type { CatalogPresentationSet } from "../catalog-presentations";\n\n`
        + `export const presentations: CatalogPresentationSet = ${serialize(toNynorskValue(catalog.presentations))};\n`;
    writeDraft(
        "src/i18n/catalog-presentations/nn.ts",
        catalogDraft,
    );
    console.log("Materialized explicit Nynorsk machine drafts.");
} finally {
    await server.close();
}
