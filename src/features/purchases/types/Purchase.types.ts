export type PurchaseStatus =
  "draft" | "ordered" | "partially-received" | "received" | "cancelled";

export type PurchasePaymentStatus =
  "pending" | "partially-paid" | "paid" | "overdue";

export type PurchaseCurrency = "ARS" | "USD";

export type PurchaseTab = Exclude<PurchaseStatus, "cancelled"> | "all";
export type PurchaseOverdueFilter = "all" | "yes" | "no";

export interface PurchaseSupplier {
  id: string;
  name: string;
  taxId?: string;
  email?: string;
  phone?: string;
}

export interface PurchaseItem {
  id: string;
  productId?: string;
  description: string;
  orderedQuantity: number;
  receivedQuantity: number;
  unitPrice: number;
  taxRate: number;
  subtotal: number;
}

export interface Purchase {
  id: string;
  number: string;
  reference?: string;
  supplier: PurchaseSupplier;
  status: PurchaseStatus;
  paymentStatus: PurchasePaymentStatus;
  issueDate: string;
  expectedDeliveryDate?: string;
  currency: PurchaseCurrency;
  subtotal: number;
  tax: number;
  total: number;
  paidAmount: number;
  items: PurchaseItem[];
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetPurchasesResponse {
  purchases: Purchase[];
}

export interface PurchasesState {
  search: string;
  selectedTab: PurchaseTab;
  isFiltersOpen: boolean;
  supplierId: string | "all";
  status: PurchaseStatus | "all";
  paymentStatus: PurchasePaymentStatus | "all";
  dateFrom: string;
  dateTo: string;
  overdue: PurchaseOverdueFilter;
  minAmount: string;
  maxAmount: string;
}

export const PURCHASE_STATUS_LABELS: Record<PurchaseStatus, string> = {
  draft: "Borrador",
  ordered: "Ordenada",
  "partially-received": "Parcialmente recibida",
  received: "Recibida",
  cancelled: "Cancelada",
};

export const PURCHASE_PAYMENT_STATUS_LABELS: Record<
  PurchasePaymentStatus,
  string
> = {
  pending: "Pendiente",
  "partially-paid": "Pago parcial",
  paid: "Pagada",
  overdue: "Vencida",
};

export const PURCHASE_TAB_LABELS: Record<PurchaseTab, string> = {
  all: "All purchases",
  draft: "Draft",
  ordered: "Ordered",
  "partially-received": "Partially received",
  received: "Received",
};
