"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/app/(auth)/types";
import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";

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
    <div className="w-full max-w-sm rounded-xl border bg-card p-5 sm:p-8">
      <div className="mb-4">
        <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.22em]">
          Acceso
        </p>
        <h2 className="mt-1 font-semibold text-foreground text-xl tracking-tight">
          Iniciar sesión
        </h2>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={control}
          label="Correo"
          name="email"
          render={(field) => (
            <Input
              {...field}
              autoComplete="email"
              placeholder="tu@correo.com"
              spellCheck={false}
              type="email"
            />
          )}
        />

        <FormField
          control={control}
          label="Contraseña"
          name="password"
          render={(field) => (
            <Input
              {...field}
              autoComplete="current-password"
              placeholder="••••••••"
              spellCheck={false}
              type="password"
            />
          )}
        />

        <Link
          className="mb-2 inline-block text-primary text-sm transition-colors hover:text-primary/80"
          href="/password-reset"
        >
          ¿Olvidaste tu contraseña?
        </Link>

        {errors.root && (
          <p aria-live="polite" className="font-medium text-destructive text-sm">
            {errors.root.message}
          </p>
        )}

        <Button className="w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Accediendo..." : "Acceder"}
        </Button>
      </form>

      <p className="mt-6 text-center text-muted-foreground text-sm">
        ¿No tienes cuenta?{" "}
        <Link
          className="font-semibold text-primary transition-colors hover:text-primary/80"
          href="/registro"
        >
          Crear una cuenta
        </Link>
      </p>
    </div>
  );
}
