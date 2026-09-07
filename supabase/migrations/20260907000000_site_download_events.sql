-- Site download click events (from /api/download redirects)
create table if not exists public.site_download_events (
  id bigint generated always as identity primary key,
  product text not null,
  created_at timestamptz not null default now(),
  constraint site_download_events_product_check
    check (product in ('flasher', 'skagway'))
);

create index if not exists site_download_events_product_created_idx
  on public.site_download_events (product, created_at desc);

alter table public.site_download_events enable row level security;

-- No policies for anon/authenticated: only service role bypasses RLS.
