import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { db } from "@/lib/db";

dotenv.config();

test("Create Post", async ({ page, browserName }) => {
  await db.post.deleteMany({});

  await page.goto("/");

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await expect(page.getByText("Skapa annons").filter({ visible: true }).first()).toBeVisible();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page.getByText("Skapa annons").first().click();

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

  await expect(page.getByText("Skapa en annons").filter({ visible: true }).first()).toBeVisible();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page.getByText("Efterfrågas").first().click();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page.locator("input#title").first().fill("Create Post Test");

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page.locator("textarea#description").first().fill("This is a test post");

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page.locator("button").filter({ hasText: "Välj kategori" }).first().click();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page.getByText("Inventarie").first().click();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page.locator("button").filter({ hasText: "Välj kommun" }).first().click();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page.keyboard.type("Uppsala");

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page.getByText("Uppsala").first().click();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page.getByRole("button").filter({ hasText: "Skapa" }).first().click();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });

  await page.getByRole("button").filter({ hasText: "Skapa annons" }).first().click();

  await expect(page.getByText("Sök bland 1 annonser").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Create Post Test").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("This is a test post").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Efterfrågas").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Uppsala").filter({ visible: true }).first()).toBeVisible();

  await page.screenshot({
    path: `./tests/logs/screenshot${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });
});
