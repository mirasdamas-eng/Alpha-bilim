-- ALPHA admin foundation for Supabase
-- Run in Supabase SQL Editor. Never put service_role/secret keys in browser code or GitHub.
create extension if not exists pgcrypto;
create table if not exists public.alpha_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.alpha_admins enable row level security;
revoke all on public.alpha_admins from anon, authenticated;
grant select on public.alpha_admins to authenticated;
drop policy if exists "Admins can read admin roster" on public.alpha_admins;
create policy "Admins can read admin roster" on public.alpha_admins for select to authenticated using (user_id = auth.uid());
create table if not exists public.alpha_admin_audit (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  target_user_id uuid,
  target_email text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.alpha_admin_audit enable row level security;
revoke all on public.alpha_admin_audit from anon, authenticated;
create or replace function public.alpha_revoke_sessions(target_user_id uuid)
returns void language sql security definer set search_path = ''
as $$ delete from auth.sessions where user_id = target_user_id; $$;
revoke all on function public.alpha_revoke_sessions(uuid) from public, anon, authenticated;
grant execute on function public.alpha_revoke_sessions(uuid) to service_role;
-- After signing up with your administrator email, run:
-- insert into public.alpha_admins(user_id)
-- select id from auth.users where lower(email) = lower('YOUR_ADMIN_EMAIL') on conflict do nothing;
-- Existing static-site accounts are NOT automatically migrated to Supabase Auth.
