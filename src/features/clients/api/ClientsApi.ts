import { baseApi } from "../../../app/api/baseApi";
import { customersMock } from "../data/CustomersMock";
import type { GetCustomersResponse } from "../types/Customer.types";

export const clientsApi = baseApi.injectEndpoints({
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
  overrideExisting: false,
});

export const { useGetCustomersQuery } = clientsApi;
