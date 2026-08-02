import { z } from "zod";

export const generalSystemSettingsSchema = z.object({
  locale: z.enum(["es-AR", "es-UY", "es-CL"]),
  timezone: z.string().trim().min(1, "Seleccioná una zona horaria."),
  currency: z.enum(["ARS", "UYU", "CLP", "USD"]),
  dateFormat: z.enum(["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]),
  timeFormat: z.enum(["12h", "24h"]),
  weekStartsOn: z.enum(["monday", "sunday"]),
});

export const notificationSystemSettingsSchema = z.object({
  enabled: z.boolean(),
  emailEnabled: z.boolean(),
  lowStockAlerts: z.boolean(),
  newOrderAlerts: z.boolean(),
  cashClosingAlerts: z.boolean(),
  dailySummary: z.boolean(),
  dailySummaryTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Ingresá un horario válido."),
});

export type GeneralSystemSettingsFormValues = z.infer<
  typeof generalSystemSettingsSchema
>;
export type NotificationSystemSettingsFormValues = z.infer<
  typeof notificationSystemSettingsSchema
>;
