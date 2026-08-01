import type { InvoiceCurrency, InvoiceStatus } from "../types/Invoice.types";

const currencyFormatters: Record<InvoiceCurrency, Intl.NumberFormat> = {
  ARS: new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }),
  USD: new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }),
};

const invoiceDateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatInvoiceCurrency(
  amount: number,
  currency: InvoiceCurrency,
) {
  return currencyFormatters[currency].format(amount);
}

export function formatInvoiceDate(date: string) {
  return invoiceDateFormatter.format(new Date(`${date}T00:00:00.000Z`));
}

export function getInvoiceStatusColor(status: InvoiceStatus) {
  const colors = {
    paid: "success",
    late: "error",
    sent: "info",
    draft: "default",
  } as const;

  return colors[status];
}
