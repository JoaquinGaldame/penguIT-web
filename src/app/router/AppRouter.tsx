import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../../features/auth';
import { DashboardPage } from '../../features/dashboard';
import { AuthLayout, MainLayout } from '../../layouts';
import { ComingSoonPage } from '../../shared/pages/ComingSoonPage';
import { GuestRoute } from './GuestRoute';
import { navigationConfig } from './navigationConfig';
import { paths } from './paths';
import { ProtectedRoute } from './ProtectedRoute';

const upcomingNavigationItems = navigationConfig.filter(
  (item) => item.path !== paths.dashboard,
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

            {upcomingNavigationItems.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={
                  <ComingSoonPage
                    title={item.label}
                    description={item.description}
                    icon={item.icon}
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
