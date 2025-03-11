import { test, expect } from "@playwright/test";
import { db } from "@/lib/db";

test("Title", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Återbrukslabbet").filter({ visible: true }).first()).toBeVisible();
});

test("No posts", async ({ page }) => {
  await db.post.deleteMany({});

  await page.goto("/");

  await expect(page.getByText("Inga annonser hittades").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Sök bland 0 annonser").filter({ visible: true }).first()).toBeVisible();
});

test("Categories", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Alla").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Erbjuds").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Efterfrågas").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Förbrukningsvara").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Instrument/Maskin").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Inventarie").filter({ visible: true }).first()).toBeVisible();
});
