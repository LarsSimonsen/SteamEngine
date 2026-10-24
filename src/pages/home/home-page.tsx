import type { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBatteryHalf,
    faBolt,
    faCalculator,
    faFlask,
    faGaugeHigh,
    faHistory,
    faScrewdriverWrench,
    faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import "../../shared/styles/foundation.css";
import { SiteLayout } from "../../shared/ui/site-layout";
import { messagesFor } from "../../i18n/messages";
import { localizedHomeHref, pageLocale } from "../../i18n/page-locale";
import type { Locale } from "../../i18n/locales";
import "./home.css";

type Tool = {
    href: string;
    label: string;
    description: string;
    icon: typeof faBolt;
};

const homeBlogHref = (locale: Locale): string => locale === "nb" ? "../blog" : "blog";

const homeLegacyHref = (locale: Locale): string => locale === "nb" ? "../old" : "old";

const oldTool = (locale: Locale): Tool => ({
    href: homeLegacyHref(locale),
    ...messagesFor(locale).home.tools.old,
    icon: faHistory,
});

const tools = (locale: Locale): readonly Tool[] => [
    {
        href: localizedHomeHref(locale, "ohm"),
        ...messagesFor(locale).home.tools.ohm,
        icon: faBolt,
    },
    {
        href: localizedHomeHref(locale, "coil"),
        ...messagesFor(locale).home.tools.coil,
        icon: faScrewdriverWrench,
    },
    {
        href: localizedHomeHref(locale, "wirewiz"),
        ...messagesFor(locale).home.tools.wirewiz,
        icon: faWaveSquare,
    },
    {
        href: localizedHomeHref(locale, "batt"),
        ...messagesFor(locale).home.tools.batt,
        icon: faBatteryHalf,
    },
    {
        href: localizedHomeHref(locale, "modrange"),
        ...messagesFor(locale).home.tools.modrange,
        icon: faGaugeHigh,
    },
    {
        href: localizedHomeHref(locale, "juice"),
        ...messagesFor(locale).home.tools.juice,
        icon: faFlask,
    },
    {
        href: localizedHomeHref(locale, "converter"),
        ...messagesFor(locale).home.tools.converter,
        icon: faCalculator,
    },
    oldTool(locale),
];

export const HomePage = (): ReactElement => {
    const locale = pageLocale();
    const messages = messagesFor(locale);
    const homeBasePath = locale === "nb" ? "nb/" : "";
    return <SiteLayout adPlacement="home-footer" basePath={homeBasePath} className="home-app"
        rootHref={locale === "nb" ? "nb" : "."}>
        <main id="main" className="page-content home-content">
            <section className="home-hero">
                <h1 className="sr-only">Steam Engine</h1>
                <p className="home-intro">
                    {messages.home.intro}
                </p>
            </section>

            <section className="tool-section" aria-labelledby="tools-title">
                <div className="section-heading">
                    <div>
                        <p className="eyebrow">{messages.home.toolkit}</p>
                        <h2 id="tools-title">{messages.home.chooseCalculator}</h2>
                    </div>
                </div>
                <div className="tool-grid">
                    {tools(locale).map((tool) => (
                        <a className="tool-card" key={tool.href} href={tool.href}>
                            <span className="tool-card__icon">
                                <FontAwesomeIcon icon={tool.icon} aria-hidden="true" />
                            </span>
                            <span className="tool-card__body">
                                <span className="tool-card__title">{tool.label}</span>
                                <span className="tool-card__description">{tool.description}</span>
                            </span>
                            <span className="tool-card__arrow" aria-hidden="true">→</span>
                        </a>
                    ))}
                </div>
            </section>

            <section className="home-resources" aria-labelledby="resources-title">
                <a className="home-encyclopedia" href={homeBlogHref(locale)}>
                    <div>
                        <p className="eyebrow">{messages.home.blogEyebrow}</p>
                        <h2 id="resources-title">{messages.home.blogTitle}</h2>
                        <p>{messages.home.blogDescription}</p>
                    </div>
                </a>
                <a className="home-encyclopedia" href={localizedHomeHref(locale, "catalog")}>
                    <div>
                        <p className="eyebrow">{messages.home.catalogEyebrow}</p>
                        <h2 id="encyclopedia-resource-title">{messages.home.catalogTitle}</h2>
                        <p>{messages.home.catalogDescription}</p>
                    </div>
                </a>
            </section>
        </main>

    </SiteLayout>;
};
