import { CreateCabinPayload } from "../types";
import graphqlDefinition from "./graphql-definitions";
import { APIRequestContext, APIResponse } from "@playwright/test";

type Options = {
  variables?: Record<string, any>;
  headers?: Record<string, string>;
};

export const graphqlRequest = async (
  request: APIRequestContext,
  definition: string,
  options?: Options
) => {
  const { variables = {}, headers = {} } = options || {};

  const requiredHeaders = {
    "Content-Type": "application/json",
  };

  const requestHeaders = {
    ...requiredHeaders,
    ...headers,
  };

  return request.post(`/graphql/v1`, {
    data: JSON.stringify({
      query: definition,
      variables,
    }),
    headers: requestHeaders,
  });
};

const deleteCabinById = async (request: APIRequestContext, cabinId: string) => {
  return graphqlRequest(
    request,
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

const createCabin = async (
  request: APIRequestContext,
  cabin: CreateCabinPayload
) => {
  return graphqlRequest(
    request,
    graphqlDefinition.insertIntocabinsCollectionMutationDefinition,
    {
      variables: {
        cabins: [cabin],
      },
    }
  );
};

export type GraphQLApiClient = {
  deleteCabinById: (cabinId: string) => Promise<void>;
  createCabin: (cabin: CreateCabinPayload) => Promise<APIResponse>;
};

export const createGraphQLApiClient = (
  request: APIRequestContext
): GraphQLApiClient => {
  return {
    deleteCabinById: deleteCabinById.bind(null, request),
    createCabin: createCabin.bind(null, request),
  };
};
