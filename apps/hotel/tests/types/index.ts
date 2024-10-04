import { expect } from "@playwright/test";

export type CreateCabinPayload = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export type UpdateCabinPayload = {
  created_at: Date,
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export type filter ={
  id: BigInt,
}
