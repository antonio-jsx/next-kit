"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ErrorState({
  body,
  children,
  className,
  title,
  variant = "section",
}: {
  body: string;
  children: ReactNode;
  className?: string;
  title: string;
  variant?: "page" | "section";
}) {
  if (variant === "page") {
    return (
      <main className={cn("grid place-items-center px-6 text-center", className)}>
        <div className="flex max-w-sm flex-col items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground text-sm leading-6">{body}</p>
          <div className="mt-1">{children}</div>
        </div>
      </main>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-52 flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-5 py-10 text-center",
        className,
      )}
    >
      <p className="text-xl font-medium tracking-tight">{title}</p>
      <p className="text-muted-foreground max-w-xs text-sm">{body}</p>
      {children}
    </div>
  );
}
