import { expect, test } from "@playwright/test";
import path from "path";
import { apiClient } from "./services/api";

const CUSTOMER_APP_URL = "http://localhost:3000/";
const CUSTOMER_CABINS_URL = `${CUSTOMER_APP_URL}cabins`;

const generateUniqueCabinName = () => {
  return `Self Destruct ${Date.now()}`;
};

let cabinId = undefined;

test.beforeEach(async () => {
  cabinId = undefined;
});

test("create a cabin", async ({ page }) => {
  await page.goto("/");
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

  const res = await page.waitForResponse(async (response) => {
    const includesCabin = response.url().includes("/cabins");

    if (!includesCabin) return false;

    return response.status() === 201;
  });

  const data = await res.json();

  cabinId = data.id;

  const addNewCabinCreationSuccessMessageLocator = page.getByText(
    "New cabin successfully created"
  );

  await expect(addNewCabinCreationSuccessMessageLocator).toBeVisible({
    timeout: 30000,
  });

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

test("delete a cabin", async ({ page }) => {
  const cabinName = generateUniqueCabinName();

  const res = await apiClient.createCabin({
    name: cabinName,
    maxCapacity: 4,
    regularPrice: 200,
    discount: 20,
    description: "A cozy cabin in the woods",
    image: "https://example.com/image.jpg",
  });

  const data = await res.json();

  console.log("DATA", data);

  await page.goto("/");
});

test.afterEach(async () => {
  if (cabinId) {
    await apiClient.deleteCabinById(cabinId);
  }
});
