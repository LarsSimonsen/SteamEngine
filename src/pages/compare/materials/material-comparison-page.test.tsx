import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
    MaterialComparisonPage,
    materialComparisonSearch,
    materialSlugsFromSearch,
    temperatureCapabilityDiffers,
} from "./material-comparison-page";

afterEach(cleanup);
beforeEach(() => {
    document.body.innerHTML = '<div id="root" data-locale="en"></div>';
});

describe("material comparison query", () => {
    it("reads and writes optional catalog slugs", () => {
        expect(materialSlugsFromSearch("?a=kanthal-a1&b=ss-316l")).toEqual({
            a: "kanthal-a1",
            b: "ss-316l",
        });
        expect(materialComparisonSearch("kanthal-a1")).toBe("?a=kanthal-a1");
    });

    it("only reports a mismatch when one material lacks a temperature profile", () => {
        expect(temperatureCapabilityDiffers({ tcr: 0.001 }, {})).toBe(true);
        expect(temperatureCapabilityDiffers({ tcr: 0.001 }, { tfr: [[20, 1]] })).toBe(false);
        expect(temperatureCapabilityDiffers(undefined, { tcr: 0.001 })).toBe(false);
    });
});

describe("material comparison page", () => {
    it("leaves an unselected side empty, excludes concepts, and links the selected heading", () => {
        window.history.replaceState(null, "", "/compare/materials?a=kanthal-a1");
        render(<MaterialComparisonPage />);

        expect(screen.getByRole("heading", { name: "Compare materials" })).toBeInTheDocument();
        const breadcrumbs = screen.getByRole("navigation", { name: "Breadcrumb" });
        expect(breadcrumbs).toHaveTextContent("Steam Engine/Catalog/Compare materials");
        expect(within(breadcrumbs).getByRole("link", { name: "Catalog" })).toHaveAttribute("href", "../catalog");
        expect(screen.getAllByRole("link", { name: /Kanthal A1/i })[0]).toHaveAttribute(
            "href",
            "../catalog/material/kanthal-a1",
        );
        expect(screen.queryByRole("option", { name: "Ohm's law" })).not.toBeInTheDocument();
        expect(screen.queryByText("kanthal-a1")).not.toBeInTheDocument();
        expect(screen.getAllByText(/Ω·mm²\/m ·/).length).toBeGreaterThan(0);
    });

    it("uses an em dash when a material has no aliases", () => {
        window.history.replaceState(null, "", "/compare/materials?a=kanthal-a1&b=ss-316l");
        render(<MaterialComparisonPage />);

        const aliases = screen.getByText("Aliases").parentElement!;
        expect(aliases).toHaveTextContent("—");
        expect(aliases).not.toHaveTextContent("Unknown");
    });

    it("shows the compact profile notice only when one selected material lacks profile data", () => {
        window.history.replaceState(null, "", "/compare/materials?a=kanthal-a1&b=nichrome-n20");
        render(<MaterialComparisonPage />);

        expect(screen.getByText(/one selected material has a catalog temperature-control profile/i))
            .toBeInTheDocument();
        expect(screen.getByText("Full resistance curve")).toBeInTheDocument();
    });

    it("does not show the notice for two different kinds of temperature profile", () => {
        window.history.replaceState(null, "", "/compare/materials?a=kanthal-a1&b=ss-317l");
        render(<MaterialComparisonPage />);

        expect(screen.queryByText(/one selected material has a catalog temperature-control profile/i))
            .not.toBeInTheDocument();
        expect(screen.getByText("940 ppm/K")).toBeInTheDocument();
    });

    it("updates the shareable query when selections are swapped", () => {
        window.history.replaceState(null, "", "/compare/materials?a=kanthal-a1&b=ss-316l");
        render(<MaterialComparisonPage />);
        fireEvent.click(document.querySelector(".battery-comparison__swap")!);
        expect(window.location.search).toBe("?a=ss-316l&b=kanthal-a1");
    });
});
