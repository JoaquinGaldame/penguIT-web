import { useState, type MouseEvent } from "react";
import {
  Box,
  ClickAwayListener,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Tooltip,
  Typography,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

import {
  findNavigationTrail,
  type NavigationItem,
} from "../../../app/router/navigationConfig";
import { AppIcon } from "../../../shared/components/AppIcon";

interface SidebarItemProps {
  item: NavigationItem;
  collapsed: boolean;
  level: number;
  openItems: string[];
  onToggleItem: (itemId: string, level: number) => void;
  onNavigate: () => void;
}

interface PopperState {
  pathname: string;
  anchorEl: HTMLElement | null;
}

export function SidebarItem({
  item,
  collapsed,
  level,
  openItems,
  onToggleItem,
  onNavigate,
}: SidebarItemProps) {
  const { pathname } = useLocation();
  const [popperState, setPopperState] = useState<PopperState>({
    pathname,
    anchorEl: null,
  });
  const hasChildren = Boolean(item.children?.length);
  const isOpen = openItems[level] === item.id;
  const selected = findNavigationTrail(pathname).some(
    (activeItem) => activeItem.id === item.id,
  );
  const anchorEl =
    popperState.pathname === pathname ? popperState.anchorEl : null;

  const handleGroupClick = (event: MouseEvent<HTMLElement>) => {
    if (collapsed && level === 0) {
      setPopperState({
        pathname,
        anchorEl: anchorEl ? null : event.currentTarget,
      });
      return;
    }

    onToggleItem(item.id, level);
  };

  const closePopper = () => {
    setPopperState({ pathname, anchorEl: null });
  };

  const itemContent = (
    <>
      <ListItemIcon
        sx={{
          width: level === 0 ? 48 : 28,
          minWidth: level === 0 ? 48 : 28,
          flexShrink: 0,
          color: "inherit",
          justifyContent: "center",
        }}
      >
        {item.icon ? (
          <AppIcon icon={item.icon} width={level === 0 ? 23 : 18} />
        ) : (
          <Box
            sx={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              bgcolor: "currentColor",
              opacity: selected ? 1 : 0.55,
            }}
          />
        )}
      </ListItemIcon>

      <ListItemText
        primary={item.label}
        sx={{
          minWidth: 0,
          maxWidth: collapsed ? 0 : 180,
          m: 0,
          ml: collapsed ? 0 : 0.5,
          opacity: collapsed ? 0 : 1,
          overflow: "hidden",
          transform: collapsed ? "translateX(-5px)" : "translateX(0)",
          visibility: collapsed ? "hidden" : "visible",
          transition: collapsed
            ? "max-width 180ms ease-in, margin-left 180ms ease-in, opacity 90ms ease-in, transform 120ms ease-in, visibility 0s linear 180ms"
            : "max-width 220ms ease-out, margin-left 180ms ease-out, opacity 140ms ease-out 80ms, transform 180ms ease-out 60ms, visibility 0s linear",
        }}
        slotProps={{
          primary: {
            noWrap: true,
            sx: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: level === 0 ? 14 : 13.5,
              lineHeight: 1.4,
              fontWeight: selected ? 700 : level === 0 ? 600 : 500,
            },
          },
        }}
      />

      {hasChildren && (
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 22,
            flexShrink: 0,
            ...(collapsed &&
              level === 0 && {
                position: "absolute",
                right: 2,
                width: 16,
              }),
            transform:
              collapsed && level === 0
                ? "rotate(-90deg)"
                : isOpen
                  ? "rotate(180deg)"
                  : "rotate(0)",
            transition: "transform 180ms ease",
          }}
        >
          <AppIcon icon="solar:alt-arrow-down-linear" width={16} />
        </Box>
      )}
    </>
  );

  const buttonSx = {
    minHeight: level === 0 ? 48 : 42,
    px: 1,
    borderRadius: 2,
    overflow: "hidden",
    color: selected ? "primary.main" : "text.secondary",
    "&.Mui-selected": {
      color: "primary.main",
      backgroundColor:
        level === 0 ? "rgba(20, 103, 193, 0.10)" : "rgba(20, 103, 193, 0.07)",
    },
    "&.Mui-selected:hover": {
      backgroundColor:
        level === 0 ? "rgba(20, 103, 193, 0.14)" : "rgba(20, 103, 193, 0.11)",
    },
  };

  return (
    <>
      <Tooltip
        title={collapsed && !anchorEl ? item.label : ""}
        placement="right"
      >
        {hasChildren ? (
          <ListItemButton
            selected={selected}
            onClick={handleGroupClick}
            aria-label={item.label}
            aria-expanded={collapsed ? Boolean(anchorEl) : isOpen}
            sx={buttonSx}
          >
            {itemContent}
          </ListItemButton>
        ) : (
          <ListItemButton
            component={NavLink}
            to={item.path!}
            selected={selected}
            onClick={onNavigate}
            aria-label={item.label}
            sx={buttonSx}
          >
            {itemContent}
          </ListItemButton>
        )}
      </Tooltip>

      {hasChildren && !collapsed && (
        <Collapse in={isOpen} timeout={180} unmountOnExit>
          <List
            disablePadding
            sx={{
              display: "grid",
              gap: 0.25,
              pl: level === 0 ? 2.25 : 1.5,
              pt: 0.25,
            }}
          >
            {item.children!.map((child) => (
              <SidebarItem
                key={child.id}
                item={child}
                collapsed={false}
                level={level + 1}
                openItems={openItems}
                onToggleItem={onToggleItem}
                onNavigate={onNavigate}
              />
            ))}
          </List>
        </Collapse>
      )}

      {hasChildren && collapsed && level === 0 && (
        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="right-start"
          sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
          modifiers={[
            {
              name: "offset",
              options: { offset: [0, 10] },
            },
          ]}
        >
          <ClickAwayListener onClickAway={closePopper}>
            <Paper
              elevation={6}
              sx={{
                width: 244,
                maxHeight: "80vh",
                overflowY: "auto",
                p: 1,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  px: 1.25,
                  py: 0.75,
                  color: "text.secondary",
                  fontWeight: 700,
                }}
              >
                {item.label}
              </Typography>

              <Divider sx={{ mb: 0.75 }} />

              <List disablePadding sx={{ display: "grid", gap: 0.25 }}>
                {item.children!.map((child) => (
                  <SidebarItem
                    key={child.id}
                    item={child}
                    collapsed={false}
                    level={1}
                    openItems={openItems}
                    onToggleItem={onToggleItem}
                    onNavigate={() => {
                      closePopper();
                      onNavigate();
                    }}
                  />
                ))}
              </List>
            </Paper>
          </ClickAwayListener>
        </Popper>
      )}
    </>
  );
}
