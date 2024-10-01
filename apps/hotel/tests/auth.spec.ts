import { expect, test } from "@playwright/test";
import path from "path";

// 1. Test plan
// 1. login page should be displayed when not logged in
// 2. user should be able to login
// 3. user should be able to logout -----add aria-label in the logout button
// 4. when logged in, user should be able to see the dashboard

test("logging in with the wrong credentials", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByLabel("Email address").fill("akjnvr@kevrab.cer");

  await page.getByLabel("Password").fill("kejrvnek");

  await page.getByRole("button", { name: "Log in" }).click();

  //   const errorToast = page.getByText("Provided email or password are incorrect");

  const errorToast = page.locator("div").filter({
    has: page
      .getByRole("status")
      .getByText("Provided email or password are incorrect"),
  });

  await errorToast.isVisible();

  // <div class="go2072408551" style="font-size: 16px; max-width: 500px; padding: 16px 24px; background-color: var(--color-grey-0); color: var(--color-grey-700); animation: 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) 0s 1 normal forwards running go3223188581;">
  // <div class="go685806154">
  // <div class="go1858758034"></div>
  // <div class="go1579819456">
  // <div class="go2534082608"></div></div></div>
  // <div role="status" aria-live="polite" class="go3958317564">Provided email or password are incorrect</div></div>
});

test.beforeEach("logging in with the right credentials", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByLabel("Email address").fill("gowtham@gowthamreilly.com");

  await expect(page.getByLabel("Email address")).toHaveValue(
    "gowtham@gowthamreilly.com"
  );

  await page.getByLabel("Password").fill("Revolution@24");

  await expect(page.getByLabel("Password")).toHaveValue("Revolution@24");

  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page).toHaveURL("http://localhost:5173/dashboard");
});

test("checking side nav bar", async ({ page }) => {
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page).toHaveURL("http://localhost:5173/dashboard");

  const navContainer = page.locator("nav");

  await expect(navContainer).toBeVisible();

  const dashboardlink = navContainer.getByRole("listitem").filter({
    hasText: "Home",
  });
  await dashboardlink.click();

  await expect(page).toHaveURL("http://localhost:5173/dashboard");

  const bookingslink = navContainer.getByRole("listitem").filter({
    hasText: "Bookings",
  });
  await bookingslink.click();

  await expect(page).toHaveURL("http://localhost:5173/bookings");

  const cabinlink = navContainer.getByRole("listitem").filter({
    hasText: "Cabins",
  });
  await cabinlink.click();

  await expect(page).toHaveURL("http://localhost:5173/cabins");

  //page.getByRole("link" , {name: Cabin}) -- alternative

  const userlink = navContainer.getByRole("listitem").filter({
    hasText: "Users",
  });
  await userlink.click();

  await expect(page).toHaveURL("http://localhost:5173/users");

  const settingslink = navContainer.getByRole("listitem").filter({
    hasText: "Settings",
  });
  await settingslink.click();

  await expect(page).toHaveURL("http://localhost:5173/settings");
});

test("Log Out", async ({ page }) => {
  const logOutBtn = page.getByLabel("Log_out").getByRole("button");

  await expect(logOutBtn).toBeVisible();

  await logOutBtn.click();

  await expect(page).toHaveURL("http://localhost:5173/login");
});

test("Update user Account", async ({ page }) => {
  const userBtn = page.getByRole("button").getByLabel("user");

  await expect(userBtn).toBeVisible();

  await userBtn.click();

  await expect(page).toHaveURL("http://localhost:5173/account");
});

test("Create Cabin", async ({ page }) => {
  const navContainer = page.locator("nav");

  const cabinlink = navContainer.getByRole("listitem").filter({
    hasText: "Cabins",
  });
  await cabinlink.click();

  const createCabinBtn = page.getByRole("button", { name: "Add new cabin" });

  await createCabinBtn.click();

  const cabinNameCont = page.locator("div").filter({
    hasText: "Cabin name",
  });

  await cabinNameCont.getByLabel("Cabin name").fill("Cabin" + Date());

  await page.getByLabel("Maximum capacity").fill("8");

  await page.getByLabel("Regular price").fill("3500");

  await page.getByLabel("Discount").fill("23");

  await page.getByLabel("Description for website").fill("Flying as in heaven");

  const photoPath = path.resolve("apps/hotel/tests/images/image-3.jpg");

  await page.getByLabel("Cabin photo").setInputFiles(photoPath);

  await page.getByRole("button", { name: "Create new cabin" }).click();
});

test("Cancel creating Cabin", async ({ page }) => {
  const navContainer = page.locator("nav");

  const cabinlink = navContainer.getByRole("listitem").filter({
    hasText: "Cabins",
  });
  await cabinlink.click();

  const createCabinBtn = page.getByRole("button", { name: "Add new cabin" });

  await createCabinBtn.click();

  await page.getByRole("button", { name: "Cancel" }).click();

  const addCabin = page.getByRole("button", { name: "Add new cabin" });

  await expect(addCabin).toBeEnabled();
});

test("Check sorting and filtering", async ({ page }) => {
  const navContainer = page.locator("nav");

  const cabinlink = navContainer.getByRole("listitem").filter({
    hasText: "Cabins",
  });
  await cabinlink.click();

  const filterCont = page
    .locator("div")
    .getByText("AllNo DiscountWith Discount");

  await expect(filterCont).toBeVisible();

  const noDiscountFilter = filterCont
    .getByRole("button")
    .getByText("No Discount");

  await noDiscountFilter.click();
});
