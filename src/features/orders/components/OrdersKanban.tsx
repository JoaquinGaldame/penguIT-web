import { Icon } from "@iconify/react";
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  ORDER_CHANNEL_LABELS,
  ORDER_KANBAN_STATUSES,
  ORDER_STATUS_LABELS,
  type Order,
} from "../types/Orders.types";
import { formatOrderCurrency, formatOrderTime } from "../utils/orderFormatters";
import { OrderStatusChip } from "./OrderStatusChip";

interface OrdersKanbanProps {
  orders: Order[];
  onSelect: (orderId: string) => void;
}

export function OrdersKanban({ orders, onSelect }: OrdersKanbanProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0, 1fr)",
          md: "repeat(2, minmax(0, 1fr))",
          xl: "repeat(4, minmax(0, 1fr))",
        },
        gap: 2,
        alignItems: "start",
      }}
    >
      {ORDER_KANBAN_STATUSES.map((status) => {
        const statusOrders = orders.filter((order) => order.status === status);

        return (
          <Paper
            key={status}
            variant="outlined"
            sx={{ minWidth: 0, p: 1.5, bgcolor: "rgba(255, 255, 255, 0.62)" }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                px: 0.5,
                pb: 1.5,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                {ORDER_STATUS_LABELS[status]}
              </Typography>

              <Chip
                label={statusOrders.length}
                size="small"
                sx={{ minWidth: 30, fontWeight: 700 }}
              />
            </Stack>

            <Stack spacing={1.25}>
              {statusOrders.length === 0 ? (
                <Box
                  sx={{
                    display: "grid",
                    minHeight: 100,
                    placeItems: "center",
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    borderStyle: "dashed",
                    color: "text.secondary",
                  }}
                >
                  <Typography variant="caption">Sin pedidos</Typography>
                </Box>
              ) : (
                statusOrders.map((order) => (
                  <Card key={order.id} variant="outlined">
                    <CardActionArea
                      onClick={() => onSelect(order.id)}
                      aria-label={`Ver detalle del pedido ${order.number}`}
                      sx={{ p: 1.75 }}
                    >
                      <Stack spacing={1.25}>
                        <Stack
                          direction="row"
                          sx={{
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 800 }}
                            >
                              #{order.number}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {formatOrderTime(order.createdAt)}
                            </Typography>
                          </Box>

                          <OrderStatusChip status={order.status} />
                        </Stack>

                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {order.customer}
                          </Typography>

                          <Typography variant="caption" color="text.secondary">
                            {ORDER_CHANNEL_LABELS[order.channel]} ·{" "}
                            {order.items.length}{" "}
                            {order.items.length === 1 ? "ítem" : "ítems"}
                          </Typography>
                        </Box>

                        <Stack
                          direction="row"
                          sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="subtitle2" color="primary.main">
                            {formatOrderCurrency(order.total)}
                          </Typography>

                          <Icon
                            icon="solar:alt-arrow-right-linear"
                            width={18}
                          />
                        </Stack>
                      </Stack>
                    </CardActionArea>
                  </Card>
                ))
              )}
            </Stack>
          </Paper>
        );
      })}
    </Box>
  );
}
