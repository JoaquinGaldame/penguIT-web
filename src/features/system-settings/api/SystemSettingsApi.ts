import { baseApi } from "../../../app/api/baseApi";
import { systemSettingsMock } from "../data/systemSettingsMock";
import type {
  GetSystemSettingsResponse,
  SystemSettings,
  UpdateGeneralSettingsRequest,
  UpdateGeneralSettingsResponse,
  UpdateNotificationSettingsRequest,
  UpdateNotificationSettingsResponse,
} from "../types/SystemSettings.types";

const delay = (milliseconds: number) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

let mockState: SystemSettings = {
  ...systemSettingsMock,
  general: { ...systemSettingsMock.general },
  notifications: { ...systemSettingsMock.notifications },
};

export const systemSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSystemSettings: builder.query<GetSystemSettingsResponse, void>({
      async queryFn() {
        await delay(400);
        return {
          data: {
            settings: {
              ...mockState,
              general: { ...mockState.general },
              notifications: { ...mockState.notifications },
            },
          },
        };
      },
      providesTags: [
        { type: "SystemSettings", id: "GENERAL" },
        { type: "SystemSettings", id: "NOTIFICATIONS" },
      ],
    }),

    updateGeneralSettings: builder.mutation<
      UpdateGeneralSettingsResponse,
      UpdateGeneralSettingsRequest
    >({
      async queryFn(settings) {
        await delay(450);
        const updatedAt = new Date().toISOString();
        mockState = { ...mockState, general: { ...settings }, updatedAt };
        return { data: { settings: { ...mockState.general }, updatedAt } };
      },
      invalidatesTags: [{ type: "SystemSettings", id: "GENERAL" }],
    }),

    updateNotificationSettings: builder.mutation<
      UpdateNotificationSettingsResponse,
      UpdateNotificationSettingsRequest
    >({
      async queryFn(settings) {
        await delay(450);
        const updatedAt = new Date().toISOString();
        mockState = {
          ...mockState,
          notifications: { ...settings },
          updatedAt,
        };
        return {
          data: { settings: { ...mockState.notifications }, updatedAt },
        };
      },
      invalidatesTags: [{ type: "SystemSettings", id: "NOTIFICATIONS" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSystemSettingsQuery,
  useUpdateGeneralSettingsMutation,
  useUpdateNotificationSettingsMutation,
} = systemSettingsApi;
