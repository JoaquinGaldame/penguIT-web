import { Chip } from "@mui/material";

import { USER_STATUS_LABELS, type UserStatus } from "../types/User.types";

interface UserStatusChipProps {
  status: UserStatus;
}

const statusColors = {
  active: "success",
  invited: "info",
  suspended: "error",
} as const;

export function UserStatusChip({ status }: UserStatusChipProps) {
  return (
    <Chip
      color={statusColors[status]}
      label={USER_STATUS_LABELS[status]}
      size="small"
      variant={status === "invited" ? "outlined" : "filled"}
      sx={{ fontWeight: 700, minWidth: 82 }}
    />
  );
}