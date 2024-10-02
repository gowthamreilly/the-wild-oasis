import { createRoot } from "react-dom/client";

import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";

const BASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const URL = `${BASE_URL}/graphql/v1`;

const fetcher = createGraphiQLFetcher({
  url: URL,
  headers: {
    apiKey: API_KEY,
  },
});

const root = createRoot(document.getElementById("root")!);
root.render(<GraphiQL fetcher={fetcher} />);
