import { CreateCabinPayload, filter, UpdateCabinPayload } from "../types";
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

const updateCabin = async(cabins: UpdateCabinPayload , filter: filter )=>{
  return graphqlRequest(
    graphqlDefinition.updateIntocabinsCollectionMutationDefinition,{
      variables: {
        cabins: [cabins],
        booking: filter,
        atmost: 1
      }
    }
  )
}

export const graphqlApiClient = {
  updateCabin,
  deleteCabinById,
  createCabin,
};
