import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  TextField,
} from '@mui/material';

import {
  PRODUCT_CATEGORY_LABELS,
  type ProductCategory,
} from '../../products/types/Product.types';
import {
  RECIPE_COST_STATUS_LABELS,
  RECIPE_STATUS_LABELS,
  type RecipeCostFilter,
  type RecipeCostStatus,
  type RecipeStatus,
  type RecipeStatusFilter,
} from '../types/Recipe.types';

interface RecipesFiltersProps {
  search: string;
  category: ProductCategory | 'all';
  status: RecipeStatusFilter;
  costStatus: RecipeCostFilter;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: ProductCategory | 'all') => void;
  onStatusChange: (value: RecipeStatusFilter) => void;
  onCostStatusChange: (value: RecipeCostFilter) => void;
  onReset: () => void;
}

export function RecipesFilters({
  search,
  category,
  status,
  costStatus,
  hasActiveFilters,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onCostStatusChange,
  onReset,
}: RecipesFiltersProps) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'grid',
        gap: 1.5,
        gridTemplateColumns: {
          xs: 'minmax(0, 1fr)',
          lg: 'minmax(240px, 1fr) 190px 170px 210px auto',
        },
      }}
    >
      <TextField
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar por receta, código o producto"
        aria-label="Buscar recetas"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="solar:magnifer-linear" width={20} />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        select
        label="Categoría"
        value={category}
        onChange={(event) =>
          onCategoryChange(event.target.value as ProductCategory | 'all')
        }
      >
        <MenuItem value="all">Todas</MenuItem>
        {(Object.keys(PRODUCT_CATEGORY_LABELS) as ProductCategory[]).map(
          (item) => (
            <MenuItem key={item} value={item}>
              {PRODUCT_CATEGORY_LABELS[item]}
            </MenuItem>
          ),
        )}
      </TextField>

      <TextField
        select
        label="Estado"
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as RecipeStatusFilter)
        }
      >
        <MenuItem value="all">Todos</MenuItem>
        {(Object.keys(RECIPE_STATUS_LABELS) as RecipeStatus[]).map((item) => (
          <MenuItem key={item} value={item}>
            {RECIPE_STATUS_LABELS[item]}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Situación del costo"
        value={costStatus}
        onChange={(event) =>
          onCostStatusChange(event.target.value as RecipeCostFilter)
        }
      >
        <MenuItem value="all">Todas</MenuItem>
        {(Object.keys(RECIPE_COST_STATUS_LABELS) as RecipeCostStatus[]).map(
          (item) => (
            <MenuItem key={item} value={item}>
              {RECIPE_COST_STATUS_LABELS[item]}
            </MenuItem>
          ),
        )}
      </TextField>

      {hasActiveFilters && (
        <Button
          color="inherit"
          onClick={onReset}
          startIcon={<Icon icon="solar:restart-linear" width={19} />}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Limpiar
        </Button>
      )}
    </Box>
  );
}
