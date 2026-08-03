import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { paths } from "../../../app/router/paths";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { AppIcon } from "../../../shared/components/AppIcon";
import { useDebouncedValue } from "../../../shared/hooks/useDebouncedValue";
import { useGetPurchasesQuery } from "../api/PurchasesApi";
import { PurchasesEmptyState } from "../components/PurchasesEmptyState";
import { PurchasesFiltersDrawer } from "../components/PurchasesFiltersDrawer";
import { PurchasesSummary } from "../components/PurchasesSummary";
import { PurchasesTable } from "../components/PurchasesTable";
import { PurchasesTabs } from "../components/PurchasesTabs";
import { PurchasesToolbar } from "../components/PurchasesToolbar";
import {
  resetPurchasesFilters,
  setPurchasesDateFrom,
  setPurchasesDateTo,
  setPurchasesFiltersOpen,
  setPurchasesMaxAmount,
  setPurchasesMinAmount,
  setPurchasesOverdue,
  setPurchasesPaymentStatus,
  setPurchasesSearch,
  setPurchasesStatus,
  setPurchasesSupplier,
  setPurchasesTab,
} from "../store/PurchasesSlice";
import { refreshPurchases } from "../store/PurchasesThunks";
import type {
  PurchaseSupplier,
  PurchaseTab,
} from "../types/Purchase.types";
import { isPurchaseDeliveryOverdue } from "../utils/purchaseFormatters";

