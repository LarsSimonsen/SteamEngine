import fs from "node:fs";
import path from "node:path";
import {
    buildEnvironment,
    cleanupBuildRun,
    cleanupGeneratedBuildPages,
    createBuildRun,
    runViteBuild,
} from "./build-runs.mjs";
const translatedRoutes = new Set([
    "batt", "coil", "compare/batteries", "compare/materials", "compare/mods", "converter", "juice", "modrange",
    "ohm", "tcr",
    "wirewiz",
]);
const locales = [
    "en", "nb", "nn", "zh-Hans", "ar", "es", "es-419", "fr", "pl", "uk", "it", "vi", "de", "sv", "da", "is",
    "hi", "bn", "pt", "pt-BR", "ja", "ko", "el",
];

let activeRun;
const fail = (message) => {
    if (activeRun) cleanupBuildRun(activeRun);
    console.error(`Partial build: ${message}`);
    process.exit(2);
};

let locale;
let route;
let allLocales = false;
let fast = false;
const args = process.argv.slice(2);
for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--locale") {
        locale = args[++index];
    } else if (argument === "--route") {
        route = args[++index];
    } else if (argument === "--all-locales") {
        allLocales = true;
    } else if (argument === "--fast") {
        fast = true;
    } else if (argument === "--help" || argument === "-h") {
        console.log("Usage: npm run build:partial -- --locale <locale> [--fast]");
        console.log("   or: npm run build:partial -- --route <route> [--all-locales] [--fast]");
        console.log("   or: npm run build:partial -- --locale <locale> --route <route> [--fast]");
        console.log("npm may require the positional form: npm run build:partial -- coil all-locales");
        process.exit(0);
    } else if (!argument.startsWith("-")) {
        if (argument === "all-locales") {
            allLocales = true;
        } else if (argument === "fast") {
            fast = true;
        } else if (!locale && !route && locales.includes(argument)) {
            locale = argument;
        } else if (!locale && !route && (argument === "catalog" || translatedRoutes.has(argument))) {
            route = argument;
        } else {
            fail(`unknown argument '${argument}'`);
        }
    } else {
        fail(`unknown argument '${argument}'`);
    }
}

if ((!locale && !route)) fail("select at least one of --locale or --route");
if (allLocales && !route) fail("--all-locales requires --route");
if (allLocales && locale) fail("--all-locales cannot be combined with --locale");
if (locale && !locales.includes(locale)) fail(`unknown locale '${locale}'`);
if (route && route !== "catalog" && !translatedRoutes.has(route)) fail(`unknown route '${route}'`);

const scopeName = locale
    ? route ? `locale-${locale}-route-${route}` : `locale-${locale}`
    : `route-${route}${allLocales ? "-all-locales" : ""}`;
const run = createBuildRun(`partial-${scopeName}`);
activeRun = run;
const outputDirectory = run.outputDirectory;
const environment = buildEnvironment(run, {
    STEAM_ENGINE_BUILD_LOCALE: locale ?? "",
    STEAM_ENGINE_BUILD_ROUTE: route ?? "",
    STEAM_ENGINE_BUILD_ALL_LOCALES: allLocales ? "1" : "",
    STEAM_ENGINE_BUILD_FAST: fast ? "1" : "",
});

const result = runViteBuild(run, environment, "partial");
if (result.error) {
    cleanupBuildRun(run);
    throw result.error;
}
if (result.status !== 0) {
    cleanupBuildRun(run);
    process.exit(result.status ?? 1);
}

const htmlFiles = [];
const collectHtmlFiles = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) collectHtmlFiles(entryPath);
        else if (entry.name.endsWith(".html")) htmlFiles.push(entryPath);
    }
};
collectHtmlFiles(outputDirectory);
if (htmlFiles.length === 0) fail(`no HTML files were generated in ${outputDirectory}`);

const expectedFiles = locale
    ? route
        ? [`${locale === "en" ? "" : `${locale}/`}${route === "catalog" ? "catalog" : route}.html`]
        : locale === "en"
            ? ["index.html", "catalog.html", "ohm.html"]
            : [`${locale}.html`, `${locale}/catalog.html`, `${locale}/ohm.html`]
    : allLocales
        ? route === "catalog"
            ? ["catalog.html", ...locales.filter((item) => item !== "en").map((item) => `${item}/catalog.html`)]
            : [`${route}.html`, ...locales.filter((item) => item !== "en")
                .map((item) => `${item}/${route}.html`)]
        : [route === "catalog" ? "catalog.html" : `${route}.html`];
const missingFiles = expectedFiles.filter((file) => !fs.existsSync(path.join(outputDirectory, file)));
if (missingFiles.length > 0) fail(`expected files were not generated: ${missingFiles.join(", ")}`);

const missingAssets = [];
for (const htmlPath of htmlFiles) {
    const html = fs.readFileSync(htmlPath, "utf8");
    const references = [
        ...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi),
        ...html.matchAll(/<link\b[^>]*\bhref=["']([^"']+)["']/gi),
    ].map((match) => match[1]);
    for (const reference of references) {
        if (!reference || reference.startsWith("#") || reference.startsWith("/")
            || /^[a-z][a-z0-9+.-]*:/i.test(reference)) continue;
        const assetPath = path.resolve(path.dirname(htmlPath), reference.split(/[?#]/, 1)[0]);
        if (!fs.existsSync(assetPath)) {
            missingAssets.push(`${path.relative(outputDirectory, htmlPath)} -> ${reference}`);
        }
    }
}
if (missingAssets.length > 0) fail(`generated HTML references missing assets: ${missingAssets.join(", ")}`);

fs.writeFileSync(path.join(outputDirectory, "partial-build.json"), `${JSON.stringify({
    scope: locale ? { kind: "locale", locale } : { kind: "route", route, allLocales },
    runId: run.runId,
    outputDirectory,
    htmlFileCount: htmlFiles.length,
}, null, 4)}\n`, "utf8");
cleanupGeneratedBuildPages(run);
console.log(`Partial build complete: ${htmlFiles.length} HTML files in ${outputDirectory}`);
