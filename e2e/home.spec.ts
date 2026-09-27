import { expect, test } from "@playwright/test";

// Story #0 (walking skeleton): a visitor sees the site name on the homepage.
test("visitor sees the site name on the homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/The Wandering Library/);
  await expect(
    page.getByRole("heading", { level: 1, name: "The Wandering Library" }),
  ).toBeVisible();
});
