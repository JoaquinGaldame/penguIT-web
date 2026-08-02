import {
  Box,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import penguinTechLogo from "../../../assets/logos/penguintech-logotipo.png";
import type { Invoice } from "../types/Invoice.types";
import {
  formatInvoiceCurrency,
  formatInvoiceDate,
} from "../utils/invoiceFormatters";
import { InvoiceStatusChip } from "./InvoiceStatusChip";

interface InvoiceDocumentProps {
  invoice: Invoice;
}

export function InvoiceDocument({ invoice }: InvoiceDocumentProps) {
  return (
    <Paper
      id="invoice-document"
      elevation={0}
      sx={{
        boxSizing: "border-box",
        display: "flex",
        minHeight: { sm: "297mm" },
        mx: "auto",
        overflow: "hidden",
        width: "100%",
        maxWidth: "210mm",
        border: 1,
        borderColor: "divider",
        boxShadow: "0 18px 48px rgba(15, 23, 42, 0.10)",
        "@media print": {
          border: 0,
          boxShadow: "none",
          margin: "0 auto",
          minHeight: "297mm",
          width: "100%",
          maxWidth: "none",
        },
      }}
    >
      <Box
        sx={{
          boxSizing: "border-box",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          minWidth: 0,
          p: { xs: 2.5, sm: "14mm" },
          "@media print": { p: "14mm" },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{
            alignItems: { sm: "flex-start" },
            justifyContent: "space-between",
            breakInside: "avoid",
          }}
        >
          <Box>
            <Box
              component="img"
              src={penguinTechLogo}
              alt="PenguinTech"
              sx={{
                display: "block",
                height: 60,
                objectFit: "cover",
                objectPosition: "center",
                width: 170,
              }}
            />
            <Typography color="text.secondary" variant="caption">
              Gestión gastronómica
            </Typography>
          </Box>

          <Stack
            spacing={0.75}
            sx={{ alignItems: { sm: "flex-end" }, textAlign: { sm: "right" } }}
          >
            <Typography
              component="h1"
              sx={{
                color: "primary.main",
                fontSize: { xs: 30, sm: 38 },
                fontWeight: 800,
                letterSpacing: 1.5,
                lineHeight: 1,
              }}
            >
              FACTURA
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {invoice.number}
            </Typography>
            <InvoiceStatusChip status={invoice.status} />
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "primary.main", borderWidth: 1, my: 3 }} />

        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1.5,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            overflow: "hidden",
            breakInside: "avoid",
          }}
        >
          <AddressBlock title="Emitida por">
            <Typography variant="body2" sx={{ fontWeight: 800 }}>
              PenguinTech Gastronomía
            </Typography>
            <Typography color="text.secondary" variant="body2">
              CUIT 30-71234567-8
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Av. Corrientes 1450
            </Typography>
            <Typography color="text.secondary" variant="body2">
              CABA, Argentina
            </Typography>
          </AddressBlock>

          <AddressBlock customer title="Facturar a">
            <Typography variant="body2" sx={{ fontWeight: 800 }}>
              {invoice.customer.name}
            </Typography>
            {invoice.customer.taxId && (
              <Typography color="text.secondary" variant="body2">
                CUIT {invoice.customer.taxId}
              </Typography>
            )}
            <Typography color="text.secondary" variant="body2">
              {invoice.customer.email}
            </Typography>
            {(invoice.customer.address || invoice.customer.city) && (
              <Typography color="text.secondary" variant="body2">
                {[invoice.customer.address, invoice.customer.city]
                  .filter(Boolean)
                  .join(", ")}
              </Typography>
            )}
          </AddressBlock>
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            my: 3,
            breakInside: "avoid",
          }}
        >
          <MetadataItem label="N.º de factura" value={invoice.number} />
          <MetadataItem
            label="Fecha de emisión"
            value={formatInvoiceDate(invoice.issueDate)}
          />
          <MetadataItem
            label="Fecha de vencimiento"
            value={formatInvoiceDate(invoice.dueDate)}
          />
        </Box>

        <TableContainer
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1.5,
            overflowX: "auto",
            "@media print": { overflow: "visible" },
          }}
        >
          <Table
            aria-label={`Detalle de la factura ${invoice.number}`}
            size="small"
            sx={{ minWidth: 640, "@media print": { minWidth: 0 } }}
          >
            <TableHead sx={{ display: "table-header-group" }}>
              <TableRow sx={{ bgcolor: "grey.100" }}>
                <TableCell sx={tableHeadCellSx}>Descripción</TableCell>
                <TableCell align="right" sx={tableHeadCellSx}>
                  Cant.
                </TableCell>
                <TableCell align="right" sx={tableHeadCellSx}>
                  Precio unitario
                </TableCell>
                <TableCell align="right" sx={tableHeadCellSx}>
                  IVA
                </TableCell>
                <TableCell align="right" sx={tableHeadCellSx}>
                  Importe
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.items.map((item) => {
                const amount = item.quantity * item.unitPrice;

                return (
                  <TableRow
                    key={item.id}
                    sx={{
                      breakInside: "avoid",
                      "&:last-child td": { borderBottom: 0 },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 700 }}>
                      {item.description}
                    </TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                      {formatInvoiceCurrency(item.unitPrice, invoice.currency)}
                    </TableCell>
                    <TableCell align="right">
                      {item.taxRate === 0 ? "Exento" : `${item.taxRate}%`}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 800, whiteSpace: "nowrap" }}
                    >
                      {formatInvoiceCurrency(amount, invoice.currency)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 3, sm: 5 },
            gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) 245px" },
            mt: 3,
            breakInside: "avoid",
          }}
        >
          <Box>
            <Typography
              color="text.secondary"
              variant="overline"
              sx={{ fontWeight: 800 }}
            >
              Notas
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {invoice.notes ||
                "Gracias por confiar en nosotros. Agradecemos que el pago se realice antes de la fecha de vencimiento indicada."}
            </Typography>
          </Box>

          <Stack spacing={1.15}>
            <TotalRow
              label="Subtotal"
              value={formatInvoiceCurrency(invoice.subtotal, invoice.currency)}
            />
            <TotalRow
              label="Impuestos"
              value={formatInvoiceCurrency(invoice.tax, invoice.currency)}
            />
            <Divider />
            <TotalRow
              emphasized
              label="Total"
              value={formatInvoiceCurrency(invoice.total, invoice.currency)}
            />
          </Stack>
        </Box>

        <Box
          component="footer"
          sx={{ mt: "auto", pt: 5, textAlign: "center", breakInside: "avoid" }}
        >
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" sx={{ fontWeight: 800 }}>
            Gracias por elegirnos.
          </Typography>
          <Typography color="text.secondary" variant="caption">
            Consultas: +54 11 4333-6002 · facturacion@penguintech.com
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

