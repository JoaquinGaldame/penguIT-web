import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import type { RecentOrder } from '../types/Dashboard.types';

interface RecentOrdersProps {
  orders: RecentOrder[];
}

const statusColors = {
  'En preparación': 'warning',
  Listo: 'info',
  Entregado: 'success',
} as const;

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Paper variant="outlined" sx={{ height: '100%', overflow: 'hidden' }}>
      <Box sx={{ px: 2.5, py: 2.25 }}>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Pedidos recientes
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Últimos movimientos registrados hoy
        </Typography>
      </Box>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                Canal
              </TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: 'none', lg: 'table-cell' } }}
              >
                Hora
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                hover
                sx={{ '&:last-child td': { borderBottom: 0 } }}
              >
                <TableCell sx={{ fontWeight: 700 }}>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  {order.channel}
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 600 }}>
                  {order.total}
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={statusColors[order.status]}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    display: { xs: 'none', lg: 'table-cell' },
                    color: 'text.secondary',
                  }}
                >
                  {order.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
