import { test } from "@playwright/test";
import { restApiClient } from "./services/api";
import request from "./services/request";

/*
const cabin = {
  name: "Harry's cabin",
  maxCapacity: "12",
  regularPrice: "4000",
  discount: "10",
  description: "Good!",
  image:
    "https://umxjivfxuijjbopalczq.supabase.co/storage/v1/object/public/cabin-images/0.20838883813617337-indian-harry.jpg",
};
*/
// const API_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteGppdmZ4dWlqamJvcGFsY3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2MTkwNjcsImV4cCI6MjA0MzE5NTA2N30.xkSumSn6BrBn9yjN3Jj0a67eqlhM766fhCf56zdwrk4";

// const API_KEY = process.env.VITE_SUPABASE_ANON_KEY!;

test("create cabin api", async () => {
  /* create cabin */
  const res = await restApiClient.createCabin({
    name: "Harry's cabin",
    maxCapacity: 12,
    regularPrice: 4000,
    discount: 10,
    description: "good",
    image:
      "https://umxjivfxuijjbopalczq.supabase.co/storage/v1/object/public/cabin-images/0.20838883813617337-indian-harry.jpg",
  });
  const data = await res.json();
  const cabinId = data[0].id;
  console.log("Cabin ID: ", cabinId);

  if (cabinId) {
    const deleteRes = await restApiClient.deleteCabinById(cabinId);
    console.log(deleteRes);
    // console.log(await deleteRes.json());
  }

  /*
  const storageState = await page.context().storageState();
  console.log(storageState);
  const localStorage = storageState.origins[0].localStorage;
  console.log(localStorage);
  const SUPERBASE_KEY = "sb-umxjivfxuijjbopalczq-auth-token";
  const SUPERBASE_VALUE = localStorage.find((item) => {
    return item.name === SUPERBASE_KEY;
  });
  //   console.log(SUPERBASE_VALUE);
  const SUPERBASE_ITEM = SUPERBASE_VALUE?.value;
  //   console.log(SUPERBASE_ITEM);
  const parsedData = SUPERBASE_ITEM ? JSON.parse(SUPERBASE_ITEM) : undefined;
  const access_token = parsedData["access_token"]
    ? parsedData["access_token"]
    : undefined;
  //   console.log(access_token);
  if (access_token) {
    const res = await request.post(
      "https://umxjivfxuijjbopalczq.supabase.co/rest/v1/cabins",
      {
        data: createCabinData,
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${access_token}`,
          Prefer: "return=representation",
        },
      }
    );
    const data = await res.json();
    console.log(data);
  }
    */
});
