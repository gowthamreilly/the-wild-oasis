// /* test */

// import { expect, test } from "@playwright/test";

// const APP_URL = "http://localhost:5173";
// const LOGIN_URL = `${APP_URL}/login`;
// const DASHBOARD_URL = `${APP_URL}/dashboard`;

// test("guest login should display", async ({ page }) => {
//   await page.goto(APP_URL);
//   await page.waitForURL(LOGIN_URL);
//   expect(page.url()).toBe(LOGIN_URL);

//   // login page heading
//   const loginHeading = page.getByRole("heading", {
//     name: "Log in to your account",
//   });
//   await expect(loginHeading).toBeVisible();

//   const formLocator = page.locator("form");
//   await expect(formLocator).toBeVisible();

//   // email
//   const emailLocator = formLocator.getByLabel("Email address");
//   await expect(emailLocator).toBeVisible();

//   // password
//   const passwordLocator = formLocator.getByLabel("Password");
//   await expect(passwordLocator).toBeVisible();

//   await emailLocator.fill("gowtham@gowthamreilly.com");
//   await passwordLocator.fill("Revolution@24");

//   // login button
//   const loginBtn = formLocator.getByRole("button", { name: "Log in" });
//   await expect(loginBtn).toBeVisible();
//   await loginBtn.click();

//   await page.waitForURL(DASHBOARD_URL);
//   expect(page.url()).toBe(DASHBOARD_URL);

//   // dashboard heading
//   const dashboardHeading = page.locator("h1").filter({ hasText: "Dashboard" });
//   await expect(dashboardHeading).toBeVisible();

//   // logout
//   const logoutButton = page.locator("button").getByLabel("Log out");
//   await expect(logoutButton).toBeVisible();

//   // theme
//   const themeButton = page.locator("button").getByLabel("Theme");
//   await expect(themeButton).toBeVisible();

//   // profile
//   const accountButton = page.locator("button").getByLabel("Account");
//   await expect(accountButton).toBeVisible();

//   // accoount/profile
//   /* upadate your account */
//   await accountButton.click();
//   const updateHeading = page
//     .locator("h1")
//     .filter({ hasText: "Update your account" });
//   await expect(updateHeading).toBeVisible();

//   const updateUserDataHeading = page
//     .locator("h3")
//     .filter({ hasText: "Update user data" });
//   await expect(updateUserDataHeading).toBeVisible();

//   const updateUserDataFormLocator = page
//     .locator("form")
//     .filter({ has: page.getByText("Email address") });
//   await expect(updateUserDataFormLocator).toBeVisible();

//   const updatePasswordForm = page
//     .locator("form")
//     .filter({ has: page.getByText("New password (min 8 chars)") });
//   await expect(updatePasswordForm).toBeVisible();

//   const email = updateUserDataFormLocator.getByText("Email address");
//   await expect(email).toBeVisible();

//   //   const emailInput = updateUserDataFormLocator.getByRole("");
//   //   await expect(emailInput).toBeVisible();
//   //-------
//   //   await expect(email).
//   // check for can not update
//   //   await expect(email).not.toBeEnabled();

//   const fullName = updateUserDataFormLocator.getByText("Full name");
//   await expect(fullName).toBeVisible();
//   //   await fullName.fill("Saturo Gojo");
// });
