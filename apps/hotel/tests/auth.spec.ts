import { expect, test } from "@playwright/test";

// 1. Test plan
// 1. login page should be displayed when not logged in
// 2. user should be able to login
// 3. user should be able to logout
// 4. when logged in, user should be able to see the dashboard

const BASE_URL = "http://localhost:5173";
const DASHBOARD_URL = `${BASE_URL}/dashboard`;
const LOGIN_URL = `${BASE_URL}/login`;
test("Login testing", async ({ page }) => {
  await page.goto(BASE_URL);
  await page.waitForURL(LOGIN_URL);
  expect(page.url()).toBe(LOGIN_URL);

  const loginPageTitle = page.getByText("Log in to your account");
  await expect(loginPageTitle).toBeVisible();

  const formContainer = page.locator("form");
  await expect(formContainer).toBeVisible();

  const emailInputField = formContainer.getByLabel("Email address");
  await expect(emailInputField).toBeVisible();
  await emailInputField.fill("gowtham@gowthamreilly.com");
  await expect(emailInputField).toHaveValue("gowtham@gowthamreilly.com");

  const passwordInputField = formContainer.getByLabel("Password");
  await expect(passwordInputField).toBeVisible();
  await passwordInputField.fill("Revolution@24");
  await expect(passwordInputField).toHaveValue("Revolution@24");

  const loginButton = formContainer.getByRole("button", { name: "Log in" });
  await loginButton.click();

  await page.waitForURL(DASHBOARD_URL);
  expect(page.url()).toBe(DASHBOARD_URL);

  const dashboardHeading = page.locator("h1").filter({ hasText: "Dashboard" });
  await expect(dashboardHeading).toBeVisible();

  const logoutButton = page.getByLabel("Log out");
  await expect(logoutButton).toBeVisible();
  await logoutButton.click();

  await page.waitForURL(LOGIN_URL);
  expect(page.url()).toBe(LOGIN_URL);
  await expect(loginPageTitle).toBeVisible();

  const toastContainer = page.getByRole("status");
  await emailInputField.fill("gowtha@gowthamreilly.com");
  await passwordInputField.fill("Revolution@23");
  await loginButton.click();
  await expect(toastContainer).toBeVisible();
});
