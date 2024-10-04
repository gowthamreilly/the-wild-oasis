import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://umxjivfxuijjbopalczq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteGppdmZ4dWlqamJvcGFsY3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2MTkwNjcsImV4cCI6MjA0MzE5NTA2N30.xkSumSn6BrBn9yjN3Jj0a67eqlhM766fhCf56zdwrk4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
