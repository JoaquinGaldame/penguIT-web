import { Chip } from "@mui/material";

import {
  PURCHASE_PAYMENT_STATUS_LABELS,
  type PurchasePaymentStatus,
} from "../types/Purchase.types";
import { getPurchasePaymentStatusColor } from "../utils/purchaseFormatters";

interface PurchasePaymentStatusChipProps {
  status: PurchasePaymentStatus;
}

export function PurchasePaymentStatusChip({
  status,
}: PurchasePaymentStatusChipProps) {
  return (
    <Chip
      color={getPurchasePaymentStatusColor(status)}
      label={PURCHASE_PAYMENT_STATUS_LABELS[status]}
      size="small"
      variant={status === "pending" ? "outlined" : "filled"}
      sx={{ fontWeight: 700, whiteSpace: "nowrap" }}
    />
  );
}
