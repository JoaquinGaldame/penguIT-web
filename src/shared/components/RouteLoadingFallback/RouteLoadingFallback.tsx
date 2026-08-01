import { Skeleton, Stack } from "@mui/material";

export function RouteLoadingFallback() {
  return (
    <Stack role="status" aria-label="Cargando contenido" spacing={2.5}>
      <Skeleton variant="text" width="min(280px, 70%)" height={48} />
      <Skeleton variant="text" width="min(520px, 90%)" height={28} />
      <Skeleton variant="rounded" height={420} animation="wave" />
    </Stack>
  );
}
