import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { ordersMock } from "../data/ordersMock";
import type { GetOrdersResponse } from "../types/Orders.types";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<GetOrdersResponse, void>({
      async queryFn() {
        await new Promise((resolve) => {
          window.setTimeout(resolve, 500);
        });

        return {
          data: {
            orders: ordersMock,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.orders.map((order) => ({
                type: "Order" as const,
                id: order.id,
              })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),
  }),
});

export const { useGetOrdersQuery } = ordersApi;
