import { createRoot } from "react-dom/client";

import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";

const BASE_URL = "https://umxjivfxuijjbopalczq.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteGppdmZ4dWlqamJvcGFsY3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2MTkwNjcsImV4cCI6MjA0MzE5NTA2N30.xkSumSn6BrBn9yjN3Jj0a67eqlhM766fhCf56zdwrk4";

const URL = `${BASE_URL}/graphql/v1`;

const fetcher = createGraphiQLFetcher({
  url: URL,
  headers: {
    apiKey: API_KEY,
  },
});

const root = createRoot(document.getElementById("root")!);
root.render(<GraphiQL fetcher={fetcher} />);
