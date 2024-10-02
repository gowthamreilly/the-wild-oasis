import { expect, test } from "@playwright/test";
import path from "path";
import { apiClient } from "./services/api";

test("create and delete new cabin", async ({ page }) => {
  const DASHBOARD_URL = `/dashboard`;

  page.goto(DASHBOARD_URL);
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
  const cabinPhotoPath = path.resolve("tests/images/image-1.jpg");
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
  // const meatballmenuDeleteOption = page.getByLabel("Delete");
  // await expect(meatballmenuDeleteOption).not.toBeVisible();
  const meatballmenuDeleteOption = page.getByRole("button", {
    name: " Delete",
  });
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
});

test("Edit cabin", async ({ page }) => {
  // create a cabin using api before editing it
  const resStatus = await apiClient.createCabin({
    name: "Cabin" + Date.now(),
    maxCapacity: 5,
    regularPrice: 1000,
    discount: 2,
    description: "desc",
    image:
      "https://umxjivfxuijjbopalczq.supabase.co/storage/v1/object/public/cabin-images/0.20838883813617337-indian-harry.jpg",
  });
  expect(resStatus.status()).toBe(201);

  const newlyCreatedCabin = await resStatus.json();

  // try to edit cabin.

  //delete cabin after editing it using api
  if (newlyCreatedCabin[0].id) {
    await apiClient.deleteCabin(newlyCreatedCabin[0].id);
  }
});
