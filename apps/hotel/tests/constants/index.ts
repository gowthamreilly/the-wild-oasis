export const VITE_SUPABASE_URL = "https://umxjivfxuijjbopalczq.supabase.co";
export const VITE_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteGppdmZ4dWlqamJvcGFsY3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2MTkwNjcsImV4cCI6MjA0MzE5NTA2N30.xkSumSn6BrBn9yjN3Jj0a67eqlhM766fhCf56zdwrk4";
export const SUPABASE_PROJECT_ID = "umxjivfxuijjbopalczq";

export const PLAYWRIGHT_ENV = process.env.PLAYWRIGHT_ENV;

export const APP_URL = (() => {
  switch (PLAYWRIGHT_ENV) {
    case "development":
      return "http://localhost:5173";
    case "production":
      return "https://the-wild-oasis-hotel-two.vercel.app";
    case "staging":
      return "https://the-wild-oasis-hotel-two.vercel.app";
    case "moon":
      return "https://the-wild-oasis-hotel-two.vercel.app";
    case "qa":
      return "https://the-wild-oasis-hotel-two.vercel.app";
    default:
      return "http://localhost:5173";
  }
})();
