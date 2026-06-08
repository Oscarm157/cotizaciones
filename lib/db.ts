import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

// Cliente Neon. SOLO servidor (API routes y server components); nunca importar
// desde un client component.
// Inicializacion diferida: neon() se llama en el primer query (runtime), no al
// cargar el modulo, para que el build no truene cuando DATABASE_URL no esta.
let cached: NeonQueryFunction<false, false> | undefined;

function getSql(): NeonQueryFunction<false, false> {
  if (!cached) cached = neon(process.env.DATABASE_URL!);
  return cached;
}

export const sql = new Proxy(
  (() => undefined) as unknown as NeonQueryFunction<false, false>,
  {
    apply(_target, _thisArg, args: unknown[]) {
      return (getSql() as unknown as (...a: unknown[]) => unknown)(...args);
    },
    get(_target, prop) {
      return (getSql() as unknown as Record<string | symbol, unknown>)[prop];
    },
  },
);
