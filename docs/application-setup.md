# Application Form — Zero-Cost Setup Guide

This document explains how to connect the website's application form to a **Google Spreadsheet**
using a free Google Apps Script. No paid services, no extra infrastructure.

## What This Does

- The **Apply page** on the website is now a native form (no OpnForm iframe)
- Submissions go to a **Google Spreadsheet** (free)
- The **Admin page** (`/#/admin`) auto-fetches all applications from the Google Sheet
  every 2 minutes — the client can view applications on any phone/computer
- The existing **PDF generator** still works (now from live data or manual CSV upload)

## Step 1 — Create the Google Spreadsheet

1. Go to [sheets.new](https://sheets.new) and create a blank spreadsheet
2. Rename it to something like **"SHS Applications"**
3. In row 1, type these column headers:
   ```
   | A              | B              | C      | D          | E            | F            | G              | H               | I                  | J                     |
   | Timestamp      | Full Name      | Date of Birth | Gender | Email Address | Phone Number | Previous School | Application Year | Grade Applying For | Extracurricular Activities | Report URL |
   ```
4. **Set the sheet to "Anyone with the link can view"** (so the website can fetch it):
   - Click **Share** → change from "Restricted" to **"Anyone with the link"**
   - Make sure the role is **Viewer** (not Editor)
5. **Publish the sheet as CSV** (this is what the website fetches):
   - Click **File** → **Publish to the web**
   - Under "Only" select **CSV** (not the whole sheet)
   - Click **Launch** → note the URL it gives you
   - It will look like: `https://docs.google.com/spreadsheets/d/e/2…/pub?output=csv`
   - Copy this URL — you'll need it for Step 3

## Step 2 — Create the Google Apps Script

This is the "backend" that receives form submissions and writes them to the sheet.

1. Go to [script.google.com](https://script.google.com) → click **"Project Editor"**
2. Name it **"SHS Application Handler"**
3. Replace the default `Code.gs` content with this:

```javascript
/**
 * SHS Application Form Handler
 * Receives form submissions from the website and logs them to a Google Sheet.
 */

// ⚠️ CHANGE THIS TO YOUR SPREADSHEET ID (from the URL)
// The spreadsheet ID is the long string between /d/ and /edit in the sheet URL
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

// Name of the sheet tab inside the spreadsheet
const SHEET_NAME = 'Sheet1';

/**
 * Handles POST requests from the website form.
 * @param {Object} e - The web app request event
 */
function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // Ensure headers exist
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 'Full Name', 'Date of Birth', 'Gender',
        'Email Address', 'Phone Number', 'Previous School',
        'Application Year', 'Grade Applying For',
        'Extracurricular Activities', 'Report URL'
      ];
      sheet.appendRow(headers);
    }

    const postData = e.parameter;

    // Handle file upload (report document)
    let reportUrl = '';
    if (e.postData.length > 0) {
      for (let i = 0; i < e.postData.length; i++) {
        const item = e.postData[i];
        if (item.name === 'report' && item.type.startsWith('application/')) {
          // Upload to Drive
          const name = item.getFileName() || 'report.pdf';
          const blob = item.getData().createBlob(name);
          const folder = DriveApp.getFolderById('YOUR_DRIVE_FOLDER_ID') || DriveApp.getRootFolder();
          const file = folder.copyFileFromUrl ? null : null;
          // Simple: save to root
          const driveFile = DriveApp.createFile(blob);
          // Make it publicly accessible
          driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          reportUrl = driveFile.getUrl();
          break;
        }
      }
    }

    const row = [
      new Date(),
      postData.fullName || '',
      postData.dateOfBirth || '',
      postData.gender || '',
      postData.email || '',
      postData.phone || '',
      postData.previousSchool || '',
      postData.applicationYear || '',
      postData.gradeApplyingFor || '',
      postData.extracurricular || '',
      reportUrl
    ];

    sheet.appendRow(row);

    // Send confirmation email to the applicant (optional)
    if (postData.email) {
      MailApp.sendEmail({
        to: postData.email,
        subject: 'Application Received - Sacred Heart Secondary School',
        body: `Hi ${postData.fullName},\n\nThank you for applying to Sacred Heart Secondary School.\n` +
              `Your application for Grade ${postData.gradeApplyingFor || '?'} has been received.\n` +
              `We will be in touch shortly.\n\nRegards,\nAdmissions Office`
      });
    }

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'success', message: 'Application received' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', message: 'SHS Application Handler is running' })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

### Configure the Apps Script:

1. Replace `'YOUR_SPREADSHEET_ID_HERE'` with the actual ID from your spreadsheet URL
   - The spreadsheet URL looks like: `https://docs.google.com/spreadsheets/d/`**`1AbC...xyz`**`/edit`
   - The ID is the part in bold
2. **(Optional)** For the Drive folder where reports are saved:
   - Create a folder in your Google Drive called **"Application Reports"**
   - Get its ID from the URL and replace `'YOUR_DRIVE_FOLDER_ID'`
   - Or just leave it as-is and it'll save to your Drive root
3. Click **Deploy** → **New deployment**
   - Type: select **"Web app"**
   - Execute as: **"Me"**
   - Who has access: **"Anyone"** (so the website can POST to it)
4. Click **Deploy** → copy the **Web app URL** (looks like `https://script.google.com/macros/s/AKf…/exec`)

## Step 3 — Connect the Website

Once you have the two URLs:

1. **`https://script.google.com/macros/s/AKf…/exec`** — the Apps Script URL
2. **`https://docs.google.com/spreadsheets/d/e/2…/pub?output=csv`** — the published CSV URL

Edit these two files in the website:

### `src/components/ApplicationForm.tsx`

```typescript
const AP_SCRIPT_URL = 'https://script.google.com/macros/s/AKf…/exec';
const GOOGLE_SHEET_CSV_URL = ''; // not needed here, used in AdminPage
```

### `src/pages/AdminPage.tsx`

```typescript
const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2…/pub?output=csv';
```

Then rebuild and push:

```bash
npm run build
git add . && git commit -m "Connect application form to Google Sheet" && git push
```

## Step 4 — Test

1. Go to the **Apply** page on the live website
2. Fill in a test application and submit it
3. Check the Google Spreadsheet — the row should appear
4. Check the **Admin** page (`/#/admin`) — the live feed should show the application
5. Generate a PDF from the admin page to confirm everything works

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Form says "endpoint not configured" | Check `AP_SCRIPT_URL` in `ApplicationForm.tsx` |
| Admin page says "Google Sheet not configured" | Check `GOOGLE_SHEET_CSV_URL` in `AdminPage.tsx` |
| CSV fetch returns empty | Verify the sheet is shared "Anyone with the link" AND published as CSV |
| Form submits but no row appears | Check the Apps Script: open it and click "Executions" to see errors |
| PDF generation fails | Make sure the column headers in the sheet match what the form sends |

## Cost

| Item | Cost |
|------|------|
| GitHub Pages (website hosting) | R0 |
| Google Sheets (data storage) | R0 |
| Google Apps Script (form backend) | R0 |
| Google Drive (file storage) | R0 |
| **Total** | **R0** |

## What the Client Gets

- **All applications in one place** (the Google Sheet) — no more juggling multiple platforms
- **View applications from any device** — the Admin page on the website auto-refreshes
- **PDF generation** still works for each application
- **Confirmation emails** sent to applicants automatically
- **File uploads** saved to Google Drive with a link in the sheet
- **Auto-refresh** every 2 minutes on the admin page
