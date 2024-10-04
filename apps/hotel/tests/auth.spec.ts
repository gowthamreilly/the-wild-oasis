import { expect, test } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { ToastComponent } from "./components/toast.component";
import { DashboardPage } from "./pages/dashboard.page";
import { NavBarComponent } from "./components/navbar.component";
import { HeaderComponent } from "./components/header.component";

// 1. login page should be displayed when not logged in
// 2. user should be able to login
// 3. when logged in, user should be able to see the dashboard
// 4. user should be able to logout

// don't need to setup before testing login functionality.
test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

const ROOT_URL = process.env.APP_URL;
const LOGIN_URL = `${ROOT_URL}/login`;
const DASHBOARD_URL = `${ROOT_URL}/dashboard`;

test("Login functionality", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const toastComponent = new ToastComponent(page);
  const dashboardPage = new DashboardPage(page);
  const navBarComponent = new NavBarComponent(page);
  const headerComponent = new HeaderComponent(page);

  // bydefault login page should be rendered.
  await page.goto("/login");
  await page.waitForURL(LOGIN_URL);
  await expect(page.url()).toBe(LOGIN_URL);

  // it should have password, email input field, toast error message and login button.
  await expect(loginPage.emailInputField).toBeVisible();
  await expect(loginPage.passwordInputField).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
  await expect(toastComponent.toastMessageLocator).not.toBeVisible();

  // when trying to login with invalid credentails toast message should be visible.
  await loginPage.fillLoginCredentials("abc@gmail.com", "123");
  await loginPage.loginButton.click();
  await expect(toastComponent.toastMessageLocator).toBeVisible();

  // with valid credentials user should be redirected to dashboard page.
  await loginPage.fillLoginCredentials(
    "gowtham@gowthamreilly.com",
    "Revolution@24"
  );
  await loginPage.loginButton.click();
  await page.waitForURL(DASHBOARD_URL);
  await expect(page.url()).toBe(DASHBOARD_URL);
  await expect(dashboardPage.dashboardTitleLocator).toHaveText("Dashboard");

  // check if 5 different options are available in nav section of dashboard
  await expect(navBarComponent.navBarSection).toBeVisible();
  await expect(navBarComponent.navBaroptions).toHaveCount(5);

  // logout button should be there on dashboard page, user should be able to logout.
  await expect(headerComponent.logoutLocator).toBeVisible();
  await headerComponent.logoutLocator.click();
  await page.waitForURL(LOGIN_URL);
  await expect(page.url()).toBe(LOGIN_URL);
});
