import { test } from "@playwright/test";
import { writeFile } from "fs/promises";

const LOGIN_EMAIL = process.env.LOGIN_EMAIL;
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD;
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
});
