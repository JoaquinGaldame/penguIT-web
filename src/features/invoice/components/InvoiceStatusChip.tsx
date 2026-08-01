import { Chip } from "@mui/material";

import {
  INVOICE_STATUS_LABELS,
  type InvoiceStatus,
} from "../types/Invoice.types";
import { getInvoiceStatusColor } from "../utils/invoiceFormatters";

interface InvoiceStatusChipProps {
  status: InvoiceStatus;
}

export function InvoiceStatusChip({ status }: InvoiceStatusChipProps) {
  return (
    <Chip
      color={getInvoiceStatusColor(status)}
      label={INVOICE_STATUS_LABELS[status]}
      size="small"
      variant={status === "draft" ? "outlined" : "filled"}
      sx={{ fontWeight: 700, minWidth: 72 }}
    />
  );
}
