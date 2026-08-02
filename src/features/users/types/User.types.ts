export type UserRole =
  "administrator" | "manager" | "cashier" | "kitchen" | "waiter";

export type UserStatus = "active" | "invited" | "suspended";

export type UserGroupStatus = "active" | "archived";

export type UsersView = "users" | "groups";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  initials: string;
  avatarUrl?: string;
  role: UserRole;
  status: UserStatus;
  groupIds: string[];
  lastActiveAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserGroup {
  id: string;
  name: string;
  description: string;
  status: UserGroupStatus;
  memberIds: string[];
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersResponse {
  users: User[];
}

export interface GetUserGroupsResponse {
  groups: UserGroup[];
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  groupIds: string[];
  status: UserStatus;
  sendInvitation: boolean;
}

export interface CreateUserResponse {
  user: User;
}

export type UserCreationStatus = "idle" | "pending" | "succeeded" | "failed";

export interface UsersState {
  search: string;
  view: UsersView;
  isFiltersOpen: boolean;
  role: UserRole | "all";
  status: UserStatus | "all";
  groupId: string | "all";
  groupStatus: UserGroupStatus | "all";
  createStatus: UserCreationStatus;
  createError: string | null;
  createdUserId: string | null;
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  administrator: "Administrador",
  manager: "Encargado",
  cashier: "Cajero",
  kitchen: "Cocina",
  waiter: "Mozo",
};

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  active: "Activo",
  invited: "Invitado",
  suspended: "Suspendido",
};

export const USER_GROUP_STATUS_LABELS: Record<UserGroupStatus, string> = {
  active: "Activo",
  archived: "Archivado",
};
