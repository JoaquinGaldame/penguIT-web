import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import {
  MEASUREMENT_UNIT_LABELS,
  RECIPE_YIELD_UNIT_LABELS,
  type RecipeListItem,
} from '../types/Recipe.types';
import {
  formatRecipeCurrency,
  formatRecipeDate,
  formatRecipePercentage,
  getIngredientSubtotal,
  getRecipeCostPerYield,
  getRecipeCostStatus,
  getRecipeMarginPercentage,
  getRecipeTotalCost,
} from '../utils/recipeFormatters';
import { RecipeCostChip } from './RecipeCostChip';
import { RecipeStatusChip } from './RecipeStatusChip';

interface RecipeDetailsDrawerProps {
  recipe?: RecipeListItem;
  open: boolean;
  onClose: () => void;
  onEdit: (recipeId: string) => void;
}

export function RecipeDetailsDrawer({
  recipe,
  open,
  onClose,
  onEdit,
}: RecipeDetailsDrawerProps) {
  const totalCost = recipe ? getRecipeTotalCost(recipe) : 0;
  const costPerYield = recipe ? getRecipeCostPerYield(recipe) : null;
  const margin = recipe
    ? getRecipeMarginPercentage(recipe, recipe.salePrice)
    : null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { maxWidth: '100%', width: { xs: '100%', sm: 520 } } } }}
    >
      {recipe && (
        <Stack sx={{ minHeight: '100%' }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'flex-start', justifyContent: 'space-between', px: 3, py: 2.5 }}
          >
            <Box>
              <Typography color="text.secondary" variant="overline">Detalle de la receta</Typography>
              <Typography component="h2" variant="h5">{recipe.name}</Typography>
              <Typography color="text.secondary" variant="body2">{recipe.code}</Typography>
            </Box>
            <IconButton onClick={onClose} aria-label="Cerrar detalle de la receta">
              <Icon icon="solar:close-circle-linear" width={25} />
            </IconButton>
          </Stack>
          <Divider />

          <Stack spacing={3} sx={{ flex: 1, px: 3, py: 2.5 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
              <RecipeStatusChip status={recipe.status} size="medium" />
              <RecipeCostChip status={getRecipeCostStatus(recipe, recipe.salePrice)} />
            </Stack>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2 }}>
              <Detail label="Producto asociado" value={recipe.productName} />
              <Detail
                label="Rendimiento"
                value={`${recipe.yieldQuantity} ${RECIPE_YIELD_UNIT_LABELS[recipe.yieldUnit]}`}
              />
              <Detail label="Tiempo de preparación" value={recipe.preparationTimeMinutes ? `${recipe.preparationTimeMinutes} min` : 'No informado'} />
              <Detail label="Última actualización" value={formatRecipeDate(recipe.updatedAt)} />
            </Box>

            {recipe.description && (
              <Typography color="text.secondary" variant="body2">{recipe.description}</Typography>
            )}

            <Divider />
            <Box>
              <Typography variant="h6" sx={{ mb: 1.5 }}>Ingredientes</Typography>
              {recipe.ingredients.length === 0 ? (
                <Typography color="text.secondary" variant="body2">
                  Esta receta todavía no tiene ingredientes cargados.
                </Typography>
              ) : (
                <Stack spacing={1.5}>
                  {recipe.ingredients.map((ingredient) => (
                    <Stack key={ingredient.id} direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{ingredient.name}</Typography>
                        <Typography color="text.secondary" variant="caption">
                          {ingredient.quantity} {MEASUREMENT_UNIT_LABELS[ingredient.unit]}
                          {ingredient.wastePercentage > 0 ? ` · ${ingredient.wastePercentage}% merma` : ''}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                        {formatRecipeCurrency(getIngredientSubtotal(ingredient.quantity, ingredient.unitCost, ingredient.wastePercentage))}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Box>

            {recipe.steps.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Typography variant="h6" sx={{ mb: 1.5 }}>Preparación</Typography>
                  <Stack spacing={1.5}>
                    {recipe.steps.map((step, index) => (
                      <Stack key={step.id} direction="row" spacing={1.25}>
                        <Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', color: 'common.white', display: 'grid', flexShrink: 0, fontSize: 12, fontWeight: 800, height: 26, placeItems: 'center', width: 26 }}>
                          {index + 1}
                        </Box>
                        <Typography variant="body2">{step.description}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </>
            )}
          </Stack>

          <Box sx={{ bgcolor: 'background.default', borderTop: 1, borderColor: 'divider', px: 3, py: 2.5 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 1.5, mb: 2 }}>
              <Detail label="Costo total" value={recipe.ingredients.length ? formatRecipeCurrency(totalCost) : '—'} />
              <Detail label="Costo unitario" value={costPerYield === null || !recipe.ingredients.length ? '—' : formatRecipeCurrency(costPerYield)} />
              <Detail label="Margen" value={formatRecipePercentage(margin)} />
            </Box>
            <Button
              fullWidth
              variant="contained"
              onClick={() => onEdit(recipe.id)}
              startIcon={<Icon icon="solar:pen-2-linear" width={20} />}
            >
              Editar receta
            </Button>
          </Box>
        </Stack>
      )}
    </Drawer>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography color="text.secondary" variant="caption">{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.25 }}>{value}</Typography>
    </Box>
  );
}
