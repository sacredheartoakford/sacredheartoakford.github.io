# Supabase Setup Guide (replaces Google Sheets + Apps Script)

This makes the application form and admin feed run on **Supabase** instead of Google
Sheets. The code changes are already in the repo; this file is the **manual** part you
do in the Supabase dashboard (I can't log into your Supabase account).

## Step 1 — Run the SQL (creates tables, bucket, and RLS)

1. Open your Supabase project → **SQL Editor** (left menu).
2. Paste the **entire** contents of [`supabase/schema.sql`](supabase/schema.sql) and **Run**.
3. Confirm it says `Success` / `Completed successfully`.

This creates:
- `applications` table (one row per application)
- `application_documents` table (metadata for the 3 uploaded files)
- `documents` storage bucket (where the PDFs/images live, **private**)
- Row-Level Security: **anonymous can INSERT** (the public form), **authenticated
  users can SELECT/UPDATE** (the admin).

> Re-running `schema.sql` is safe — it is idempotent.

### ⚠️ Verify the bucket actually exists (don't skip this)

The SQL inserts the `documents` bucket, but that insert runs **against the
`storage.buckets` table as the Postgres user** — on some Supabase projects the
bucket insert fails silently or is skipped, and then file uploads 404 with
`NoSuchBucket` while the application row still saves (the form treats a missing
document as non-fatal). If your form "saves but no documents are saved," this is
almost always the cause.

**Check:** Supabase → **Storage** (left menu). You should see a bucket named
`documents`. If it's missing, create it manually:

1. Storage → **Create bucket** → name `documents`, leave **Public** **off**.
2. Storage → `documents` → **Configuration** → enable **Row Level Security**
   (so only the RLS policies in `schema.sql` apply).
3. Re-run the **storage policies** section of `schema.sql` (the
   `storage.objects` policies) in the SQL editor.

> The anon (publishable) key **cannot** create buckets — that needs the
> `service_role` secret, which lives in the dashboard, not in the `.env`.
> So if the bucket is missing, create it via the dashboard (steps above).

## Step 2 — Create ONE admin account

The admin page requires sign-in (this is what fixes the old public-PII exposure).

1. Supabase → **Authentication → Users → Add user**.
2. Pick any email + password (e.g. `admin@sacredhearts.co.za` / a strong password).
   You don't need to enable email confirmation — just check "Auto sign in" or disable
   email confirmation in **Authentication → Providers → Email** if you want instant
   login.
3. Save. That account is the one you'll use on `/#/admin`.

> **Important:** email auth is enabled by default. If login fails with
> "Enable email provider", go to **Authentication → Providers → Email** and make sure
> the provider is active. For a school, the easiest is to turn OFF email confirmation
> so the admin signs in immediately.

## Step 3 — Verify

1. `npm run build`
2. Open `/#/apply`, fill the form, submit. The row + files should appear in
   Supabase → **Table Editor → applications** (and **Storage → documents**).
3. Open `/#/admin`, sign in with the account from Step 2. The application list should
   load, and new submissions should appear in **real time** (Supabase Realtime).
4. Click a row → **PDF** to generate the application PDF (merges the uploaded report
   from Storage, no Google Drive / cloudflared tunnel needed anymore).

## Step 4 — Migrate existing applications (optional)

If you have existing rows in the Google Sheet and files in Drive, move them once:

1. Export the sheet as CSV.
2. For each row + its Drive files, insert into `applications` and upload the files to
   the `documents` bucket at `<application_id>/<kind>`.
3. This is a one-time manual/ scripted step; ask me for a migration script if you want.

## Step 5 — Cut over (when you're ready)

Once you've tested:

1. **Un-publish** the Google Sheet CSV (File → Publish to web → stop).
2. **Revoke** the Drive file shares (set them back to "Only me").
3. Delete the Google Apps Script deployment (optional).
4. The cloudflared tunnel / `drive-proxy-server.cjs` is no longer needed — you can
   retire that systemd service when you're confident the Supabase merge works.

## Files changed in the repo

| File | Change |
|---|---|
| `.env` | Added `VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY` |
| `.env.example` | Commit-safe template (real `.env` is git-ignored) |
| `supabase/schema.sql` | Tables, RLS, storage bucket (run in the SQL editor) |
| `src/lib/supabase.ts` | Supabase client + typed interfaces |
| `src/vite-env.d.ts` | Vite client types (for `import.meta.env`) |
| `src/components/ApplicationForm.tsx` | Submits to Supabase (insert + Storage upload) |
| `src/pages/AdminPage.tsx` | Auth gate + Supabase select/realtime + Storage downloads |

Backups of the Google-version files are kept as:
- `src/components/ApplicationForm.google.tsx`
- `src/pages/AdminPage.google.tsx`

## Costs

Supabase **Free** tier: 500 MB Postgres + **5 GB Storage** — plenty for application
documents. No tunnel, no Apps Script, no Google Drive shares. The anon key in the
browser bundle is **not** a secret; RLS is the real gate.
