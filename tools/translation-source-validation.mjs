import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import {
    entrySignatureFor,
    localeReviewStateFor,
    targetTranslationLocales,
    translationLocales,
} from "./translation-review-data.mjs";

const editableStringPlaceholder = "__SE_TRANSLATION_TEXT__";
const protectedPropertyNames = new Set([
    "category",
    "expression",
    "formula",
    "id",
    "locale",
    "route",
    "sectionId",
    "slug",
    "unit",
    "url",
    "wikipediaUrl",
]);

export const reviewBundleSourceFiles = Object.freeze({
    messages: "src/i18n/messages/en.ts",
    "calculator-messages": Object.freeze({
        batt: "src/i18n/calculator-messages/batt/en.ts",
        coil: "src/i18n/calculator-messages/coil/en.ts",
        converter: "src/i18n/calculator-messages/converter/en.ts",
        juice: "src/i18n/calculator-messages/juice/en.ts",
        modrange: "src/i18n/calculator-messages/modrange/en.ts",
        tcr: "src/i18n/calculator-messages/tcr/en.ts",
        wirewiz: "src/i18n/calculator-messages/wirewiz/en.ts",
    }),
    "comparison-messages": Object.freeze({
        batteries: "src/i18n/comparison-messages/batteries/en.ts",
    }),
    "catalog-presentations": Object.freeze({
        presentations: "src/i18n/catalog-presentations/en.ts",
        batteryTextModel: "src/i18n/battery-presentation-text.ts",
        materialTextModel: "src/i18n/material-presentation-text.ts",
        modTextModel: "src/i18n/mod-presentation-text.ts",
    }),
});

