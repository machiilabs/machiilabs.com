-- Announcement mailing list (opt-in product news only)
create extension if not exists "pgcrypto";

create table if not exists public.announcement_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  unsubscribe_token uuid not null default gen_random_uuid(),
  constraint announcement_subscribers_email_lower check (email = lower(email)),
  constraint announcement_subscribers_email_unique unique (email)
);

create index if not exists announcement_subscribers_active_email_idx
  on public.announcement_subscribers (email)
  where unsubscribed_at is null;

create unique index if not exists announcement_subscribers_unsubscribe_token_idx
  on public.announcement_subscribers (unsubscribe_token);

alter table public.announcement_subscribers enable row level security;

-- No policies for anon/authenticated: only service role bypasses RLS.
-- Public never reads or writes this table directly.
