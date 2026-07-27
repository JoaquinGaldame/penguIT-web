import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  OrderChannel,
  OrdersState,
  OrdersView,
  OrderStatus,
} from "../types/Orders.types";

const initialState: OrdersState = {
  search: "",
  channel: "all",
  status: "all",
  view: "kanban",
  filtersOpen: true,
  selectedOrderId: null,
  detailsOpen: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setOrdersChannel: (state, action: PayloadAction<OrderChannel | "all">) => {
      state.channel = action.payload;
    },
    setOrdersStatus: (state, action: PayloadAction<OrderStatus | "all">) => {
      state.status = action.payload;
    },
    setOrdersView: (state, action: PayloadAction<OrdersView>) => {
      state.view = action.payload;
    },
    toggleOrdersFilters: (state) => {
      state.filtersOpen = !state.filtersOpen;
    },
    resetOrdersFilters: (state) => {
      state.search = "";
      state.channel = "all";
      state.status = "all";
    },
    showOrderDetails: (state, action: PayloadAction<string>) => {
      state.selectedOrderId = action.payload;
      state.detailsOpen = true;
    },
    hideOrderDetails: (state) => {
      state.detailsOpen = false;
    },
  },
});

export const {
  hideOrderDetails,
  resetOrdersFilters,
  setOrdersChannel,
  setOrdersSearch,
  setOrdersStatus,
  setOrdersView,
  showOrderDetails,
  toggleOrdersFilters,
} = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