export const reviewBundleLocaleFiles = Object.freeze({
    messages: Object.freeze({
        en: "src/i18n/messages/en.ts",
        nb: "src/i18n/messages/nb.ts",
        nn: "src/i18n/messages/nn.ts",
        "zh-Hans": "src/i18n/messages/zh-Hans.ts",
        ar: "src/i18n/messages/ar.ts",
        es: "src/i18n/messages/es.ts",
        fr: "src/i18n/messages/fr.ts",
        pl: "src/i18n/messages/pl.ts",
        uk: "src/i18n/messages/uk.ts",
        it: "src/i18n/messages/it.ts",
        vi: "src/i18n/messages/vi.ts",
        de: "src/i18n/messages/de.ts",
        sv: "src/i18n/messages/sv.ts",
        da: "src/i18n/messages/da.ts",
        is: "src/i18n/messages/is.ts",
        hi: "src/i18n/messages/hi.ts",
        bn: "src/i18n/messages/bn.ts",
        pt: "src/i18n/messages/pt.ts",
        "pt-BR": "src/i18n/messages/pt-BR.ts",
        ja: "src/i18n/messages/ja.ts",
        ko: "src/i18n/messages/ko.ts",
        el: "src/i18n/messages/el.ts",
        tr: "src/i18n/messages/tr.ts",
        id: "src/i18n/messages/id.ts",
        fi: "src/i18n/messages/fi.ts",
    }),
    "calculator-messages": Object.freeze({
        batt: Object.freeze({
            en: "src/i18n/calculator-messages/batt/en.ts",
            nb: "src/i18n/calculator-messages/batt/nb.ts",
            nn: "src/i18n/calculator-messages/batt/nn.ts",
            "zh-Hans": "src/i18n/calculator-messages/batt/zh-Hans.ts",
            ar: "src/i18n/calculator-messages/batt/ar.ts",
            es: "src/i18n/calculator-messages/batt/es.ts",
            fr: "src/i18n/calculator-messages/batt/fr.ts",
            pl: "src/i18n/calculator-messages/batt/pl.ts",
            uk: "src/i18n/calculator-messages/batt/uk.ts",
            it: "src/i18n/calculator-messages/batt/it.ts",
            vi: "src/i18n/calculator-messages/batt/vi.ts",
            de: "src/i18n/calculator-messages/batt/de.ts",
            sv: "src/i18n/calculator-messages/batt/sv.ts",
            da: "src/i18n/calculator-messages/batt/da.ts",
            is: "src/i18n/calculator-messages/batt/is.ts",
            hi: "src/i18n/calculator-messages/batt/hi.ts",
            bn: "src/i18n/calculator-messages/batt/bn.ts",
            pt: "src/i18n/calculator-messages/batt/pt.ts",
            "pt-BR": "src/i18n/calculator-messages/batt/pt-BR.ts",
            ja: "src/i18n/calculator-messages/batt/ja.ts",
            ko: "src/i18n/calculator-messages/batt/ko.ts",
            el: "src/i18n/calculator-messages/batt/el.ts",
            tr: "src/i18n/calculator-messages/batt/tr.ts",
            id: "src/i18n/calculator-messages/batt/id.ts",
            fi: "src/i18n/calculator-messages/batt/fi.ts",
        }),
        coil: Object.freeze({
            en: "src/i18n/calculator-messages/coil/en.ts",
            nb: "src/i18n/calculator-messages/coil/nb.ts",
            nn: "src/i18n/calculator-messages/coil/nn.ts",
            "zh-Hans": "src/i18n/calculator-messages/coil/zh-Hans.ts",
            ar: "src/i18n/calculator-messages/coil/ar.ts",
            es: "src/i18n/calculator-messages/coil/es.ts",
            fr: "src/i18n/calculator-messages/coil/fr.ts",
            pl: "src/i18n/calculator-messages/coil/pl.ts",
            uk: "src/i18n/calculator-messages/coil/uk.ts",
            it: "src/i18n/calculator-messages/coil/it.ts",
            vi: "src/i18n/calculator-messages/coil/vi.ts",
            de: "src/i18n/calculator-messages/coil/de.ts",
            sv: "src/i18n/calculator-messages/coil/sv.ts",
            da: "src/i18n/calculator-messages/coil/da.ts",
            is: "src/i18n/calculator-messages/coil/is.ts",
            hi: "src/i18n/calculator-messages/coil/hi.ts",
            bn: "src/i18n/calculator-messages/coil/bn.ts",
            pt: "src/i18n/calculator-messages/coil/pt.ts",
            "pt-BR": "src/i18n/calculator-messages/coil/pt-BR.ts",
            ja: "src/i18n/calculator-messages/coil/ja.ts",
            ko: "src/i18n/calculator-messages/coil/ko.ts",
            el: "src/i18n/calculator-messages/coil/el.ts",
            tr: "src/i18n/calculator-messages/coil/tr.ts",
            id: "src/i18n/calculator-messages/coil/id.ts",
            fi: "src/i18n/calculator-messages/coil/fi.ts",
        }),
        converter: Object.freeze({
            en: "src/i18n/calculator-messages/converter/en.ts",
            nb: "src/i18n/calculator-messages/converter/nb.ts",
            nn: "src/i18n/calculator-messages/converter/nn.ts",
            "zh-Hans": "src/i18n/calculator-messages/converter/zh-Hans.ts",
            ar: "src/i18n/calculator-messages/converter/ar.ts",
            es: "src/i18n/calculator-messages/converter/es.ts",
            fr: "src/i18n/calculator-messages/converter/fr.ts",
            pl: "src/i18n/calculator-messages/converter/pl.ts",
            uk: "src/i18n/calculator-messages/converter/uk.ts",
            it: "src/i18n/calculator-messages/converter/it.ts",
            vi: "src/i18n/calculator-messages/converter/vi.ts",
            de: "src/i18n/calculator-messages/converter/de.ts",
            sv: "src/i18n/calculator-messages/converter/sv.ts",
            da: "src/i18n/calculator-messages/converter/da.ts",
            is: "src/i18n/calculator-messages/converter/is.ts",
            hi: "src/i18n/calculator-messages/converter/hi.ts",
            bn: "src/i18n/calculator-messages/converter/bn.ts",
            pt: "src/i18n/calculator-messages/converter/pt.ts",
            "pt-BR": "src/i18n/calculator-messages/converter/pt-BR.ts",
            ja: "src/i18n/calculator-messages/converter/ja.ts",
            ko: "src/i18n/calculator-messages/converter/ko.ts",
            el: "src/i18n/calculator-messages/converter/el.ts",
            tr: "src/i18n/calculator-messages/converter/tr.ts",
            id: "src/i18n/calculator-messages/converter/id.ts",
            fi: "src/i18n/calculator-messages/converter/fi.ts",
        }),
        juice: Object.freeze({
            en: "src/i18n/calculator-messages/juice/en.ts",
            nb: "src/i18n/calculator-messages/juice/nb.ts",
            nn: "src/i18n/calculator-messages/juice/nn.ts",
            "zh-Hans": "src/i18n/calculator-messages/juice/zh-Hans.ts",
            ar: "src/i18n/calculator-messages/juice/ar.ts",
            es: "src/i18n/calculator-messages/juice/es.ts",
            fr: "src/i18n/calculator-messages/juice/fr.ts",
            pl: "src/i18n/calculator-messages/juice/pl.ts",
            uk: "src/i18n/calculator-messages/juice/uk.ts",
            it: "src/i18n/calculator-messages/juice/it.ts",
            vi: "src/i18n/calculator-messages/juice/vi.ts",
            de: "src/i18n/calculator-messages/juice/de.ts",
            sv: "src/i18n/calculator-messages/juice/sv.ts",
            da: "src/i18n/calculator-messages/juice/da.ts",
            is: "src/i18n/calculator-messages/juice/is.ts",
            hi: "src/i18n/calculator-messages/juice/hi.ts",
            bn: "src/i18n/calculator-messages/juice/bn.ts",
            pt: "src/i18n/calculator-messages/juice/pt.ts",
            "pt-BR": "src/i18n/calculator-messages/juice/pt-BR.ts",
            ja: "src/i18n/calculator-messages/juice/ja.ts",
            ko: "src/i18n/calculator-messages/juice/ko.ts",
            el: "src/i18n/calculator-messages/juice/el.ts",
            tr: "src/i18n/calculator-messages/juice/tr.ts",
            id: "src/i18n/calculator-messages/juice/id.ts",
            fi: "src/i18n/calculator-messages/juice/fi.ts",
        }),
        modrange: Object.freeze({
            en: "src/i18n/calculator-messages/modrange/en.ts",
            nb: "src/i18n/calculator-messages/modrange/nb.ts",
            nn: "src/i18n/calculator-messages/modrange/nn.ts",
            "zh-Hans": "src/i18n/calculator-messages/modrange/zh-Hans.ts",
            ar: "src/i18n/calculator-messages/modrange/ar.ts",
            es: "src/i18n/calculator-messages/modrange/es.ts",
            fr: "src/i18n/calculator-messages/modrange/fr.ts",
            pl: "src/i18n/calculator-messages/modrange/pl.ts",
            uk: "src/i18n/calculator-messages/modrange/uk.ts",
            it: "src/i18n/calculator-messages/modrange/it.ts",
            vi: "src/i18n/calculator-messages/modrange/vi.ts",
            de: "src/i18n/calculator-messages/modrange/de.ts",
            sv: "src/i18n/calculator-messages/modrange/sv.ts",
            da: "src/i18n/calculator-messages/modrange/da.ts",
            is: "src/i18n/calculator-messages/modrange/is.ts",
            hi: "src/i18n/calculator-messages/modrange/hi.ts",
            bn: "src/i18n/calculator-messages/modrange/bn.ts",
            pt: "src/i18n/calculator-messages/modrange/pt.ts",
            "pt-BR": "src/i18n/calculator-messages/modrange/pt-BR.ts",
            ja: "src/i18n/calculator-messages/modrange/ja.ts",
            ko: "src/i18n/calculator-messages/modrange/ko.ts",
            el: "src/i18n/calculator-messages/modrange/el.ts",
            tr: "src/i18n/calculator-messages/modrange/tr.ts",
            id: "src/i18n/calculator-messages/modrange/id.ts",
            fi: "src/i18n/calculator-messages/modrange/fi.ts",
        }),
        tcr: Object.freeze({
            en: "src/i18n/calculator-messages/tcr/en.ts",
            nb: "src/i18n/calculator-messages/tcr/nb.ts",
            nn: "src/i18n/calculator-messages/tcr/nn.ts",
            "zh-Hans": "src/i18n/calculator-messages/tcr/zh-Hans.ts",
            ar: "src/i18n/calculator-messages/tcr/ar.ts",
            es: "src/i18n/calculator-messages/tcr/es.ts",
            fr: "src/i18n/calculator-messages/tcr/fr.ts",
            pl: "src/i18n/calculator-messages/tcr/pl.ts",
            uk: "src/i18n/calculator-messages/tcr/uk.ts",
            it: "src/i18n/calculator-messages/tcr/it.ts",
            vi: "src/i18n/calculator-messages/tcr/vi.ts",
            de: "src/i18n/calculator-messages/tcr/de.ts",
            sv: "src/i18n/calculator-messages/tcr/sv.ts",
            da: "src/i18n/calculator-messages/tcr/da.ts",
            is: "src/i18n/calculator-messages/tcr/is.ts",
            hi: "src/i18n/calculator-messages/tcr/hi.ts",
            bn: "src/i18n/calculator-messages/tcr/bn.ts",
            pt: "src/i18n/calculator-messages/tcr/pt.ts",
            "pt-BR": "src/i18n/calculator-messages/tcr/pt-BR.ts",
            ja: "src/i18n/calculator-messages/tcr/ja.ts",
            ko: "src/i18n/calculator-messages/tcr/ko.ts",
            el: "src/i18n/calculator-messages/tcr/el.ts",
            tr: "src/i18n/calculator-messages/tcr/tr.ts",
            id: "src/i18n/calculator-messages/tcr/id.ts",
            fi: "src/i18n/calculator-messages/tcr/fi.ts",
        }),
        wirewiz: Object.freeze({
            en: "src/i18n/calculator-messages/wirewiz/en.ts",
            nb: "src/i18n/calculator-messages/wirewiz/nb.ts",
            nn: "src/i18n/calculator-messages/wirewiz/nn.ts",
            "zh-Hans": "src/i18n/calculator-messages/wirewiz/zh-Hans.ts",
            ar: "src/i18n/calculator-messages/wirewiz/ar.ts",
            es: "src/i18n/calculator-messages/wirewiz/es.ts",
            fr: "src/i18n/calculator-messages/wirewiz/fr.ts",
            pl: "src/i18n/calculator-messages/wirewiz/pl.ts",
            uk: "src/i18n/calculator-messages/wirewiz/uk.ts",
            it: "src/i18n/calculator-messages/wirewiz/it.ts",
            vi: "src/i18n/calculator-messages/wirewiz/vi.ts",
            de: "src/i18n/calculator-messages/wirewiz/de.ts",
            sv: "src/i18n/calculator-messages/wirewiz/sv.ts",
            da: "src/i18n/calculator-messages/wirewiz/da.ts",
            is: "src/i18n/calculator-messages/wirewiz/is.ts",
            hi: "src/i18n/calculator-messages/wirewiz/hi.ts",
            bn: "src/i18n/calculator-messages/wirewiz/bn.ts",
            pt: "src/i18n/calculator-messages/wirewiz/pt.ts",
            "pt-BR": "src/i18n/calculator-messages/wirewiz/pt-BR.ts",
            ja: "src/i18n/calculator-messages/wirewiz/ja.ts",
            ko: "src/i18n/calculator-messages/wirewiz/ko.ts",
            el: "src/i18n/calculator-messages/wirewiz/el.ts",
            tr: "src/i18n/calculator-messages/wirewiz/tr.ts",
            id: "src/i18n/calculator-messages/wirewiz/id.ts",
            fi: "src/i18n/calculator-messages/wirewiz/fi.ts",
        }),
    }),
    "comparison-messages": Object.freeze({
        batteries: Object.freeze({
            en: "src/i18n/comparison-messages/batteries/en.ts",
            nb: "src/i18n/comparison-messages/batteries/nb.ts",
            nn: "src/i18n/comparison-messages/batteries/nn.ts",
            "zh-Hans": "src/i18n/comparison-messages/batteries/zh-Hans.ts",
            ar: "src/i18n/comparison-messages/batteries/ar.ts",
            es: "src/i18n/comparison-messages/batteries/es.ts",
            fr: "src/i18n/comparison-messages/batteries/fr.ts",
            pl: "src/i18n/comparison-messages/batteries/pl.ts",
            uk: "src/i18n/comparison-messages/batteries/uk.ts",
            it: "src/i18n/comparison-messages/batteries/it.ts",
            vi: "src/i18n/comparison-messages/batteries/vi.ts",
            de: "src/i18n/comparison-messages/batteries/de.ts",
            sv: "src/i18n/comparison-messages/batteries/sv.ts",
            da: "src/i18n/comparison-messages/batteries/da.ts",
            is: "src/i18n/comparison-messages/batteries/is.ts",
            hi: "src/i18n/comparison-messages/batteries/hi.ts",
            bn: "src/i18n/comparison-messages/batteries/bn.ts",
            pt: "src/i18n/comparison-messages/batteries/pt.ts",
            "pt-BR": "src/i18n/comparison-messages/batteries/pt-BR.ts",
            ja: "src/i18n/comparison-messages/batteries/ja.ts",
            ko: "src/i18n/comparison-messages/batteries/ko.ts",
            el: "src/i18n/comparison-messages/batteries/el.ts",
            tr: "src/i18n/comparison-messages/batteries/tr.ts",
            id: "src/i18n/comparison-messages/batteries/id.ts",
            fi: "src/i18n/comparison-messages/batteries/fi.ts",
        }),
    }),
    "catalog-presentations": Object.freeze({
        en: "src/i18n/catalog-presentations/en.ts",
        nb: "src/i18n/catalog-presentations/nb.ts",
        nn: "src/i18n/catalog-presentations/nn.ts",
        "zh-Hans": "src/i18n/catalog-presentations/zh-Hans.ts",
        ar: "src/i18n/catalog-presentations/ar.ts",
        es: "src/i18n/catalog-presentations/es.ts",
        fr: "src/i18n/catalog-presentations/fr.ts",
        pl: "src/i18n/catalog-presentations/pl.ts",
        uk: "src/i18n/catalog-presentations/uk.ts",
        it: "src/i18n/catalog-presentations/it.ts",
        vi: "src/i18n/catalog-presentations/vi.ts",
        de: "src/i18n/catalog-presentations/de.ts",
        sv: "src/i18n/catalog-presentations/sv.ts",
        da: "src/i18n/catalog-presentations/da.ts",
        is: "src/i18n/catalog-presentations/is.ts",
        hi: "src/i18n/catalog-presentations/hi.ts",
        bn: "src/i18n/catalog-presentations/bn.ts",
        pt: "src/i18n/catalog-presentations/pt.ts",
        "pt-BR": "src/i18n/catalog-presentations/pt-BR.ts",
        ja: "src/i18n/catalog-presentations/ja.ts",
        ko: "src/i18n/catalog-presentations/ko.ts",
        el: "src/i18n/catalog-presentations/el.ts",
        tr: "src/i18n/catalog-presentations/tr.ts",
        id: "src/i18n/catalog-presentations/id.ts",
        fi: "src/i18n/catalog-presentations/fi.ts",
    }),
});

