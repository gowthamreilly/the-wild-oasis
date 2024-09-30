import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  expect: {
    timeout: 10000,
  },
});
