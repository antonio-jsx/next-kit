import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Ingresa un correo valido").min(1, "Ingresa un correo"),
  password: z.string().min(8, "Ingrese contraseña"),
});

export const registerSchema = loginSchema
  .extend({
    fullName: z.string().min(1, "El nombre completo es obligatorio"),
    passwordRepeat: z.string().min(1, "Repetir contraseña es obligatorio"),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Las contraseñas no coinciden",
    path: ["passwordRepeat"],
  });
