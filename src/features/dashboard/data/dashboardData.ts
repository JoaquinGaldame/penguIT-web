import { paths } from '../../../app/router/paths';
import type {
  DashboardMetric,
  QuickAction,
  RecentOrder,
  StockAlert,
} from '../types/Dashboard.types';

export const dashboardMetrics: DashboardMetric[] = [
  {
    title: 'Ventas del día',
    value: '$ 1.284.500',
    comparison: '12,5% respecto de ayer',
    trend: 'up',
    icon: 'solar:wallet-money-linear',
    color: 'primary',
  },
  {
    title: 'Pedidos activos',
    value: '24',
    comparison: '8 en preparación',
    trend: 'neutral',
    icon: 'solar:clipboard-list-linear',
    color: 'secondary',
  },
  {
    title: 'Ticket promedio',
    value: '$ 18.350',
    comparison: '4,2% respecto de ayer',
    trend: 'up',
    icon: 'solar:chart-2-linear',
    color: 'success',
  },
  {
    title: 'Alertas de stock',
    value: '6',
    comparison: '2 requieren atención',
    trend: 'down',
    icon: 'solar:danger-triangle-linear',
    color: 'warning',
  },
];

export const recentOrders: RecentOrder[] = [
  {
    id: '#1048',
    customer: 'Mesa 12',
    channel: 'Salón',
    total: '$ 24.800',
    status: 'En preparación',
    time: '12:42',
  },
  {
    id: '#1047',
    customer: 'Martina López',
    channel: 'Delivery',
    total: '$ 18.400',
    status: 'Listo',
    time: '12:35',
  },
  {
    id: '#1046',
    customer: 'Mesa 7',
    channel: 'Salón',
    total: '$ 31.250',
    status: 'Entregado',
    time: '12:28',
  },
  {
    id: '#1045',
    customer: 'Retiro en local',
    channel: 'Take away',
    total: '$ 15.900',
    status: 'En preparación',
    time: '12:17',
  },
  {
    id: '#1044',
    customer: 'Mesa 3',
    channel: 'Salón',
    total: '$ 27.600',
    status: 'Entregado',
    time: '12:06',
  },
];

export const stockAlerts: StockAlert[] = [
  {
    id: 'stock-1',
    product: 'Lomo vacuno',
    currentStock: '3,2 kg',
    minimumStock: '8 kg',
    severity: 'critical',
  },
  {
    id: 'stock-2',
    product: 'Aceite de oliva',
    currentStock: '4 botellas',
    minimumStock: '10 botellas',
    severity: 'critical',
  },
  {
    id: 'stock-3',
    product: 'Queso mozzarella',
    currentStock: '6,5 kg',
    minimumStock: '9 kg',
    severity: 'warning',
  },
  {
    id: 'stock-4',
    product: 'Harina 000',
    currentStock: '12 kg',
    minimumStock: '15 kg',
    severity: 'warning',
  },
];

export const quickActions: QuickAction[] = [
  {
    label: 'Nuevo pedido',
    description: 'Registrar una nueva venta',
    path: paths.orders,
    icon: 'solar:add-square-linear',
  },
  {
    label: 'Controlar inventario',
    description: 'Revisar existencias e insumos',
    path: paths.inventory,
    icon: 'solar:box-minimalistic-linear',
  },
  {
    label: 'Registrar compra',
    description: 'Cargar una compra a proveedor',
    path: paths.purchases,
    icon: 'solar:cart-plus-linear',
  },
];
