import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const read = (relativePath) => fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
const write = (relativePath, content) => {
    const destination = path.join(projectRoot, relativePath);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, content, "utf8");
};

const sourceFileFor = (relativePath, source) => ts.createSourceFile(
    path.join(projectRoot, relativePath),
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
);

const variableFor = (relativePath, variableName) => {
    const source = read(relativePath);
    const file = sourceFileFor(relativePath, source);
    for (const statement of file.statements) {
        if (!ts.isVariableStatement(statement)) continue;
        for (const declaration of statement.declarationList.declarations) {
            if (ts.isIdentifier(declaration.name) && declaration.name.text === variableName && declaration.initializer) {
                return {
                    source,
                    file,
                    statement,
                    initializer: declaration.initializer.getText(file),
                };
            }
        }
    }
    throw new Error(`Could not find ${variableName} in ${relativePath}`);
};

const writeMessages = () => {
    const relativePath = "src/i18n/messages.ts";
    const source = read(relativePath);
    const file = sourceFileFor(relativePath, source);
    const english = variableFor(relativePath, "english");
    const bokmaal = variableFor(relativePath, "bokmaal");
    const typeStart = source.indexOf("export type SharedMessages");
    const typeBlock = source.slice(typeStart, english.statement.getStart(file)).trim();
    const suffix = source.slice(source.indexOf("export const messages:")).trimStart();

    write("src/i18n/messages/en.ts", `import type { SharedMessages } from "../messages";\n\n`
        + `export const messages: SharedMessages = ${english.initializer};\n`);
    write("src/i18n/messages/nb.ts", `import type { SharedMessages } from "../messages";\n\n`
        + `export const messages: SharedMessages = ${bokmaal.initializer};\n`);

    const main = `import type { Locale } from "./locales";\n`
        + `import type { OhmField } from "../pages/ohm/domain";\n\n`
        + `${typeBlock}\n\n`
        + `import { messages as english } from "./messages/en";\n`
        + `import { messages as bokmaal } from "./messages/nb";\n`
        + `import { messages as nynorsk } from "./messages/nn";\n\n`
        + `export { english, bokmaal, nynorsk };\n\n${suffix}\n`;
    write(relativePath, main);
};

const writeCalculatorMessages = () => {
    const relativePath = "src/i18n/calculator-messages.ts";
    const source = read(relativePath);
    const file = sourceFileFor(relativePath, source);
    const english = variableFor(relativePath, "english");
    const bokmaal = variableFor(relativePath, "bokmaal");
    const typeStart = source.indexOf("export type CalculatorRouteMessages");
    const typeBlock = source.slice(typeStart, english.statement.getStart(file)).trim();
    const suffix = source.slice(source.indexOf("export const calculatorMessages:")).trimStart();

    write("src/i18n/calculator-messages/en.ts", `import type { CalculatorMessages } from "../calculator-messages";\n\n`
        + `export const messages: CalculatorMessages = ${english.initializer};\n`);
    write("src/i18n/calculator-messages/nb.ts", `import type { CalculatorMessages } from "../calculator-messages";\n\n`
        + `export const messages: CalculatorMessages = ${bokmaal.initializer};\n`);

    const main = `import type { Locale } from "./locales";\n\n`
        + `${typeBlock}\n\n`
        + `import { messages as english } from "./calculator-messages/en";\n`
        + `import { messages as bokmaal } from "./calculator-messages/nb";\n`
        + `import { messages as nynorsk } from "./calculator-messages/nn";\n\n`
        + `export { english, bokmaal, nynorsk };\n\n${suffix}\n`;
    write(relativePath, main);
};

const catalogImports = `import { batteryPresets } from "../../catalogs/batteries/defaults";\n`
    + `import { concepts } from "../../catalogs/concepts/catalog";\n`
    + `import { builtInPresets } from "../../catalogs/mods/presets";\n`
    + `import { materials } from "../../catalogs/materials/catalog";\n`
    + `import type { CatalogPresentation, CatalogPresentationSet } from "../catalog-presentations";\n\n`;

const writeCatalogPresentations = () => {
    const relativePath = "src/i18n/catalog-presentations.ts";
    const source = read(relativePath);
    const file = sourceFileFor(relativePath, source);
    const english = variableFor(relativePath, "english");
    const bokmaalConcepts = variableFor(relativePath, "bokmaalConcepts");
    const bokmaal = variableFor(relativePath, "bokmaal");
    const helperStart = source.indexOf("const recordFor");
    const helperBlock = source.slice(helperStart, english.statement.getStart(file)).trim();
    const bokmaalBlock = source.slice(bokmaalConcepts.statement.getStart(file), bokmaal.statement.end).trim();
    const suffix = source.slice(source.indexOf("export const catalogPresentations:")).trimStart();
    const typeStart = source.indexOf("export type CatalogPresentation");
    const typeBlock = source.slice(typeStart, helperStart).trim();

    write("src/i18n/catalog-presentations/en.ts", `${catalogImports}${helperBlock}\n\n`
        + `export const presentations: CatalogPresentationSet = ${english.initializer};\n`);
    write("src/i18n/catalog-presentations/nb.ts", `${catalogImports}`
        + `import { presentations as english } from "./en";\n\n${helperBlock}\n\n`
        + `${bokmaalBlock.replace("export const bokmaal", "export const presentations")}\n`);

    const nynorsk = read("src/i18n/nynorsk-catalog-presentations.ts")
        .replace('from "./catalog-presentations"', 'from "../catalog-presentations"')
        .replace("export const nynorsk:", "export const presentations:");
    write("src/i18n/catalog-presentations/nn.ts", nynorsk);

    const mainImports = `import type { Locale } from "./locales";\n`
        + `import { batteryPresets } from "../catalogs/batteries/defaults";\n`
        + `import { concepts, type ConceptSection } from "../catalogs/concepts/catalog";\n`
        + `import { builtInPresets } from "../catalogs/mods/presets";\n`
        + `import { materials } from "../catalogs/materials/catalog";\n`
        + `import type { CatalogCategory } from "../pages/encyclopedia/routes";\n\n`;
    const main = `${mainImports}${typeBlock}\n\n`
        + `import { presentations as english } from "./catalog-presentations/en";\n`
        + `import { presentations as bokmaal } from "./catalog-presentations/nb";\n`
        + `import { presentations as nynorsk } from "./catalog-presentations/nn";\n\n`
        + `${suffix}\n`;
    write(relativePath, main);
};

const copyNynorsk = (sourcePath, destinationPath, importPath) => {
    const source = read(sourcePath)
        .replace(/from "\.\/[^\"]+"/, `from "${importPath}"`)
        .replace(/export const nynorsk:/, "export const messages:");
    write(destinationPath, source);
};

writeMessages();
writeCalculatorMessages();
copyNynorsk("src/i18n/nynorsk-messages.ts", "src/i18n/messages/nn.ts", "../messages");
copyNynorsk(
    "src/i18n/nynorsk-calculator-messages.ts",
    "src/i18n/calculator-messages/nn.ts",
    "../calculator-messages",
);
writeCatalogPresentations();
for (const file of [
    "src/i18n/nynorsk-messages.ts",
    "src/i18n/nynorsk-calculator-messages.ts",
    "src/i18n/nynorsk-catalog-presentations.ts",
]) fs.unlinkSync(path.join(projectRoot, file));
console.log("Split i18n source data into locale-owned files.");
