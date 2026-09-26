-- Complete persisted settings data and profile avatar storage.
-- Applied to the ACEPA Supabase project while this migration is committed to source control
-- so future environments can reproduce the same settings schema.

alter table public.profiles
  add column if not exists business_info jsonb not null default '{}'::jsonb,
  add column if not exists addresses jsonb not null default '[]'::jsonb,
  add column if not exists social_links jsonb not null default '{}'::jsonb,
  add column if not exists identity_status text not null default 'not_started',
  add column if not exists identity_updated_at timestamptz;

alter table public.profiles
  drop constraint if exists profiles_identity_status_check;

alter table public.profiles
  add constraint profiles_identity_status_check
  check (identity_status in ('not_started','pending','verified','rejected'));

alter table public.user_preferences
  add column if not exists profile_visibility text not null default 'public';

alter table public.user_preferences
  drop constraint if exists user_preferences_profile_visibility_check;

alter table public.user_preferences
  add constraint user_preferences_profile_visibility_check
  check (profile_visibility in ('public','members','private'));

create table if not exists public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  method_type text not null default 'card',
  provider text,
  label text not null,
  last4 text,
  external_reference text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint payment_methods_method_type_check
    check (method_type in ('card','bank_account','wallet','other')),
  constraint payment_methods_status_check
    check (status in ('active','inactive')),
  constraint payment_methods_last4_check
    check (last4 is null or last4 ~ '^[0-9]{4}$')
);

alter table public.payment_methods enable row level security;

drop policy if exists "Users can view their own payment methods" on public.payment_methods;
create policy "Users can view their own payment methods"
  on public.payment_methods for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can add their own payment methods" on public.payment_methods;
create policy "Users can add their own payment methods"
  on public.payment_methods for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own payment methods" on public.payment_methods;
create policy "Users can update their own payment methods"
  on public.payment_methods for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own payment methods" on public.payment_methods;
create policy "Users can delete their own payment methods"
  on public.payment_methods for delete to authenticated
  using ((select auth.uid()) = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  5242880,
  array['image/jpeg','image/png','image/gif','image/webp']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "ACEPA avatar uploads" on storage.objects;
create policy "ACEPA avatar uploads"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "ACEPA avatar updates" on storage.objects;
create policy "ACEPA avatar updates"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "ACEPA avatar deletes" on storage.objects;
create policy "ACEPA avatar deletes"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "ACEPA avatar metadata access" on storage.objects;
create policy "ACEPA avatar metadata access"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
