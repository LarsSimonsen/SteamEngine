import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { languagePreferenceStorageKey } from "../../i18n/language-preference";
import { messagesFor } from "../../i18n/messages";
import { LanguageSwitcher } from "./language-switcher";

describe("language switcher", () => {
    beforeEach(() => {
        window.history.replaceState({}, "", "/ohm");
        localStorage.clear();
    });
    afterEach(cleanup);

    it("opens a route-preserving filter and matches the native name or hidden English alias", () => {
        render(<LanguageSwitcher locale="en" navigation={messagesFor("en").navigation} />);

        const trigger = screen.getByRole("button", { name: "Language: English" });
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
        fireEvent.click(trigger);

        expect(screen.getByRole("textbox", { name: "Filter languages" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Bokmål/ })).toHaveAttribute("href", "nb/ohm");
        expect(screen.getByText("Norwegian Bokmål", { selector: ".sr-only" })).toBeInTheDocument();

        expect(trigger).toHaveAttribute("aria-expanded", "true");
        expect(trigger).not.toHaveAttribute("aria-haspopup");
        expect(screen.getByRole("status")).toBeEmptyDOMElement();

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "norwegian" } });
        expect(screen.getByRole("status")).toHaveTextContent("Languages found: 2");
        expect(screen.getByRole("link", { name: /Bokmål/ })).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /^English/ })).not.toBeInTheDocument();

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "unknown" } });
        expect(screen.getByRole("status")).toHaveTextContent("No languages found.");
    });

    it("marks each language name and its English alias with their own language", () => {
        render(<LanguageSwitcher locale="de" navigation={messagesFor("de").navigation} />);
        fireEvent.click(screen.getByRole("button", { name: "Sprache: Deutsch" }));

        const arabic = screen.getByRole("link", { name: /Arabic/ });
        expect(arabic).toHaveAttribute("hrefLang", "ar");
        expect(arabic.querySelector("[lang='ar']")).toHaveTextContent("العربية");
        expect(screen.getByText("Arabic", { selector: ".sr-only" })).toHaveAttribute("lang", "en");
    });

    it("localizes the empty state and clears the filter when Escape closes the menu", () => {
        render(<LanguageSwitcher locale="nb" navigation={messagesFor("nb").navigation} />);

        fireEvent.click(screen.getByRole("button", { name: "Språk: Bokmål" }));
        const filter = screen.getByRole("textbox", { name: "Filtrer språk" });
        fireEvent.change(filter, { target: { value: "unknown" } });
        expect(screen.getByRole("status")).toHaveTextContent("Ingen språk funnet.");

        fireEvent.keyDown(filter, { key: "Escape" });
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Språk: Bokmål" })).toHaveFocus();
        expect(screen.getByRole("button", { name: "Språk: Bokmål" })).not.toHaveAttribute("aria-controls");

        fireEvent.click(screen.getByRole("button", { name: "Språk: Bokmål" }));
        expect(screen.getByRole("textbox")).toHaveValue("");
    });

    it("puts a saved preference first and remembers the selected language", () => {
        localStorage.setItem(languagePreferenceStorageKey, JSON.stringify({ version: 1, locale: "fr" }));
        render(<LanguageSwitcher locale="en" navigation={messagesFor("en").navigation} />);

        fireEvent.click(screen.getByRole("button", { name: "Language: English" }));

        expect(screen.getAllByRole("link")[0]).toHaveAttribute("href", "fr/ohm");
        fireEvent.click(screen.getByRole("link", { name: /Deutsch/ }));

        expect(JSON.parse(localStorage.getItem(languagePreferenceStorageKey) ?? "null")).toEqual({
            version: 1,
            locale: "de",
        });
    });

    it("clears the filter when focus leaves the dropdown", () => {
        render(<LanguageSwitcher locale="en" navigation={messagesFor("en").navigation} />);

        fireEvent.click(screen.getByRole("button", { name: "Language: English" }));
        const filter = screen.getByRole("textbox");
        fireEvent.change(filter, { target: { value: "bok" } });
        fireEvent.blur(filter, { relatedTarget: document.body });

        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });
});
