import { Badge, Box, Tab, Tabs } from "@mui/material";

import {
  SYSTEM_SETTINGS_TAB_LABELS,
  type SystemSettingsTab,
} from "../types/SystemSettings.types";

const tabs = Object.keys(SYSTEM_SETTINGS_TAB_LABELS) as SystemSettingsTab[];

interface SystemSettingsTabsProps {
  value: SystemSettingsTab;
  dirtyTabs: SystemSettingsTab[];
  onChange: (value: SystemSettingsTab) => void;
}

export function SystemSettingsTabs({
  value,
  dirtyTabs,
  onChange,
}: SystemSettingsTabsProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", px: { xs: 1, sm: 2 } }}>
      <Tabs
        value={value}
        onChange={(_, nextValue: SystemSettingsTab) => onChange(nextValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="Secciones de configuración del sistema"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab}
            value={tab}
            label={
              <Badge
                color="warning"
                variant="dot"
                invisible={!dirtyTabs.includes(tab)}
              >
                <Box component="span" sx={{ px: 0.5 }}>
                  {SYSTEM_SETTINGS_TAB_LABELS[tab]}
                </Box>
              </Badge>
            }
            sx={{ minHeight: 64, px: 2.5 }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
