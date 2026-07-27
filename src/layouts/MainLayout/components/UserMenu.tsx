import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { paths } from '../../../app/router/paths';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { clearSession } from '../../../features/auth/store/AuthSlice';

export function UserMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const handleLogout = () => {
    setAnchorElement(null);
    dispatch(clearSession());
    navigate(paths.login, { replace: true });
  };

  const initials = user?.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <IconButton
        onClick={(event) => setAnchorElement(event.currentTarget)}
        aria-label="Abrir menú de usuario"
        aria-controls={anchorElement ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorElement)}
        sx={{ p: 0.5 }}
      >
        <Avatar
          sx={{
            width: 38,
            height: 38,
            bgcolor: 'primary.main',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {initials || 'PT'}
        </Avatar>
      </IconButton>

      <Menu
        id="user-menu"
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={() => setAnchorElement(null)}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              mt: 1.5,
              border: 1,
              borderColor: 'divider',
              boxShadow: '0 14px 36px rgba(10, 46, 92, 0.14)',
            },
          },
        }}
      >
        <Box sx={{ px: 2.5, py: 1.5 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {initials || 'PT'}
            </Avatar>

            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700 }}>
                {user?.name ?? 'Usuario'}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                noWrap
                sx={{ display: 'block' }}
              >
                {user?.email}
              </Typography>

              <Typography
                variant="caption"
                color="secondary.main"
                sx={{ fontWeight: 700 }}
              >
                {user?.role}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={{ mx: 1, my: 1, borderRadius: 1.5 }}
        >
          <ListItemIcon>
            <Icon icon="solar:logout-2-linear" width={20} />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
}
