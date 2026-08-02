import type { AppThunk } from "../../../app/store/store";
import { clientsApi } from "../api/ClientsApi";
import { resetClientsState } from "./ClientsSlice";

const customersListTag = [{ type: "Customer" as const, id: "LIST" }];

export const refreshCustomers = (): AppThunk => (dispatch) => {
  dispatch(clientsApi.util.invalidateTags(customersListTag));
};

export const resetClientsWorkspace = (): AppThunk => (dispatch) => {
  dispatch(resetClientsState());

  dispatch(clientsApi.util.invalidateTags(customersListTag));
};
