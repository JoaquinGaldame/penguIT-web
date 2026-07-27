import { Icon } from '@iconify/react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { paths } from '../../../app/router/paths';

interface ComingSoonPageProps {
  title: string;
  description: string;
  icon: string;
}

export function ComingSoonPage({
  title,
  description,
  icon,
}: ComingSoonPageProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'grid',
        placeItems: 'center',
        minHeight: { xs: 460, md: 560 },
        p: 3,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          right: -100,
          width: 280,
          height: 280,
          borderRadius: '50%',
          bgcolor: 'rgba(74, 144, 226, 0.08)',
        }}
      />

      <Stack
        spacing={2}
        sx={{
          position: 'relative',
          maxWidth: 520,
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            width: 82,
            height: 82,
            borderRadius: 3,
            bgcolor: 'rgba(20, 103, 193, 0.10)',
            color: 'secondary.main',
          }}
        >
          <Icon icon={icon} width={42} />
        </Box>

        <Typography
          variant="overline"
          color="secondary.main"
          sx={{ fontWeight: 700, letterSpacing: 1.5 }}
        >
          Próximamente
        </Typography>

        <Typography component="h1" variant="h3">
          {title}
        </Typography>

        <Typography color="text.secondary" sx={{ maxWidth: 440 }}>
          {description}
        </Typography>

        <Button
          component={Link}
          to={paths.dashboard}
          variant="contained"
          startIcon={<Icon icon="solar:arrow-left-linear" width={20} />}
          sx={{ mt: 1 }}
        >
          Volver al panel principal
        </Button>
      </Stack>
    </Paper>
  );
}
