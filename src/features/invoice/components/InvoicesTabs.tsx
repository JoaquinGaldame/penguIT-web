import { Badge, Box, Tab, Tabs } from "@mui/material";

import {
  INVOICE_FILTER_LABELS,
  type InvoiceStatusCounts,
  type InvoiceStatusFilter,
} from "../types/Invoice.types";

interface InvoicesTabsProps {
  value: InvoiceStatusFilter;
  counts: InvoiceStatusCounts;
  onChange: (value: InvoiceStatusFilter) => void;
}

const filters: InvoiceStatusFilter[] = ["all", "paid", "late", "sent", "draft"];

export function InvoicesTabs({ value, counts, onChange }: InvoicesTabsProps) {
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
            label={
              <Badge
                badgeContent={counts[filter]}
                color={filter === value ? "primary" : "default"}
                max={99}
                sx={{ "& .MuiBadge-badge": { right: -14 } }}
              >
                <Box component="span" sx={{ pr: 1 }}>
                  {INVOICE_FILTER_LABELS[filter]}
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
