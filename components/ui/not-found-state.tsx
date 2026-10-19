import { Route } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export function NotFoundState({
  body,
  title = "404 — Página no encontrada",
  link = "/",
}: {
  body: string;
  title?: string;
  link?: Route;
}) {
  return (
    <div className="flex flex-col gap-2 max-w-md">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{body}</p>

      <Link className={cn(buttonVariants({ variant: "outline" }), "self-center")} href={link}>
        Regresar
      </Link>
    </div>
  );
}
