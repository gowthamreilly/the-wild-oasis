import { request as base } from "@playwright/test";

const accessToken = process.env.ACCESS_TOKEN!;

const API_KEY = process.env.VITE_SUPABASE_ANON_KEY!;

const API_URL = process.env.VITE_SUPABASE_URL!;

const request = await base.newContext({
  baseURL: API_URL,
  extraHTTPHeaders: {
    apikey: API_KEY,
    Authorization: `Bearer ${accessToken}`,
  },
});

export default request;

type Options = {
  variables?: Record<string, any>;
  headers?: Record<string, string>;
};

export const graphqlRequest = async (definition: string, options?: Options) => {
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
