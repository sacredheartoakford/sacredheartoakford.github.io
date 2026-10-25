# EmailJS Setup — Admin Notification on New Application

## What this does
When a new application is submitted via the public form, an email is sent to
`Sacredheartss3@gmail.com` with the applicant's details, so the admin knows to
check the new application.

## Free tier
- **200 emails/month** — more than enough for school admissions.
- No credit card required.

## Setup (5 minutes)

### 1. Create a free EmailJS account
Go to **https://dashboard.emailjs.com** and sign up (free plan).

### 2. Add an Email Service
1. In the EmailJS dashboard, click **Email Services** → **Add New Service**.
2. Choose **Gmail** (or your preferred provider).
3. Follow the OAuth flow to authorize (or enter SMTP credentials).
4. Note the **Service ID** (e.g. `gmail_xxxxx`).

### 3. Create an Email Template
1. Click **Email Templates** → **Create New Template**.
2. Enter a name (e.g. "New Application Alert").
3. Set the subject to: `New Application: {{applicant_name}}`
4. Set the HTML content to:
```html
<p><strong>New application submitted!</strong></p>
<p>
  <strong>Name:</strong> {{applicant_name}}<br>
  <strong>Email:</strong> {{applicant_email}}<br>
  <strong>Phone:</strong> {{applicant_phone}}<br>
  <strong>Date of Birth:</strong> {{applicant_dob}}<br>
  <strong>Gender:</strong> {{applicant_gender}}<br>
  <strong>Previous School:</strong> {{applicant_school}}<br>
  <strong>Applying for:</strong> {{applicant_grade}} ({{applicant_year}})<br>
  <strong>Extracurriculars:</strong> {{applicant_extras}}
</p>
<p><a href="{{admin_url}}">Review this application in the admin panel</a></p>
```
5. Click **Save** → **Send Test Email** (send to yourself to verify).
6. Note the **Template ID** (e.g. `tmpl_xxxxx`).

### 4. Get your Public Key
1. Go to **Account** → **General** in the EmailJS dashboard.
2. Copy your **Public Key** (e.g. `abc123xyz...`).

### 5. Add to your `.env` file
Open the `.env` file in the project root and add:
```
VITE_EMAILJS_PUBLIC_KEY=your-public-key-here
VITE_EMAILJS_SERVICE_ID=gmail_xxxxx
VITE_EMAILJS_TEMPLATE_ID=tmpl_xxxxx
```

### 6. Rebuild and redeploy
```bash
npm run build
```
The email will now fire automatically on every new application submission.

## How it works
- The frontend calls `emailjs.send()` after a successful Supabase insert.
- EmailJS handles the actual email delivery server-side — **no email
  credentials are ever exposed in the browser**.
- If EmailJS is not configured (missing keys), the application still saves
  normally — the email is just skipped (with a console warning).
- If the email fails for any reason, the application still saves — the
  failure is logged to the console and does not block the submission.
