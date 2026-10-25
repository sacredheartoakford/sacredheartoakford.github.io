-- ============================================================================
-- Sacred Heart Secondary School — Neon Postgres schema
-- Migrated from Supabase. Run against the direct (non-pooled) DATABASE_URL.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- 1. Tables
-- ---------------------------------------------------------------------------
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  date_of_birth date,
  gender text,
  email text,
  phone text,
  previous_school text,
  application_year integer,
  grade_applying_for text,
  extracurricular text,
  created_at timestamptz not null default now()
);

create table if not exists public.application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  kind text not null check (kind in ('report', 'parent_id', 'birth_cert')),
  storage_key text not null,
  file_name text,
  content_type text,
  created_at timestamptz not null default now()
);

create index if not exists idx_applications_created
  on public.applications (created_at desc);
create index if not exists idx_docs_application
  on public.application_documents (application_id);

-- ---------------------------------------------------------------------------
-- 2. RLS policies
--    Neon Postgres: authenticated role = the connecting user (neondb_owner).
--    Anonymous access is NOT a Postgres role — the app enforces it in code.
--    RLS here is defense-in-depth: only the app's owner role can read.
-- ---------------------------------------------------------------------------
alter table public.applications enable row level security;
alter table public.application_documents enable row level security;

-- Allow the owner full access (the app connects as neondb_owner)
drop policy if exists "owner full access applications" on public.applications;
create policy "owner full access applications"
  on public.applications
  for all
  using (true)
  with check (true);

drop policy if exists "owner full access documents" on public.application_documents;
create policy "owner full access documents"
  on public.application_documents
  for all
  using (true)
  with check (true);
