export type CreateCabinPayload = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export type CabinEntity = CreateCabinPayload & {
  id: number;
};
