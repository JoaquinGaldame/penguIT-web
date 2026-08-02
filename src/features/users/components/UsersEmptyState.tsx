import { Icon } from "@iconify/react";
import { Box, Stack, Typography } from "@mui/material";

import type { UsersView } from "../types/User.types";

interface UsersEmptyStateProps {
  view: UsersView;
}

export function UsersEmptyState({ view }: UsersEmptyStateProps) {
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
        <Icon
          icon={
            view === "users"
              ? "solar:users-group-rounded-linear"
              : "solar:folder-with-files-linear"
          }
          width={32}
        />
      </Box>
      <Typography variant="h6">
        {view === "users" ? "No encontramos usuarios" : "No encontramos grupos"}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        Ajustá la búsqueda o los filtros para ampliar los resultados.
      </Typography>
    </Stack>
  );
}
