import { Icon } from '@iconify/react';
import { Box, Paper, Stack, Typography } from '@mui/material';

import type { DashboardMetric } from '../types/Dashboard.types';

interface MetricCardProps {
  metric: DashboardMetric;
}

const colorMap = {
  primary: {
    background: 'rgba(10, 46, 92, 0.09)',
    foreground: 'primary.main',
  },
  secondary: {
    background: 'rgba(74, 144, 226, 0.12)',
    foreground: 'secondary.main',
  },
  success: {
    background: 'rgba(46, 125, 91, 0.11)',
    foreground: 'success.main',
  },
  warning: {
    background: 'rgba(183, 121, 31, 0.12)',
    foreground: 'warning.main',
  },
} as const;

export function MetricCard({ metric }: MetricCardProps) {
  const colors = colorMap[metric.color];
  const trendColor =
    metric.trend === 'up'
      ? 'success.main'
      : metric.trend === 'down'
        ? 'warning.main'
        : 'text.secondary';

  return (
    <Paper
      variant="outlined"
      sx={{
        height: '100%',
        p: 2.5,
        borderColor: 'divider',
        transition: 'transform 180ms ease, box-shadow 180ms ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 28px rgba(10, 46, 92, 0.08)',
        },
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1.25, fontWeight: 600 }}
          >
            {metric.title}
          </Typography>

          <Typography variant="h4" sx={{ mb: 1 }}>
            {metric.value}
          </Typography>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{ alignItems: 'center', color: trendColor }}
          >
            {metric.trend !== 'neutral' && (
              <Icon
                icon={
                  metric.trend === 'up'
                    ? 'solar:arrow-right-up-linear'
                    : 'solar:danger-circle-linear'
                }
                width={16}
              />
            )}

            <Typography
              variant="caption"
              sx={{ color: trendColor, fontWeight: 600 }}
            >
              {metric.comparison}
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0,
            width: 48,
            height: 48,
            borderRadius: 2.5,
            bgcolor: colors.background,
            color: colors.foreground,
          }}
        >
          <Icon icon={metric.icon} width={25} />
        </Box>
      </Stack>
    </Paper>
  );
}
