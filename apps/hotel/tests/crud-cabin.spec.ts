import { expect, test } from "@playwright/test";
import { CabinPage } from "./pages/crud-cabin.page";
import { FormComponent } from "./components/form.component";
import { ToastComponent } from "./components/toast.component";
import { CreateCabinPayload } from "./types";

let createCabinName: string;
let editCabinName: string;

function generateCreateCabinName() {
  createCabinName = `Created ${Date.now()}`;
  return createCabinName;
}

function generateEditCabinName() {
  editCabinName = `Edited ${Date.now()}`;
  return editCabinName;
}

const newCabinData: CreateCabinPayload = {
  name: generateCreateCabinName(),
  maxCapacity: 4,
  regularPrice: 200,
  discount: 20,
  description: "Cool",
  image: "tests/images/image-3.jpg",
};

test.describe("CRUD cabin", () => {
  test.only("add cabin", async ({ page }) => {
    const cabinPage = new CabinPage(page);
    const formComponent = new FormComponent(page);
    const toastComponent = new ToastComponent(page);

    await page.goto("/cabins");

    expect(page.url()).toBe(`${process.env.APP_URL}/cabins`);

    await expect(cabinPage.addNewCabinLocator).toBeVisible();

    await cabinPage.addNewCabinLocator.click();

    await expect(formComponent.cabinNameInputLocator).toBeVisible();
    await expect(formComponent.maxCapacityInputLocator).toBeVisible();
    await expect(formComponent.regularPriceInputLocator).toBeVisible();
    await expect(formComponent.discountInputLocator).toBeVisible();
    await expect(formComponent.descriptionForWebsiteInputLocator).toBeVisible();
    await expect(formComponent.cabinPhotoInputLocator).toBeVisible();
    await expect(formComponent.creatNewCabinBtn).toBeVisible();

    await formComponent.fillForm(newCabinData);

    await formComponent.creatNewCabinBtn.click();

    await expect(toastComponent.toastLocator).toHaveText(
      "New cabin successfully created"
    );
  });
  test.only("edit cabin", async ({ page }) => {
    const cabinPage = new CabinPage(page);
    const toastComponent = new ToastComponent(page);

    await page.goto("/cabins");

    expect(page.url()).toBe(`${process.env.APP_URL}/cabins`);

    // await expect(cabinPage.cabinRowLocator).toBeVisible();

    const cabinRow = cabinPage.cabinRowLocator.filter({
      has: page.getByText(createCabinName),
    });

    const meatBallMenuButton = cabinRow.getByRole("button");

    await expect(meatBallMenuButton).toBeVisible();

    await meatBallMenuButton.click();

    // await expect(cabinPage.meatBallMenu).toBeVisible();

    // await cabinPage.meatBallMenu.click();

    await expect(cabinPage.editBtn).toBeVisible();

    await cabinPage.editBtn.click();

    await expect(cabinPage.formLocator).toBeVisible();

    await expect(cabinPage.cabinNameInputLocator).toBeVisible();

    await expect(cabinPage.cabinNameInputLocator).toHaveValue(createCabinName);

    cabinPage.cabinNameInputLocator.fill(generateEditCabinName());

    await expect(cabinPage.cabinNameInputLocator).toHaveValue(editCabinName);

    await expect(cabinPage.editCabinBtn).toBeVisible();

    await cabinPage.editCabinBtn.click();

    await expect(toastComponent.toastLocator).toHaveText(
      "Cabin successfully edited"
    );

    await expect(page.getByText(editCabinName)).toBeVisible();
  });

  test.only("delete cabin", async ({ page }) => {
    const cabinPage = new CabinPage(page);
    const toastComponent = new ToastComponent(page);

    await page.goto("/cabins");

    expect(page.url()).toBe(`${process.env.APP_URL}/cabins`);

    const row = cabinPage.cabinRowLocator.filter({
      has: page.getByText(editCabinName),
    });

    const meatBallMenuButton = row.getByRole("button");

    await meatBallMenuButton.click();

    await expect(cabinPage.deleteBtn).toBeVisible();

    await cabinPage.deleteBtn.click();

    const deleteOption = page.getByRole("button", { name: "Delete" });

    await expect(deleteOption).toBeVisible();

    await deleteOption.click();

    await expect(toastComponent.toastLocator).toHaveText(
      "Cabin successfully deleted"
    );
  });
});
