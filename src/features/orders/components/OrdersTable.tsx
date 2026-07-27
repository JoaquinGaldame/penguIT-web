import { Icon } from "@iconify/react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import { ORDER_CHANNEL_LABELS, type Order } from "../types/Orders.types";
import { formatOrderCurrency, formatOrderTime } from "../utils/orderFormatters";
import { OrderStatusChip } from "./OrderStatusChip";

interface OrdersTableProps {
  orders: Order[];
  onSelect: (orderId: string) => void;
}

export function OrdersTable({ orders, onSelect }: OrdersTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 760 }}>
        <TableHead>
          <TableRow>
            <TableCell>Pedido</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Canal</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Hora</TableCell>
            <TableCell align="right" width={64}>
              <Typography component="span" className="sr-only">
                Acciones
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              hover
              onClick={() => onSelect(order.id)}
              sx={{
                cursor: "pointer",
                "&:last-child td": { borderBottom: 0 },
              }}
            >
              <TableCell sx={{ fontWeight: 800 }}>#{order.number}</TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {order.customer}
                </Typography>

                {order.phone && (
                  <Typography variant="caption" color="text.secondary">
                    {order.phone}
                  </Typography>
                )}
              </TableCell>
              <TableCell>{ORDER_CHANNEL_LABELS[order.channel]}</TableCell>
              <TableCell>
                <OrderStatusChip status={order.status} />
              </TableCell>
              <TableCell
                align="right"
                sx={{ whiteSpace: "nowrap", fontWeight: 700 }}
              >
                {formatOrderCurrency(order.total)}
              </TableCell>
              <TableCell align="right">
                {formatOrderTime(order.createdAt)}
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Ver detalle">
                  <IconButton
                    size="small"
                    aria-label={`Ver detalle del pedido ${order.number}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelect(order.id);
                    }}
                  >
                    <Icon icon="solar:eye-linear" width={20} />
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
