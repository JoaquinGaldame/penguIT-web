import { Icon } from '@iconify/react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import type { QuickAction } from '../types/Dashboard.types';

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2.5 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Acciones rápidas
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(3, minmax(0, 1fr))',
          },
          gap: 1.5,
        }}
      >
        {actions.map((action) => (
          <Stack
            key={action.label}
            component={Link}
            to={action.path}
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: 'center',
              p: 1.75,
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              color: 'text.primary',
              textDecoration: 'none',
              transition:
                'border-color 160ms ease, background-color 160ms ease',
              '&:hover': {
                borderColor: 'secondary.main',
                bgcolor: 'rgba(74, 144, 226, 0.05)',
              },
            }}
          >
            <Box
              sx={{
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
                width: 42,
                height: 42,
                borderRadius: 2,
                bgcolor: 'rgba(20, 103, 193, 0.09)',
                color: 'secondary.main',
              }}
            >
              <Icon icon={action.icon} width={22} />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {action.label}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {action.description}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Box>
    </Paper>
  );
}
