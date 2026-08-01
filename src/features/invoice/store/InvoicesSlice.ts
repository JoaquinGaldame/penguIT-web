import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  InvoicesState,
  InvoiceStatusFilter,
} from "../types/Invoice.types";

const initialState: InvoicesState = {
  search: "",
  status: "all",
  limit: 10,
  offset: 0,
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
  },
});

export const {
  resetInvoicesFilters,
  setInvoicesLimit,
  setInvoicesOffset,
  setInvoicesSearch,
  setInvoicesStatus,
} = invoicesSlice.actions;

export const invoicesReducer = invoicesSlice.reducer;
