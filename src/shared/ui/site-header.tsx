import { useEffect, useRef, useState, type ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { applyTheme, readTheme, saveTheme, themeStorageKey, type SiteTheme } from "../theme";
import logotypeUrl from "../../assets/logotype.svg";
import {
    navigationItemsFor,
    type SiteRoute,
    withoutTrailingSlash,
} from "./site-navigation";
import { messagesFor } from "../../i18n/messages";
import { localizedRouteHref, pageLocale } from "../../i18n/page-locale";
import { LanguageSwitcher } from "./language-switcher";

export type SiteHeaderProps = {
    basePath: string;
    currentRoute?: SiteRoute;
    rootHref?: string;
};

export const SiteHeader = ({
    basePath,
    currentRoute,
    rootHref = `${basePath}../`,
}: SiteHeaderProps): ReactElement => {
    const [theme, setTheme] = useState<SiteTheme>(() => {
        const storedTheme = readTheme();
        applyTheme(storedTheme);
        return storedTheme;
    });
    useEffect(() => {
        const synchronizeTheme = (event: StorageEvent): void => {
            if (event.key !== themeStorageKey && event.key !== null) return;
            const storedTheme = readTheme();
            applyTheme(storedTheme);
            setTheme(storedTheme);
        };
        window.addEventListener("storage", synchronizeTheme);
        return () => window.removeEventListener("storage", synchronizeTheme);
    }, []);
    const toggleTheme = (): void => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        saveTheme(nextTheme);
        setTheme(nextTheme);
    };
    const locale = pageLocale();
    const messages = messagesFor(locale);
    const navigationItems = navigationItemsFor(locale);
    const catalogNavigationItem = navigationItems[0];
    const calculatorNavigationItems = navigationItems.slice(1);
    const normalizedRootHref = withoutTrailingSlash(rootHref);
    const currentCalculatorLink = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const link = currentCalculatorLink.current;
        const list = link?.parentElement;
        if (link === null || list === null || list === undefined || list.scrollWidth <= list.clientWidth) return;
        const linkBounds = link.getBoundingClientRect();
        const listBounds = list.getBoundingClientRect();
        if (linkBounds.left >= listBounds.left && linkBounds.right <= listBounds.right) return;
        const linkOffset = linkBounds.left - listBounds.left;
        list.scrollTo({
            left: list.scrollLeft + linkOffset - (list.clientWidth - linkBounds.width) / 2,
        });
    }, [currentRoute]);

    return <header className="site-header">
        <div className="site-header__primary">
            <div className="site-header__inner">
                <a className="brand" href={normalizedRootHref} aria-label={messages.navigation.home}>
                    <img className="brand__logo" src={logotypeUrl} alt="" aria-hidden="true" />
                </a>
                <nav className="site-nav" aria-label={messages.navigation.primary}>
                    <div className="site-nav__global">
                        <a
                            href={withoutTrailingSlash(localizedRouteHref(locale, catalogNavigationItem.path))}
                            aria-current={catalogNavigationItem.route === currentRoute ? "page" : undefined}
                        >
                            {catalogNavigationItem.label}
                        </a>
                        <a href={withoutTrailingSlash(localizedRouteHref("en", "blog"))} hrefLang="en">
                            {messages.navigation.blog}
                        </a>
                        <button className="theme-toggle" type="button" aria-label={messages.theme[
                            theme === "dark" ? "switchToLight" : "switchToDark"
                        ]} title={messages.theme[theme === "dark" ? "switchToLight" : "switchToDark"]}
                            onClick={toggleTheme}>
                            <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} aria-hidden="true" />
                        </button>
                        <a
                            href={withoutTrailingSlash(localizedRouteHref("en", "about"))}
                            hrefLang="en"
                            aria-current={currentRoute === "about" ? "page" : undefined}
                        >
                            {messages.navigation.about}
                        </a>
                        {currentRoute !== "about" && currentRoute !== "privacy"
                            && <LanguageSwitcher locale={locale} navigation={messages.navigation} />}
                    </div>
                </nav>
            </div>
        </div>
        <div className="site-header__tools">
            <div className="site-header__tools-inner">
                <nav className="site-tool-nav" aria-label={messages.navigation.calculators}>
                    <div className="site-nav__calculator-list">
                        {calculatorNavigationItems.map((item) => (
                            <a
                                className="site-nav__calculator-link"
                                key={item.route}
                                ref={item.route === currentRoute ? currentCalculatorLink : undefined}
                                href={withoutTrailingSlash(localizedRouteHref(locale, item.path))}
                                aria-current={item.route === currentRoute ? "page" : undefined}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    </header>;
};