const sourceFileFor = (filePath, sourceText) => ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
);

const propertyName = (name) => {
    if (name === undefined) return undefined;
    if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
    return undefined;
};

const isPropertyName = (node) => {
    const parent = node.parent;
    if (parent === undefined || !("name" in parent) || parent.name !== node) return false;
    return ts.isPropertyAssignment(parent) || ts.isMethodDeclaration(parent)
        || ts.isPropertyDeclaration(parent) || ts.isPropertySignature(parent)
        || ts.isMethodSignature(parent) || ts.isGetAccessorDeclaration(parent)
        || ts.isSetAccessorDeclaration(parent);
};

const isModuleSpecifier = (node) => {
    const parent = node.parent;
    return (ts.isImportDeclaration(parent) && parent.moduleSpecifier === node)
        || (ts.isExportDeclaration(parent) && parent.moduleSpecifier === node)
        || (ts.isImportTypeNode(parent) && parent.argument === node);
};

const isEditableString = (node) => !isPropertyName(node) && !isModuleSpecifier(node);

const structuralSource = (filePath, sourceText) => {
    const sourceFile = sourceFileFor(filePath, sourceText);
    const transformer = (context) => {
        const visit = (node) => {
            if (ts.isStringLiteral(node) && isEditableString(node)) {
                return context.factory.createStringLiteral(editableStringPlaceholder);
            }
            if (ts.isNoSubstitutionTemplateLiteral(node) && isEditableString(node)) {
                return context.factory.createNoSubstitutionTemplateLiteral(editableStringPlaceholder);
            }
            if (ts.isTemplateHead(node)) return context.factory.createTemplateHead(editableStringPlaceholder);
            if (ts.isTemplateMiddle(node)) return context.factory.createTemplateMiddle(editableStringPlaceholder);
            if (ts.isTemplateTail(node)) return context.factory.createTemplateTail(editableStringPlaceholder);
            return ts.visitEachChild(node, visit, context);
        };
        return (node) => ts.visitNode(node, visit);
    };
    const transformed = ts.transform(sourceFile, [transformer]).transformed[0];
    return ts.createPrinter({ newLine: ts.NewLineKind.LineFeed }).printFile(transformed);
};

