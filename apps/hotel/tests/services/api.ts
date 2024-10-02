import request from "./request";
import { CreateCabinPayload } from "../types";

const createCabin = async (cabin: CreateCabinPayload) => {
  return request.post(`/rest/v1/cabins`, {
    data: cabin,
    headers: {
      Prefer: "return=representation",
    },
  });
};

const deleteCabinById = async (id: string) => {
  return request.delete(`/rest/v1/cabins?id=eq.${id}`);
};

export const restApiClient = { createCabin, deleteCabinById };
