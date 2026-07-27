import { z } from 'zod';

const optionalNonNegativeNumber = z.preprocess(
  (value) => {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }

    return value;
  },
  z.coerce
    .number()
    .finite('Ingresá un número válido.')
    .min(0, 'El valor no puede ser negativo.')
    .optional(),
);

export const productSchema = z
  .object({
    name: z.string().trim().min(2, 'Ingresá el nombre del producto.'),
    sku: z.string().trim().min(1, 'Ingresá un código o SKU.'),
    category: z.enum(['main-course', 'beverage', 'dessert', 'combo'], {
      error: 'Seleccioná una categoría.',
    }),
    description: z.string().trim().max(500, 'La descripción admite hasta 500 caracteres.'),
    saleUnit: z.enum(['unit', 'portion', 'bottle', 'kilogram']),
    salePrice: z.coerce.number().positive('El precio debe ser mayor a cero.'),
    estimatedCost: optionalNonNegativeNumber,
    taxRate: z.union([z.literal(0), z.literal(10.5), z.literal(21)]),
    isActive: z.boolean(),
    isAvailableForSale: z.boolean(),
    trackStock: z.boolean(),
    initialStock: optionalNonNegativeNumber,
    minimumStock: optionalNonNegativeNumber,
    image: z.instanceof(File).optional(),
  })
  .superRefine((values, context) => {
    if (!values.trackStock) return;

    if (values.initialStock === undefined) {
      context.addIssue({
        code: 'custom',
        path: ['initialStock'],
        message: 'Ingresá el stock inicial.',
      });
    }

    if (values.minimumStock === undefined) {
      context.addIssue({
        code: 'custom',
        path: ['minimumStock'],
        message: 'Ingresá el stock mínimo.',
      });
    }
  });

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;