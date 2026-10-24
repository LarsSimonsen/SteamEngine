import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { batteryPresets } from "../../catalogs/batteries/defaults";
import { materials } from "../../catalogs/materials/catalog";
import { catalogPropertyUnits, materialEncyclopediaRecords } from "../../catalogs/materials/encyclopedia";
import { EncyclopediaPage } from "./encyclopedia-page";

vi.mock("../modrange/api", () => ({
    calculateModRangeFromApi: async () => ({
        calculation: {
            kind: "valid",
            values: {
                minimumResistance: 0.2,
                maximumResistance: 1.4,
                medianResistance: 0.7,
                sweetSpotResistance: 1,
            },
        },
        graph: {
            limits: { maxPower: 20, maxVoltage: 5, maxCurrent: 4 },
            calculation: {
                minimumResistance: 0.2,
                maximumResistance: 1.4,
                medianResistance: 0.7,
                sweetSpotResistance: 1,
            },
            adjusted: false,
            bounds: { minimumResistance: 0, maximumResistance: 2, globalMaximumPower: 20 },
            curves: {
                combined: [{ resistance: 0, power: 0 }, { resistance: 2, power: 5 }],
                current: [{ resistance: 0, power: 0 }, { resistance: 2, power: 5 }],
                voltage: [{ resistance: 0, power: 0 }, { resistance: 2, power: 5 }],
                power: [{ resistance: 0, power: 0 }, { resistance: 2, power: 5 }],
            },
        },
    }),
}));

vi.mock("./material-tfr-api", () => ({
    materialTfrPointsFor: (material: { readonly tfr?: readonly [number, number][]; readonly tcr?: number }) =>
        material.tfr ?? (material.tcr === undefined ? undefined : [[20, 1], [200, 1 + material.tcr * 180]]),
    calculateMaterialTfrFromApi: async () => ({
        kind: "valid",
        method: "existing",
        points: [
            { temperatureCelsius: 20, resistanceFactor: 1 },
            { temperatureCelsius: 100, resistanceFactor: 1.0001 },
        ],
        graph: {
            temperatures: [0, 20, 100, 300],
            factors: [0.9999, 1, 1.0001, 1.0003],
            sourceMinimumTemperature: 20,
            sourceMaximumTemperature: 100,
            minimumTemperature: 0,
            maximumTemperature: 300,
            minimumFactor: 0.5,
            maximumFactor: 3,
        },
    }),
}));

afterEach(cleanup);
beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '<div id="root" data-locale="en"></div>';
});

const renderBokmaal = (category: "concepts" | "materials" | "batteries" | "mods", slug: string) => {
    const root = document.getElementById("root")!;
    root.dataset.locale = "nb";
    return render(<EncyclopediaPage category={category} slug={slug} />, { container: root });
};

