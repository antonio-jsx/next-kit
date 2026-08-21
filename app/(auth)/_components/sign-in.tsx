"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/app/(auth)/types";
import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export function SignIn() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/dashboard",
    });

    if (error) {
      setError("root", { type: "server", message: error.message });
      return;
    }
  });

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
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

      {errors.root && <p className="text-red-500 text-sm">{errors.root.message}</p>}

      <Button disabled={isSubmitting} type="submit">
        Acceder
      </Button>
    </form>
  );
}
