create table if not exists public.user_opportunity_lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  opportunity_slug text not null,
  opportunity_title text not null,
  company_name text not null,
  category text not null,
  list_type text not null check (list_type in ('saved','watchlist')),
  created_at timestamptz not null default now(),
  unique (user_id, opportunity_slug, list_type)
);

create index if not exists user_opportunity_lists_user_type_idx
  on public.user_opportunity_lists(user_id, list_type, created_at desc);

create index if not exists user_opportunity_lists_slug_idx
  on public.user_opportunity_lists(opportunity_slug);

alter table public.user_opportunity_lists enable row level security;

drop policy if exists "Users can view their own opportunity lists" on public.user_opportunity_lists;
create policy "Users can view their own opportunity lists"
on public.user_opportunity_lists
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can add to their own opportunity lists" on public.user_opportunity_lists;
create policy "Users can add to their own opportunity lists"
on public.user_opportunity_lists
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can remove from their own opportunity lists" on public.user_opportunity_lists;
create policy "Users can remove from their own opportunity lists"
on public.user_opportunity_lists
for delete
to authenticated
using ((select auth.uid()) = user_id);

grant select, insert, delete on public.user_opportunity_lists to authenticated;
