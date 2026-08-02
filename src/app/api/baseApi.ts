import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ApiState {
  auth: {
    accessToken: string | null;
  };
}

export const apiTagTypes = [
  "Auth",
  "Customer",
  "Invoice",
  "Order",
  "Product",
  "Recipe",
  "SystemSettings",
  "User",
  "UserGroup",
] as const;

export type ApiTagType = (typeof apiTagTypes)[number];

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as ApiState).auth.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      headers.set("accept", "application/json");

      return headers;
    },
  }),
  tagTypes: apiTagTypes,
  endpoints: () => ({}),
});
