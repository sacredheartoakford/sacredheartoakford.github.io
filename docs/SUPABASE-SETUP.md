# Sacred Heart Secondary School — Supabase Setup Documentation

This document describes how to replicate the Supabase backend for the Sacred Heart Secondary School application website from scratch. It covers the database schema, Row-Level Security (RLS), Storage bucket, admin authentication, and the EmailJS notification integration.

---

## 1. Prerequisites

- A **Supabase account** (free tier at supabase.com)
- A **GitHub account** (for the frontend repository)
- **Node.js 18+** and **npm** installed locally
- (Optional) An **EmailJS account** (free tier, 200 emails/mo) for admin notifications

---

## 2. Create the Supabase Project

1. Go to https://supabase.com/dashboard → **New project**
2. Organization: create/select one
3. Project name: `sacred-heart-secondary` (or your choice)
4. Database password: generate a strong one, **save it securely** — you'll need it for direct Postgres access
5. Region: choose closest to your users (e.g., `eu-west-1` for South Africa)
6. Wait for the project to provision (~2 minutes)

After creation, note these from **Settings → API**:
- **Project URL** (e.g., `https://vhncphjqebzsczxatsni.supabase.co`)
- **anon / publishable key** (safe to ship in the browser)
- **service_role key** (keep secret, server-only — do NOT put in frontend)

---

## 3. Run the Database Schema

1. In the Supabase Dashboard, go to **SQL Editor** → **New query**
2. Copy the entire contents of `supabase/schema.sql` (from this repo) into the editor
3. Click **Run**

This creates:
- `applications` table — one row per application (13 columns matching the old Google Sheet)
- `application_documents` table — metadata for the 3 uploaded files per application
- **Indexes** on `created_at` and `application_id` for fast queries
- **GRANTs** to expose tables via the REST API to `anon` and `authenticated` roles
- **RLS policies**:
  - `anon` (public form) → `INSERT` only on both tables
  - `authenticated` (admin) → `SELECT`, `UPDATE` on both tables
- **Storage bucket** `documents` (private, RLS enabled)
- **Storage RLS**: `anon` can upload, `authenticated` can read/update/delete
- **Realtime** publication for the admin page live updates

> **Note**: The SQL is idempotent — safe to re-run if you need to fix something later.

---

## 4. Verify RLS Policies Work

The schema SQL includes the basic RLS policies. However, if the public form fails with `42501: new row violates row-level security policy`, run the additional fix script:

1. SQL Editor → **New query**
2. Paste the contents of `supabase/fix-rls.sql`
3. Click **Run**

This ensures:
- `anon` can INSERT into `applications`
- `anon` can INSERT into `storage.objects` (bucket `documents`)
- `anon` can INSERT into `application_documents`
- `authenticated` has full CRUD on all three

---

## 5. Create the Admin User

The admin page uses Supabase Auth — any authenticated user can access it.

1. Dashboard → **Authentication** → **Users** → **Add user**
2. Email: `admin@sacredhearts.co.za` (or your preferred admin email)
3. Password: choose a strong one (e.g., `Shs-Admin-2026`)
4. **Email confirm**: toggle ON (or confirm via the email link)
5. Click **Create user**

This user signs in at `/#/admin` on the deployed site.

---

## 6. Configure the Frontend Environment

In the project root, create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Supabase (required)
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here

# EmailJS — admin notification on new application (optional but recommended)
# Get these from https://dashboard.emailjs.com (see docs/EMAILJS-SETUP.md)
VITE_EMAILJS_PUBLIC_KEY=your-public-key
VITE_EMAILJS_SERVICE_ID=gmail_xxxxx
VITE_EMAILJS_TEMPLATE_ID=tmpl_xxxxx
```

> **Security note**: The `VITE_SUPABASE_PUBLISHABLE_KEY` is the **anon** key — it is safe to ship in the browser bundle. The `service_role` key is **never** used in the frontend.

---

## 7. Build & Test Locally

```bash
# Install dependencies
npm ci

# Build production bundle
npm run build

# Serve the built files locally (port 41900)
node scripts/local-test-server.cjs
```

Open http://localhost:41900 in your browser:
- `/#/apply` — public application form
- `/#/admin` — admin dashboard (sign in with the admin user from step 5)

---

## 8. Deploy (Zero-Cost GitHub Pages)

The site is a static Vite build — deploy to **GitHub Pages** for free:

1. Push this repo to GitHub (e.g., `njabulodark/sacredheartoakford.github.io`)
2. In GitHub repo settings → **Pages** → **Build and deployment**:
   - Source: **GitHub Actions**
3. The included workflow `.github/workflows/deploy.yml` will:
   - Install deps
   - Run `npm run build`
   - Deploy the `dist/` folder to GitHub Pages
4. Your site lives at `https://<username>.github.io/<repo>/` or your custom domain

> **Custom domain**: Add `CNAME` file to `public/` with your domain (e.g., `sacredhearts.co.za`), then configure DNS (A record to GitHub Pages IPs, CNAME for www).

---

## 9. EmailJS Admin Notification (Optional)

