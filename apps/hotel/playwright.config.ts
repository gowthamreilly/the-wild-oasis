import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(".env"),
});

export default defineConfig({
  webServer: {
    command: "npm run dev",
    port: 5173,
    reuseExistingServer: true,
  },
  projects: [
    { name: "setup", testMatch: "tests/auth.setup.ts" },
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "auth.json",
        baseURL: process.env.APP_URL,
      },
      dependencies: ["setup"],
    },
  ],
  testDir: "tests",
  expect: {
    timeout: 30000,
  },
});
