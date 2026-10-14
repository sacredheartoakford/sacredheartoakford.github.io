import React, { useState, ChangeEvent, FormEvent } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import emailjs from '@emailjs/browser';

// ── Supabase submission ───────────────────────────────────────────────────────
// Replaces the Google Apps Script POST. Flow:
//   1. INSERT into applications (anon key, RLS insert-only) → returns the new id.
//   2. For each uploaded file: upload to the private "documents" bucket at
//      <application_id>/<kind>, then INSERT an application_documents row.
// The anon key is public; RLS is what enforces insert-only for anonymous users.

interface FormState {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  previousSchool: string;
  applicationYear: string;
  gradeApplyingFor: string;
  extracurricular: string;
  reportFile: File | null;
  parentIdFile: File | null;
  birthCertFile: File | null;
  agreed: boolean;
}

const initialState: FormState = {
  fullName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phone: '',
  previousSchool: '',
  applicationYear: String(new Date().getFullYear() + 1),
  gradeApplyingFor: '',
  extracurricular: '',
  reportFile: null,
  parentIdFile: null,
  birthCertFile: null,
  agreed: false,
};

type DocKind = 'report' | 'parent_id' | 'birth_cert';

// ── EmailJS admin notification ────────────────────────────────────────────────
// Sends a confirmation email to the school admin when a new application is
// submitted. Configured via VITE_EMAILJS_* env vars. If not configured,
// submission still succeeds — the email is just skipped (with a console warning).
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string | undefined;
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const ADMIN_EMAIL         = 'Sacredheartss3@gmail.com';

const isEmailConfigured = !!(EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID);

const sendAdminNotification = async (app: {
  fullName: string; email: string; phone: string;
  previousSchool: string; applicationYear: string; gradeApplyingFor: string;
  dateOfBirth: string; gender: string; extracurricular: string;
}) => {
  if (!isEmailConfigured) {
    console.warn('[admin-notify] EmailJS not configured — skipping admin email. Set VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID.');
    return false;
  }
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID!,
      EMAILJS_TEMPLATE_ID!,
      {
        to_email:       ADMIN_EMAIL,
        to_name:        'Sacred Heart Admissions',
        applicant_name: app.fullName,
        applicant_email: app.email,
        applicant_phone: app.phone,
        applicant_dob:   app.dateOfBirth,
        applicant_gender: app.gender,
        applicant_school: app.previousSchool,
        applicant_year:   app.applicationYear,
        applicant_grade:  `Grade ${app.gradeApplyingFor}`,
        applicant_extras: app.extracurricular || '—',
        admin_url:        'https://sacredhearts.co.za/#/admin',
      },
      { publicKey: EMAILJS_PUBLIC_KEY! }
    );
    console.log('[admin-notify] Email sent to', ADMIN_EMAIL);
    return true;
  } catch (err) {
    console.error('[admin-notify] Failed to send admin email:', err);
    return false;
  }
};

const ApplicationForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [warning, setWarning] = useState('');
  const [reportFileName, setReportFileName] = useState('');
  const [parentIdFileName, setParentIdFileName] = useState('');
  const [birthCertFileName, setBirthCertFileName] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'agreed' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: 'reportFile' | 'parentIdFile' | 'birthCertFile'
  ) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, [field]: file }));
    if (field === 'reportFile') setReportFileName(file ? file.name : '');
    if (field === 'parentIdFile') setParentIdFileName(file ? file.name : '');
    if (field === 'birthCertFile') setBirthCertFileName(file ? file.name : '');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isSupabaseConfigured) {
      setStatus('error');
      setErrorMessage('The application backend is not configured yet.');
      return;
    }

    if (!form.agreed) {
      setStatus('error');
      setErrorMessage('Please accept the policies and terms before submitting.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    setWarning('');

    try {
      // 1. Insert the application row. Anon RLS permits insert; the row's id
      //    is returned so we can key the document files to it.
      const { data: row, error: rowError } = await supabase
        .from('applications')
        .insert({
          full_name: form.fullName || '',
          date_of_birth: form.dateOfBirth || null,
          gender: form.gender || null,
          email: form.email || '',
          phone: form.phone || '',
          previous_school: form.previousSchool || '',
          application_year: Number(form.applicationYear) || null,
          grade_applying_for: form.gradeApplyingFor || '',
          extracurricular: form.extracurricular || '',
        })
        .select()
        .single();

      if (rowError || !row) {
        throw rowError || new Error('Could not save the application.');
      }

      // 1b. Fire the admin notification email (non-blocking — a failed email
      //     must not break the application submission).
      sendAdminNotification({
        fullName:         form.fullName,
        email:            form.email,
        phone:            form.phone,
        previousSchool:   form.previousSchool,
        applicationYear:  form.applicationYear,
        gradeApplyingFor: form.gradeApplyingFor,
        dateOfBirth:      form.dateOfBirth,
        gender:           form.gender,
        extracurricular:  form.extracurricular,
      }); // fire-and-forget

      // 2. Upload each document to Storage, then record its metadata.
      const docEntries: { kind: DocKind; file: File | null }[] = [
        { kind: 'report', file: form.reportFile },
        { kind: 'parent_id', file: form.parentIdFile },
        { kind: 'birth_cert', file: form.birthCertFile },
      ];

      const failedDocs: string[] = [];
      for (const { kind, file } of docEntries) {
        if (!file) continue;
        const path = `${row.id}/${kind}`;
        const { error: upError } = await supabase.storage
          .from('documents')
          .upload(path, file, {
            contentType: file.type || 'application/octet-stream',
            upsert: false,
          });
        if (upError) {
          // A document failure must not hide the already-saved row, but it must
          // not be SILENT either — collect it so the applicant can resend.
          console.error(`Failed to upload ${kind}:`, upError);
          failedDocs.push(kind);
          continue;
        }
        const { error: docError } = await supabase
          .from('application_documents')
          .insert({
            application_id: row.id,
            kind,
            storage_path: path,
            file_name: file.name,
          });
        if (docError) {
          console.error(`Failed to record ${kind} metadata:`, docError);
          failedDocs.push(kind);
        }
      }

      if (failedDocs.length > 0) {
        setWarning(
          `Your details were saved, but the following documents were not attached: ` +
            failedDocs.join(', ') +
            `. Please email them to the school or resubmit the form with the files attached.`
        );
      }

      setStatus('success');
      setForm(initialState);
      setReportFileName('');
      setParentIdFileName('');
      setBirthCertFileName('');
    } catch (err: unknown) {
      console.error('Application submission error:', err);
      setStatus('error');
      const message = err instanceof Error ? err.message : 'Network error. Please try again.';
      setErrorMessage(message);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#26262c] mb-2">Application Submitted</h2>
        <p className="text-[#76767f] mb-2">
          Thank you for your application. We will be in touch shortly.
        </p>
        {warning && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 text-left">
            <p className="text-amber-800 text-sm font-medium">⚠ {warning}</p>
          </div>
        )}
        <p className="text-[#76767f] text-sm mb-6">
          A confirmation email has been sent to your address.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="bg-[#4747d7] hover:bg-[#3a3ad7] text-white font-medium py-3 px-6 rounded-md transition duration-300"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  const inputClass = (error?: string) =>
    `w-full border ${error ? 'border-red-400' : 'border-gray-300'} rounded-lg px-4 py-3 text-[#26262c] focus:outline-none focus:ring-2 focus:ring-[#4747d7]/30 focus:border-[#4747d7] transition bg-white`;

  const labelClass = 'block text-sm font-medium text-[#26262c] mb-1';

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 md:p-8" noValidate>
      <div className="space-y-6">
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-[#4747d7] border-b border-[#4747d7]/20 pb-2 mb-2">
            Personal Information
          </legend>

          <div>
            <label htmlFor="fullName" className={labelClass}>Full Name *</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={handleChange}
              className={inputClass()}
              placeholder="e.g. Thabo Mokoena"
              autoComplete="name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dateOfBirth" className={labelClass}>Date of Birth *</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                value={form.dateOfBirth}
                onChange={handleChange}
                className={inputClass()}
              />
            </div>
            <div>
              <label htmlFor="gender" className={labelClass}>Gender *</label>
              <select
                id="gender"
                name="gender"
                required
                value={form.gender}
                onChange={handleChange}
                className={inputClass()}
              >
                <option value="">Select…</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-[#4747d7] border-b border-[#4747d7]/20 pb-2 mb-2">
            Contact Information
          </legend>

          <div>
            <label htmlFor="email" className={labelClass}>Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className={inputClass()}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>Phone Number *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              className={inputClass()}
              placeholder="071 123 4567"
              autoComplete="tel"
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-[#4747d7] border-b border-[#4747d7]/20 pb-2 mb-2">
            Academic Information
          </legend>

          <div>
            <label htmlFor="previousSchool" className={labelClass}>Previous School *</label>
            <input
              id="previousSchool"
              name="previousSchool"
              type="text"
              required
              value={form.previousSchool}
              onChange={handleChange}
              className={inputClass()}
              placeholder="Name of current/previous school"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="applicationYear" className={labelClass}>Application Year *</label>
              <select
                id="applicationYear"
                name="applicationYear"
                required
                value={form.applicationYear}
                onChange={handleChange}
                className={inputClass()}
              >
                {[new Date().getFullYear(), new Date().getFullYear() + 1, new Date().getFullYear() + 2].map((yr) => (
                  <option key={yr} value={String(yr)}>{yr}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="gradeApplyingFor" className={labelClass}>Grade Applying For *</label>
              <select
                id="gradeApplyingFor"
                name="gradeApplyingFor"
                required
                value={form.gradeApplyingFor}
                onChange={handleChange}
                className={inputClass()}
              >
                <option value="">Select grade…</option>
                <option value="8">Grade 8 (New Intake)</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-[#4747d7] border-b border-[#4747d7]/20 pb-2 mb-2">
            Extracurricular Activities <span className="text-sm font-normal text-[#76767f]">(optional)</span>
          </legend>
          <textarea
            name="extracurricular"
            value={form.extracurricular}
            onChange={handleChange}
            className={inputClass()}
            rows={3}
            placeholder="Sports, music, debate, coding, etc."
          />
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-[#4747d7] border-b border-[#4747d7]/20 pb-2 mb-2">
            Supporting Documents <span className="text-sm font-normal text-[#76767f]">(PDF, JPG or PNG)</span>
          </legend>

          <div>
            <label htmlFor="academicReport" className={labelClass}>Academic Report</label>
            <input
              id="academicReport"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'reportFile')}
              className="block w-full text-sm text-[#76767f] file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#4747d7]/10 file:text-[#4747d7] hover:file:bg-[#4747d7]/20 cursor-pointer"
            />
            {reportFileName && (
              <p className="mt-1 text-sm text-[#76767f]">Attached: <span className="font-medium">{reportFileName}</span></p>
            )}
          </div>

          <div>
            <label htmlFor="parentId" className={labelClass}>Parent / Guardian ID</label>
            <input
              id="parentId"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'parentIdFile')}
              className="block w-full text-sm text-[#76767f] file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#4747d7]/10 file:text-[#4747d7] hover:file:bg-[#4747d7]/20 cursor-pointer"
            />
            {parentIdFileName && (
              <p className="mt-1 text-sm text-[#76767f]">Attached: <span className="font-medium">{parentIdFileName}</span></p>
            )}
          </div>

          <div>
            <label htmlFor="birthCert" className={labelClass}>Learner Birth Certificate</label>
            <input
              id="birthCert"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, 'birthCertFile')}
              className="block w-full text-sm text-[#76767f] file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#4747d7]/10 file:text-[#4747d7] hover:file:bg-[#4747d7]/20 cursor-pointer"
            />
            {birthCertFileName && (
              <p className="mt-1 text-sm text-[#76767f]">Attached: <span className="font-medium">{birthCertFileName}</span></p>
            )}
          </div>

          <p className="text-xs text-[#76767f]">
            Upload a clear, legible copy of each document. If you don't have one ready, you can email it to the school later.
          </p>
        </fieldset>

        <div className="flex items-start gap-3">
          <input
            id="agreed"
            name="agreed"
            type="checkbox"
            required
            checked={form.agreed}
            onChange={handleChange}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-[#4747d7] focus:ring-[#4747d7]"
          />
          <label htmlFor="agreed" className="text-sm text-[#76767f]">
            I agree to the school's policies and terms. *
          </label>
        </div>

        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-[#4747d7] hover:bg-[#3a3ad7] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition duration-300 text-lg"
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;
