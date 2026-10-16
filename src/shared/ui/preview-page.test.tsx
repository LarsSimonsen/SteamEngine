import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PreviewPage, routeLabel } from "./preview-page";

describe("preview page foundation", () => {
    it("maps the short OhmCalc route to its public label", () => {
        expect(routeLabel("ohm")).toBe("Ohm's law");
    });

    it("renders a page with shared navigation and migration notice", () => {
        render(
            <PreviewPage
                route="ohm"
                title="Ohm's law"
                description="Calculate voltage, current, resistance, and power."
            />,
        );

        expect(screen.getByRole("heading", { name: "Ohm's law" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Wire Wizard" })).toHaveAttribute(
            "href",
            "wirewiz",
        );
        expect(screen.getByText(/next tool to be migrated/i)).toBeInTheDocument();
    });
});
