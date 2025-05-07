import { test, expect } from "@playwright/test";

import { setup, login } from "./utils/utils";

import dotenv from "dotenv";

dotenv.config();

test("Create post with image", async ({ page }) => {
  await setup(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");

  await page.getByText("Skapa annons").first().click();

  await page.getByText("Efterfrågas").first().click();

  await page.locator("input#title").first().fill("Create Post Test with image");

  await page.locator("textarea#description").first().fill("This is a test post with an image");

  await page.locator("button").filter({ hasText: "Välj kategori" }).first().click();

  await page.getByText("Inventarie").first().click();

  await page.locator("button").filter({ hasText: "Välj kommun" }).first().click();

  await page.keyboard.type("Uppsala");

  await page.getByText("Uppsala").first().click();

  await page.locator("input[type='file']").setInputFiles("./tests/assets/test-image.png");

  await page.getByRole("button").filter({ hasText: "Skapa" }).first().click();

  await page.getByRole("button").filter({ hasText: "Skapa annons" }).first().click();

  await expect(page.getByText("Sök bland 1 annonser").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Create Post Test with image").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("This is a test post with an image").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Efterfrågas").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Uppsala").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByAltText("Annonsens bild").filter({ visible: true }).first()).toHaveAttribute("src", /^.*api.*$/);
});

test("Add image to post", async ({ page }) => {
  await setup(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");

  await page.getByText("Skapa annons").first().click();

  await page.getByText("Efterfrågas").first().click();

  await page.locator("input#title").first().fill("Add image to post");

  await page.locator("textarea#description").first().fill("This is a test post with no image yet");

  await page.locator("button").filter({ hasText: "Välj kategori" }).first().click();

  await page.getByText("Inventarie").first().click();

  await page.locator("button").filter({ hasText: "Välj kommun" }).first().click();

  await page.keyboard.type("Uppsala");

  await page.getByText("Uppsala").first().click();

  await page.getByRole("button").filter({ hasText: "Skapa" }).first().click();

  await page.getByRole("button").filter({ hasText: "Skapa annons" }).first().click();

  await expect(page.getByText("Sök bland 1 annonser").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Add image to post").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("This is a test post with no image yet").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Efterfrågas").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Uppsala").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByAltText("Annonsens bild").filter({ visible: true }).first()).not.toHaveAttribute("src", /^.*api.*$/);

  await page.getByText("Add image to post").first().click();

  await page.getByRole("button").filter({ hasText: "Redigera" }).first().click();

  await page.locator("input[type='file']").setInputFiles("./tests/assets/test-image.png");

  await page.locator("textarea#description").first().fill("The post now has an image");

  await page.getByRole("button").filter({ hasText: "Uppdatera" }).first().click();

  await page.getByRole("button").filter({ hasText: "Uppdatera annons" }).first().click();

  await expect(page.getByText("Sök bland 1 annonser").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Add image to post").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("The post now has an image").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Efterfrågas").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Uppsala").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByAltText("Annonsens bild").filter({ visible: true }).first()).toHaveAttribute("src", /^.*api.*$/);
});

test("Remove image from post", async ({ page }) => {
  await setup(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");

  await page.getByText("Skapa annons").first().click();

  await page.getByText("Efterfrågas").first().click();

  await page.locator("input#title").first().fill("Remove image from post");

  await page.locator("textarea#description").first().fill("This is a test post with an image");

  await page.locator("button").filter({ hasText: "Välj kategori" }).first().click();

  await page.getByText("Inventarie").first().click();

  await page.locator("button").filter({ hasText: "Välj kommun" }).first().click();

  await page.keyboard.type("Uppsala");

  await page.getByText("Uppsala").first().click();

  await page.locator("input[type='file']").setInputFiles("./tests/assets/test-image.png");

  await page.getByRole("button").filter({ hasText: "Skapa" }).first().click();

  await page.getByRole("button").filter({ hasText: "Skapa annons" }).first().click();

  await expect(page.getByText("Sök bland 1 annonser").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Remove image from post").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("This is a test post with an image").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Efterfrågas").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Uppsala").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByAltText("Annonsens bild").filter({ visible: true }).first()).toHaveAttribute("src", /^.*api.*$/);

  await page.getByText("Remove image from post").first().click();

  await page.getByRole("button").filter({ hasText: "Redigera" }).first().click();

  await page.getByRole("button").filter({ hasText: "Ta bort bild" }).first().click();

  await expect(page.getByText("Klicka här eller dra och släpp en bild för att ladda upp").filter({ visible: true }).first()).toBeVisible();

  await page.locator("textarea#description").first().fill("The post now has no image");

  await page.getByRole("button").filter({ hasText: "Uppdatera" }).first().click();

  await page.getByRole("button").filter({ hasText: "Uppdatera annons" }).first().click();

  await expect(page.getByText("Sök bland 1 annonser").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Remove image from post").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("The post now has no image").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Efterfrågas").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Uppsala").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByAltText("Annonsens bild").filter({ visible: true }).first()).not.toHaveAttribute("src", /^.*api.*$/);
});

test("Change image in post", async ({ page }) => {
  await setup(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");

  await page.getByText("Skapa annons").first().click();

  await page.getByText("Efterfrågas").first().click();

  await page.locator("input#title").first().fill("Change image in post");

  await page.locator("textarea#description").first().fill("This is a test post with an image");

  await page.locator("button").filter({ hasText: "Välj kategori" }).first().click();

  await page.getByText("Inventarie").first().click();

  await page.locator("button").filter({ hasText: "Välj kommun" }).first().click();

  await page.keyboard.type("Uppsala");

  await page.getByText("Uppsala").first().click();

  await page.locator("input[type='file']").setInputFiles("./tests/assets/test-image.png");

  await page.getByRole("button").filter({ hasText: "Skapa" }).first().click();

  await page.getByRole("button").filter({ hasText: "Skapa annons" }).first().click();

  await expect(page.getByText("Sök bland 1 annonser").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Change image in post").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("This is a test post with an image").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Efterfrågas").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Uppsala").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByAltText("Annonsens bild").filter({ visible: true }).first()).toHaveAttribute("src", /^.*api.*$/);

  await page.getByText("Change image in post").first().click();

  await page.getByRole("button").filter({ hasText: "Redigera" }).first().click();

  await page.locator("input[type='file']").setInputFiles("./tests/assets/test-image-2.png");

  await page.locator("textarea#description").first().fill("The post now has a new image");

  await page.getByRole("button").filter({ hasText: "Uppdatera" }).first().click();

  await page.getByRole("button").filter({ hasText: "Uppdatera annons" }).first().click();

  await expect(page.getByText("Sök bland 1 annonser").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Change image in post").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("The post now has a new image").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Efterfrågas").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Uppsala").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByAltText("Annonsens bild").filter({ visible: true }).first()).toHaveAttribute("src", /^.*api.*$/);
});
