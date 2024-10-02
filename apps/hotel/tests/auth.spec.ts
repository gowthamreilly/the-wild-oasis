import { expect, test } from "@playwright/test";
import { LoginPage } from "./pages/login.page";

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

test("login page should be displayed when not logged in", async ({
  page,
  baseURL,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await page.waitForURL(LOGIN_URL);

  expect(page.url()).toBe(`${baseURL}${LOGIN_URL}`);

  await expect(loginPage.pageTitleLocator).toBeVisible();

  await expect(loginPage.emailAddressInputLocator).toBeVisible();
  await expect(loginPage.passwordInputLocator).toBeVisible();

  await loginPage.emailAddressInputLocator.fill(LOGIN_EMAIL);

  await loginPage.passwordInputLocator.fill(LOGIN_PASSWORD);

  await expect(loginPage.emailAddressInputLocator).toHaveValue(LOGIN_EMAIL);
  await expect(loginPage.passwordInputLocator).toHaveValue(LOGIN_PASSWORD);

  await expect(loginPage.passwordInputLocator).toHaveAttribute(
    "type",
    "password"
  );

  await expect(loginPage.loginButtonLocator).toBeVisible();

  await loginPage.loginButtonLocator.click();

  await page.waitForURL(DASHBOARD_URL);

  expect(page.url()).toBe(`${baseURL}${DASHBOARD_URL}`);

  const pageTitle = page
    .getByRole("heading", { name: "Dashboard" })
    .and(page.getByText("Dashboard"))
    .and(page.locator("h1"));

  await expect(pageTitle).toBeVisible();
});
