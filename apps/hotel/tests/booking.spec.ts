import { test } from "@playwright/test";
import { graphqlApiClient } from "./services/graphqlApiClient";

const inputBookingPayload = {
  startDate: "2024-01-05T14:00:00Z",
  endDate: "2024-01-10T14:00:00Z",
  cabinId: 812,
  guestId: 2,
  numNights: 5,
  numGuests: 2,
  cabinPrice: 500.0,
  extrasPrice: 50.0,
  totalPrice: 550.0,
  status: "confirmed",
  hasBreakfast: true,
  isPaid: false,
  observations: "Prefers a late check-in",
};
test("Creating a booking from GraphQL API", async ({ page }) => {
  const res = await graphqlApiClient.createBooking(inputBookingPayload);
  const data = await res.json();
  console.log("Create booking ", data);
});

test("Getting all bookings from GraphQL API", async ({ page }) => {
  const res = await graphqlApiClient.getAllBookings();
  const data = await res.json();
  console.log("Getting all Bookings", data.data.bookingsCollection.edges);
});
