-- Walking-skeleton migration: proves the migration pipeline works end to end.
-- Real tables arrive with real stories. Every new table MUST enable RLS.

create table if not exists public.app_meta (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.app_meta enable row level security;

-- Public read of non-sensitive metadata; no public writes.
create policy "app_meta is readable by everyone"
  on public.app_meta for select
  using (true);

insert into public.app_meta (key, value)
values ('schema_version', '1')
on conflict (key) do nothing;
