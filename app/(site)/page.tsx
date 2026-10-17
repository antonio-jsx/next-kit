import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const stack = ["Next.js 16", "TypeScript", "Tailwind 4", "Drizzle", "Better Auth", "Postgres"];

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center text-foreground">
      <div className="relative w-full max-w-6xl overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-muted-foreground text-sm">
          <Sparkles className="size-4 text-primary" />
          Starter kit para Next.js
        </div>

        <h1 className="max-w-xl font-semibold text-4xl text-foreground tracking-tight sm:text-5xl">
          Empieza tu app en minutos, no en semanas.
        </h1>

        <p className="mt-4 max-w-xl text-base text-muted-foreground leading-7 sm:text-lg">
          Next-Kit te da la base real para construir tu producto con auth, base de datos, UI moderna
          y estructura lista para crecer sin repetir setup desde cero.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link className={cn(buttonVariants({ variant: "default", size: "lg" }))} href="/registro">
            Probar starter
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              className="border border-border bg-background/80 px-2.5 py-1 text-muted-foreground text-xs"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
