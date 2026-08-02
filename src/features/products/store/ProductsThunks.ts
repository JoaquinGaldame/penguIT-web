import type { AppThunk } from "../../../app/store/store";
import { productsApi } from "../api/ProductsApi";
import { resetProductsFilters } from "./ProductsSlice";

const productsListTag = [{ type: "Product" as const, id: "LIST" }];

export const refreshProducts = (): AppThunk => (dispatch) => {
  dispatch(productsApi.util.invalidateTags(productsListTag));
};

export const resetProductsWorkspace = (): AppThunk => (dispatch) => {
  dispatch(resetProductsFilters());

  dispatch(productsApi.util.invalidateTags(productsListTag));
};
