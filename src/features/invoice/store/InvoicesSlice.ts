import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { invoicesApi } from "../api/InvoicesApi";
import type {
  InvoicesState,
  InvoiceStatusFilter,
} from "../types/Invoice.types";

const initialState: InvoicesState = {
  search: "",
  status: "all",
  limit: 10,
  offset: 0,
  createStatus: "idle",
  createError: null,
  createdInvoiceId: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setInvoicesSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.offset = 0;
    },

    setInvoicesStatus: (state, action: PayloadAction<InvoiceStatusFilter>) => {
      state.status = action.payload;
      state.offset = 0;
    },

    setInvoicesLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.offset = 0;
    },

    setInvoicesOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },

    resetInvoicesFilters: (state) => {
      state.search = "";
      state.status = "all";
      state.offset = 0;
    },

    resetInvoiceCreation: (state) => {
      state.createStatus = "idle";
      state.createError = null;
      state.createdInvoiceId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(invoicesApi.endpoints.createInvoice.matchPending, (state) => {
        state.createStatus = "pending";
        state.createError = null;
        state.createdInvoiceId = null;
      })
      .addMatcher(
        invoicesApi.endpoints.createInvoice.matchFulfilled,
        (state, action) => {
          state.createStatus = "succeeded";
          state.createdInvoiceId = action.payload.invoice.id;
        },
      )
      .addMatcher(
        invoicesApi.endpoints.createInvoice.matchRejected,
        (state, action) => {
          state.createStatus = "failed";
          state.createError = action.error.message ?? "No se pudo crear la factura";
        },
      );
  },
});

export const {
  resetInvoiceCreation,
  resetInvoicesFilters,
  setInvoicesLimit,
  setInvoicesOffset,
  setInvoicesSearch,
  setInvoicesStatus,
} = invoicesSlice.actions;

export const invoicesReducer = invoicesSlice.reducer;
