import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { APP_URL, PLAYWRIGHT_ENV } from "./tests/constants";

dotenv.config({
  path: path.resolve(".env"),
});

const isDevelopment = PLAYWRIGHT_ENV === "development";

export default defineConfig({
  testDir: "tests",
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["junit", { outputFile: "./playwright-report/junit-report.xml" }],
  ],
  use: {
    trace: "retain-on-failure",
    baseURL: APP_URL,
  },
  webServer: isDevelopment
    ? {
        command: process.env.CI ? "npm run prod" : "npm run dev",
        port: 5173,
        reuseExistingServer: true,
      }
    : undefined,
});
