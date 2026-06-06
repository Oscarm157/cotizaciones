import { login } from "../actions";
import { isAdmin } from "../auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main className="slide-light min-h-screen w-full flex items-center justify-center px-6">
      <form
        action={login}
        className="w-full max-w-sm bg-card border border-card-border rounded-2xl p-8"
      >
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold tracking-tight text-primary">Bravo Publicidad</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
        </div>
        <h1 className="mt-4 text-xl font-semibold text-primary">Panel de briefs</h1>
        <p className="mt-1 text-sm text-muted">Ingresa la contraseña para ver los briefs enviados.</p>

        <input
          name="password"
          type="password"
          autoFocus
          placeholder="Contraseña"
          className="mt-6 w-full bg-surface-muted rounded-lg border-none focus:ring-0 focus:outline-none px-4 py-3 text-base text-primary placeholder:text-muted-light"
        />
        {error && <p className="mt-2 text-sm text-danger">Contraseña incorrecta.</p>}

        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold hover:bg-primary/90 transition"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
