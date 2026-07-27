export interface DashboardMetric {
  title: string;
  value: string;
  comparison: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
}

export interface RecentOrder {
  id: string;
  customer: string;
  channel: string;
  total: string;
  status: 'En preparación' | 'Listo' | 'Entregado';
  time: string;
}

export interface StockAlert {
  id: string;
  product: string;
  currentStock: string;
  minimumStock: string;
  severity: 'critical' | 'warning';
}

export interface QuickAction {
  label: string;
  description: string;
  path: string;
  icon: string;
}
