import { test as setup } from "@playwright/test";
import { writeFile } from "fs/promises";
import {
  APP_URL,
  SUPABASE_PROJECT_ID,
  VITE_SUPABASE_ANON_KEY,
  VITE_SUPABASE_URL,
} from "./constants";

const LOGIN_EMAIL = "gowtham@gowthamreilly.com";
const LOGIN_PASSWORD = "Revolution@24";

const API_URL = VITE_SUPABASE_URL;

const authFilePath = "auth.json";

setup("login", async ({ request }) => {
  const res = await request.post(
    `${API_URL}/auth/v1/token?grant_type=password`,
    {
      data: {
        email: LOGIN_EMAIL,
        password: LOGIN_PASSWORD,
      },
      headers: {
        apikey: VITE_SUPABASE_ANON_KEY,
      },
    }
  );

  const data = await res.json();

  const storageState = {
    cookies: [],
    origins: [
      {
        origin: APP_URL,
        localStorage: [
          {
            name: `sb-${SUPABASE_PROJECT_ID}-auth-token`,
            value: JSON.stringify(data),
          },
        ],
      },
    ],
  };

  process.env["ACCESS_TOKEN"] = data.access_token;

  await writeFile(authFilePath, JSON.stringify(storageState));
});
