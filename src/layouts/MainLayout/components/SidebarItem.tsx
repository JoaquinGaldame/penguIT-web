import { Icon } from '@iconify/react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import { paths } from '../../../app/router/paths';
import type { NavigationItem } from '../../../app/router/navigationConfig';

interface SidebarItemProps {
  item: NavigationItem;
  collapsed: boolean;
  onNavigate: () => void;
}

export function SidebarItem({ item, collapsed, onNavigate }: SidebarItemProps) {
  const { pathname } = useLocation();
  const selected =
    item.path === paths.dashboard
      ? pathname === item.path
      : pathname.startsWith(item.path);

  return (
    <Tooltip title={collapsed ? item.label : ''} placement="right">
      <ListItemButton
        component={NavLink}
        to={item.path}
        selected={selected}
        onClick={onNavigate}
        aria-label={item.label}
        sx={{
          minHeight: 48,
          px: 1,
          borderRadius: 2,
          overflow: 'hidden',
          color: selected ? 'primary.main' : 'text.secondary',
          '&.Mui-selected': {
            color: 'primary.main',
            backgroundColor: 'rgba(20, 103, 193, 0.10)',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(20, 103, 193, 0.14)',
          },
        }}
      >
        <ListItemIcon
          sx={{
            width: 48,
            minWidth: 48,
            flexShrink: 0,
            color: 'inherit',
            justifyContent: 'center',
          }}
        >
          <Icon icon={item.icon} width={23} />
        </ListItemIcon>

        <ListItemText
          primary={item.label}
          sx={{
            minWidth: 0,
            maxWidth: collapsed ? 0 : 180,
            m: 0,
            ml: collapsed ? 0 : 0.5,
            opacity: collapsed ? 0 : 1,
            overflow: 'hidden',
            transform: collapsed ? 'translateX(-5px)' : 'translateX(0)',
            visibility: collapsed ? 'hidden' : 'visible',
            transition: collapsed
              ? 'max-width 180ms ease-in, margin-left 180ms ease-in, opacity 90ms ease-in, transform 120ms ease-in, visibility 0s linear 180ms'
              : 'max-width 220ms ease-out, margin-left 180ms ease-out, opacity 140ms ease-out 80ms, transform 180ms ease-out 60ms, visibility 0s linear',
          }}
          slotProps={{
            primary: {
              noWrap: true,
              sx: {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: 14,
                lineHeight: 1.4,
                fontWeight: selected ? 700 : 600,
              },
            },
          }}
        />
      </ListItemButton>
    </Tooltip>
  );
}
