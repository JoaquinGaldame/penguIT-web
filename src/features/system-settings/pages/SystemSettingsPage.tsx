import { useCallback, useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { getApiErrorMessage } from "../../../app/api/getApiErrorMessage";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  useGetSystemSettingsQuery,
  useUpdateGeneralSettingsMutation,
  useUpdateNotificationSettingsMutation,
} from "../api/SystemSettingsApi";
import { GeneralSettingsForm } from "../components/GeneralSettingsForm";
import { NotificationSettingsForm } from "../components/NotificationSettingsForm";
import { SystemSettingsTabs } from "../components/SystemSettingsTabs";
import type {
  GeneralSystemSettingsFormValues,
  NotificationSystemSettingsFormValues,
} from "../schemas/systemSettingsSchema";
import {
  markSystemSettingsTabClean,
  markSystemSettingsTabDirty,
  resetSystemSettingsState,
  setSystemSettingsTab,
} from "../store/SystemSettingsSlice";
import { refreshSystemSettings } from "../store/SystemSettingsThunks";
import type { SystemSettingsTab } from "../types/SystemSettings.types";

export function SystemSettingsPage() {
  const dispatch = useAppDispatch();
  const { activeTab, dirtyTabs } = useAppSelector(
    (state) => state.systemSettings,
  );
  const settingsQuery = useGetSystemSettingsQuery();
  const [updateGeneralSettings, generalMutation] =
    useUpdateGeneralSettingsMutation();
  const [updateNotificationSettings, notificationMutation] =
    useUpdateNotificationSettingsMutation();
  const [feedback, setFeedback] = useState<
    { severity: "success" | "error"; message: string } | undefined
  >();

  useEffect(
    () => () => {
      dispatch(resetSystemSettingsState());
    },
    [dispatch],
  );

  const handleDirtyChange = useCallback(
    (tab: SystemSettingsTab, isDirty: boolean) => {
      dispatch(
        isDirty
          ? markSystemSettingsTabDirty(tab)
          : markSystemSettingsTabClean(tab),
      );
    },
    [dispatch],
  );
  const handleGeneralDirtyChange = useCallback(
    (isDirty: boolean) => handleDirtyChange("general", isDirty),
    [handleDirtyChange],
  );
  const handleNotificationDirtyChange = useCallback(
    (isDirty: boolean) => handleDirtyChange("notifications", isDirty),
    [handleDirtyChange],
  );

  const saveGeneral = async (values: GeneralSystemSettingsFormValues) => {
    setFeedback(undefined);
    try {
      await updateGeneralSettings(values).unwrap();
      setFeedback({
        severity: "success",
        message: "La configuración general se guardó correctamente.",
      });
      return true;
    } catch (error) {
      setFeedback({
        severity: "error",
        message: getApiErrorMessage(
          error,
          "No pudimos guardar la configuración general.",
        ),
      });
      return false;
    }
  };

  const saveNotifications = async (
    values: NotificationSystemSettingsFormValues,
  ) => {
    setFeedback(undefined);
    try {
      await updateNotificationSettings(values).unwrap();
      setFeedback({
        severity: "success",
        message: "Las preferencias de notificación se guardaron correctamente.",
      });
      return true;
    } catch (error) {
      setFeedback({
        severity: "error",
        message: getApiErrorMessage(
          error,
          "No pudimos guardar las preferencias de notificación.",
        ),
      });
      return false;
    }
  };

  const hasInitialError = settingsQuery.isError && !settingsQuery.data;

  return (
    <Stack
      spacing={2.5}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        overflowY: "auto",
        px: { xs: 2, sm: 3, lg: 4 },
        py: { xs: 2.5, md: 4 },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          alignItems: { xs: "stretch", sm: "flex-start" },
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography component="h1" variant="h4">
            Configuración del sistema
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
            Administrá el comportamiento general y las notificaciones de la
            aplicación.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<Icon icon="solar:restart-linear" width={20} />}
          onClick={() => dispatch(refreshSystemSettings())}
          disabled={settingsQuery.isFetching}
        >
          Actualizar
        </Button>
      </Stack>

      {settingsQuery.isFetching && !settingsQuery.isLoading && (
        <LinearProgress />
      )}

      {feedback && (
        <Alert
          severity={feedback.severity}
          onClose={() => setFeedback(undefined)}
        >
          {feedback.message}
        </Alert>
      )}

      {hasInitialError ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" onClick={() => settingsQuery.refetch()}>
              Reintentar
            </Button>
          }
        >
          No pudimos cargar la configuración del sistema.
        </Alert>
      ) : settingsQuery.isLoading || !settingsQuery.data ? (
        <Skeleton variant="rounded" height={460} animation="wave" />
      ) : (
        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <SystemSettingsTabs
            value={activeTab}
            dirtyTabs={dirtyTabs}
            onChange={(tab) => {
              setFeedback(undefined);
              dispatch(setSystemSettingsTab(tab));
            }}
          />

          <Box
            role="tabpanel"
            hidden={activeTab !== "general"}
            aria-label="Configuración general"
          >
            <GeneralSettingsForm
              settings={settingsQuery.data.settings.general}
              isSaving={generalMutation.isLoading}
              onDirtyChange={handleGeneralDirtyChange}
              onSubmit={saveGeneral}
            />
          </Box>

          <Box
            role="tabpanel"
            hidden={activeTab !== "notifications"}
            aria-label="Configuración de notificaciones"
          >
            <NotificationSettingsForm
              settings={settingsQuery.data.settings.notifications}
              isSaving={notificationMutation.isLoading}
              onDirtyChange={handleNotificationDirtyChange}
              onSubmit={saveNotifications}
            />
          </Box>
        </Paper>
      )}
    </Stack>
  );
}