When a new application is submitted, the frontend sends a confirmation email to `Sacredheartss3@gmail.com` via **EmailJS** (free, 200 emails/mo). No email credentials touch the browser.

### Setup (5 minutes)

1. Sign up at https://dashboard.emailjs.com (free plan)
2. **Email Services** → **Add New Service** → **Gmail** → authorize OAuth
   - Note the **Service ID** (e.g., `gmail_xxxxx`)
3. **Email Templates** → **Create New Template**
   - Subject: `New Application: {{applicant_name}}`
   - HTML body (see `docs/EMAILJS-SETUP.md` for full template)
   - Save → note the **Template ID** (e.g., `tmpl_xxxxx`)
4. **Account** → **General** → copy your **Public Key**
5. Add the three values to `.env` (step 6) and rebuild

If EmailJS isn't configured, the application still saves — the email is skipped with a console warning.

---

## 10. Architecture Summary

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Database** | Supabase (PostgreSQL) | `applications` + `application_documents` tables |
| **Auth** | Supabase Auth | Admin login (email/password) |
| **Storage** | Supabase Storage | Private `documents` bucket for PDFs/images |
| **API** | Supabase REST (PostgREST) | Auto-generated from schema, secured by RLS |
| **Realtime** | Supabase Realtime | Admin page live-updates on new applications |
| **Email** | EmailJS (client-side SDK) | Admin notification on new submission |
| **Frontend** | React + Vite + Tailwind | Static build, deployed to GitHub Pages |
| **Local test** | Cloudflare quick tunnel | `cloudflared tunnel --url http://localhost:41900` |

---

## 11. Key File Reference

| File | Purpose |
|------|---------|
| `supabase/schema.sql` | Complete database schema, RLS, Storage, Realtime |
| `supabase/fix-rls.sql` | Additional RLS policies if the form fails with 42501 |
| `src/lib/supabase.ts` | Supabase client init + TypeScript interfaces |
| `src/components/ApplicationForm.tsx` | Public form: inserts row, uploads files, fires EmailJS |
| `src/pages/AdminPage.tsx` | Admin dashboard: lists apps, downloads merged PDF + individual files |
| `docs/EMAILJS-SETUP.md` | Step-by-step EmailJS configuration guide |
| `scripts/local-test-server.cjs` | Serves `dist/` on port 41900 for local testing |
| `.env.example` | Template for all required environment variables |

---

## 12. Common Issues & Fixes

| Symptom | Cause | Fix |
|---------|-------|-----|
| Form submit: `42501 RLS violation` | `anon` lacks INSERT policy | Run `supabase/fix-rls.sql` in SQL Editor |
| File upload: `403 Forbidden` | Storage RLS missing for `anon` | Run `supabase/fix-rls.sql` (storage.objects policy) |
| Admin page: "Failed to fetch" | Wrong `VITE_SUPABASE_URL` or key | Check `.env` matches Dashboard → Settings → API |
| Admin login fails | User not created / email not confirmed | Auth → Users → Add user, confirm email |
| Email not sent | EmailJS keys missing | Configure EmailJS (step 9), rebuild |
| Realtime not updating | Publication not created | Schema SQL includes it; check Realtime → Tables in Dashboard |

---

## 13. Rotating Credentials (Security)

If any credential was exposed (e.g., shared in chat):
1. **Supabase anon key**: Settings → API → **Regenerate** → update `.env` and GitHub Pages env vars
2. **Supabase service_role key**: Same page → **Regenerate** (only used for server scripts)
3. **EmailJS Public Key**: EmailJS Dashboard → Account → **Regenerate Public Key** → update `.env`
4. **Admin password**: Auth → Users → edit user → **Reset password**
5. **Postgres password**: Dashboard → Settings → Database → **Reset database password**

---

## 14. Extending the Setup

### Add a new document type
1. Update `application_documents.kind` CHECK constraint in `schema.sql`
2. Add the file input in `ApplicationForm.tsx`
3. Update `AdminPage.tsx` to show/download the new kind
4. Re-run `schema.sql` (idempotent)

### Add admin-only fields (e.g., status, notes)
1. Add columns to `applications` in `schema.sql`
2. Update `ApplicationWithDocs` interface in `supabase.ts`
3. Add inputs in `AdminPage.tsx`
4. RLS already allows `authenticated` UPDATE

### Multi-admin with roles
Currently any authenticated user is an admin. To restrict:
1. Add a `profiles` table with `role` column
2. Update RLS policies to check `auth.jwt() ->> 'role' = 'admin'`
3. Use Supabase Auth **custom claims** or a `user_metadata` flag

---

## 15. Support & Maintenance

- **Supabase Free Tier limits**: 500 MB database, 1 GB storage, 2 GB bandwidth/mo — sufficient for a school admissions site
- **Backups**: Supabase does daily point-in-time recovery (7 days on free tier)
- **Monitoring**: Dashboard → Logs → Database / Auth / Storage / Edge Functions
- **Upgrades**: If limits are hit, Pro plan is $25/mo (8 GB DB, 100 GB storage)

---

*Generated from the live implementation at `sacredheartoakford.github.io`. Keep this doc in sync with any schema or code changes.*