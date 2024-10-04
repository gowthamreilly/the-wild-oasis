import request from "./request";
import { CreateCabinPayload } from "../types";

const deleteCabinById = async (cabinId: string) => {
  await request.delete(`/rest/v1/cabins?id=eq.${cabinId}`);
};

const createCabin = async (cabin: CreateCabinPayload) => {
  return request.post(`/rest/v1/cabins`, {
    data: cabin,
    headers: {
      Prefer: "return=representation",
    },
  });
};

export const restApiClient = {
  deleteCabinById,
  createCabin,
};
