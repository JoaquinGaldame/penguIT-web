import type { AppThunk } from "../../../app/store/store";
import { purchasesApi } from "../api/PurchasesApi";

export const refreshPurchases = (): AppThunk => (dispatch) => {
  dispatch(
    purchasesApi.util.invalidateTags([{ type: "Purchase", id: "LIST" }]),
  );
};
