import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";

import { AppIcon } from "../../../shared/components/AppIcon";
import type { Purchase } from "../types/Purchase.types";
import {
  formatPurchaseCurrency,
  getPurchaseOutstandingBalance,
  isPurchaseDeliveryOverdue,
} from "../utils/purchaseFormatters";

interface PurchasesSummaryProps {
  purchases: Purchase[];
  isLoading?: boolean;
}

export function PurchasesSummary({
  purchases,
  isLoading = false,
}: PurchasesSummaryProps) {
  const now = new Date();
  const purchasesThisMonth = purchases.filter((purchase) => {
    const issueDate = new Date(`${purchase.issueDate}T00:00:00`);
    return (
      purchase.status !== "cancelled" &&
      issueDate.getMonth() === now.getMonth() &&
      issueDate.getFullYear() === now.getFullYear()
    );
  });
  const totalsByCurrency = purchasesThisMonth.reduce<Record<string, number>>(
    (totals, purchase) => ({
      ...totals,
      [purchase.currency]: (totals[purchase.currency] ?? 0) + purchase.total,
    }),
    {},
  );
  const outstandingByCurrency = purchases
    .filter((purchase) => purchase.status !== "cancelled")
    .reduce<Record<string, number>>(
      (totals, purchase) => ({
        ...totals,
        [purchase.currency]:
          (totals[purchase.currency] ?? 0) +
          getPurchaseOutstandingBalance(purchase),
      }),
      {},
    );
  const pendingReceipt = purchases.filter(
    (purchase) =>
      purchase.status === "ordered" || purchase.status === "partially-received",
  ).length;
  const overdueDeliveries = purchases.filter((purchase) =>
    isPurchaseDeliveryOverdue(purchase, now),
  ).length;

  const formatCurrencyTotals = (totals: Record<string, number>) => {
    const entries = Object.entries(totals).filter(([, amount]) => amount > 0);
    return entries.length === 0
      ? formatPurchaseCurrency(0, "ARS")
      : entries
          .map(([currency, amount]) =>
            formatPurchaseCurrency(amount, currency as "ARS" | "USD"),
          )
          .join(" · ");
  };

  const items = [
    {
      label: "Compras del mes",
      value: formatCurrencyTotals(totalsByCurrency),
      icon: "solar:cart-large-2-linear",
      color: "primary.main",
      background: "rgba(20, 103, 193, 0.10)",
    },
    {
      label: "Pendientes de recibir",
      value: String(pendingReceipt),
      icon: "solar:delivery-linear",
      color: "warning.main",
      background: "rgba(237, 108, 2, 0.10)",
    },
    {
      label: "Pagos pendientes",
      value: formatCurrencyTotals(outstandingByCurrency),
      icon: "solar:wallet-money-linear",
      color: "info.main",
      background: "rgba(2, 136, 209, 0.10)",
    },
    {
      label: "Entregas atrasadas",
      value: String(overdueDeliveries),
      icon: "solar:clock-circle-linear",
      color: "error.main",
      background: "rgba(211, 47, 47, 0.10)",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          xl: "repeat(4, minmax(0, 1fr))",
        },
      }}
    >
      {items.map((item) => (
        <Paper key={item.label} variant="outlined" sx={{ p: 2 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                bgcolor: item.background,
                borderRadius: 2,
                color: item.color,
                display: "grid",
                flexShrink: 0,
                height: 42,
                placeItems: "center",
                width: 42,
              }}
            >
              <AppIcon icon={item.icon} width={22} />
            </Box>
            <Stack spacing={0.25} sx={{ minWidth: 0 }}>
              <Typography color="text.secondary" variant="caption">
                {item.label}
              </Typography>
              {isLoading ? (
                <Skeleton width={120} />
              ) : (
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  {item.value}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}
