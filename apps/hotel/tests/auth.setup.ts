import { test } from "@playwright/test";
import { writeFile } from "fs/promises";

// const LOGIN_URL = `${process.env.APP_URL}/login`;
// const DASHBOARD_URL = `${process.env.APP_URL}/dashboard`;
const LOGIN_EMAIL = "gowtham@gowthamreilly.com";
const LOGIN_PASSWORD = "Revolution@24";
const API_URL = process.env.VITE_SUPABASE_URL;
const API_KEY = process.env.VITE_SUPABASE_ANON_KEY!;

test("Login with valid credentials", async ({ request }) => {
  // make api call and pass the credentials to login.
  const response = await request.post(
    `${API_URL}/auth/v1/token?grant_type=password`,
    {
      data: { email: LOGIN_EMAIL, password: LOGIN_PASSWORD },
      headers: { apikey: API_KEY },
    }
  );

  const res = await response.json();

  // extract token from api response and store in auth.json
  const storageState = {
    cookies: [],
    origins: [
      {
        origin: process.env.APP_URL,
        localStorage: [
          {
            name: "sb-umxjivfxuijjbopalczq-auth-token",
            value: JSON.stringify(res),
          },
        ],
      },
    ],
  };

  process.env["ACCESS_TOKEN"] = res.access_token;
  await writeFile("auth.json", JSON.stringify(storageState));

  // // bydefault login page should be rendered.
  // await page.goto(`${process.env.APP_URL}`);
  // await page.waitForURL(LOGIN_URL);
  // expect(page.url()).toBe(LOGIN_URL);

  // // it should have password, email input field, toast error message and login button.
  // const emailInputField = page.getByLabel("Email address");
  // await expect(emailInputField).toBeVisible();
  // const passwordInputField = page.getByLabel("Password");
  // await expect(passwordInputField).toBeVisible();
  // const loginButton = page.getByRole("button", { name: "Log in" });
  // await expect(loginButton).toBeVisible();

  // // with valid credentials user should be redirected to dashboard page.
  // await emailInputField.fill("gowtham@gowthamreilly.com");
  // await passwordInputField.fill("Revolution@24");
  // await loginButton.click();

  // // store the token in local storage
  // await page.waitForURL(DASHBOARD_URL);
  // expect(page.url()).toBe(DASHBOARD_URL);
  // await expect(page.locator("h1")).toHaveText("Dashboard");
  // await page.context().storageState({ path: "auth.json" });
});
