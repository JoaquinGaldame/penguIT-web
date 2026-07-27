import type { AppThunk } from "../../../app/store/store";
import { ordersApi } from "../api/OrdersApi";
import { showOrderDetails } from "./OrdersSlice";

export const openOrderDetails =
  (orderId: string): AppThunk =>
  (dispatch) => {
    dispatch(showOrderDetails(orderId));
  };

export const refreshOrders = (): AppThunk => (dispatch) => {
  dispatch(ordersApi.util.invalidateTags([{ type: "Order", id: "LIST" }]));
};
