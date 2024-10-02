import { expect, test } from "@playwright/test";
// import path from "path";
// 1. Test plan
// 1. login page should be displayed when not logged in
// 2. user should be able to login
// 3. user should be able to logout
// 4. when logged in, user should be able to see the dashboard

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});
test("Login functionality", async ({ page }) => {
  const ROOT_URL = "http://localhost:5173";
  const LOGIN_URL = `${ROOT_URL}/login`;
  const DASHBOARD_URL = `${ROOT_URL}/dashboard`;

  // bydefault login page should be rendered.
  await page.goto("http://localhost:5173");
  await page.waitForURL(LOGIN_URL);
  await expect(page.url()).toBe(LOGIN_URL);

  // it should have password, email input field, toast error message and login button.
  const loginInputField = page.getByLabel("Email address");
  await expect(loginInputField).toBeVisible();
  const emailInputField = page.getByLabel("Password");
  await expect(emailInputField).toBeVisible();
  const passwordButton = page.getByRole("button", { name: "Log in" });
  await expect(passwordButton).toBeVisible();
  const toastMessage = page.getByRole("status");
  await expect(toastMessage).not.toBeVisible();

  // when trying to login with invalid credentails toast message should be visible.
  await loginInputField.fill("abc@gmail.com");
  await emailInputField.fill("123");
  await passwordButton.click();
  await expect(toastMessage).toBeVisible();

  // with valid credentials user should be redirected to dashboard page.
  await loginInputField.fill("gowtham@gowthamreilly.com");
  await emailInputField.fill("Revolution@24");
  await passwordButton.click();
  await page.waitForURL(DASHBOARD_URL);
  await expect(page.url()).toBe(DASHBOARD_URL);
  await expect(page.locator("h1")).toHaveText("Dashboard");

  // check if 5 different options are available in nav section of dashboard
  const navSection = page.locator("nav");
  await expect(navSection).toBeVisible();
  const options = navSection.getByRole("link");
  await expect(options).toHaveCount(5);

  // logout button should be there on dashboard page, user should be able to logout.
  const logoutButton = page.getByLabel("logout");
  await expect(logoutButton).toBeVisible();
  await logoutButton.click();
  await page.waitForURL(LOGIN_URL);
  await expect(page.url()).toBe(LOGIN_URL);
});
