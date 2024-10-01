import { test, expect } from "@playwright/test";
const APP_URL = "http://localhost:5173";
const LOGIN_URL = `${APP_URL}/login`;
test("toast for wrong credentials", async ({ page }) => {
  await page.goto(APP_URL);
  await page.waitForURL(LOGIN_URL);
  expect(page.url()).toBe(LOGIN_URL);

  const formLocator = page.locator("form");
  await expect(formLocator).toBeVisible();

  const emailLocator = formLocator.getByLabel("Email address");
  await expect(emailLocator).toBeVisible();

  await emailLocator.fill("gowtham@gowthamreilly.com");

  const passwordLocator = formLocator.getByLabel("Password");
  await expect(passwordLocator).toBeVisible();

  await passwordLocator.fill("yadfs");

  const loginBtn = formLocator.locator("button");
  await expect(loginBtn).toBeVisible();

  await loginBtn.click();

  // look for toast text
  const toast = page.getByRole("status");
  await expect(toast).toBeVisible();

  const toastText = toast.getByText("Provided email or password are incorrect");
  await expect(toastText).toBeVisible();
});
