import { test, expect } from "./config";
import { CabinPage } from "./pages/cabin.page";
import { generateUniqueCabinName } from "./utils";

const CUSTOMER_APP_URL = "http://localhost:3000/";
const CUSTOMER_CABINS_URL = `${CUSTOMER_APP_URL}cabins`;
const SAMPLE_IMAGE_LINK =
  "https://umxjivfxuijjbopalczq.supabase.co/storage/v1/object/public/cabin-images/0.8074113787073192-wallpaperflare.com_wallpaper.jpg";

let cabinId = undefined;

test.use({
  colorScheme: "light",
});

test.describe("CRUD Cabins", () => {
  test.beforeEach(async () => {
    cabinId = undefined;
  });

  test(
    "create a cabin",
    {
      tag: ["@cabin-feature", "@smoke", "@regression"],
    },
    async ({ page }) => {
      const cabinPage = new CabinPage(page);

      await page.goto("/");
      const cabinsNavMenuItemLink = page.getByRole("link", { name: "Cabins" });

      await test.step('Click on "Cabins" menu item', async () => {
        await expect(cabinsNavMenuItemLink).toBeVisible();
        await cabinsNavMenuItemLink.click();
      });

      const cabinsPageTitle = page.getByRole("heading", { name: "All cabins" });

      await test.step("Verify that the cabins page is displayed", async () => {
        await expect(cabinsPageTitle).toBeVisible();
      });

      const addNewCabinButtonLocator = page.getByRole("button", {
        name: "Add new cabin",
      });

      await expect(addNewCabinButtonLocator).toBeVisible();

      await addNewCabinButtonLocator.click();

      const addNewCabinFormLocator = page.locator("form");

      await expect(addNewCabinFormLocator).toBeVisible();

      await expect(cabinPage.cabinNameInputLocator).toBeVisible();
      await expect(cabinPage.cabinMaximumCapacityInputLocator).toBeVisible();
      await expect(cabinPage.cabinRegularPriceInputLocator).toBeVisible();
      await expect(cabinPage.cabinDiscountInputLocator).toBeVisible();
      await expect(cabinPage.cabinDescriptionInputLocator).toBeVisible();
      await expect(cabinPage.cabinImageInputLocator).toBeVisible();

      const cabinName = await cabinPage.fillCabinForm({
        name: "cabon name",
      });

      await expect(cabinPage.cabinNameInputLocator).toHaveValue(cabinName);
      await expect(cabinPage.cabinMaximumCapacityInputLocator).toHaveValue("4");
      await expect(cabinPage.cabinRegularPriceInputLocator).toHaveValue("200");
      await expect(cabinPage.cabinDiscountInputLocator).toHaveValue("20");
      await expect(cabinPage.cabinDescriptionInputLocator).toHaveValue(
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

      await page.reload();

      const customerCabinsPageTitle = page.getByRole("heading", {
        name: "Our Luxury Cabins",
      });

      await expect(customerCabinsPageTitle).toBeVisible();

      await page.reload();

      await expect(newlyCreatedCabinNameLocator).toBeVisible();
    }
  );

  test("delete a  @regression @cabin-feature", async ({
    page,
    graphqlApiClient,
  }) => {
    const cabinName = generateUniqueCabinName();

    const res = await graphqlApiClient.createCabin({
      name: cabinName,
      maxCapacity: 4,
      regularPrice: 200,
      discount: 20,
      description: "A cozy cabin in the woods",
      image: SAMPLE_IMAGE_LINK,
    });

    expect(res.status()).toBe(200);

    const data = await res.json();

    cabinId = data?.data?.insertIntocabinsCollection?.records?.[0]?.id;

    console.log("cabinId", cabinId);

    await page.goto("/");

    const cabinsNavMenuItemLink = page.getByRole("link", { name: "Cabins" });

    await expect(cabinsNavMenuItemLink).toBeVisible();

    await cabinsNavMenuItemLink.click();

    const cabinsPageTitle = page.getByRole("heading", { name: "All cabins" });

    await expect(cabinsPageTitle).toBeVisible();

    const cabinRowLocator = page.getByRole("row", { name: cabinName });

    await expect(cabinRowLocator).toBeVisible();

    const moreActionsButtonLocator = cabinRowLocator.locator("button");

    await expect(moreActionsButtonLocator).toBeVisible();

    await moreActionsButtonLocator.click();

    const deleteCabinButtonLocator = page.getByRole("button", {
      name: "Delete",
    });

    await expect(deleteCabinButtonLocator).toBeVisible();

    await deleteCabinButtonLocator.click({
      force: true,
    });

    const confirmationModalLocator = page.getByRole("dialog");

    await expect(confirmationModalLocator).toBeVisible();

    const confirmationModalTitleLocator = page.getByRole("heading", {
      name: "Delete cabin",
    });

    await expect(confirmationModalTitleLocator).toBeVisible();

    const confirmationModalMessageLocator = page.getByText(
      "Are you sure you want to delete this cabins permanently? This action cannot be undone."
    );

    await expect(confirmationModalMessageLocator).toBeVisible();

    const confirmDeleteCabinButtonLocator = page.getByRole("button", {
      name: "Delete",
    });

    await expect(confirmDeleteCabinButtonLocator).toBeVisible();

    await confirmDeleteCabinButtonLocator.click();

    const deleteCabinSuccessMessageLocator = page.getByText(
      "Cabin successfully deleted"
    );

    await expect(deleteCabinSuccessMessageLocator).toBeVisible({
      timeout: 30000,
    });

    await expect(cabinRowLocator).not.toBeVisible();

    cabinId = undefined;
  });

  test.afterEach(async ({ graphqlApiClient }) => {
    if (cabinId) {
      await graphqlApiClient.deleteCabinById(cabinId);
    }
  });
});
