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
        baseURL: 'http://localhost:5173',
      },
      dependencies: ["setup"],
    },
    {
      name: "setup",
      testMatch: "tests/auth.setup.ts",
    },
  ],
  reporter: [["list"], ["html"]],
});
