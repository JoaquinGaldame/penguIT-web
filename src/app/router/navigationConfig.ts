import { paths } from './paths';

export interface NavigationItem {
  id: string;
  label: string;
  path?: string;
  icon?: string;
  description: string;
  children?: NavigationItem[];
}

export const navigationConfig: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Panel principal',
    path: paths.dashboard,
    icon: 'solar:widget-5-linear',
    description: 'Resumen general de la operación',
  },
  {
    id: 'orders',
    label: 'Pedidos',
    path: paths.orders,
    icon: 'solar:clipboard-list-linear',
    description: 'Gestión y seguimiento de pedidos',
  },
  {
    id: 'inventory',
    label: 'Inventario',
    icon: 'solar:box-linear',
    description: 'Control de insumos y existencias',
    children: [
      {
        id: 'inventory-products',
        label: 'Listar productos',
        path: paths.inventoryProducts,
        icon: 'solar:list-linear',
        description: 'Consulta y gestión de productos',
      },
      {
        id: 'inventory-products-new',
        label: 'Agregar producto',
        path: paths.inventoryProductNew,
        icon: 'solar:add-circle-linear',
        description: 'Registro de un nuevo producto',
      },
    ],
  },
  {
    id: 'recipes',
    label: 'Recetas',
    path: paths.recipes,
    icon: 'solar:chef-hat-linear',
    description: 'Administración de recetas y costos',
  },
  {
    id: 'purchases',
    label: 'Compras',
    path: paths.purchases,
    icon: 'solar:cart-large-2-linear',
    description: 'Compras y relación con proveedores',
  },
  {
    id: 'billing',
    label: 'Facturación',
    path: paths.billing,
    icon: 'solar:bill-list-linear',
    description: 'Comprobantes y facturación del negocio',
  },
  {
    id: 'administration',
    label: 'Administración',
    icon: 'solar:settings-linear',
    description: 'Configuración general del sistema',
    children: [
      {
        id: 'administration-users',
        label: 'Usuarios',
        icon: 'solar:users-group-rounded-linear',
        description: 'Administración de usuarios del sistema',
        children: [
          {
            id: 'administration-users-list',
            label: 'Listar usuarios',
            path: paths.administrationUsers,
            description: 'Consulta y administración de usuarios',
          },
          {
            id: 'administration-users-new',
            label: 'Agregar usuario',
            path: paths.administrationUserNew,
            description: 'Registro de un nuevo usuario',
          },
        ],
      },
      {
        id: 'administration-settings',
        label: 'Configuración',
        icon: 'solar:tuning-2-linear',
        description: 'Parámetros generales del negocio',
        children: [
          {
            id: 'administration-system',
            label: 'Sistema',
            path: paths.administrationSystem,
            description: 'Configuración general de la aplicación',
          },
          {
            id: 'administration-business',
            label: 'Datos del negocio',
            path: paths.administrationBusiness,
            description: 'Información general del negocio',
          },
          {
            id: 'administration-branches',
            label: 'Sucursales',
            path: paths.administrationBranches,
            description: 'Gestión de sucursales',
          },
        ],
      },
    ],
  },
];

export function isNavigationPathSelected(pathname: string, path?: string) {
  if (!path) {
    return false;
  }

  return path === paths.dashboard
    ? pathname === path
    : pathname === path || pathname.startsWith(`${path}/`);
}

export function findNavigationTrail(
  pathname: string,
  items: NavigationItem[] = navigationConfig,
): NavigationItem[] {
  let bestTrail: NavigationItem[] = [];

  for (const item of items) {
    const childTrail = item.children
      ? findNavigationTrail(pathname, item.children)
      : [];
    const currentTrail =
      childTrail.length > 0
        ? [item, ...childTrail]
        : isNavigationPathSelected(pathname, item.path)
          ? [item]
          : [];

    const currentPath = currentTrail.at(-1)?.path;
    const bestPath = bestTrail.at(-1)?.path;
    const currentScore =
      (currentPath === pathname ? 1_000_000 : 0) + (currentPath?.length ?? 0);
    const bestScore =
      (bestPath === pathname ? 1_000_000 : 0) + (bestPath?.length ?? 0);

    if (currentScore > bestScore) {
      bestTrail = currentTrail;
    }
  }

  return bestTrail;
}

export function findNavigationItem(
  pathname: string,
  items: NavigationItem[] = navigationConfig,
): NavigationItem | undefined {
  return findNavigationTrail(pathname, items).at(-1);
}

export function getNavigationLeaves(
  items: NavigationItem[] = navigationConfig,
): NavigationItem[] {
  return items.flatMap((item) =>
    item.children?.length ? getNavigationLeaves(item.children) : [item],
  );
}
