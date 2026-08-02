import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  SystemSettingsState,
  SystemSettingsTab,
} from "../types/SystemSettings.types";

const initialState: SystemSettingsState = {
  activeTab: "general",
  dirtyTabs: [],
};

const systemSettingsSlice = createSlice({
  name: "systemSettings",
  initialState,
  reducers: {
    setSystemSettingsTab: (state, action: PayloadAction<SystemSettingsTab>) => {
      state.activeTab = action.payload;
    },
    markSystemSettingsTabDirty: (
      state,
      action: PayloadAction<SystemSettingsTab>,
    ) => {
      if (!state.dirtyTabs.includes(action.payload)) {
        state.dirtyTabs.push(action.payload);
      }
    },
    markSystemSettingsTabClean: (
      state,
      action: PayloadAction<SystemSettingsTab>,
    ) => {
      state.dirtyTabs = state.dirtyTabs.filter((tab) => tab !== action.payload);
    },
    resetSystemSettingsState: () => initialState,
  },
});

export const {
  markSystemSettingsTabClean,
  markSystemSettingsTabDirty,
  resetSystemSettingsState,
  setSystemSettingsTab,
} = systemSettingsSlice.actions;

export const systemSettingsReducer = systemSettingsSlice.reducer;
