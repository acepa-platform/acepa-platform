-- ACEPA company account foundation
-- Mirrors the production schema applied to the ACEPA Supabase project.

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete restrict,
  name text not null check (char_length(btrim(name)) between 2 and 200),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  business_type text not null,
  industry text not null,
  country text not null,
  address text not null,
  planned_admin_count integer not null default 1 check (planned_admin_count between 1 and 100),
  authorized_representative_name text not null,
  authorized_representative_email text not null,
  authorized_representative_role text not null,
  verification_status text not null default 'not_started'
    check (verification_status in ('not_started','pending','verified','rejected')),
  profile_status text not null default 'draft'
    check (profile_status in ('draft','published','suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_members (
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'admin'
    check (role in ('owner','admin','editor','viewer')),
  status text not null default 'active'
    check (status in ('active','invited','suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (company_id, user_id)
);

create index if not exists companies_owner_user_id_idx on public.companies(owner_user_id);
create index if not exists company_members_user_id_idx on public.company_members(user_id);

alter table public.companies enable row level security;
alter table public.company_members enable row level security;

drop policy if exists "Published companies are public" on public.companies;
create policy "Published companies are public" on public.companies for select to anon, authenticated using (profile_status = 'published');
drop policy if exists "Company owners can read their company" on public.companies;
create policy "Company owners can read their company" on public.companies for select to authenticated using ((select auth.uid()) = owner_user_id);
drop policy if exists "Company members can read their company" on public.companies;
create policy "Company members can read their company" on public.companies for select to authenticated using (exists (select 1 from public.company_members cm where cm.company_id = companies.id and cm.user_id = (select auth.uid()) and cm.status = 'active'));
drop policy if exists "Authenticated users can create their company" on public.companies;
create policy "Authenticated users can create their company" on public.companies for insert to authenticated with check ((select auth.uid()) = owner_user_id);
drop policy if exists "Company owners and admins can update" on public.companies;
create policy "Company owners and admins can update" on public.companies for update to authenticated
using ((select auth.uid()) = owner_user_id or exists (select 1 from public.company_members cm where cm.company_id = companies.id and cm.user_id = (select auth.uid()) and cm.role in ('owner','admin') and cm.status = 'active'))
with check ((select auth.uid()) = owner_user_id or exists (select 1 from public.company_members cm where cm.company_id = companies.id and cm.user_id = (select auth.uid()) and cm.role in ('owner','admin') and cm.status = 'active'));

drop policy if exists "Members can read their membership" on public.company_members;
create policy "Members can read their membership" on public.company_members for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Owners and admins can read team" on public.company_members;
create policy "Owners and admins can read team" on public.company_members for select to authenticated using (exists (select 1 from public.company_members cm where cm.company_id = company_members.company_id and cm.user_id = (select auth.uid()) and cm.role in ('owner','admin') and cm.status = 'active'));
drop policy if exists "Owners and admins can add team members" on public.company_members;
create policy "Owners and admins can add team members" on public.company_members for insert to authenticated with check (exists (select 1 from public.company_members cm where cm.company_id = company_members.company_id and cm.user_id = (select auth.uid()) and cm.role in ('owner','admin') and cm.status = 'active'));
drop policy if exists "Owners and admins can update team" on public.company_members;
create policy "Owners and admins can update team" on public.company_members for update to authenticated
using (exists (select 1 from public.company_members cm where cm.company_id = company_members.company_id and cm.user_id = (select auth.uid()) and cm.role in ('owner','admin') and cm.status = 'active'))
with check (exists (select 1 from public.company_members cm where cm.company_id = company_members.company_id and cm.user_id = (select auth.uid()) and cm.role in ('owner','admin') and cm.status = 'active'));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $function$
declare
  company_name text;
  company_slug text;
  company_id uuid;
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;

  insert into public.user_preferences (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  if coalesce(new.raw_user_meta_data->>'account_type', '') = 'company' then
    company_name := btrim(new.raw_user_meta_data->>'company_name');
    company_slug := lower(regexp_replace(company_name, '[^a-zA-Z0-9]+', '-', 'g'));
    company_slug := trim(both '-' from company_slug);
    company_slug := left(company_slug, 170) || '-' || substr(replace(new.id::text, '-', ''), 1, 12);

    insert into public.companies (
      owner_user_id, name, slug, business_type, industry, country, address,
      planned_admin_count, authorized_representative_name,
      authorized_representative_email, authorized_representative_role
    )
    values (
      new.id, company_name, company_slug,
      btrim(new.raw_user_meta_data->>'business_type'),
      btrim(new.raw_user_meta_data->>'industry'),
      btrim(new.raw_user_meta_data->>'country'),
      btrim(new.raw_user_meta_data->>'address'),
      greatest(1, least(100, coalesce((new.raw_user_meta_data->>'planned_admin_count')::integer, 1))),
      btrim(new.raw_user_meta_data->>'authorized_representative_name'),
      lower(btrim(new.raw_user_meta_data->>'authorized_representative_email')),
      btrim(new.raw_user_meta_data->>'authorized_representative_role')
    )
    returning id into company_id;

    insert into public.company_members (company_id, user_id, role)
    values (company_id, new.id, 'owner')
    on conflict (company_id, user_id) do nothing;
  end if;

  return new;
end;
$function$;

revoke all on function public.handle_new_user() from public;
grant execute on function public.handle_new_user() to postgres, service_role;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

drop trigger if exists companies_set_updated_at on public.companies;
create trigger companies_set_updated_at before update on public.companies
for each row execute function public.set_updated_at();

drop trigger if exists company_members_set_updated_at on public.company_members;
create trigger company_members_set_updated_at before update on public.company_members
for each row execute function public.set_updated_at();
