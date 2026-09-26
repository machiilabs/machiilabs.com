-- Unlisted pond guide (/pond). Marketing pages do not query these tables.
-- No policies for anon or authenticated: the public anon key cannot read or
-- write pond rows. Only the service role bypasses RLS.

create extension if not exists "pgcrypto";

create table if not exists public.pond_days (
  phoenix_date date primary key,
  photo_path text,
  clarity text,
  color text,
  string_algae text,
  debris text,
  chlorine text,
  nitrate text,
  nitrite text,
  alkalinity text,
  ph text,
  phosphate text,
  phosphate_band text,
  product_status jsonb not null default '{}'::jsonb,
  steps_advised jsonb not null default '[]'::jsonb,
  steps_taken jsonb not null default '{}'::jsonb,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pond_days_clarity_check
    check (clarity is null or clarity in ('clear', 'slightly_hazy', 'cloudy', 'murky')),
  constraint pond_days_string_algae_check
    check (string_algae is null or string_algae in ('none', 'some', 'heavy')),
  constraint pond_days_debris_check
    check (debris is null or debris in ('none', 'light', 'heavy')),
  constraint pond_days_phosphate_band_check
    check (phosphate_band is null or phosphate_band in ('low', 'above', 'unsure'))
);

alter table public.pond_days enable row level security;

create table if not exists public.pond_product_memory (
  product text primary key,
  amount text,
  interval_days integer,
  updated_at timestamptz not null default now(),
  constraint pond_product_memory_product_check
    check (product in ('green_clean', 'clarity_max', 'phosphate_remover', 'dechlorinator')),
  constraint pond_product_memory_interval_check
    check (interval_days is null or (interval_days > 0 and interval_days <= 365))
);

alter table public.pond_product_memory enable row level security;

-- Private photos. No storage policies for this bucket, so the anon key
-- cannot read or upload. Service role bypasses storage RLS.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'pond-photos',
  'pond-photos',
  false,
  1572864,
  array['image/jpeg']
)
on conflict (id) do update
set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
