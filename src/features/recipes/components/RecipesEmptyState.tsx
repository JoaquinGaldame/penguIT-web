import { Icon } from '@iconify/react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

interface RecipesEmptyStateProps {
  hasActiveFilters: boolean;
  onCreate: () => void;
  onReset: () => void;
}

export function RecipesEmptyState({
  hasActiveFilters,
  onCreate,
  onReset,
}: RecipesEmptyStateProps) {
  return (
    <Paper
      variant="outlined"
      sx={{ display: 'grid', minHeight: 300, p: 3, placeItems: 'center' }}
    >
      <Stack spacing={1.5} sx={{ alignItems: 'center', maxWidth: 440, textAlign: 'center' }}>
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
          <Icon icon="solar:chef-hat-linear" width={32} />
        </Box>
        <Typography variant="h6">
          {hasActiveFilters ? 'No encontramos recetas' : 'Todavía no hay recetas'}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {hasActiveFilters
            ? 'Probá con otros criterios o limpiá los filtros aplicados.'
            : 'Creá la primera receta para comenzar a controlar rendimientos y costos.'}
        </Typography>
        <Button
          variant={hasActiveFilters ? 'outlined' : 'contained'}
          onClick={hasActiveFilters ? onReset : onCreate}
          startIcon={
            <Icon
              icon={hasActiveFilters ? 'solar:restart-linear' : 'solar:add-circle-linear'}
              width={20}
            />
          }
        >
          {hasActiveFilters ? 'Limpiar filtros' : 'Crear primera receta'}
        </Button>
      </Stack>
    </Paper>
  );
}
