export type PreviewPageOptions = {
    route: SiteRoute;
    title: string;
    description: string;
};

import { SiteLayout } from "./site-layout";
import type { SiteRoute } from "./site-navigation";

export const routeLabel = (route: string): string => {
    const labels: Readonly<Record<string, string>> = {
        ohm: "Ohm's law",
        coil: "Coil wrapping",
        wirewiz: "Wire Wizard",
        batt: "Battery drain",
        modrange: "Mod range",
        juice: "E-liquid",
        converter: "Convert",
    };
    return labels[route] ?? "Steam Engine";
};

export function PreviewPage({ route, title, description }: PreviewPageOptions) {
    return (
        <SiteLayout basePath="./" currentRoute={route} rootHref=".">
            <main id="main" className="page-content">
                <section className="se-card preview-card" aria-labelledby="page-title">
                    <p className="eyebrow">Phase 0 modernization preview</p>
                    <h1 id="page-title">{title}</h1>
                    <p>{description}</p>
                    <div className="notice">
                        <strong>{routeLabel(route)}</strong> is the next tool to be
                        migrated into the independent React/TypeScript architecture.
                    </div>
                </section>
            </main>
        </SiteLayout>
    );
}
