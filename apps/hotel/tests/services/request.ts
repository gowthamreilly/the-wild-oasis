import { request } from "@playwright/test";

const API_URL = process.env.VITE_SUPABASE_URL!;
const API_KEY = process.env.VITE_SUPABASE_ANON_KEY!;
const accesstoken = process.env.ACCESS_TOKEN!;

const context = await request.newContext({
  baseURL: API_URL,
  extraHTTPHeaders: {
    apikey: API_KEY,
    Authorization: `Bearer ${accesstoken}`,
  },
});

export default context;
