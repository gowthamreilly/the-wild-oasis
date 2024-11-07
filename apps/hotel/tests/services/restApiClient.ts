import { CreateCabinPayload } from "../types";
import { APIRequestContext, APIResponse } from "@playwright/test";

const deleteCabinById = async (request: APIRequestContext, cabinId: string) => {
  await request.delete(`/rest/v1/cabins?id=eq.${cabinId}`);
};

const createCabin = async (
  request: APIRequestContext,
  cabin: CreateCabinPayload
) => {
  return request.post(`/rest/v1/cabins`, {
    data: cabin,
    headers: {
      Prefer: "return=representation",
    },
  });
};

export type RestApiClient = {
  deleteCabinById: (cabinId: string) => Promise<void>;
  createCabin: (cabin: CreateCabinPayload) => Promise<APIResponse>;
};

export const createRestApiClient = (
  request: APIRequestContext
): RestApiClient => {
  return {
    deleteCabinById: deleteCabinById.bind(null, request),
    createCabin: createCabin.bind(null, request),
  };
};
