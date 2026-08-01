import type { AppThunk } from "../../../app/store/store";
import { invoicesApi } from "../api/InvoicesApi";
import type { CreateInvoiceRequest } from "../types/Invoice.types";
import {
  resetInvoiceCreation,
  resetInvoicesFilters,
} from "./InvoicesSlice";

type CreateInvoiceResult = ReturnType<
  ReturnType<typeof invoicesApi.endpoints.createInvoice.initiate>
>;

export const createInvoice = (
  request: CreateInvoiceRequest,
): AppThunk<CreateInvoiceResult> =>
  (dispatch) =>
    dispatch(invoicesApi.endpoints.createInvoice.initiate(request));

export const refreshInvoices = (): AppThunk => (dispatch) => {
  dispatch(invoicesApi.util.invalidateTags(["Invoice"]));
};

export const resetInvoicesWorkspace = (): AppThunk => (dispatch) => {
  dispatch(resetInvoicesFilters());
  dispatch(resetInvoiceCreation());
  dispatch(invoicesApi.util.invalidateTags(["Invoice"]));
};
