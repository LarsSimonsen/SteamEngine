import fs from "node:fs";
import path from "node:path";
import type { Locale } from "../i18n/locales";
import { googleAnalyticsHeadMarkup } from "../shared/ui/google-analytics";
import {
    localeDefinition,
    localeDefinitions,
    localizedRoute,
    routeMetadataFor,
    translatedPageRoutes,
} from "../i18n/locales";
import type { BuildRoute } from "./build-scope";

export type LocalizedPageInput = {
    readonly locale: Locale;
    readonly route: string;
    readonly inputPath: string;
};

const escapeHtml = (value: string): string => value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const htmlFor = (locale: Locale, route: string, scriptPath: string): string => {
    const metadata = routeMetadataFor(locale, route);
    if (!metadata) throw new Error(`Missing ${locale} metadata for ${route}`);
    const title = route === "/" ? metadata.title : `${metadata.title} | Steam Engine`;
    const description = metadata.description === undefined
        ? ""
        : `\n    <meta name="description" content="${escapeHtml(metadata.description)}" />`;
    return `<!doctype html>
<html lang="${localeDefinition(locale).htmlLang}" dir="${locale === "ar" ? "rtl" : "ltr"}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />${description}${googleAnalyticsHeadMarkup()}
    <title>${escapeHtml(title)}</title>
  </head>
  <body>
    <div id="root" data-route="${route === "/" ? "index" : route.slice(1)}" data-locale="${locale}"
      data-title="${escapeHtml(metadata.title)}"${metadata.description === undefined ? "" : `
      data-description="${escapeHtml(metadata.description)}"`}></div>
    <script type="module" src="${scriptPath}"></script>
  </body>
</html>
`;
};

const write = (filePath: string, content: string): void => {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, "utf8");
};

export type LocalizedPageInputOptions = Readonly<{
    readonly locales?: readonly Locale[];
    readonly routes?: readonly BuildRoute[];
    readonly includeHome?: boolean;
}>;

export const createLocalizedPageInputs = (
    pagesRoot: string,
    generatedRoot: string,
    options: LocalizedPageInputOptions = {},
): LocalizedPageInput[] => {
    const inputs: LocalizedPageInput[] = [];
    const selectedLocales = options.locales ?? localeDefinitions.map(({ code }) => code);
    const selectedRoutes = options.routes ?? ["catalog", ...translatedPageRoutes];
    for (const definition of localeDefinitions.filter(({ code }) =>
        code !== "en" && selectedLocales.includes(code))) {
        const locale: Locale = definition.code;
        const sourceRoot = path.join(generatedRoot, locale);
        const addPage = (route: string, sourceEntryPath: string): void => {
            const routeDirectory = route === "/" ? sourceRoot : path.join(sourceRoot, route.slice(1));
            const inputPath = path.join(routeDirectory, "index.html");
            const scriptPath = path.relative(routeDirectory, path.join(pagesRoot, sourceEntryPath))
                .split(path.sep)
                .join("/");
            write(inputPath, htmlFor(locale, route, scriptPath));
            inputs.push({ locale, route, inputPath });
        };
        if (options.includeHome ?? true) addPage("/", "home/entry.tsx");
        if (selectedRoutes.includes("catalog")) addPage("/catalog", "encyclopedia/entry.tsx");
        for (const route of selectedRoutes) {
            if (route === "catalog") continue;
            addPage(`/${route}`, `${route}/entry.tsx`);
        }
    }
    return inputs;
};

export const localizedInputKey = (input: LocalizedPageInput): string => {
    const route = localizedRoute(input.locale, input.route);
    return `${route.slice(1) || "index"}.html`;
};

export const cleanLocalizedPages = (generatedRoot: string): void => {
    fs.rmSync(generatedRoot, { recursive: true, force: true });
};
