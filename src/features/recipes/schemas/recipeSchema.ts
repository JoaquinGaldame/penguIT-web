import { z } from 'zod';

const positiveNumber = (message: string) =>
  z.coerce.number().finite('Ingresá un número válido.').positive(message);

const optionalPositiveNumber = z.preprocess(
  (value) => (value === '' || value === null || value === undefined ? undefined : value),
  z.coerce.number().finite('Ingresá un número válido.').positive('El valor debe ser mayor a cero.').optional(),
);

const ingredientSchema = z.object({
  inventoryItemId: z.string().min(1, 'Seleccioná un insumo.'),
  quantity: positiveNumber('La cantidad debe ser mayor a cero.'),
  unit: z.enum(['gram', 'kilogram', 'milliliter', 'liter', 'unit']),
  wastePercentage: z.coerce
    .number()
    .finite('Ingresá un porcentaje válido.')
    .min(0, 'La merma no puede ser negativa.')
    .max(100, 'La merma no puede superar el 100%.'),
  unitCost: positiveNumber('El costo debe ser mayor a cero.'),
});

export const recipeSchema = z
  .object({
    name: z.string().trim().min(2, 'Ingresá el nombre de la receta.'),
    code: z.string().trim().min(1, 'Ingresá un código.'),
    productId: z.string().min(1, 'Seleccioná el producto asociado.'),
    description: z.string().trim().max(500, 'La descripción admite hasta 500 caracteres.'),
    image: z.instanceof(File).optional(),
    status: z.enum(['draft', 'active', 'inactive']),
    yieldQuantity: positiveNumber('El rendimiento debe ser mayor a cero.'),
    yieldUnit: z.enum(['unit', 'portion', 'kilogram', 'liter']),
    preparationTimeMinutes: optionalPositiveNumber,
    ingredients: z.array(ingredientSchema),
    steps: z.array(
      z.object({
        description: z.string().trim().min(2, 'Describí el paso o eliminá la fila.'),
      }),
    ),
  })
  .superRefine((values, context) => {
    if (values.status !== 'active') return;

    if (values.ingredients.length === 0) {
      context.addIssue({
        code: 'custom',
        path: ['ingredients'],
        message: 'Agregá al menos un ingrediente para activar la receta.',
      });
    }

    if (values.steps.length === 0) {
      context.addIssue({
        code: 'custom',
        path: ['steps'],
        message: 'Agregá al menos un paso de preparación para activar la receta.',
      });
    }
  });

export type RecipeFormInput = z.input<typeof recipeSchema>;
export type RecipeFormValues = z.infer<typeof recipeSchema>;
