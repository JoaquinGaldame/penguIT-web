import { Box, Chip, Stack, Typography } from '@mui/material';

import { useAppSelector } from '../../../app/store/hooks';

export function DashboardHeader() {
  const user = useAppSelector((state) => state.auth.user);
  const formattedDate = new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography component="h1" variant="h4" sx={{ mb: 0.75 }}>
          Hola, {user?.name ?? 'Administrador'}
        </Typography>

        <Typography color="text.secondary">
          Este es el estado general de tu operación.
        </Typography>
      </Box>

      <Chip
        icon={
          <Box
            component="span"
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'success.main',
            }}
          />
        }
        label={formattedDate}
        variant="outlined"
        sx={{
          height: 38,
          px: 0.5,
          textTransform: 'capitalize',
          bgcolor: 'background.paper',
          fontWeight: 600,
        }}
      />
    </Stack>
  );
}
