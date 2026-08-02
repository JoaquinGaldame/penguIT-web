import type { AppThunk } from "../../../app/store/store";
import { usersApi } from "../api/UsersApi";
import { resetUsersFilters } from "./UserSlice";

const usersTags = [
  { type: "User" as const, id: "LIST" },
  { type: "UserGroup" as const, id: "LIST" },
];

export const refreshUsers = (): AppThunk => (dispatch) => {
  dispatch(usersApi.util.invalidateTags(usersTags));
};

export const resetUsersWorkspace = (): AppThunk => (dispatch) => {
  dispatch(resetUsersFilters());
  dispatch(usersApi.util.invalidateTags(usersTags));
};
