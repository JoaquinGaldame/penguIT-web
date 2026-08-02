import type {
  Recipe,
  RecipeCostStatus,
} from '../types/Recipe.types';

export function getIngredientSubtotal(
  quantity: number,
  unitCost: number,
  wastePercentage: number,
) {
  return quantity * unitCost * (1 + wastePercentage / 100);
}

export function getRecipeTotalCost(recipe: Pick<Recipe, 'ingredients'>) {
  return recipe.ingredients.reduce(
    (total, ingredient) =>
      total +
      getIngredientSubtotal(
        ingredient.quantity,
        ingredient.unitCost,
        ingredient.wastePercentage,
      ),
    0,
  );
}

export function getRecipeCostPerYield(
  recipe: Pick<Recipe, 'ingredients' | 'yieldQuantity'>,
) {
  if (recipe.yieldQuantity <= 0) {
    return null;
  }

  return getRecipeTotalCost(recipe) / recipe.yieldQuantity;
}

export function getRecipeFoodCostPercentage(
  recipe: Pick<Recipe, 'ingredients' | 'yieldQuantity'>,
  salePrice: number,
) {
  const costPerYield = getRecipeCostPerYield(recipe);

  if (costPerYield === null || salePrice <= 0 || recipe.ingredients.length === 0) {
    return null;
  }

  return (costPerYield / salePrice) * 100;
}

export function getRecipeMarginPercentage(
  recipe: Pick<Recipe, 'ingredients' | 'yieldQuantity'>,
  salePrice: number,
) {
  const foodCost = getRecipeFoodCostPercentage(recipe, salePrice);

  return foodCost === null ? null : 100 - foodCost;
}

export function getRecipeCostStatus(
  recipe: Pick<Recipe, 'ingredients' | 'yieldQuantity'>,
  salePrice: number,
): RecipeCostStatus {
  if (
    recipe.ingredients.length === 0 ||
    recipe.ingredients.some(
      (ingredient) => ingredient.quantity <= 0 || ingredient.unitCost <= 0,
    )
  ) {
    return 'incomplete';
  }

  const foodCost = getRecipeFoodCostPercentage(recipe, salePrice);

  if (foodCost === null) {
    return 'incomplete';
  }

  if (foodCost <= 30) {
    return 'healthy';
  }

  if (foodCost <= 35) {
    return 'warning';
  }

  return 'critical';
}

export function formatRecipeCurrency(value: number) {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  });
}

export function formatRecipePercentage(value: number | null) {
  return value === null ? '—' : `${value.toFixed(1)}%`;
}

export function formatRecipeDate(value: string) {
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}
