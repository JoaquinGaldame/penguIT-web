import { Icon } from "@iconify/react";
import {
  Alert,
  Box,
  Button,
  Collapse,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { useGetOrdersQuery } from "../api/OrdersApi";
import { OrderDetailsDrawer } from "../components/OrderDetailsDrawer";
import { OrdersEmptyState } from "../components/OrdersEmptyState";
import { OrdersFilters } from "../components/OrdersFilters";
import { OrdersKanban } from "../components/OrdersKanban";
import { OrdersTable } from "../components/OrdersTable";
import {
  hideOrderDetails,
  resetOrdersFilters,
  setOrdersChannel,
  setOrdersSearch,
  setOrdersStatus,
  setOrdersView,
  toggleOrdersFilters,
} from "../store/OrdersSlice";
import { openOrderDetails, refreshOrders } from "../store/OrdersThunks";
import type { OrdersView } from "../types/Orders.types";

export function OrdersPage() {
  const dispatch = useAppDispatch();
  const {
    search,
    channel,
    status,
    view,
    filtersOpen,
    selectedOrderId,
    detailsOpen,
  } = useAppSelector((state) => state.orders);
  const { data, isError, isFetching, isLoading } = useGetOrdersQuery();

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("es");

    return (data?.orders ?? []).filter((order) => {
      if (channel !== "all" && order.channel !== channel) {
        return false;
      }

      if (status !== "all" && order.status !== status) {
        return false;
      }

      if (!term) {
        return true;
      }

      return (
        String(order.number).includes(term) ||
        order.customer.toLocaleLowerCase("es").includes(term) ||
        (order.phone ?? "").toLocaleLowerCase("es").includes(term)
      );
    });
  }, [channel, data?.orders, search, status]);

  const selectedOrder = data?.orders.find(
    (order) => order.id === selectedOrderId,
  );
  const hasActiveFilters =
    search.trim().length > 0 || channel !== "all" || status !== "all";
  const hasInitialError = isError && data === undefined;
  const hasRefetchError = isError && data !== undefined;

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
            Pedidos
          </Typography>

          <Typography color="text.secondary">
            Seguí y gestioná los pedidos de todas tus sucursales en tiempo real.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            onClick={() => dispatch(toggleOrdersFilters())}
            startIcon={<Icon icon="solar:filter-linear" width={20} />}
            aria-expanded={filtersOpen}
            aria-controls="orders-filters"
          >
            Filtros
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            onClick={() => dispatch(refreshOrders())}
            disabled={isFetching}
            startIcon={<Icon icon="solar:refresh-linear" width={20} />}
          >
            Actualizar
          </Button>

          <Tooltip title="Disponible al conectar el alta de pedidos">
            <span>
              <Button
                variant="contained"
                disabled
                startIcon={<Icon icon="solar:add-circle-linear" width={20} />}
              >
                Nuevo pedido
              </Button>
            </span>
          </Tooltip>
        </Stack>
      </Stack>

      <Collapse in={filtersOpen}>
        <Paper id="orders-filters" variant="outlined" sx={{ p: 2 }}>
          <OrdersFilters
            search={search}
            channel={channel}
            status={status}
            hasActiveFilters={hasActiveFilters}
            onSearchChange={(value) => dispatch(setOrdersSearch(value))}
            onChannelChange={(value) => dispatch(setOrdersChannel(value))}
            onStatusChange={(value) => dispatch(setOrdersStatus(value))}
            onReset={() => dispatch(resetOrdersFilters())}
          />
        </Paper>
      </Collapse>

      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        {isFetching && !isLoading && <LinearProgress />}

        <Tabs
          value={view}
          onChange={(_event, value: OrdersView) =>
            dispatch(setOrdersView(value))
          }
          aria-label="Vista de pedidos"
          sx={{ px: 1.5, borderBottom: 1, borderColor: "divider" }}
        >
          <Tab
            value="kanban"
            icon={<Icon icon="solar:widget-3-linear" width={20} />}
            iconPosition="start"
            label="Kanban"
          />
          <Tab
            value="table"
            icon={<Icon icon="solar:list-linear" width={20} />}
            iconPosition="start"
            label="Tabla"
          />
        </Tabs>
      </Paper>

      {hasRefetchError && (
        <Alert severity="warning" role="status">
          No pudimos actualizar los pedidos. Se mantienen visibles los últimos
          datos disponibles.
        </Alert>
      )}

      {hasInitialError ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" onClick={() => dispatch(refreshOrders())}>
              Reintentar
            </Button>
          }
        >
          No pudimos cargar los pedidos. Intentá nuevamente.
        </Alert>
      ) : isLoading ? (
        view === "kanban" ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
                xl: "repeat(4, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                height={260}
                animation="wave"
              />
            ))}
          </Box>
        ) : (
          <Skeleton variant="rounded" height={380} animation="wave" />
        )
      ) : filteredOrders.length === 0 ? (
        <OrdersEmptyState />
      ) : view === "kanban" ? (
        <OrdersKanban
          orders={filteredOrders}
          onSelect={(orderId) => dispatch(openOrderDetails(orderId))}
        />
      ) : (
        <OrdersTable
          orders={filteredOrders}
          onSelect={(orderId) => dispatch(openOrderDetails(orderId))}
        />
      )}

      <OrderDetailsDrawer
        order={selectedOrder}
        open={detailsOpen}
        onClose={() => dispatch(hideOrderDetails())}
      />
    </Stack>
  );
}
