import { Button, Divider, Stack } from "@mui/material";

interface SettingsFormActionsProps {
  isDirty: boolean;
  isSaving: boolean;
  onDiscard: () => void;
}

export function SettingsFormActions({
  isDirty,
  isSaving,
  onDiscard,
}: SettingsFormActionsProps) {
  return (
    <>
      <Divider />
      <Stack direction="row" spacing={1.5} sx={{ justifyContent: "flex-end" }}>
        <Button disabled={!isDirty || isSaving} onClick={onDiscard}>
          Descartar cambios
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!isDirty || isSaving}
        >
          {isSaving ? "Guardando…" : "Guardar configuración"}
        </Button>
      </Stack>
    </>
  );
}
