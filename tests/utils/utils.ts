import { test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { db } from "@/lib/db";
import { clerk, clerkSetup, setupClerkTestingToken } from "@clerk/testing/playwright";
import dotenv from "dotenv";

dotenv.config();

export const setup = async (page: Page, { login = false, directory = "/" }: { login?: boolean; directory?: string } = {}) => {
  await clerkSetup();

  await setupClerkTestingToken({ page });

  await db.post.deleteMany({});
  if (login) {
    await clerk.signIn({
      page,
      signInParams: {
        strategy: "password",
        identifier: process.env.TESTING_EMAIL || "",
        password: process.env.TESTING_PASSWORD || "",
      },
    });
  }

  await page.goto(directory);
};

export const screenshot = async (page: Page, browserName: string) => {
  await page.screenshot({
    path: `./tests/logs/screenshot-${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });
};
