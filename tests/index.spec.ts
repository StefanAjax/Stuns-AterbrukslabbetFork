import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test("has title", async ({ page }) => {
  await page.goto("/");

  expect(await page.locator("text=Återbrukslabbet").filter({ visible: true }).count()).toBeGreaterThanOrEqual(1);
});
