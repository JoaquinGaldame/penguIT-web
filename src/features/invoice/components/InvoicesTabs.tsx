import { Box, Tab, Tabs } from "@mui/material";

import {
  INVOICE_FILTER_LABELS,
  type InvoiceStatusFilter,
} from "../types/Invoice.types";

interface InvoicesTabsProps {
  value: InvoiceStatusFilter;
  onChange: (value: InvoiceStatusFilter) => void;
}

const filters: InvoiceStatusFilter[] = ["all", "paid", "late", "sent", "draft"];

export function InvoicesTabs({ value, onChange }: InvoicesTabsProps) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", px: { xs: 1, sm: 2 } }}>
      <Tabs
        value={value}
        onChange={(_, nextValue: InvoiceStatusFilter) => onChange(nextValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="Filtrar facturas por estado"
      >
        {filters.map((filter) => (
          <Tab
            key={filter}
            value={filter}
            label={INVOICE_FILTER_LABELS[filter]}
            sx={{ minHeight: 64, px: 2.5 }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
