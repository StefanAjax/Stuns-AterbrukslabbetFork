import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

test("Login", async ({ page, browserName }) => {
  await page.goto("/");

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await expect(page.getByText("Logga in").filter({ visible: true }).first()).toBeVisible();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page.getByText("Logga in").first().click();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await expect(page.locator("#identifier-field")).toBeVisible();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page
    .locator("#identifier-field")
    .first()
    .fill(process.env.TESTING_EMAIL || "");

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await expect(page.locator("#password-field")).toBeVisible();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page
    .locator("#password-field")
    .first()
    .fill(process.env.TESTING_PASSWORD || "");

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page.getByRole("button").filter({ hasText: "Fortsätt" }).first().click();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await expect(page.getByText("Mina annonser").filter({ visible: true }).first()).toBeVisible();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });
});
