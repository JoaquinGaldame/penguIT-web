import { Icon } from "@iconify/react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { ORDER_CHANNEL_LABELS, type Order } from "../types/Orders.types";
import {
  formatOrderCurrency,
  formatOrderDateTime,
} from "../utils/orderFormatters";
import { OrderStatusChip } from "./OrderStatusChip";

interface OrderDetailsDrawerProps {
  order?: Order;
  open: boolean;
  onClose: () => void;
}

export function OrderDetailsDrawer({
  order,
  open,
  onClose,
}: OrderDetailsDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 460 },
            maxWidth: "100%",
          },
        },
      }}
    >
      {order && (
        <Stack sx={{ minHeight: "100%" }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "flex-start",
              justifyContent: "space-between",
              px: 3,
              py: 2.5,
            }}
          >
            <Box>
              <Typography variant="overline" color="text.secondary">
                Detalle del pedido
              </Typography>

              <Typography component="h2" variant="h5">
                Pedido #{order.number}
              </Typography>
            </Box>

            <IconButton
              onClick={onClose}
              aria-label="Cerrar detalle del pedido"
            >
              <Icon icon="solar:close-circle-linear" width={25} />
            </IconButton>
          </Stack>

          <Divider />

          <Stack spacing={3} sx={{ flex: 1, px: 3, py: 2.5 }}>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <OrderStatusChip status={order.status} size="medium" />

              <Typography variant="body2" color="text.secondary">
                {formatOrderDateTime(order.createdAt)}
              </Typography>
            </Stack>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 2,
              }}
            >
              <Detail label="Cliente" value={order.customer} />
              <Detail
                label="Canal"
                value={ORDER_CHANNEL_LABELS[order.channel]}
              />
              <Detail label="Sucursal" value={order.branch} />
              <Detail label="Teléfono" value={order.phone ?? "No informado"} />
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Productos
              </Typography>

              <Stack spacing={1.5}>
                {order.items.map((item) => (
                  <Stack
                    key={item.id}
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: "flex-start" }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        placeItems: "center",
                        borderRadius: 2,
                        bgcolor: "rgba(20, 103, 193, 0.10)",
                        color: "primary.main",
                        fontWeight: 800,
                      }}
                    >
                      {item.quantity}
                    </Box>

                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {item.name}
                      </Typography>

                      {item.notes && (
                        <Typography variant="caption" color="text.secondary">
                          {item.notes}
                        </Typography>
                      )}
                    </Box>

                    <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                      {formatOrderCurrency(item.unitPrice * item.quantity)}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>

            {order.notes && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(183, 121, 31, 0.09)",
                }}
              >
                <Typography
                  variant="caption"
                  color="warning.main"
                  sx={{ fontWeight: 800 }}
                >
                  Observaciones
                </Typography>

                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {order.notes}
                </Typography>
              </Box>
            )}
          </Stack>

          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: 1,
              borderColor: "divider",
              px: 3,
              py: 2.5,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Total
            </Typography>

            <Typography variant="h5" color="primary.main">
              {formatOrderCurrency(order.total)}
            </Typography>
          </Stack>
        </Stack>
      )}
    </Drawer>
  );
}

interface DetailProps {
  label: string;
  value: string;
}

function Detail({ label, value }: DetailProps) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>

      <Typography variant="body2" sx={{ mt: 0.25, fontWeight: 700 }}>
        {value}
      </Typography>
    </Box>
  );
}
