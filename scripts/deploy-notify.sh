#!/usr/bin/env bash
# ── Deploy the new-application email notification ──────────────────────────────
# One-shot script to deploy the Edge Function, set secrets, and create the
# database webhook trigger.
#
# Usage:
#   SUPABASE_ACCESS_TOKEN=*** RESEND_API_KEY=*** ./scripts/deploy-notify.sh
#
# Or set them in a .env.local file (not committed).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_REF="vhncphjqebzsczxatsni"

: "${SUPABASE_ACCESS_TOKEN:*** SUPABASE_ACCESS_TOKEN}"
: "${RESEND_API_KEY:*** RESEND_API_KEY}"

echo "→ Project: $PROJECT_REF"
echo "→ 1/3 Deploying Edge Function…"
npx -y supabase functions deploy notify-new-application \
  --project-ref "$PROJECT_REF" \
  --no-verify-jwt

echo "→ 2/3 Setting secrets…"
npx -y supabase secrets set \
  RESEND_API_KEY="$RESEND_API_KEY" \
  ADMIN_EMAIL="Sacredheartss3@gmail.com" \
  SITE_URL="https://sacredhearts.co.za" \
  --project-ref "$PROJECT_REF"

echo "→ 3/3 Creating database webhook trigger…"
npx -y supabase db query \
  "create extension if not exists pg_net;
   drop trigger if exists \"notify_new_application\" on public.applications;
   create trigger \"notify_new_application\"
     after insert on public.applications
     for each row
     execute function supabase_functions.http_request(
       'https://vhncphjqebzsczxatsni.supabase.co/functions/v1/notify-new-application',
       'POST',
       '{\"Content-Type\":\"application/json\"}',
       json_build_object(
         'type','INSERT','table','applications','schema','public',
         'record',row(to_jsonb(NEW))::text,'old_record','null'
       )::text,'10000'
     );" \
  --project-ref "$PROJECT_REF"

echo ""
echo "✅ Done. Test with:"
echo "   curl -X POST https://$PROJECT_REF.supabase.co/functions/v1/notify-new-application \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"type\":\"INSERT\",\"table\":\"applications\",\"record\":{\"full_name\":\"Test User\",\"email\":\"test@example.com\",\"phone\":\"071 000 0000\",\"grade_applying_for\":\"8\",\"application_year\":\"2026\",\"previous_school\":\"Test School\",\"date_of_birth\":\"2014-01-01\",\"gender\":\"Male\",\"id\":\"test-123\",\"created_at\":\"2026-10-14T00:00:00Z\"}}'"
