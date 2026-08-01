import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "../../../app/store/store";
import { customersMock } from "../data/CustomersMock";
import type { GetCustomersResponse } from "../types/Customer.types";

export const clientsApi = createApi({
  reducerPath: "clientsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      headers.set("accept", "application/json");

      return headers;
    },
  }),

  tagTypes: ["Customer"],

  endpoints: (builder) => ({
    getCustomers: builder.query<GetCustomersResponse, void>({
      async queryFn() {
        await new Promise((resolve) => {
          window.setTimeout(resolve, 300);
        });

        return {
          data: {
            customers: customersMock,
          },
        };
      },

      providesTags: (result) =>
        result
          ? [
              ...result.customers.map((customer) => ({
                type: "Customer" as const,
                id: customer.id,
              })),
              { type: "Customer", id: "LIST" },
            ]
          : [{ type: "Customer", id: "LIST" }],
    }),
  }),
});

export const { useGetCustomersQuery } = clientsApi;
