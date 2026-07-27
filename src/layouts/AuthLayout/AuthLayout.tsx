import { Box, Stack, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

//import { BrandLogo } from '../../../shared/components/BrandLogo';

export function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          lg: 'minmax(420px, 46%) 1fr',
        },
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        component="main"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: {
            xs: 2.5,
            sm: 5,
            lg: 8,
          },
          py: 5,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 440,
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <Box
        sx={{
          display: {
            xs: 'none',
            lg: 'flex',
          },
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          color: 'common.white',
          backgroundColor: 'primary.main',
          p: 8,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 500,
            height: 500,
            top: -220,
            right: -180,
            borderRadius: '50%',
            backgroundColor: 'secondary.main',
            opacity: 0.22,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            width: 360,
            height: 360,
            bottom: -190,
            left: -130,
            borderRadius: '50%',
            backgroundColor: 'secondary.light',
            opacity: 0.18,
          }}
        />

        <Stack
          spacing={3}
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 520,
          }}
        >
          <Typography
            component="p"
            variant="overline"
            sx={{
              color: 'secondary.light',
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            Gestión gastronómica
          </Typography>

          <Typography
            component="h1"
            variant="h3"
            sx={{
              color: 'inherit',
              lineHeight: 1.15,
            }}
          >
            Todo tu negocio bajo control.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.78)',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Gestioná pedidos, inventario, recetas, compras y
            facturación desde un único lugar.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
