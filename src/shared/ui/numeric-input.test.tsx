import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
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
