import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";
import {
    buildEnvironment,
    cleanupBuildRun,
    createBuildRun,
    runValidationCommand,
    runViteBuild,
    validateFullBuild,
    withDeploymentLock,
} from "./build-runs.mjs";
import {
    prepareInactiveIisSlot,
    determineIisDeploymentPlanFromBroker,
} from "./iis-deployment-slots.mjs";
import { defaultIisSlotBrokerClient } from "./iis-slot-broker-client.mjs";

const projectRoot = process.cwd();
const locales = [
    "en", "nb", "nn", "zh-Hans", "ar", "es", "es-419", "fr", "pl", "uk", "it", "vi", "de", "sv", "da", "is",
    "hi", "bn", "pt", "pt-BR", "ja", "ko",
];

const copyDirectory = (sourceDirectory, destinationDirectory) => {
    fs.mkdirSync(destinationDirectory, { recursive: true });
    for (const entry of fs.readdirSync(sourceDirectory, { withFileTypes: true })) {
        const sourcePath = path.join(sourceDirectory, entry.name);
        const destinationPath = path.join(destinationDirectory, entry.name);
        if (entry.isDirectory()) copyDirectory(sourcePath, destinationPath);
        else if (fs.existsSync(destinationPath)) {
            if (!fs.readFileSync(sourcePath).equals(fs.readFileSync(destinationPath))) {
                throw new Error(`Sharded outputs collide at ${destinationPath}.`);
            }
        } else fs.copyFileSync(sourcePath, destinationPath);
    }
};

const loadBuildExtras = async () => {
    const server = await createServer({
        root: projectRoot,
        configFile: false,
        appType: "custom",
        logLevel: "error",
        optimizeDeps: { noDiscovery: true },
    });
    try {
        const [blog, links, batteries, concepts, materials, mods, routes, localesModule] = await Promise.all([
            server.ssrLoadModule("/src/blog/generator.ts"),
            server.ssrLoadModule("/src/build/normalize-external-links.ts"),
            server.ssrLoadModule("/src/catalogs/batteries/defaults.ts"),
            server.ssrLoadModule("/src/catalogs/concepts/catalog.ts"),
            server.ssrLoadModule("/src/catalogs/materials/catalog.ts"),
            server.ssrLoadModule("/src/catalogs/mods/presets.ts"),
            server.ssrLoadModule("/src/pages/encyclopedia/routes.ts"),
            server.ssrLoadModule("/src/i18n/locales.ts"),
        ]);
        return { blog, links, batteries, concepts, materials, mods, routes, localesModule };
    } finally {
        await server.close();
    }
};

