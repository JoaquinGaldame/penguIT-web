export type OrderStatus = "pending" | "preparing" | "ready" | "delivered";

export type OrderChannel = "dine-in" | "delivery" | "takeaway" | "online";

export type OrdersView = "kanban" | "table";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface Order {
  id: string;
  number: number;
  customer: string;
  phone?: string;
  channel: OrderChannel;
  status: OrderStatus;
  branch: string;
  createdAt: string;
  total: number;
  notes?: string;
  items: OrderItem[];
}

export interface OrdersState {
  search: string;
  channel: OrderChannel | "all";
  status: OrderStatus | "all";
  view: OrdersView;
  filtersOpen: boolean;
  selectedOrderId: string | null;
  detailsOpen: boolean;
}

export interface GetOrdersResponse {
  orders: Order[];
}

export const ORDER_CHANNEL_LABELS: Record<OrderChannel, string> = {
  "dine-in": "Salón",
  delivery: "Delivery",
  takeaway: "Take away",
  online: "Online",
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendiente",
  preparing: "En preparación",
  ready: "Listo",
  delivered: "Entregado",
};

export const ORDER_KANBAN_STATUSES: OrderStatus[] = [
  "pending",
  "preparing",
  "ready",
  "delivered",
];
