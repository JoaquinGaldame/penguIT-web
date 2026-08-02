import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm, type Path } from "react-hook-form";

import {
  createUserSchema,
  type CreateUserFormInput,
  type CreateUserFormValues,
} from "../schemas/userSchema";
import {
  USER_ROLE_LABELS,
  USER_STATUS_LABELS,
  type UserGroup,
  type UserRole,
  type UserStatus,
} from "../types/User.types";

const sections = [
  "Información personal",
  "Acceso y grupos",
  "Configuración de cuenta",
  "Confirmación",
] as const;

const fieldsBySection: Array<Array<Path<CreateUserFormInput>>> = [
  ["firstName", "lastName", "email", "phone"],
  ["role", "groupIds"],
  ["status", "sendInvitation"],
  [],
];

const fieldGridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "minmax(0, 1fr)",
    md: "repeat(2, minmax(0, 1fr))",
  },
  gap: 2,
};

interface UserFormProps {
  groups: UserGroup[];
  isSubmitting?: boolean;
  submitError?: string;
  onCancel: () => void;
  onSubmit: (values: CreateUserFormValues) => Promise<void>;
}

export function UserForm({
  groups,
  isSubmitting = false,
  submitError,
  onCancel,
  onSubmit,
}: UserFormProps) {
  const [activeSection, setActiveSection] = useState(0);
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    trigger,
  } = useForm<CreateUserFormInput, unknown, CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: undefined,
      groupIds: [],
      status: "invited",
      sendInvitation: true,
    },
    mode: "onBlur",
  });

  const proceed = async (sectionIndex: number) => {
    if (await trigger(fieldsBySection[sectionIndex])) {
      setActiveSection((current) => Math.min(current + 1, sections.length - 1));
    }
  };

  const reviewValues =
    activeSection === sections.length - 1 ? getValues() : undefined;
  const selectedGroupNames = groups
    .filter((group) => reviewValues?.groupIds.includes(group.id))
    .map((group) => group.name)
    .join(", ");

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {submitError && (
        <Alert severity="error" sx={{ m: { xs: 2, md: 3 }, mb: 0 }}>
          {submitError}
        </Alert>
      )}

      {sections.map((section, index) => (
        <Accordion
          key={section}
          expanded={activeSection === index}
          onChange={() => setActiveSection(index)}
          disableGutters
          elevation={0}
          square
          slotProps={{ transition: { unmountOnExit: true } }}
          sx={{
            "&::before": { display: "none" },
            borderBottom: index < sections.length - 1 ? 1 : 0,
            borderColor: "divider",
          }}
        >
          <AccordionSummary sx={{ minHeight: 76, px: { xs: 2, md: 3 } }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  alignItems: "center",
                  bgcolor:
                    index < activeSection
                      ? "success.main"
                      : index === activeSection
                        ? "primary.main"
                        : "action.hover",
                  borderRadius: "50%",
                  color:
                    index <= activeSection ? "common.white" : "text.secondary",
                  display: "flex",
                  height: 30,
                  justifyContent: "center",
                  width: 30,
                }}
              >
                {index < activeSection ? (
                  <Icon icon="solar:check-circle-linear" width={18} />
                ) : (
                  index + 1
                )}
              </Box>

              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {section}
              </Typography>
            </Stack>
          </AccordionSummary>

          <AccordionDetails sx={{ px: { xs: 2, md: 8 }, pb: 3 }}>
            {index === 0 && (
              <Box sx={fieldGridSx}>
                <TextField
                  label="Nombre"
                  autoComplete="given-name"
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                  {...register("firstName")}
                />
                <TextField
                  label="Apellido"
                  autoComplete="family-name"
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                  {...register("lastName")}
                />
                <TextField
                  type="email"
                  label="Correo electrónico"
                  autoComplete="email"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  {...register("email")}
                />
                <TextField
                  label="Teléfono"
                  autoComplete="tel"
                  error={Boolean(errors.phone)}
                  helperText={errors.phone?.message ?? "Opcional"}
                  {...register("phone")}
                />
              </Box>
            )}

            {index === 1 && (
              <Stack spacing={3}>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Rol principal"
                      value={field.value ?? ""}
                      error={Boolean(errors.role)}
                      helperText={
                        errors.role?.message ??
                        "Define el nivel de acceso principal del usuario."
                      }
                      sx={{ maxWidth: { md: 420 } }}
                    >
                      {(
                        Object.entries(USER_ROLE_LABELS) as Array<
                          [UserRole, string]
                        >
                      ).map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name="groupIds"
                  control={control}
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.groupIds)}>
                      <FormLabel>Grupos de acceso</FormLabel>
                      <FormHelperText sx={{ mx: 0, mb: 1 }}>
                        Seleccioná uno o más grupos para complementar los
                        permisos.
                      </FormHelperText>
                      <FormGroup
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            xs: "minmax(0, 1fr)",
                            md: "repeat(2, minmax(0, 1fr))",
                          },
                          gap: 1,
                        }}
                      >
                        {groups.map((group) => (
                          <FormControlLabel
                            key={group.id}
                            control={
                              <Checkbox
                                checked={field.value.includes(group.id)}
                                onChange={(_, checked) =>
                                  field.onChange(
                                    checked
                                      ? [...field.value, group.id]
                                      : field.value.filter(
                                          (id) => id !== group.id,
                                        ),
                                  )
                                }
                              />
                            }
                            label={
                              <Box>
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: 700 }}
                                >
                                  {group.name}
                                </Typography>
                                <Typography
                                  color="text.secondary"
                                  variant="caption"
                                >
                                  {group.description}
                                </Typography>
                              </Box>
                            }
                            sx={{
                              alignItems: "flex-start",
                              border: 1,
                              borderColor: "divider",
                              borderRadius: 1,
                              m: 0,
                              p: 1,
                            }}
                          />
                        ))}
                      </FormGroup>
                      {errors.groupIds && (
                        <FormHelperText>
                          {errors.groupIds.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Stack>
            )}

            {index === 2 && (
              <Stack spacing={2.5}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Estado inicial"
                      helperText="Podrás modificarlo luego desde la administración de usuarios."
                      sx={{ maxWidth: { md: 420 } }}
                    >
                      {(
                        Object.entries(USER_STATUS_LABELS) as Array<
                          [UserStatus, string]
                        >
                      ).map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />

                <Controller
                  name="sendInvitation"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      }
                      label="Enviar invitación por correo electrónico"
                    />
                  )}
                />

                <Alert severity="info" variant="outlined">
                  La invitación permitirá que el usuario establezca sus
                  credenciales de acceso de forma segura.
                </Alert>
              </Stack>
            )}

            {index === 3 && (
              <Stack spacing={1.5} divider={<Divider flexItem />}>
                <ReviewRow
                  label="Usuario"
                  value={
                    `${reviewValues?.firstName ?? ""} ${reviewValues?.lastName ?? ""}`.trim() ||
                    "Sin nombre"
                  }
                />
                <ReviewRow
                  label="Correo"
                  value={reviewValues?.email || "Sin correo"}
                />
                <ReviewRow
                  label="Rol"
                  value={
                    reviewValues?.role
                      ? USER_ROLE_LABELS[reviewValues.role]
                      : "Sin definir"
                  }
                />
                <ReviewRow
                  label="Grupos"
                  value={selectedGroupNames || "Sin grupos"}
                />
                <ReviewRow
                  label="Estado inicial"
                  value={
                    reviewValues?.status
                      ? USER_STATUS_LABELS[reviewValues.status]
                      : "Sin definir"
                  }
                />
                <ReviewRow
                  label="Invitación"
                  value={
                    reviewValues?.sendInvitation
                      ? "Se enviará por correo"
                      : "No enviar"
                  }
                />
              </Stack>
            )}

            <Stack
              direction="row"
              spacing={1.5}
              sx={{ mt: 3, justifyContent: "flex-end" }}
            >
              {index > 0 && (
                <Button onClick={() => setActiveSection(index - 1)}>
                  Anterior
                </Button>
              )}

              {index < sections.length - 1 ? (
                <Button variant="contained" onClick={() => proceed(index)}>
                  Guardar y continuar
                </Button>
              ) : (
                <>
                  <Button onClick={onCancel}>Cancelar</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creando…" : "Crear usuario"}
                  </Button>
                </>
              )}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between" }}>
      <Typography color="text.secondary">{label}</Typography>
      <Typography sx={{ fontWeight: 700, textAlign: "right" }}>
        {value}
      </Typography>
    </Stack>
  );
}
