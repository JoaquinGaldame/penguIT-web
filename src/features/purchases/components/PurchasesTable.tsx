import {
  Avatar,
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
import type { Purchase } from "../types/Purchase.types";
import {
  formatPurchaseCurrency,
  formatPurchaseDate,
  getSupplierInitials,
  isPurchaseDeliveryOverdue,
} from "../utils/purchaseFormatters";
import { PurchasePaymentStatusChip } from "./PurchasePaymentStatusChip";
import { PurchaseReceiptProgress } from "./PurchaseReceiptProgress";
import { PurchaseStatusChip } from "./PurchaseStatusChip";

interface PurchasesTableProps {
  purchases: Purchase[];
  isLoading?: boolean;
  onView: (purchaseId: string) => void;
}

export function PurchasesTable({
  purchases,
  isLoading = false,
  onView,
}: PurchasesTableProps) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 1280 }}>
        <TableHead>
          <TableRow>
            <TableCell>Compra</TableCell>
            <TableCell>Proveedor</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Entrega esperada</TableCell>
            <TableCell>Recepción</TableCell>
            <TableCell>Pago</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading
            ? Array.from({ length: 6 }).map((_, rowIndex) => (
                <TableRow key={rowIndex} aria-hidden="true">
                  {Array.from({ length: 9 }).map((__, cellIndex) => (
                    <TableCell key={cellIndex} sx={{ height: 72 }}>
                      <Skeleton
                        variant="text"
                        width={cellIndex === 0 || cellIndex === 1 ? 150 : 96}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : purchases.map((purchase) => {
                const isOverdue = isPurchaseDeliveryOverdue(purchase);

                return (
                  <TableRow
                    key={purchase.id}
                    hover
                    sx={{ "&:last-child td": { borderBottom: 0 } }}
                  >
                    <TableCell>
                      <Stack spacing={0.15}>
                        <Typography
                          color="primary.main"
                          variant="body2"
                          sx={{ fontWeight: 800, whiteSpace: "nowrap" }}
                        >
                          {purchase.number}
                        </Typography>
                        <Typography color="text.secondary" variant="caption">
                          {purchase.reference ?? "Sin referencia"}
                        </Typography>
                      </Stack>
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
                            fontSize: 12,
                            fontWeight: 800,
                            height: 36,
                            width: 36,
                          }}
                        >
                          {getSupplierInitials(purchase.supplier.name)}
                        </Avatar>
                        <Stack spacing={0.1}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {purchase.supplier.name}
                          </Typography>
                          <Typography color="text.secondary" variant="caption">
                            {purchase.supplier.taxId ??
                              purchase.supplier.email ??
                              "Sin datos adicionales"}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>

                    <TableCell
                      sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
                    >
                      {formatPurchaseDate(purchase.issueDate)}
                    </TableCell>

                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <Stack spacing={0.1}>
                        <Typography
                          color={isOverdue ? "error.main" : "text.secondary"}
                          variant="body2"
                          sx={{ fontWeight: isOverdue ? 700 : 400 }}
                        >
                          {formatPurchaseDate(purchase.expectedDeliveryDate)}
                        </Typography>
                        {isOverdue && (
                          <Typography color="error.main" variant="caption">
                            Atrasada
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <PurchaseReceiptProgress purchase={purchase} />
                    </TableCell>
                    <TableCell>
                      <PurchasePaymentStatusChip
                        status={purchase.paymentStatus}
                      />
                    </TableCell>
                    <TableCell>
                      <PurchaseStatusChip status={purchase.status} />
                    </TableCell>
                    <TableCell align="right">
                      <Stack spacing={0.1}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 800, whiteSpace: "nowrap" }}
                        >
                          {formatPurchaseCurrency(
                            purchase.total,
                            purchase.currency,
                          )}
                        </Typography>
                        <Typography color="text.secondary" variant="caption">
                          {purchase.currency}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Consultar detalle">
                        <IconButton
                          aria-label={`Consultar ${purchase.number}`}
                          color="primary"
                          onClick={() => onView(purchase.id)}
                        >
                          <AppIcon icon="solar:eye-linear" width={21} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
