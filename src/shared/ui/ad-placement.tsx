import { useEffect, type ReactElement } from "react";

export type AdPlacementName =
    | "blog-article-inline"
    | "blog-index-sidebar"
    | "calculator-footer"
    | "catalog-battery-inline"
    | "catalog-concept-inline"
    | "catalog-index-footer"
    | "catalog-material-inline"
    | "catalog-mod-inline"
    | "home-footer"
    | "legacy-calculator-footer"
    | "legacy-main-footer";

type AdRuntimeWindow = Window & {
    readonly SteamEngineAds?: {
        readonly scan: (root?: ParentNode) => void;
    };
};

const runtimeScriptId = "steam-engine-ad-runtime";

const ensureRuntime = (): void => {
    const runtimeWindow = window as AdRuntimeWindow;
    if (runtimeWindow.SteamEngineAds) {
        runtimeWindow.SteamEngineAds.scan(document);
        return;
    }
    if (document.getElementById(runtimeScriptId)) return;
    const script = document.createElement("script");
    script.async = true;
    script.id = runtimeScriptId;
    script.src = "/advertising/runtime.js";
    document.head.appendChild(script);
};

export const AdPlacement = ({
    context,
    placement,
}: {
    readonly context?: string;
    readonly placement: AdPlacementName;
}): ReactElement => {
    useEffect(ensureRuntime, []);
    return <div className="ad-slot se-ad-placement text-center" aria-label="Advertisement"
        data-ad-context={context} data-ad-placement={placement}
        style={{ margin: "1.5em auto", minHeight: 250 }} />;
};
