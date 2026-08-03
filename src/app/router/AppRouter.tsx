import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthLayout, MainLayout } from "../../layouts";
import { GuestRoute } from "./GuestRoute";
import { getNavigationLeaves } from "./navigationConfig";
import { paths } from "./paths";
import { ProtectedRoute } from "./ProtectedRoute";

const LoginPage = lazy(() =>
  import("../../features/auth/pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);
const DashboardPage = lazy(() =>
  import("../../features/dashboard/pages/DashboardPage").then((module) => ({
    default: module.DashboardPage,
  })),
);
const OrdersPage = lazy(() =>
  import("../../features/orders/pages/OrdersPage").then((module) => ({
    default: module.OrdersPage,
  })),
);
const InvoiceListPage = lazy(() =>
  import("../../features/invoice/pages/InvoiceListPage").then((module) => ({
    default: module.InvoiceListPage,
  })),
);
const CreateInvoicePage = lazy(() =>
  import("../../features/invoice/pages/CreateInvoicePage").then((module) => ({
    default: module.CreateInvoicePage,
  })),
);

const InvoicePreviewPage = lazy(() =>
  import("../../features/invoice/pages/InvoicePreview").then((module) => ({
    default: module.InvoicePreview,
  })),
);

const ProductListPage = lazy(() =>
  import("../../features/products/pages/ProductListPage").then((module) => ({
    default: module.ProductListPage,
  })),
);
const CreateProductPage = lazy(() =>
  import("../../features/products/pages/CreateProductPage").then((module) => ({
    default: module.CreateProductPage,
  })),
);
const RecipeListPage = lazy(() =>
  import("../../features/recipes/pages/RecipeListPage").then((module) => ({
    default: module.RecipeListPage,
  })),
);
const PurchaseListPage = lazy(() =>
  import("../../features/purchases/pages/PurchaseListPage").then((module) => ({
    default: module.PurchaseListPage,
  })),
);
const CreateRecipePage = lazy(() =>
  import("../../features/recipes/pages/CreateRecipePage").then((module) => ({
    default: module.CreateRecipePage,
  })),
);
const EditRecipePage = lazy(() =>
  import("../../features/recipes/pages/EditRecipePage").then((module) => ({
    default: module.EditRecipePage,
  })),
);
const UserListPage = lazy(() =>
  import("../../features/users/pages/UserListPage").then((module) => ({
    default: module.UserListPage,
  })),
);
const CreateUserPage = lazy(() =>
  import("../../features/users/pages/CreateUserPage").then((module) => ({
    default: module.CreateUserPage,
  })),
);
const SystemSettingsPage = lazy(() =>
  import("../../features/system-settings/pages/SystemSettingsPage").then(
    (module) => ({ default: module.SystemSettingsPage }),
  ),
);
const ComingSoonPage = lazy(() =>
  import("../../shared/pages/ComingSoonPage/ComingSoonPage").then((module) => ({
    default: module.ComingSoonPage,
  })),
);

const upcomingNavigationItems = getNavigationLeaves().filter(
  (item) =>
    item.path !== paths.dashboard &&
    item.path !== paths.orders &&
    item.path !== paths.inventoryProducts &&
    item.path !== paths.inventoryProductNew &&
    item.path !== paths.recipes &&
    item.path !== paths.purchases &&
    item.path !== paths.billing &&
    item.path !== paths.administrationUsers &&
    item.path !== paths.administrationUserNew &&
    item.path !== paths.administrationSystem,
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
            <Route path={paths.recipeNew} element={<CreateRecipePage />} />
            <Route
              path="/recipes/:recipeId/edit"
              element={<EditRecipePage />}
            />
            <Route path={paths.recipes} element={<RecipeListPage />} />
            <Route path={paths.purchases} element={<PurchaseListPage />} />
            <Route
              path={paths.purchaseNew}
              element={
                <ComingSoonPage
                  title="Nueva compra"
                  description="El registro de nuevas compras estará disponible próximamente."
                  icon="solar:cart-plus-linear"
                />
              }
            />
            <Route
              path={`${paths.purchases}/:purchaseId`}
              element={
                <ComingSoonPage
                  title="Detalle de compra"
                  description="El detalle y seguimiento de la compra estará disponible próximamente."
                  icon="solar:document-text-linear"
                />
              }
            />
            <Route path={paths.billing} element={<InvoiceListPage />} />
            <Route
              path={paths.billingInvoiceNew}
              element={<CreateInvoicePage />}
            />
            <Route
              path="/billing/invoices/:invoiceId"
              element={<InvoicePreviewPage />}
            />
            <Route
              path={paths.administration}
              element={<Navigate to={paths.administrationUsers} replace />}
            />
            <Route
              path={paths.administrationUsers}
              element={<UserListPage />}
            />
            <Route
              path={paths.administrationUserNew}
              element={<CreateUserPage />}
            />
            <Route
              path={paths.administrationSystem}
              element={<SystemSettingsPage />}
            />

            {upcomingNavigationItems.map((item) => (
              <Route
                key={item.id}
                path={item.path!}
                element={
                  <ComingSoonPage
                    title={item.label}
                    description={item.description}
                    icon={item.icon ?? "solar:document-linear"}
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
