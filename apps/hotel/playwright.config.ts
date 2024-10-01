import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [
    { name: "setup", testMatch: "tests/auth.setup.ts" },
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "auth.json",
        baseURL: "http://localhost:5173",
      },
      dependencies: ["setup"],
    },
  ],
  testDir: "tests",
  expect: {
    timeout: 30000,
  },
});
