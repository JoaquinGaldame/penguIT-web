import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";

import { findNavigationItem } from "../../../app/router/navigationConfig";
import { AppIcon } from "../../../shared/components/AppIcon";
import {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_TRANSITION_DURATION,
  SIDEBAR_WIDTH,
} from "./Sidebar";
import { UserMenu } from "./UserMenu";

interface HeaderProps {
  collapsed: boolean;
  onOpenMobile: () => void;
  onToggleCollapsed: () => void;
}

export function Header({
  collapsed,
  onOpenMobile,
  onToggleCollapsed,
}: HeaderProps) {
  const { pathname } = useLocation();
  const currentItem = findNavigationItem(pathname);
  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={(theme) => ({
        width: { xs: "100%", md: `calc(100% - ${sidebarWidth}px)` },
        ml: { xs: 0, md: `${sidebarWidth}px` },
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(12px)",
        transition: theme.transitions.create(["width", "margin-left"], {
          easing: theme.transitions.easing.easeInOut,
          duration: SIDEBAR_TRANSITION_DURATION,
        }),
        "@media print": { display: "none" },
      })}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 68, md: 76 },
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        <IconButton
          onClick={onOpenMobile}
          aria-label="Abrir menú de navegación"
          sx={{ display: { md: "none" }, mr: 1 }}
        >
          <AppIcon icon="solar:hamburger-menu-linear" width={24} />
        </IconButton>

        <Tooltip title={collapsed ? "Expandir menú" : "Contraer menú"}>
          <IconButton
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
            sx={{ display: { xs: "none", md: "inline-flex" }, mr: 1 }}
          >
            <AppIcon icon="solar:hamburger-menu-linear" width={24} />
          </IconButton>
        </Tooltip>

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h6" color="text.primary" noWrap>
            {currentItem?.label ?? "PenguinTech"}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            noWrap
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {currentItem?.description ?? "Gestión gastronómica"}
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={0.75}
          sx={{ ml: "auto", alignItems: "center" }}
        >
          <Tooltip title="Notificaciones">
            <IconButton aria-label="Ver notificaciones">
              <Badge color="error" variant="dot" overlap="circular">
                <AppIcon icon="solar:bell-linear" width={23} />
              </Badge>
            </IconButton>
          </Tooltip>

          <UserMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
