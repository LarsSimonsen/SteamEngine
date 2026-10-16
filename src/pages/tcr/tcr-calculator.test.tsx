import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { materialStorageKey } from "../../catalogs/materials/persistence";
import { TcrCalculator } from "./tcr-calculator";

describe("TcrCalculator", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL) => {
            const query = new URL(String(input)).searchParams;
            const selected = JSON.parse(query.get("m") ?? "[]") as Array<{ i: number; n: string; r: number }>;
            const points = Array.from({ length: 7 }, (_, index) => 1 + index * 0.01);
            return new Response(JSON.stringify(selected.length === 0
                ? { kind: "empty" }
                : {
                    kind: "valid",
                    rows: selected.map((material) => ({ id: material.i,
                        material: { name: material.n, tfr: false }, resistance: material.r,
                        resistances: points.map((factor) => material.r * factor), extrapolated: false })),
                    totalResistances: points,
                    normalizedFactors: points,
                    extrapolated: false,
                    sensitivityPercent: 100,
                    csv: { kind: "ready", text: "csv" },
                }), { status: 200, headers: { "Content-Type": "application/json" } });
        }));
    });
    afterEach(() => {
        vi.unstubAllGlobals();
        cleanup();
    });

    it("renders the calculator without adding TCR to primary navigation", () => {
        render(<TcrCalculator />);
        expect(screen.getByRole("heading", { name: "Temperature coefficient of resistance" }))
            .toBeInTheDocument();
        expect(within(screen.getByRole("navigation", { name: "Primary navigation" }))
            .queryByRole("link", { name: "TCR" })).not.toBeInTheDocument();
        const note = screen.getByText("Need a complete coil model?").closest("aside");
        expect(note).not.toBeNull();
        expect(within(note!).getByRole("link", { name: "Wire Wizard" }))
            .toHaveAttribute("href", "../wirewiz");
    });

    it("places material management in the header and normal page flow", () => {
        const { container } = render(<TcrCalculator />);
        const header = container.querySelector(".tcr-page-header");
        expect(header).not.toBeNull();
        expect(within(header as HTMLElement).getByRole("button", { name: "Manage materials" }))
            .toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: "Manage materials" }));

        expect(header?.nextElementSibling).toHaveAttribute("id", "tcr-material-manager");
        expect(screen.getByRole("heading", { name: /^Manage materials/ })).toBeInTheDocument();
    });

    it("adds and removes a material and displays its calculated curve", async () => {
        render(<TcrCalculator />);
        fireEvent.change(screen.getByLabelText("Material to add"), { target: { value: "ni200" } });
        fireEvent.click(screen.getByRole("button", { name: "Add material" }));
        await waitFor(() => expect(screen.getByText("Total parallel resistance")).toBeInTheDocument());
        expect(screen.getByText("100%")).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", {
            name: "Remove Nickel 200 / Ni200 (UNS N02200) 1",
        }));
        await waitFor(() => expect(screen.getByText("Add one or more materials to calculate a resistance curve."))
            .toBeInTheDocument());
    });

    it("persists selected materials and restores them after remounting", async () => {
        const first = render(<TcrCalculator />);
        fireEvent.change(screen.getByLabelText("Material to add"), { target: { value: "ss316l" } });
        fireEvent.click(screen.getByRole("button", { name: "Add material" }));
        first.unmount();
        render(<TcrCalculator />);
        await waitFor(() => expect(screen.getByRole("button", { name: "Remove SS 316L / Elite 1" }))
            .toBeInTheDocument());
    });

    it("uses custom temperature materials and blocks deletion while selected", async () => {
        const customId = "6e77a93d-5306-45ca-b13e-8189936df8b2";
        localStorage.setItem(materialStorageKey, JSON.stringify({
            version: 1,
            customMaterials: [{
                id: customId,
                name: "Test TCR alloy",
                resistivity: 1.23,
                heatCapacity: null,
                density: null,
                tcr: 0.002,
            }],
            hiddenDefaultMaterialIds: [],
        }));
        render(<TcrCalculator />);

        fireEvent.change(screen.getByLabelText("Material to add"), {
            target: { value: customId },
        });
        fireEvent.click(screen.getByRole("button", { name: "Add material" }));
        await waitFor(() => expect(screen.getByRole("button", { name: "Remove Test TCR alloy 1" }))
            .toBeInTheDocument());

        fireEvent.click(screen.getByRole("button", { name: "Manage materials" }));
        fireEvent.click(screen.getByRole("button", { name: "Delete" }));
        expect(screen.getByRole("status")).toHaveTextContent(
            "Cannot delete Test TCR alloy; it is used by Current TCR calculator settings.",
        );
    });

    it("validates temperature points and converts the visible scale", () => {
        render(<TcrCalculator />);
        const points = screen.getByLabelText("Comma-separated temperatures");
        fireEvent.change(points, { target: { value: "20,10" } });
        fireEvent.blur(points);
        expect(screen.getByRole("alert")).toHaveTextContent("ascending order");
        fireEvent.change(points, { target: { value: "-100,0,70,200" } });
        fireEvent.blur(points);
        fireEvent.click(screen.getByRole("button", { name: "Temperature scale: °F" }));
        expect(points).toHaveValue("-73.3333,-17.7778,21.1111,93.3333");
    });
});
