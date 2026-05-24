import { expect, test } from "@playwright/test";

test("home page shows the greeting and CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /hello, monorepo/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Get started" })).toBeVisible();
});
