import { expect, test } from "@playwright/test";
import path from "path";

const APP_URL = "http://localhost:5173";
const LOGIN_URL = `${APP_URL}/login`;
const DASHBOARD_URL = `${APP_URL}/dashboard`;

const LOGIN_EMAIL = "gowtham@gowthamreilly.com";
const LOGIN_PASSWORD = "Revolution@24";

const CUSTOMER_APP_URL = "http://localhost:3000/";
const CUSTOMER_CABINS_URL = `${CUSTOMER_APP_URL}cabins`;

const generateUniqueCabinName = () => {
  return `Cabin ${Date.now()}`;
};

test.beforeEach(async ({ page }) => {
  await page.goto(APP_URL);

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

test("create a cabin", async ({ page }) => {
  const cabinsNavMenuItemLink = page.getByRole("link", { name: "Cabins" });

  await expect(cabinsNavMenuItemLink).toBeVisible();

  await cabinsNavMenuItemLink.click();

  const cabinsPageTitle = page.getByRole("heading", { name: "All cabins" });

  await expect(cabinsPageTitle).toBeVisible();

  const addNewCabinButtonLocator = page.getByRole("button", {
    name: "Add new cabin",
  });

  await expect(addNewCabinButtonLocator).toBeVisible();

  await addNewCabinButtonLocator.click();

  const addNewCabinFormLocator = page.locator("form");

  await expect(addNewCabinFormLocator).toBeVisible();

  const cabinNameInputLocator = page.getByLabel("Cabin name");
  const cabinMaximumCapacityInputLocator = page.getByLabel("Maximum capacity");
  const cabinRegularPriceInputLocator = page.getByLabel("Regular price");
  const cabinDiscountInputLocator = page.getByLabel("Discount");
  const cabinDescriptionInputLocator = page.getByLabel(
    "Description for website"
  );
  const cabinImageInputLocator = page.getByLabel("Cabin photo");

  await expect(cabinNameInputLocator).toBeVisible();
  await expect(cabinMaximumCapacityInputLocator).toBeVisible();
  await expect(cabinRegularPriceInputLocator).toBeVisible();
  await expect(cabinDiscountInputLocator).toBeVisible();
  await expect(cabinDescriptionInputLocator).toBeVisible();
  await expect(cabinImageInputLocator).toBeVisible();

  const cabinName = generateUniqueCabinName();

  await cabinNameInputLocator.fill(cabinName);

  await cabinMaximumCapacityInputLocator.fill("4");
  await cabinRegularPriceInputLocator.fill("200");
  await cabinDiscountInputLocator.fill("20");
  await cabinDescriptionInputLocator.fill("A cozy cabin in the woods");

  const cabinImageFilePath = path.resolve("tests/images/image-1.jpg");

  await cabinImageInputLocator.setInputFiles(cabinImageFilePath);

  await expect(cabinNameInputLocator).toHaveValue(cabinName);
  await expect(cabinMaximumCapacityInputLocator).toHaveValue("4");
  await expect(cabinRegularPriceInputLocator).toHaveValue("200");
  await expect(cabinDiscountInputLocator).toHaveValue("20");
  await expect(cabinDescriptionInputLocator).toHaveValue(
    "A cozy cabin in the woods"
  );

  const addNewCabinFormSubmitButtonLocator = page.getByRole("button", {
    name: "Create new cabin",
  });

  await expect(addNewCabinFormSubmitButtonLocator).toBeVisible();

  await addNewCabinFormSubmitButtonLocator.click();

  const addNewCabinCreationSuccessMessageLocator = page.getByText(
    "New cabin successfully created"
  );

  await expect(addNewCabinCreationSuccessMessageLocator).toBeVisible();

  await expect(addNewCabinFormLocator).not.toBeVisible();

  const newlyCreatedCabinNameLocator = page.getByText(cabinName);

  await expect(newlyCreatedCabinNameLocator).toBeVisible();

  await page.goto(CUSTOMER_APP_URL);

  await page.waitForURL(CUSTOMER_APP_URL);

  expect(page.url()).toBe(CUSTOMER_APP_URL);

  const customerHomePageTitle = page.getByRole("heading", {
    name: "Welcome to paradise.",
  });

  await expect(customerHomePageTitle).toBeVisible();

  const exploreLuxuryCabinsButtonLocator = page.getByRole("link", {
    name: "Explore luxury cabins",
  });

  await expect(exploreLuxuryCabinsButtonLocator).toBeVisible();

  await exploreLuxuryCabinsButtonLocator.click();

  await page.waitForURL(CUSTOMER_CABINS_URL);

  expect(page.url()).toBe(CUSTOMER_CABINS_URL);

  const customerCabinsPageTitle = page.getByRole("heading", {
    name: "Our Luxury Cabins",
  });

  await expect(customerCabinsPageTitle).toBeVisible();

  await page.reload();

  await expect(newlyCreatedCabinNameLocator).toBeVisible();
});
