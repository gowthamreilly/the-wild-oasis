import { expect, test } from "@playwright/test";

const LOGIN_URL = `/login`;
const DASHBOARD_URL = `/dashboard`;

const LOGIN_EMAIL = "gowtham@gowthamreilly.com";
const LOGIN_PASSWORD = "Revolution@24";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test("login page should be displayed when not logged in", async ({ page }) => {
  await page.goto("/");

  await page.waitForURL(LOGIN_URL);

  expect(page.url()).toBe(LOGIN_URL);

  const loginPageTitle = page.getByText("Log in to your account");

  await expect(loginPageTitle).toBeVisible();

  const emailAddressInputLocator = page.getByLabel("Email address");
  const passwordInputLocator = page.getByLabel("Password");

  await expect(emailAddressInputLocator).toBeVisible();
  await expect(passwordInputLocator).toBeVisible();

  await emailAddressInputLocator.fill(LOGIN_EMAIL);

  await passwordInputLocator.fill(LOGIN_PASSWORD);

  await expect(emailAddressInputLocator).toHaveValue(LOGIN_EMAIL);
  await expect(passwordInputLocator).toHaveValue(LOGIN_PASSWORD);

  await expect(passwordInputLocator).toHaveAttribute("type", "password");

  const loginButtonLocator = page.getByRole("button", { name: "Log in" });

  await expect(loginButtonLocator).toBeVisible();

  await loginButtonLocator.click();

  await page.waitForURL(DASHBOARD_URL);

  expect(page.url()).toBe(DASHBOARD_URL);

  const pageTitle = page
    .getByRole("heading", { name: "Dashboard" })
    .and(page.getByText("Dashboard"))
    .and(page.locator("h1"));

  await expect(pageTitle).toBeVisible();
});
