"use client";

import { Loader2 } from "lucide-react";
import { catchError, type ErrorInfo } from "next/error";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";

function ErrorFallback(props: { className?: string; title?: string }, { retry }: ErrorInfo) {
  const [isPending, startTransition] = useTransition();

  return (
    <ErrorState
      body="No se ha podido cargar esta sección."
      className={props.className}
      title={props.title ?? "Algo salió mal"}
    >
      <Button
        aria-busy={isPending}
        disabled={isPending}
        onClick={() => startTransition(() => retry())}
        size="sm"
        variant="secondary"
      >
        {isPending && <Loader2 className="animate-spin" />}
        {isPending ? "Reintentando…" : "Intentar otra vez"}
      </Button>
    </ErrorState>
  );
}

export default catchError(ErrorFallback);
