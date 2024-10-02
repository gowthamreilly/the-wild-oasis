import { request as base } from "@playwright/test";

const API_KEY = process.env.VITE_SUPABASE_ANON_KEY!;
const API_URL = process.env.VITE_SUPABASE_URL!;
const accessToken = process.env.ACCESS_TOKEN!;

const request = await base.newContext({
  baseURL: API_URL,
  extraHTTPHeaders: {
    apikey: API_KEY,
    Authorization: `Bearer ${accessToken}`,
  },
});

export default request;
