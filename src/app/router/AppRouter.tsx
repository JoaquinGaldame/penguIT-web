import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Pages
import { LoginPage } from '../../features/auth';
import { DashboardPage } from '../../features/dashboard';
import { OrdersPage } from '../../features/orders';
import {
  CreateProductPage,
  ProductListPage,
} from '../../features/products';

import { AuthLayout, MainLayout } from '../../layouts';
import { ComingSoonPage } from '../../shared/pages/ComingSoonPage';
import { GuestRoute } from './GuestRoute';
import { getNavigationLeaves } from './navigationConfig';
import { paths } from './paths';
import { ProtectedRoute } from './ProtectedRoute';

const upcomingNavigationItems = getNavigationLeaves().filter(
  (item) =>
    item.path !== paths.dashboard &&
    item.path !== paths.orders &&
    item.path !== paths.inventoryProducts &&
    item.path !== paths.inventoryProductNew,
);

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={paths.login} element={<LoginPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path={paths.dashboard} element={<DashboardPage />} />
            <Route path={paths.orders} element={<OrdersPage />} />
            <Route
              path={paths.inventory}
              element={<Navigate to={paths.inventoryProducts} replace />}
            />
            <Route
              path={paths.inventoryProductNew}
              element={<CreateProductPage />}
            />
            <Route
              path={paths.inventoryProducts}
              element={<ProductListPage />}
            />
            <Route
              path={paths.administration}
              element={<Navigate to={paths.administrationUsers} replace />}
            />

            {upcomingNavigationItems.map((item) => (
              <Route
                key={item.id}
                path={item.path!}
                element={
                  <ComingSoonPage
                    title={item.label}
                    description={item.description}
                    icon={item.icon ?? 'solar:document-linear'}
                  />
                }
              />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={paths.dashboard} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
