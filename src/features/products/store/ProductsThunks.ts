import type { AppThunk } from '../../../app/store/store';
import { productsApi } from '../api/ProductsApi';
import { resetProductsFilters } from './ProductsSlice';

export const refreshProducts =
  (): AppThunk =>
  (dispatch) => {
    dispatch(
      productsApi.util.invalidateTags([
        {
          type: 'Product',
          id: 'LIST',
        },
      ]),
    );
  };

export const resetProductsWorkspace =
  (): AppThunk =>
  (dispatch) => {
    dispatch(resetProductsFilters());

    dispatch(
      productsApi.util.invalidateTags([
        {
          type: 'Product',
          id: 'LIST',
        },
      ]),
    );
  };
