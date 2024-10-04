import { CreateCabinPayload } from "../types";
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

const updateCabinById = async (cabinId: string, updateData: any) => {
  return graphqlRequest(
    graphqlDefinition.editIntocabinsCollectionMutationDefination,
    {
      variables: {
        input: {
          updateData,
        },
        id: {
          id: {
            eq: cabinId,
          },
        },
        num: 1,
      },
    }
  );
};

export const graphqlApiClient = {
  deleteCabinById,
  createCabin,
  updateCabinById,
};
