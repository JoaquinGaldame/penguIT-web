import { Box, Stack } from "@mui/material";

import { DashboardHeader } from "../components/DashboardHeader";
import { MetricCard } from "../components/MetricCard";
import { QuickActions } from "../components/QuickActions";
import { RecentOrders } from "../components/RecentOrders";
import { StockAlerts } from "../components/StockAlerts";
import {
  dashboardMetrics,
  quickActions,
  recentOrders,
  stockAlerts,
} from "../data/dashboardData";

export function DashboardPage() {
  return (
    <Stack
      spacing={3}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        overflowY: "auto",
        px: { xs: 2, sm: 3, lg: 4 },
        py: { xs: 2.5, md: 4 },
        "@media print": { height: "auto", overflow: "visible", p: 0 },
      }}
    >
      <DashboardHeader />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            xl: "minmax(0, 2fr) minmax(320px, 0.8fr)",
          },
          gap: 2,
        }}
      >
        <RecentOrders orders={recentOrders} />
        <StockAlerts alerts={stockAlerts} />
      </Box>

      <QuickActions actions={quickActions} />
    </Stack>
  );
}
