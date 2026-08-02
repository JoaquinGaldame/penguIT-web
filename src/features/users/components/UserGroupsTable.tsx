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

import { USER_GROUP_STATUS_LABELS, type UserGroup } from "../types/User.types";

interface UserGroupsTableProps {
  groups: UserGroup[];
}

export function UserGroupsTable({ groups }: UserGroupsTableProps) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 820 }}>
        <TableHead>
          <TableRow>
            <TableCell>Grupo</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Miembros</TableCell>
            <TableCell align="right">Permisos</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map((group) => (
            <TableRow
              key={group.id}
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
                    sx={{
                      bgcolor: "rgba(74, 144, 226, 0.14)",
                      color: "secondary.dark",
                      fontSize: 14,
                      fontWeight: 800,
                      height: 40,
                      width: 40,
                    }}
                  >
                    {group.name.slice(0, 2).toLocaleUpperCase("es")}
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    {group.name}
                  </Typography>
                </Stack>
              </TableCell>

              <TableCell sx={{ color: "text.secondary", maxWidth: 360 }}>
                {group.description}
              </TableCell>

              <TableCell align="right" sx={{ fontWeight: 800 }}>
                {group.memberIds.length}
              </TableCell>

              <TableCell align="right" sx={{ fontWeight: 800 }}>
                {group.permissions.length}
              </TableCell>

              <TableCell>
                <Chip
                  color={group.status === "active" ? "success" : "default"}
                  label={USER_GROUP_STATUS_LABELS[group.status]}
                  size="small"
                  variant={group.status === "archived" ? "outlined" : "filled"}
                  sx={{ fontWeight: 700, minWidth: 82 }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}