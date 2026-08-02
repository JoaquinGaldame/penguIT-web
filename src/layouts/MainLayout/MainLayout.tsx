import { Suspense } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import { RouteLoadingFallback } from "../../shared/components/RouteLoadingFallback";
import { Header } from "./components/Header";
import {
  Sidebar,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_TRANSITION_DURATION,
  SIDEBAR_WIDTH,
} from "./components/Sidebar";
import { useSidebar } from "./hooks/useSidebar";

export function MainLayout() {
  const {
    isCollapsed,
    isMobileOpen,
    toggleCollapsed,
    openMobile,
    closeMobile,
  } = useSidebar();
  const sidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        "@media print": {
          bgcolor: "common.white",
          minHeight: "auto",
        },
      }}
    >
      <Header
        collapsed={isCollapsed}
        onOpenMobile={openMobile}
        onToggleCollapsed={toggleCollapsed}
      />

      <Sidebar
        collapsed={isCollapsed}
        mobileOpen={isMobileOpen}
        onCloseMobile={closeMobile}
        onToggleCollapsed={toggleCollapsed}
      />

      <Box
        component="main"
        sx={(theme) => ({
          minHeight: "100vh",
          ml: { xs: 0, md: `${sidebarWidth}px` },
          transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.easeInOut,
            duration: SIDEBAR_TRANSITION_DURATION,
          }),
          "@media print": {
            minHeight: "auto",
            marginLeft: "0 !important",
            transition: "none",
          },
        })}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 68, md: 76 },
            "@media print": { display: "none" },
          }}
        />

        <Box
          sx={{
            width: "100%",
            height: { xs: "calc(100dvh - 68px)", md: "calc(100dvh - 76px)" },
            minHeight: 0,
            overflow: "hidden",
            "@media print": {
              height: "auto",
              minHeight: "auto",
              overflow: "visible",
            },
          }}
        >
          <Suspense fallback={<RouteLoadingFallback />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
}
