import { Chip, type ChipProps } from '@mui/material';

import {
  RECIPE_COST_STATUS_LABELS,
  type RecipeCostStatus,
} from '../types/Recipe.types';

const costColor: Record<RecipeCostStatus, ChipProps['color']> = {
  healthy: 'success',
  warning: 'warning',
  critical: 'error',
  incomplete: 'default',
};

export function RecipeCostChip({ status }: { status: RecipeCostStatus }) {
  return (
    <Chip
      color={costColor[status]}
      label={RECIPE_COST_STATUS_LABELS[status]}
      size="small"
      variant={status === 'incomplete' ? 'outlined' : 'filled'}
      sx={{ fontWeight: 700 }}
    />
  );
}
