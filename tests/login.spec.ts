import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test("Login", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Logga in").filter({ visible: true }).first()).toBeVisible();

  await page.getByText("Logga in").first().click();

  await expect(page.locator("#identifier-field")).toBeVisible();

  await page
    .locator("#identifier-field")
    .first()
    .fill(process.env.TESTING_EMAIL || "");

  await expect(page.locator("#password-field")).toBeVisible();

  await page
    .locator("#password-field")
    .first()
    .fill(process.env.TESTING_PASSWORD || "");

  await page.getByRole("button").filter({ hasText: "Fortsätt" }).first().click();

  await expect(page.getByText("Mina annonser").filter({ visible: true }).first()).toBeVisible();
});
