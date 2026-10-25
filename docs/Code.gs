/**
 * SHS Application Form Handler
 * Receives form submissions from the website and logs them to a Google Sheet.
 * Saves the three supporting documents (Academic Report, Parent ID, Birth
 * Certificate) to Google Drive and stores a link for each in the sheet.
 *
 * The website sends form-encoded (URLSearchParams) data; each file is a
 * base64 string. Apps Script reads it from e.parameter (or, as a fallback,
 * from a JSON body in e.postData.contents).
 */

const SPREADSHEET_ID = '1xDnuDyrLQ96t0xyrNa0k0ZzNRblc5YoTuTtiHy8Tr4U';
const SHEET_NAME = 'Sheet1';

/**
 * Saves a base64 file upload to Google Drive and returns its public share URL.
 * Returns '' when no file data is present.
 *
 * @param {string} fileData   base64 (optionally with a data: URL prefix)
 * @param {string} mimeType   the file's MIME type
 * @param {string} fileName   the original file name
 * @param {string} prefix     a short prefix used in the Drive file name
 * @returns {string} the Google Drive share URL, or '' if nothing to save
 */
function saveFile(fileData, mimeType, fileName, prefix) {
  if (!fileData) return '';
  const base64 = fileData.includes(',') ? fileData.split(',')[1] : fileData;
  const blob = Utilities.newBlob(
    Utilities.base64Decode(base64),
    mimeType || 'application/pdf',
    prefix + '_' + Date.now() + '_' + (fileName || 'upload.pdf')
  );
  const driveFile = DriveApp.createFile(blob);
  driveFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return driveFile.getUrl();
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // Ensure header row exists (13 columns: 10 form fields + 3 document URLs)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Full Name', 'Date of Birth', 'Gender',
        'Email Address', 'Phone Number', 'Previous School',
        'Application Year', 'Grade Applying For',
        'Extracurricular Activities', 'Report URL',
        'Parent ID URL', 'Birth Certificate URL'
      ]);
    }

    // Extract parameters (handles both URLSearchParams and JSON payloads)
    let p = {};
    if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      p = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      try {
        p = JSON.parse(e.postData.contents);
      } catch (err) {
        p = {};
      }
    }

    // Save the three supporting documents to Drive (each optional, isolated)
    let reportUrl = '', parentIdUrl = '', birthCertUrl = '';
    try {
      reportUrl = saveFile(p.fileData, p.fileMimeType, p.fileName, 'SHS_Report');
    } catch (fileErr) {
      reportUrl = 'FILE_UPLOAD_ERROR: ' + fileErr.message;
    }
    try {
      parentIdUrl = saveFile(p.parentIdFileData, p.parentIdFileMimeType, p.parentIdFileName, 'SHS_ParentID');
    } catch (fileErr) {
      parentIdUrl = '';
    }
    try {
      birthCertUrl = saveFile(p.birthCertFileData, p.birthCertFileMimeType, p.birthCertFileName, 'SHS_BirthCert');
    } catch (fileErr) {
      birthCertUrl = '';
    }

    // Append full record
    sheet.appendRow([
      new Date(),
      p.fullName || '',
      p.dateOfBirth || '',
      p.gender || '',
      p.email || '',
      p.phone || '',
      p.previousSchool || '',
      p.applicationYear || '',
      p.gradeApplyingFor || '',
      p.extracurricular || '',
      reportUrl,
      parentIdUrl,
      birthCertUrl
    ]);

    // Send confirmation email
    if (p.email) {
      try {
        MailApp.sendEmail({
          to: p.email,
          subject: 'Application Received - Sacred Heart Secondary School',
          body: 'Hi ' + (p.fullName || 'applicant') + ',\n\n' +
                'Thank you for submitting your application.\n' +
                'Your application for Grade ' + (p.gradeApplyingFor || 'N/A') + ' has been received.\n\n' +
                'Regards,\nAdmissions Office'
        });
      } catch (mErr) {
        Logger.log('Mail failed: ' + mErr.message);
      }
    }

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'success' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', message: 'SHS Application Handler is running' })
  ).setMimeType(ContentService.MimeType.JSON);
}
