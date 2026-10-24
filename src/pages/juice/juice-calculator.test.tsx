import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { JuiceSettings } from "./domain";
import { JuiceCalculator } from "./juice";

const calculateJuiceMock = vi.hoisted(() => vi.fn(async (_settings: JuiceSettings) => ({
    nicBase: { rows: [], totalVolume: 0, totalWeight: 0, density: 0 },
    target: { rows: [], totalVolume: 0, totalWeight: 0, density: 0 },
    recipe: { rows: [], totalVolume: 0, totalWeight: 0, density: 0 },
    canMix: true,
    targetNicotineWarning: false,
})));

vi.mock("./api", () => ({ calculateJuiceFromApi: calculateJuiceMock }));

describe("JuiceCalculator", () => {
    beforeEach(() => {
        localStorage.clear();
        calculateJuiceMock.mockClear();
    });
    afterEach(() => cleanup());

    it("preserves small decimal drafts and sends their exact numeric percentages", async () => {
        render(<JuiceCalculator />);
        const input = screen.getByLabelText("Flavor percentage 1") as HTMLInputElement;
        expect(input).toHaveAttribute("step", "0.01");
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: "0.0" } });
        expect(input.value).toBe("0.0");
        for (const value of ["0.02", "0.04"]) {
            fireEvent.change(input, { target: { value } });
            expect(input.value).toBe(value);
            await waitFor(() => expect(calculateJuiceMock).toHaveBeenLastCalledWith(expect.objectContaining({
                flavors: [{ nm: "Flavor", perc: Number(value), vg: false }],
            })));
        }
    });

    it("keeps focus while editing a flavor name", () => {
        render(<JuiceCalculator />);
        const name = screen.getByLabelText("Flavor 1");
        name.focus();

        fireEvent.change(name, { target: { value: "Vanilla" } });

        expect(name).toHaveFocus();
        expect(name).toHaveValue("Vanilla");
    });

    it("keeps empty flavor drafts out of calculation requests", async () => {
        render(<JuiceCalculator />);
        const name = screen.getByLabelText("Flavor 1");
        const percentage = screen.getByLabelText("Flavor percentage 1");

        fireEvent.change(name, { target: { value: "Vanilla" } });
        await waitFor(() => expect(calculateJuiceMock).toHaveBeenLastCalledWith(expect.objectContaining({
            flavors: [{ nm: "Vanilla", perc: 0, vg: false }],
        })));

        fireEvent.change(name, { target: { value: "" } });
        expect(name).toHaveValue("");
        await waitFor(() => expect(calculateJuiceMock).toHaveBeenLastCalledWith(expect.objectContaining({
            flavors: [],
        })));

        fireEvent.change(name, { target: { value: "Vanilla" } });
        fireEvent.change(percentage, { target: { value: "" } });
        expect(percentage).toHaveValue(null);
        await waitFor(() => expect(calculateJuiceMock).toHaveBeenLastCalledWith(expect.objectContaining({
            flavors: [],
        })));
    });

    it("allows every ratio field to be cleared before entering a replacement", () => {
        render(<JuiceCalculator />);
        const ratios = [
            ["base VG", "base PG", "40", 60],
            ["base PG", "base VG", "25", 75],
            ["target VG", "target PG", "65", 35],
            ["target PG", "target VG", "80", 20],
        ] as const;

        for (const [editedLabel, oppositeLabel, replacement, oppositeValue] of ratios) {
            const edited = screen.getByLabelText(editedLabel);
            fireEvent.change(edited, { target: { value: "" } });
            expect(edited).toHaveValue(null);

            fireEvent.change(edited, { target: { value: replacement } });
            expect(edited).toHaveValue(Number(replacement));
            expect(screen.getByLabelText(oppositeLabel)).toHaveValue(oppositeValue);
        }
    });

    it("uses consistent batch and nicotine units with valid defaults", () => {
        render(<JuiceCalculator />);

        expect(screen.queryByRole("radio", { name: /weight/i })).not.toBeInTheDocument();
        expect(screen.getByRole("spinbutton", { name: "Amount you want to make mL" })).toHaveValue(10);
        const strengths = screen.getAllByRole("spinbutton", { name: "Nic strength mg/mL" });
        expect(strengths[0]).toHaveValue(27);
        expect(strengths[1]).toHaveValue(18);
        expect(strengths[0]).toHaveAttribute("max", "1000");
        expect(strengths[1]).toHaveAttribute("max", "100");
    });

    it("offers explicit PG and VG carrier choices for each flavor", async () => {
        render(<JuiceCalculator />);
        const pg = screen.getByRole("radio", { name: "PG" });
        const vg = screen.getByRole("radio", { name: "VG" });

        expect(screen.getAllByRole("radio")).toEqual([vg, pg]);
        expect(pg).toBeChecked();
        expect(vg).not.toBeChecked();
        fireEvent.click(vg);

        expect(vg).toBeChecked();
        await waitFor(() => expect(calculateJuiceMock).toHaveBeenLastCalledWith(expect.objectContaining({
            flavors: [{ nm: "Flavor", perc: 0, vg: true }],
        })));
    });

    it("exposes detail disclosure state and saved-setting availability", () => {
        render(<JuiceCalculator />);
        const details = screen.getAllByRole("button", { name: "Show details" })[0];

        expect(details).toHaveAttribute("aria-expanded", "false");
        fireEvent.click(details);
        expect(details).toHaveAttribute("aria-expanded", "true");
        expect(document.getElementById("juice-base-details")).toBeVisible();

        fireEvent.click(screen.getByText("Menu", { selector: "summary" }));
        expect(screen.getByRole("button", { name: "Load" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Reset" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Save" })).toBeEnabled();
    });
});
