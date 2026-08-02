export type InvoiceStatus = "paid" | "late" | "sent" | "draft";

export type InvoiceStatusFilter = "all" | InvoiceStatus;

export type InvoiceCurrency = "ARS" | "USD";

export interface InvoiceCustomer {
  id: string;
  name: string;
  email: string;
  initials: string;
  taxId?: string;
  address?: string;
  city?: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export interface Invoice {
  id: string;
  number: string;
  customer: InvoiceCustomer;
  issueDate: string;
  dueDate: string;
  currency: InvoiceCurrency;
  subtotal: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  items: InvoiceLineItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetInvoicesParams {
  limit: number;
  offset: number;
  search?: string;
  status?: InvoiceStatus;
}

export type InvoiceStatusCounts = Record<InvoiceStatusFilter, number>;

export interface GetInvoicesResponse {
  invoices: Invoice[];
  total: number;
  statusCounts: InvoiceStatusCounts;
}

export interface GetInvoiceResponse {
  invoice: Invoice;
}

export interface GetInvoiceCustomersResponse {
  customers: InvoiceCustomer[];
}

export interface CreateInvoiceRequest {
  customerId: string;
  issueDate: string;
  dueDate: string;
  currency: InvoiceCurrency;
  items: Omit<InvoiceLineItem, "id">[];
  status: Extract<InvoiceStatus, "draft" | "sent">;
  notes?: string;
}

export interface CreateInvoiceResponse {
  invoice: Invoice;
}

export interface InvoicesState {
  search: string;
  status: InvoiceStatusFilter;
  limit: number;
  offset: number;
  createStatus: "idle" | "pending" | "succeeded" | "failed";
  createError: string | null;
  createdInvoiceId: string | null;
}

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  paid: "Paid",
  late: "Late",
  sent: "Sent",
  draft: "Draft",
};

export const INVOICE_FILTER_LABELS: Record<InvoiceStatusFilter, string> = {
  all: "All invoices",
  ...INVOICE_STATUS_LABELS,
};
