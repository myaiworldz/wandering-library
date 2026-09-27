import { expect, test } from "@playwright/test";

test("visitor sees a sample journey below the introduction", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "A book's journey" }),
  ).toBeVisible();
  await expect(page.getByText("The Little Prince")).toBeVisible();
  await expect(page.getByText("Antoine de Saint-Exupéry")).toBeVisible();
});

test("journey shows readers' notes in order, oldest first", async ({ page }) => {
  await page.goto("/");
  const notes = page.getByRole("listitem");
  await expect(notes).toHaveCount(3);

  const texts = await notes.allInnerTexts();
  expect(texts[0]).toContain("Priya");
  expect(texts[0]).toContain("Norwich");
  expect(texts[1]).toContain("Tom");
  expect(texts[1]).toContain("Cambridge");
  expect(texts[2]).toContain("Aisha");
  expect(texts[2]).toContain("Ipswich");
});

test("journey fits a mobile screen without sideways scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "A book's journey" }),
  ).toBeVisible();

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});
