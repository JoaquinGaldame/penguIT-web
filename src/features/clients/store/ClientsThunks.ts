import type { AppThunk } from "../../../app/store/store";
import { clientsApi } from "../api/ClientsApi";
import { resetClientsState } from "./ClientsSlice";

export const refreshCustomers = (): AppThunk => (dispatch) => {
  dispatch(
    clientsApi.util.invalidateTags([
      {
        type: "Customer",
        id: "LIST",
      },
    ]),
  );
};

export const resetClientsWorkspace = (): AppThunk => (dispatch) => {
  dispatch(resetClientsState());

  dispatch(
    clientsApi.util.invalidateTags([
      {
        type: "Customer",
        id: "LIST",
      },
    ]),
  );
};