const tableHeadCellSx = {
  color: "text.secondary",
  fontSize: 12,
  fontWeight: 800,
  py: 1.5,
  whiteSpace: "nowrap",
};

interface AddressBlockProps {
  children: React.ReactNode;
  customer?: boolean;
  title: string;
}

function AddressBlock({
  children,
  customer = false,
  title,
}: AddressBlockProps) {
  return (
    <Box
      sx={{
        p: 2.25,
        ...(customer && {
          borderColor: "divider",
          borderLeft: { sm: 1 },
          borderTop: { xs: 1, sm: 0 },
        }),
      }}
    >
      <Typography
        color="text.secondary"
        variant="overline"
        sx={{ display: "block", fontWeight: 800, mb: 0.5 }}
      >
        {title}
      </Typography>
      <Stack spacing={0.25}>{children}</Stack>
    </Box>
  );
}

interface MetadataItemProps {
  label: string;
  value: string;
}

function MetadataItem({ label, value }: MetadataItemProps) {
  return (
    <Box>
      <Typography color="text.secondary" variant="caption">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 800 }}>
        {value}
      </Typography>
    </Box>
  );
}

interface TotalRowProps {
  emphasized?: boolean;
  label: string;
  value: string;
}

function TotalRow({ emphasized = false, label, value }: TotalRowProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: "baseline", justifyContent: "space-between" }}
    >
      <Typography
        color={emphasized ? "text.primary" : "text.secondary"}
        variant={emphasized ? "subtitle1" : "body2"}
        sx={{ fontWeight: emphasized ? 800 : 500 }}
      >
        {label}
      </Typography>
      <Typography
        color={emphasized ? "primary.main" : "text.primary"}
        variant={emphasized ? "h6" : "body2"}
        sx={{ fontWeight: 800, whiteSpace: "nowrap" }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
