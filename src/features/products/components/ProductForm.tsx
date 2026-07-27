import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Divider,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {
  Controller,
  useForm,
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';
import {
  productSchema,
  type ProductFormInput,
  type ProductFormValues,
} from '../schemas/productSchema';

const sections = [
  'Información general',
  'Precio',
  'Inventario',
  'Imagen',
  'Confirmación',
] as const;

const fieldGridSx = {
  display: 'grid',
  gridTemplateColumns: {
    xs: 'minmax(0, 1fr)',
    md: 'repeat(2, minmax(0, 1fr))',
  },
  gap: 2,
};

interface ProductFormProps {
  isSubmitting?: boolean;
  submitError?: string;
  onCancel: () => void;
  onSubmit: (values: ProductFormValues) => Promise<void>;
}

export function ProductForm({
  isSubmitting = false,
  submitError,
  onCancel,
  onSubmit,
}: ProductFormProps) {
  const [activeSection, setActiveSection] = useState(0);
  const {
      control,
      formState: { errors },
      getValues,
      handleSubmit,
      register,
      trigger,
    } = useForm<ProductFormInput, unknown, ProductFormValues>({
      resolver: zodResolver(productSchema),
      defaultValues: {
        name: '',
        sku: '',
        category: undefined,
        description: '',
        saleUnit: 'unit',
        salePrice: undefined,
        estimatedCost: undefined,
        taxRate: 21,
        isActive: true,
        isAvailableForSale: true,
        trackStock: false,
        initialStock: 0,
        minimumStock: 0,
        image: undefined,
      },
      mode: 'onBlur',
    });

  const proceed = async (fields: Array<keyof ProductFormValues>) => {
    if (await trigger(fields)) {
      setActiveSection((current) => Math.min(current + 1, sections.length - 1));
    }
  };

  const reviewValues = activeSection === 4 ? getValues() : undefined;
  const reviewSalePrice = normalizeNumber(reviewValues?.salePrice);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}

      <Stack component={Divider} />

      {sections.map((section, index) => (
        <Accordion
          key={section}
          expanded={activeSection === index}
          onChange={() => setActiveSection(index)}
          disableGutters
          elevation={0}
          square
          slotProps={{
            transition: {
              unmountOnExit: true,
            },
          }}
          sx={{ '&::before': { display: 'none' } }}
        >
          <AccordionSummary sx={{ minHeight: 76, px: { xs: 2, md: 3 } }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center'}}>
              <Box
                sx={{
                  alignItems: 'center',
                  bgcolor: index < activeSection ? 'success.main' : index === activeSection ? 'primary.main' : 'action.hover',
                  borderRadius: '50%',
                  color: index <= activeSection ? 'common.white' : 'text.secondary',
                  display: 'flex',
                  height: 30,
                  justifyContent: 'center',
                  width: 30,
                }}
              >
                {index < activeSection ? <Icon icon="solar:check-circle-linear" width={18} /> : index + 1}
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {section}
              </Typography>
            </Stack>
          </AccordionSummary>

          <AccordionDetails sx={{ px: { xs: 2, md: 8 }, pb: 3 }}>
            {index === 0 && (
              <Box sx={fieldGridSx}>
                <TextField
                  label="Nombre del producto"
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  {...register('name')}
                />
                <TextField
                  label="Código / SKU"
                  error={Boolean(errors.sku)}
                  helperText={errors.sku?.message}
                  {...register('sku')}
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Categoría"
                      value={field.value ?? ''}
                      error={Boolean(errors.category)}
                      helperText={errors.category?.message}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                        select: {
                          displayEmpty: true,
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Seleccionar categoría
                      </MenuItem>
                      <MenuItem value="main-course">
                        Platos principales
                      </MenuItem>
                      <MenuItem value="beverage">Bebidas</MenuItem>
                      <MenuItem value="dessert">Postres</MenuItem>
                      <MenuItem value="combo">Combos</MenuItem>
                    </TextField>
                  )}
                />
                <TextField
                  select
                  label="Unidad de venta"
                  slotProps={{ select: { native: true } }}
                  {...register('saleUnit')}
                >
                  <option value="unit">Unidad</option>
                  <option value="portion">Porción</option>
                  <option value="bottle">Botella</option>
                  <option value="kilogram">Kilogramo</option>
                </TextField>
                <TextField
                  multiline
                  minRows={3}
                  label="Descripción"
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                  sx={{ gridColumn: { md: '1 / -1' } }}
                  {...register('description')}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch checked={field.value} onChange={field.onChange} />}
                        label="Producto activo"
                      />
                    )}
                  />
                  <Controller
                    name="isAvailableForSale"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch checked={field.value} onChange={field.onChange} />}
                        label="Disponible para la venta"
                      />
                    )}
                  />
                </Stack>
              </Box>
            )}

            {index === 1 && (
              <Box sx={fieldGridSx}>
                <TextField
                  type="number"
                  label="Precio de venta"
                  error={Boolean(errors.salePrice)}
                  helperText={errors.salePrice?.message}
                  {...register('salePrice')}
                />
                <TextField
                  type="number"
                  label="Costo estimado"
                  error={Boolean(errors.estimatedCost)}
                  helperText={errors.estimatedCost?.message}
                  {...register('estimatedCost')}
                />
                <TextField
                  select
                  label="Impuesto"
                  slotProps={{ select: { native: true } }}
                  {...register('taxRate', { valueAsNumber: true })}
                >
                  <option value={21}>IVA 21%</option>
                  <option value={10.5}>IVA 10,5%</option>
                  <option value={0}>Exento</option>
                </TextField>
                <ProductMargin control={control} />
              </Box>
            )}

            {index === 2 && (
              <InventoryFields
                control={control}
                errors={errors}
                register={register}
              />
            )}

            {index === 3 && (
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange } }) => (
                  <Button component="label" variant="outlined" startIcon={<Icon icon="solar:upload-linear" width={20} />}>
                    Seleccionar imagen
                    <input
                      hidden
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(event) => onChange(event.target.files?.[0])}
                    />
                  </Button>
                )}
              />
            )}

            {index === 4 && (
              <Stack spacing={1.5} divider={<Divider flexItem />}>
                <ReviewRow
                  label="Producto"
                  value={reviewValues?.name || 'Sin nombre'}
                />
                <ReviewRow
                  label="Código"
                  value={reviewValues?.sku || 'Sin código'}
                />
                <ReviewRow
                  label="Precio"
                  value={
                    reviewSalePrice !== undefined
                      ? reviewSalePrice.toLocaleString('es-AR', {
                          style: 'currency',
                          currency: 'ARS',
                        })
                      : 'Sin definir'
                  }
                />
                <ReviewRow
                  label="Inventario"
                  value={
                    reviewValues?.trackStock
                      ? `${normalizeNumber(reviewValues.initialStock) ?? 0} unidades iniciales`
                      : 'Sin control de stock'
                  }
                />
              </Stack>
            )}

            <Stack direction="row" spacing={1.5} sx={{ mt: 3, justifyContent: 'flex-end' }}>
              {index > 0 && (
                <Button onClick={() => setActiveSection(index - 1)}>Anterior</Button>
              )}
              {index < sections.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={() => proceed(
                    index === 0
                      ? ['name', 'sku', 'category', 'description', 'saleUnit']
                      : index === 1
                        ? ['salePrice', 'estimatedCost', 'taxRate']
                        : index === 2
                          ? ['trackStock', 'initialStock', 'minimumStock']
                          : ['image'],
                  )}
                >
                  Guardar y continuar
                </Button>
              ) : (
                <>
                  <Button onClick={onCancel}>Cancelar</Button>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    {isSubmitting ? 'Creando…' : 'Crear producto'}
                  </Button>
                </>
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

function normalizeNumber(value: unknown): number | undefined {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : undefined;
}

function ProductMargin({
  control,
}: {
  control: Control<ProductFormInput>;
}) {
  const [salePriceValue, estimatedCostValue] = useWatch({
    control,
    name: ['salePrice', 'estimatedCost'],
  });
  const salePrice = normalizeNumber(salePriceValue);
  const estimatedCost = normalizeNumber(estimatedCostValue);
  const margin =
    salePrice !== undefined &&
    salePrice > 0 &&
    estimatedCost !== undefined
      ? ((salePrice - estimatedCost) / salePrice) * 100
      : null;

  return (
    <Box>
      <Typography color="text.secondary" variant="body2">
        Margen estimado
      </Typography>
      <Typography variant="h5">
        {margin === null ? '—' : `${margin.toFixed(1)}%`}
      </Typography>
    </Box>
  );
}

function InventoryFields({
  control,
  errors,
  register,
}: {
  control: Control<ProductFormInput>;
  errors: FieldErrors<ProductFormInput>;
  register: UseFormRegister<ProductFormInput>;
}) {
  const trackStock = useWatch({
    control,
    name: 'trackStock',
  });

  return (
    <Stack spacing={2}>
      <Controller
        name="trackStock"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                checked={field.value}
                onChange={field.onChange}
              />
            }
            label="Controlar stock de este producto"
          />
        )}
      />

      {trackStock && (
        <Box sx={fieldGridSx}>
          <TextField
            type="number"
            label="Stock inicial"
            error={Boolean(errors.initialStock)}
            helperText={errors.initialStock?.message}
            {...register('initialStock')}
          />
          <TextField
            type="number"
            label="Stock mínimo"
            error={Boolean(errors.minimumStock)}
            helperText={errors.minimumStock?.message}
            {...register('minimumStock')}
          />
        </Box>
      )}
    </Stack>
  );
}

function ReviewRow({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) {
    return (
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Typography color="text.secondary">
          {label}
        </Typography>

        <Typography
          sx={{
            fontWeight: 700,
            textAlign: 'right',
          }}
        >
          {value}
        </Typography>
      </Stack>
    );
  }
