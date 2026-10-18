"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { changeSchema } from "../types";

export function PasswordChange() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    resolver: zodResolver(changeSchema),
    defaultValues: { email: "", otp: "", password: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { error } = await authClient.emailOtp.resetPassword({
      email: data.email,
      otp: data.otp,
      password: data.password,
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
          Seguridad
        </p>
        <h2 className="mt-1 font-semibold text-foreground text-xl tracking-tight">
          Actualizar contraseña
        </h2>
      </div>

      <p className="mb-4 text-muted-foreground text-sm">
        Introduce tu correo, el código recibido y la nueva contraseña para terminar la recuperación.
      </p>

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
          label="Código de verificación"
          name="otp"
          render={(field) => (
            <Input {...field} autoComplete="otp" placeholder="123456" spellCheck={false} />
          )}
        />

        <FormField
          control={control}
          label="Nueva contraseña"
          name="password"
          render={(field) => (
            <Input
              {...field}
              autoComplete="new-password"
              placeholder="••••••••"
              spellCheck={false}
              type="password"
            />
          )}
        />

        {errors.root && (
          <p aria-live="polite" className="font-medium text-destructive text-sm">
            {errors.root.message}
          </p>
        )}

        {isSubmitSuccessful && (
          <p aria-live="polite" className="font-medium text-emerald-600 text-sm">
            Contraseña actualizada con éxito.
          </p>
        )}

        <Button className="w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Guardando..." : "Guardar contraseña"}
        </Button>
      </form>
    </div>
  );
}
