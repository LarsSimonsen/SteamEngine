import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(projectRoot, "advertising", "config.json");
const adsTxtPath = path.join(projectRoot, "legacy-ad-site", "ads.txt");
const sellerRecord = "google.com, pub-5496946968214683, DIRECT, f08c47fec0942fa0";
const placementNames = [
    "blog-article-inline",
    "blog-index-sidebar",
    "calculator-footer",
    "catalog-battery-inline",
    "catalog-concept-inline",
    "catalog-index-footer",
    "catalog-material-inline",
    "catalog-mod-inline",
    "home-footer",
    "legacy-calculator-footer",
    "legacy-main-footer",
];
const allowedAdapters = new Set(["adsense", "adsterra-frame", "house"]);
const allowedScriptHosts = new Set([
    "pagead2.googlesyndication.com",
    "pl30707872.effectivecpmnetwork.com",
    "www.highperformanceformat.com",
]);
const publishedLocales = JSON.parse(
    fs.readFileSync(path.join(projectRoot, "tools", "route-contract.json"), "utf8"),
).localization.publishedLocales;
const houseAdCopyFields = ["label", "title", "body", "qualifier", "cta"];

const assert = (condition, message) => {
    if (!condition) throw new Error(message);
};

const positiveInteger = (value) => Number.isInteger(value) && value > 0;

const validateHouseTranslations = (id, provider) => {
    const translations = provider.translations;
    assert(translations && typeof translations === "object" && !Array.isArray(translations),
        `House provider ${id} must define translations for every published locale.`);
    const actualLocales = Object.keys(translations).sort();
    const expectedLocales = [...publishedLocales].sort();
    assert(JSON.stringify(actualLocales) === JSON.stringify(expectedLocales),
        `House provider ${id} translations must match the published locale list.`);
    publishedLocales.forEach((locale) => {
        const copy = translations[locale];
        assert(copy && typeof copy === "object" && !Array.isArray(copy),
            `House provider ${id} has invalid ${locale} translations.`);
        assert(JSON.stringify(Object.keys(copy).sort()) === JSON.stringify([...houseAdCopyFields].sort()),
            `House provider ${id} has incomplete ${locale} translations.`);
        houseAdCopyFields.forEach((field) => {
            assert(typeof copy[field] === "string" && copy[field].length > 0,
                `House provider ${id} has an invalid ${locale} ${field} translation.`);
        });
    });
};

const validateProvider = (id, provider) => {
    assert(provider && typeof provider === "object", `Provider ${id} must be an object.`);
    assert(allowedAdapters.has(provider.adapter), `Provider ${id} uses an unsupported adapter.`);
    if (provider.scriptUrl) {
        const url = new URL(provider.scriptUrl);
        assert(url.protocol === "https:", `Provider ${id} must use HTTPS.`);
        assert(allowedScriptHosts.has(url.hostname), `Provider ${id} uses an unreviewed script host.`);
    }
    if (provider.adapter === "adsterra-frame") {
        assert(["banner", "native"].includes(provider.format), `Provider ${id} has an invalid format.`);
        assert(positiveInteger(provider.width) && positiveInteger(provider.height),
            `Provider ${id} must reserve positive dimensions.`);
    }
    if (provider.adapter === "adsense") {
        assert(/^ca-pub-\d+$/.test(provider.client), "AdSense client ID is invalid.");
        assert(/^\d+$/.test(provider.defaultSlot), "AdSense default slot is invalid.");
        assert(positiveInteger(provider.tcfVendorId), "AdSense must declare its TCF vendor ID.");
        Object.values(provider.slotsByContext ?? {}).forEach((slot) => {
            assert(/^\d+$/.test(slot), `AdSense context slot ${slot} is invalid.`);
        });
    }
    if (provider.adapter === "house") {
        const hasLegacyMessage = typeof provider.message === "string" && provider.message.length > 0;
        const hasStructuredCopy = typeof provider.title === "string" && provider.title.length > 0
            && typeof provider.cta === "string" && provider.cta.length > 0;
        assert(hasLegacyMessage || hasStructuredCopy, "The house ad must define a message or title and CTA.");
        validateHouseTranslations(id, provider);
        ["label", "title", "body", "qualifier", "cta", "message"].forEach((field) => {
            if (provider[field] !== undefined) {
                assert(typeof provider[field] === "string" && provider[field].length > 0,
                    `The house-ad ${field} field must be a non-empty string.`);
            }
        });
    }
};

export const validateAdvertisingConfig = (config) => {
    assert(config.version === 1, "Advertising configuration version must be 1.");
    assert(positiveInteger(config.runtime?.configTimeoutMs), "Config timeout must be a positive integer.");
    assert(positiveInteger(config.runtime?.totalWaterfallTimeoutMs),
        "Total waterfall timeout must be a positive integer.");
    assert(config.consent?.mode === "adsense-tcf",
        "The advertising runtime must use AdSense-managed TCF consent.");
    assert(typeof config.consent.bootstrapProvider === "string",
        "Consent must declare the provider that bootstraps the CMP.");
    Object.entries(config.providers ?? {}).forEach(([id, provider]) => validateProvider(id, provider));
    const bootstrapProvider = config.providers[config.consent.bootstrapProvider];
    assert(bootstrapProvider?.adapter === "adsense", "The CMP bootstrap provider must be the reviewed AdSense tag.");
    const actualPlacements = Object.keys(config.placements ?? {}).sort();
    assert(JSON.stringify(actualPlacements) === JSON.stringify([...placementNames].sort()),
        "The configured placement names do not match the reviewed placement contract.");
    for (const [name, placement] of Object.entries(config.placements)) {
        assert(Array.isArray(placement.waterfall) && placement.waterfall.length > 0,
            `Placement ${name} must define a waterfall.`);
        let total = 0;
        placement.waterfall.forEach((attempt) => {
            assert(config.providers[attempt.provider],
                `Placement ${name} references unknown provider ${attempt.provider}.`);
            assert(["adsense", "house"].includes(config.providers[attempt.provider].adapter),
                `Placement ${name} uses a provider that cannot use AdSense-managed TCF consent.`);
            assert(positiveInteger(attempt.timeoutMs), `Placement ${name} has an invalid timeout.`);
            total += attempt.timeoutMs;
        });
        const finalProvider = config.providers[placement.waterfall.at(-1).provider];
        assert(finalProvider.adapter === "house", `Placement ${name} must end with the house ad.`);
        assert(total <= config.runtime.totalWaterfallTimeoutMs,
            `Placement ${name} exceeds the total waterfall timeout.`);
    }
    return config;
};

export const validateAdvertisingFiles = () => {
    const config = validateAdvertisingConfig(JSON.parse(fs.readFileSync(configPath, "utf8")));
    const adsTxt = fs.readFileSync(adsTxtPath, "utf8");
    assert(adsTxt.split(sellerRecord).length === 2, "ads.txt must contain the Google seller record once.");
    const sourceText = [
        fs.readFileSync(configPath, "utf8"),
        fs.readFileSync(path.join(projectRoot, "advertising", "runtime.js"), "utf8"),
    ].join("\n");
    assert(!sourceText.includes("lars.simonsen@gmail.com"), "The contact email must not be stored in plain text.");
    return config;
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    validateAdvertisingFiles();
    console.log(`Advertising configuration validated: ${placementNames.length} placements.`);
}
