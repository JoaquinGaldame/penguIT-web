import type { AppThunk } from "../../../app/store/store";
import { systemSettingsApi } from "../api/SystemSettingsApi";
import type {
  UpdateGeneralSettingsRequest,
  UpdateNotificationSettingsRequest,
} from "../types/SystemSettings.types";
import { resetSystemSettingsState } from "./SystemSettingsSlice";

const systemSettingsTags = [
  { type: "SystemSettings" as const, id: "GENERAL" },
  { type: "SystemSettings" as const, id: "NOTIFICATIONS" },
];

type SaveGeneralSettingsResult = ReturnType<
  ReturnType<typeof systemSettingsApi.endpoints.updateGeneralSettings.initiate>
>;

type SaveNotificationSettingsResult = ReturnType<
  ReturnType<
    typeof systemSettingsApi.endpoints.updateNotificationSettings.initiate
  >
>;

export const saveGeneralSystemSettings =
  (
    request: UpdateGeneralSettingsRequest,
  ): AppThunk<SaveGeneralSettingsResult> =>
  (dispatch) =>
    dispatch(
      systemSettingsApi.endpoints.updateGeneralSettings.initiate(request),
    );

export const saveNotificationSystemSettings =
  (
    request: UpdateNotificationSettingsRequest,
  ): AppThunk<SaveNotificationSettingsResult> =>
  (dispatch) =>
    dispatch(
      systemSettingsApi.endpoints.updateNotificationSettings.initiate(request),
    );

export const refreshSystemSettings = (): AppThunk => (dispatch) => {
  dispatch(systemSettingsApi.util.invalidateTags(systemSettingsTags));
};

export const resetSystemSettingsWorkspace = (): AppThunk => (dispatch) => {
  dispatch(resetSystemSettingsState());
  dispatch(systemSettingsApi.util.invalidateTags(systemSettingsTags));
};
