import { test, expect } from "@playwright/test";

import { setup } from "./utils/utils";

test("FAQ", async ({ page }) => {
  await setup(page);

  await page.getByText("Vanliga frågor").first().click();

  await expect(page.getByText("Vanliga frågor och svar").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Vad är Återbrukslabbet?").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Vad innebär kategorierna?").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Får jag ta betalt för det jag erbjuder?").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Hur fungerar slutdatum för en annons?").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Varför syns slutdatum bara på vissa annonser?").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("En av mina annonser verkar vara borttagen?").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("När jag tar bort min annons blir jag frågad om annonsen resulterade i en donation?").filter({ visible: true }).first()).toBeVisible();
});

test("About us", async ({ page }) => {
  await setup(page);

  await page.getByText("Om oss").first().click();

  await expect(page.getByText("Om Återbrukslabbet").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Utvecklare våren 2024:").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Simon Clavensjö").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Lukas Gustafsson").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Mohamad Hamdan").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Ambjörn Hogmark").filter({ visible: true }).first()).toBeVisible();
});

test("TOS", async ({ page }) => {
  await setup(page);

  await page.getByText("Användarvillkor").first().click();

  await expect(page.getByText("Användarvillkor och integritetspolicy").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Ansvar för kontoinformation:").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Korrekt användning av tjänsten:").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Integritet och personuppgifter:").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Innehållsansvar:").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Begränsningar av ansvar:").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByText("Ändringar av användarvillkoren:").filter({ visible: true }).first()).toBeVisible();
});
