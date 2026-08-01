import { Icon } from "@iconify/react";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";

interface InvoicesFiltersProps {
  search: string;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export function InvoicesFilters({
  search,
  hasActiveFilters,
  onSearchChange,
  onReset,
}: InvoicesFiltersProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      sx={{ alignItems: { xs: "stretch", sm: "center" }, p: 2 }}
    >
      <TextField
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar por factura, cliente o email"
        aria-label="Buscar facturas"
        sx={{ maxWidth: { sm: 440 } }}
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

      {hasActiveFilters && (
        <Button
          color="inherit"
          onClick={onReset}
          startIcon={<Icon icon="solar:restart-linear" width={19} />}
          sx={{ whiteSpace: "nowrap" }}
        >
          Limpiar filtros
        </Button>
      )}
    </Stack>
  );
}
