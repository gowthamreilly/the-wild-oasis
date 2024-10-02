// /* cabin  */
// import { test, expect } from "@playwright/test";
// import path from "path";

// const APP_URL = "http://localhost:5173";
// const LOGIN_URL = `${APP_URL}/login`;
// const DASHBOARD_URL = `${APP_URL}/dashboard`;
// const CABIN_URL = `${APP_URL}/cabins`;

// const uniqueCabinName = () => {
//   return `Tony's Cabin ${Date.now()}`;
// };

// test.beforeEach("login", async ({ page }) => {
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

//   const pageTitle = page
//     .getByRole("heading", { name: "Dashboard" })
//     .and(page.getByText("Dashboard"))
//     .and(page.locator("h1"));
//   await expect(pageTitle).toBeVisible();
// });

// test("cabin ", async ({ page }) => {
//   const navLocator = page.locator("nav");
//   await expect(navLocator).toBeVisible();

//   const cabinButton = navLocator.getByRole("link", { name: "Cabins" });
//   await expect(cabinButton).toBeVisible();

//   await cabinButton.click();
//   await page.waitForURL(CABIN_URL);
//   expect(page.url()).toBe(CABIN_URL);

//   const cabinPageTitle = page
//     .getByRole("heading", { name: "All cabins" })
//     .and(page.getByText("All cabins"))
//     .and(page.locator("h1"));

//   await expect(cabinPageTitle).toBeVisible();

//   const addNewCabinBtn = page.getByRole("button", { name: "Add new cabin" });
//   await expect(addNewCabinBtn).toBeVisible();

//   await addNewCabinBtn.click();

//   const addNewCabinForm = page.locator("form");
//   await expect(addNewCabinForm).toBeVisible();

//   const cabinNameInputLocator = addNewCabinForm.getByLabel("Cabin name");
//   const maxCapacityInputLocator =
//     addNewCabinForm.getByLabel("Maximum capacity");
//   const regularPriceInputLocator = addNewCabinForm.getByLabel("Regular price");
//   const discountInputLocator = addNewCabinForm.getByLabel("Discount");
//   const descriptionForWebsiteInputLocator = addNewCabinForm.getByLabel(
//     "Description for website"
//   );
//   const cabinPhotoInputLocator = addNewCabinForm.getByLabel("Cabin photo");

//   await expect(cabinNameInputLocator).toBeVisible();
//   await expect(maxCapacityInputLocator).toBeVisible();
//   await expect(regularPriceInputLocator).toBeVisible();
//   await expect(discountInputLocator).toBeVisible();
//   await expect(descriptionForWebsiteInputLocator).toBeVisible();
//   await expect(cabinPhotoInputLocator).toBeVisible();

//   const cabinName = uniqueCabinName();
//   const cabinPhotoPath = path.resolve("apps/hotel/tests/images/image-2.jpg");

//   await cabinNameInputLocator.fill(cabinName);
//   await maxCapacityInputLocator.fill("2");
//   await regularPriceInputLocator.fill("1000");
//   await discountInputLocator.fill("10");
//   await descriptionForWebsiteInputLocator.fill("Luxurious");
//   await cabinPhotoInputLocator.setInputFiles(cabinPhotoPath);

//   await expect(cabinNameInputLocator).toHaveValue(cabinName);
//   await expect(maxCapacityInputLocator).toHaveValue("2");
//   await expect(regularPriceInputLocator).toHaveValue("1000");
//   await expect(discountInputLocator).toHaveValue("10");
//   await expect(descriptionForWebsiteInputLocator).toHaveValue("Luxurious");

//   const createNewCabinBtn = addNewCabinForm.getByRole("button", {
//     name: "Create new cabin",
//   });
//   await expect(createNewCabinBtn).toBeVisible();
//   await createNewCabinBtn.click();

//   const createdCabinSuccessfully = page.getByText(
//     "New cabin successfully created"
//   );
//   await expect(createdCabinSuccessfully).toBeVisible();
// });
