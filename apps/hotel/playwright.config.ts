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
      name: "setup",
      testMatch: "tests/auth.setup.ts",
    },
    {
      name: "Chromium",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "auth.json",
        baseURL: "http://localhost:5173",
      },
    },
  ],
});
