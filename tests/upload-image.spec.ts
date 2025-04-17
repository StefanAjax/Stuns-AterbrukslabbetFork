import { test, expect } from "@playwright/test";

import { setup, login, logout } from "./utils/utils";

import dotenv from "dotenv";

dotenv.config();

test("Create post with image", async ({ page }) => {
  await setup(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");
});

test("Add image to post", async ({ page }) => {
  await setup(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");
});

test("Remove image from post", async ({ page }) => {
  await setup(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");
});

test("Change image in post", async ({ page }) => {
  await setup(page);

  await login(page, process.env.TEST_ADMIN_EMAIL || "", process.env.TEST_ADMIN_PASSWORD || "");
});
