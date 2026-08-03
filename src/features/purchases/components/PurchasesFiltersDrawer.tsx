import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AppIcon } from "../../../shared/components/AppIcon";
import {
  PURCHASE_PAYMENT_STATUS_LABELS,
  PURCHASE_STATUS_LABELS,
  type PurchaseOverdueFilter,
  type PurchasePaymentStatus,
  type PurchaseStatus,
  type PurchaseSupplier,
} from "../types/Purchase.types";

interface PurchasesFiltersDrawerProps {
  open: boolean;
  suppliers: PurchaseSupplier[];
  supplierId: string | "all";
  status: PurchaseStatus | "all";
  paymentStatus: PurchasePaymentStatus | "all";
  dateFrom: string;
  dateTo: string;
  overdue: PurchaseOverdueFilter;
  minAmount: string;
  maxAmount: string;
  hasActiveFilters: boolean;
  onClose: () => void;
  onReset: () => void;
  onSupplierChange: (value: string | "all") => void;
  onStatusChange: (value: PurchaseStatus | "all") => void;
  onPaymentStatusChange: (value: PurchasePaymentStatus | "all") => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onOverdueChange: (value: PurchaseOverdueFilter) => void;
  onMinAmountChange: (value: string) => void;
  onMaxAmountChange: (value: string) => void;
}

const FILTERS_DRAWER_WIDTH = 380;

export function PurchasesFiltersDrawer({
  open,
  suppliers,
  supplierId,
  status,
  paymentStatus,
  dateFrom,
  dateTo,
  overdue,
  minAmount,
  maxAmount,
  hasActiveFilters,
  onClose,
  onReset,
  onSupplierChange,
  onStatusChange,
  onPaymentStatusChange,
  onDateFromChange,
  onDateToChange,
  onOverdueChange,
  onMinAmountChange,
  onMaxAmountChange,
}: PurchasesFiltersDrawerProps) {
  return (
    <Drawer
      anchor="left"
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ disablePortal: true, keepMounted: true }}
      sx={{
        position: "absolute",
        inset: 0,
        "& .MuiBackdrop-root": { position: "absolute" },
        "& .MuiDrawer-paper": {
          position: "absolute",
          width: { xs: "min(90vw, 380px)", sm: FILTERS_DRAWER_WIDTH },
          height: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
        },
      }}
    >
      <Stack sx={{ height: "100%", minHeight: 0 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "space-between", p: 2.5 }}
        >
          <Box>
            <Typography variant="h6">Filters</Typography>
            <Typography color="text.secondary" variant="body2">
              Refiná el listado de compras
            </Typography>
          </Box>
          <IconButton aria-label="Cerrar filtros" onClick={onClose}>
            <AppIcon icon="solar:close-circle-linear" width={22} />
          </IconButton>
        </Stack>

        <Divider />

        <Stack
          spacing={2}
          sx={{ flex: 1, minHeight: 0, overflowY: "auto", p: 2.5 }}
        >
          <TextField
            select
            label="Proveedor"
            value={supplierId}
            onChange={(event) => onSupplierChange(event.target.value)}
          >
            <MenuItem value="all">Todos los proveedores</MenuItem>
            {suppliers.map((supplier) => (
              <MenuItem key={supplier.id} value={supplier.id}>
                {supplier.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Estado operativo"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value as PurchaseStatus | "all")
            }
          >
            <MenuItem value="all">Todos los estados</MenuItem>
            {(Object.keys(PURCHASE_STATUS_LABELS) as PurchaseStatus[]).map(
              (purchaseStatus) => (
                <MenuItem key={purchaseStatus} value={purchaseStatus}>
                  {PURCHASE_STATUS_LABELS[purchaseStatus]}
                </MenuItem>
              ),
            )}
          </TextField>

          <TextField
            select
            label="Estado de pago"
            value={paymentStatus}
            onChange={(event) =>
              onPaymentStatusChange(
                event.target.value as PurchasePaymentStatus | "all",
              )
            }
          >
            <MenuItem value="all">Todos los estados de pago</MenuItem>
            {(
              Object.keys(
                PURCHASE_PAYMENT_STATUS_LABELS,
              ) as PurchasePaymentStatus[]
            ).map((purchasePaymentStatus) => (
              <MenuItem
                key={purchasePaymentStatus}
                value={purchasePaymentStatus}
              >
                {PURCHASE_PAYMENT_STATUS_LABELS[purchasePaymentStatus]}
              </MenuItem>
            ))}
          </TextField>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <TextField
              fullWidth
              label="Fecha desde"
              type="date"
              value={dateFrom}
              onChange={(event) => onDateFromChange(event.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              fullWidth
              label="Fecha hasta"
              type="date"
              value={dateTo}
              onChange={(event) => onDateToChange(event.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Stack>

          <TextField
            select
            label="Entrega atrasada"
            value={overdue}
            onChange={(event) =>
              onOverdueChange(event.target.value as PurchaseOverdueFilter)
            }
          >
            <MenuItem value="all">Todas</MenuItem>
            <MenuItem value="yes">Sí</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </TextField>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <TextField
              fullWidth
              label="Importe mínimo"
              type="number"
              value={minAmount}
              onChange={(event) => onMinAmountChange(event.target.value)}
              slotProps={{ htmlInput: { min: 0 } }}
            />
            <TextField
              fullWidth
              label="Importe máximo"
              type="number"
              value={maxAmount}
              onChange={(event) => onMaxAmountChange(event.target.value)}
              slotProps={{ htmlInput: { min: 0 } }}
            />
          </Stack>
        </Stack>

        <Divider />
        <Stack direction="row" spacing={1.5} sx={{ p: 2.5 }}>
          <Button
            fullWidth
            color="inherit"
            disabled={!hasActiveFilters}
            onClick={onReset}
          >
            Limpiar
          </Button>
          <Button fullWidth variant="contained" onClick={onClose}>
            Aplicar
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
