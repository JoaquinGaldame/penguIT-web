import { Drawer } from '@mui/material';

import { SidebarContent } from './SidebarContent';

export const SIDEBAR_WIDTH = 272;
export const SIDEBAR_COLLAPSED_WIDTH = 84;
export const SIDEBAR_TRANSITION_DURATION = 220;

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onToggleCollapsed: () => void;
}

export function Sidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
  onToggleCollapsed,
}: SidebarProps) {
  const desktopWidth = collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH;

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onCloseMobile}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <SidebarContent
          collapsed={false}
          temporary
          onNavigate={onCloseMobile}
          onToggleCollapsed={onToggleCollapsed}
        />
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={(theme) => ({
          display: { xs: 'none', md: 'block' },
          width: desktopWidth,
          flexShrink: 0,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeInOut,
            duration: SIDEBAR_TRANSITION_DURATION,
          }),
          '& .MuiDrawer-paper': {
            width: desktopWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            borderRightColor: 'divider',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.easeInOut,
              duration: SIDEBAR_TRANSITION_DURATION,
            }),
          },
        })}
      >
        <SidebarContent
          collapsed={collapsed}
          onNavigate={() => undefined}
          onToggleCollapsed={onToggleCollapsed}
        />
      </Drawer>
    </>
  );
}
