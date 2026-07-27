import { Icon } from "@iconify/react";
import { Box, Paper, Stack, Typography } from "@mui/material";

export function OrdersEmptyState() {
  return (
    <Paper
      variant="outlined"
      sx={{
        display: "grid",
        minHeight: 280,
        placeItems: "center",
        p: 3,
      }}
    >
      <Stack
        spacing={1.5}
        sx={{ maxWidth: 420, alignItems: "center", textAlign: "center" }}
      >
        <Box
          sx={{
            display: "grid",
            width: 64,
            height: 64,
            placeItems: "center",
            borderRadius: 3,
            bgcolor: "rgba(20, 103, 193, 0.10)",
            color: "secondary.main",
          }}
        >
          <Icon icon="solar:bag-4-linear" width={32} />
        </Box>

        <Typography variant="h6">No hay pedidos que coincidan</Typography>

        <Typography variant="body2" color="text.secondary">
          Probá cambiar los filtros o el término de búsqueda.
        </Typography>
      </Stack>
    </Paper>
  );
}
