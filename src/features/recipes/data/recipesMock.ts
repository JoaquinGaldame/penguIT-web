import type {
  InventoryIngredient,
  Recipe,
} from '../types/Recipe.types';

export const recipeIngredientsMock: InventoryIngredient[] = [
  { id: 'ingredient-001', name: 'Carne vacuna picada', sku: 'INS-CAR-01', defaultUnit: 'gram', unitCost: 8.2, isActive: true },
  { id: 'ingredient-002', name: 'Pan de hamburguesa', sku: 'INS-PAN-04', defaultUnit: 'unit', unitCost: 520, isActive: true },
  { id: 'ingredient-003', name: 'Queso cheddar', sku: 'INS-QUE-02', defaultUnit: 'gram', unitCost: 9.5, isActive: true },
  { id: 'ingredient-004', name: 'Tomate', sku: 'INS-VER-07', defaultUnit: 'gram', unitCost: 2.4, isActive: true },
  { id: 'ingredient-005', name: 'Lechuga', sku: 'INS-VER-03', defaultUnit: 'gram', unitCost: 1.8, isActive: true },
  { id: 'ingredient-006', name: 'Harina 000', sku: 'INS-HAR-01', defaultUnit: 'gram', unitCost: 1.15, isActive: true },
  { id: 'ingredient-007', name: 'Mozzarella', sku: 'INS-QUE-05', defaultUnit: 'gram', unitCost: 7.8, isActive: true },
  { id: 'ingredient-008', name: 'Salsa de tomate', sku: 'INS-SAL-02', defaultUnit: 'gram', unitCost: 2.1, isActive: true },
  { id: 'ingredient-009', name: 'Limón', sku: 'INS-FRU-03', defaultUnit: 'unit', unitCost: 310, isActive: true },
  { id: 'ingredient-010', name: 'Azúcar', sku: 'INS-AZU-01', defaultUnit: 'gram', unitCost: 1.3, isActive: true },
  { id: 'ingredient-011', name: 'Menta fresca', sku: 'INS-HIE-02', defaultUnit: 'gram', unitCost: 4.2, isActive: true },
  { id: 'ingredient-012', name: 'Queso crema', sku: 'INS-QUE-09', defaultUnit: 'gram', unitCost: 6.9, isActive: true },
  { id: 'ingredient-013', name: 'Frutos rojos', sku: 'INS-FRU-12', defaultUnit: 'gram', unitCost: 11.4, isActive: true },
  { id: 'ingredient-014', name: 'Galletitas de vainilla', sku: 'INS-GAL-03', defaultUnit: 'gram', unitCost: 3.5, isActive: true },
];

