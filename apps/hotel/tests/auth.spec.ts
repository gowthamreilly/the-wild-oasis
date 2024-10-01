import { expect, test } from "@playwright/test";
import path from "path";
// 1. Test plan
// 1. login page should be displayed when not logged in
// 2. user should be able to login
// 3. user should be able to logout
// 4. when logged in, user should be able to see the dashboard

test("Login functionality and create and delete new cabin", async ({
  page,
}) => {
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

  // click on cabins option and check for list of cabins.
  await options.getByText("Cabins").click();
  await expect(page.locator("h1")).toHaveText("All cabins");
  const cabinsList = page.getByRole("table");
  await expect(cabinsList).toBeVisible();

  // check for the filter options to show the list, default all should be selected.
  const allcabinsSelectButton = page.getByRole("button", { name: "All" });
  await expect(allcabinsSelectButton).toBeVisible();
  await expect(allcabinsSelectButton).toBeDisabled();
  const cabinswithoutDiscountSelectButton = page.getByRole("button", {
    name: "No discount",
  });
  await expect(cabinswithoutDiscountSelectButton).toBeVisible();
  await expect(cabinswithoutDiscountSelectButton).not.toBeDisabled();
  // try to select without discount cabins from filter.
  await cabinswithoutDiscountSelectButton.click();
  await expect(cabinswithoutDiscountSelectButton).toBeDisabled();
  await expect(allcabinsSelectButton).not.toBeDisabled();
  const cabinswithDiscountSelectButton = page.getByRole("button", {
    name: "With discount",
  });
  await expect(cabinswithDiscountSelectButton).toBeVisible();
  await expect(cabinswithDiscountSelectButton).not.toBeDisabled();
  // try to select with discount cabins from filter.
  await cabinswithDiscountSelectButton.click();
  await expect(cabinswithDiscountSelectButton).toBeDisabled();
  await expect(cabinswithoutDiscountSelectButton).not.toBeDisabled();

  // check for the filter to sort list by price
  const sortByPriceSelector = page.locator("select");
  await expect(sortByPriceSelector).toBeVisible();

  // 'add new cabin' option.
  const addNewCabinButton = page.getByRole("button", { name: "Add new cabin" });
  await expect(addNewCabinButton).toBeVisible();
  const newCabinForm = page.locator("form");
  await expect(newCabinForm).not.toBeVisible();

  // form to add a new cabin should open by clicking on button, check for all fields to add new cabin.
  await addNewCabinButton.click();
  await expect(newCabinForm).toBeVisible();
  const newCabinName = newCabinForm.getByLabel("Cabin name");
  const newCabinMaximumCapacity = newCabinForm.getByLabel("Maximum capacity");
  const newCabinRegularPrice = newCabinForm.getByLabel("Regular price");
  const newCabinDiscount = newCabinForm.getByLabel("Discount");
  const newCabinDescription = newCabinForm.getByLabel(
    "Description for website"
  );
  const newCabinPhoto = newCabinForm.getByLabel("Cabin photo");
  const submitNewCabinButton = newCabinForm.getByRole("button", {
    name: "Create new cabin",
  });
  await expect(newCabinName).toBeVisible();
  await expect(newCabinMaximumCapacity).toBeVisible();
  await expect(newCabinRegularPrice).toBeVisible();
  await expect(newCabinDiscount).toBeVisible();
  await expect(newCabinDescription).toBeVisible();
  await expect(newCabinPhoto).toBeVisible();
  await expect(submitNewCabinButton).toBeVisible();

  // try to add data in all input fields and create new cabin, check for newly created cabin and popup message.
  const cabinName = "Cabin" + Date.now();
  const cabinPhotoPath = path.resolve("apps/hotel/tests/images/image-1.jpg");
  await newCabinName.fill(cabinName);
  await newCabinMaximumCapacity.fill("4");
  await newCabinRegularPrice.fill("200");
  await newCabinDiscount.fill("20");
  await newCabinDescription.fill("Must visit cabin");
  await newCabinPhoto.setInputFiles(cabinPhotoPath);
  //   const closeButton = page.getByLabel("close");
  //   await expect(closeButton).toBeVisible();
  //   await closeButton.click();
  //   await newCabinForm.getByRole("button", { name: "Cancel" }).click();
  await submitNewCabinButton.click();
  // await expect(newCabinForm).not.toBeVisible();
  await expect(
    page
      .getByRole("status")
      .filter({ hasText: "New cabin successfully created" })
  ).toBeVisible();
  await expect(cabinsList.getByText(cabinName)).toBeVisible();

  // try to delete newly created test cases.
  const newCabinRow = cabinsList
    .getByRole("row")
    .filter({ has: page.getByText(cabinName) });
  await expect(newCabinRow).toBeVisible();
  const meatballmenuForNewCabin = newCabinRow.getByRole("button");
  await expect(meatballmenuForNewCabin).toBeVisible();
  const meatballmenuDeleteOption = page.getByLabel("Delete");
  await expect(meatballmenuDeleteOption).not.toBeVisible();
  await meatballmenuForNewCabin.click();
  await expect(meatballmenuDeleteOption).toBeVisible();
  await meatballmenuDeleteOption.click();
  await expect(page.locator("h3").getByText("Delete cabins")).toBeVisible();
  await expect(
    page.getByText(
      "Are you sure you want to delete this cabins permanently? This action cannot be undone."
    )
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "cabin successfully deleted" })
  ).toBeVisible();
  await expect(cabinsList.getByText(cabinName)).not.toBeVisible();

  // logout button should be there on dashboard page, user should be able to logout.
  const logoutButton = page.getByLabel("logout");
  await expect(logoutButton).toBeVisible();
  await logoutButton.click();
  await page.waitForURL(LOGIN_URL);
  await expect(page.url()).toBe(LOGIN_URL);
=======
// 3. when logged in, user should be able to see the dashboard
// 4. user should be able to logout

const APP_URL = "http://localhost:5173";
const LOGIN_URL = `${APP_URL}/login`;
const DASHBOARD_URL = `${APP_URL}/dashboard`;

const LOGIN_EMAIL = "gowtham@gowthamreilly.com";
const LOGIN_PASSWORD = "Revolution@24";

test("login page should be displayed when not logged in", async ({ page }) => {
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

  const logoutButtonLocator = page.getByRole("button").filter({
    has: page.getByLabel("Log out"),
  });

  await expect(logoutButtonLocator).toBeVisible();

  await logoutButtonLocator.click();

  await page.waitForURL(LOGIN_URL);

  expect(page.url()).toBe(LOGIN_URL);

  await expect(loginPageTitle).toBeVisible();

  await emailAddressInputLocator.fill(LOGIN_EMAIL);

  await passwordInputLocator.fill("jhdkjjkhd");

  await loginButtonLocator.click();

  const errorMessageLocator = page.getByText(
    "Provided email or password are incorrect"
  );

  await expect(errorMessageLocator).toBeVisible();
});
