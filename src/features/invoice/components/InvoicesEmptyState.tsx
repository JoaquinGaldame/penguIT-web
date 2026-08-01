import { Icon } from "@iconify/react";
import { Box, Stack, Typography } from "@mui/material";

interface InvoicesEmptyStateProps {
  hasActiveFilters: boolean;
}

export function InvoicesEmptyState({
  hasActiveFilters,
}: InvoicesEmptyStateProps) {
  return (
    <Stack
      spacing={1.5}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: 300,
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
        <Icon icon="solar:bill-list-linear" width={32} />
      </Box>

      <Typography variant="h6">
        {hasActiveFilters
          ? "No encontramos facturas"
          : "Todavía no hay facturas"}
      </Typography>

      <Typography color="text.secondary" variant="body2" sx={{ maxWidth: 420 }}>
        {hasActiveFilters
          ? "Probá con otra búsqueda o seleccioná una pestaña diferente."
          : "Creá la primera factura para comenzar a gestionar la facturación."}
      </Typography>
    </Stack>
  );
}
