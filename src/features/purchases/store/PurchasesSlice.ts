import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  PurchaseOverdueFilter,
  PurchasePaymentStatus,
  PurchasesState,
  PurchaseStatus,
  PurchaseTab,
} from "../types/Purchase.types";

const initialState: PurchasesState = {
  search: "",
  selectedTab: "all",
  isFiltersOpen: false,
  supplierId: "all",
  status: "all",
  paymentStatus: "all",
  dateFrom: "",
  dateTo: "",
  overdue: "all",
  minAmount: "",
  maxAmount: "",
};

const purchasesSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {
    setPurchasesSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPurchasesTab: (state, action: PayloadAction<PurchaseTab>) => {
      state.selectedTab = action.payload;
    },
    setPurchasesFiltersOpen: (state, action: PayloadAction<boolean>) => {
      state.isFiltersOpen = action.payload;
    },
    setPurchasesSupplier: (state, action: PayloadAction<string | "all">) => {
      state.supplierId = action.payload;
    },
    setPurchasesStatus: (
      state,
      action: PayloadAction<PurchaseStatus | "all">,
    ) => {
      state.status = action.payload;
    },
    setPurchasesPaymentStatus: (
      state,
      action: PayloadAction<PurchasePaymentStatus | "all">,
    ) => {
      state.paymentStatus = action.payload;
    },
    setPurchasesDateFrom: (state, action: PayloadAction<string>) => {
      state.dateFrom = action.payload;
    },
    setPurchasesDateTo: (state, action: PayloadAction<string>) => {
      state.dateTo = action.payload;
    },
    setPurchasesOverdue: (
      state,
      action: PayloadAction<PurchaseOverdueFilter>,
    ) => {
      state.overdue = action.payload;
    },
    setPurchasesMinAmount: (state, action: PayloadAction<string>) => {
      state.minAmount = action.payload;
    },
    setPurchasesMaxAmount: (state, action: PayloadAction<string>) => {
      state.maxAmount = action.payload;
    },
    resetPurchasesFilters: (state) => {
      state.search = "";
      state.supplierId = "all";
      state.status = "all";
      state.paymentStatus = "all";
      state.dateFrom = "";
      state.dateTo = "";
      state.overdue = "all";
      state.minAmount = "";
      state.maxAmount = "";
    },
  },
});

export const {
  resetPurchasesFilters,
  setPurchasesDateFrom,
  setPurchasesDateTo,
  setPurchasesFiltersOpen,
  setPurchasesMaxAmount,
  setPurchasesMinAmount,
  setPurchasesOverdue,
  setPurchasesPaymentStatus,
  setPurchasesSearch,
  setPurchasesStatus,
  setPurchasesSupplier,
  setPurchasesTab,
} = purchasesSlice.actions;

export const purchasesReducer = purchasesSlice.reducer;