export const recipesMock: Recipe[] = [
  {
    id: 'recipe-001', name: 'Hamburguesa clásica', code: 'REC-HAM-001', productId: 'product-001',
    description: 'Preparación estándar de hamburguesa clásica con vegetales frescos.', status: 'active',
    yieldQuantity: 1, yieldUnit: 'portion', preparationTimeMinutes: 18,
    ingredients: [
      { id: 'ri-001', inventoryItemId: 'ingredient-001', name: 'Carne vacuna picada', quantity: 180, unit: 'gram', wastePercentage: 5, unitCost: 8.2 },
      { id: 'ri-002', inventoryItemId: 'ingredient-002', name: 'Pan de hamburguesa', quantity: 1, unit: 'unit', wastePercentage: 0, unitCost: 520 },
      { id: 'ri-003', inventoryItemId: 'ingredient-003', name: 'Queso cheddar', quantity: 40, unit: 'gram', wastePercentage: 0, unitCost: 9.5 },
      { id: 'ri-004', inventoryItemId: 'ingredient-004', name: 'Tomate', quantity: 45, unit: 'gram', wastePercentage: 8, unitCost: 2.4 },
      { id: 'ri-005', inventoryItemId: 'ingredient-005', name: 'Lechuga', quantity: 20, unit: 'gram', wastePercentage: 12, unitCost: 1.8 },
    ],
    steps: [
      { id: 'rs-001', description: 'Formar y condimentar la hamburguesa.' },
      { id: 'rs-002', description: 'Cocinar la carne y fundir el queso.' },
      { id: 'rs-003', description: 'Tostar el pan y montar con los vegetales.' },
    ],
    createdAt: '2026-07-10T14:20:00.000Z', updatedAt: '2026-07-29T10:30:00.000Z',
  },
  {
    id: 'recipe-002', name: 'Pizza mozzarella', code: 'REC-PIZ-004', productId: 'product-002',
    description: 'Pizza de masa artesanal, salsa de tomate y mozzarella.', status: 'active',
    yieldQuantity: 8, yieldUnit: 'portion', preparationTimeMinutes: 55,
    ingredients: [
      { id: 'ri-006', inventoryItemId: 'ingredient-006', name: 'Harina 000', quantity: 500, unit: 'gram', wastePercentage: 3, unitCost: 1.15 },
      { id: 'ri-007', inventoryItemId: 'ingredient-007', name: 'Mozzarella', quantity: 350, unit: 'gram', wastePercentage: 2, unitCost: 7.8 },
      { id: 'ri-008', inventoryItemId: 'ingredient-008', name: 'Salsa de tomate', quantity: 220, unit: 'gram', wastePercentage: 0, unitCost: 2.1 },
    ],
    steps: [
      { id: 'rs-004', description: 'Amasar y dejar fermentar la masa.' },
      { id: 'rs-005', description: 'Estirar, cubrir con salsa y mozzarella.' },
      { id: 'rs-006', description: 'Hornear hasta dorar y cortar en ocho porciones.' },
    ],
    createdAt: '2026-07-08T11:10:00.000Z', updatedAt: '2026-07-28T16:15:00.000Z',
  },
  {
    id: 'recipe-003', name: 'Limonada con menta', code: 'REC-BEB-012', productId: 'product-003',
    description: 'Limonada natural macerada con menta fresca.', status: 'active',
    yieldQuantity: 4, yieldUnit: 'liter', preparationTimeMinutes: 12,
    ingredients: [
      { id: 'ri-009', inventoryItemId: 'ingredient-009', name: 'Limón', quantity: 8, unit: 'unit', wastePercentage: 5, unitCost: 310 },
      { id: 'ri-010', inventoryItemId: 'ingredient-010', name: 'Azúcar', quantity: 300, unit: 'gram', wastePercentage: 0, unitCost: 1.3 },
      { id: 'ri-011', inventoryItemId: 'ingredient-011', name: 'Menta fresca', quantity: 35, unit: 'gram', wastePercentage: 10, unitCost: 4.2 },
    ],
    steps: [{ id: 'rs-007', description: 'Exprimir los limones y mezclar con azúcar y agua.' }, { id: 'rs-008', description: 'Agregar menta, macerar y refrigerar.' }],
    createdAt: '2026-07-15T09:00:00.000Z', updatedAt: '2026-07-27T12:18:00.000Z',
  },
  {
    id: 'recipe-004', name: 'Cheesecake de frutos rojos', code: 'REC-POS-008', productId: 'product-005',
    description: 'Cheesecake cremoso con base de galletitas y salsa de frutos rojos.', status: 'draft',
    yieldQuantity: 12, yieldUnit: 'portion', preparationTimeMinutes: 90,
    ingredients: [
      { id: 'ri-012', inventoryItemId: 'ingredient-012', name: 'Queso crema', quantity: 800, unit: 'gram', wastePercentage: 2, unitCost: 6.9 },
      { id: 'ri-013', inventoryItemId: 'ingredient-013', name: 'Frutos rojos', quantity: 300, unit: 'gram', wastePercentage: 8, unitCost: 11.4 },
      { id: 'ri-014', inventoryItemId: 'ingredient-014', name: 'Galletitas de vainilla', quantity: 250, unit: 'gram', wastePercentage: 0, unitCost: 3.5 },
    ],
    steps: [{ id: 'rs-009', description: 'Preparar y compactar la base.' }, { id: 'rs-010', description: 'Incorporar el relleno y hornear.' }],
    createdAt: '2026-07-20T10:30:00.000Z', updatedAt: '2026-07-26T22:35:00.000Z',
  },
  {
    id: 'recipe-005', name: 'Brownie con helado', code: 'REC-POS-011', productId: 'product-006',
    description: 'Receta pendiente de completar antes de volver a habilitar el producto.', status: 'inactive',
    yieldQuantity: 10, yieldUnit: 'portion', preparationTimeMinutes: 45,
    ingredients: [], steps: [],
    createdAt: '2026-06-20T15:15:00.000Z', updatedAt: '2026-07-25T18:20:00.000Z',
  },
];
