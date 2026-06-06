import { neon } from "@neondatabase/serverless";

// Cliente Neon. SOLO servidor (API routes y server components); nunca importar
// desde un client component.
export const sql = neon(process.env.DATABASE_URL!);
