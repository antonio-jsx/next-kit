'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { registerSchema } from '@/app/(auth)/types';
import { FormField } from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth/client';

export function SignUp() {
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitSuccessful, isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', fullName: '', passwordRepeat: '' },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { error } = await authClient.signUp.email({
      name: data.fullName,
      email: data.email,
      password: data.password,
      callbackURL: '/dashboard',
    });

    if (error) {
      setError('root', { type: 'server', message: error.message });
      return;
    }
    reset();
  });

  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-5 sm:p-8">
      <div className="mb-4">
        <p className="text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
          Registro
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">Crear cuenta</h2>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <FormField
          control={control}
          label="Nombre completo"
          name="fullName"
          render={(field) => (
            <Input {...field} autoComplete="name" placeholder="Tu nombre" spellCheck={false} />
          )}
        />

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
              autoComplete="new-password"
              placeholder="••••••••"
              spellCheck={false}
              type="password"
            />
          )}
        />

        <FormField
          control={control}
          label="Repetir contraseña"
          name="passwordRepeat"
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
          <p aria-live="polite" className="text-sm font-medium text-destructive">
            {errors.root.message}
          </p>
        )}
        {isSubmitSuccessful && (
          <p aria-live="polite" className="text-sm font-medium text-emerald-600">
            Usuario creado con éxito.
          </p>
        )}

        <div className="pt-1">
          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{' '}
        <Link
          className="font-semibold text-primary transition-colors hover:text-primary/80"
          href="/login"
        >
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
