import { expect, test } from "@playwright/test";

test("Login with valid credentials", async ({ page }) => {
  const LOGIN_URL = `http://localhost:5173/login`;
  const DASHBOARD_URL = `http://localhost:5173/dashboard`;

  // bydefault login page should be rendered.
  await page.goto("http://localhost:5173");
  await page.waitForURL(LOGIN_URL);
  expect(page.url()).toBe(LOGIN_URL);

  // it should have password, email input field, toast error message and login button.
  const emailInputField = page.getByLabel("Email address");
  await expect(emailInputField).toBeVisible();
  const passwordInputField = page.getByLabel("Password");
  await expect(passwordInputField).toBeVisible();
  const loginButton = page.getByRole("button", { name: "Log in" });
  await expect(loginButton).toBeVisible();

  // with valid credentials user should be redirected to dashboard page.
  await emailInputField.fill("gowtham@gowthamreilly.com");
  await passwordInputField.fill("Revolution@24");
  await loginButton.click();

  // store the token in local storage
  await page.waitForURL(DASHBOARD_URL);
  expect(page.url()).toBe(DASHBOARD_URL);
  await expect(page.locator("h1")).toHaveText("Dashboard");
  await page.context().storageState({ path: "auth.json" });
});
