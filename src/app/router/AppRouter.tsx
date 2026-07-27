import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';

import { LoginPage } from '../../features/auth';
import { clearSession } from '../../features/auth/store/AuthSlice';
import { AuthLayout } from '../../layouts/AuthLayout/AuthLayout';
import { useAppDispatch } from '../store/hooks';
import { GuestRoute } from './GuestRoute';
import { ProtectedRoute } from './ProtectedRoute';

function DashboardPlaceholder() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearSession());
    navigate('/login', {
      replace: true,
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack
        spacing={2}
        sx={{ alignItems: 'flex-start' }}
      >
        <Typography
          component="h1"
          variant="h4"
        >
          Dashboard PenguinTech
        </Typography>

        <Typography color="text.secondary">
          La autenticación funciona. En el siguiente paso construiremos
          el DashboardLayout, Sidebar y Header.
        </Typography>

        <Button
          variant="outlined"
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </Stack>
    </Box>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={<LoginPage />}
            />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={<DashboardPlaceholder />}
          />
        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}