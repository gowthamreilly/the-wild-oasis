import { test as base } from "@playwright/test";
import { graphqlApiClient } from "../services/graphqlApiClient";
import { restApiClient } from "../services/restApiClient";

export * from "@playwright/test";

type Options = {
  graphqlApiClient: typeof graphqlApiClient;
  restApiClient: typeof restApiClient;
};

export const test = base.extend<Options>({
  graphqlApiClient: ({}, use) => {
    console.log("brefore each");

    use(graphqlApiClient); // test

    console.log("after each");
  },
  restApiClient: ({}, use) => {
    console.log("brefore each");

    use(restApiClient); // test

    console.log("after each");
  },
});
