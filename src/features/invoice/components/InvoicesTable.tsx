import { Icon } from "@iconify/react";
import {
  Avatar,
  Checkbox,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import type { Invoice } from "../types/Invoice.types";
import {
  formatInvoiceCurrency,
  formatInvoiceDate,
} from "../utils/invoiceFormatters";
import { InvoiceStatusChip } from "./InvoiceStatusChip";

interface InvoicesTableProps {
  invoices: Invoice[];
  isLoading?: boolean;
  selectedInvoiceIds: ReadonlySet<string>;
  onSelectAll: (checked: boolean) => void;
  onSelectInvoice: (invoiceId: string, checked: boolean) => void;
  onPreview: (invoiceId: string) => void;
}

export function InvoicesTable({
  invoices,
  isLoading = false,
  selectedInvoiceIds,
  onSelectAll,
  onSelectInvoice,
  onPreview,
}: InvoicesTableProps) {
  const selectedVisibleCount = invoices.filter((invoice) =>
    selectedInvoiceIds.has(invoice.id),
  ).length;
  const allVisibleSelected =
    invoices.length > 0 && selectedVisibleCount === invoices.length;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 940 }}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={allVisibleSelected}
                indeterminate={
                  selectedVisibleCount > 0 && !allVisibleSelected
                }
                onChange={(event) => onSelectAll(event.target.checked)}
                slotProps={{
                  input: {
                    "aria-label": "Seleccionar todas las facturas visibles",
                  },
                }}
              />
            </TableCell>
            <TableCell>Factura</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Emisión</TableCell>
            <TableCell>Vencimiento</TableCell>
            <TableCell align="right">Importe</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} sx={{ borderBottom: 0, height: 360 }}>
                <Stack
                  spacing={1.5}
                  sx={{ alignItems: "center", justifyContent: "center" }}
                >
                  <CircularProgress size={38} />
                  <Typography color="text.secondary" variant="body2">
                    Cargando facturas…
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          ) : invoices.map((invoice) => (
            <TableRow
              key={invoice.id}
              hover
              selected={selectedInvoiceIds.has(invoice.id)}
              sx={{ "&:last-child td": { borderBottom: 0 } }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedInvoiceIds.has(invoice.id)}
                  onChange={(event) =>
                    onSelectInvoice(invoice.id, event.target.checked)
                  }
                  slotProps={{
                    input: {
                      "aria-label": `Seleccionar ${invoice.number}`,
                    },
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography
                  color="primary.main"
                  variant="body2"
                  sx={{ fontWeight: 700, whiteSpace: "nowrap" }}
                >
                  {invoice.number}
                </Typography>
              </TableCell>

              <TableCell>
                <Stack
                  direction="row"
                  spacing={1.25}
                  sx={{ alignItems: "center" }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(20, 103, 193, 0.12)",
                      color: "secondary.main",
                      fontSize: 13,
                      fontWeight: 800,
                      height: 36,
                      width: 36,
                    }}
                  >
                    {invoice.customer.initials}
                  </Avatar>

                  <Stack spacing={0.1}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {invoice.customer.name}
                    </Typography>
                    <Typography color="text.secondary" variant="caption">
                      {invoice.customer.email}
                    </Typography>
                  </Stack>
                </Stack>
              </TableCell>

              <TableCell sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>
                {formatInvoiceDate(invoice.issueDate)}
              </TableCell>

              <TableCell sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>
                {formatInvoiceDate(invoice.dueDate)}
              </TableCell>

              <TableCell align="right">
                <Stack spacing={0.1}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 800, whiteSpace: "nowrap" }}
                  >
                    {formatInvoiceCurrency(invoice.total, invoice.currency)}
                  </Typography>
                  <Typography color="text.secondary" variant="caption">
                    {invoice.currency}
                  </Typography>
                </Stack>
              </TableCell>

              <TableCell>
                <InvoiceStatusChip status={invoice.status} />
              </TableCell>

              <TableCell align="right">
                <Tooltip title="Previsualizar factura">
                  <IconButton
                    aria-label={`Previsualizar ${invoice.number}`}
                    color="primary"
                    onClick={() => onPreview(invoice.id)}
                  >
                    <Icon icon="solar:eye-linear" width={21} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
