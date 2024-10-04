export type CreateCabinPayload = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export type CreateBookingPayload = {
  startDate?: string;
  endDate?: string;
  numNights?: number;
  numGuests?: number;
  cabinPrice?: number;
  extrasPrice?: number;
  totalPrice?: number;
  status?: String;
  hasBreakfast?: Boolean;
  isPaid?: Boolean;
  observations?: String;
  cabinId?: number;
  guestId?: number;
};
