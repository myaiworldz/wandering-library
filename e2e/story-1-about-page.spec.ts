import { expect, test } from "@playwright/test";

test("visitor opens the About page from the homepage", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "How it works" }).click();
  await expect(page).toHaveURL("/about");
  await expect(
    page.getByRole("heading", { level: 1, name: "How it works" }),
  ).toBeVisible();
});

test("About page explains the three steps", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByText("Bring a book")).toBeVisible();
  await expect(page.getByText("Swap it")).toBeVisible();
  await expect(page.getByText("Leave a note")).toBeVisible();
});
