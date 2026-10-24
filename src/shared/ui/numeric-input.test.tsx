import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NumericField } from "./form-fields";
import { NumericDraftReset, NumericInput } from "./numeric-input";

afterEach(cleanup);

describe("NumericInput", () => {
    it("preserves intermediate zeros and text despite normalized calculation responses", () => {
        const onChange = vi.fn();
        const view = render(<NumericInput aria-label="Value" value={1} onChange={onChange} />);
        const input = screen.getByRole("spinbutton") as HTMLInputElement;
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: "0.0" } });
        view.rerender(<NumericInput aria-label="Value" value={0} onChange={onChange} />);
        expect(input.value).toBe("0.0");
        fireEvent.change(input, { target: { value: "0.02" } });
        expect(input.value).toBe("0.02");
        fireEvent.blur(input);
        expect(input.value).toBe("0.02");
    });

    it("keeps empty and out-of-range drafts out of numeric-only models", () => {
        const onChange = vi.fn();
        render(<NumericInput value={2} min={0.01} validChangesOnly onChange={onChange} />);
        const input = screen.getByRole("spinbutton") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "" } });
        expect(input.value).toBe("");
        fireEvent.change(input, { target: { value: "0" } });
        fireEvent.blur(input);
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(onChange).not.toHaveBeenCalled();
        fireEvent.change(input, { target: { value: "0.02" } });
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("does not treat the arrow step as a precision restriction", () => {
        const onChange = vi.fn();
        render(<NumericInput value={2} min={0} step={1} validChangesOnly onChange={onChange} />);
        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: "0.004" } });
        fireEvent.blur(input);
        expect(input).not.toHaveAttribute("aria-invalid");
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("accepts explicit resets even when the model value has not changed", () => {
        const view = render(<NumericDraftReset.Provider value={0}>
            <NumericInput value={2} />
        </NumericDraftReset.Provider>);
        const input = screen.getByRole("spinbutton") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "" } });
        view.rerender(<NumericDraftReset.Provider value={1}>
            <NumericInput value={2} />
        </NumericDraftReset.Provider>);
        expect(input.value).toBe("2");
    });

    it("accepts a changed preset when no edit is active", () => {
        const view = render(<NumericInput value={2} />);
        view.rerender(<NumericInput value={3} />);
        expect(screen.getByRole("spinbutton")).toHaveValue(3);
    });

    it("validates integer requirements without rewriting the draft", () => {
        const onChange = vi.fn();
        render(<NumericInput value={2} integer validChangesOnly onChange={onChange} />);
        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: "2.5" } });
        fireEvent.keyDown(input, { key: "Enter" });
        expect(input).toHaveValue(2.5);
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(onChange).not.toHaveBeenCalled();
    });
});

describe("numeric input errors", () => {
    it("explains an invalid value in text without changing the accessible name", () => {
        render(<label><span>Inner diameter</span>
            <NumericInput value={2} min={0.01} max="10" validChangesOnly onChange={() => undefined} />
        </label>);
        const input = screen.getByRole("spinbutton", { name: "Inner diameter" });
        fireEvent.change(input, { target: { value: "20" } });
        fireEvent.blur(input);

        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveAccessibleName("Inner diameter");
        expect(input).toHaveAccessibleDescription("Enter a number from 0.01 to 10.");
        expect(screen.getByText("Enter a number from 0.01 to 10.")).toBeVisible();

        fireEvent.change(input, { target: { value: "5" } });
        expect(input).not.toHaveAccessibleDescription();
    });

    it("asks for a whole number in the page language", () => {
        document.body.innerHTML = '<div id="root" data-locale="de"></div>';
        render(<NumericInput aria-label="Stränge" value={2} min={1} integer validChangesOnly
            onChange={() => undefined} />);
        const input = screen.getByRole("spinbutton");
        fireEvent.change(input, { target: { value: "2.5" } });
        fireEvent.blur(input);

        expect(input).toHaveAccessibleDescription(
            "Geben Sie eine Zahl von mindestens 1 ein. Verwenden Sie eine ganze Zahl.");
        document.body.innerHTML = "";
    });

    it("names a numeric field by its label and unit and describes it by help and error text", () => {
        render(<NumericField label="Resistance" unit="Ω" value={1} min={0.01} help="Coil resistance."
            onChange={() => undefined} />);
        const input = screen.getByRole("spinbutton");
        expect(input).toHaveAccessibleName("Resistance Ω");
        expect(input).toHaveAccessibleDescription("Coil resistance.");

        fireEvent.change(input, { target: { value: "0" } });
        fireEvent.blur(input);

        expect(input).toHaveAccessibleName("Resistance Ω");
        expect(input).toHaveAccessibleDescription("Coil resistance. Enter a number of at least 0.01.");
        expect(screen.getByRole("alert")).toHaveTextContent("Enter a number of at least 0.01.");
    });
});
