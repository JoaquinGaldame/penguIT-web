import {
  configureStore,
  type ThunkAction,
  type UnknownAction,
} from '@reduxjs/toolkit';

import { authApi } from '../../features/auth/api/AuthApi';
import { authReducer } from '../../features/auth/store/AuthSlice';
import { ordersApi } from '../../features/orders/api/OrdersApi';
import { ordersReducer } from '../../features/orders/store/OrdersSlice';
import { productsApi } from '../../features/products/api/ProductsApi';
import { productsReducer } from '../../features/products/store/ProductsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    products: productsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      ordersApi.middleware,
      productsApi.middleware,
    ),

  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;
