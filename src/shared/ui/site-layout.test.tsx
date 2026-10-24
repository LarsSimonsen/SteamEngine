import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { localeDefinitions } from "../../i18n/locales";
import { themeStorageKey } from "../theme";
import { isLocalhost, SiteFooter } from "./site-footer";
import { SiteLayout } from "./site-layout";

describe("site layout", () => {
    beforeEach(() => {
        localStorage.clear();
        delete document.documentElement.dataset.theme;
        document.body.innerHTML = '<div id="root" data-locale="en"></div>';
        window.history.replaceState({}, "", "/");
    });
    afterEach(cleanup);

    it("renders shared navigation and footer around page content", () => {
        render(
            <SiteLayout basePath="./" currentRoute="ohm" rootHref=".">
                <main>Calculator content</main>
            </SiteLayout>,
        );

        expect(screen.getByRole("banner")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Ohm's law" })).toHaveAttribute("aria-current", "page");
        expect(screen.getByRole("main")).toHaveTextContent("Calculator content");
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "www.steam-engine.org" })).toHaveAttribute("href", ".");
        expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    });

    it("starts with a localized skip link to the main content", () => {
        document.getElementById("root")!.dataset.locale = "de";
        const { container } = render(
            <SiteLayout basePath="./" currentRoute="ohm" rootHref=".">
                <main id="main">Calculator content</main>
            </SiteLayout>,
        );

        const firstLink = container.querySelector("a, button");
        expect(firstLink).toHaveTextContent("Zum Hauptinhalt springen");
        expect(firstLink).toHaveAttribute("href", "#main");
    });

    it("places the calculator ad placement between every calculator and the footer", () => {
        for (const route of ["ohm", "coil", "wirewiz", "batt", "modrange", "juice", "converter", "tcr"] as const) {
            render(
                <SiteLayout basePath="./" currentRoute={route} rootHref=".">
                    <main>{route} content</main>
                </SiteLayout>,
            );

            const ad = screen.getByLabelText("Advertisement");
            const footer = screen.getByRole("contentinfo");
            expect(ad).toHaveAttribute("data-ad-placement", "calculator-footer");
            expect(ad).toHaveAttribute("data-ad-context", route);
            expect(ad.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
            cleanup();
        }
    });

    it("uses an explicit root link for the home page header and footer", () => {
        const { container } = render(
            <SiteLayout basePath="" rootHref=".">
                <main>Home content</main>
            </SiteLayout>,
        );

        const homePage = within(container);
        expect(homePage.getByRole("link", { name: "Steam Engine home" })).toHaveAttribute("href", ".");
        expect(homePage.getByRole("link", { name: "www.steam-engine.org" })).toHaveAttribute("href", ".");
        expect(homePage.queryByRole("link", { name: "About this project" })).not.toBeInTheDocument();
    });

    it("places the configured ad on explicitly enabled landing pages", () => {
        render(
            <SiteLayout adPlacement="home-footer" basePath="./" rootHref=".">
                <main>Landing page content</main>
            </SiteLayout>,
        );

        expect(screen.getByLabelText("Advertisement")).toHaveAttribute("data-ad-placement", "home-footer");
    });

    it("renders the ad placement as a landmark labelled in the page language", () => {
        document.getElementById("root")!.dataset.locale = "de";
        render(
            <SiteLayout basePath="./" currentRoute="ohm" rootHref=".">
                <main>Calculator content</main>
            </SiteLayout>,
        );

        expect(screen.getByRole("complementary", { name: "Werbung" }))
            .toHaveAttribute("data-ad-placement", "calculator-footer");
    });

    it("keeps localized calculator home links slashless", () => {
        window.history.replaceState({}, "", "/nb/ohm");
        document.getElementById("root")!.dataset.locale = "nb";

        const { container } = render(
            <SiteLayout basePath="./" currentRoute="ohm" rootHref=".">
                <main>Calculator content</main>
            </SiteLayout>,
        );

        const page = within(container);
        expect(page.getByRole("link", { name: /Steam Engine/ })).toHaveAttribute("href", "../nb");
        expect(page.getByRole("link", { name: "www.steam-engine.org" })).toHaveAttribute("href", "../nb");
    });

    it("separates global navigation from the calculator tool strip", () => {
        const { unmount } = render(
            <SiteLayout basePath="./" currentRoute="ohm" rootHref=".">
                <main>Calculator content</main>
            </SiteLayout>,
        );
        const primaryNavigation = screen.getByRole("navigation", { name: "Primary navigation" });
        const calculatorNavigation = screen.getByRole("navigation", { name: "Calculator navigation" });
        const primaryLinks = within(primaryNavigation);
        const calculatorLinks = within(calculatorNavigation);
        const catalog = primaryLinks.getByRole("link", { name: "Catalog" });
        const blog = primaryLinks.getByRole("link", { name: "Blog" });
        const lightToggle = primaryLinks.getByRole("button", { name: "Switch to light mode" });
        const about = primaryLinks.getByRole("link", { name: "About" });
        const calculatorList = calculatorNavigation.querySelector(".site-nav__calculator-list");
        expect(primaryNavigation.querySelector(".site-nav__global")).toContainElement(catalog);
        expect(primaryNavigation.querySelector(".site-nav__global")).toContainElement(blog);
        expect(blog.nextElementSibling).toBe(lightToggle);
        expect(lightToggle.nextElementSibling).toBe(about);
        expect(screen.queryByText("Calculators", { exact: true })).not.toBeInTheDocument();
        expect(screen.queryByText("Choose a tool", { exact: true })).not.toBeInTheDocument();
        expect(calculatorList).toContainElement(calculatorLinks.getByRole("link", { name: "Ohm's law" }));
        expect(calculatorLinks.queryByRole("link", { name: "Convert" })).not.toBeInTheDocument();
        expect(calculatorLinks.getByRole("link", { name: "Ohm's law" })).toHaveAttribute("aria-current", "page");
        expect(lightToggle.querySelector('[data-icon="sun"]')).not.toBeNull();
        expect(document.documentElement).toHaveAttribute("data-theme", "dark");

        fireEvent.click(lightToggle);
        const darkToggle = screen.getByRole("button", { name: "Switch to dark mode" });
        expect(darkToggle.querySelector('[data-icon="moon"]')).not.toBeNull();
        expect(document.documentElement).toHaveAttribute("data-theme", "light");
        expect(JSON.parse(localStorage.getItem(themeStorageKey) ?? "{}")).toEqual({
            version: 1,
            theme: "light",
        });

        unmount();
        render(<SiteLayout basePath="./" rootHref="."><main>Reloaded content</main></SiteLayout>);
        expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
        expect(document.documentElement).toHaveAttribute("data-theme", "light");
    });

    it("scrolls the active calculator into view using container-relative coordinates", () => {
        const bounds = vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
            this: HTMLElement,
        ) {
            if (this.classList.contains("site-nav__calculator-list")) {
                return { left: 0, right: 300, width: 300 } as DOMRect;
            }
            if (this.textContent === "Battery drain") {
                return { left: 420, right: 520, width: 100 } as DOMRect;
            }
            return { left: 0, right: 0, width: 0 } as DOMRect;
        });
        const scrollWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollWidth");
        const clientWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "clientWidth");
        Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
            configurable: true,
            get(this: HTMLElement) { return this.classList.contains("site-nav__calculator-list") ? 1000 : 0; },
        });
        Object.defineProperty(HTMLElement.prototype, "clientWidth", {
            configurable: true,
            get(this: HTMLElement) { return this.classList.contains("site-nav__calculator-list") ? 300 : 0; },
        });
        const scrollTo = vi.fn();
        const originalScrollTo = HTMLElement.prototype.scrollTo;
        HTMLElement.prototype.scrollTo = scrollTo;

        render(<SiteLayout basePath="./" currentRoute="batt" rootHref=".">
            <main>Battery calculator</main>
        </SiteLayout>);

        expect(scrollTo).toHaveBeenCalledWith({ left: 320 });
        bounds.mockRestore();
        HTMLElement.prototype.scrollTo = originalScrollTo;
        if (scrollWidthDescriptor) Object.defineProperty(HTMLElement.prototype, "scrollWidth", scrollWidthDescriptor);
        else Reflect.deleteProperty(HTMLElement.prototype, "scrollWidth");
        if (clientWidthDescriptor) Object.defineProperty(HTMLElement.prototype, "clientWidth", clientWidthDescriptor);
        else Reflect.deleteProperty(HTMLElement.prototype, "clientWidth");
    });

    it("shows the cache purge button locally and preserves unrelated storage", () => {
        localStorage.setItem("steamengine.api-cache.v1.example", "cached");
        localStorage.setItem("steamengine.theme.v1", "keep");

        render(<SiteFooter homeHref=".." />);

        expect(isLocalhost("localhost")).toBe(true);
        expect(isLocalhost("www.steam-engine.org")).toBe(false);
        fireEvent.click(screen.getByRole("button", { name: "Purge cache" }));
        expect(localStorage.getItem("steamengine.api-cache.v1.example")).toBeNull();
        expect(localStorage.getItem("steamengine.theme.v1")).toBe("keep");
    });

    it("prefills translation correction email context for machine-drafted locales", () => {
        const root = document.getElementById("root")!;
        root.dataset.locale = "es";
        window.history.replaceState({}, "", "/es/ohm");

        render(<SiteFooter homeHref=".." />);

        expect(screen.getByText(/redactada por máquina y está pendiente de revisión humana/))
            .toBeInTheDocument();
        const link = screen.getByRole("link", { name: "Sugerir una corrección" });
        fireEvent.focus(link);
        const correctionEmail = decodeURIComponent(link.getAttribute("href") ?? "").replaceAll("+", " ");
        expect(correctionEmail).toMatch(/^mailto:/);
        expect(correctionEmail).toContain("Locale: es");
        expect(correctionEmail).toContain("Page: /es/ohm");
    });

    it("shows a translation correction prompt for machine-review Bokmål", () => {
        const root = document.getElementById("root")!;
        root.dataset.locale = "nb";

        render(<SiteFooter homeHref=".." />);

        expect(screen.getByRole("link", { name: "Foreslå en rettelse" })).toBeInTheDocument();
    });

    it("offers translation correction email on a stable translated locale", () => {
        const root = document.getElementById("root")!;
        root.dataset.locale = "tr";

        render(<SiteFooter homeHref=".." />);

        expect(screen.queryByText(/machine/i)).not.toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Düzeltme önerin" })).toBeInTheDocument();
    });

    it("offers a visible correction link for every published translated locale", () => {
        const root = document.getElementById("root")!;
        for (const { code } of localeDefinitions.filter(({ code }) => code !== "en")) {
            root.dataset.locale = code;
            const { container } = render(<SiteFooter homeHref=".." />);
            expect(container.querySelector('a[href="#translation-correction"]'), code).not.toBeNull();
            cleanup();
        }
    });
});
