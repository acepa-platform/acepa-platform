create table if not exists public.opportunity_participations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  opportunity_id uuid references public.opportunities(id) on delete set null,
  opportunity_slug text not null,
  opportunity_title text not null,
  company_name text not null,
  category text not null,
  action text not null,
  status text not null default 'submitted'
    check (status in ('submitted','under_review','shortlisted','accepted','rejected','in_progress','completed','cancelled')),
  payment_status text
    check (payment_status is null or payment_status in ('not_required','pending','successful','failed','refunded','successful_demo')),
  amount numeric(18,2),
  currency text not null default 'USD',
  funding_source text,
  reference_id text not null unique,
  details jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists opportunity_participations_user_id_idx
  on public.opportunity_participations(user_id);

create index if not exists opportunity_participations_opportunity_id_idx
  on public.opportunity_participations(opportunity_id);

create index if not exists opportunity_participations_user_submitted_idx
  on public.opportunity_participations(user_id, submitted_at desc);

alter table public.opportunity_participations enable row level security;

drop policy if exists "Users can view their own opportunity participations" on public.opportunity_participations;
create policy "Users can view their own opportunity participations"
on public.opportunity_participations
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own opportunity participations" on public.opportunity_participations;
create policy "Users can create their own opportunity participations"
on public.opportunity_participations
for insert
to authenticated
with check ((select auth.uid()) = user_id);

grant select, insert on public.opportunity_participations to authenticated;
