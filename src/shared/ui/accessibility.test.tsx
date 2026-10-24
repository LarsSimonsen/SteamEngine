import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { messagesFor } from "../../i18n/messages";
import { requestJson } from "../backend-request";
import { axeViolations } from "../test-axe";
import { BackendErrorBoundary } from "./backend-error-boundary";
import { NumericField, SelectField } from "./form-fields";
import { LanguageSwitcher } from "./language-switcher";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

describe("shared components have no axe violations", () => {
    beforeEach(() => {
        localStorage.clear();
        document.body.innerHTML = '<div id="root" data-locale="en"></div>';
        window.history.replaceState({}, "", "/ohm");
    });
    afterEach(() => {
        cleanup();
        vi.unstubAllGlobals();
    });

    it("site header", async () => {
        const { container } = render(<SiteHeader basePath="./" currentRoute="ohm" rootHref="." />);

        expect(await axeViolations(container)).toEqual([]);
    });

    it("site footer on a localized page", async () => {
        document.getElementById("root")!.dataset.locale = "de";
        const { container } = render(<SiteFooter homeHref="." />);

        expect(await axeViolations(container)).toEqual([]);
    });

    it("open language switcher", async () => {
        const { container } = render(<LanguageSwitcher locale="en" navigation={messagesFor("en").navigation} />);
        fireEvent.click(screen.getByRole("button", { name: "Language: English" }));

        expect(await axeViolations(container)).toEqual([]);
    });

    it("numeric and select fields with help and error text", async () => {
        const { container } = render(<form>
            <NumericField id="resistance" label="Resistance" unit="Ω" value="0" min={0.01} onChange={() => undefined}
                help="Coil resistance." error="Enter a value of at least 0.01." />
            <NumericField label="Voltage" unit="V" value="3.7" onChange={() => undefined} />
            <SelectField id="lock" label="Lock" value="r" onChange={() => undefined} help="Kept constant."
                options={[{ value: "r", label: "Resistance" }, { value: "v", label: "Voltage" }]} />
        </form>);

        expect(await axeViolations(container)).toEqual([]);
    });

    it("calculation error dialog", async () => {
        vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("Failed to fetch"))));
        const { container } = render(<BackendErrorBoundary><p>Calculator</p></BackendErrorBoundary>);
        await requestJson("https://api.example.test/api/v1/ohm", undefined, "Ohm's law").catch(() => undefined);
        await screen.findByRole("alertdialog");

        expect(await axeViolations(container)).toEqual([]);
    });
});
