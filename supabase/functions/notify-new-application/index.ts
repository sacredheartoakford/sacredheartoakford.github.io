// ── Edge Function: notify-new-application ─────────────────────────────────────
// Triggered by a Database Webhook on INSERT into "applications".
// Sends a confirmation email to the school admin via Resend (free tier).
//
// Deployment:
//   supabase functions deploy notify-new-application
//   supabase secrets set RESEND_API_KEY=*** ADMIN_EMAIL=Sacredheartss3@gmail.com
//
// Webhook (create in Dashboard → Database → Webhooks, or via SQL):
//   table:  applications
//   events: INSERT
//   url:    https://vhncphjqebzsczxatsni.supabase.co/functions/v1/notify-new-application
//
// The webhook sends a JSON payload:
//   { type: 'INSERT', table: 'applications', schema: 'public',
//     record: { id, full_name, date_of_birth, gender, email, phone,
//               previous_school, application_year, grade_applying_for,
//               extracurricular, created_at },
//     old_record: null }

const DENO_DEPLOYMENT_ID = Deno.env.get("DENO_DEPLOYMENT_ID") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-supabase-api-key, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const adminEmail =
    Deno.env.get("ADMIN_EMAIL") || "Sacredheartss3@gmail.com";
  const siteUrl =
    Deno.env.get("SITE_URL") || "https://sacredhearts.co.za";

  if (!resendKey) {
    console.error("RESEND_API_KEY is not set");
    return new Response(JSON.stringify({ error: "Email not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: {
    type?: string;
    record?: Record<string, unknown>;
  };

  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Only act on INSERT events
  if (payload.type !== "INSERT" || !payload.record) {
    return new Response(JSON.stringify({ ok: true, ignored: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const r = payload.record;
  const fullName = (r.full_name as string) || "Unknown";
  const email = (r.email as string) || "—";
  const phone = (r.phone as string) || "—";
  const grade = (r.grade_applying_for as string) || "—";
  const year = (r.application_year as string) || "—";
  const prevSchool = (r.previous_school as string) || "—";
  const dob = (r.date_of_birth as string) || "—";
  const gender = (r.gender as string) || "—";
  const appId = (r.id as string) || "";
  const created = (r.created_at as string) || new Date().toISOString();

  const adminUrl = `${siteUrl}/#/admin`;

  const subject = `📋 New application: ${fullName} (Grade ${grade})`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
             style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06);">

        <!-- Header -->
        <tr><td style="background:#4747d7;padding:20px 32px;">
          <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">
            📋 New Application Received
          </h1>
          <p style="margin:6px 0 0;color:#d0d0ff;font-size:13px;">
            Sacred Heart Secondary School — Admissions
          </p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 18px;font-size:14px;color:#333;">
            A new application has been submitted. Please review it in the
            admin panel.
          </p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                 style="border-collapse:collapse;margin-bottom:20px;">
            <tr>
              <td style="padding:8px 0;font-size:13px;color:#777;width:140px;vertical-align:top;">Applicant</td>
              <td style="padding:8px 0;font-size:14px;color:#222;font-weight:600;">${esc(fullName)}</td>
            </tr>
            <tr><td colspan="2" style="padding:0 0 10px 0;border-bottom:1px solid #eee;"></td></tr>
            <tr>
              <td style="padding:8px 0;font-size:13px;color:#777;vertical-align:top;">Email</td>
              <td style="padding:8px 0;font-size:14px;color:#222;">${esc(email)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:13px;color:#777;vertical-align:top;">Phone</td>
              <td style="padding:8px 0;font-size:14px;color:#222;">${esc(phone)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:13px;color:#777;vertical-align:top;">Grade applying for</td>
              <td style="padding:8px 0;font-size:14px;color:#222;">Grade ${esc(grade)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:13px;color:#777;vertical-align:top;">Application year</td>
              <td style="padding:8px 0;font-size:14px;color:#222;">${esc(year)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:13px;color:#777;vertical-align:top;">Previous school</td>
              <td style="padding:8px 0;font-size:14px;color:#222;">${esc(prevSchool)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:13px;color:#777;vertical-align:top;">Date of birth</td>
              <td style="padding:8px 0;font-size:14px;color:#222;">${esc(dob)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:13px;color:#777;vertical-align:top;">Gender</td>
              <td style="padding:8px 0;font-size:14px;color:#222;">${esc(gender)}</td>
            </tr>
            <tr><td colspan="2" style="padding:10px 0 0 0;border-top:1px solid #eee;"></td></tr>
            <tr>
              <td style="padding:8px 0;font-size:12px;color:#999;vertical-align:top;">Submitted</td>
              <td style="padding:8px 0;font-size:12px;color:#999;">${esc(created)}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:12px;color:#999;vertical-align:top;">Application ID</td>
              <td style="padding:8px 0;font-size:12px;color:#999;font-family:monospace;">${esc(appId)}</td>
            </tr>
          </table>

          <a href="${adminUrl}"
             style="display:inline-block;background:#4747d7;color:#ffffff;font-size:14px;
                    font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;">
            📂 Open Admin Panel
          </a>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:16px 32px;background:#f9f9fb;border-top:1px solid #eee;">
          <p style="margin:0;font-size:11px;color:#aaa;">
            This is an automated notification. Do not reply.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = [
    "New application received:",
    `  Applicant:       ${fullName}`,
    `  Email:           ${email}`,
    `  Phone:           ${phone}`,
    `  Grade:           Grade ${grade}`,
    `  Year:            ${year}`,
    `  Previous school: ${prevSchool}`,
    `  DOB:             ${dob}`,
    `  Gender:          ${gender}`,
    `  Submitted:       ${created}`,
    `  Application ID:  ${appId}`,
    "",
    `Review: ${adminUrl}`,
  ].join("\n");

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Sacred Heart <onboarding@resend.dev>",
        to: [adminEmail],
        subject,
        html,
        text,
      }),
    });

    const resendBody = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend error:", resendRes.status, JSON.stringify(resendBody));
      return new Response(
        JSON.stringify({ error: "Resend failed", detail: resendBody }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Email sent to ${adminEmail} (id: ${resendBody.id})`);
    return new Response(JSON.stringify({ ok: true, emailId: resendBody.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Fetch error:", err);
    return new Response(JSON.stringify({ error: "Network error", detail: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// HTML-escape helper
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
