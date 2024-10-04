import { defineConfig } from "@playwright/test";

const PLAYWRIGHT_ENV = process.env.PLAYWRIGHT_ENV;
const isDevelopment = PLAYWRIGHT_ENV === "development";

const baseURL = (() => {
  switch (PLAYWRIGHT_ENV) {
    case "development":
      return "http://localhost:3000";
    case "production":
      return "https://the-wild-oasis-guest-pi.vercel.app";
    case "staging":
      return "https://the-wild-oasis-guest-pi.vercel.app";
    case "qa":
      return "https://the-wild-oasis-guest-pi.vercel.app";
    case "moon":
      return "https://the-wild-oasis-guest-pi.vercel.app";
    default:
      return "http://localhost:3000";
  }
})();

export default defineConfig({
  testDir: "tests",
  use: {
    baseURL: baseURL,
    trace: "retain-on-failure",
  },
  reporter: [["list"], ["html"]],
  webServer: isDevelopment
    ? {
        command: process.env.CI ? "npm run prod" : "npm run dev",
        port: 3000,
        reuseExistingServer: true,
      }
    : undefined,
});
