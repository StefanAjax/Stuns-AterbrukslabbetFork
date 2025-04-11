import { test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { db } from "@/lib/db";
import { clerk, clerkSetup, setupClerkTestingToken } from "@clerk/testing/playwright";

export const setup = async (page: Page) => {
  await db.post.deleteMany({});

  await page.goto("/");
};

export const login = async (page: Page, identifier: string, password: string) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await clerkSetup();

  await setupClerkTestingToken({ page });

  await clerk.loaded({ page });

  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: identifier,
      password: password,
    },
  });
};

export const logout = async (page: Page) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await clerk.signOut({ page });
};

export const screenshot = async (page: Page, browserName: string) => {
  await page.screenshot({
    path: `./tests/logs/screenshot-${test.info().title}-${browserName}-${Date.now()}.png`,
    fullPage: true,
  });
};
