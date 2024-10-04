import { CreateBookingPayload, CreateCabinPayload } from "../types";
import { graphqlRequest } from "./request";
import graphqlDefinition from "./graphql-definitions";

const deleteCabinById = async (cabinId: string) => {
  return graphqlRequest(
    graphqlDefinition.deleteFromcabinsCollectionMutationDefinition,
    {
      variables: {
        filter: {
          id: {
            eq: cabinId,
          },
        },
      },
    }
  );
};

const createCabin = async (cabin: CreateCabinPayload) => {
  return graphqlRequest(
    graphqlDefinition.insertIntocabinsCollectionMutationDefinition,
    {
      variables: {
        cabins: [cabin],
      },
    }
  );
};

const createBooking = async (booking: CreateBookingPayload) => {
  console.log("booking details", { booking });
  return graphqlRequest(
    graphqlDefinition.insertIntoBookingsCollectionMutationDefinition,
    {
      variables: {
        bookings: [{ ...booking }],
      },
    }
  );
};

export const graphqlApiClient = {
  deleteCabinById,
  createCabin,
  createBooking,
};
