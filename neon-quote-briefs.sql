-- Tabla de briefs por cotizacion. Correr en la consola SQL del proyecto Neon
-- de cotizaciones. Neon no usa RLS/anon: el acceso es solo del lado servidor
-- (API routes y server components) via DATABASE_URL.

create table if not exists quote_briefs (
  id          uuid primary key default gen_random_uuid(),
  quote_slug  text not null,
  client_name text,
  status      text not null default 'draft' check (status in ('draft','submitted')),
  answers     jsonb not null default '{}'::jsonb,
  files       jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists quote_briefs_slug_status_idx
  on quote_briefs (quote_slug, status, created_at desc);

-- Los archivos (logo, imagenes) se guardan en Vercel Blob, no en la DB.
-- Solo se almacena su metadata (url, nombre, tamano) en la columna files.
