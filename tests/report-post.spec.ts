import { test, expect } from "@playwright/test";

import { setup, screenshot, login, logout } from "./utils/utils";

import dotenv from "dotenv";

dotenv.config();

test("Report Post", async ({ page, browserName }) => {
  await setup(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");

  await page.getByText("Skapa annons").first().click();

  await page.getByText("Efterfrågas").first().click();

  await page.locator("input#title").first().fill("Report Post Test");

  await page.locator("textarea#description").first().fill("This is a test post");

  await page.locator("button").filter({ hasText: "Välj kategori" }).first().click();

  await page.getByText("Inventarie").first().click();

  await page.locator("button").filter({ hasText: "Välj kommun" }).first().click();

  await page.keyboard.type("Uppsala");

  await page.getByText("Uppsala").first().click();

  await page.getByRole("button").filter({ hasText: "Skapa" }).first().click();

  await page.getByRole("button").filter({ hasText: "Skapa annons" }).first().click();

  await screenshot(page, browserName);

  await expect(page.getByText("Report Post Test").filter({ visible: true }).first()).toBeVisible();

  await logout(page);

  await login(page, process.env.TEST_REPORT_EMAIL || "", process.env.TEST_REPORT_PASSWORD || "");

  await page.getByText("Report Post Test").filter({ visible: true }).first().click();

  await screenshot(page, browserName);

  await page.getByText("Anmäl annons").filter({ visible: true }).first().click();

  await screenshot(page, browserName);

  await page.getByPlaceholder("Anledning").filter({ visible: true }).first().fill("This is a test reason for a report");

  await screenshot(page, browserName);

  await page.getByText("Rapportera").filter({ visible: true }).first().click();

  await screenshot(page, browserName);

  await expect(page.getByText("Annonsen är rapporterad").filter({ visible: true }).first()).toBeVisible();

  await logout(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");

  await page.getByText("Rapporter").first().click();

  await screenshot(page, browserName);

  await expect(page.getByText("Report Post Test").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("This is a test reason for a report").filter({ visible: true }).first()).toBeVisible();
});
