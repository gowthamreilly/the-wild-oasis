import { CreateCabinPayload } from "../types/types";
import context from "./request";

const createCabin = async (cabin: CreateCabinPayload) => {
  return context.post(`/rest/v1/cabins`, {
    data: cabin,
    headers: {
      Prefer: "return=representation",
    },
  });
};

const deleteCabin = async (cabinId) => {
  return context.delete(`rest/v1/cabins?id=eq.${cabinId}`);
};

export const apiClient = {
  createCabin,
  deleteCabin,
};
