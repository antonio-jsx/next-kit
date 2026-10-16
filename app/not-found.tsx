import { NotFoundState } from "@/components/ui/not-found-state";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <NotFoundState body="La página que buscas no existe o ha sido movida. Verifica la dirección o vuelve al inicio." />
    </main>
  );
}
