import {
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import {
  PRODUCT_CATEGORY_LABELS,
  SALE_UNIT_LABELS,
  type Product,
  type ProductStockStatus,
} from '../types/Product.types';
import {
  formatProductCurrency,
  formatProductRelativeTime,
  formatProductStock,
  getProductCurrentStock,
  getProductStockRatio,
  getProductStockStatus,
} from '../utils/productFormatters';
import { ProductStockChip } from './ProductStockChip';

const progressColor: Record<
  Exclude<ProductStockStatus, 'untracked'>,
  'error' | 'success' | 'warning'
> = {
  critical: 'error',
  low: 'warning',
  normal: 'success',
};

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({
  products,
}: ProductsTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table sx={{ minWidth: 1120 }}>
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell sx={{ minWidth: 180 }}>
              Nivel de stock
            </TableCell>
            <TableCell align="right">Stock actual</TableCell>
            <TableCell align="right">Mínimo</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell>Actualizado</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => {
            const stockStatus = getProductStockStatus(product);
            const stockRatio = getProductStockRatio(product);
            const currentStock = getProductCurrentStock(product);
            const saleUnit = SALE_UNIT_LABELS[product.saleUnit];
            const stockProgressColor =
              stockStatus === 'untracked'
                ? 'success'
                : progressColor[stockStatus];

            return (
              <TableRow
                key={product.id}
                hover
                sx={{
                  '&:last-child td': {
                    borderBottom: 0,
                  },
                }}
              >
                <TableCell>
                  <Stack spacing={0.25}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {product.name}
                    </Typography>
                    <Typography color="text.secondary" variant="caption">
                      {product.sku}
                    </Typography>
                  </Stack>
                </TableCell>

                <TableCell>
                  {PRODUCT_CATEGORY_LABELS[product.category]}
                </TableCell>

                <TableCell>
                  <Chip
                    color={product.isActive ? 'primary' : 'default'}
                    label={product.isActive ? 'Activo' : 'Inactivo'}
                    size="small"
                    variant={product.isActive ? 'filled' : 'outlined'}
                    sx={{ fontWeight: 700 }}
                  />
                </TableCell>

                <TableCell>
                  <ProductStockChip status={stockStatus} />
                </TableCell>

                <TableCell>
                  {stockRatio === null ? (
                    <Typography color="text.secondary" variant="caption">
                      No aplica
                    </Typography>
                  ) : (
                    <LinearProgress
                      color={stockProgressColor}
                      value={stockRatio}
                      variant="determinate"
                      aria-label={`Nivel de stock de ${product.name}`}
                      sx={{
                        borderRadius: 999,
                        height: 8,
                      }}
                    />
                  )}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}
                >
                  {product.trackStock
                    ? `${formatProductStock(currentStock)} ${saleUnit}`
                    : '—'}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
                >
                  {product.trackStock
                    ? `${formatProductStock(product.minimumStock ?? 0)} ${saleUnit}`
                    : '—'}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}
                >
                  {formatProductCurrency(product.salePrice)}
                </TableCell>

                <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                  {formatProductRelativeTime(product.updatedAt)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
