import { Icon } from '@iconify/react';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';

import type { StockAlert } from '../types/Dashboard.types';

interface StockAlertsProps {
  alerts: StockAlert[];
}

export function StockAlerts({ alerts }: StockAlertsProps) {
  return (
    <Paper variant="outlined" sx={{ height: '100%', p: 2.5 }}>
      <Typography variant="h6" sx={{ mb: 0.5 }}>
        Stock crítico
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Insumos por debajo del mínimo
      </Typography>

      <Stack>
        {alerts.map((alert, index) => (
          <Fragment key={alert.id}>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: 'center', py: 1.5 }}
            >
              <Box
                sx={{
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                  width: 38,
                  height: 38,
                  borderRadius: 2,
                  color:
                    alert.severity === 'critical'
                      ? 'error.main'
                      : 'warning.main',
                  bgcolor:
                    alert.severity === 'critical'
                      ? 'rgba(197, 48, 48, 0.09)'
                      : 'rgba(183, 121, 31, 0.10)',
                }}
              >
                <Icon icon="solar:box-linear" width={21} />
              </Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="body2" noWrap sx={{ fontWeight: 700 }}>
                  {alert.product}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Mínimo: {alert.minimumStock}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                color={
                  alert.severity === 'critical' ? 'error.main' : 'warning.main'
                }
                sx={{ whiteSpace: 'nowrap', fontWeight: 700 }}
              >
                {alert.currentStock}
              </Typography>
            </Stack>

            {index < alerts.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Stack>
    </Paper>
  );
}
