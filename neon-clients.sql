-- Tabla de clientes del brief. Cada cliente define qué secciones aparecen.
-- Correr en la consola SQL de Neon (mismo proyecto que quote_briefs).

create table if not exists clients (
  slug        text primary key,
  title       text not null,
  folio       text not null default '',
  sections    jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Seed de los clientes actuales (config equivalente al comportamiento previo).
insert into clients (slug, title, folio, sections) values
('rentasa', 'Rentasa, Proyectos Inmobiliarios', 'WB-133',
 '{"identidad":true,"vision":true,"audiencia":true,"servicios":true,"contenido":true,"agente":true,"bilingue":false,"bilinguepref":false,"redes":false,"portal":true,"contacto":true,"dominio":true,"integraciones":true,"plazos":true,"referencias":true}'::jsonb),
('intransittech', 'Intransit Technologies Corp', '384',
 '{"identidad":true,"vision":true,"audiencia":true,"servicios":true,"contenido":true,"agente":true,"bilingue":true,"bilinguepref":false,"redes":false,"portal":true,"contacto":true,"dominio":true,"integraciones":true,"plazos":true,"referencias":true}'::jsonb),
('pescador', 'Daniel Alejandro Pescador Silva', 'WB-134',
 '{"identidad":true,"vision":true,"audiencia":true,"servicios":true,"contenido":true,"agente":false,"bilingue":false,"bilinguepref":false,"redes":true,"portal":false,"contacto":true,"dominio":true,"integraciones":true,"plazos":true,"referencias":true}'::jsonb),
('bustamante', 'Hector Bustamante', 'WB-135',
 '{"identidad":true,"vision":true,"audiencia":true,"servicios":true,"contenido":true,"agente":true,"bilingue":true,"bilinguepref":false,"redes":false,"portal":false,"contacto":true,"dominio":true,"integraciones":true,"plazos":true,"referencias":true}'::jsonb),
('vbt', 'VBT Consultores', '',
 '{"identidad":true,"vision":true,"audiencia":true,"servicios":true,"contenido":true,"agente":false,"bilingue":false,"bilinguepref":true,"redes":false,"portal":false,"contacto":true,"dominio":false,"integraciones":false,"plazos":false,"referencias":true}'::jsonb)
on conflict (slug) do nothing;
