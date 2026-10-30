'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormField } from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth/client';
import { resetSchema } from '../types';

export function PasswordReset() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { error } = await authClient.emailOtp.requestPasswordReset({
      email: data.email,
    });

    if (error) {
      setError('root', { type: 'server', message: error.message });
      return;
    }
  });

  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-5 sm:p-8">
      <div className="mb-4">
        <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
          Recuperación
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
          Restablecer contraseña
        </h2>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        Ingresa tu correo para recibir instrucciones para crear una nueva contraseña.
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

        {errors.root && (
          <p aria-live="polite" className="text-sm font-medium text-destructive">
            {errors.root.message}
          </p>
        )}

        {isSubmitSuccessful && (
          <p aria-live="polite" className="text-sm font-medium text-emerald-600">
            Instrucciones enviadas con éxito.
          </p>
        )}

        <Button className="w-full" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Enviando...' : 'Enviar instrucciones'}
        </Button>
      </form>
    </div>
  );
}
