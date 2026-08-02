import {
  Avatar,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  USER_ROLE_LABELS,
  type User,
  type UserGroup,
} from "../types/User.types";
import { formatUserLastActive, formatUserName } from "../utils/userFormatters";
import { UserStatusChip } from "./UserStatusChip";

interface UsersTableProps {
  users: User[];
  groups: UserGroup[];
}

export function UsersTable({ users, groups }: UsersTableProps) {
  const groupsById = new Map(groups.map((group) => [group.id, group.name]));

  return (
    <TableContainer>
      <Table sx={{ minWidth: 960 }}>
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Grupo</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Última actividad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              hover
              sx={{ "&:last-child td": { borderBottom: 0 } }}
            >
              <TableCell>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "center" }}
                >
                  <Avatar
                    src={user.avatarUrl}
                    alt={formatUserName(user.firstName, user.lastName)}
                    sx={{
                      bgcolor: "rgba(20, 103, 193, 0.12)",
                      color: "secondary.main",
                      fontSize: 13,
                      fontWeight: 800,
                      height: 40,
                      width: 40,
                    }}
                  >
                    {user.initials}
                  </Avatar>
                  <Stack spacing={0.1}>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      {formatUserName(user.firstName, user.lastName)}
                    </Typography>
                    <Typography color="text.secondary" variant="caption">
                      {user.email}
                    </Typography>
                  </Stack>
                </Stack>
              </TableCell>

              <TableCell>{USER_ROLE_LABELS[user.role]}</TableCell>

              <TableCell>
                <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap" }}>
                  {user.groupIds.length === 0 ? (
                    <Typography color="text.secondary" variant="body2">
                      Sin grupo
                    </Typography>
                  ) : (
                    user.groupIds.map((groupId) => (
                      <Chip
                        key={groupId}
                        label={groupsById.get(groupId) ?? "Grupo"}
                        size="small"
                        variant="outlined"
                      />
                    ))
                  )}
                </Stack>
              </TableCell>

              <TableCell>
                <UserStatusChip status={user.status} />
              </TableCell>

              <TableCell sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>
                {user.phone ?? "—"}
              </TableCell>

              <TableCell sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>
                {formatUserLastActive(user.lastActiveAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}