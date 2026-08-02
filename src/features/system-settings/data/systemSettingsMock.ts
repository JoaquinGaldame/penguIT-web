import type { SystemSettings } from "../types/SystemSettings.types";

export const systemSettingsMock: SystemSettings = {
  general: {
    locale: "es-AR",
    timezone: "America/Argentina/Buenos_Aires",
    currency: "ARS",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    weekStartsOn: "monday",
  },
  notifications: {
    enabled: true,
    emailEnabled: true,
    lowStockAlerts: true,
    newOrderAlerts: true,
    cashClosingAlerts: false,
    dailySummary: true,
    dailySummaryTime: "08:00",
  },
  updatedAt: "2026-08-02T12:00:00.000Z",
};
