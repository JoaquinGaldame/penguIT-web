import { Box, Divider, Paper, Stack, Typography } from '@mui/material';

import { formatRecipeCurrency, formatRecipePercentage } from '../utils/recipeFormatters';

interface CostIngredient {
  quantity?: unknown;
  unitCost?: unknown;
  wastePercentage?: unknown;
}

interface RecipeCostSummaryProps {
  ingredients?: CostIngredient[];
  yieldQuantity?: unknown;
  salePrice?: number;
}

export function RecipeCostSummary({
  ingredients = [],
  yieldQuantity,
  salePrice,
}: RecipeCostSummaryProps) {
  const baseCost = ingredients.reduce(
    (total, ingredient) =>
      total + normalizeNumber(ingredient.quantity) * normalizeNumber(ingredient.unitCost),
    0,
  );
  const totalCost = ingredients.reduce((total, ingredient) => {
    const subtotal = normalizeNumber(ingredient.quantity) * normalizeNumber(ingredient.unitCost);
    return total + subtotal * (1 + normalizeNumber(ingredient.wastePercentage) / 100);
  }, 0);
  const wasteCost = totalCost - baseCost;
  const normalizedYield = normalizeNumber(yieldQuantity);
  const costPerYield = normalizedYield > 0 ? totalCost / normalizedYield : null;
  const margin =
    costPerYield !== null && salePrice !== undefined && salePrice > 0
      ? ((salePrice - costPerYield) / salePrice) * 100
      : null;

  return (
    <Paper
      variant="outlined"
      sx={{ p: 2.5, position: { lg: 'sticky' }, top: { lg: 24 } }}
    >
      <Typography variant="h6">Resumen de costos</Typography>
      <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5, mb: 2.5 }}>
        Se actualiza mientras completás la receta.
      </Typography>

      <Stack spacing={1.5} divider={<Divider flexItem />}>
        <CostRow label="Costo de ingredientes" value={formatRecipeCurrency(baseCost)} />
        <CostRow label="Merma estimada" value={formatRecipeCurrency(wasteCost)} />
        <CostRow label="Costo total" value={formatRecipeCurrency(totalCost)} strong />
        <CostRow
          label="Rendimiento"
          value={normalizedYield > 0 ? String(normalizedYield) : '—'}
        />
        <CostRow
          label="Costo por rendimiento"
          value={costPerYield === null ? '—' : formatRecipeCurrency(costPerYield)}
          strong
        />
        <CostRow
          label="Precio de venta"
          value={salePrice === undefined ? '—' : formatRecipeCurrency(salePrice)}
        />
      </Stack>

      <Box
        sx={{
          bgcolor: margin !== null && margin < 65 ? 'rgba(183, 121, 31, 0.10)' : 'rgba(46, 125, 91, 0.10)',
          borderRadius: 2,
          mt: 2.5,
          p: 2,
        }}
      >
        <Typography color="text.secondary" variant="caption">Margen estimado</Typography>
        <Typography
          variant="h4"
          sx={{ color: margin !== null && margin < 65 ? 'warning.main' : 'success.main', mt: 0.25 }}
        >
          {formatRecipePercentage(margin)}
        </Typography>
      </Box>
    </Paper>
  );
}

function normalizeNumber(value: unknown) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
}

function CostRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
      <Typography color="text.secondary" variant="body2">{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: strong ? 800 : 600, textAlign: 'right' }}>
        {value}
      </Typography>
    </Stack>
  );
}
