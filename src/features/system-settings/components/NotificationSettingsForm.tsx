import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm, useWatch, type Control } from "react-hook-form";

import {
  notificationSystemSettingsSchema,
  type NotificationSystemSettingsFormValues,
} from "../schemas/systemSettingsSchema";
import type { NotificationSystemSettings } from "../types/SystemSettings.types";
import { SettingsFormActions } from "./SettingsFormActions";

interface NotificationSettingsFormProps {
  settings: NotificationSystemSettings;
  isSaving: boolean;
  onDirtyChange: (isDirty: boolean) => void;
  onSubmit: (values: NotificationSystemSettingsFormValues) => Promise<boolean>;
}

export function NotificationSettingsForm({
  settings,
  isSaving,
  onDirtyChange,
  onSubmit,
}: NotificationSettingsFormProps) {
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<NotificationSystemSettingsFormValues>({
    resolver: zodResolver(notificationSystemSettingsSchema),
    defaultValues: settings,
  });
  const notificationsEnabled = useWatch({ control, name: "enabled" });
  const dailySummaryEnabled = useWatch({ control, name: "dailySummary" });

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  useEffect(() => {
    if (!isDirty) {
      reset(settings);
    }
  }, [isDirty, reset, settings]);

  const submit = async (values: NotificationSystemSettingsFormValues) => {
    if (await onSubmit(values)) {
      reset(values);
    }
  };

  return (
    <Stack
      component="form"
      spacing={3}
      onSubmit={handleSubmit(submit)}
      noValidate
      sx={{ p: { xs: 2, md: 3 } }}
    >
      <Box>
        <Typography variant="h6">Canales y eventos</Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5 }}>
          Elegí qué eventos generan avisos para los usuarios del sistema.
        </Typography>
      </Box>

      <Controller
        name="enabled"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Switch checked={field.value} onChange={field.onChange} />}
            label="Habilitar notificaciones del sistema"
          />
        )}
      />

      {!notificationsEnabled && (
        <Alert severity="info" variant="outlined">
          Las preferencias se conservarán, pero no se enviarán notificaciones
          mientras esta opción permanezca desactivada.
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "repeat(2, minmax(0, 1fr))",
          },
          gap: 1.5,
        }}
      >
        <NotificationSwitch
          name="emailEnabled"
          label="Notificaciones por correo"
          disabled={!notificationsEnabled}
          control={control}
        />
        <NotificationSwitch
          name="lowStockAlerts"
          label="Alertas de stock bajo"
          disabled={!notificationsEnabled}
          control={control}
        />
        <NotificationSwitch
          name="newOrderAlerts"
          label="Avisos de nuevos pedidos"
          disabled={!notificationsEnabled}
          control={control}
        />
        <NotificationSwitch
          name="cashClosingAlerts"
          label="Avisos de cierres de caja"
          disabled={!notificationsEnabled}
          control={control}
        />
        <NotificationSwitch
          name="dailySummary"
          label="Enviar resumen diario"
          disabled={!notificationsEnabled}
          control={control}
        />

        <Controller
          name="dailySummaryTime"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="time"
              label="Horario del resumen"
              disabled={!notificationsEnabled || !dailySummaryEnabled}
              error={Boolean(errors.dailySummaryTime)}
              helperText={errors.dailySummaryTime?.message}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          )}
        />
      </Box>

      <SettingsFormActions
        isDirty={isDirty}
        isSaving={isSaving}
        onDiscard={() => reset(settings)}
      />
    </Stack>
  );
}

interface NotificationSwitchProps {
  name:
    | "emailEnabled"
    | "lowStockAlerts"
    | "newOrderAlerts"
    | "cashClosingAlerts"
    | "dailySummary";
  label: string;
  disabled: boolean;
  control: Control<NotificationSystemSettingsFormValues>;
}

function NotificationSwitch({
  name,
  label,
  disabled,
  control,
}: NotificationSwitchProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Switch
              checked={field.value}
              onChange={field.onChange}
              disabled={disabled}
            />
          }
          label={label}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            m: 0,
            minHeight: 56,
            px: 1.5,
          }}
        />
      )}
    />
  );
}
