import type { AppThunk } from "../../../app/store/store";
import { ordersApi } from "../api/OrdersApi";
import { showOrderDetails } from "./OrdersSlice";

const ordersListTag = [{ type: "Order" as const, id: "LIST" }];

export const openOrderDetails =
  (orderId: string): AppThunk =>
  (dispatch) => {
    dispatch(showOrderDetails(orderId));
  };

export const refreshOrders = (): AppThunk => (dispatch) => {
  dispatch(ordersApi.util.invalidateTags(ordersListTag));
};
