import type { AppThunk } from "../../../app/store/store";
import { invoicesApi } from "../api/InvoicesApi";
import { resetInvoicesFilters } from "./InvoicesSlice";

export const refreshInvoices = (): AppThunk => (dispatch) => {
  dispatch(invoicesApi.util.invalidateTags(["Invoice"]));
};

export const resetInvoicesWorkspace = (): AppThunk => (dispatch) => {
  dispatch(resetInvoicesFilters());
  dispatch(invoicesApi.util.invalidateTags(["Invoice"]));
};
