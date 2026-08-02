import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  USER_GROUP_STATUS_LABELS,
  USER_ROLE_LABELS,
  USER_STATUS_LABELS,
  type UserGroup,
  type UserGroupStatus,
  type UserRole,
  type UserStatus,
  type UsersView,
} from "../types/User.types";

interface UsersFiltersDrawerProps {
  open: boolean;
  view: UsersView;
  groups: UserGroup[];
  role: UserRole | "all";
  status: UserStatus | "all";
  groupId: string | "all";
  groupStatus: UserGroupStatus | "all";
  hasActiveFilters: boolean;
  onClose: () => void;
  onReset: () => void;
  onRoleChange: (value: UserRole | "all") => void;
  onStatusChange: (value: UserStatus | "all") => void;
  onGroupIdChange: (value: string | "all") => void;
  onGroupStatusChange: (value: UserGroupStatus | "all") => void;
}

export function UsersFiltersDrawer({
  open,
  view,
  groups,
  role,
  status,
  groupId,
  groupStatus,
  hasActiveFilters,
  onClose,
  onReset,
  onRoleChange,
  onStatusChange,
  onGroupIdChange,
  onGroupStatusChange,
}: UsersFiltersDrawerProps) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { width: { xs: "min(88vw, 360px)", sm: 360 } },
        },
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "space-between", p: 2.5 }}
        >
          <Box>
            <Typography variant="h6">Filters</Typography>
            <Typography color="text.secondary" variant="body2">
              {view === "users" ? "Filtrá los usuarios" : "Filtrá los grupos"}
            </Typography>
          </Box>
          <IconButton aria-label="Cerrar filtros" onClick={onClose}>
            <Icon icon="solar:close-circle-linear" width={22} />
          </IconButton>
        </Stack>

        <Divider />

        <Stack spacing={2} sx={{ flex: 1, p: 2.5 }}>
          {view === "users" ? (
            <>
              <TextField
                select
                label="Rol"
                value={role}
                onChange={(event) =>
                  onRoleChange(event.target.value as UserRole | "all")
                }
              >
                <MenuItem value="all">Todos los roles</MenuItem>
                {(Object.keys(USER_ROLE_LABELS) as UserRole[]).map(
                  (userRole) => (
                    <MenuItem key={userRole} value={userRole}>
                      {USER_ROLE_LABELS[userRole]}
                    </MenuItem>
                  ),
                )}
              </TextField>

              <TextField
                select
                label="Estado"
                value={status}
                onChange={(event) =>
                  onStatusChange(event.target.value as UserStatus | "all")
                }
              >
                <MenuItem value="all">Todos los estados</MenuItem>
                {(Object.keys(USER_STATUS_LABELS) as UserStatus[]).map(
                  (userStatus) => (
                    <MenuItem key={userStatus} value={userStatus}>
                      {USER_STATUS_LABELS[userStatus]}
                    </MenuItem>
                  ),
                )}
              </TextField>

              <TextField
                select
                label="Grupo"
                value={groupId}
                onChange={(event) => onGroupIdChange(event.target.value)}
              >
                <MenuItem value="all">Todos los grupos</MenuItem>
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </TextField>
            </>
          ) : (
            <TextField
              select
              label="Estado"
              value={groupStatus}
              onChange={(event) =>
                onGroupStatusChange(
                  event.target.value as UserGroupStatus | "all",
                )
              }
            >
              <MenuItem value="all">Todos los estados</MenuItem>
              {(Object.keys(USER_GROUP_STATUS_LABELS) as UserGroupStatus[]).map(
                (itemStatus) => (
                  <MenuItem key={itemStatus} value={itemStatus}>
                    {USER_GROUP_STATUS_LABELS[itemStatus]}
                  </MenuItem>
                ),
              )}
            </TextField>
          )}
        </Stack>

        <Divider />
        <Stack direction="row" spacing={1.5} sx={{ p: 2.5 }}>
          <Button
            fullWidth
            color="inherit"
            disabled={!hasActiveFilters}
            onClick={onReset}
          >
            Limpiar
          </Button>
          <Button fullWidth variant="contained" onClick={onClose}>
            Aplicar
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}