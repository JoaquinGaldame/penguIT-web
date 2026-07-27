import { paths } from './paths';

export interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  description: string;
  children?: NavigationItem[];
}

export const navigationConfig: NavigationItem[] = [
  {
    label: 'Panel principal',
    path: paths.dashboard,
    icon: 'solar:widget-5-linear',
    description: 'Resumen general de la operación',
  },
  {
    label: 'Pedidos',
    path: paths.orders,
    icon: 'solar:clipboard-list-linear',
    description: 'Gestión y seguimiento de pedidos',
  },
  {
    label: 'Inventario',
    path: paths.inventory,
    icon: 'solar:box-linear',
    description: 'Control de insumos y existencias',
  },
  {
    label: 'Recetas',
    path: paths.recipes,
    icon: 'solar:chef-hat-linear',
    description: 'Administración de recetas y costos',
  },
  {
    label: 'Compras',
    path: paths.purchases,
    icon: 'solar:cart-large-2-linear',
    description: 'Compras y relación con proveedores',
  },
  {
    label: 'Facturación',
    path: paths.billing,
    icon: 'solar:bill-list-linear',
    description: 'Comprobantes y facturación del negocio',
  },
  {
    label: 'Administración',
    path: paths.administration,
    icon: 'solar:settings-linear',
    description: 'Configuración general del sistema',
  },
];

export function findNavigationItem(
  pathname: string,
  items: NavigationItem[] = navigationConfig,
): NavigationItem | undefined {
  for (const item of items) {
    const isSelected =
      item.path === paths.dashboard
        ? pathname === item.path
        : pathname.startsWith(item.path);

    if (isSelected) {
      return item;
    }

    const childMatch = item.children
      ? findNavigationItem(pathname, item.children)
      : undefined;

    if (childMatch) {
      return childMatch;
    }
  }

  return undefined;
}
