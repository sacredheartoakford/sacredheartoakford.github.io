import React, { useState, ChangeEvent, FormEvent } from 'react';

// ── Configuration ────────────────────────────────────────────────────────────
// Set these when you deploy the Google Apps Script.
// AP_SCRIPT_URL: The /exec URL of your deployed Apps Script (handles form POST).
// GOOGLE_SHEET_CSV: The published CSV URL of your Google Sheet (for the admin view).
// For now they're empty — fill them in once the Apps Script is deployed.
const AP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzS00U-uV19eyDxtfzNw_GqqRhKUwqgO-CZb6oTmVgF_IzJyFZYiVDtZjj7FdcgecS8Tg/exec';
const GOOGLE_SHEET_CSV_URL = '';

export const APPLICATION_CONFIG = { AP_SCRIPT_URL, GOOGLE_SHEET_CSV_URL };

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
  agreed: false,
};

const ApplicationForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'agreed' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm(prev => ({ ...prev, reportFile: file }));
    setFileName(file ? file.name : '');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!AP_SCRIPT_URL) {
      setStatus('error');
      setErrorMessage('The application endpoint is not configured yet. Please try again later or contact the school directly.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Build FormData for the Apps Script
      const formData = new FormData();
      formData.append('fullName', form.fullName);
      formData.append('dateOfBirth', form.dateOfBirth);
      formData.append('gender', form.gender);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('previousSchool', form.previousSchool);
      formData.append('applicationYear', form.applicationYear);
      formData.append('gradeApplyingFor', form.gradeApplyingFor);
      formData.append('extracurricular', form.extracurricular);
      formData.append('agreed', form.agreed ? 'true' : 'false');

      if (form.reportFile) {
        formData.append('report', form.reportFile, form.reportFile.name);
      }

      const response = await fetch(AP_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setStatus('success');
        setForm(initialState);
        setFileName('');
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Application submission error:', err);
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
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
        <h2 className="text-2xl font-bold text-[#26262c] mb-2">Application Received</h2>
        <p className="text-[#76767f] mb-6">
          Thank you for your application. We will be in touch shortly.
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
        {/* ── Personal Information ── */}
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

        {/* ── Contact Information ── */}
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

        {/* ── Academic Information ── */}
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
                {[new Date().getFullYear() + 1, new Date().getFullYear() + 2].map(yr => (
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

        {/* ── Extracurricular ── */}
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

        {/* ── Report Upload ── */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-[#4747d7] border-b border-[#4747d7]/20 pb-2 mb-2">
            Academic Report <span className="text-sm font-normal text-[#76767f]">(PDF, optional)</span>
          </legend>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="block w-full text-sm text-[#76767f] file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#4747d7]/10 file:text-[#4747d7] hover:file:bg-[#4747d7]/20 cursor-pointer"
          />
          {fileName && (
            <p className="text-sm text-[#76767f]">Attached: <span className="font-medium">{fileName}</span></p>
          )}
          <p className="text-xs text-[#76767f]">
            Upload the most recent term report. If you don't have it ready, you can email it to the school later.
          </p>
        </fieldset>

        {/* ── Terms ── */}
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

        {/* ── Error message ── */}
        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* ── Submit ── */}
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
