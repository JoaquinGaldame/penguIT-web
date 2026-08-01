import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ClientsState } from "../types/Customer.types";

const initialState: ClientsState = {
  selectedCustomerId: null,
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setSelectedCustomerId: (state, action: PayloadAction<string | null>) => {
      state.selectedCustomerId = action.payload;
    },

    resetClientsState: (state) => {
      state.selectedCustomerId = null;
    },
  },
});

export const { resetClientsState, setSelectedCustomerId } =
  clientsSlice.actions;

export const clientsReducer = clientsSlice.reducer;
