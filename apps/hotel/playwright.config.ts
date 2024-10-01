import { defineConfig, devices } from "@playwright/test";

const BASE_APP_URL = "";

export default defineConfig({
  testDir: "tests",
  projects: [
    {
      name: "setup",
      testMatch: "tests/auth.setup.ts",
    },
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "auth.json",
        baseURL: "<BASE_APP_URL>",
      },
      dependencies: ["setup"],
    },
  ],
});
