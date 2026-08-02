import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  Controller,
  useFieldArray,
  useForm,
  useWatch,
} from 'react-hook-form';

import { useGetProductsQuery } from '../../products/api/ProductsApi';
import { PRODUCT_CATEGORY_LABELS } from '../../products/types/Product.types';
import { useGetRecipeIngredientsQuery } from '../api/RecipesApi';
import {
  recipeSchema,
  type RecipeFormInput,
  type RecipeFormValues,
} from '../schemas/recipeSchema';
import {
  RECIPE_STATUS_LABELS,
  RECIPE_YIELD_UNIT_LABELS,
  type Recipe,
  type RecipeStatus,
  type RecipeYieldUnit,
} from '../types/Recipe.types';
import { RecipeCostSummary } from './RecipeCostSummary';
import { RecipeIngredientsEditor } from './RecipeIngredientsEditor';

interface RecipeFormProps {
  recipe?: Recipe;
  isSubmitting?: boolean;
  submitError?: string;
  onCancel: () => void;
  onSubmit: (values: RecipeFormValues) => Promise<void>;
}

export function RecipeForm({
  recipe,
  isSubmitting = false,
  submitError,
  onCancel,
  onSubmit,
}: RecipeFormProps) {
  const [requestedAction, setRequestedAction] = useState<'draft' | 'save'>();
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = useForm<RecipeFormInput, unknown, RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: getDefaultValues(recipe),
    mode: 'onBlur',
  });
  const {
    fields: stepFields,
    append: appendStep,
    move: moveStep,
    remove: removeStep,
  } =
    useFieldArray({ control, name: 'steps' });
  const { data: productsData, isLoading: productsLoading } = useGetProductsQuery();
  const { data: ingredientsData, isLoading: ingredientsLoading } =
    useGetRecipeIngredientsQuery();
  const [productId, yieldQuantity, ingredients] = useWatch({
    control,
    name: ['productId', 'yieldQuantity', 'ingredients'],
  });
  const products = productsData?.products.filter((product) => product.isAvailableForSale) ?? [];
  const selectedProduct = products.find((product) => product.id === productId);

  const submitWithStatus = (status: RecipeStatus, action: 'draft' | 'save') => {
    setRequestedAction(action);
    setValue('status', status, { shouldValidate: true });
    void handleSubmit(onSubmit)();
  };

  if (productsLoading || ingredientsLoading) {
    return (
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 320px' } }}>
        <Skeleton variant="rounded" height={720} animation="wave" />
        <Skeleton variant="rounded" height={420} animation="wave" />
      </Box>
    );
  }

  return (
    <Box component="form" noValidate onSubmit={(event) => event.preventDefault()}>
      {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}

      <Box
        sx={{
          alignItems: 'start',
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', lg: 'minmax(0, 1fr) 320px' },
        }}
      >
        <Stack spacing={2.5}>
          <FormSection
            title="Información general"
            description="Identificá la receta y vinculala con el producto que se vende."
          >
            <Box sx={fieldGridSx}>
              <TextField
                label="Nombre de la receta"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                {...register('name')}
              />
              <TextField
                label="Código"
                error={Boolean(errors.code)}
                helperText={errors.code?.message}
                {...register('code')}
              />
              <Controller
                name="productId"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={products}
                    value={products.find((product) => product.id === field.value) ?? null}
                    getOptionLabel={(product) => `${product.name} · ${product.sku}`}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(_event, value) => field.onChange(value?.id ?? '')}
                    renderOption={(props, product) => (
                      <li {...props} key={product.id}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{product.name}</Typography>
                          <Typography color="text.secondary" variant="caption">
                            {product.sku} · {PRODUCT_CATEGORY_LABELS[product.category]}
                          </Typography>
                        </Box>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Producto asociado"
                        error={Boolean(errors.productId)}
                        helperText={errors.productId?.message}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select label="Estado">
                    {(Object.keys(RECIPE_STATUS_LABELS) as RecipeStatus[]).map((status) => (
                      <MenuItem key={status} value={status}>{RECIPE_STATUS_LABELS[status]}</MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <TextField
                multiline
                minRows={3}
                label="Descripción"
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                sx={{ gridColumn: { md: '1 / -1' } }}
                {...register('description')}
              />
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ alignItems: { sm: 'center' }, gridColumn: { md: '1 / -1' } }}>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<Icon icon="solar:upload-linear" width={20} />}
                    >
                      Seleccionar imagen
                      <input
                        hidden
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(event) => onChange(event.target.files?.[0])}
                      />
                    </Button>
                    <Typography color="text.secondary" variant="body2">
                      {value instanceof File
                        ? value.name
                        : recipe?.imageUrl
                          ? 'Se conservará la imagen actual.'
                          : 'PNG, JPG o WebP.'}
                    </Typography>
                  </Stack>
                )}
              />
            </Box>
          </FormSection>

          <FormSection
            title="Rendimiento"
            description="Indicá cuánto produce una preparación completa."
          >
            <Box sx={fieldGridSx}>
              <TextField
                type="number"
                label="Cantidad producida"
                error={Boolean(errors.yieldQuantity)}
                helperText={errors.yieldQuantity?.message}
                slotProps={{ htmlInput: { min: 0, step: 'any' } }}
                {...register('yieldQuantity')}
              />
              <Controller
                name="yieldUnit"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select label="Unidad de rendimiento">
                    {(Object.keys(RECIPE_YIELD_UNIT_LABELS) as RecipeYieldUnit[]).map((unit) => (
                      <MenuItem key={unit} value={unit}>{RECIPE_YIELD_UNIT_LABELS[unit]}</MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <TextField
                type="number"
                label="Tiempo de preparación (min)"
                error={Boolean(errors.preparationTimeMinutes)}
                helperText={errors.preparationTimeMinutes?.message}
                slotProps={{ htmlInput: { min: 1 } }}
                {...register('preparationTimeMinutes')}
              />
            </Box>
          </FormSection>

          <FormSection
            title="Ingredientes"
            description="Definí cantidades, unidades, costos y mermas de cada insumo."
          >
            <RecipeIngredientsEditor
              control={control}
              errors={errors}
              inventoryIngredients={ingredientsData?.ingredients ?? []}
              register={register}
              setValue={setValue}
            />
          </FormSection>

          <FormSection
            title="Preparación"
            description="Registrá los pasos para estandarizar la elaboración."
          >
            <Stack spacing={1.25}>
              {typeof errors.steps?.message === 'string' && (
                <Typography color="error" variant="caption">{errors.steps.message}</Typography>
              )}
              {stepFields.map((field, index) => (
                <Stack key={field.id} direction="row" spacing={1.25} sx={{ alignItems: 'flex-start' }}>
                  <Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', color: 'common.white', display: 'grid', flexShrink: 0, fontSize: 12, fontWeight: 800, height: 28, mt: 1.5, placeItems: 'center', width: 28 }}>
                    {index + 1}
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    label={`Paso ${index + 1}`}
                    error={Boolean(errors.steps?.[index]?.description)}
                    helperText={errors.steps?.[index]?.description?.message}
                    {...register(`steps.${index}.description`)}
                  />
                  <Stack sx={{ mt: 0.5 }}>
                    <IconButton
                      size="small"
                      disabled={index === 0}
                      onClick={() => moveStep(index, index - 1)}
                      aria-label={`Subir paso ${index + 1}`}
                    >
                      <Icon icon="solar:alt-arrow-up-linear" width={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      disabled={index === stepFields.length - 1}
                      onClick={() => moveStep(index, index + 1)}
                      aria-label={`Bajar paso ${index + 1}`}
                    >
                      <Icon icon="solar:alt-arrow-down-linear" width={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => removeStep(index)}
                      aria-label={`Quitar paso ${index + 1}`}
                    >
                      <Icon icon="solar:trash-bin-trash-linear" width={18} />
                    </IconButton>
                  </Stack>
                </Stack>
              ))}
              {stepFields.length === 0 && (
                <Typography color="text.secondary" variant="body2">
                  Todavía no agregaste pasos de preparación.
                </Typography>
              )}
              <Button
                variant="outlined"
                onClick={() => appendStep({ description: '' })}
                startIcon={<Icon icon="solar:add-circle-linear" width={20} />}
                sx={{ alignSelf: 'flex-start' }}
              >
                Agregar paso
              </Button>
            </Stack>
          </FormSection>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack
              direction={{ xs: 'column-reverse', sm: 'row' }}
              spacing={1.5}
              sx={{ justifyContent: 'flex-end' }}
            >
              <Button onClick={onCancel} disabled={isSubmitting}>Cancelar</Button>
              <Button
                variant="outlined"
                disabled={isSubmitting}
                onClick={() => submitWithStatus('draft', 'draft')}
                startIcon={
                  isSubmitting && requestedAction === 'draft'
                    ? <CircularProgress size={18} />
                    : <Icon icon="solar:diskette-linear" width={20} />
                }
              >
                {isSubmitting && requestedAction === 'draft' ? 'Guardando…' : 'Guardar borrador'}
              </Button>
              <Button
                variant="contained"
                disabled={isSubmitting}
                onClick={() => submitWithStatus(getValues('status'), 'save')}
                startIcon={
                  isSubmitting && requestedAction === 'save'
                    ? <CircularProgress color="inherit" size={18} />
                    : <Icon icon="solar:check-circle-linear" width={20} />
                }
              >
                {isSubmitting && requestedAction === 'save' ? 'Guardando…' : 'Guardar receta'}
              </Button>
            </Stack>
          </Paper>
        </Stack>

        <RecipeCostSummary
          ingredients={ingredients}
          yieldQuantity={yieldQuantity}
          salePrice={selectedProduct?.salePrice}
        />
      </Box>
    </Box>
  );
}

const fieldGridSx = {
  display: 'grid',
  gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
  gap: 2,
};

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <Box sx={{ px: { xs: 2, md: 2.5 }, py: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mt: 0.25 }}>
          {description}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: { xs: 2, md: 2.5 } }}>{children}</Box>
    </Paper>
  );
}

function getDefaultValues(recipe?: Recipe): RecipeFormInput {
  return {
    name: recipe?.name ?? '',
    code: recipe?.code ?? '',
    productId: recipe?.productId ?? '',
    description: recipe?.description ?? '',
    image: undefined,
    status: recipe?.status ?? 'active',
    yieldQuantity: recipe?.yieldQuantity ?? 1,
    yieldUnit: recipe?.yieldUnit ?? 'portion',
    preparationTimeMinutes: recipe?.preparationTimeMinutes ?? '',
    ingredients:
      recipe?.ingredients.map((ingredient) => ({
        inventoryItemId: ingredient.inventoryItemId,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        wastePercentage: ingredient.wastePercentage,
        unitCost: ingredient.unitCost,
      })) ?? [],
    steps: recipe?.steps.map((step) => ({ description: step.description })) ?? [],
  };
}
