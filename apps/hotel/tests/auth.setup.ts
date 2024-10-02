import { test as setup } from "@playwright/test";
import { writeFile } from "fs/promises";

const API_URL = process.env.VITE_SUPABASE_URL!;
const authFilePath = "auth.json";
const LOGIN_EMAIL = "gowtham@gowthamreilly.com";
const LOGIN_PASSWORD = "Revolution@24";

setup("login", async ({ request }) => {
  const res = await request.post(
    `${API_URL}/auth/v1/token?grant_type=password`,
    {
      data: {
        email: LOGIN_EMAIL,
        password: LOGIN_PASSWORD,
      },
      headers: {
        apikey: process.env.VITE_SUPABASE_ANON_KEY!,
      },
    }
  );
  console.log(res);

  const data = await res.json();
  console.log(data);

  const storageState = {
    cookies: [],
    origin: [
      {
        origin: process.env.APP_URL,
        localStorage: [
          {
            name: `sb-${process.env.SUPABASE_PROJECT_ID}-auth-token`,
            value: JSON.stringify(data),
          },
        ],
      },
    ],
  };

  process.env["ACCESS_TOKEN"] = data.access_token;

  await writeFile(authFilePath, JSON.stringify(storageState));
});
