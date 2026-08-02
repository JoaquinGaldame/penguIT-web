import { Icon } from '@iconify/react';
import { Box, Paper, Stack, Typography } from '@mui/material';

import type { RecipeListItem } from '../types/Recipe.types';
import { getRecipeCostStatus } from '../utils/recipeFormatters';

export function RecipesSummary({ recipes }: { recipes: RecipeListItem[] }) {
  const metrics = [
    {
      label: 'Recetas totales',
      value: recipes.length,
      icon: 'solar:chef-hat-linear',
      color: 'primary.main',
      background: 'rgba(10, 46, 92, 0.09)',
    },
    {
      label: 'Recetas activas',
      value: recipes.filter((recipe) => recipe.status === 'active').length,
      icon: 'solar:check-circle-linear',
      color: 'success.main',
      background: 'rgba(46, 125, 91, 0.11)',
    },
    {
      label: 'Costo incompleto',
      value: recipes.filter(
        (recipe) => getRecipeCostStatus(recipe, recipe.salePrice) === 'incomplete',
      ).length,
      icon: 'solar:document-add-linear',
      color: 'text.secondary',
      background: 'rgba(99, 115, 129, 0.10)',
    },
    {
      label: 'Margen en alerta',
      value: recipes.filter((recipe) => {
        const status = getRecipeCostStatus(recipe, recipe.salePrice);
        return status === 'warning' || status === 'critical';
      }).length,
      icon: 'solar:danger-triangle-linear',
      color: 'warning.main',
      background: 'rgba(183, 121, 31, 0.12)',
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 1.5,
        gridTemplateColumns: {
          xs: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(4, minmax(0, 1fr))',
        },
      }}
    >
      {metrics.map((metric) => (
        <Paper key={metric.label} variant="outlined" sx={{ p: 2 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                bgcolor: metric.background,
                borderRadius: 2,
                color: metric.color,
                display: 'grid',
                flexShrink: 0,
                height: 40,
                placeItems: 'center',
                width: 40,
              }}
            >
              <Icon icon={metric.icon} width={22} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h6">{metric.value}</Typography>
              <Typography color="text.secondary" variant="caption">
                {metric.label}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}
