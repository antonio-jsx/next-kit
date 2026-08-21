"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/app/(auth)/types";
import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export function SignUp() {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitSuccessful, isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", fullName: "", passwordRepeat: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { error } = await authClient.signUp.email({
      name: data.fullName,
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard",
    });

    if (error) {
      setError("root", { type: "server", message: error.message });
      return;
    }
    reset();
  });

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <FormField
        control={control}
        label="Nombre completo"
        name="fullName"
        render={(field) => <Input {...field} />}
      />

      <FormField
        control={control}
        label="Correo"
        name="email"
        render={(field) => <Input type="email" {...field} />}
      />

      <FormField
        control={control}
        label="Contraseña"
        name="password"
        render={(field) => <Input placeholder="••••••••" type="password" {...field} />}
      />

      <FormField
        control={control}
        label="Repetir contraseña"
        name="passwordRepeat"
        render={(field) => <Input placeholder="••••••••" type="password" {...field} />}
      />

      {errors.root && <p className="text-red-500 text-sm">{errors.root.message}</p>}
      {isSubmitSuccessful && <p className="text-green-800">Usuario creado con éxito</p>}

      <Button disabled={isSubmitting} type="submit">
        Crear cuenta
      </Button>
    </form>
  );
}
