import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import {
  Sidebar,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_TRANSITION_DURATION,
  SIDEBAR_WIDTH,
} from './components/Sidebar';
import { useSidebar } from './hooks/useSidebar';

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
        bgcolor: 'background.default',
        minHeight: '100vh',
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
          minHeight: '100vh',
          ml: { xs: 0, md: `${sidebarWidth}px` },
          transition: theme.transitions.create('margin-left', {
            easing: theme.transitions.easing.easeInOut,
            duration: SIDEBAR_TRANSITION_DURATION,
          }),
        })}
      >
        <Toolbar sx={{ minHeight: { xs: 68, md: 76 } }} />

        <Box
          sx={{
            width: '100%',
            maxWidth: 1600,
            mx: 'auto',
            px: { xs: 2, sm: 3, lg: 4 },
            py: { xs: 2.5, md: 4 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
