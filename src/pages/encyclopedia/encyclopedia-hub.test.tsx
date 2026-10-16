import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { batteryPresets } from "../../catalogs/batteries/defaults";
import { builtInPresets } from "../../catalogs/mods/presets";
import { concepts } from "../../catalogs/concepts/catalog";
import { materials } from "../../catalogs/materials/catalog";
import type { CatalogIntroduction } from "../../catalogs/entry-metadata";
import { EncyclopediaHub, introductionSortTime } from "./encyclopedia-hub";

afterEach(cleanup);
beforeEach(() => {
    localStorage.clear();
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
});

const slugsInCards = (): string[] => Array.from(document.querySelectorAll<HTMLAnchorElement>(
    ".encyclopedia-entry-card > a",
)).map((link) => link.getAttribute("href")?.split("/").pop() ?? "");

const cardSummaries = (): string[] => Array.from(document.querySelectorAll<HTMLElement>(
    ".encyclopedia-entry-card__summary",
)).map((summary) => summary.textContent ?? "");

const cardLinkForSlug = (slug: string): HTMLAnchorElement => document.querySelector<HTMLAnchorElement>(
    `.encyclopedia-entry-card > a[href$="/${slug}"]`,
) as HTMLAnchorElement;

const orderedSlugsByIntroduction = <T extends {
    readonly slug?: string;
    readonly displayName: string;
    readonly introduction?: CatalogIntroduction | null;
}>(
    items: readonly T[],
): string[] => [...new Map([...items]
    .filter((item): item is T & { readonly slug: string } => item.slug !== undefined)
    .map((item) => [item.slug, item] as const)).values()]
    .sort((left, right) => {
        const leftTime = introductionSortTime(left.introduction);
        const rightTime = introductionSortTime(right.introduction);
        if (leftTime === null && rightTime === null) return left.displayName.localeCompare(right.displayName);
        if (leftTime === null) return 1;
        if (rightTime === null) return -1;
        return rightTime - leftTime || left.displayName.localeCompare(right.displayName);
    })
    .map((item) => item.slug);

