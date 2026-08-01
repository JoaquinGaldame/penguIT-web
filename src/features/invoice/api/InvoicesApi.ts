import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "../../../app/store/store";
import { invoicesMock } from "../data/InvoicesMock";
import type {
  GetInvoicesParams,
  GetInvoicesResponse,
  InvoiceStatusCounts,
  CreateInvoiceRequest,
  CreateInvoiceResponse
} from "../types/Invoice.types";

export const invoicesApi = createApi({
  reducerPath: "invoicesApi",

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

  tagTypes: ["Invoice"],

  endpoints: (builder) => ({
    getInvoices: builder.query<GetInvoicesResponse, GetInvoicesParams>({
      async queryFn({ limit, offset, search = "", status }) {
        await new Promise((resolve) => {
          window.setTimeout(resolve, 450);
        });

        const term = search.trim().toLocaleLowerCase("es");
        const searchedInvoices = invoicesMock.filter(
          (invoice) =>
            !term ||
            invoice.number.toLocaleLowerCase("es").includes(term) ||
            invoice.customer.name.toLocaleLowerCase("es").includes(term) ||
            invoice.customer.email.toLocaleLowerCase("es").includes(term),
        );
        const statusCounts: InvoiceStatusCounts = {
          all: searchedInvoices.length,
          paid: searchedInvoices.filter((invoice) => invoice.status === "paid")
            .length,
          late: searchedInvoices.filter((invoice) => invoice.status === "late")
            .length,
          sent: searchedInvoices.filter((invoice) => invoice.status === "sent")
            .length,
          draft: searchedInvoices.filter((invoice) => invoice.status === "draft")
            .length,
        };
        const filteredInvoices = status
          ? searchedInvoices.filter((invoice) => invoice.status === status)
          : searchedInvoices;

        return {
          data: {
            invoices: filteredInvoices.slice(offset, offset + limit),
            total: filteredInvoices.length,
            statusCounts,
          },
        };
      },

      providesTags: (result) =>
        result
          ? [
              ...result.invoices.map((invoice) => ({
                type: "Invoice" as const,
                id: invoice.id,
              })),
              { type: "Invoice", id: "LIST" },
            ]
          : [{ type: "Invoice", id: "LIST" }],
    }),
    createInvoice: builder.mutation<CreateInvoiceResponse, CreateInvoiceRequest>({
      query: (invoice) => ({
        url: "/invoices",
        method: "POST",
        body: invoice,
      }),

      invalidatesTags: [{ type: "Invoice", id: "LIST" }],
    }),
  }),
});

export const { 
  useGetInvoicesQuery, 
  useCreateInvoiceMutation } = invoicesApi;
