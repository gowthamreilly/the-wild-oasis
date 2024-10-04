import { expect, test } from "@playwright/test";
import path from "path";
import { apiClient } from "./services/api";
import { CabinEntity, CreateCabinPayload } from "./types/types";
import { NavBarComponent } from "./components/navbar.component";
import { CabinPage } from "./pages/cabin.page";
import { ModalFormComponent } from "./components/modal.component";
import { ToastComponent } from "./components/toast.component";

// let newlyCreatedCabin: CabinEntity;
let newlyCreatedCabin: CabinEntity = {} as CabinEntity;

const newCabinData: CreateCabinPayload = {
  name: "Cabin" + Date.now(),
  image: path.resolve("tests/images/image-1.jpg"),
  maxCapacity: 4,
  regularPrice: 200,
  discount: 20,
  description: "Must Visit cabin",
};

const ROOT_URL = process.env.APP_URL;
const DASHBOARD_URL = `${ROOT_URL}/dashboard`;

// test.beforeEach("Create cabin", async ({ page }) => {
//   if (!newlyCreatedCabin.id) {
//     const resStatus = await apiClient.createCabin(newCabinData);
//     expect(resStatus.status()).toBe(201);
//     newlyCreatedCabin = await resStatus.json();
//   }
// });

test("create new cabin test", async ({ page }) => {
  const navBarComponent = new NavBarComponent(page);
  const cabinPage = new CabinPage(page);
  const modalFormComponent = new ModalFormComponent(page);
  const toastComponent = new ToastComponent(page);

  page.goto(DASHBOARD_URL);
  // check if 5 different options are available in nav section of dashboard
  await expect(navBarComponent.navBarSection).toBeVisible();
  await expect(navBarComponent.navBaroptions).toHaveCount(5);

  // click on cabins option and check for list of cabins.
  await navBarComponent.cabinOptionLocator.click();
  await expect(cabinPage.cabinTitleLocator).toHaveText("All cabins");
  await expect(cabinPage.cabinsListTableLocator).toBeVisible();

  // check for the filter options to show the list, default all should be selected.
  await expect(cabinPage.allcabinsFilterButton).toBeVisible();
  await expect(cabinPage.allcabinsFilterButton).toBeDisabled();

  await expect(cabinPage.cabinswithoutDiscountFilterButton).toBeVisible();
  await expect(cabinPage.cabinswithoutDiscountFilterButton).not.toBeDisabled();
  // try to select without discount cabins from filter.
  await cabinPage.cabinswithoutDiscountFilterButton.click();
  await expect(cabinPage.cabinswithoutDiscountFilterButton).toBeDisabled();
  await expect(cabinPage.allcabinsFilterButton).not.toBeDisabled();

  await expect(cabinPage.cabinswithDiscountFilterButton).toBeVisible();
  await expect(cabinPage.cabinswithDiscountFilterButton).not.toBeDisabled();
  // try to select with discount cabins from filter.
  await cabinPage.cabinswithDiscountFilterButton.click();
  await expect(cabinPage.cabinswithDiscountFilterButton).toBeDisabled();
  await expect(cabinPage.cabinswithoutDiscountFilterButton).not.toBeDisabled();

  // check for the filter to sort list by price
  await expect(cabinPage.sortByPriceSelector).toBeVisible();

  // 'add new cabin' option.
  await expect(cabinPage.addNewCabinButton).toBeVisible();
  await expect(modalFormComponent.newCabinForm).not.toBeVisible();

  // form to add a new cabin should open by clicking on button.
  await cabinPage.addNewCabinButton.click();
  await expect(modalFormComponent.newCabinForm).toBeVisible();

  // check for all fields to add new cabin.
  await expect(modalFormComponent.newCabinName).toBeVisible();
  await expect(modalFormComponent.newCabinMaximumCapacity).toBeVisible();
  await expect(modalFormComponent.newCabinRegularPrice).toBeVisible();
  await expect(modalFormComponent.newCabinDiscount).toBeVisible();
  await expect(modalFormComponent.newCabinDescription).toBeVisible();
  await expect(modalFormComponent.newCabinPhoto).toBeVisible();
  await expect(modalFormComponent.submitNewCabinButton).toBeVisible();

  // try to add data in all input fields and create new cabin, check for newly created cabin and popup message.

  await modalFormComponent.fillFormDetails(newCabinData);
  //  await expect(modalFormComponent.closeFormButton).toBeVisible();
  //  await modalFormComponent.closeFormButton.click();
  await modalFormComponent.submitFormButton.click();

  const res = await page.waitForResponse(async (something) => {
    const url = something.url().includes("/cabins");
    if (!url) return false;
    return something.status() === 201;
  });

  newlyCreatedCabin = await res.json();

  await expect(modalFormComponent.newCabinForm).not.toBeVisible();
  await expect(toastComponent.toastMessageLocator).toHaveText(
    "New cabin successfully created"
  );
  await expect(
    cabinPage.cabinsListTableLocator.getByText(newCabinData.name)
  ).toBeVisible();
});

test("delete new cabin test", async ({ page }) => {
  const cabinPage = new CabinPage(page);
  const navBarComponent = new NavBarComponent(page);
  const toastComponent = new ToastComponent(page);

  await page.goto(DASHBOARD_URL);
  await navBarComponent.cabinOptionLocator.click();
  await expect(cabinPage.cabinTitleLocator).toHaveText("All cabins");

  // try to delete newly created cabin through api.
  // await expect(cabinPage.cabinRowLocator).toHaveCount(4);
  const newCabinRow = cabinPage.cabinRowLocator.filter({
    has: page.getByText(newlyCreatedCabin[0].name),
  });
  await expect(newCabinRow).toBeVisible();
  const meatballmenuForNewCabin = newCabinRow.getByRole("button");
  await expect(meatballmenuForNewCabin).toBeVisible();
  // const meatballmenuDeleteOption = page.getByLabel("Delete");
  // await expect(meatballmenuDeleteOption).not.toBeVisible();
  await expect(cabinPage.meatBallMenuDeleteOption).not.toBeVisible();
  await meatballmenuForNewCabin.click();
  await expect(cabinPage.meatBallMenuDeleteOption).toBeVisible();
  await cabinPage.meatBallMenuDeleteOption.click();
  await expect(page.locator("h3").getByText("Delete cabins")).toBeVisible();
  await expect(
    page.getByText(
      "Are you sure you want to delete this cabins permanently? This action cannot be undone."
    )
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(toastComponent.toastMessageLocator).toHaveText(
    "Cabin successfully deleted"
  );
  await expect(
    cabinPage.cabinsListTableLocator.getByText(newlyCreatedCabin[0].name)
  ).not.toBeVisible();
});

test("Edit cabin", async ({ page }) => {
  // create a cabin using api before editing it
  // try to edit cabin.
  //delete cabin after editing it using api
});

test.afterEach("Delete cabin", async ({ page }) => {
  if (newlyCreatedCabin.id) {
    await apiClient.deleteCabin(newlyCreatedCabin[0].id);
  }
  newlyCreatedCabin.id = 0;
});
