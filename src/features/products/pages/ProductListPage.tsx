import { useMemo } from 'react';

import { Icon } from '@iconify/react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { paths } from '../../../app/router/paths';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../app/store/hooks';
import { useGetProductsQuery } from '../api/ProductsApi';
import { ProductsEmptyState } from '../components/ProductsEmptyState';
import { ProductsFilters } from '../components/ProductsFilters';
import { ProductsTable } from '../components/ProductsTable';
import {
  resetProductsFilters,
  setProductsCategory,
  setProductsSearch,
  setProductsStatus,
} from '../store/ProductsSlice';
import { refreshProducts } from '../store/ProductsThunks';
import { PRODUCT_CATEGORY_LABELS } from '../types/Product.types';
import { getProductStockStatus } from '../utils/productFormatters';

export function ProductListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { search, category, status } = useAppSelector(
    (state) => state.products,
  );
  const {
    data,
    isError,
    isFetching,
    isLoading,
  } = useGetProductsQuery();

  const products = useMemo(
    () => data?.products ?? [],
    [data?.products],
  );
  const filteredProducts = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('es');

    return products.filter((product) => {
      if (category !== 'all' && product.category !== category) {
        return false;
      }

      if (status === 'active' && !product.isActive) {
        return false;
      }

      if (status === 'inactive' && product.isActive) {
        return false;
      }

      if (!term) {
        return true;
      }

      return (
        product.name.toLocaleLowerCase('es').includes(term) ||
        product.sku.toLocaleLowerCase('es').includes(term) ||
        product.description.toLocaleLowerCase('es').includes(term) ||
        PRODUCT_CATEGORY_LABELS[product.category]
          .toLocaleLowerCase('es')
          .includes(term)
      );
    });
  }, [category, products, search, status]);

  const criticalProducts = useMemo(
    () =>
      products.filter(
        (product) => getProductStockStatus(product) === 'critical',
      ),
    [products],
  );
  const hasActiveFilters =
    search.trim().length > 0 ||
    category !== 'all' ||
    status !== 'all';

  return (
    <Stack spacing={2.5}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          alignItems: { xs: 'stretch', sm: 'flex-start' },
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography component="h1" variant="h4" sx={{ mb: 0.75 }}>
            Productos
          </Typography>

          <Typography color="text.secondary">
            Consultá el catálogo, los precios y el nivel actual de stock.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{ flexWrap: 'wrap' }}
        >
          <Tooltip title="Disponible al conectar los movimientos de stock">
            <span>
              <Button
                variant="outlined"
                disabled
                startIcon={
                  <Icon icon="solar:sort-vertical-linear" width={20} />
                }
              >
                Registrar movimiento
              </Button>
            </span>
          </Tooltip>

          <Button
            variant="contained"
            onClick={() => navigate(paths.inventoryProductNew)}
            startIcon={
              <Icon icon="solar:add-circle-linear" width={20} />
            }
          >
            Agregar producto
          </Button>
        </Stack>
      </Stack>

      {!isLoading && criticalProducts.length > 0 && (
        <Alert severity="error" variant="outlined">
          <AlertTitle>
            {criticalProducts.length}{' '}
            {criticalProducts.length === 1
              ? 'producto con stock crítico'
              : 'productos con stock crítico'}
          </AlertTitle>
          Revisá los productos marcados en rojo antes de registrar nuevas
          ventas.
        </Alert>
      )}

      <Paper variant="outlined" sx={{ p: 2 }}>
        <ProductsFilters
          search={search}
          category={category}
          status={status}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={(value) => dispatch(setProductsSearch(value))}
          onCategoryChange={(value) =>
            dispatch(setProductsCategory(value))
          }
          onStatusChange={(value) => dispatch(setProductsStatus(value))}
          onReset={() => dispatch(resetProductsFilters())}
        />
      </Paper>

      {isFetching && !isLoading && <LinearProgress />}

      {isError ? (
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              onClick={() => dispatch(refreshProducts())}
            >
              Reintentar
            </Button>
          }
        >
          No pudimos cargar los productos. Intentá nuevamente.
        </Alert>
      ) : isLoading ? (
        <Skeleton variant="rounded" height={420} animation="wave" />
      ) : filteredProducts.length === 0 ? (
        <ProductsEmptyState />
      ) : (
        <ProductsTable products={filteredProducts} />
      )}
    </Stack>
  );
}
