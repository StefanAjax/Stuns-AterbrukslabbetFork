import { test, expect } from "@playwright/test";

import { setup, login } from "./utils/utils";

import dotenv from "dotenv";

dotenv.config();

test("Upload, disable, enable and delete resource", async ({ page }) => {
  await setup(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");

  await page.getByText("Adminpanel").first().click();

  await page.getByText("Dashboard").first().click();

  await page.getByText("Resurser").first().click();

  await page.locator("input[type='file']").setInputFiles("tests/assets/README.pdf");

  await page.getByRole("button").filter({ hasText: "Ladda upp filer" }).first().click();

  expect(page.getByText("Filen README.pdf har laddats upp.").filter({ visible: true }).first()).toBeVisible();

  await page.getByText("Återbrukslabbet").first().click();

  await page.locator("footer").getByText("Resurser").first().click();

  await expect(page.getByText("README.pdf").filter({ visible: true }).first()).toBeVisible();

  await page.getByText("Återbrukslabbet").first().click();

  await page.getByText("Adminpanel").first().click();

  await page.getByText("Dashboard").first().click();

  await page.getByText("Resurser").first().click();

  await page.getByRole("checkbox").first().click();

  await page.getByText("Återbrukslabbet").first().click();

  await page.locator("footer").getByText("Resurser").first().click();

  expect(page.getByText("Inga resurser tillgängliga").filter({ visible: true }).first()).toBeVisible();

  await page.getByText("Återbrukslabbet").first().click();

  await page.getByText("Adminpanel").first().click();

  await page.getByText("Dashboard").first().click();

  await page.getByText("Resurser").first().click();

  await page.getByRole("checkbox").first().click();

  await page.getByText("Återbrukslabbet").first().click();

  await page.locator("footer").getByText("Resurser").first().click();

  expect(page.getByText("README.pdf").filter({ visible: true }).first()).toBeVisible();

  await page.getByText("Återbrukslabbet").first().click();

  await page.getByText("Adminpanel").first().click();

  await page.getByText("Dashboard").first().click();

  await page.getByText("Resurser").first().click();

  await page.getByRole("button").filter({ hasText: "Ta bort" }).first().click();

  await page.getByText("Återbrukslabbet").first().click();

  await page.locator("footer").getByText("Resurser").first().click();

  expect(page.getByText("Inga resurser tillgängliga").filter({ visible: true }).first()).toBeVisible();
});

test("Upload disabled resource", async ({ page }) => {
  await setup(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");

  await page.getByText("Adminpanel").first().click();

  await page.getByText("Dashboard").first().click();

  await page.getByText("Resurser").first().click();

  await page.locator("input[type='file']").setInputFiles("tests/assets/README.pdf");

  await page.screenshot({
    path: `tests/logs/upload-disabled-resource-${Date.now()}.png`,
  });

  await page.getByRole("checkbox").first().click();

  await page.screenshot({
    path: `tests/logs/upload-disabled-resource-${Date.now()}.png`,
  });

  await page.getByRole("button").filter({ hasText: "Ladda upp filer" }).first().click();

  expect(page.getByText("Filen README.pdf har laddats upp.").filter({ visible: true }).first()).toBeVisible();

  await page.getByText("Återbrukslabbet").first().click();

  await page.locator("footer").getByText("Resurser").first().click();

  // Take a screenshot of the page

  await page.screenshot({
    path: `tests/logs/upload-disabled-resource-${Date.now()}.png`,
  });

  expect(page.getByText("Inga resurser tillgängliga").filter({ visible: true }).first()).toBeVisible();
});

test("Cancel upload", async ({ page }) => {
  await setup(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");

  await page.getByText("Adminpanel").first().click();

  await page.getByText("Dashboard").first().click();

  await page.getByText("Resurser").first().click();

  await page.locator("input[type='file']").setInputFiles("tests/assets/README.pdf");

  await page.getByRole("button").filter({ hasText: "Ta bort" }).first().click();

  expect(page.getByRole("button").filter({ hasText: "Ladda upp filer" }).first()).not.toBeVisible();

  await page.getByText("Återbrukslabbet").first().click();

  await page.locator("footer").getByText("Resurser").first().click();

  expect(page.getByText("Inga resurser tillgängliga").filter({ visible: true }).first()).toBeVisible();
});
