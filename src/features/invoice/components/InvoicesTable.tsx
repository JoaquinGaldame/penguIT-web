import {
  Avatar,
  Checkbox,
  IconButton,
  Skeleton,
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

import { AppIcon } from "../../../shared/components/AppIcon";
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
                indeterminate={selectedVisibleCount > 0 && !allVisibleSelected}
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
          {isLoading
            ? Array.from({ length: 6 }).map((_, rowIndex) => (
                <TableRow key={rowIndex} aria-hidden="true">
                  <TableCell padding="checkbox">
                    <Skeleton variant="rounded" width={20} height={20} />
                  </TableCell>
                  {Array.from({ length: 7 }).map((__, cellIndex) => (
                    <TableCell key={cellIndex} sx={{ height: 64 }}>
                      <Skeleton
                        variant="text"
                        width={
                          cellIndex === 1 ? 150 : cellIndex === 5 ? 84 : 104
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : invoices.map((invoice) => (
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

                  <TableCell
                    sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
                  >
                    {formatInvoiceDate(invoice.issueDate)}
                  </TableCell>

                  <TableCell
                    sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
                  >
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
                        <AppIcon icon="solar:eye-linear" width={21} />
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
