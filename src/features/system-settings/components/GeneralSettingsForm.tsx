import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import {
  generalSystemSettingsSchema,
  type GeneralSystemSettingsFormValues,
} from "../schemas/systemSettingsSchema";
import {
  SYSTEM_CURRENCY_LABELS,
  SYSTEM_DATE_FORMAT_LABELS,
  SYSTEM_LOCALE_LABELS,
  type GeneralSystemSettings,
  type SystemCurrency,
  type SystemDateFormat,
  type SystemLocale,
} from "../types/SystemSettings.types";
import { SettingsFormActions } from "./SettingsFormActions";

const timezones = [
  { value: "America/Argentina/Buenos_Aires", label: "Buenos Aires (UTC-3)" },
  { value: "America/Montevideo", label: "Montevideo (UTC-3)" },
  { value: "America/Santiago", label: "Santiago" },
];

interface GeneralSettingsFormProps {
  settings: GeneralSystemSettings;
  isSaving: boolean;
  onDirtyChange: (isDirty: boolean) => void;
  onSubmit: (values: GeneralSystemSettingsFormValues) => Promise<boolean>;
}

export function GeneralSettingsForm({
  settings,
  isSaving,
  onDirtyChange,
  onSubmit,
}: GeneralSettingsFormProps) {
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<GeneralSystemSettingsFormValues>({
    resolver: zodResolver(generalSystemSettingsSchema),
    defaultValues: settings,
  });

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  useEffect(() => {
    if (!isDirty) {
      reset(settings);
    }
  }, [isDirty, reset, settings]);

  const submit = async (values: GeneralSystemSettingsFormValues) => {
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
        <Typography variant="h6">Preferencias regionales</Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5 }}>
          Definí cómo se muestran fechas, horarios e importes en todo el
          sistema.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            md: "repeat(2, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        <Controller
          name="locale"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Idioma predeterminado">
              {(
                Object.entries(SYSTEM_LOCALE_LABELS) as Array<
                  [SystemLocale, string]
                >
              ).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="timezone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Zona horaria"
              error={Boolean(errors.timezone)}
              helperText={errors.timezone?.message}
            >
              {timezones.map((timezone) => (
                <MenuItem key={timezone.value} value={timezone.value}>
                  {timezone.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="currency"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Moneda predeterminada">
              {(
                Object.entries(SYSTEM_CURRENCY_LABELS) as Array<
                  [SystemCurrency, string]
                >
              ).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="dateFormat"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Formato de fecha">
              {(
                Object.entries(SYSTEM_DATE_FORMAT_LABELS) as Array<
                  [SystemDateFormat, string]
                >
              ).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="timeFormat"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Formato horario">
              <MenuItem value="24h">24 horas</MenuItem>
              <MenuItem value="12h">12 horas (AM/PM)</MenuItem>
            </TextField>
          )}
        />

        <Controller
          name="weekStartsOn"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Primer día de la semana">
              <MenuItem value="monday">Lunes</MenuItem>
              <MenuItem value="sunday">Domingo</MenuItem>
            </TextField>
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
