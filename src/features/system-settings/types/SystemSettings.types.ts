export type SystemSettingsTab = "general" | "notifications";

export type SystemLocale = "es-AR" | "es-UY" | "es-CL";
export type SystemCurrency = "ARS" | "UYU" | "CLP" | "USD";
export type SystemDateFormat = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
export type SystemTimeFormat = "12h" | "24h";
export type SystemWeekStart = "monday" | "sunday";

export interface GeneralSystemSettings {
  locale: SystemLocale;
  timezone: string;
  currency: SystemCurrency;
  dateFormat: SystemDateFormat;
  timeFormat: SystemTimeFormat;
  weekStartsOn: SystemWeekStart;
}

export interface NotificationSystemSettings {
  enabled: boolean;
  emailEnabled: boolean;
  lowStockAlerts: boolean;
  newOrderAlerts: boolean;
  cashClosingAlerts: boolean;
  dailySummary: boolean;
  dailySummaryTime: string;
}

export interface SystemSettings {
  general: GeneralSystemSettings;
  notifications: NotificationSystemSettings;
  updatedAt: string;
}

export interface GetSystemSettingsResponse {
  settings: SystemSettings;
}

export type UpdateGeneralSettingsRequest = GeneralSystemSettings;
export type UpdateNotificationSettingsRequest = NotificationSystemSettings;

export interface UpdateGeneralSettingsResponse {
  settings: GeneralSystemSettings;
  updatedAt: string;
}

export interface UpdateNotificationSettingsResponse {
  settings: NotificationSystemSettings;
  updatedAt: string;
}

export interface SystemSettingsState {
  activeTab: SystemSettingsTab;
  dirtyTabs: SystemSettingsTab[];
}

export const SYSTEM_SETTINGS_TAB_LABELS: Record<SystemSettingsTab, string> = {
  general: "General",
  notifications: "Notificaciones",
};

export const SYSTEM_LOCALE_LABELS: Record<SystemLocale, string> = {
  "es-AR": "Español (Argentina)",
  "es-UY": "Español (Uruguay)",
  "es-CL": "Español (Chile)",
};

export const SYSTEM_CURRENCY_LABELS: Record<SystemCurrency, string> = {
  ARS: "Peso argentino (ARS)",
  UYU: "Peso uruguayo (UYU)",
  CLP: "Peso chileno (CLP)",
  USD: "Dólar estadounidense (USD)",
};

export const SYSTEM_DATE_FORMAT_LABELS: Record<SystemDateFormat, string> = {
  "DD/MM/YYYY": "Día / mes / año",
  "MM/DD/YYYY": "Mes / día / año",
  "YYYY-MM-DD": "Año - mes - día",
};
