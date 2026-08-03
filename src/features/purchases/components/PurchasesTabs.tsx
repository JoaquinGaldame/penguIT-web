import { Box, Chip, Stack, Tab, Tabs } from "@mui/material";

import { PURCHASE_TAB_LABELS, type PurchaseTab } from "../types/Purchase.types";

interface PurchasesTabsProps {
  value: PurchaseTab;
  counts: Record<PurchaseTab, number>;
  onChange: (value: PurchaseTab) => void;
}

const tabs: PurchaseTab[] = [
  "all",
  "draft",
  "ordered",
  "partially-received",
  "received",
];

export function PurchasesTabs({ value, counts, onChange }: PurchasesTabsProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", px: { xs: 1, sm: 2 } }}>
      <Tabs
        value={value}
        onChange={(_, nextValue: PurchaseTab) => onChange(nextValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="Filtrar compras por estado operativo"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab}
            value={tab}
            label={
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <span>{PURCHASE_TAB_LABELS[tab]}</span>
                <Chip label={counts[tab]} size="small" sx={{ height: 22 }} />
              </Stack>
            }
            sx={{ minHeight: 64, px: 2.25 }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
