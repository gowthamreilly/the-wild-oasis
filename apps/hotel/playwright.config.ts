import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  use: {
    
  },
  projects: [
    { name: "setup", testMatch: "tests/auth.setup.ts" },
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], storageState: "auth.json" },
      dependencies: ["setup"],
    },
  ],
  testDir: "tests",
  expect: {
    timeout: 30000,
  },
});