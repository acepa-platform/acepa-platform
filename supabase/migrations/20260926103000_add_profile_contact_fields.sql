-- Add editable personal contact and location fields to ACEPA profiles.
alter table public.profiles
  add column if not exists phone_number text,
  add column if not exists date_of_birth date,
  add column if not exists country text;
