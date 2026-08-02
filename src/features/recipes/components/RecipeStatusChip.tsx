import { Chip, type ChipProps } from '@mui/material';

import {
  RECIPE_STATUS_LABELS,
  type RecipeStatus,
} from '../types/Recipe.types';

const statusColor: Record<RecipeStatus, ChipProps['color']> = {
  active: 'success',
  draft: 'warning',
  inactive: 'default',
};

export function RecipeStatusChip({
  status,
  size = 'small',
}: {
  status: RecipeStatus;
  size?: ChipProps['size'];
}) {
  return (
    <Chip
      color={statusColor[status]}
      label={RECIPE_STATUS_LABELS[status]}
      size={size}
      variant={status === 'inactive' ? 'outlined' : 'filled'}
      sx={{ fontWeight: 700 }}
    />
  );
}
