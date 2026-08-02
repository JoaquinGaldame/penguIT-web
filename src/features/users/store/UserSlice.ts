import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  UserGroupStatus,
  UserRole,
  UsersState,
  UserStatus,
  UsersView,
} from "../types/User.types";

const initialState: UsersState = {
  search: "",
  view: "users",
  isFiltersOpen: false,
  role: "all",
  status: "all",
  groupId: "all",
  groupStatus: "all",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setUsersView: (state, action: PayloadAction<UsersView>) => {
      state.view = action.payload;
      state.search = "";
      state.role = "all";
      state.status = "all";
      state.groupId = "all";
      state.groupStatus = "all";
    },
    setUsersFiltersOpen: (state, action: PayloadAction<boolean>) => {
      state.isFiltersOpen = action.payload;
    },
    setUsersRole: (state, action: PayloadAction<UserRole | "all">) => {
      state.role = action.payload;
    },
    setUsersStatus: (state, action: PayloadAction<UserStatus | "all">) => {
      state.status = action.payload;
    },
    setUsersGroupId: (state, action: PayloadAction<string | "all">) => {
      state.groupId = action.payload;
    },
    setUserGroupStatus: (
      state,
      action: PayloadAction<UserGroupStatus | "all">,
    ) => {
      state.groupStatus = action.payload;
    },
    resetUsersFilters: (state) => {
      state.search = "";
      state.role = "all";
      state.status = "all";
      state.groupId = "all";
      state.groupStatus = "all";
    },
  },
});

export const {
  resetUsersFilters,
  setUserGroupStatus,
  setUsersFiltersOpen,
  setUsersGroupId,
  setUsersRole,
  setUsersSearch,
  setUsersStatus,
  setUsersView,
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
