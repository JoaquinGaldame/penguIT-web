import { Icon } from '@iconify/react';
import {
  Box,
  Card,
  CardActionArea,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { PRODUCT_CATEGORY_LABELS } from '../../products/types/Product.types';
import {
  RECIPE_YIELD_UNIT_LABELS,
  type RecipeListItem,
} from '../types/Recipe.types';
import {
  formatRecipeCurrency,
  formatRecipePercentage,
  getRecipeCostPerYield,
  getRecipeCostStatus,
  getRecipeMarginPercentage,
  getRecipeTotalCost,
} from '../utils/recipeFormatters';
import { RecipeCostChip } from './RecipeCostChip';
import { RecipeStatusChip } from './RecipeStatusChip';

interface RecipesTableProps {
  recipes: RecipeListItem[];
  onSelect: (recipeId: string) => void;
  onEdit: (recipeId: string) => void;
}

export function RecipesTable({ recipes, onSelect, onEdit }: RecipesTableProps) {
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('md'));

  if (compact) {
    return (
      <Stack spacing={1.5}>
        {recipes.map((recipe) => {
          const costPerYield = getRecipeCostPerYield(recipe);
          const margin = getRecipeMarginPercentage(recipe, recipe.salePrice);
          const costStatus = getRecipeCostStatus(recipe, recipe.salePrice);

          return (
            <Card key={recipe.id} variant="outlined">
              <CardActionArea
                onClick={() => onSelect(recipe.id)}
                aria-label={`Ver detalle de ${recipe.name}`}
                sx={{ p: 2 }}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                    <RecipeAvatar name={recipe.name} imageUrl={recipe.imageUrl} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                        {recipe.name}
                      </Typography>
                      <Typography color="text.secondary" variant="caption">
                        {recipe.code} · {recipe.productName}
                      </Typography>
                    </Box>
                    <RecipeStatusChip status={recipe.status} />
                  </Stack>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                      gap: 1,
                    }}
                  >
                    <CompactValue
                      label="Rendimiento"
                      value={`${recipe.yieldQuantity} ${RECIPE_YIELD_UNIT_LABELS[recipe.yieldUnit]}`}
                    />
                    <CompactValue
                      label="Costo"
                      value={costPerYield === null ? '—' : formatRecipeCurrency(costPerYield)}
                    />
                    <CompactValue label="Margen" value={formatRecipePercentage(margin)} />
                  </Box>

                  <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <RecipeCostChip status={costStatus} />
                    <Icon icon="solar:alt-arrow-right-linear" width={19} />
                  </Stack>
                </Stack>
              </CardActionArea>
            </Card>
          );
        })}
      </Stack>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 1180 }}>
        <TableHead>
          <TableRow>
            <TableCell>Receta</TableCell>
            <TableCell>Producto asociado</TableCell>
            <TableCell>Rendimiento</TableCell>
            <TableCell align="right">Costo total</TableCell>
            <TableCell align="right">Costo por porción</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Margen</TableCell>
            <TableCell>Situación</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipes.map((recipe) => {
            const totalCost = getRecipeTotalCost(recipe);
            const costPerYield = getRecipeCostPerYield(recipe);
            const margin = getRecipeMarginPercentage(recipe, recipe.salePrice);
            const costStatus = getRecipeCostStatus(recipe, recipe.salePrice);

            return (
              <TableRow
                key={recipe.id}
                hover
                onClick={() => onSelect(recipe.id)}
                sx={{ cursor: 'pointer', '&:last-child td': { borderBottom: 0 } }}
              >
                <TableCell>
                  <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
                    <RecipeAvatar name={recipe.name} imageUrl={recipe.imageUrl} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        {recipe.name}
                      </Typography>
                      <Typography color="text.secondary" variant="caption">
                        {recipe.code}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {recipe.productName}
                  </Typography>
                  <Typography color="text.secondary" variant="caption">
                    {PRODUCT_CATEGORY_LABELS[recipe.productCategory]}
                  </Typography>
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {recipe.yieldQuantity} {RECIPE_YIELD_UNIT_LABELS[recipe.yieldUnit]}
                </TableCell>
                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                  {recipe.ingredients.length === 0 ? '—' : formatRecipeCurrency(totalCost)}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, whiteSpace: 'nowrap' }}>
                  {costPerYield === null || recipe.ingredients.length === 0
                    ? '—'
                    : formatRecipeCurrency(costPerYield)}
                </TableCell>
                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                  {formatRecipeCurrency(recipe.salePrice)}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 800 }}>
                  {formatRecipePercentage(margin)}
                </TableCell>
                <TableCell><RecipeCostChip status={costStatus} /></TableCell>
                <TableCell><RecipeStatusChip status={recipe.status} /></TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar receta">
                    <IconButton
                      size="small"
                      aria-label={`Editar ${recipe.name}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onEdit(recipe.id);
                      }}
                    >
                      <Icon icon="solar:pen-2-linear" width={20} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Ver detalle">
                    <IconButton
                      size="small"
                      aria-label={`Ver detalle de ${recipe.name}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelect(recipe.id);
                      }}
                    >
                      <Icon icon="solar:eye-linear" width={20} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function RecipeAvatar({ name, imageUrl }: { name: string; imageUrl?: string }) {
  if (imageUrl) {
    return (
      <Box
        component="img"
        src={imageUrl}
        alt=""
        sx={{ borderRadius: 2, flexShrink: 0, height: 40, objectFit: 'cover', width: 40 }}
      />
    );
  }

  return (
    <Box
      sx={{
        bgcolor: 'rgba(20, 103, 193, 0.10)',
        borderRadius: 2,
        color: 'primary.main',
        display: 'grid',
        flexShrink: 0,
        fontWeight: 800,
        height: 40,
        placeItems: 'center',
        width: 40,
      }}
    >
      {name.slice(0, 1).toLocaleUpperCase('es')}
    </Box>
  );
}

function CompactValue({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography color="text.secondary" variant="caption">{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 700 }}>{value}</Typography>
    </Box>
  );
}
