import type { ChipProps } from "@mui/material";

import type {
  Purchase,
  PurchaseCurrency,
  PurchasePaymentStatus,
  PurchaseStatus,
} from "../types/Purchase.types";

export function formatPurchaseCurrency(
  amount: number,
  currency: PurchaseCurrency,
) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "ARS" ? 0 : 2,
  }).format(amount);
}

export function formatPurchaseDate(date?: string) {
  if (!date) return "Sin definir";

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date.slice(0, 10)}T00:00:00.000Z`));
}

export function calculatePurchaseReceipt(purchase: Purchase) {
  const orderedQuantity = purchase.items.reduce(
    (total, item) => total + item.orderedQuantity,
    0,
  );
  const receivedQuantity = purchase.items.reduce(
    (total, item) => total + item.receivedQuantity,
    0,
  );
  const percentage =
    orderedQuantity === 0
      ? 0
      : Math.min(100, Math.round((receivedQuantity / orderedQuantity) * 100));

  return { orderedQuantity, receivedQuantity, percentage };
}

export function isPurchaseDeliveryOverdue(
  purchase: Purchase,
  now = new Date(),
) {
  if (
    !purchase.expectedDeliveryDate ||
    purchase.status === "received" ||
    purchase.status === "cancelled"
  ) {
    return false;
  }

  const expectedDate = new Date(
    `${purchase.expectedDeliveryDate.slice(0, 10)}T23:59:59.999`,
  );

  return expectedDate.getTime() < now.getTime();
}

export function getPurchaseOutstandingBalance(purchase: Purchase) {
  return Math.max(0, purchase.total - purchase.paidAmount);
}

export function getPurchaseStatusColor(
  status: PurchaseStatus,
): ChipProps["color"] {
  const colors: Record<PurchaseStatus, ChipProps["color"]> = {
    draft: "default",
    ordered: "info",
    "partially-received": "warning",
    received: "success",
    cancelled: "error",
  };

  return colors[status];
}

export function getPurchasePaymentStatusColor(
  status: PurchasePaymentStatus,
): ChipProps["color"] {
  const colors: Record<PurchasePaymentStatus, ChipProps["color"]> = {
    pending: "warning",
    "partially-paid": "info",
    paid: "success",
    overdue: "error",
  };

  return colors[status];
}

export function getSupplierInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}