describe("encyclopedia pages", () => {
    it("links each category breadcrumb to its catalog section", () => {
        for (const [category, slug, label, hash] of [
            ["concepts", "ohms-law", "Concepts", "concepts"],
            ["batteries", "lg-18650hb6", "Batteries", "batteries"],
            ["materials", "titanium-1", "Materials", "materials"],
            ["mods", "cloupor-dna30", "Mods", "mods"],
        ] as const) {
            render(<EncyclopediaPage category={category} slug={slug} />);
            const breadcrumbs = screen.getByRole("navigation", { name: "Breadcrumb" });
            expect(within(breadcrumbs).getByRole("link", { name: label })).toHaveAttribute(
                "href",
                `../../catalog#${hash}`,
            );
            cleanup();
        }
    });

    it("localizes a concept detail page while keeping its stable slug", () => {
        renderBokmaal("concepts", "ohms-law");

        expect(screen.getByRole("heading", { name: "Ohms lov" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Sammenhengen" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Finn strømmen" })).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "The relationship" })).not.toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Wikipedia" })).toHaveAttribute(
            "href",
            "https://nb.wikipedia.org/wiki/Ohms_lov",
        );
        expect(screen.getByRole("navigation", { name: "Brødsmulesti" })).toHaveTextContent("Ohms lov");
        expect(screen.getByRole("navigation", { name: "Brødsmulesti" })).not.toHaveTextContent("ohms-law");
        expect(screen.queryByRole("heading", { name: "Breadcrumb" })).not.toBeInTheDocument();
    });

    it("localizes a material detail page and its property headings", () => {
        renderBokmaal("materials", "titanium-1");

        expect(screen.getByRole("heading", { name: "Titan 1" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Oversikt" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Egenskaper" })).toBeInTheDocument();
        expect(screen.getByRole("navigation", { name: "Brødsmulesti" })).toHaveTextContent("Titan 1");
        expect(screen.getByRole("link", { name: "Sammenlign materialer" })).toHaveAttribute(
            "href",
            "/nb/compare/materials?a=titanium-1",
        );
    });

    it("localizes a battery detail page without translating the product name", () => {
        renderBokmaal("batteries", "lg-18650hb6");

        expect(screen.getByRole("heading", { name: "LG 18650HB6" })).toBeInTheDocument();
        expect(screen.getByText("Batterikatalog")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Ved damping" })).toBeInTheDocument();
        expect(screen.getByRole("navigation", { name: "Brødsmulesti" })).toHaveTextContent("LG 18650HB6");
    });

    it("shows weight in battery and mod encyclopedia properties", () => {
        render(<EncyclopediaPage category="batteries" slug="lg-18650hb6" />);
        expect(screen.getByText(/Weight \(g\)/)).toBeInTheDocument();
        cleanup();
        render(<EncyclopediaPage category="mods" slug="cloupor-dna30" />);
        expect(screen.getByText(/Weight \(g\)/)).toBeInTheDocument();
    });

    it("orders battery headline properties first and keeps mod weight last", () => {
        render(<EncyclopediaPage category="batteries" slug="lg-18650hb6" />);
        const batteryRows = within(screen.getByRole("table")).getAllByRole("row");
        expect(batteryRows[1]).toHaveTextContent("Rated capacity");
        expect(batteryRows[2]).toHaveTextContent("Continuous-discharge rating");

        cleanup();
        render(<EncyclopediaPage category="mods" slug="cloupor-dna30" />);
        const modTable = screen.getByRole("table");
        const modRows = within(modTable).getAllByRole("row");
        expect(modRows.at(-1)).toHaveTextContent("Weight (g)");
    });

    it("links every battery detail page to a comparison with only its first selection populated", () => {
        renderBokmaal("batteries", "lg-18650hb6");

        expect(screen.getByRole("link", { name: "Sammenlign batterier" })).toHaveAttribute(
            "href",
            "/nb/compare/batteries?a=lg-18650hb6",
        );
    });

    it("links a battery directly to Battery drain with its catalog selection", () => {
        render(<EncyclopediaPage category="batteries" slug="molicel-inr-21700-p45b" />);

        expect(screen.getByRole("link", { name: "Use in Battery drain →" })).toHaveAttribute(
            "href",
            "/batt?battery=molicel-inr-21700-p45b",
        );
        const actions = document.querySelector(".encyclopedia-entry-actions")!;
        const visibility = screen.getByRole("button", { name: /Calculator visibility/ });
        expect(actions.compareDocumentPosition(visibility) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    it("localizes a mod detail page without translating the manufacturer or model", () => {
        renderBokmaal("mods", "cloupor-dna30");

        expect(screen.getByRole("heading", { name: /Cloupor DNA-30/ })).toBeInTheDocument();
        expect(screen.getByText("Katalog over modder og styrekort")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Oversikt" })).toBeInTheDocument();
        expect(screen.getByRole("navigation", { name: "Brødsmulesti" })).toHaveTextContent("Cloupor DNA-30");
    });

    it("links the mod properties board/controller to its catalog entry", () => {
        render(<EncyclopediaPage category="mods" slug="beyond-vape-solara" />);

        const properties = screen.getByRole("heading", { name: "Properties" }).parentElement;
        expect(within(properties!).getByRole("link", { name: "Evolv DNA-30D" })).toHaveAttribute("href", "./dna30d");
    });

    it("lists every catalog mod using a board above its research summary", () => {
        render(<EncyclopediaPage category="mods" slug="dna30d" />);

        const implementations = screen.getByRole("heading", { name: "Mods" }).parentElement!;
        expect(within(implementations).getAllByRole("link").map(({ textContent }) => textContent)).toEqual([
            "Beyond Vape Solara",
            "Hana Modz V3",
            "Protovapor XPV DNA-30D",
            "Vapor Flask v1/v2 DNA 30",
            "Vapor Shark DNA/rDNA 30",
        ]);
        expect(within(implementations).queryByRole("link", { name: "Cana Modz" })).not.toBeInTheDocument();
        const research = screen.getByRole("heading", { name: "Research summary" }).parentElement!;
        expect(implementations.compareDocumentPosition(research) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

        cleanup();
        render(<EncyclopediaPage category="mods" slug="dna250" />);
        const multiProfileImplementations = screen.getByRole("heading", { name: "Mods" }).parentElement!;
        expect(within(multiProfileImplementations).getByRole("link", {
            name: "Lost Vape Therion DNA 166",
        })).toHaveAttribute("href", "./lost-vape-therion-dna-166");
    });

    it("lists the Harrier as a cataloged DNA60C implementation", () => {
        render(<EncyclopediaPage category="mods" slug="dna60c" />);

        const implementations = screen.getByRole("heading", { name: "Mods" }).parentElement!;
        expect(within(implementations).getByRole("link", {
            name: "Early Bird Harrier DNA60C",
        })).toHaveAttribute("href", "./early-bird-harrier-dna60c");
    });

    it("shows supported operating modes and capabilities for mods and controllers", () => {
        render(<EncyclopediaPage category="mods" slug="geekvape-aegis-solo-3" />);

        const modFeatures = screen.getByRole("heading", {
            name: "Supported modes and capabilities",
        }).parentElement!;
        expect(within(modFeatures).getByText("Output control modes").nextElementSibling)
            .toHaveTextContent("Power regulation");
        expect(within(modFeatures).getByText("Additional capabilities").nextElementSibling)
            .toHaveTextContent("Temperature control, Configurable TCR, Preheat");

        cleanup();
        render(<EncyclopediaPage category="mods" slug="dna60c" />);

        const controllerFeatures = screen.getByRole("heading", {
            name: "Supported modes and capabilities",
        }).parentElement!;
        expect(within(controllerFeatures).getByText("Output control modes").nextElementSibling)
            .toHaveTextContent("Power regulation");
        expect(within(controllerFeatures).getByText("Additional capabilities").nextElementSibling)
            .toHaveTextContent("Temperature control, Configurable TCR, Preheat, Replay");

        cleanup();
        render(<EncyclopediaPage category="mods" slug="provari-2-provari-2-5" />);

        const voltageOnlyFeatures = screen.getByRole("heading", {
            name: "Supported modes and capabilities",
        }).parentElement!;
        const voltageOnlyModes = within(voltageOnlyFeatures).getByText("Output control modes").nextElementSibling;
        expect(voltageOnlyModes).toHaveTextContent("Voltage regulation");
        expect(voltageOnlyModes).not.toHaveTextContent("Power regulation");
        expect(voltageOnlyModes).not.toHaveTextContent("Current regulation");

        cleanup();
        render(<EncyclopediaPage category="mods" slug="acesmok-ace50" />);

        const unresolvedFeatures = screen.getByRole("heading", {
            name: "Supported modes and capabilities",
        }).parentElement!;
        expect(within(unresolvedFeatures).getByText("Output control modes").nextElementSibling)
            .toHaveTextContent("Unknown");
        expect(within(unresolvedFeatures).getByText("Additional capabilities").nextElementSibling)
            .toHaveTextContent("Unknown");

        cleanup();
        render(<EncyclopediaPage category="mods" slug="geekvape-aegis-force" />);
        const aegisForceFeatures = screen.getByRole("heading", {
            name: "Supported modes and capabilities",
        }).parentElement!;
        expect(within(aegisForceFeatures).getByText("Output control modes").nextElementSibling)
            .toHaveTextContent("Power regulation");
        expect(within(aegisForceFeatures).getByText("Output control modes").nextElementSibling)
            .not.toHaveTextContent("Voltage regulation");
        expect(within(aegisForceFeatures).getByText("Output control modes").nextElementSibling)
            .not.toHaveTextContent("Current regulation");
        expect(within(aegisForceFeatures).getByText("Additional capabilities").nextElementSibling)
            .toHaveTextContent("Temperature control, Smart mode");
    });

    it("keeps classifications and unknown-value explanations out of property-table unit cells", () => {
        render(<EncyclopediaPage category="mods" slug="protovapor-xpv-dna-30d" />);

        const properties = screen.getByRole("heading", { name: "Properties" }).parentElement!;
        const table = within(properties).getByRole("table");
        const boardRow = within(table).getByText("Evolv DNA-30D").closest("tr")!;
        const unknownRow = within(table)
            .getByText("The catalog does not establish a value for this property.")
            .closest("tr")!;

        expect(within(boardRow).getAllByRole("cell")[1]).toBeEmptyDOMElement();
        expect(within(unknownRow).getAllByRole("cell")[0]).toHaveTextContent(
            "The catalog does not establish a value for this property.",
        );
        expect(within(unknownRow).getAllByRole("cell")[1]).toBeEmptyDOMElement();

        for (const row of within(table).getAllByRole("row").slice(1)) {
            const unit = within(row).getAllByRole("cell")[1].textContent?.trim() ?? "";
            expect(["", ...catalogPropertyUnits]).toContain(unit);
        }
    });

    it("keeps material-property qualifiers with values while units remain pure", () => {
        render(<EncyclopediaPage category="materials" slug="titanium-1" />);

        const expansionRow = screen.getByText("Near room temperature.").closest("tr")!;
        const cells = within(expansionRow).getAllByRole("cell");
        expect(cells[0]).toHaveTextContent("Near room temperature.");
        expect(cells[1]).toHaveTextContent("µm/(m·K)");
        expect(cells[1]).not.toHaveTextContent("Near room temperature");
    });

    it("shows researched battery configurations on mod detail pages", () => {
        render(<EncyclopediaPage category="mods" slug="craving-vapor-hexohm-v3" />);
        const batteryLabel = screen.getByText("Battery configuration:");
        const marketIntroductionLabel = screen.getByText("Market introduction:");
        expect(screen.getByRole("table")).not.toHaveTextContent("Battery configuration");
        expect(batteryLabel.parentElement).toHaveTextContent("Battery configuration: 2S1P · 18650.");
        expect(batteryLabel.parentElement?.nextElementSibling).toBe(marketIntroductionLabel.parentElement);

        cleanup();
        render(<EncyclopediaPage category="mods" slug="eleaf-istick-pico-21700" />);
        expect(screen.getByText(/1S1P · 21700 \/ 1S1P · 18650/)).toBeInTheDocument();

        cleanup();
        render(<EncyclopediaPage category="mods" slug="geekvape-aegis-force" />);
        expect(screen.getByText(/Unknown · Integrated in mod · 3200 mAh/)).toBeInTheDocument();
    });

    it("shows published board input voltages and omits unavailable voltage labels", () => {
        render(<EncyclopediaPage category="mods" slug="dna20d" />);
        expect(screen.getByText("Minimum input voltage:").parentElement).toHaveTextContent("3.2 V");
        expect(screen.getByText("Typical input voltage:").parentElement).toHaveTextContent("3.7 V");
        expect(screen.getByText("Maximum input voltage:").parentElement).toHaveTextContent("4.3 V");

        cleanup();
        render(<EncyclopediaPage category="mods" slug="dna200" />);
        expect(screen.queryByText("Typical input voltage:")).not.toBeInTheDocument();

        cleanup();
        renderBokmaal("mods", "dna20d");
        expect(screen.getByText("Typisk inngangsspenning:").parentElement).toHaveTextContent("3,7 V");
    });

    it("keeps mod aliases with battery and introduction details without an additional-information section", () => {
        render(<EncyclopediaPage category="mods" slug="billet-box-rev-3a" />);
        expect(screen.queryByRole("heading", { name: "Additional information" })).not.toBeInTheDocument();
        const properties = screen.getByRole("heading", { name: "Properties" }).parentElement;
        expect(within(properties!).getByRole("heading", { name: "Aliases" })).toBeInTheDocument();
    });

    it("has a researched encyclopedia record for every built-in material", () => {
        expect(materials.every((material) => {
            const record = materialEncyclopediaRecords[material.id];
            return Boolean(record?.researchSummary && record.evidenceNotes && record.evidenceNotes.length > 0);
        })).toBe(true);
    });

    it("uses the shared site header and navigation", () => {
        render(<EncyclopediaPage category="materials" slug="kanthal-a1" />);

        expect(screen.getByRole("banner")).toBeInTheDocument();
        expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Steam Engine home" })).toHaveAttribute("href", "/");
        expect(screen.getByRole("heading", { name: "Kanthal A1 / APM" })).toBeInTheDocument();
    });

    it("renders the Ohm's law concept from the knowledge base", () => {
        render(<EncyclopediaPage category="concepts" slug="ohms-law" />);

        expect(screen.getByRole("heading", { name: "Ohm's law" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "The relationship" })).toBeInTheDocument();
        expect(screen.getByText("V = I × R")).toBeInTheDocument();
        expect(screen.getByText(/Based on the Steam Engine knowledge-base article\./)).toBeInTheDocument();
        expect(screen.queryByText(/\.md\b/)).not.toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Wikipedia" }))
            .toHaveAttribute("href", "https://en.wikipedia.org/wiki/Ohm%27s_law");
        expect(screen.getByRole("link", { name: "Wikipedia" }))
            .toHaveAttribute("rel", "nofollow noreferrer");
    });

    it("places the category-specific ad immediately before each research record", () => {
        const placements = {
            batteries: "catalog-battery-inline",
            materials: "catalog-material-inline",
            mods: "catalog-mod-inline",
        } as const;
        for (const [category, slug] of [
            ["materials", "kanthal-a1"],
            ["batteries", "lg-18650hb6"],
            ["mods", "geekvape-aegis-solo-3"],
        ] as const) {
            render(<EncyclopediaPage category={category} slug={slug} />);

            const ad = screen.getByLabelText("Advertisement");
            const researchRecord = screen.getByText(/^Source-backed (?:entity|material) record$/);
            expect(ad).toHaveAttribute("data-ad-placement", placements[category]);
            expect(ad.compareDocumentPosition(researchRecord) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
            cleanup();
        }
    });

    it("shows researched material context, normalized properties, images, and TFR data", async () => {
        render(<EncyclopediaPage category="materials" slug="kanthal-a1" />);

        expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "In vaping" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Material-specific limitations" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Research summary" })).toBeInTheDocument();
        expect(screen.getByText(/Kanthal A-1 \/ APM is an FeCrAl/)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Evidence notes" })).toBeInTheDocument();
        await waitFor(() => expect(screen.getByRole("heading", { name: "Temperature resistance curve" })
            .compareDocumentPosition(screen.getByRole("heading", { name: "Research summary" }))
            & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy());
        expect(screen.getByRole("heading", { name: "Evidence notes" }).parentElement)
            .toHaveClass("encyclopedia-research-summary__evidence");
        expect(screen.getByRole("heading", { name: "Properties" })).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Secondary properties" })).not.toBeInTheDocument();
        expect(screen.getByText("1.45")).toBeInTheDocument();
        expect(screen.getByText("µΩ·m")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Temperature resistance curve" })).toBeInTheDocument();
        const graph = screen.getByRole("img", { name: "Kanthal A1 / APM temperature resistance graph" });
        expect(graph).toBeInTheDocument();
        expect(graph).toHaveTextContent("20");
        expect(graph).toHaveTextContent("300");
        expect(screen.getByText("Representative Kanthal-family resistance wire.", { exact: false }))
            .toBeInTheDocument();
        expect(screen.getAllByRole("link", { name: "Kanthal wire" }).length).toBeGreaterThan(0);
        expect(screen.getByRole("heading", { name: "Sources" })).toBeInTheDocument();
    });

    it("shows researched context and evidence notes for every built-in material", () => {
        render(<EncyclopediaPage category="materials" slug="ss-316l" />);

        expect(screen.getByRole("heading", { name: "Research summary" })).toBeInTheDocument();
        expect(screen.queryByText("No research summary is available for this entry.")).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Evidence notes" })).toBeInTheDocument();
    });

    it("shows a TCR-derived temperature curve for materials without TFR points", async () => {
        render(<EncyclopediaPage category="materials" slug="ss-317l" />);

        expect(await screen.findByRole("img", { name: /SS 317L.*temperature resistance graph/i }))
            .toBeInTheDocument();
        expect(screen.getAllByText(/TCR-derived/)).not.toHaveLength(0);
    });

    /* it("shows the TCR when a material has no TFR curve points", () => {
        render(<EncyclopediaPage category="materials" slug="reactor-wire" />);

        expect(screen.getByRole("heading", { name: "Temperature resistance curve" })).toBeInTheDocument();
        expect(screen.getByText("This material has no defined TFR curve points. Its TCR is 0.004 per Â°C.")
            .toBeInTheDocument();
        )
    });

    */
    it("renders sourced research content for a battery entity record", () => {
        render(<EncyclopediaPage category="batteries" slug="lg-18650hb6" />);

        expect(screen.getByRole("heading", { name: "LG 18650HB6" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Research summary" })).toBeInTheDocument();
        expect(screen.getByText(/This researched draft preserves the calculator's/)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Independent test and review" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Research summary" }).parentElement)
            .toHaveClass("encyclopedia-research-summary");
        expect(screen.getByRole("heading", { name: "Evidence notes" }).parentElement)
            .toHaveClass("encyclopedia-research-summary__evidence");
        expect(screen.getByText(/This is an old battery model/)).toBeInTheDocument();
        expect(screen.getByText(/Available by June 20, 2015/)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "LG HB6 30A 1500mAh bench test" })).toHaveAttribute(
            "href",
            "https://www.e-cigarette-forum.com/threads/lg-hb6-30a-1500mah-18650-bench-test-results-better-than-sx30-at-25a.682205/",
        );
    });

    it("resolves newer admitted battery records by their canonical catalog IDs", () => {
        render(<EncyclopediaPage category="batteries" slug="eve-inr18650-30p-3000mah" />);

        expect(screen.getByRole("heading", { name: "EVE INR18650/30P" })).toBeInTheDocument();
        expect(screen.getByText(/Lithium-ion/)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Authenticity assessment" })).toBeInTheDocument();
    });

    it("shows unknown when a battery introduction date is unavailable", () => {
        const batteryWithoutIntroduction = batteryPresets.find((battery) => !battery.introduction);
        expect(batteryWithoutIntroduction).toBeDefined();

        render(<EncyclopediaPage category="batteries" slug={batteryWithoutIntroduction!.slug!} />);

        const introduction = screen.getByText("Market introduction:");
        expect(introduction.parentElement).toHaveTextContent("Unknown.");
        expect(screen.getByText(/The market introduction date for this cell is unknown/)).toBeInTheDocument();
    });

    it("shows calculator visibility on a battery entry page", () => {
        render(<EncyclopediaPage category="batteries" slug="aw-imr-18350-800mah" />);

        const toggle = screen.getByRole("button", { name: "Calculator visibility for AW IMR 18350 800 mAh" });
        expect(toggle).toHaveAttribute("aria-pressed", "false");
        fireEvent.click(toggle);

        expect(toggle).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText(/This is an old battery model/)).toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem("steamengine.batteries.v1") ?? "{}").hiddenDefaultBatteryIds)
            .not.toContain("battery-5");
    });

    it("links an integrated battery page to its mod page", () => {
        render(<EncyclopediaPage category="batteries" slug="innokin-itaste-mvp-2-0" />);

        expect(screen.getByText("Integrated in mod")).toBeInTheDocument();
        expect(screen.getByText(/Lithium-ion polymer/)).toBeInTheDocument();
        expect(screen.getByRole("table")).not.toHaveTextContent("Chemistry");
        expect(screen.queryByText("Removable cell")).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Related entry" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Innokin iTaste MVP 2.0" })).toHaveAttribute(
            "href",
            "../mod/innokin-itaste-mvp-2-0",
        );
    });

    it("links an integrated mod page back to its battery page", async () => {
        render(<EncyclopediaPage category="mods" slug="innokin-itaste-mvp-2-0" />);

        expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Properties" })).toBeInTheDocument();
        await waitFor(() => expect(screen.getByRole("heading", { name: "Power curve" })).toBeInTheDocument());
        expect(screen.queryByRole("checkbox", { name: "Show limits" })).not.toBeInTheDocument();
        expect(screen.queryByText("Show additional curves")).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Output limits" })).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Related entry" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Innokin iTaste MVP 2.0" })).toHaveAttribute(
            "href",
            "../battery/innokin-itaste-mvp-2-0",
        );
    });

    it("shows a native power-curve title at the hovered resistance", async () => {
        render(<EncyclopediaPage category="mods" slug="innokin-itaste-mvp-2-0" />);

        const graph = await screen.findByRole("img", { name: "Power curve" });
        const hoverTarget = graph.querySelector(".power-curve-graph__hover-target");
        if (!hoverTarget) throw new Error("Expected a power-curve hover target.");
        Object.defineProperty(hoverTarget, "getBoundingClientRect", {
            value: () => ({ left: 0, width: 760 }) as DOMRect,
        });

        fireEvent.mouseMove(hoverTarget, { clientX: 380 });

        expect(graph.querySelector("title")).toHaveTextContent(/^\d+\.\d{2}W @ \d+\.\d{2}Ω$/);
        expect(graph.querySelector(".power-curve-graph__hover-tooltip")).toBeInTheDocument();
    });

    it("supports keyboard and touch-friendly graph inspection", async () => {
        render(<EncyclopediaPage category="mods" slug="innokin-itaste-mvp-2-0" />);

        const inspector = await screen.findByRole("slider", { name: "Resistance" });
        const output = document.querySelector(".power-curve-graph__inspector output");
        if (!output) throw new Error("Expected a power-curve inspection output.");
        expect(inspector.getAttribute("aria-valuetext")).toMatch(/^[\d.,]+ Ω, [\d.,]+ W$/);
        expect(output).toHaveAttribute("aria-live", "off");
        const crossover = screen.getByRole("button", { name: "Current/voltage crossover" });
        const upperMidpoint = screen.getByRole("button", { name: "Upper-range midpoint" });
        expect(crossover).toHaveAttribute("aria-pressed", "true");
        expect(upperMidpoint).toHaveAttribute("aria-pressed", "true");
        const graph = screen.getByRole("img", { name: "Power curve" });
        expect(graph.querySelectorAll(".power-curve-graph__marker-value")).toHaveLength(2);
        expect(graph).toHaveTextContent("0.7 Ω");
        expect(graph).toHaveTextContent("1 Ω");
        expect(inspector).toHaveValue("1");
        expect(output).toHaveTextContent(/Ω · .* W/);

        fireEvent.input(inspector, { target: { value: "2" } });
        expect(output).toHaveTextContent(/^2 Ω ·/);
        fireEvent.click(crossover);
        expect(crossover).toHaveAttribute("aria-pressed", "false");
        expect(JSON.parse(localStorage.getItem("steamengine.power-curve.v1") ?? "{}").showCrossover)
            .toBe(false);
    });

    it("shows a mod market introduction below its properties table", () => {
        render(<EncyclopediaPage category="mods" slug="ante-meridiem-axis" />);

        const propertiesSection = screen.getByRole("heading", { name: "Properties" }).parentElement;
        const introduction = screen.getByText("Market introduction:");
        expect(propertiesSection).toContainElement(introduction);
        expect(introduction.parentElement).toHaveTextContent("Available by September 30, 2014.");
    });

    it("renders sourced research content for a mod entity record", () => {
        render(<EncyclopediaPage category="mods" slug="geekvape-aegis-solo-3" />);

        expect(screen.getByRole("heading", { name: "Geekvape Aegis Solo 3" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Research summary" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Evidence notes" })).toBeInTheDocument();
        expect(screen.getByText(/The exact marketed identity/)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Evidence notes" }).parentElement)
            .toHaveClass("encyclopedia-research-summary__evidence");
        expect(screen.getByRole("heading", { name: "Device-specific safety notes" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Sources" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Aegis Solo 3 Mod 100W\/3000mAh" })).toBeInTheDocument();
    });

    it("normalizes a legacy sourced mod record into the research section", () => {
        render(<EncyclopediaPage category="mods" slug="eleaf-istick-pico-21700" />);

        expect(screen.getByRole("heading", { name: "Research summary" })).toBeInTheDocument();
        expect(screen.getAllByText(/Eleaf specifies/).length).toBeGreaterThan(0);
        expect(screen.getByRole("heading", { name: "Device-specific safety notes" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Sources" })).toBeInTheDocument();
    });

    it("resolves a mod record through its runtime catalog reference", () => {
        render(<EncyclopediaPage category="mods" slug="vaporesso-armour-max" />);

        expect(screen.getByRole("heading", { name: "Research summary" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Sources" })).toBeInTheDocument();
    });

    it("does not show a safety section for a mod without device-specific findings", () => {
        render(<EncyclopediaPage category="mods" slug="cloupor-dna30" />);

        expect(screen.getByRole("heading", { name: "Research summary" })).toBeInTheDocument();
        expect(screen.getByText("No research summary is available for this entry.")).toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: "Device-specific safety notes" })).not.toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Sources" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Hana Modz Clone Review – Cloupor DNA30" })).toBeInTheDocument();
    });

    it("shows an absent research summary alongside audited mod sources", () => {
        render(<EncyclopediaPage category="mods" slug="dna40" />);

        expect(screen.getByRole("heading", { level: 1, name: "Evolv DNA-40" })).toBeInTheDocument();
        expect(screen.getAllByText("A regulated vaping device profile for Evolv DNA-40.")).toHaveLength(2);
        expect(screen.getByRole("row", { name: "Resistance range 0.1–2 Ω" })).toBeInTheDocument();
        expect(screen.getByText("No research summary is available for this entry.")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Sources" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Evolv DNA 40 datasheet" })).toBeInTheDocument();
    });

    it("shows a sourced catalog image when a mod asset exists", () => {
        render(<EncyclopediaPage category="mods" slug="eleaf-istick-50w" />);

        expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
        expect(screen.getByRole("img", { name: "Eleaf iStick 50W box mod" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Eleaf iStick 50W" })).toHaveAttribute(
            "href",
            "https://commons.wikimedia.org/wiki/File:Eleaf_Istick_50w_E_Cigarette_-_Box_Mod_-_Vaporizer_-_Vape_Mod_%2816721884182%29.jpg",
        );
    });

});
