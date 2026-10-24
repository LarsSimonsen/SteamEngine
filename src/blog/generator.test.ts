import { describe, expect, it } from "vitest";
import { findBlogImageAltIssues } from "./generator";

describe("blog image alt text report", () => {
    it("lists images without alt text or with a file name as alt text", () => {
        const issues = findBlogImageAltIssues([{
            slug: "ohms-law",
            body: `<p><img src="a.png" alt="Ohm's law triangle with V on top">
                <img src="spacer.gif" alt="">
                <img src='chart.png' alt='misthub-ohms-law-chart1'>
                <img alt="IMG_2041.JPG" src="photo.jpg">
                <img src="missing.png" class="wide">
                <img src="uploads/2016/08/addtohome1-e1471949543105-169x300.png" alt="addtohome1">
                <img src="uploads/kanthal.jpg" alt="Kanthal A1 wire on a spool"></p>`,
        }]);

        expect(issues).toEqual([
            { post: "ohms-law", src: "chart.png", alt: "misthub-ohms-law-chart1" },
            { post: "ohms-law", src: "photo.jpg", alt: "IMG_2041.JPG" },
            { post: "ohms-law", src: "missing.png", alt: undefined },
            { post: "ohms-law", src: "uploads/2016/08/addtohome1-e1471949543105-169x300.png", alt: "addtohome1" },
        ]);
    });
});
