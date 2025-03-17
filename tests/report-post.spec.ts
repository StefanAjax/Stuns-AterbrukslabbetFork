import { test, expect } from "@playwright/test";

import { setup, screenshot } from "./utils/utils";

test("Report Post", async ({ page, browserName }) => {
  await setup(page);
});