const stringEntries = (filePath, sourceText) => {
    const sourceFile = sourceFileFor(filePath, sourceText);
    const entries = [];
    const visit = (node, parentPath = []) => {
        if (ts.isStringLiteral(node) && isEditableString(node)) {
            entries.push({ path: parentPath.join("."), value: node.text });
        } else if (ts.isNoSubstitutionTemplateLiteral(node) && isEditableString(node)) {
            entries.push({ path: parentPath.join("."), value: node.text });
        } else if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
            entries.push({ path: parentPath.join("."), value: node.text });
        }
        if (ts.isPropertyAssignment(node)) {
            const key = propertyName(node.name);
            if (key !== undefined) visit(node.initializer, [...parentPath, key]);
            return;
        }
        if (ts.isArrayLiteralExpression(node)) {
            node.elements.forEach((element, index) => visit(element, [...parentPath, String(index)]));
            return;
        }
        ts.forEachChild(node, (child) => visit(child, parentPath));
    };
    visit(sourceFile);
    return entries;
};

const protectedEntries = (filePath, sourceText) => stringEntries(filePath, sourceText).filter(
    ({ path: key, value }) => {
    const leaf = key.split(".").at(-1);
    return protectedPropertyNames.has(leaf) || /^https?:\/\//.test(value);
    },
);

