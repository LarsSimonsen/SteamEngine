import { expect, test } from "@playwright/test";
import { routeToLiveApi } from "./live-api";

test.beforeEach(async ({ page }) => {
    await routeToLiveApi(page);
});

test("About page presents the modernized content", async ({
  page,
}) => {
  await page.goto("/about");
  await expect(
    page.getByRole("heading", { name: "About", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Steam Engine/ }).first(),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /Safety/ })).toBeVisible();
});
