import { Badge, Button, InputAdornment, Stack, TextField } from "@mui/material";

import { AppIcon } from "../../../shared/components/AppIcon";

interface PurchasesToolbarProps {
  search: string;
  activeFiltersCount: number;
  hasActiveCriteria: boolean;
  onSearchChange: (value: string) => void;
  onFiltersOpen: () => void;
  onReset: () => void;
}

export function PurchasesToolbar({
  search,
  activeFiltersCount,
  hasActiveCriteria,
  onSearchChange,
  onFiltersOpen,
  onReset,
}: PurchasesToolbarProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      sx={{
        alignItems: { xs: "stretch", sm: "center" },
        borderBottom: 1,
        borderColor: "divider",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      <TextField
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar por compra, referencia o proveedor"
        aria-label="Buscar compras"
        sx={{ width: { xs: "100%", sm: 420 } }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AppIcon icon="solar:magnifer-linear" width={20} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Badge
          badgeContent={activeFiltersCount}
          color="primary"
          invisible={activeFiltersCount === 0}
        >
          <Button
            color="inherit"
            variant="outlined"
            onClick={onFiltersOpen}
            startIcon={<AppIcon icon="solar:filter-linear" width={20} />}
          >
            Filters
          </Button>
        </Badge>

        {hasActiveCriteria && (
          <Button color="inherit" onClick={onReset}>
            Limpiar
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
