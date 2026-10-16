import { useEffect, useRef, useState, type FocusEvent, type ReactElement } from "react";
import { localeDefinition, type Locale } from "../../i18n/locales";
import {
    orderedLocaleDefinitions,
    readSavedLocale,
    saveLocalePreference,
} from "../../i18n/language-preference";
import { languageHref } from "../../i18n/page-locale";
import type { SharedMessages } from "../../i18n/messages";

export type LanguageSwitcherProps = {
    readonly locale: Locale;
    readonly navigation: SharedMessages["navigation"];
};

const normalizedSearchText = (value: string): string => value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const LanguageSwitcher = ({ locale, navigation }: LanguageSwitcherProps): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState("");
    const switcherRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const filterRef = useRef<HTMLInputElement>(null);
    const currentDefinition = localeDefinition(locale);
    const browserLanguages = typeof navigator === "undefined"
        ? []
        : navigator.languages?.length > 0 ? navigator.languages : [navigator.language];
    const orderedDefinitions = orderedLocaleDefinitions(locale, readSavedLocale(), browserLanguages);
    const normalizedFilter = normalizedSearchText(filter.trim());
    const visibleDefinitions = orderedDefinitions.filter((definition) => {
        if (!normalizedFilter) return true;
        return [definition.name, definition.englishAlias]
            .some((value) => normalizedSearchText(value).includes(normalizedFilter));
    });

    const closeMenu = (returnFocus = false): void => {
        setIsOpen(false);
        setFilter("");
        if (returnFocus) triggerRef.current?.focus();
    };

    useEffect(() => {
        if (!isOpen) return;
        filterRef.current?.focus();
        const closeWhenClickedOutside = (event: PointerEvent): void => {
            if (!switcherRef.current?.contains(event.target as Node)) closeMenu();
        };
        const closeWhenEscapeIsPressed = (event: KeyboardEvent): void => {
            if (event.key === "Escape") closeMenu(true);
        };
        document.addEventListener("pointerdown", closeWhenClickedOutside);
        document.addEventListener("keydown", closeWhenEscapeIsPressed);
        return () => {
            document.removeEventListener("pointerdown", closeWhenClickedOutside);
            document.removeEventListener("keydown", closeWhenEscapeIsPressed);
        };
    }, [isOpen]);

    const handleBlur = (event: FocusEvent<HTMLDivElement>): void => {
        if (event.relatedTarget && switcherRef.current?.contains(event.relatedTarget as Node)) return;
        closeMenu();
    };

    return <div className="language-switcher" ref={switcherRef} onBlur={handleBlur}>
        <button
            className="language-switcher__trigger"
            type="button"
            ref={triggerRef}
            aria-expanded={isOpen}
            aria-controls="language-switcher-options"
            aria-haspopup="true"
            aria-label={`${navigation.language}: ${currentDefinition.name}`}
            onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
        >
            {currentDefinition.name}
            <span className="language-switcher__chevron" aria-hidden="true">▾</span>
        </button>
        {isOpen && <div className="language-switcher__menu" id="language-switcher-options">
            <label className="sr-only" htmlFor="language-switcher-filter">{navigation.languageFilter}</label>
            <input
                id="language-switcher-filter"
                className="language-switcher__filter"
                type="text"
                value={filter}
                placeholder={navigation.languageFilter}
                autoComplete="off"
                onChange={(event) => setFilter(event.target.value)}
            />
            <ul className="language-switcher__options" aria-label={navigation.language}>
                {visibleDefinitions.map((definition) => <li key={definition.code}>
                    <a
                        className="language-switcher__option"
                        href={languageHref(definition.code)}
                        aria-current={definition.code === locale ? "page" : undefined}
                        onClick={() => saveLocalePreference(definition.code)}
                    >
                        {definition.name}
                        <span className="sr-only">{definition.englishAlias}</span>
                    </a>
                </li>)}
            </ul>
            {visibleDefinitions.length === 0 && <p className="language-switcher__empty">{navigation.noLanguageMatches}</p>}
        </div>}
    </div>;
};
