import { Box, Stack, Typography } from "@mui/material";

import { AppIcon } from "../../../shared/components/AppIcon";

interface PurchasesEmptyStateProps {
  hasActiveCriteria: boolean;
}

export function PurchasesEmptyState({
  hasActiveCriteria,
}: PurchasesEmptyStateProps) {
  return (
    <Stack
      spacing={1.5}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: 320,
        p: 4,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "rgba(20, 103, 193, 0.10)",
          borderRadius: 3,
          color: "secondary.main",
          display: "grid",
          height: 64,
          placeItems: "center",
          width: 64,
        }}
      >
        <AppIcon icon="solar:cart-large-2-linear" width={32} />
      </Box>
      <Typography variant="h6">
        {hasActiveCriteria
          ? "No encontramos compras"
          : "Todavía no hay compras"}
      </Typography>
      <Typography color="text.secondary" variant="body2" sx={{ maxWidth: 440 }}>
        {hasActiveCriteria
          ? "Probá ajustando la búsqueda, la pestaña o los filtros seleccionados."
          : "Creá la primera compra para comenzar a gestionar pedidos a proveedores."}
      </Typography>
    </Stack>
  );
}
