import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";

import {
  ORDER_CHANNEL_LABELS,
  ORDER_STATUS_LABELS,
  type OrderChannel,
  type OrderStatus,
} from "../types/Orders.types";

interface OrdersFiltersProps {
  search: string;
  channel: OrderChannel | "all";
  status: OrderStatus | "all";
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onChannelChange: (value: OrderChannel | "all") => void;
  onStatusChange: (value: OrderStatus | "all") => void;
  onReset: () => void;
}

export function OrdersFilters({
  search,
  channel,
  status,
  hasActiveFilters,
  onSearchChange,
  onChannelChange,
  onStatusChange,
  onReset,
}: OrdersFiltersProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 1fr)",
          md: "minmax(0, 1fr) 180px 190px auto",
        },
        gap: 1.5,
        alignItems: "center",
      }}
    >
      <TextField
        id="orders-search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar por número, cliente o teléfono"
        aria-label="Buscar pedidos"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="solar:magnifer-linear" width={20} />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        select
        label="Canal"
        value={channel}
        onChange={(event) =>
          onChannelChange(event.target.value as OrderChannel | "all")
        }
        sx={{ minWidth: { md: 180 } }}
      >
        <MenuItem value="all">Todos los canales</MenuItem>

        {(Object.keys(ORDER_CHANNEL_LABELS) as OrderChannel[]).map(
          (orderChannel) => (
            <MenuItem key={orderChannel} value={orderChannel}>
              {ORDER_CHANNEL_LABELS[orderChannel]}
            </MenuItem>
          ),
        )}
      </TextField>

      <TextField
        select
        label="Estado"
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as OrderStatus | "all")
        }
        sx={{ minWidth: { md: 190 } }}
      >
        <MenuItem value="all">Todos los estados</MenuItem>

        {(Object.keys(ORDER_STATUS_LABELS) as OrderStatus[]).map(
          (orderStatus) => (
            <MenuItem key={orderStatus} value={orderStatus}>
              {ORDER_STATUS_LABELS[orderStatus]}
            </MenuItem>
          ),
        )}
      </TextField>

      {hasActiveFilters && (
        <Button
          color="inherit"
          onClick={onReset}
          startIcon={<Icon icon="solar:restart-linear" width={19} />}
          sx={{ whiteSpace: "nowrap" }}
        >
          Limpiar
        </Button>
      )}
    </Box>
  );
}
