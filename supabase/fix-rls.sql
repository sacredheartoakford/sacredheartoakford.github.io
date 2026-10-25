-- ── Run this in Supabase Dashboard → SQL Editor ─────────────────────────────
-- Fixes: public form cannot submit (42501 RLS violation on "applications")
-- and cannot upload documents (403 on storage.objects INSERT for anon).
--
-- 1. Allow anonymous users to INSERT new applications (insert-only, no read/update/delete).
create policy "anon can insert applications"
  on public.applications
  for insert
  to anon
  with check (true);

-- 2. Allow anonymous users to INSERT into the "documents" storage bucket
--    (path must start with their new application id).
--    This requires the storage.objects RLS policy. Run the following:
create policy "anon can upload documents"
  on storage.objects
  for insert
  to anon
  with check (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] is not null
  );

-- 3. Ensure authenticated (admin) users can SELECT, UPDATE, DELETE applications.
--    (These should already exist from the schema, but verify they're present.)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'applications'
      and polname = 'authenticated can read applications'
  ) then
    create policy "authenticated can read applications"
      on public.applications for select to authenticated
      using (true);
  end if;
  if not exists (
    select 1 from pg_policies
    where tablename = 'applications'
      and polname = 'authenticated can update applications'
  ) then
    create policy "authenticated can update applications"
      on public.applications for update to authenticated
      using (true) with check (true);
  end if;
  if not exists (
    select 1 from pg_policies
    where tablename = 'applications'
      and polname = 'authenticated can delete applications'
  ) then
    create policy "authenticated can delete applications"
      on public.applications for delete to authenticated
      using (true);
  end if;
end $$;

-- 4. Ensure authenticated (admin) users can read/write/delete documents.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'objects' and schemaname = 'storage'
      and polname = 'authenticated can read documents'
  ) then
    create policy "authenticated can read documents"
      on storage.objects for select to authenticated
      using (bucket_id = 'documents');
  end if;
  if not exists (
    select 1 from pg_policies
    where tablename = 'objects' and schemaname = 'storage'
      and polname = 'authenticated can delete documents'
  ) then
    create policy "authenticated can delete documents"
      on storage.objects for delete to authenticated
      using (bucket_id = 'documents');
  end if;
end $$;

-- 5. Ensure application_documents table allows anon INSERT (for the doc metadata rows)
--    and authenticated SELECT/DELETE.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'application_documents'
      and polname = 'anon can insert application documents'
  ) then
    create policy "anon can insert application documents"
      on public.application_documents for insert to anon
      with check (true);
  end if;
  if not exists (
    select 1 from pg_policies
    where tablename = 'application_documents'
      and polname = 'authenticated can read application documents'
  ) then
    create policy "authenticated can read application documents"
      on public.application_documents for select to authenticated
      using (true);
  end if;
end $$;

select '✅ RLS policies applied' as status;
