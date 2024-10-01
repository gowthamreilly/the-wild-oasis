import { request } from "@playwright/test";
import { CreateCabinPayload } from "../types";

const accessToken = process.env.ACCESS_TOKEN!;

const API_KEY = process.env.VITE_SUPABASE_ANON_KEY!;

const API_URL = process.env.VITE_SUPABASE_URL!;

const context = await request.newContext({
  baseURL: API_URL,
  extraHTTPHeaders: {
    apikey: API_KEY,
    Authorization: `Bearer ${accessToken}`,
  },
});

const deleteCabinById = async (cabinId: string) => {
  await context.delete(`/rest/v1/cabins?id=eq.${cabinId}`);
};

const createCabin = async (cabin: CreateCabinPayload) => {
  return context.post(`/rest/v1/cabins`, {
    data: cabin,
    headers: {
      Prefer: "return=representation",
    },
  });
};

export const apiClient = {
  deleteCabinById,
  createCabin,
};
