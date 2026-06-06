-- Tabla de briefs por cotizacion. Correr en el SQL editor de Supabase
-- (proyecto ref: nftocxqgdutoijgmqgzw). Es una tabla NUEVA, no toca la tabla `briefs` de ADAF.

create table if not exists public.quote_briefs (
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
  on public.quote_briefs (quote_slug, status, created_at desc);

alter table public.quote_briefs enable row level security;

create policy "anon insert" on public.quote_briefs
  for insert to anon with check (true);
create policy "anon update" on public.quote_briefs
  for update to anon using (true) with check (true);
create policy "anon select" on public.quote_briefs
  for select to anon using (true);

-- El bucket de archivos `brief-files` ya existe (lo usa ADAF) y es publico.
-- Se reutiliza tal cual; los archivos se guardan en rutas unicas por brief id.
