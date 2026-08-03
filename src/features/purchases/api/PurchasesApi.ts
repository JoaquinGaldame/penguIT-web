import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "../../../app/store/store";
import { purchasesMock } from "../data/purchasesMock";
import type { GetPurchasesResponse } from "../types/Purchase.types";

export const purchasesApi = createApi({
  reducerPath: "purchasesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      headers.set("accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Purchase"],
  endpoints: (builder) => ({
    getPurchases: builder.query<GetPurchasesResponse, void>({
      async queryFn() {
        await new Promise((resolve) => {
          window.setTimeout(resolve, 450);
        });

        return { data: { purchases: purchasesMock } };
      },

      // Al conectar el backend, reemplazar queryFn por:
      // query: () => "/purchases",

      providesTags: (result) =>
        result
          ? [
              ...result.purchases.map((purchase) => ({
                type: "Purchase" as const,
                id: purchase.id,
              })),
              { type: "Purchase", id: "LIST" },
            ]
          : [{ type: "Purchase", id: "LIST" }],
    }),
  }),
});

export const { useGetPurchasesQuery } = purchasesApi;
