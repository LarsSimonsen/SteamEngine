import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { axeViolations } from "../../shared/test-axe";
import { ComparisonSection } from "./comparison-section";

describe("comparison section", () => {
    afterEach(cleanup);

    it("is a table whose values have row and column headers and whose differences are not colour only", async () => {
        const { container } = render(<ComparisonSection title="Capacity" columns={["LG 18650HG2", "Samsung 30Q"]}
            unknownLabel="Unknown" rows={[
                { label: "Rated capacity", first: "3,000 mAh", second: "3,000 mAh" },
                { label: "Continuous current", first: "20 A", second: "15 A", different: true },
            ]} />);

        const table = screen.getByRole("table", { name: "Capacity" });
        expect(within(table).getAllByRole("columnheader").map((header) => header.textContent))
            .toEqual(["LG 18650HG2", "Samsung 30Q"]);
        expect(within(table).getByRole("rowheader", { name: /^Continuous current\s*\(Differs\)$/ })).toBeInTheDocument();
        expect(within(table).getByRole("rowheader", { name: "Rated capacity" })).toBeInTheDocument();
        expect(await axeViolations(container)).toEqual([]);
    });
});
