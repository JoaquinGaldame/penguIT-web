import { Chip } from "@mui/material";

import { ORDER_STATUS_LABELS, type OrderStatus } from "../types/Orders.types";

interface OrderStatusChipProps {
  status: OrderStatus;
  size?: "small" | "medium";
}

const statusColors = {
  pending: "warning",
  preparing: "info",
  ready: "success",
  delivered: "default",
} as const;

export function OrderStatusChip({
  status,
  size = "small",
}: OrderStatusChipProps) {
  return (
    <Chip
      label={ORDER_STATUS_LABELS[status]}
      color={statusColors[status]}
      size={size}
      variant={status === "delivered" ? "outlined" : "filled"}
      sx={{ fontWeight: 700 }}
    />
  );
}
