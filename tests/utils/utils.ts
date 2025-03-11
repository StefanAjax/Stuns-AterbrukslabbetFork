import { test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { db } from "@/lib/db";
import dotenv from "dotenv";

dotenv.config();

export const setup = async (page: Page, { login = false, directory = "/" }: { login?: boolean; directory?: string } = {}) => {
  await db.post.deleteMany({});
  if (login) {
    await page.goto("/");

    await page.getByText("Logga in").first().click();

    await page
      .locator("#identifier-field")
      .first()
      .fill(process.env.TESTING_EMAIL || "");

    await page
      .locator("#password-field")
      .first()
      .fill(process.env.TESTING_PASSWORD || "");

    await page
      .getByRole("button")
      .filter({ hasText: "Fortsätt" })
      .or(page.getByRole("button").filter({ hasText: "Continue" }))
      .first()
      .click();
  }

  await page.goto(directory);
};

export const screenshot = async (page: Page, browserName: string) => {
  await page.screenshot({
    path: `./tests/logs/screenshot-${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });
};
