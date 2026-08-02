import { Icon } from '@iconify/react';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Controller,
  useFieldArray,
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';

import type { RecipeFormInput } from '../schemas/recipeSchema';
import {
  MEASUREMENT_UNIT_LABELS,
  type InventoryIngredient,
  type MeasurementUnit,
} from '../types/Recipe.types';
import { formatRecipeCurrency, getIngredientSubtotal } from '../utils/recipeFormatters';

interface RecipeIngredientsEditorProps {
  control: Control<RecipeFormInput>;
  errors: FieldErrors<RecipeFormInput>;
  inventoryIngredients: InventoryIngredient[];
  register: UseFormRegister<RecipeFormInput>;
  setValue: UseFormSetValue<RecipeFormInput>;
}

export function RecipeIngredientsEditor({
  control,
  errors,
  inventoryIngredients,
  register,
  setValue,
}: RecipeIngredientsEditorProps) {
  const { fields, append, remove } = useFieldArray({ control, name: 'ingredients' });

  return (
    <Stack spacing={1.5}>
      {typeof errors.ingredients?.message === 'string' && (
        <Typography color="error" variant="caption">{errors.ingredients.message}</Typography>
      )}

      {fields.length === 0 ? (
        <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, borderStyle: 'dashed', p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary" variant="body2">
            Todavía no agregaste ingredientes.
          </Typography>
        </Box>
      ) : (
        fields.map((field, index) => {
          return (
            <Paper key={field.id} variant="outlined" sx={{ p: 1.75 }}>
              <Box
                sx={{
                  alignItems: 'start',
                  display: 'grid',
                  gap: 1.25,
                  gridTemplateColumns: {
                    xs: 'minmax(0, 1fr)',
                    sm: 'repeat(2, minmax(0, 1fr))',
                    xl: 'minmax(220px, 1.5fr) 110px 110px 100px 135px 115px 40px',
                  },
                }}
              >
                <Controller
                  name={`ingredients.${index}.inventoryItemId`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <Autocomplete
                      options={inventoryIngredients}
                      value={inventoryIngredients.find((item) => item.id === controllerField.value) ?? null}
                      getOptionLabel={(option) => `${option.name} · ${option.sku}`}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      onChange={(_event, value) => {
                        controllerField.onChange(value?.id ?? '');
                        if (value) {
                          setValue(`ingredients.${index}.unit`, value.defaultUnit, { shouldValidate: true });
                          setValue(`ingredients.${index}.unitCost`, value.unitCost, { shouldValidate: true });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Insumo"
                          error={Boolean(errors.ingredients?.[index]?.inventoryItemId)}
                          helperText={errors.ingredients?.[index]?.inventoryItemId?.message}
                        />
                      )}
                      sx={{ gridColumn: { xs: '1 / -1', xl: 'auto' } }}
                    />
                  )}
                />
                <TextField
                  type="number"
                  label="Cantidad"
                  error={Boolean(errors.ingredients?.[index]?.quantity)}
                  helperText={errors.ingredients?.[index]?.quantity?.message}
                  slotProps={{ htmlInput: { min: 0, step: 'any' } }}
                  {...register(`ingredients.${index}.quantity`)}
                />
                <TextField
                  select
                  label="Unidad"
                  defaultValue={field.unit}
                  {...register(`ingredients.${index}.unit`)}
                >
                  {(Object.keys(MEASUREMENT_UNIT_LABELS) as MeasurementUnit[]).map((unit) => (
                    <MenuItem key={unit} value={unit}>{MEASUREMENT_UNIT_LABELS[unit]}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  type="number"
                  label="Merma %"
                  error={Boolean(errors.ingredients?.[index]?.wastePercentage)}
                  helperText={errors.ingredients?.[index]?.wastePercentage?.message}
                  slotProps={{ htmlInput: { min: 0, max: 100, step: 'any' } }}
                  {...register(`ingredients.${index}.wastePercentage`)}
                />
                <TextField
                  type="number"
                  label="Costo unitario"
                  error={Boolean(errors.ingredients?.[index]?.unitCost)}
                  helperText={errors.ingredients?.[index]?.unitCost?.message}
                  slotProps={{ htmlInput: { min: 0, step: 'any' } }}
                  {...register(`ingredients.${index}.unitCost`)}
                />
                <Box sx={{ pt: 1 }}>
                  <Typography color="text.secondary" variant="caption">Subtotal</Typography>
                  <IngredientSubtotal control={control} index={index} />
                </Box>
                <Tooltip title="Quitar ingrediente">
                  <IconButton onClick={() => remove(index)} aria-label={`Quitar ingrediente ${index + 1}`}>
                    <Icon icon="solar:trash-bin-trash-linear" width={20} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          );
        })
      )}

      <Button
        variant="outlined"
        onClick={() => append({ inventoryItemId: '', quantity: 1, unit: 'gram', wastePercentage: 0, unitCost: 0 })}
        startIcon={<Icon icon="solar:add-circle-linear" width={20} />}
        sx={{ alignSelf: 'flex-start' }}
      >
        Agregar ingrediente
      </Button>
    </Stack>
  );
}

function IngredientSubtotal({
  control,
  index,
}: {
  control: Control<RecipeFormInput>;
  index: number;
}) {
  const ingredient = useWatch({ control, name: `ingredients.${index}` });
  const quantity = Number(ingredient?.quantity) || 0;
  const unitCost = Number(ingredient?.unitCost) || 0;
  const wastePercentage = Number(ingredient?.wastePercentage) || 0;

  return (
    <Typography variant="body2" sx={{ fontWeight: 800 }}>
      {formatRecipeCurrency(
        getIngredientSubtotal(quantity, unitCost, wastePercentage),
      )}
    </Typography>
  );
}