const placeholderTokens = (value) => [...value.matchAll(/(?:__SE_[A-Z0-9_]+__|\{\{[^}]+\}\})/g)].map(
    ([token]) => token,
);

const initializerFor = (filePath, sourceText, variableName) => {
    const sourceFile = sourceFileFor(filePath, sourceText);
    for (const statement of sourceFile.statements) {
        if (!ts.isVariableStatement(statement)) continue;
        for (const declaration of statement.declarationList.declarations) {
            if (ts.isIdentifier(declaration.name) && declaration.name.text === variableName
                && declaration.initializer) {
                return declaration.initializer.getText(sourceFile);
            }
        }
    }
    return undefined;
};

export const sourceSignatureFor = (filePath, sourceText) => {
    return crypto.createHash("sha256").update(structuralSource(filePath, sourceText)).digest("hex");
};

export const validateTranslationSourcePair = (filePath, expectedText, candidateText) => {
    const expectedEnglish = initializerFor(filePath, expectedText, "english");
    const candidateEnglish = initializerFor(filePath, candidateText, "english");
    if (expectedEnglish !== undefined || candidateEnglish !== undefined) {
        if (expectedEnglish === undefined || candidateEnglish === undefined
            || JSON.stringify(stringEntries(filePath, expectedEnglish))
                !== JSON.stringify(stringEntries(filePath, candidateEnglish))) {
            throw new Error(`Translation source changes the English source: ${filePath}`);
        }
    }
    const expectedStructure = structuralSource(filePath, expectedText);
    const candidateStructure = structuralSource(filePath, candidateText);
    if (expectedStructure !== candidateStructure) {
        throw new Error(`Translation source changes executable or structural code: ${filePath}`);
    }

    const expectedStrings = stringEntries(filePath, expectedText);
    const candidateStrings = stringEntries(filePath, candidateText);
    if (expectedStrings.length !== candidateStrings.length) {
        throw new Error(`Translation source changes string structure: ${filePath}`);
    }
    expectedStrings.forEach((expected, index) => {
        const candidate = candidateStrings[index];
        if (expected.path !== candidate.path
            || JSON.stringify(placeholderTokens(expected.value))
                !== JSON.stringify(placeholderTokens(candidate.value))) {
            throw new Error(`Translation source changes a key or placeholder: ${filePath} at ${expected.path}`);
        }
    });

    const expectedProtected = protectedEntries(filePath, expectedText);
    const candidateProtected = protectedEntries(filePath, candidateText);
    if (JSON.stringify(expectedProtected) !== JSON.stringify(candidateProtected)) {
        throw new Error(`Translation source changes protected values: ${filePath}`);
    }
};

