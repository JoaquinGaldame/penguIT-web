import { baseApi } from "../../../app/api/baseApi";
import { ordersMock } from "../data/ordersMock";
import type { GetOrdersResponse } from "../types/Orders.types";

export const ordersApi = baseApi.injectEndpoints({
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
  overrideExisting: false,
});

export const { useGetOrdersQuery } = ordersApi;
