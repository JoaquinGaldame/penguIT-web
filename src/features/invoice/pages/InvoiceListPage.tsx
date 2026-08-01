import { useEffect, useMemo, useState } from "react";

import { Icon } from "@iconify/react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { paths } from "../../../app/router/paths";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { useGetInvoicesQuery } from "../api/InvoicesApi";
import { InvoicesEmptyState } from "../components/InvoicesEmptyState";
import { InvoicesFilters } from "../components/InvoicesFilters";
import { InvoicesPagination } from "../components/InvoicesPagination";
import { InvoicesTable } from "../components/InvoicesTable";
import { InvoicesTabs } from "../components/InvoicesTabs";
import {
  resetInvoicesFilters,
  setInvoicesLimit,
  setInvoicesOffset,
  setInvoicesSearch,
  setInvoicesStatus,
} from "../store/InvoicesSlice";
import { refreshInvoices } from "../store/InvoicesThunks";

export function InvoiceListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { search, status, limit, offset } = useAppSelector(
    (state) => state.invoices,
  );
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<Set<string>>(
    () => new Set(),
  );
  const { data, isError, isFetching, isLoading } = useGetInvoicesQuery({
    limit,
    offset,
    search: search || undefined,
    status: status === "all" ? undefined : status,
  });

  const invoices = useMemo(() => data?.invoices ?? [], [data?.invoices]);
  const total = data?.total ?? 0;

  useEffect(() => {
    if (total > 0 && offset >= total) {
      const lastOffset = Math.floor((total - 1) / limit) * limit;
      dispatch(setInvoicesOffset(lastOffset));
    }
  }, [dispatch, limit, offset, total]);

  const selectAllInvoices = (checked: boolean) => {
    setSelectedInvoiceIds(
      checked ? new Set(invoices.map((invoice) => invoice.id)) : new Set(),
    );
  };

  const selectInvoice = (invoiceId: string, checked: boolean) => {
    setSelectedInvoiceIds((current) => {
      const next = new Set(current);

      if (checked) {
        next.add(invoiceId);
      } else {
        next.delete(invoiceId);
      }

      return next;
    });
  };

  const clearSelection = () => {
    setSelectedInvoiceIds(new Set());
  };

  const hasActiveFilters = search.trim().length > 0 || status !== "all";

  return (
    <Stack spacing={2.5}>
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
            Facturas
          </Typography>

          <Typography color="text.secondary">
            Consultá, filtrá y controlá el estado de la facturación del negocio.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate(paths.billingInvoiceNew)}
          startIcon={<Icon icon="solar:add-circle-linear" width={20} />}
        >
          Crear factura
        </Button>
      </Stack>

      {isError ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" onClick={() => dispatch(refreshInvoices())}>
              Reintentar
            </Button>
          }
        >
          No pudimos cargar las facturas. Intentá nuevamente.
        </Alert>
      ) : (
        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <InvoicesTabs
            value={status}
            onChange={(value) => {
              clearSelection();
              dispatch(setInvoicesStatus(value));
            }}
          />

          <InvoicesFilters
            search={search}
            hasActiveFilters={hasActiveFilters}
            onSearchChange={(value) => {
              clearSelection();
              dispatch(setInvoicesSearch(value));
            }}
            onReset={() => {
              clearSelection();
              dispatch(resetInvoicesFilters());
            }}
          />

          {isFetching || isLoading ? (
            <InvoicesTable
              invoices={invoices}
              isLoading
              selectedInvoiceIds={selectedInvoiceIds}
              onSelectAll={selectAllInvoices}
              onSelectInvoice={selectInvoice}
              onPreview={(invoiceId) =>
                navigate(paths.billingInvoicePreview(invoiceId))
              }
            />
          ) : invoices.length === 0 ? (
            <InvoicesEmptyState hasActiveFilters={hasActiveFilters} />
          ) : (
            <InvoicesTable
              invoices={invoices}
              selectedInvoiceIds={selectedInvoiceIds}
              onSelectAll={selectAllInvoices}
              onSelectInvoice={selectInvoice}
              onPreview={(invoiceId) =>
                navigate(paths.billingInvoicePreview(invoiceId))
              }
            />
          )}

          <InvoicesPagination
            limit={limit}
            offset={offset}
            total={total}
            onLimitChange={(value) => {
              clearSelection();
              dispatch(setInvoicesLimit(value));
            }}
            onOffsetChange={(value) => {
              clearSelection();
              dispatch(setInvoicesOffset(value));
            }}
          />
        </Paper>
      )}
    </Stack>
  );
}