export const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));

const validateHumanReview = (review, label) => {
    // Maintainer approval can accept a machine draft without changing its authorship.
    const allowedProvenance = review.state === "approved" ? ["human", "machine"] : ["human"];
    if (!allowedProvenance.includes(review.provenance?.kind) || typeof review.reviewer !== "string"
        || review.reviewer.trim() === "" || !/^\d{4}-\d{2}-\d{2}$/.test(review.reviewedAt ?? "")) {
        throw new Error(`Reviewed translations need reviewer metadata: ${label}`);
    }
};

export const validateTargetReview = (review, label) => {
    const allowedStates = new Set(["machine", "needs-review", "reviewed", "approved"]);
    if (!review || !allowedStates.has(review.state)) throw new Error(`Missing review state: ${label}`);
    if (!new Set(["high", "medium", "low"]).has(review.confidence)) {
        throw new Error(`Invalid translation confidence: ${label}`);
    }
    if (["reviewed", "approved"].includes(review.state)) validateHumanReview(review, label);
    if (["machine", "needs-review"].includes(review.state) && review.provenance?.kind !== "machine") {
        throw new Error(`Machine translations need machine provenance: ${label}`);
    }
    if (review.state === "needs-review"
        && (typeof review.uncertainty?.reason !== "string" || review.uncertainty.reason.trim() === "")) {
        throw new Error(`Needs-review translations require an uncertainty reason: ${label}`);
    }
    if (review.uncertainty?.sources !== undefined
        && (!Array.isArray(review.uncertainty.sources)
            || review.uncertainty.sources.some((source) => typeof source?.label !== "string"
                || source.label.trim() === ""
                || source.url !== undefined && !/^https:\/\//.test(source.url)))) {
        throw new Error(`Invalid uncertainty sources: ${label}`);
    }
};

const validateGlossary = (glossary, locale) => {
    if (glossary?.schemaVersion !== 1 || glossary.sourceLocale !== "en" || glossary.locale !== locale
        || glossary.entries === null || typeof glossary.entries !== "object" || Array.isArray(glossary.entries)) {
        throw new Error(`Invalid translation glossary header: ${locale}`);
    }
    for (const [key, entry] of Object.entries(glossary.entries)) {
        const label = `${locale}:glossary:${key}`;
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(key)
            || typeof entry.source !== "string" || entry.source.trim() === ""
            || typeof entry.preferred !== "string" || entry.preferred.trim() === ""
            || typeof entry.context !== "string" || entry.context.trim() === ""
            || entry.discouraged !== undefined
                && (!Array.isArray(entry.discouraged)
                    || entry.discouraged.some((value) => typeof value !== "string"))) {
            throw new Error(`Invalid translation glossary entry: ${label}`);
        }
        validateTargetReview(entry, label);
    }
};

export const validateReviewMetadata = (
    metadata,
    expectedSignatures,
    entriesByLocale,
    readRelativeJson,
) => {
    if (metadata?.schemaVersion !== 2 || metadata.sourceLocale !== "en"
        || typeof metadata.bundles !== "object" || typeof metadata.locales !== "object") {
        throw new Error("Invalid translation review metadata header");
    }
    const bundleNames = Object.keys(reviewBundleSourceFiles);
    if (JSON.stringify(Object.keys(metadata.bundles).sort()) !== JSON.stringify(bundleNames.sort())) {
        throw new Error("Translation review metadata has an unexpected bundle set");
    }
    for (const [bundle, entry] of Object.entries(metadata.bundles)) {
        const sourceFiles = reviewBundleSourceFiles[bundle];
        if (typeof sourceFiles === "string") {
            if (entry.sourceFile !== sourceFiles) {
                throw new Error(`Translation review metadata points to the wrong source file: ${bundle}`);
            }
        } else if (JSON.stringify(entry.sourceFiles) !== JSON.stringify(sourceFiles)) {
            throw new Error(`Translation review metadata points to the wrong source files: ${bundle}`);
        }
        if (JSON.stringify(entry.files) !== JSON.stringify(reviewBundleLocaleFiles[bundle])) {
            throw new Error(`Translation review metadata points to the wrong locale files: ${bundle}`);
        }
        if (typeof sourceFiles === "string") {
            if (entry.sourceSignature !== expectedSignatures[bundle]) {
                throw new Error(`Stale translation review source signature: ${bundle}`);
            }
        } else if (JSON.stringify(entry.sourceSignatures) !== JSON.stringify(expectedSignatures[bundle])) {
            throw new Error(`Stale translation review source signatures: ${bundle}`);
        }
    }

    if (JSON.stringify(Object.keys(metadata.locales)) !== JSON.stringify(translationLocales)) {
        throw new Error("Translation review metadata has an unexpected locale set");
    }
    if (metadata.locales.en?.state !== "source") throw new Error("English must have source review state");
    const englishEntries = entriesByLocale.en;
    const expectedKeys = [...englishEntries.keys()].sort();
    for (const locale of targetTranslationLocales) {
        const localeIndex = metadata.locales[locale];
        const expectedReviewFile = `src/i18n/translation-review/${locale}.json`;
        const expectedGlossaryFile = `src/i18n/glossaries/${locale}.json`;
        if (localeIndex?.reviewFile !== expectedReviewFile || localeIndex.glossaryFile !== expectedGlossaryFile) {
            throw new Error(`Translation review metadata points to the wrong locale data: ${locale}`);
        }
        const reviewFile = readRelativeJson(expectedReviewFile);
        if (reviewFile?.schemaVersion !== 1 || reviewFile.sourceLocale !== "en"
            || reviewFile.locale !== locale || typeof reviewFile.entries !== "object") {
            throw new Error(`Invalid per-entry translation review header: ${locale}`);
        }
        const reviewKeys = Object.keys(reviewFile.entries).sort();
        if (JSON.stringify(reviewKeys) !== JSON.stringify(expectedKeys)) {
            throw new Error(`Translation review entries do not match English: ${locale}`);
        }
        const targetEntries = entriesByLocale[locale];
        for (const key of expectedKeys) {
            const review = reviewFile.entries[key];
            const label = `${locale}:${key}`;
            validateTargetReview(review, label);
            if (review.sourceSignature !== entrySignatureFor(key, englishEntries.get(key))) {
                throw new Error(`Stale per-entry English source signature: ${label}`);
            }
            if (review.translationSignature !== entrySignatureFor(key, targetEntries.get(key))) {
                throw new Error(`Stale per-entry translation signature: ${label}`);
            }
        }
        if (localeIndex.state !== localeReviewStateFor(reviewFile.entries)) {
            throw new Error(`Stale locale review summary: ${locale}`);
        }
        validateGlossary(readRelativeJson(expectedGlossaryFile), locale);
    }
};

export const normalizedStructureFor = (filePath, sourceText) => structuralSource(filePath, sourceText);
