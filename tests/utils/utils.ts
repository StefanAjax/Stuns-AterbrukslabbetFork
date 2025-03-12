import { test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { db } from "@/lib/db";
import { clerkSetup, setupClerkTestingToken } from "@clerk/testing/playwright";
import dotenv from "dotenv";

dotenv.config();

export const setup = async (page: Page, { login = false, directory = "/" }: { login?: boolean; directory?: string } = {}) => {
  await clerkSetup();

  await setupClerkTestingToken({ page });

  await db.post.deleteMany({});
  if (login) {
    await page.goto("/sign-in");

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
      .filter({ hasText: "Fortsätt", hasNotText: "Google" })
      .or(page.getByRole("button").filter({ hasText: "Continue", hasNotText: "Google" }))
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
