import { Box, Stack, Typography } from '@mui/material';

import { appConfig } from '../../../app/config/appConfig';
import { BrandLogo } from '../../../shared/components/BrandLogo';
import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  return (
    <Stack spacing={3}>
      <Box
        sx={{
          position: 'relative',
          alignSelf: 'center',
          width: {
            xs: '100%',
            sm: 'calc(100% + 120px)',
          },
          height: {
            xs: 120,
            sm: 160,
          },
          mb: -2,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            transform: 'translateY(-50%)',
          }}
        >
          <BrandLogo width={560} />
        </Box>
      </Box>

      <Stack spacing={1}>
        <Typography component="h1" variant="h4" color="text.primary">
          Bienvenido
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Ingresá tus datos para acceder al panel de administración.
        </Typography>
      </Stack>

      <LoginForm />

      {import.meta.env.DEV && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            p: 1.5,
            borderRadius: 1,
            backgroundColor: 'background.default',
          }}
        >
          Acceso de desarrollo: {appConfig.demoCredentials.email} /{' '}
          {appConfig.demoCredentials.password}
        </Typography>
      )}
    </Stack>
  );
}
