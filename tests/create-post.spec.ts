import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import { db } from "@/lib/db";

dotenv.config();

test("Create Post", async ({ page }) => {
  await db.post.deleteMany({});

  await page.goto("/");

  await expect(page.getByText("Skapa annons").filter({ visible: true }).first()).toBeVisible();

  await page.getByText("Skapa annons").first().click();

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

  await expect(page.getByText("Skapa en annons").filter({ visible: true }).first()).toBeVisible();

  await page.getByText("Efterfrågas").first().click();

  await page.locator("input#title").first().fill("Create Post Test");

  await page.locator("textarea#description").first().fill("This is a test post");

  await page.locator("button").filter({ hasText: "Välj kategori" }).first().click();

  await page.getByText("Inventarie").first().click();

  await page.locator("button").filter({ hasText: "Välj kommun" }).first().click();

  await page.keyboard.type("Uppsala");

  await page.getByText("Uppsala").first().click();

  await page.getByRole("button").filter({ hasText: "Skapa" }).first().click();

  await page.getByRole("button").filter({ hasText: "Skapa annons" }).first().click();

  await expect(page.getByText("Sök bland 1 annonser").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Create Post Test").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("This is a test post").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Efterfrågas").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Uppsala").filter({ visible: true }).first()).toBeVisible();
});