const buildExtras = async (publicRoot) => {
    const { blog, links, batteries, concepts, materials, mods, routes, localesModule } = await loadBuildExtras();
    const detailRoutes = [
        ...concepts.concepts.map((item) => ({ category: "concepts", slug: item.slug })),
        ...batteries.batteryPresets.map((item) => ({ category: "batteries", slug: item.slug })),
        ...materials.materials.map((item) => ({ category: "materials", slug: item.slug })),
        ...mods.builtInPresets.map((item) => ({ category: "mods", slug: item.slug })),
    ].filter(({ slug }) => slug !== undefined)
        .map(({ category, slug }) => routes.catalogCategoryPath(category) + `/${slug}`)
        .filter((route, index, allRoutes) => allRoutes.indexOf(route) === index);

    const legacySource = path.join(projectRoot, "legacy-ad-site");
    const legacyDestination = path.join(publicRoot, "old");
    fs.rmSync(legacyDestination, { recursive: true, force: true });
    fs.mkdirSync(legacyDestination, { recursive: true });
    for (const entry of fs.readdirSync(legacySource, { withFileTypes: true })) {
        if (entry.name === "sitemap.xml") continue;
        const sourcePath = path.join(legacySource, entry.name);
        if (entry.name === "ads.txt") {
            fs.copyFileSync(sourcePath, path.join(publicRoot, entry.name));
            continue;
        }
        const destinationPath = path.join(legacyDestination, entry.name);
        if (entry.isDirectory()) fs.cpSync(sourcePath, destinationPath, { recursive: true });
        else if (/\.html?$/i.test(entry.name)) {
            fs.writeFileSync(
                destinationPath,
                links.normalizeExternalHtmlLinks(fs.readFileSync(sourcePath, "utf8")),
                "utf8",
            );
        } else fs.copyFileSync(sourcePath, destinationPath);
    }
    fs.mkdirSync(path.join(legacyDestination, "static"), { recursive: true });
    fs.copyFileSync(
        path.join(projectRoot, "src", "assets", "logo.png"),
        path.join(legacyDestination, "static", "logo.png"),
    );
    fs.cpSync(path.join(projectRoot, "advertising"), path.join(publicRoot, "advertising"), {
        recursive: true,
    });

    const blogContentDirectory = blog.resolveBlogContentDirectory(projectRoot);
    blog.buildBlog({
        sourceDirectory: path.join(projectRoot, "src", "blog"),
        contentDirectory: blogContentDirectory,
        outputDirectory: path.join(publicRoot, "blog"),
    });

    const sitemapRoutes = [
        ["/", "1.0"], ["/ohm", "0.5"], ["/coil", "0.8"], ["/wirewiz", "0.6"], ["/batt", "0.4"],
        ["/modrange", "0.3"], ["/juice", "0.9"], ["/converter", "0.2"], ["/tcr", "0.2"],
        ["/about", "0.2"], ["/catalog", "0.8"], ["/compare/batteries", "0.4"], ["/compare/materials", "0.4"],
        ["/compare/mods", "0.4"],
        ...detailRoutes.map((route) => [`/${route}`, "0.3"]),
        ...blog.getBlogSitemapPaths(blogContentDirectory).map((route) => [route, "0.3"]),
        ...localesModule.localeDefinitions.filter(({ code }) => code !== "en").flatMap(({ code }) => [
            ...localesModule.translatedRoutes(code).map((route) => [
                route,
                route === localesModule.localizedRoute(code, "/") ? "1.0" : "0.5",
            ]),
            ...detailRoutes.map((route) => [localesModule.localizedRoute(code, `/${route}`), "0.3"]),
        ]),
    ];
    const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...sitemapRoutes.flatMap(([route, priority]) => [
            "    <url>",
            `        <loc>https://www.steam-engine.org${route}</loc>`,
            `        <priority>${priority}</priority>`,
            "    </url>",
        ]),
        "</urlset>",
        "",
    ].join("\n");
    fs.writeFileSync(path.join(publicRoot, "sitemap.xml"), sitemap, "utf8");
};

const validateReview = () => {
    const result = runValidationCommand(
        process.execPath,
        [path.join(projectRoot, "tools", "generate-translation-review.mjs"), "--check", "--cache"],
        process.env,
    );
    if (result.error) throw result.error;
    if (result.status !== 0) {
        throw new Error(`Translation review validation failed with exit code ${result.status ?? 1}.`);
    }
};

try {
    await withDeploymentLock(async () => {
        validateReview();
        const lease = await defaultIisSlotBrokerClient.inspect();
        const plan = determineIisDeploymentPlanFromBroker({ ...lease, projectRoot });
        const finalWorkspaceRun = createBuildRun("full-sharded");
        const finalRun = { ...finalWorkspaceRun, outputDirectory: plan.inactiveDirectory };
        const shardRuns = [];
        prepareInactiveIisSlot(plan);
        console.log(`Building inactive IIS ${plan.inactiveSlot} slot with locale shards.`);
        try {
            for (const locale of locales) {
                const shard = createBuildRun(`shard-${locale}`);
                shardRuns.push(shard);
                const environment = buildEnvironment(shard, {
                    STEAM_ENGINE_BUILD_LOCALE: locale,
                    STEAM_ENGINE_BUILD_ROUTE: "",
                    STEAM_ENGINE_BUILD_ALL_LOCALES: "",
                    STEAM_ENGINE_BUILD_COMPACT_HTML: "1",
                    STEAM_ENGINE_BUILD_SHARD_LOCALE: "1",
                });
                const result = runViteBuild(shard, environment);
                if (result.error) throw result.error;
                if (result.status !== 0) {
                    throw new Error(`Locale shard ${locale} failed with exit code ${result.status ?? 1}.`);
                }
                copyDirectory(shard.outputDirectory, finalRun.outputDirectory);
                cleanupBuildRun(shard);
            }

            await buildExtras(finalRun.outputDirectory);
            const validationStatus = validateFullBuild(finalRun, buildEnvironment(finalRun));
            if (validationStatus !== 0) {
                throw new Error(`Sharded-build validation failed with exit code ${validationStatus}.`);
            }
            const switched = await defaultIisSlotBrokerClient.switch(lease.leaseId);
            console.log(
                `IIS now serves validated ${switched.activeState} slot; broker verification: ${switched.verified}.`,
            );
        } finally {
            for (const shard of shardRuns) cleanupBuildRun(shard);
            cleanupBuildRun(finalRun);
        }
    });
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
}
