import {
  Backdrop,
  CircularProgress,
  Fade,
  Stack,
  Typography,
} from '@mui/material';

interface AppLoadingScreenProps {
  open: boolean;
  title?: string;
  description?: string;
}

export function AppLoadingScreen({
  open,
  title = 'Cargando…',
  description,
}: AppLoadingScreenProps) {
  return (
    <Backdrop
      open={open}
      transitionDuration={180}
      sx={{
        backdropFilter: 'blur(6px)',
        bgcolor: 'rgba(237, 242, 247, 0.94)',
        color: 'primary.main',
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <Fade in={open} timeout={180}>
        <Stack
          role="status"
          aria-live="polite"
          spacing={1.5}
          sx={{
            alignItems: 'center',
            maxWidth: 360,
            px: 3,
            textAlign: 'center',
          }}
        >
          <CircularProgress
            color="primary"
            size={44}
            aria-label={title}
          />

          <Typography
            color="text.primary"
            variant="h6"
          >
            {title}
          </Typography>

          {description && (
            <Typography color="text.secondary" variant="body2">
              {description}
            </Typography>
          )}
        </Stack>
      </Fade>
    </Backdrop>
  );
}
