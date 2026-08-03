import {
  Box,
  Divider,
  IconButton,
  List,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { appConfig } from "../../../app/config/appConfig";
import { navigationConfig } from "../../../app/router/navigationConfig";
import { AppIcon } from "../../../shared/components/AppIcon";
import { useSidebarNavigation } from "../hooks/useSidebarNavigation";
import { SidebarBrand } from "./SidebarBrand";
import { SidebarItem } from "./SidebarItem";

interface SidebarContentProps {
  collapsed: boolean;
  temporary?: boolean;
  onNavigate: () => void;
  onToggleCollapsed: () => void;
}

export function SidebarContent({
  collapsed,
  temporary = false,
  onNavigate,
  onToggleCollapsed,
}: SidebarContentProps) {
  const showExpandedContent = temporary || !collapsed;
  const { openItems, toggleItem } = useSidebarNavigation();

  return (
    <Stack sx={{ height: "100%" }}>
      <SidebarBrand expanded={showExpandedContent} onNavigate={onNavigate} />

      <Divider />

      <Box
        component="nav"
        aria-label="Navegación principal"
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 1.25,
          py: 2.5,
        }}
      >
        <Box
          sx={{
            height: showExpandedContent ? 27 : 0,
            opacity: showExpandedContent ? 1 : 0,
            overflow: "hidden",
            transform: showExpandedContent
              ? "translateX(0)"
              : "translateX(-4px)",
            transition: showExpandedContent
              ? "height 220ms ease-out, opacity 140ms ease-out 80ms, transform 180ms ease-out 60ms"
              : "height 180ms ease-in, opacity 90ms ease-in, transform 120ms ease-in",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              display: "block",
              px: 1.5,
              mb: 1,
              color: "text.secondary",
              fontWeight: 700,
              letterSpacing: 1,
              whiteSpace: "nowrap",
            }}
          >
            Operación
          </Typography>
        </Box>

        <List disablePadding sx={{ display: "grid", gap: 0.5 }}>
          {navigationConfig.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              collapsed={!showExpandedContent}
              level={0}
              openItems={openItems}
              onToggleItem={toggleItem}
              onNavigate={onNavigate}
            />
          ))}
        </List>
      </Box>

      {!temporary && (
        <>
          <Divider />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: collapsed
                ? "minmax(0, 0fr) auto"
                : "minmax(0, 1fr) auto",
              alignItems: "center",
              minHeight: 68,
              gap: collapsed ? 0 : 1,
              px: 2.5,
              transition:
                "grid-template-columns 220ms ease-out, gap 180ms ease-out",
            }}
          >
            <Box
              sx={{
                minWidth: 0,
                overflow: "hidden",
                whiteSpace: "nowrap",
                opacity: collapsed ? 0 : 1,
                transform: collapsed ? "translateX(-4px)" : "translateX(0)",
                visibility: collapsed ? "hidden" : "visible",
                transition: collapsed
                  ? "opacity 90ms ease-in, transform 120ms ease-in, visibility 0s linear 120ms"
                  : "opacity 140ms ease-out 80ms, transform 180ms ease-out 60ms, visibility 0s linear",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {appConfig.name}
              </Typography>

              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {appConfig.description}
              </Typography>
            </Box>

            <Tooltip
              title={collapsed ? "Expandir menú" : "Contraer menú"}
              placement="right"
            >
              <IconButton
                onClick={onToggleCollapsed}
                aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
                sx={{
                  color: "primary.main",
                  backgroundColor: "rgba(20, 103, 193, 0.08)",
                }}
              >
                <AppIcon
                  icon={
                    collapsed
                      ? "solar:double-alt-arrow-right-linear"
                      : "solar:double-alt-arrow-left-linear"
                  }
                  width={20}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      )}
    </Stack>
  );
}