export function PurchaseListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filters = useAppSelector((state) => state.purchases);
  const debouncedSearch = useDebouncedValue(filters.search, 300);
  const { data, isError, isFetching, isLoading } = useGetPurchasesQuery();
  const purchases = useMemo(() => data?.purchases ?? [], [data?.purchases]);

  const suppliers = useMemo(() => {
    const suppliersById = new Map<string, PurchaseSupplier>();
    purchases.forEach((purchase) => {
      suppliersById.set(purchase.supplier.id, purchase.supplier);
    });
    return Array.from(suppliersById.values()).sort((first, second) =>
      first.name.localeCompare(second.name, "es"),
    );
  }, [purchases]);

  const tabCounts = useMemo<Record<PurchaseTab, number>>(
    () => ({
      all: purchases.length,
      draft: purchases.filter((purchase) => purchase.status === "draft").length,
      ordered: purchases.filter((purchase) => purchase.status === "ordered")
        .length,
      "partially-received": purchases.filter(
        (purchase) => purchase.status === "partially-received",
      ).length,
      received: purchases.filter((purchase) => purchase.status === "received")
        .length,
    }),
    [purchases],
  );

  const filteredPurchases = useMemo(() => {
    const term = debouncedSearch.trim().toLocaleLowerCase("es");
    const minAmount =
      filters.minAmount === "" ? undefined : Number(filters.minAmount);
    const maxAmount =
      filters.maxAmount === "" ? undefined : Number(filters.maxAmount);

    return purchases.filter((purchase) => {
      if (
        filters.selectedTab !== "all" &&
        purchase.status !== filters.selectedTab
      ) {
        return false;
      }
      if (
        filters.supplierId !== "all" &&
        purchase.supplier.id !== filters.supplierId
      ) {
        return false;
      }
      if (filters.status !== "all" && purchase.status !== filters.status) {
        return false;
      }
      if (
        filters.paymentStatus !== "all" &&
        purchase.paymentStatus !== filters.paymentStatus
      ) {
        return false;
      }
      if (filters.dateFrom && purchase.issueDate < filters.dateFrom)
        return false;
      if (filters.dateTo && purchase.issueDate > filters.dateTo) return false;

      const isOverdue = isPurchaseDeliveryOverdue(purchase);
      if (filters.overdue === "yes" && !isOverdue) return false;
      if (filters.overdue === "no" && isOverdue) return false;
      if (minAmount !== undefined && purchase.total < minAmount) return false;
      if (maxAmount !== undefined && purchase.total > maxAmount) return false;

      if (!term) return true;

      return [purchase.number, purchase.reference, purchase.supplier.name].some(
        (value) => value?.toLocaleLowerCase("es").includes(term),
      );
    });
  }, [debouncedSearch, filters, purchases]);

  const activeFiltersCount =
    Number(filters.supplierId !== "all") +
    Number(filters.status !== "all") +
    Number(filters.paymentStatus !== "all") +
    Number(Boolean(filters.dateFrom)) +
    Number(Boolean(filters.dateTo)) +
    Number(filters.overdue !== "all") +
    Number(Boolean(filters.minAmount)) +
    Number(Boolean(filters.maxAmount));
  const hasActiveCriteria =
    filters.search.trim().length > 0 || activeFiltersCount > 0;
  const hasFilteredResultCriteria =
    hasActiveCriteria || filters.selectedTab !== "all";
  const hasData = data !== undefined;
  const hasInitialError = isError && !hasData;
  const hasRefetchError = isError && hasData;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      <PurchasesFiltersDrawer
        open={filters.isFiltersOpen}
        suppliers={suppliers}
        supplierId={filters.supplierId}
        status={filters.status}
        paymentStatus={filters.paymentStatus}
        dateFrom={filters.dateFrom}
        dateTo={filters.dateTo}
        overdue={filters.overdue}
        minAmount={filters.minAmount}
        maxAmount={filters.maxAmount}
        hasActiveFilters={activeFiltersCount > 0}
        onClose={() => dispatch(setPurchasesFiltersOpen(false))}
        onReset={() => dispatch(resetPurchasesFilters())}
        onSupplierChange={(value) => dispatch(setPurchasesSupplier(value))}
        onStatusChange={(value) => dispatch(setPurchasesStatus(value))}
        onPaymentStatusChange={(value) =>
          dispatch(setPurchasesPaymentStatus(value))
        }
        onDateFromChange={(value) => dispatch(setPurchasesDateFrom(value))}
        onDateToChange={(value) => dispatch(setPurchasesDateTo(value))}
        onOverdueChange={(value) => dispatch(setPurchasesOverdue(value))}
        onMinAmountChange={(value) => dispatch(setPurchasesMinAmount(value))}
        onMaxAmountChange={(value) => dispatch(setPurchasesMaxAmount(value))}
      />

      <Stack
        spacing={2.5}
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          overflowY: "auto",
          px: { xs: 2, sm: 3, lg: 4 },
          py: { xs: 2.5, md: 4 },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            alignItems: { xs: "stretch", sm: "flex-start" },
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography component="h1" variant="h4" sx={{ mb: 0.75 }}>
              Compras
            </Typography>
            <Typography color="text.secondary">
              Gestioná pedidos a proveedores, entregas y pagos.
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={() => navigate(paths.purchaseNew)}
            startIcon={<AppIcon icon="solar:add-circle-linear" width={20} />}
          >
            Nueva compra
          </Button>
        </Stack>

        <PurchasesSummary purchases={purchases} isLoading={isLoading} />

        {hasInitialError ? (
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                onClick={() => dispatch(refreshPurchases())}
              >
                Reintentar
              </Button>
            }
          >
            No pudimos cargar las compras. Intentá nuevamente.
          </Alert>
        ) : (
          <Paper
            variant="outlined"
            sx={{ overflow: "hidden", position: "relative" }}
          >
            {isFetching && !isLoading && (
              <LinearProgress
                aria-label="Actualizando compras"
                sx={{
                  left: 0,
                  position: "absolute",
                  right: 0,
                  top: 0,
                  zIndex: 1,
                }}
              />
            )}

            <PurchasesTabs
              value={filters.selectedTab}
              counts={tabCounts}
              onChange={(value) => dispatch(setPurchasesTab(value))}
            />

            <PurchasesToolbar
              search={filters.search}
              activeFiltersCount={activeFiltersCount}
              hasActiveCriteria={hasActiveCriteria}
              onSearchChange={(value) => dispatch(setPurchasesSearch(value))}
              onFiltersOpen={() => dispatch(setPurchasesFiltersOpen(true))}
              onReset={() => dispatch(resetPurchasesFilters())}
            />

            {hasRefetchError && (
              <Alert severity="warning" role="status" sx={{ mx: 2, mt: 2 }}>
                No pudimos actualizar las compras. Se mantienen visibles los
                últimos datos disponibles.
              </Alert>
            )}

            {isLoading ? (
              <PurchasesTable
                purchases={[]}
                isLoading
                onView={() => undefined}
              />
            ) : filteredPurchases.length === 0 ? (
              <PurchasesEmptyState
                hasActiveCriteria={hasFilteredResultCriteria}
              />
            ) : (
              <PurchasesTable
                purchases={filteredPurchases}
                onView={(purchaseId) =>
                  navigate(paths.purchaseDetail(purchaseId))
                }
              />
            )}
          </Paper>
        )}
      </Stack>
    </Box>
  );
}
