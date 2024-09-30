import { test, expect } from "@playwright/test";
import path from "path";

const BASE_URL = "http://localhost:5173";
const DASHBOARD_URL = `${BASE_URL}/dashboard`;
const LOGIN_URL = `${BASE_URL}/login`;
const CABIN_LINK = `${BASE_URL}/cabins`;

const uniqueCabinName = () => {
  return `${Date.now()} Cabin`;
};

test.beforeEach(async ({ page }) => {
  await page.goto(DASHBOARD_URL);

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
});

test("testing the Cabin page", async ({ page }) => {
  const navbarContainer = page.locator("nav");
  await expect(navbarContainer).toBeVisible();

  const allLinks = navbarContainer.locator("li");
  await expect(allLinks).toHaveCount(5);

  const homeLink = allLinks.getByText("Home");
  await expect(homeLink).toBeVisible();
  await homeLink.hover();

  const cabinLink = allLinks.getByText("Cabins");
  await cabinLink.click();
  await page.waitForURL(CABIN_LINK);
  expect(page.url()).toBe(CABIN_LINK);

  const cabinHeader = page.getByLabel("cabin-header");
  await expect(cabinHeader).toBeVisible();
  await expect(cabinHeader.getByText("All cabins")).toBeVisible();
  await expect(cabinHeader.getByRole("button")).toHaveCount(3);

  //================= all,no discount,with discount buttons=====================
  const initialData = page.locator("section");
  await expect(initialData).toBeVisible();

  const initialDataCount = initialData.getByRole("row");
  console.log("initial count", await initialDataCount.count());

  const withDiscountButtons = page.getByRole("button", {
    name: "With discount",
  });
  await withDiscountButtons.click();
  const withDiscountCounts = initialData.getByRole("row");
  console.log("with discount count", await withDiscountCounts.count());
  await expect(initialData).toBeVisible();

  const withNoDiscountButtons = page.getByRole("button", {
    name: "No discount",
  });
  await withNoDiscountButtons.click();
  const withNoDiscountCounts = initialData.getByRole("row");
  console.log("with no discount count", await withNoDiscountCounts.count());
  await expect(initialData).toBeVisible();

  await page.getByRole("button", { name: "All" }).click();
  await expect(initialData).toBeVisible();

  //================delete a cabin================================
  const actionButtonInRow = initialData.locator("svg");
  expect(await actionButtonInRow.count()).toBe(await initialDataCount.count());

  const firstActionButtonInRow = actionButtonInRow.first();
  await expect(firstActionButtonInRow).toBeVisible();

  await firstActionButtonInRow.click();
  const duplicateActionDropDownMenu = page
    .getByRole("button")
    .filter({ hasText: "Duplicate" });
  await expect(duplicateActionDropDownMenu).toBeVisible();

  const EditActionDropDownMenu = page
    .getByRole("button")
    .filter({ hasText: "Edit" });
  await expect(EditActionDropDownMenu).toBeVisible();

  const deleteActionDropDownMenu = page
    .getByRole("button")
    .filter({ hasText: "Delete" });
  await expect(deleteActionDropDownMenu).toBeVisible();

  await deleteActionDropDownMenu.click();

  //=======================adding a cabin=====================
  // const addNewCabinButton = page.getByRole("button", { name: "Add new cabin" });
  // await expect(addNewCabinButton).toBeVisible();
  // await addNewCabinButton.click();

  // const addNewCabinFormContainer = page.locator("form");
  // await expect(addNewCabinFormContainer).toBeVisible();

  // const newCabinName = uniqueCabinName();

  // const cabinNameInputField = addNewCabinFormContainer.getByLabel("Cabin name");
  // await cabinNameInputField.fill(newCabinName);

  // const cabinMaximumCapacityInputField =
  //   addNewCabinFormContainer.getByLabel("Maximum capacity");
  // await cabinMaximumCapacityInputField.fill("10");

  // const cabinRegularPriceInputField =
  //   addNewCabinFormContainer.getByLabel("Regular price");
  // await cabinRegularPriceInputField.fill("1000");

  // const cabinDiscountInputField =
  //   addNewCabinFormContainer.getByLabel("Discount");
  // await cabinDiscountInputField.fill("100");

  // const cabinDescriptionInputField = addNewCabinFormContainer.getByLabel(
  //   "Description for website"
  // );
  // await cabinDescriptionInputField.fill("Beautiful place to live in");

  // const imagepath = path.resolve("tests/images/image-5.jpg");
  // const cabinphotoInputField =
  //   addNewCabinFormContainer.getByLabel("Cabin photo");
  // await cabinphotoInputField.setInputFiles(imagepath);

  // const createNewCabinButton = addNewCabinFormContainer.getByRole("button", {
  //   name: "Create new cabin",
  // });
  // await expect(createNewCabinButton).toBeVisible();
  // await createNewCabinButton.click();

  // const addCabinToastMessage = page.getByText("New cabin successfully created");
  // await expect(addCabinToastMessage).toBeVisible();
});
