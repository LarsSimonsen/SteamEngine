import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import {
    ModComparisonPage,
    modComparisonPowerCurveScale,
    modComparisonSearch,
    modSlugsFromSearch,
    platformNoticeState,
} from
    "./mod-comparison-page";
import type { ModRangeApiResponse } from "../../modrange/api";

afterEach(cleanup);

describe("mod comparison query", () => {
    it("reads and writes optional catalog slugs", () => {
        expect(modSlugsFromSearch("?a=geekvape-aegis-solo-3&b=dna30d")).toEqual({
            a: "geekvape-aegis-solo-3",
            b: "dna30d",
        });
        expect(modComparisonSearch("geekvape-aegis-solo-3")).toBe("?a=geekvape-aegis-solo-3");
    });

    it("suppresses mismatch notices when platform details are unknown", () => {
        expect(platformNoticeState("box-mod", "control-board", undefined, "single 18650")).toEqual({
            differs: false,
            unknown: true,
        });
        expect(platformNoticeState("box-mod", "control-board", "single 18650", "none")).toEqual({
            differs: true,
            unknown: false,
        });
    });

    it("uses one resistance and power scale for both comparison curves", () => {
        const response = (minimumResistance: number, maximumResistance: number, globalMaximumPower: number) => ({
            graph: { bounds: { minimumResistance, maximumResistance, globalMaximumPower } },
        } as ModRangeApiResponse);

        expect(modComparisonPowerCurveScale({
            a: response(0, 8, 120),
            b: response(0, 12, 200),
        })).toEqual({ minimumResistance: 0, maximumResistance: 12, globalMaximumPower: 200 });
    });
});

describe("mod comparison page", () => {
    it("uses one canonical option for a board with multiple operating profiles", () => {
        window.history.replaceState(null, "", "/compare/mods?a=dna40");
        render(<ModComparisonPage />);

        expect(screen.getAllByRole("option", { name: /^Evolv DNA-40/ })).toHaveLength(2);
        expect(screen.queryByRole("option", { name: /DNA-40 \(std\. wire\)/ })).not.toBeInTheDocument();
        expect(screen.queryByRole("option", { name: /DNA-40 \(Ni 200\)/ })).not.toBeInTheDocument();
        expect(screen.queryByText("dna40")).not.toBeInTheDocument();
        expect(screen.getAllByRole("option", { name: /Evolv DNA-40.*40 W.*9 V/ })).toHaveLength(2);
    }, 10_000);

    it("leaves an unselected side empty and links the selected heading", async () => {
        window.history.replaceState(null, "", "/compare/mods?a=geekvape-aegis-solo-3");
        render(<ModComparisonPage />);
        expect(screen.getByRole("heading", { name: "Compare mods/boards" })).toBeInTheDocument();
        const breadcrumbs = screen.getByRole("navigation", { name: "Breadcrumb" });
        expect(breadcrumbs).toHaveTextContent(
            "Steam Engine/Catalog/Compare mods/boards",
        );
        expect(within(breadcrumbs).getByRole("link", { name: "Catalog" })).toHaveAttribute("href", "../catalog");
        expect(document.querySelector(".battery-comparison__column-headings"))
            .toHaveTextContent("Select mod/board B");
        const headingLink = screen.getAllByRole("link", { name: /Geekvape Aegis Solo 3/i })[0];
        expect(headingLink).toHaveAttribute("href", "../catalog/mod/geekvape-aegis-solo-3");
        expect(screen.queryByText("Research-only")).not.toBeInTheDocument();
        await waitFor(() => expect(screen.getAllByText("—").length).toBeGreaterThan(0));
    });

    it("updates the shareable query when selections are swapped", async () => {
        window.history.replaceState(null, "", "/compare/mods?a=geekvape-aegis-solo-3&b=dna30d");
        render(<ModComparisonPage />);
        fireEvent.click(document.querySelector(".battery-comparison__swap")!);
        expect(window.location.search).toBe("?a=dna30d&b=geekvape-aegis-solo-3");
    });

    it("places weight at the bottom of the platform section", () => {
        window.history.replaceState(null, "", "/compare/mods?a=geekvape-aegis-solo-3&b=dna30d");
        render(<ModComparisonPage />);

        const platformSection = screen.getByRole("heading", { name: "Platform" }).closest("section")!;
        const platformRows = platformSection.querySelectorAll("dl > div");
        expect(platformRows[platformRows.length - 1]).toHaveTextContent("Weight (g)");

        const atomizerSection = screen.getByRole("heading", { name: "Atomizer range" }).closest("section")!;
        expect(atomizerSection).not.toHaveTextContent("Weight (g)");
    });
});
