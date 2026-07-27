import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Ingresá tu correo electrónico.')
    .email('Ingresá un correo electrónico válido.'),

  password: z
    .string()
    .min(1, 'Ingresá tu contraseña.')
    .min(8, 'La contraseña debe contener al menos 8 caracteres.'),

  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;