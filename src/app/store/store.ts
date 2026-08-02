import {
  configureStore,
  type ThunkAction,
  type UnknownAction,
} from "@reduxjs/toolkit";

import { authReducer } from "../../features/auth/store/AuthSlice";
import { ordersReducer } from "../../features/orders/store/OrdersSlice";
import { invoicesReducer } from "../../features/invoice/store/InvoicesSlice";
import { productsReducer } from "../../features/products/store/ProductsSlice";
import { clientsReducer } from "../../features/clients/store/ClientsSlice";
import { recipesReducer } from "../../features/recipes/store/RecipesSlice";
import { systemSettingsReducer } from "../../features/system-settings/store/SystemSettingsSlice";
import { usersReducer } from "../../features/users/store/UserSlice";
import { baseApi } from "../api/baseApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer,
    invoices: invoicesReducer,
    products: productsReducer,
    clients: clientsReducer,
    recipes: recipesReducer,
    systemSettings: systemSettingsReducer,
    users: usersReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),

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
