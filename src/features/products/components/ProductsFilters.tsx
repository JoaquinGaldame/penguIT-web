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
  type ProductStatusFilter,
} from '../types/Product.types';

interface ProductsFiltersProps {
  search: string;
  category: ProductCategory | 'all';
  status: ProductStatusFilter;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: ProductCategory | 'all') => void;
  onStatusChange: (value: ProductStatusFilter) => void;
  onReset: () => void;
}

export function ProductsFilters({
  search,
  category,
  status,
  hasActiveFilters,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onReset,
}: ProductsFiltersProps) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'grid',
        gap: 1.5,
        gridTemplateColumns: {
          xs: 'minmax(0, 1fr)',
          md: 'minmax(0, 1fr) 210px 180px auto',
        },
      }}
    >
      <TextField
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar por producto, SKU o descripción"
        aria-label="Buscar productos"
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
          onCategoryChange(
            event.target.value as ProductCategory | 'all',
          )
        }
      >
        <MenuItem value="all">Todas las categorías</MenuItem>

        {(Object.keys(PRODUCT_CATEGORY_LABELS) as ProductCategory[]).map(
          (productCategory) => (
            <MenuItem key={productCategory} value={productCategory}>
              {PRODUCT_CATEGORY_LABELS[productCategory]}
            </MenuItem>
          ),
        )}
      </TextField>

      <TextField
        select
        label="Estado"
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value as ProductStatusFilter)
        }
      >
        <MenuItem value="all">Todos los estados</MenuItem>
        <MenuItem value="active">Activos</MenuItem>
        <MenuItem value="inactive">Inactivos</MenuItem>
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
