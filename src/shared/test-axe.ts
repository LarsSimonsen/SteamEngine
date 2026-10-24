import axe from "axe-core";

const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

/**
 * Runs axe's WCAG 2.2 A and AA rules on rendered components and returns one line per violating node. jsdom does
 * not lay out or paint, so colour contrast is left to the e2e sweep, and a component rendered on its own is not
 * expected to sit inside a page landmark.
 */
export const axeViolations = async (context: Element = document.body): Promise<string[]> => {
    const results = await axe.run(context, {
        runOnly: { type: "tag", values: wcagTags },
        rules: {
            "color-contrast": { enabled: false },
            region: { enabled: false },
        },
    });
    return results.violations.flatMap((violation) => violation.nodes
        .map((node) => `${violation.id}: ${node.target.join(" ")}`));
};
