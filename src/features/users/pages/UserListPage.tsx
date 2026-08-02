import { useMemo } from "react";

import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { useGetUserGroupsQuery, useGetUsersQuery } from "../api/UsersApi";
import { UserGroupsTable } from "../components/UserGroupsTable";
import { UsersEmptyState } from "../components/UsersEmptyState";
import { UsersFiltersDrawer } from "../components/UsersFiltersDrawer";
import { UsersTable } from "../components/UsersTable";
import { UsersToolbar } from "../components/UsersToolbar";
import {
  resetUsersFilters,
  setUserGroupStatus,
  setUsersFiltersOpen,
  setUsersGroupId,
  setUsersRole,
  setUsersSearch,
  setUsersStatus,
  setUsersView,
} from "../store/UserSlice";
import { refreshUsers } from "../store/UserThunks";

export function UserListPage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.users);
  const usersQuery = useGetUsersQuery();
  const groupsQuery = useGetUserGroupsQuery();

  const users = useMemo(
    () => usersQuery.data?.users ?? [],
    [usersQuery.data?.users],
  );
  const groups = useMemo(
    () => groupsQuery.data?.groups ?? [],
    [groupsQuery.data?.groups],
  );

  const filteredUsers = useMemo(() => {
    const term = filters.search.trim().toLocaleLowerCase("es");

    return users.filter((user) => {
      if (filters.role !== "all" && user.role !== filters.role) return false;
      if (filters.status !== "all" && user.status !== filters.status)
        return false;
      if (filters.groupId !== "all" && !user.groupIds.includes(filters.groupId))
        return false;

      if (!term) return true;

      return (
        `${user.firstName} ${user.lastName}`
          .toLocaleLowerCase("es")
          .includes(term) || user.email.toLocaleLowerCase("es").includes(term)
      );
    });
  }, [filters.groupId, filters.role, filters.search, filters.status, users]);

  const filteredGroups = useMemo(() => {
    const term = filters.search.trim().toLocaleLowerCase("es");

    return groups.filter((group) => {
      if (filters.groupStatus !== "all" && group.status !== filters.groupStatus)
        return false;

      if (!term) return true;

      return (
        group.name.toLocaleLowerCase("es").includes(term) ||
        group.description.toLocaleLowerCase("es").includes(term)
      );
    });
  }, [filters.groupStatus, filters.search, groups]);

  const activeFiltersCount =
    filters.view === "users"
      ? Number(filters.role !== "all") +
        Number(filters.status !== "all") +
        Number(filters.groupId !== "all")
      : Number(filters.groupStatus !== "all");
  const isLoading = usersQuery.isLoading || groupsQuery.isLoading;
  const isFetching = usersQuery.isFetching || groupsQuery.isFetching;
  const isError = usersQuery.isError || groupsQuery.isError;
  const visibleItems =
    filters.view === "users" ? filteredUsers : filteredGroups;

  return (
    <Stack spacing={2.5}>
      <Box>
        <Typography component="h1" variant="h4" sx={{ mb: 0.75 }}>
          Usuarios
        </Typography>
        <Typography color="text.secondary">
          Consultá los usuarios del sistema y sus grupos de acceso.
        </Typography>
      </Box>

      {isFetching && !isLoading && <LinearProgress />}

      {isError ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" onClick={() => dispatch(refreshUsers())}>
              Reintentar
            </Button>
          }
        >
          No pudimos cargar la información de usuarios. Intentá nuevamente.
        </Alert>
      ) : isLoading ? (
        <Skeleton variant="rounded" height={520} animation="wave" />
      ) : (
        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <UsersToolbar
            search={filters.search}
            view={filters.view}
            activeFiltersCount={activeFiltersCount}
            onSearchChange={(value) => dispatch(setUsersSearch(value))}
            onFiltersOpen={() => dispatch(setUsersFiltersOpen(true))}
            onViewChange={(view) => dispatch(setUsersView(view))}
          />

          {visibleItems.length === 0 ? (
            <UsersEmptyState view={filters.view} />
          ) : filters.view === "users" ? (
            <UsersTable users={filteredUsers} groups={groups} />
          ) : (
            <UserGroupsTable groups={filteredGroups} />
          )}
        </Paper>
      )}

      <UsersFiltersDrawer
        open={filters.isFiltersOpen}
        view={filters.view}
        groups={groups}
        role={filters.role}
        status={filters.status}
        groupId={filters.groupId}
        groupStatus={filters.groupStatus}
        hasActiveFilters={activeFiltersCount > 0}
        onClose={() => dispatch(setUsersFiltersOpen(false))}
        onReset={() => dispatch(resetUsersFilters())}
        onRoleChange={(value) => dispatch(setUsersRole(value))}
        onStatusChange={(value) => dispatch(setUsersStatus(value))}
        onGroupIdChange={(value) => dispatch(setUsersGroupId(value))}
        onGroupStatusChange={(value) => dispatch(setUserGroupStatus(value))}
      />
    </Stack>
  );
}
