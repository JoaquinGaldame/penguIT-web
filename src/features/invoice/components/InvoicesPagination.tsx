import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { AppIcon } from "../../../shared/components/AppIcon";

const rowsPerPageOptions = [5, 10, 25, 50];

interface InvoicesPaginationProps {
  limit: number;
  offset: number;
  total: number;
  onLimitChange: (limit: number) => void;
  onOffsetChange: (offset: number) => void;
}

export function InvoicesPagination({
  limit,
  offset,
  total,
  onLimitChange,
  onOffsetChange,
}: InvoicesPaginationProps) {
  const page = Math.floor(offset / limit);
  const lastPage = Math.max(0, Math.ceil(total / limit) - 1);
  const from = total === 0 ? 0 : offset + 1;
  const to = Math.min(offset + limit, total);

  const goToPage = (nextPage: number) => {
    onOffsetChange(nextPage * limit);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        alignItems: { xs: "stretch", sm: "center" },
        borderTop: 1,
        borderColor: "divider",
        justifyContent: "space-between",
        px: 2,
        py: 1.5,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography color="text.secondary" variant="body2">
          Filas por página
        </Typography>
        <Select
          size="small"
          value={limit}
          onChange={(event) => onLimitChange(Number(event.target.value))}
          inputProps={{ "aria-label": "Filas por página" }}
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography
          color="text.secondary"
          variant="body2"
          sx={{ minWidth: 110, textAlign: "center" }}
        >
          {from}–{to} de {total}
        </Typography>

        <Box sx={{ display: "flex" }}>
          <PaginationButton
            label="Ir a la primera página"
            icon="solar:double-alt-arrow-left-linear"
            disabled={page === 0}
            onClick={() => goToPage(0)}
          />
          <PaginationButton
            label="Ir a la página anterior"
            icon="solar:alt-arrow-left-linear"
            disabled={page === 0}
            onClick={() => goToPage(page - 1)}
          />
          <PaginationButton
            label="Ir a la página siguiente"
            icon="solar:alt-arrow-right-linear"
            disabled={page >= lastPage}
            onClick={() => goToPage(page + 1)}
          />
          <PaginationButton
            label="Ir a la última página"
            icon="solar:double-alt-arrow-right-linear"
            disabled={page >= lastPage}
            onClick={() => goToPage(lastPage)}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

interface PaginationButtonProps {
  label: string;
  icon: string;
  disabled: boolean;
  onClick: () => void;
}

function PaginationButton({
  label,
  icon,
  disabled,
  onClick,
}: PaginationButtonProps) {
  return (
    <Tooltip title={label}>
      <span>
        <IconButton
          aria-label={label}
          disabled={disabled}
          onClick={onClick}
          size="small"
        >
          <AppIcon icon={icon} width={21} />
        </IconButton>
      </span>
    </Tooltip>
  );
}
