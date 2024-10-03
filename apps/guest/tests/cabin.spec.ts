import { test, expect } from "@playwright/test";

test("check if cabins page exist @smoke", async ({ page }) => {
  await page.goto("/cabins");

  const pageTitle = page.getByText("Our Luxury Cabin");

  await expect(pageTitle).toBeVisible();
});
