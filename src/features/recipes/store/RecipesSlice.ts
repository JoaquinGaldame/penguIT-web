import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  ProductCategory,
} from '../../products/types/Product.types';
import type {
  RecipeCostFilter,
  RecipesState,
  RecipeStatusFilter,
} from '../types/Recipe.types';

const initialState: RecipesState = {
  search: '',
  category: 'all',
  status: 'all',
  costStatus: 'all',
  selectedRecipeId: null,
  detailsOpen: false,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipesSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setRecipesCategory: (
      state,
      action: PayloadAction<ProductCategory | 'all'>,
    ) => {
      state.category = action.payload;
    },
    setRecipesStatus: (state, action: PayloadAction<RecipeStatusFilter>) => {
      state.status = action.payload;
    },
    setRecipesCostStatus: (state, action: PayloadAction<RecipeCostFilter>) => {
      state.costStatus = action.payload;
    },
    resetRecipesFilters: (state) => {
      state.search = '';
      state.category = 'all';
      state.status = 'all';
      state.costStatus = 'all';
    },
    showRecipeDetails: (state, action: PayloadAction<string>) => {
      state.selectedRecipeId = action.payload;
      state.detailsOpen = true;
    },
    hideRecipeDetails: (state) => {
      state.detailsOpen = false;
    },
  },
});

export const {
  hideRecipeDetails,
  resetRecipesFilters,
  setRecipesCategory,
  setRecipesCostStatus,
  setRecipesSearch,
  setRecipesStatus,
  showRecipeDetails,
} = recipesSlice.actions;

export const recipesReducer = recipesSlice.reducer;
