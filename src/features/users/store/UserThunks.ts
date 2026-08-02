import type { AppThunk } from "../../../app/store/store";
import { usersApi } from "../api/UsersApi";
import type { CreateUserRequest } from "../types/User.types";
import { resetUserCreation, resetUsersFilters } from "./UserSlice";

const usersTags = [
  { type: "User" as const, id: "LIST" },
  { type: "UserGroup" as const, id: "LIST" },
];

type CreateUserResult = ReturnType<
  ReturnType<typeof usersApi.endpoints.createUser.initiate>
>;

export const createUser =
  (request: CreateUserRequest): AppThunk<CreateUserResult> =>
  (dispatch) =>
    dispatch(usersApi.endpoints.createUser.initiate(request));

export const refreshUsers = (): AppThunk => (dispatch) => {
  dispatch(usersApi.util.invalidateTags(usersTags));
};

export const resetUsersWorkspace = (): AppThunk => (dispatch) => {
  dispatch(resetUsersFilters());
  dispatch(resetUserCreation());
  dispatch(usersApi.util.invalidateTags(usersTags));
};
