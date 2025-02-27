import { z } from "zod";

export const AccountSchema = z.object({
  title: z
    .string({ message: "El nombre del servicio es obligatorio." })
    .trim()
    .min(1, {
      message: "El título de la cuenta debe contener al menos 1 carácter."
    })
    .max(50, {
      message: "El título de la cuenta debe contener como máximo 50 caracteres."
    }),

  url: z.string().trim().optional(),

  username: z
    .string({ message: "El nombre de usuario es obligatorio." })
    .trim()
    .min(1, {
      message: "El usuario de la cuenta debe contener al menos 1 carácter."
    })
    .max(50, {
      message:
        "El usuario de la cuenta debe contener como máximo 50 caracteres."
    }),

  password: z
    .string()
    .trim()
    .min(1, {
      message: "La contraseña de la cuenta debe contener al menos 1 carácter."
    })
    .max(50, {
      message:
        "La contraseña de la cuenta debe contener como máximo 50 caracteres."
    }),

  notes: z.string().trim().optional()
});

export type AccountFormValues = z.infer<typeof AccountSchema>;
