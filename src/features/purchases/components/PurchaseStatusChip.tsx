import { Chip } from "@mui/material";

import {
  PURCHASE_STATUS_LABELS,
  type PurchaseStatus,
} from "../types/Purchase.types";
import { getPurchaseStatusColor } from "../utils/purchaseFormatters";

interface PurchaseStatusChipProps {
  status: PurchaseStatus;
}

export function PurchaseStatusChip({ status }: PurchaseStatusChipProps) {
  return (
    <Chip
      color={getPurchaseStatusColor(status)}
      label={PURCHASE_STATUS_LABELS[status]}
      size="small"
      variant={
        status === "draft" || status === "cancelled" ? "outlined" : "filled"
      }
      sx={{ fontWeight: 700, whiteSpace: "nowrap" }}
    />
  );
}
