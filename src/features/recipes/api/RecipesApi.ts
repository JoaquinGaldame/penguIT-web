import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RootState } from '../../../app/store/store';
import { productsMock } from '../../products/data/productsMock';
import { recipeIngredientsMock, recipesMock } from '../data/recipesMock';
import type {
  GetRecipeIngredientsResponse,
  GetRecipeResponse,
  GetRecipesResponse,
  Recipe,
  RecipeListItem,
  RecipeMutationResponse,
  RecipeUpsertRequest,
} from '../types/Recipe.types';

let recipeDatabase = recipesMock.map((recipe) => ({
  ...recipe,
  ingredients: recipe.ingredients.map((ingredient) => ({ ...ingredient })),
  steps: recipe.steps.map((step) => ({ ...step })),
}));

const waitForMock = () =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, 400);
  });

function enrichRecipe(recipe: Recipe): RecipeListItem | undefined {
  const product = productsMock.find((item) => item.id === recipe.productId);

  if (!product) {
    return undefined;
  }

  return {
    ...recipe,
    productName: product.name,
    productCategory: product.category,
    salePrice: product.salePrice,
  };
}

function buildRecipe(
  values: RecipeUpsertRequest,
  existing?: Recipe,
): Recipe {
  const now = new Date().toISOString();
  const { image, ...recipeValues } = values;

  return {
    ...recipeValues,
    id: existing?.id ?? crypto.randomUUID(),
    imageUrl: image ? URL.createObjectURL(image) : existing?.imageUrl,
    ingredients: values.ingredients.map((ingredient) => {
      const inventoryItem = recipeIngredientsMock.find(
        (item) => item.id === ingredient.inventoryItemId,
      );

      return {
        ...ingredient,
        id: crypto.randomUUID(),
        name: inventoryItem?.name ?? 'Insumo no disponible',
      };
    }),
    steps: values.steps.map((step) => ({
      ...step,
      id: crypto.randomUUID(),
    })),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.accessToken;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      headers.set('accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Recipe'],
  endpoints: (builder) => ({
    getRecipes: builder.query<GetRecipesResponse, void>({
      async queryFn() {
        await waitForMock();

        return {
          data: {
            recipes: recipeDatabase
              .map(enrichRecipe)
              .filter((recipe): recipe is RecipeListItem => recipe !== undefined),
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.recipes.map((recipe) => ({
                type: 'Recipe' as const,
                id: recipe.id,
              })),
              { type: 'Recipe', id: 'LIST' },
            ]
          : [{ type: 'Recipe', id: 'LIST' }],
    }),
    getRecipe: builder.query<GetRecipeResponse, string>({
      async queryFn(recipeId) {
        await waitForMock();
        const recipe = recipeDatabase.find((item) => item.id === recipeId);

        if (!recipe) {
          return {
            error: {
              status: 404,
              data: { message: 'No encontramos la receta solicitada.' },
            },
          };
        }

        return { data: { recipe } };
      },
      providesTags: (_result, _error, recipeId) => [
        { type: 'Recipe', id: recipeId },
      ],
    }),
    getRecipeIngredients: builder.query<GetRecipeIngredientsResponse, void>({
      async queryFn() {
        await waitForMock();
        return { data: { ingredients: recipeIngredientsMock } };
      },
    }),
    createRecipe: builder.mutation<RecipeMutationResponse, RecipeUpsertRequest>({
      async queryFn(values) {
        await waitForMock();
        const recipe = buildRecipe(values);
        recipeDatabase = [recipe, ...recipeDatabase];
        return { data: { recipe } };
      },
      invalidatesTags: [{ type: 'Recipe', id: 'LIST' }],
    }),
    updateRecipe: builder.mutation<
      RecipeMutationResponse,
      { recipeId: string; values: RecipeUpsertRequest }
    >({
      async queryFn({ recipeId, values }) {
        await waitForMock();
        const index = recipeDatabase.findIndex((item) => item.id === recipeId);

        if (index < 0) {
          return {
            error: {
              status: 404,
              data: { message: 'No encontramos la receta solicitada.' },
            },
          };
        }

        const recipe = buildRecipe(values, recipeDatabase[index]);
        recipeDatabase = recipeDatabase.map((item) =>
          item.id === recipeId ? recipe : item,
        );
        return { data: { recipe } };
      },
      invalidatesTags: (_result, _error, { recipeId }) => [
        { type: 'Recipe', id: recipeId },
        { type: 'Recipe', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useCreateRecipeMutation,
  useGetRecipeIngredientsQuery,
  useGetRecipeQuery,
  useGetRecipesQuery,
  useUpdateRecipeMutation,
} = recipesApi;
