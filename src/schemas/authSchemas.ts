import { z } from "zod";

export const loginSchema = z
  .object({
    name: z
      .string()
      .min(2, "Mínimo 2 caracteres")
      .regex(/^[a-zA-Z]+$/, {
        message: "Usa solo letras para el nombre",
      }),
    email: z.email("Email inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Las contraseñas no coinciden",
  });

export type LoginSchemaForm = z.infer<typeof loginSchema>;
