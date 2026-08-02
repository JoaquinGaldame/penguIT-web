import { baseApi } from "../../../app/api/baseApi";
import { userGroupsMock, usersMock } from "../data/userMock";
import type {
  CreateUserRequest,
  CreateUserResponse,
  GetUserGroupsResponse,
  GetUsersResponse,
} from "../types/User.types";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, void>({
      async queryFn() {
        await new Promise((resolve) => window.setTimeout(resolve, 400));
        return { data: { users: usersMock } };
      },

      providesTags: (result) =>
        result
          ? [
              ...result.users.map((user) => ({
                type: "User" as const,
                id: user.id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    getUserGroups: builder.query<GetUserGroupsResponse, void>({
      async queryFn() {
        await new Promise((resolve) => window.setTimeout(resolve, 350));
        return { data: { groups: userGroupsMock } };
      },

      providesTags: (result) =>
        result
          ? [
              ...result.groups.map((group) => ({
                type: "UserGroup" as const,
                id: group.id,
              })),
              { type: "UserGroup", id: "LIST" },
            ]
          : [{ type: "UserGroup", id: "LIST" }],
    }),

    createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),

      invalidatesTags: [
        { type: "User", id: "LIST" },
        { type: "UserGroup", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateUserMutation,
  useGetUserGroupsQuery,
  useGetUsersQuery,
} = usersApi;
