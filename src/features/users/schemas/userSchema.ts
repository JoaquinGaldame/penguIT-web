import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Ingresá el nombre del usuario.")
    .max(80, "El nombre admite hasta 80 caracteres."),
  lastName: z
    .string()
    .trim()
    .min(2, "Ingresá el apellido del usuario.")
    .max(80, "El apellido admite hasta 80 caracteres."),
  email: z
    .string()
    .trim()
    .email("Ingresá un correo electrónico válido.")
    .transform((value) => value.toLocaleLowerCase("es")),
  phone: z
    .string()
    .trim()
    .max(30, "El teléfono admite hasta 30 caracteres.")
    .optional()
    .transform((value) => value || undefined),
  role: z.enum(["administrator", "manager", "cashier", "kitchen", "waiter"], {
    error: "Seleccioná un rol.",
  }),
  groupIds: z.array(z.string()).min(1, "Seleccioná al menos un grupo."),
  status: z.enum(["active", "invited", "suspended"]),
  sendInvitation: z.boolean(),
});

export type CreateUserFormInput = z.input<typeof createUserSchema>;
export type CreateUserFormValues = z.infer<typeof createUserSchema>;