describe("encyclopedia hub", () => {
    it("sorts introduction ranges by their midpoint and undated entries last", () => {
        const range = {
            earliest: { date: "2020", event: "market-availability" as const, relation: "no-earlier-than" as const },
            latest: { date: "2024-02", event: "market-availability" as const, relation: "no-later-than" as const },
        };
        const earliestDate = Date.UTC(2020, 0, 1);
        const latestDate = Date.UTC(2024, 1, 1);

        expect(introductionSortTime(range)).toBe((earliestDate + latestDate) / 2);
        expect(introductionSortTime({ latest: range.latest })).toBe(latestDate);
        expect(introductionSortTime(null)).toBeNull();
    });

    it("shows catalog category filters", () => {
        render(<EncyclopediaHub />);

        expect(screen.getByRole("heading", { name: "Catalog" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Catalog" })).toHaveAttribute("href", "catalog");
        expect(screen.getByRole("button", { name: /^Concepts$/ })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /^Batteries$/ })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /^Materials$/ })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /^Mods and boards$/ })).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /Browse/ })).not.toBeInTheDocument();
    }, 15_000);

    it("localizes the catalog hub chrome on Bokmål pages", () => {
        document.body.innerHTML = '<div id="root" data-locale="nb"></div>';
        render(<EncyclopediaHub />, { container: document.getElementById("root")! });

        expect(screen.getByRole("heading", { name: "Katalog" })).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Søk etter navn, modeller eller aliaser")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Konsepter" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Steam Engine-forsiden" })).toHaveAttribute("href", "/nb");
    }, 15_000);

    it("keeps the selected category in the URL fragment", () => {
        render(<EncyclopediaHub />);

        fireEvent.click(screen.getByRole("button", { name: /^Concepts$/ }));
        expect(window.location.hash).toBe("#concepts");

        fireEvent.click(screen.getByRole("button", { name: /^All$/ }));
        expect(window.location.hash).toBe("");
    });

    it("pre-selects a category from the URL fragment", () => {
        window.history.replaceState(null, "", `${window.location.pathname}#materials`);

        render(<EncyclopediaHub />);

        expect(screen.getByRole("button", { name: /^Materials$/ }))
            .toHaveAttribute("aria-pressed", "true");
        expect(screen.getByRole("button", { name: /^All$/ }))
            .toHaveAttribute("aria-pressed", "false");
    });

    it("uses slashless URLs for every catalog link", () => {
        render(<EncyclopediaHub />);

        const homeLink = screen.getByRole("link", { name: "Steam Engine home" });
        expect(homeLink).toHaveAttribute("href", "/");

        const hrefs = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]"))
            .filter((link) => link !== homeLink && !link.classList.contains("site-footer__home-link"))
            .map((link) => link.getAttribute("href"));
        expect(hrefs.length).toBeGreaterThan(0);
        expect(hrefs.every((href) => href !== null && !href.endsWith("/"))).toBe(true);
    }, 10_000);

    it("filters entries by category and search text", () => {
        render(<EncyclopediaHub />);

        fireEvent.click(screen.getByRole("button", { name: /^Materials$/ }));
        expect(screen.getByRole("link", { name: /Kanthal A1 \/ APM/ })).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /LG 18650HB6/ })).not.toBeInTheDocument();

        fireEvent.change(screen.getByRole("searchbox"), { target: { value: "kanthal" } });
        expect(screen.getAllByRole("link", { name: /Kanthal A1 \/ APM/ })).toHaveLength(1);
    });

    it("searches shared board profiles as one canonical catalog entry", () => {
        render(<EncyclopediaHub />);

        fireEvent.change(screen.getByRole("searchbox"), { target: { value: "DNA-40 (std. wire)" } });
        expect(slugsInCards()).toEqual(["dna40"]);
        expect(cardLinkForSlug("dna40")).toHaveTextContent("Evolv DNA-40");
        expect(cardLinkForSlug("dna40")).not.toHaveTextContent("Evolv DNA-40 (std. wire)");

        fireEvent.change(screen.getByRole("searchbox"), { target: { value: "DNA-40 (Ni 200)" } });
        expect(slugsInCards()).toEqual(["dna40"]);
    });

    it("finds catalog entries despite ordinary typing errors", () => {
        render(<EncyclopediaHub />);

        fireEvent.change(screen.getByRole("searchbox"), { target: { value: "kanhtal" } });
        expect(screen.getByRole("link", { name: /Kanthal A1 \/ APM/ })).toBeInTheDocument();

        fireEvent.change(screen.getByRole("searchbox"), { target: { value: "evlov dna40" } });
        expect(slugsInCards()).toEqual(["dna40"]);

        fireEvent.change(screen.getByRole("searchbox"), { target: { value: "evolv dna40 shark" } });
        expect(screen.getByText("No entries match that search.")).toBeInTheDocument();
    });

    it("orders materials alphabetically and dated batteries and mods newest first", () => {
        render(<EncyclopediaHub />);

        fireEvent.click(screen.getByRole("button", { name: /^Materials$/ }));
        expect(slugsInCards()).toEqual([...new Map(materials
            .filter((material): material is typeof material & { readonly slug: string } => material.slug !== undefined)
            .map((material) => [material.slug, material])).values()]
            .filter((material): material is typeof material & { readonly slug: string } => material.slug !== undefined)
            .sort((left, right) => left.name.localeCompare(right.name))
            .map((material) => material.slug));

        fireEvent.click(screen.getByRole("button", { name: /^Batteries$/ }));
        expect(slugsInCards()).toEqual(orderedSlugsByIntroduction(batteryPresets));

        fireEvent.click(screen.getByRole("button", { name: /^Mods and boards$/ }));
        expect(slugsInCards()).toEqual(orderedSlugsByIntroduction(builtInPresets));
    });

    it("shows a concise summary on every entry card", () => {
        render(<EncyclopediaHub />);

        fireEvent.click(screen.getByRole("button", { name: /^Concepts$/ }));
        expect(cardSummaries().every((summary) => summary.trim().length > 0)).toBe(true);
        expect(cardLinkForSlug("ohms-law")).toHaveTextContent("The relationship between voltage, current, and resistance.");

        fireEvent.click(screen.getByRole("button", { name: /^Materials$/ }));
        expect(cardSummaries().every((summary) => summary.trim().length > 0)).toBe(true);

        fireEvent.click(screen.getByRole("button", { name: /^Batteries$/ }));
        expect(cardSummaries().every((summary) => summary.trim().length > 0)).toBe(true);
        expect(cardLinkForSlug("lg-18650hb6"))
            .toHaveTextContent("A removable rechargeable cell used in compatible devices.");

        fireEvent.click(screen.getByRole("button", { name: /^Mods and boards$/ }));
        expect(cardSummaries().every((summary) => summary.trim().length > 0)).toBe(true);
        expect(cardSummaries().every((summary) => !/^This is\b/.test(summary))).toBe(true);
        expect(cardLinkForSlug("provape-provari-radius-40-w"))
            .toHaveTextContent("A regulated vaping device profile for ProVape ProVari Radius 40 W.");
    });

    it("toggles calculator visibility from an entry card", () => {
        render(<EncyclopediaHub />);

        const toggle = screen.getByRole("button", { name: "Calculator visibility for LG 18650HB6" });
        expect(toggle).toHaveAttribute("aria-pressed", "false");
        fireEvent.click(toggle);

        expect(toggle).toHaveAttribute("aria-pressed", "true");
        expect(JSON.parse(localStorage.getItem("steamengine.batteries.v1") ?? "{}").hiddenDefaultBatteryIds)
            .not.toContain("battery-33");
    });

    it("toggles every calculator profile behind a merged mod entity", () => {
        render(<EncyclopediaHub />);
        fireEvent.change(screen.getByRole("searchbox"), { target: { value: "DNA-40 (std. wire)" } });

        const toggle = screen.getByRole("button", { name: "Calculator visibility for Evolv DNA-40" });
        expect(toggle).toHaveAttribute("aria-pressed", "false");
        fireEvent.click(toggle);

        const hiddenIds = JSON.parse(localStorage.getItem("steamengine.mods.v1") ?? "{}").hiddenDefaultModIds;
        expect(hiddenIds).not.toContain("preset-31");
        expect(hiddenIds).not.toContain("preset-32");
    });
});
