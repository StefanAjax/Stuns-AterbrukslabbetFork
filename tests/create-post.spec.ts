import { test, expect } from "@playwright/test";

import { setup, login } from "./utils/utils";

import dotenv from "dotenv";

dotenv.config();

test("Create, View, Edit and Delete Post", async ({ page }) => {
  await setup(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");

  await page.getByText("Skapa annons").first().click();

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

  await page.getByText("Create Post Test").first().click();

  await expect(page.getByText("Create Post Test").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("This is a test post").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Efterfrågas").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Uppsala").filter({ visible: true }).first()).toBeVisible();

  await page.getByRole("button").filter({ hasText: "Redigera" }).first().click();

  await expect(page.getByText("Uppdatera annons").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Create Post Test").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("This is a test post").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Efterfrågas").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Inventarie").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Uppsala").filter({ visible: true }).first()).toBeVisible();

  await page.getByText("Erbjuds").first().click();

  await page.locator("input#title").first().fill("Edit Post Test");

  await page.locator("textarea#description").first().fill("This is an edited test post");

  await page.locator("button").filter({ hasText: "Inventarie" }).first().click();

  await page.getByText("Förbrukningsvara").first().click();

  await page.locator("button").filter({ hasText: "Uppsala" }).first().click();

  await page.keyboard.type("Stockholm");

  await page.getByText("Stockholm").first().click();

  await page.getByRole("button").filter({ hasText: "Uppdatera" }).first().click();

  await page.getByRole("button").filter({ hasText: "Uppdatera annons" }).first().click();

  await expect(page.getByText("Sök bland 1 annonser").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Edit Post Test").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("This is an edited test post").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Erbjuds").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Stockholm").filter({ visible: true }).first()).toBeVisible();

  await page.getByText("Edit Post Test").first().click();

  await page.getByRole("button").filter({ hasText: "Ta bort annons" }).first().click();

  await expect(page.getByText("Är du säker?").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Detta kommer permanent ta bort annonsen.").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Resulterade annonsen i en donation?").filter({ visible: true }).first()).toBeVisible();

  await page.locator('button[value="Olyckad"]').first().click();

  await page.getByRole("button").filter({ hasText: "Ta bort" }).first().click();

  await expect(page.getByText("Inga annonser hittades").filter({ visible: true }).first()).toBeVisible();
});
