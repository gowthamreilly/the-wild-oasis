import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(".env"),
});

export default defineConfig({
  testDir: "tests",
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "auth.json",
        baseURL: process.env.APP_URL,
      },
      dependencies: ["setup"],
    },
    {
      name: "setup",
      testMatch: "tests/auth.setup.ts",
    },
  ],
});
