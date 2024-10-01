import { expect, request, test } from "@playwright/test";
import { headers } from "next/headers";
import path from "path";

test.beforeEach(async({page, request})=> {
    const storageState = await page.context().storageState();
    const localStorage = await storageState.origins[0].localStorage;
    
 const data = {
    "name": "can",
    "maxCapacity": 5,
    "regularPrice": 3000,
    "discount": 2,
    "description": "desc",
    "image": ""
}
    // const localStorage =  []
	// const SuperBaseItem = []
	// const SuperBaseValue = []
    const accessToken = "a",
    const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteGppdmZ4dWlqamJvcGFsY3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2MTkwNjcsImV4cCI6MjA0MzE5NTA2N30.xkSumSn6BrBn9yjN3Jj0a67eqlhM766fhCf56zdwrk4";
    const createUrl = "/rest/v1/cabins"
    
    await request.post( createUrl, { headers: {apikey: API_KEY, Authorization: `Bearer ${accessToken}`} })

    await page.waitForResponse(async ()=> {
        const includesCabins = Response.url().includes(“/cabins”)
        if(includesCabins) return false;
        console.log(res.data);
        return includesCabins === 201    
    })
})


test("delete new cabin", async ({ page }) => {
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
