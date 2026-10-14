// ── Database Webhook: notify new applications ─────────────────────────────────
-- Fires a POST to the notify-new-application Edge Function every time a row
-- is inserted into "applications". The Edge Function emails the admin via Resend.
--
-- Run this once in the Supabase SQL Editor
-- (Dashboard → Project → Database → SQL Editor → New query).
--
-- It creates a pg_net-based trigger (Supabase's Database Webhook mechanism).
-- The pg_net extension must be enabled first (Supabase has it by default).

-- Enable pg_net (no-op if already enabled)
create extension if not exists pg_net;

-- Drop any prior webhook trigger so re-runs are idempotent
drop trigger if exists "notify_new_application" on public.applications;

-- Create the webhook trigger
create trigger "notify_new_application"
  after insert on public.applications
  for each row
  execute function supabase_functions.http_request(
    'https://vhncphjqebzsczxatsni.supabase.co/functions/v1/notify-new-application',
    'POST',
    '{"Content-Type":"application/json"}',
    json_build_object(
      'type',       'INSERT',
      'table',      'applications',
      'schema',     'public',
      'record',     row(to_jsonb(NEW))::text,
      'old_record', 'null'
    )::text,
    '10000'  -- 10 s timeout
  );
