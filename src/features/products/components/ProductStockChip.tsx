import { Chip } from '@mui/material';

import type { ProductStockStatus } from '../types/Product.types';

const statusConfig: Record<
  ProductStockStatus,
  {
    label: string;
    color: 'default' | 'error' | 'success' | 'warning';
  }
> = {
  critical: {
    label: 'Crítico',
    color: 'error',
  },
  low: {
    label: 'Bajo',
    color: 'warning',
  },
  normal: {
    label: 'Normal',
    color: 'success',
  },
  untracked: {
    label: 'Sin control',
    color: 'default',
  },
};

interface ProductStockChipProps {
  status: ProductStockStatus;
}

export function ProductStockChip({
  status,
}: ProductStockChipProps) {
  const config = statusConfig[status];

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      variant="outlined"
      sx={{ fontWeight: 700 }}
    />
  );
}
