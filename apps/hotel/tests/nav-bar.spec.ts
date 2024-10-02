// import { expect, test } from "@playwright/test";

// const APP_URL = "http://localhost:5173";
// const LOGIN_URL = `${APP_URL}/login`;
// const DASHBOARD_URL = `${APP_URL}/dashboard`;
// const CABINS_URL = `${APP_URL}/cabins`;

// const LOGIN_EMAIL = "gowtham@gowthamreilly.com";
// const LOGIN_PASSWORD = "Revolution@24";

// // const CUSTOMER_APP_URL = "http://localhost:3000/";
// // const CUSTOMER_CABINS_URL = `${CUSTOMER_APP_URL}cabins`;

// test.beforeEach(async ({ page }) => {
//   await page.goto(APP_URL);

//   await page.waitForURL(LOGIN_URL);

//   expect(page.url()).toBe(LOGIN_URL);

//   const loginPageTitle = page.getByText("Log in to your account");

//   await expect(loginPageTitle).toBeVisible();

//   const emailAddressInputLocator = page.getByLabel("Email address");
//   const passwordInputLocator = page.getByLabel("Password");

//   await expect(emailAddressInputLocator).toBeVisible();
//   await expect(passwordInputLocator).toBeVisible();

//   await emailAddressInputLocator.fill(LOGIN_EMAIL);

//   await passwordInputLocator.fill(LOGIN_PASSWORD);

//   await expect(emailAddressInputLocator).toHaveValue(LOGIN_EMAIL);
//   await expect(passwordInputLocator).toHaveValue(LOGIN_PASSWORD);

//   await expect(passwordInputLocator).toHaveAttribute("type", "password");

//   const loginButtonLocator = page.getByRole("button", { name: "Log in" });

//   await expect(loginButtonLocator).toBeVisible();

//   await loginButtonLocator.click();

//   await page.waitForURL(DASHBOARD_URL);

//   expect(page.url()).toBe(DASHBOARD_URL);

//   const pageTitle = page
//     .getByRole("heading", { name: "Dashboard" })
//     .and(page.getByText("Dashboard"))
//     .and(page.locator("h1"));

//   await expect(pageTitle).toBeVisible();
// });

// test.beforeEach("test navBar", async ({ page }) => {
//   expect(page.url()).toBe(DASHBOARD_URL);

//   const navBar = page.locator("nav");
//   await expect(navBar).toBeVisible();

//   const homeBtn = navBar.getByRole("link", { name: "Home" });
//   const bookingsBtn = navBar.getByRole("link", { name: "Bookings" });
//   const cabinsBtn = navBar.getByRole("link", { name: "Cabins" });
//   const usersBtn = navBar.getByRole("link", { name: "Users" });
//   const settingsBtn = navBar.getByRole("link", { name: "Settings" });

//   await expect(homeBtn).toBeVisible();
//   await expect(bookingsBtn).toBeVisible();
//   await expect(cabinsBtn).toBeVisible();
//   await expect(usersBtn).toBeVisible();
//   await expect(settingsBtn).toBeVisible();
// });

// test("test header, update account", async ({ page }) => {
//   expect(page.url()).toBe(DASHBOARD_URL);

//   // logout
//   const logoutButton = page.locator("button").getByLabel("Log out");
//   await expect(logoutButton).toBeVisible();

//   // theme
//   const themeButton = page.locator("button").getByLabel("Theme");
//   await expect(themeButton).toBeVisible();

//   // account/profile
//   const accountButton = page.locator("button").getByLabel("Account");
//   await expect(accountButton).toBeVisible();

//   // update account/profile
//   await accountButton.click();
//   const updatePageHeadingLocator = page
//     .locator("h1")
//     .filter({ hasText: "Update your account" });
//   await expect(updatePageHeadingLocator).toBeVisible();

//   const updateUserDataHeadingLocator = page
//     .locator("h3")
//     .filter({ hasText: "Update user data" });
//   await expect(updateUserDataHeadingLocator).toBeVisible();

//   const updateUserDataFormLocator = page
//     .locator("form")
//     .filter({ has: page.getByText("Email address") });
//   await expect(updateUserDataFormLocator).toBeVisible();

//   const updatePasswordForm = page
//     .locator("form")
//     .filter({ has: page.getByText("New password (min 8 chars)") });
//   await expect(updatePasswordForm).toBeVisible();

//   // const email = updateUserDataFormLocator.getByLabel("Email address");
//   const email = updateUserDataFormLocator.getByText("Email address");

//   await expect(email).toBeVisible();
//   // await expect(email).toBeDisabled();

//   const fullName = updateUserDataFormLocator.getByLabel("Full name");
//   await expect(fullName).toBeVisible();
//   // await expect(email).toBeEnabled();

//   const avatarImage = updateUserDataFormLocator.getByLabel("Avatar image");
//   await expect(avatarImage).toBeVisible();

//   // const emailInput = updateUserDataFormLocator.getByText(
//   //   "gowtham@gowthamreilly.com"
//   // );
//   // await expect(emailInput).toBeVisible();
// });

// test("cabin view", async ({ page }) => {
//   await page.goto(CABINS_URL);
//   expect(page.url()).toBe(CABINS_URL);

//   const cabinsHeading = page
//     .getByRole("heading", { name: "All cabins" })
//     .and(page.locator("h1"));
//   await expect(cabinsHeading).toBeVisible();

//   const allBtn = page.getByRole("button", { name: "All" });
//   const noDiscountBtn = page.getByRole("button", { name: "No discount" });
//   const withDiscount = page.getByRole("button", { name: "With discount" });
//   const sortByBtn = page.locator("select");

//   await expect(allBtn).toBeVisible();
//   await expect(noDiscountBtn).toBeVisible();
//   await expect(withDiscount).toBeVisible();
//   await expect(sortByBtn).toBeVisible();

//   //   await allBtn.click();
//   await expect(allBtn).toBeDisabled();

//   await noDiscountBtn.click();
//   await expect(noDiscountBtn).toBeDisabled();

//   await withDiscount.click();
//   await expect(withDiscount).toBeDisabled();

//   await sortByBtn.click();
//   await expect(sortByBtn).toBeEnabled();

//   //   const options = sortByBtn.selectOption("Sort by name (A-Z)");
//   /* select option and check for the data */
// });

// test("logout process", async ({ page }) => {
//   // logout button
//   const logoutButton = page.locator("button").getByLabel("Log out");
//   await expect(logoutButton).toBeVisible();

//   // logout process
//   await logoutButton.click();

//   await page.waitForURL(LOGIN_URL);
//   expect(page.url()).toBe(LOGIN_URL);

//   const loginHeading = page.getByRole("heading", {
//     name: "Log in to your account",
//   });
//   await expect(loginHeading).toBeVisible();
// });
