-- ============================================================
-- SQL para crear la tabla `properties` en Supabase
-- Ejecuta esto en: Dashboard → SQL Editor → New Query
-- ============================================================

create table public.properties (
  id             uuid        primary key default gen_random_uuid(),
  reference_code text        unique not null,          -- ej. 'PS-001'
  title          text        not null,
  description    text,
  price          numeric     not null,
  bedrooms       int         not null default 0,
  bathrooms      int         not null default 1,
  size_m2        numeric     not null,
  city           text        not null,
  slug           text        unique not null,          -- URL amigable: 'casa-aracena-centro'
  property_type  text        not null,                 -- 'casa', 'piso', 'finca', 'local', ...
  listing_type   text        not null check (listing_type in ('sale', 'rent')),
  status         text        not null default 'available'
                             check (status in ('available', 'reserved', 'sold')),
  featured       boolean     not null default false,
  published      boolean     not null default false,   -- solo se muestran los published = true
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Índices para las queries del frontend
create index on public.properties (published);
create index on public.properties (featured);
create index on public.properties (listing_type);
create index on public.properties (city);
create index on public.properties (slug);

-- Trigger para updated_at automático
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_properties_updated_at
  before update on public.properties
  for each row execute procedure public.set_updated_at();

-- Row Level Security
alter table public.properties enable row level security;

-- Política pública: cualquiera puede leer propiedades publicadas
create policy "Lectura pública de propiedades publicadas"
  on public.properties
  for select
  using (published = true);

-- ============================================================
-- DATOS DE EJEMPLO — borra en producción
-- ============================================================

insert into public.properties
  (reference_code, title, description, price, bedrooms, bathrooms,
   size_m2, city, slug, property_type, listing_type, status, featured, published)
values
  (
    'PS-001',
    'Casa en Aracena',
    'Amplia casa en el corazón de Aracena con patio andaluz y vistas a la sierra.',
    280000, 4, 2, 180,
    'Aracena', 'casa-aracena-centro',
    'casa', 'sale', 'available', true, true
  ),
  (
    'PS-002',
    'Cortijo Sierra Norte',
    'Cortijo rehabilitado con piscina, olivar y vistas panorámicas.',
    450000, 5, 3, 350,
    'Cortegana', 'cortijo-sierra-norte',
    'finca', 'sale', 'available', true, true
  ),
  (
    'PS-003',
    'Piso en Alquiler Aracena',
    'Cómodo piso de 3 habitaciones en zona céntrica.',
    800, 3, 1, 90,
    'Aracena', 'piso-alquiler-aracena-centro',
    'piso', 'rent', 'available', false, true
  );
