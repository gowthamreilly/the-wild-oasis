import {
  APIRequestContext,
  test as base,
  request as baseRequest,
} from "@playwright/test";
import {
  GraphQLApiClient,
  createGraphQLApiClient,
} from "../services/graphqlApiClient";
import { RestApiClient, createRestApiClient } from "../services/restApiClient";
import {
  VITE_SUPABASE_ANON_KEY,
  VITE_SUPABASE_URL,
  APP_URL,
  SUPABASE_PROJECT_ID,
} from "../constants";
import { StorageState } from "../types";

export * from "@playwright/test";

type Options = {
  graphqlApiClient: GraphQLApiClient;
  restApiClient: RestApiClient;
  attachment: void;
  logger: void;
  apiRequestContext: APIRequestContext;
  autoAuth: {
    storageState: StorageState;
  };
  accessToken: string | undefined;
};

export const test = base.extend<Options>({
  autoAuth: [
    async ({ request }, use) => {
      const LOGIN_EMAIL = "gowtham@gowthamreilly.com";
      const LOGIN_PASSWORD = "Revolution@24";

      const res = await request.post(
        `${VITE_SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
          data: {
            email: LOGIN_EMAIL,
            password: LOGIN_PASSWORD,
          },
          headers: {
            apikey: VITE_SUPABASE_ANON_KEY,
          },
        }
      );

      const data = await res.json();

      const storageState: StorageState = {
        cookies: [],
        origins: [
          {
            origin: APP_URL,
            localStorage: [
              {
                name: `sb-${SUPABASE_PROJECT_ID}-auth-token`,
                value: JSON.stringify(data),
              },
            ],
          },
        ],
      };

      use({
        storageState,
      });
    },
    { auto: true, scope: "test" },
  ],
  storageState: async ({ autoAuth }, use) => {
    if (autoAuth) {
      use(autoAuth.storageState);
    } else {
      use(undefined);
    }
  },
  accessToken: async ({ context }, use) => {
    const storageState = await context.storageState();

    const token: string | undefined = JSON.parse(
      storageState?.origins?.[0]?.localStorage?.[0]?.value || "{}"
    )?.access_token;

    use(token);
  },
  apiRequestContext: [
    async ({ accessToken, context }, use) => {
      const storageState = await context.storageState();

      const requestContext = await baseRequest.newContext({
        baseURL: VITE_SUPABASE_URL,
        extraHTTPHeaders: {
          apikey: VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
        storageState,
      });

      use(requestContext);
    },
    {
      scope: "test",
    },
  ],
  graphqlApiClient: ({ apiRequestContext }, use) => {
    const client = createGraphQLApiClient(apiRequestContext);

    use(client);
  },
  restApiClient: async ({ apiRequestContext }, use) => {
    const client = createRestApiClient(apiRequestContext);

    use(client);
  },
  attachment: [
    async ({}, use, testInfo) => {
      await use();

      if (testInfo.status !== testInfo.expectedStatus) {
        console.log("OUTPUT PATH", testInfo.outputDir);

        const tracePath = testInfo.outputDir + "/trace.zip";

        testInfo.annotations.push({
          type: "testrail_attachment",
          description: tracePath,
        });
      }
    },
    {
      auto: true,
    },
  ],
  logger: [
    async ({}, use, testInfo) => {
      console.log(`Test: ${testInfo.title} is going to start`);

      await use();

      console.log(`Test: ${testInfo.title} is going to end`);
    },
    {
      auto: true,
    },
  ],
});
