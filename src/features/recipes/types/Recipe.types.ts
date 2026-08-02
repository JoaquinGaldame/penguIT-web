import type { ProductCategory } from '../../products/types/Product.types';

export type RecipeStatus = 'draft' | 'active' | 'inactive';

export type MeasurementUnit =
  | 'gram'
  | 'kilogram'
  | 'milliliter'
  | 'liter'
  | 'unit';

export type RecipeYieldUnit = 'unit' | 'portion' | 'kilogram' | 'liter';

export type RecipeCostStatus = 'healthy' | 'warning' | 'critical' | 'incomplete';

export interface InventoryIngredient {
  id: string;
  name: string;
  sku: string;
  defaultUnit: MeasurementUnit;
  unitCost: number;
  isActive: boolean;
}

export interface RecipeIngredient {
  id: string;
  inventoryItemId: string;
  name: string;
  quantity: number;
  unit: MeasurementUnit;
  wastePercentage: number;
  unitCost: number;
}

export interface RecipeStep {
  id: string;
  description: string;
}

export interface Recipe {
  id: string;
  name: string;
  code: string;
  productId: string;
  description: string;
  imageUrl?: string;
  status: RecipeStatus;
  yieldQuantity: number;
  yieldUnit: RecipeYieldUnit;
  preparationTimeMinutes?: number;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  createdAt: string;
  updatedAt: string;
}

export interface RecipeListItem extends Recipe {
  productName: string;
  productCategory: ProductCategory;
  salePrice: number;
}

export interface GetRecipesResponse {
  recipes: RecipeListItem[];
}

export interface GetRecipeResponse {
  recipe: Recipe;
}

export interface GetRecipeIngredientsResponse {
  ingredients: InventoryIngredient[];
}

export interface RecipeUpsertRequest {
  name: string;
  code: string;
  productId: string;
  description: string;
  image?: File;
  status: RecipeStatus;
  yieldQuantity: number;
  yieldUnit: RecipeYieldUnit;
  preparationTimeMinutes?: number;
  ingredients: Array<Omit<RecipeIngredient, 'id' | 'name'>>;
  steps: Array<Omit<RecipeStep, 'id'>>;
}

export interface RecipeMutationResponse {
  recipe: Recipe;
}

export type RecipeStatusFilter = RecipeStatus | 'all';
export type RecipeCostFilter = RecipeCostStatus | 'all';

export interface RecipesState {
  search: string;
  category: ProductCategory | 'all';
  status: RecipeStatusFilter;
  costStatus: RecipeCostFilter;
  selectedRecipeId: string | null;
  detailsOpen: boolean;
}

export const RECIPE_STATUS_LABELS: Record<RecipeStatus, string> = {
  draft: 'Borrador',
  active: 'Activa',
  inactive: 'Inactiva',
};

export const MEASUREMENT_UNIT_LABELS: Record<MeasurementUnit, string> = {
  gram: 'g',
  kilogram: 'kg',
  milliliter: 'ml',
  liter: 'l',
  unit: 'un.',
};

export const RECIPE_YIELD_UNIT_LABELS: Record<RecipeYieldUnit, string> = {
  unit: 'unidades',
  portion: 'porciones',
  kilogram: 'kg',
  liter: 'l',
};

export const RECIPE_COST_STATUS_LABELS: Record<RecipeCostStatus, string> = {
  healthy: 'Costo saludable',
  warning: 'Requiere revisión',
  critical: 'Margen comprometido',
  incomplete: 'Costo incompleto',
};
