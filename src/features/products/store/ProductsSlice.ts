import {
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type {
  ProductCategory,
  ProductsState,
  ProductStatusFilter,
} from '../types/Product.types';

const initialState: ProductsState = {
  search: '',
  category: 'all',
  status: 'all',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsSearch: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.search = action.payload;
    },

    setProductsCategory: (
      state,
      action: PayloadAction<ProductCategory | 'all'>,
    ) => {
      state.category = action.payload;
    },

    setProductsStatus: (
      state,
      action: PayloadAction<ProductStatusFilter>,
    ) => {
      state.status = action.payload;
    },

    resetProductsFilters: (state) => {
      state.search = '';
      state.category = 'all';
      state.status = 'all';
    },
  },
});

export const {
  resetProductsFilters,
  setProductsCategory,
  setProductsSearch,
  setProductsStatus,
} = productsSlice.actions;

export const productsReducer = productsSlice.reducer;