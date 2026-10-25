-- ============================================================================
-- Sacred Heart Secondary School — Supabase schema (replaces Google Sheets)
-- ============================================================================
-- Run this WHOLE file in the Supabase SQL editor (Database → SQL → New query).
-- It is idempotent: safe to re-run if you need to fix something later.
--
-- What it creates:
--   * applications            — one row per application (the 13-col sheet)
--   * application_documents   — metadata for the 3 uploaded files
--   * storage bucket "documents" — where the actual PDFs/images live
--   * RLS policies           — anon can INSERT (public form),
--                                authenticated can SELECT/UPDATE (admin)
--
-- After running this, create ONE admin account:
--   Supabase Dashboard → Authentication → Users → "Add user"
--   (any email + password, e.g. admin@sacredhearts.co.za / a strong password)
--   That user logs in on the /#/admin page. RLS keys admin = any
--   authenticated user, so for this school that single account is fine.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";   -- gen_random_uuid()

-- ---------------------------------------------------------------------------
-- 2. Tables
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
  storage_path text not null,
  file_name text,
  content_type text,
  created_at timestamptz not null default now()
);

-- Ensure content_type exists (added in a later revision of the form code)
alter table public.application_documents
  add column if not exists content_type text;

create index if not exists idx_applications_created
  on public.applications (created_at desc);
create index if not exists idx_docs_application
  on public.application_documents (application_id);

-- ---------------------------------------------------------------------------
-- 3. Data API exposure (GRANT)
--    Supabase tables in the public schema are NOT automatically exposed via
--    the Data (REST) API. We must explicitly grant access to anon/authenticated.
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;
grant select, insert on public.applications to anon, authenticated;
grant select, insert on public.application_documents to anon, authenticated;
grant update on public.applications to authenticated;
grant update on public.application_documents to authenticated;

-- ---------------------------------------------------------------------------
-- 4. Row-Level Security
--    anon (public form)  → INSERT only
--    authenticated (admin) → SELECT / UPDATE
--    NOTE: Use TO clause, NOT auth.role() (deprecated, breaks silently).
-- ---------------------------------------------------------------------------
alter table public.applications enable row level security;
alter table public.application_documents enable row level security;

-- anon: insert-only (the public application form)
drop policy if exists "anon can insert application" on public.applications;
create policy "anon can insert application"
  on public.applications for insert
  to anon
  with check (true);

drop policy if exists "anon can insert document" on public.application_documents;
create policy "anon can insert document"
  on public.application_documents for insert
  to anon
  with check (true);

-- authenticated (admin): read + update
drop policy if exists "admin can read applications" on public.applications;
create policy "admin can read applications"
  on public.applications for select
  to authenticated
  using (true);

drop policy if exists "admin can update applications" on public.applications;
create policy "admin can update applications"
  on public.applications for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "admin can read documents" on public.application_documents;
create policy "admin can read documents"
  on public.application_documents for select
  to authenticated
  using (true);

drop policy if exists "admin can update documents" on public.application_documents;
create policy "admin can update documents"
  on public.application_documents for update
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- 5. Storage bucket "documents" (private)
--    One bucket. Path convention: <application_uuid>/<kind>
--    NOTE: Creating a bucket via SQL is best-effort. If it fails or the
--    bucket already exists with a different name, create it in the dashboard:
--    Storage → Create bucket → name "documents", Public OFF, RLS ON.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

-- Storage RLS: anon uploads; authenticated reads + updates + deletes.
-- IMPORTANT: Storage upsert requires INSERT + SELECT + UPDATE (not just INSERT).
drop policy if exists "anon upload to documents" on storage.objects;
create policy "anon upload to documents"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'documents');

drop policy if exists "admin read from documents" on storage.objects;
create policy "admin read from documents"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'documents');

drop policy if exists "admin update from documents" on storage.objects;
create policy "admin update from documents"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'documents')
  with check (bucket_id = 'documents');

drop policy if exists "admin delete from documents" on storage.objects;
create policy "admin delete from documents"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'documents');

-- ---------------------------------------------------------------------------
-- 6. Realtime (admin page live-updates without polling)
-- ---------------------------------------------------------------------------
alter table public.applications replica identity full;
do $$
begin
  if not exists (select 1 from pg_publications where pubname = 'supabase_realtime') then
    create publication supabase_realtime;
  end if;
  alter publication supabase_realtime add table public.applications;
exception when others then
  null;
end $$;

-- Enable realtime for the table so .channel('applications') works.
do $$
begin
  if (select count(*) from pg_publication_tables
      where pubname = 'supabase_realtime' and objid = 'public.applications'::regclass) = 0 then
    alter publication supabase_realtime add table public.applications;
  end if;
end $$;
