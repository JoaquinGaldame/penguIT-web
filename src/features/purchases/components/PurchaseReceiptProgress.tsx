import { LinearProgress, Stack, Typography } from "@mui/material";

import type { Purchase } from "../types/Purchase.types";
import { calculatePurchaseReceipt } from "../utils/purchaseFormatters";

interface PurchaseReceiptProgressProps {
  purchase: Purchase;
}

export function PurchaseReceiptProgress({
  purchase,
}: PurchaseReceiptProgressProps) {
  const { orderedQuantity, percentage, receivedQuantity } =
    calculatePurchaseReceipt(purchase);
  const color =
    percentage === 100 ? "success" : percentage > 0 ? "warning" : "inherit";

  return (
    <Stack spacing={0.75} sx={{ minWidth: 130 }}>
      <Typography
        variant="caption"
        sx={{ fontWeight: 700, whiteSpace: "nowrap" }}
      >
        {receivedQuantity} de {orderedQuantity} ítems
      </Typography>
      <LinearProgress
        aria-label={`Recepción: ${receivedQuantity} de ${orderedQuantity} ítems`}
        color={color}
        value={percentage}
        variant="determinate"
        sx={{ borderRadius: 999, height: 5 }}
      />
    </Stack>
  );
}
