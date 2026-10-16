import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadEntityRecord } from "../../encyclopedia/entity-record-loader";
import {
    BatteryComparisonPage,
    batterySlugsFromSearch,
    comparisonSearch,
    constructionNoticeState,
    dischargeRatingText,
} from "./battery-comparison-page";

vi.mock("../../encyclopedia/entity-record-loader", () => ({
    loadEntityRecord: vi.fn(async () => undefined),
}));

afterEach(cleanup);

describe("battery comparison query state", () => {
    it("reads and writes stable battery slugs", () => {
        expect(batterySlugsFromSearch("?a=first-cell&b=second-cell")).toEqual({
            a: "first-cell",
            b: "second-cell",
        });
        expect(comparisonSearch("first-cell", "second-cell")).toBe("?a=first-cell&b=second-cell");
        expect(comparisonSearch(undefined, "second-cell")).toBe("?b=second-cell");
    });
});

describe("battery discharge ratings", () => {
    it("derives and rounds a C rating from an amp rating", () => {
        expect(dischargeRatingText("en", {
            ratedCapacityMah: 3680,
            continuousDischargeCurrentAmps: 30,
        }, "Unknown")).toBe("30 A (8.15 C)");
    });

    it("derives and rounds an amp rating from a C rating", () => {
        expect(dischargeRatingText("en", {
            ratedCapacityMah: 3806,
            continuousDischargeCRating: 8,
        }, "Unknown")).toBe("8 C (30.45 A)");
    });
});

describe("construction compatibility notices", () => {
    const complete = (chemistry: string, nominalVoltage: number) => ({
        compatibility: ["removable", "18650", false, "green", nominalVoltage],
        completeness: ["removable", "18650", false, "green", nominalVoltage, chemistry],
    });

    it("does not warn when only chemistry differs", () => {
        expect(constructionNoticeState(complete("NMC", 3.7), complete("NCA", 3.7))).toEqual({
            differs: false,
            unknown: false,
        });
    });

    it("warns when nominal voltage differs", () => {
        expect(constructionNoticeState(complete("NMC", 3.7), complete("NMC", 3.6))).toEqual({
            differs: true,
            unknown: false,
        });
    });
});

describe("BatteryComparisonPage", () => {
    beforeEach(() => {
        window.history.replaceState(null, "", "/compare/batteries");
        vi.mocked(loadEntityRecord).mockResolvedValue(undefined);
    });

    it("shows two catalog selectors and comparison sections", () => {
        render(<BatteryComparisonPage />);
        const breadcrumbs = screen.getByRole("navigation", { name: "Breadcrumb" });
        expect(breadcrumbs).toHaveTextContent(
            "Steam Engine/Catalog/Compare batteries",
        );
        expect(within(breadcrumbs).getByRole("link", { name: "Catalog" })).toHaveAttribute("href", "../catalog");
        expect(screen.getAllByText("Select battery A")).not.toHaveLength(0);
        expect(screen.getAllByText("Select battery B")).not.toHaveLength(0);
        expect(screen.getByRole("heading", { name: "Construction" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Electrical" })).toBeInTheDocument();
        expect(screen.queryByText("molicel-inr-21700-p45b")).not.toBeInTheDocument();
        expect(screen.getAllByRole("option", {
            name: /Molicel INR-21700-P45B.*4,500 mAh.*21700 · 45 A/,
        })).toHaveLength(2);
    });

    it("leaves comparison cells blank for an unselected battery", () => {
        window.history.replaceState(null, "", "/compare/batteries?a=aw-imr-14500-600mah");
        render(<BatteryComparisonPage />);
        const identitySection = screen.getByRole("heading", { name: "Identity" }).parentElement!;
        expect(identitySection.querySelectorAll("dd")[1]).toHaveTextContent("");
        expect(identitySection.querySelectorAll("dd")[1]).not.toHaveTextContent("Unknown");
    });

    it("swaps the query-string selections without reloading", () => {
        window.history.replaceState(null, "", "/compare/batteries?a=aw-imr-14500-600mah&b=lg-18650hg2");
        render(<BatteryComparisonPage />);
        fireEvent.click(screen.getByRole("button", { name: "Swap batteries" }));
        expect(window.location.search).toBe("?a=lg-18650hg2&b=aw-imr-14500-600mah");
    });

    it("links both comparison column headings to their catalog entries", () => {
        window.history.replaceState(null, "", "/compare/batteries?a=aw-imr-14500-600mah&b=lg-18650hg2");
        render(<BatteryComparisonPage />);
        expect(screen.getAllByRole("link", { name: /AW IMR 14500/ })).toContainEqual(expect.objectContaining({
            href: expect.stringMatching(/catalog\/battery\/aw-imr-14500-600mah$/),
        }));
        expect(screen.getAllByRole("link", { name: /LG 18650HG2/ })).toContainEqual(expect.objectContaining({
            href: expect.stringMatching(/catalog\/battery\/lg-18650hg2$/),
        }));
        const headings = document.querySelector(".battery-comparison__column-headings")!;
        expect(headings).toHaveTextContent("AW IMR 14500 600 mAh");
        expect(headings).toHaveTextContent("LG 18650HG2");
        expect(headings).not.toHaveTextContent("·");
    });

    it("shows only the unknown-construction notice when details are incomplete", async () => {
        window.history.replaceState(null, "", "/compare/batteries?a=aw-imr-14500-600mah&b=lg-18650hg2");
        render(<BatteryComparisonPage />);
        expect(await screen.findByText(/construction details are unknown/i)).toBeInTheDocument();
        expect(screen.queryByText(/differ in construction/i)).not.toBeInTheDocument();
    });

    it("warns about construction differences when all compared details are known", async () => {
        vi.mocked(loadEntityRecord).mockResolvedValue({ domainData: { chemistry: "NMC" } } as never);
        window.history.replaceState(null, "", "/compare/batteries?a=aw-imr-14500-600mah&b=sony-us18650vtc4");
        render(<BatteryComparisonPage />);
        expect(await screen.findByText(/differ in construction/i)).toBeInTheDocument();
        expect(screen.queryByText(/construction details are unknown/i)).not.toBeInTheDocument();
    });

    it("localizes known wrapper colors", async () => {
        const root = document.createElement("div");
        root.id = "root";
        root.dataset.locale = "nb";
        document.body.append(root);
        window.history.replaceState(null, "", "/nb/compare/batteries?a=aw-imr-14500-600mah");
        render(<BatteryComparisonPage />, { container: root });
        expect(await screen.findByText("Rød")).toBeInTheDocument();
    });

    it("repairs legacy chemistry mojibake for display", async () => {
        vi.mocked(loadEntityRecord).mockResolvedValue({
            domainData: { chemistry: "Lithium-ion ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â NMC" },
        } as never);
        window.history.replaceState(null, "", "/compare/batteries?a=sony-us18650vtc4");
        render(<BatteryComparisonPage />);
        expect(await screen.findByText("Lithium-ion — NMC")).toBeInTheDocument();
    });
});
