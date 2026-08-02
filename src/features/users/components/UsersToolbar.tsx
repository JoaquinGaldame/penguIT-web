import { Icon } from "@iconify/react";
import {
  Badge,
  Box,
  Button,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";

import type { UsersView } from "../types/User.types";

interface UsersToolbarProps {
  search: string;
  view: UsersView;
  activeFiltersCount: number;
  onFiltersOpen: () => void;
  onSearchChange: (value: string) => void;
  onViewChange: (view: UsersView) => void;
}

export function UsersToolbar({
  search,
  view,
  activeFiltersCount,
  onFiltersOpen,
  onSearchChange,
  onViewChange,
}: UsersToolbarProps) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{
        alignItems: { xs: "stretch", md: "center" },
        borderBottom: 1,
        borderColor: "divider",
        justifyContent: "space-between",
        px: 2,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.25}
        sx={{ alignItems: { sm: "center" }, py: 1.5 }}
      >
        <TextField
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={
            view === "users" ? "Buscar usuarios" : "Buscar grupos de usuarios"
          }
          aria-label={
            view === "users" ? "Buscar usuarios" : "Buscar grupos de usuarios"
          }
          sx={{ minWidth: { sm: 320 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="solar:magnifer-linear" width={20} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Badge
          badgeContent={activeFiltersCount}
          color="primary"
          invisible={activeFiltersCount === 0}
        >
          <Button
            color="inherit"
            variant="outlined"
            onClick={onFiltersOpen}
            startIcon={<Icon icon="solar:filter-linear" width={20} />}
          >
            Filters
          </Button>
        </Badge>
      </Stack>

      <Box sx={{ alignSelf: { xs: "stretch", md: "flex-end" } }}>
        <Tabs
          value={view}
          onChange={(_, nextView: UsersView) => onViewChange(nextView)}
          aria-label="Cambiar listado de usuarios"
          variant="scrollable"
          scrollButtons={false}
        >
          <Tab value="users" label="List" sx={{ minHeight: 64 }} />
          <Tab value="groups" label="Group List" sx={{ minHeight: 64 }} />
        </Tabs>
      </Box>
    </Stack>
  );
}