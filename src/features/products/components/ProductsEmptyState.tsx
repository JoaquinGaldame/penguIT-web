import { Icon } from '@iconify/react';
import { Box, Paper, Stack, Typography } from '@mui/material';

export function ProductsEmptyState() {
  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'grid',
        minHeight: 280,
        p: 3,
        placeItems: 'center',
      }}
    >
      <Stack
        spacing={1.5}
        sx={{
          alignItems: 'center',
          maxWidth: 420,
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(20, 103, 193, 0.10)',
            borderRadius: 3,
            color: 'secondary.main',
            display: 'grid',
            height: 64,
            placeItems: 'center',
            width: 64,
          }}
        >
          <Icon icon="solar:box-minimalistic-linear" width={32} />
        </Box>

        <Typography variant="h6">
          No encontramos productos
        </Typography>

        <Typography color="text.secondary" variant="body2">
          Ajustá los filtros o agregá el primer producto del catálogo.
        </Typography>
      </Stack>
    </Paper>
  );
}
