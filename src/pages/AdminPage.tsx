import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import MetaTags from '../components/MetaTags';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import { PDFDocument } from 'pdf-lib';

// ── Configuration ────────────────────────────────────────────────────────────
// GOOGLE_SHEET_CSV_URL: Published CSV URL of the Google Sheet that receives
// form submissions. The sheet must be shared "Anyone with the link can view".
// Then: File → Publish to web → Choose CSV → Launch.
const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTJG2gNIrfOrikj0YbKsGCotz_c1EWZuEpujgcaEs0NqKzNtiZLk-KZ7zi9K5D1om-6bRuQ4hlz6ifl/pub?gid=0&single=true&output=csv';

interface ApplicationData {
  id?: string;
  'Full Name'?: string;
  'Date of Birth'?: string;
  'Gender'?: string;
  'Email Address'?: string;
  'Phone Number'?: string;
  'Previous School'?: string;
  'Application Year'?: string;
  'Grade Applying For'?: string;
  'Extracurricular Activities'?: string;
  'Upload Report'?: string;
  "I agree to the school's policies and terms"?: string;
  [key: string]: any;
}

const getFieldValue = (app: ApplicationData, keys: string[]): string => {
  for (const key of keys) {
    const v = app[key];
    if (v !== undefined && v !== null && v !== '') return String(v);
  }
  return '';
};

const AdminPage: React.FC = () => {
    const [applicationsData, setApplicationsData] = useState<ApplicationData[]>([]);
    const [fileName, setFileName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingText, setLoadingText] = useState<string>('');
    const [mode, setMode] = useState<'live' | 'manual'>('live');
    const [liveLoading, setLiveLoading] = useState<boolean>(false);
    const [liveError, setLiveError] = useState<string>('');
    const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
    const [search, setSearch] = useState<string>('');
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return applicationsData;
        return applicationsData.filter(app =>
            [
                app['Full Name'], app['fullName'],
                app['Email Address'], app['email'],
                app['Phone Number'], app['phone'],
                app['Previous School'], app['previousSchool'],
                app['Grade Applying For'], app['gradeApplyingFor'],
                app['Application Year'],
            ].some(f => f && String(f).toLowerCase().includes(q))
        );
    }, [applicationsData, search]);

    const stats = useMemo(() => ({
        total: applicationsData.length,
        byGrade: applicationsData.reduce((acc, app) => {
            const g = app['Grade Applying For'] || app['gradeApplyingFor'] || 'Unknown';
            acc[g] = (acc[g] || 0) + 1;
            return acc;
        }, {} as Record<string, number>)
    }), [applicationsData]);

    // Fetch from Google Sheet CSV
    const fetchLiveApplications = useCallback(async () => {
        if (!GOOGLE_SHEET_CSV_URL) return;

        setLiveLoading(true);
        setLiveError('');

        try {
            const response = await fetch(GOOGLE_SHEET_CSV_URL);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const csvText = await response.text();

            Papa.parse<ApplicationData>(csvText, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: false,
                complete: (results) => {
                    const rows = results.data as ApplicationData[];
                    const valid = rows.filter(
                        r => r['Full Name'] || r['fullName'] || Object.keys(r).length > 1
                    );
                    setApplicationsData(valid);
                    setLastRefreshed(new Date());
                }
            });
        } catch (err) {
            console.error('Live feed fetch error:', err);
            setLiveError('Could not load live applications. Check the Google Sheet URL.');
        } finally {
            setLiveLoading(false);
        }
    }, []);

    // Auto-fetch on mount and every 2 minutes
    useEffect(() => {
        if (mode === 'live' && GOOGLE_SHEET_CSV_URL) {
            fetchLiveApplications();
            const interval = setInterval(fetchLiveApplications, 120_000); // 2 min
            return () => clearInterval(interval);
        }
    }, [mode, fetchLiveApplications]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);

        Papa.parse<ApplicationData>(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results: Papa.ParseResult<ApplicationData>) => {
                const data = results.data;
                if (data.length > 0) {
                    setApplicationsData(data);
                } else {
                    alert('No data found in the CSV file. Please check your file format.');
                }
            },
            error: (error: any) => {
                console.error('CSV Parse Error:', error);
                alert('Error parsing CSV file. Please ensure it is a valid CSV file.');
            }
        });
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-ZA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    const firstName = (fullName?: string) => {
        return fullName ? fullName.split(' ')[0] : 'Application';
    };

    // ── PDF Merge Helpers ───────────────────────────────────────────────────
    const extractDriveFileId = (url: string): string | null => {
        const match = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([a-zA-Z0-9_-]+)/);
        if (match) return match[1];
        const ucMatch = url.match(/uc\?.*id=([a-zA-Z0-9_-]+)/);
        if (ucMatch) return ucMatch[1];
        return null;
    };

    // Static-host proxy (persistent cloudflared tunnel + node server).
    // Used in production where there's no dev-server middleware.
    const DRIVE_PROXY_BASE = 'https://limiting-jesse-wake-ventures.trycloudflare.com';

    const fetchDriveFile = async (fileId: string): Promise<Uint8Array> => {
        const tryFetch = (baseUrl: string): Promise<Uint8Array> =>
            fetch(`${baseUrl}/api/drive-proxy?id=${encodeURIComponent(fileId)}`)
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.arrayBuffer();
                })
                .then(buf => new Uint8Array(buf));

        // Prefer the static proxy (works on GitHub Pages); fall back to the
        // local Vite middleware (works in dev) if the tunnel is down.
        try {
            return await tryFetch(DRIVE_PROXY_BASE);
        } catch (e) {
            console.warn('Static proxy failed, trying local dev proxy:', e);
            return await tryFetch('');
        }
    };

    const isPdf = (bytes: Uint8Array): boolean => {
        if (bytes.length < 4) return false;
        return bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46; // %PDF
    };

    const mergePdfs = async (generatedPdfBytes: Uint8Array, uploadedPdfBytes: Uint8Array): Promise<Uint8Array> => {
        const mergedDoc = await PDFDocument.create();

        // Copy generated form pages
        const genDoc = await PDFDocument.load(generatedPdfBytes);
        const genPageCount = genDoc.getPageCount();
        const genPageNumbers = Array.from({ length: genPageCount }, (_, i) => i);
        const genPages = await mergedDoc.copyPages(genDoc, genPageNumbers);
        for (const page of genPages) {
            mergedDoc.addPage(page);
        }

        // Copy uploaded report pages
        const upDoc = await PDFDocument.load(uploadedPdfBytes);
        const upPageCount = upDoc.getPageCount();
        const upPageNumbers = Array.from({ length: upPageCount }, (_, i) => i);
        const upPages = await mergedDoc.copyPages(upDoc, upPageNumbers);
        for (const page of upPages) {
            mergedDoc.addPage(page);
        }

        return mergedDoc.save();
    };

    const renderToPdf = async (app: ApplicationData) => {
        // Create PDF with A4 dimensions (210mm x 297mm)
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const margin = 15;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const colorBlue: [number, number, number] = [30, 64, 175];   // #1e40af
        const colorGray: [number, number, number] = [107, 114, 128]; // #6b7280
        const colorDark: [number, number, number] = [55, 65, 81];    // #374151

        let y = margin;

        pdf.setFontSize(20);
        pdf.setTextColor(...colorBlue);
        pdf.text("SCHOOL APPLICATION FORM", pageWidth / 2, y, { align: 'center' });

        y += 10;
        pdf.setFontSize(12);
        pdf.setTextColor(...colorGray);
        pdf.text(`Application Year: ${app['Application Year'] || 'N/A'}`, pageWidth / 2, y, { align: 'center' });

        y += 15;
        pdf.setDrawColor(...colorBlue);
        pdf.line(margin, y, pageWidth - margin, y);

        y += 10;

        const addSection = (title: string, contentLines: { label?: string, value?: string, isMultiline?: boolean }[]) => {
            pdf.setFontSize(14);
            pdf.setTextColor(...colorBlue);
            pdf.text(title.toUpperCase(), margin, y);

            y += 8;
            pdf.setDrawColor(...colorBlue);
            pdf.line(margin, y - 2, pageWidth - margin, y - 2);

            y += 10;

            pdf.setFontSize(11);
            pdf.setTextColor(...colorDark);

            contentLines.forEach(line => {
                const label = line.label || '';
                const value = line.value || '';

                if (label) {
                    pdf.setFont('helvetica', 'bold');
                    pdf.text(`${label}:`, margin, y);

                    const labelWidth = pdf.getTextWidth(label + ": ");
                    let valX = margin + labelWidth;

                    pdf.setFont('helvetica', 'normal');

                    if (line.isMultiline || value.includes('\n')) {
                        const splitText = pdf.splitTextToSize(value, pageWidth - margin - valX);
                        pdf.text(splitText, valX, y);
                        y += (splitText.length * 5) + 2;
                    } else {
                        pdf.text(value, valX, y);
                        y += 7;
                    }
                } else {
                    pdf.setFont('helvetica', 'normal');
                    const splitText = pdf.splitTextToSize(value, pageWidth - margin);
                        pdf.text(splitText, margin, y);
                        y += (splitText.length * 5) + 2;
                }
            });

            y += 10;
        };

        addSection("PERSONAL INFORMATION", [
            { label: "Full Name", value: app['Full Name'] || 'Unknown' },
            { label: "Date of Birth", value: formatDate(app['Date of Birth']) },
            { label: "Gender", value: app['Gender'] || 'N/A' }
        ]);

        addSection("CONTACT INFORMATION", [
            { label: "Email Address", value: app['Email Address'] || 'N/A' },
            { label: "Phone Number", value: app['Phone Number'] || 'N/A' }
        ]);

        addSection("ACADEMIC INFORMATION", [
            { label: "Previous School", value: app['Previous School'] || 'N/A' },
            { label: "Grade Applying For", value: app['Grade Applying For'] || 'N/A' }
        ]);

        if (app['Extracurricular Activities']) {
            addSection("EXTRACURRICULAR ACTIVITIES", [
                { label: "", value: app['Extracurricular Activities'], isMultiline: true }
            ]);
        }

        if (app['Upload Report'] || app["I agree to the school's policies and terms"]) {
            const extraLines: { label: string, value: string }[] = [];

            if (app["I agree to the school's policies and terms"] === 'TRUE') {
                extraLines.push({ label: "Terms Agreement", value: "✓ Agreed" });
            }

            if (extraLines.length > 0) {
                addSection("ADDITIONAL INFORMATION", extraLines);
            }
        }

        y = pageHeight - 20;
        pdf.setFontSize(10);
        pdf.setTextColor(...colorGray);
        const dateStr = new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
        pdf.text(`Generated on ${dateStr}`, pageWidth / 2, y, { align: 'center' });

        const fName = `${firstName(app['Full Name'])}_Application_${app['id'] || Date.now()}.pdf`;

        // Get the generated PDF bytes
        const generatedBytes = new Uint8Array(pdf.output('arraybuffer'));

        // Try to merge with the uploaded report file (if it's a PDF)
        const reportUrl = app['Upload Report'] || app['Report URL'] || '';
        let mergedBytes: Uint8Array | null = null;

        console.log('[PDF] reportUrl:', reportUrl);

        if (reportUrl && reportUrl.startsWith('http')) {
            try {
                const fileId = extractDriveFileId(reportUrl);
                console.log('[PDF] fileId:', fileId);
                if (fileId) {
                    const fileBytes = await fetchDriveFile(fileId);
                    console.log('[PDF] fileBytes:', fileBytes.length, 'bytes');
                    if (isPdf(fileBytes)) {
                        mergedBytes = await mergePdfs(generatedBytes, fileBytes);
                        console.log('[PDF] merged:', mergedBytes.length, 'bytes');
                    } else {
                        console.log('[PDF] Not a PDF');
                    }
                }
            } catch (mergeErr) {
                console.warn('Could not merge uploaded file:', mergeErr);
            }
        }

        if (mergedBytes) {
            const blob = new Blob([mergedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fName;
            a.click();
            URL.revokeObjectURL(url);
        } else {
            pdf.save(fName);
        }
    };

    const generateSinglePDF = async (index: number) => {
        const app = applicationsData[index];
        setIsLoading(true);
        setLoadingText(`Generating PDF for ${app['Full Name'] || 'Application'}...`);

        try {
            await renderToPdf(app);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const generateAllPDFs = async () => {
        if (applicationsData.length === 0) return;

        for (let i = 0; i < applicationsData.length; i++) {
            setIsLoading(true);
            setLoadingText(`Generating PDF ${i + 1} of ${applicationsData.length}...`);

            try {
                const app = applicationsData[i];
                await renderToPdf(app);
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.error(`Error generating PDF  for application ${i}:`, error);
            }
        }

        setIsLoading(false);
    };

    const initials = (name?: string) => {
        if (!name) return 'A';
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="bg-gradient-to-b from-[#f6f7fd] to-white min-h-screen py-12 relative">
            <MetaTags
                title="Admin Application Generator - Sacred Heart Secondary School"
                description="Generate application PDFs from CSV."
                url="/admin"
            />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-[#2107c8] mb-3">📄 Application Manager</h1>
                    <p className="text-[#76767f] text-lg">Manage applications, search applicants, and generate formatted PDF documents</p>
                </header>

                {/* ── Stats Row ── */}
                {applicationsData.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-xl shadow-md border border-blue-100 p-5">
                            <div className="text-3xl font-bold text-[#4747d7] mb-1">{stats.total}</div>
                            <div className="text-xs font-medium text-[#76767f] uppercase tracking-wide">Total Applications</div>
                        </div>
                        {Object.entries(stats.byGrade)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 3)
                            .map(([grade, count]) => (
                                <div key={grade} className="bg-white rounded-xl shadow-md border border-blue-100 p-5">
                                    <div className="text-3xl font-bold text-[#26262c] mb-1">{count}</div>
                                    <div className="text-xs font-medium text-[#76767f] uppercase tracking-wide">
                                        Grade {grade === 'Unknown' ? '—' : grade}
                                    </div>
                                </div>
                            ))}
                        <div className="bg-white rounded-xl shadow-md border border-blue-100 p-5">
                            <div className="text-3xl font-bold text-[#26262c] mb-1">{Object.keys(stats.byGrade).length}</div>
                            <div className="text-xs font-medium text-[#76767f] uppercase tracking-wide">Grades Represented</div>
                        </div>
                    </div>
                )}

                {/* ── Mode Toggle ── */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1 shadow-md">
                        <button
                            onClick={() => { setMode('live'); setApplicationsData([]); }}
                            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                                mode === 'live'
                                    ? 'bg-[#4747d7] text-white shadow-md'
                                    : 'text-[#76767f] hover:bg-gray-50'
                            }`}
                        >
                            Live Feed
                        </button>
                        <button
                            onClick={() => { setMode('manual'); setApplicationsData([]); }}
                            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                                mode === 'manual'
                                    ? 'bg-[#4747d7] text-white shadow-md'
                                    : 'text-[#76767f] hover:bg-gray-50'
                            }`}
                        >
                            Manual Upload
                        </button>
                    </div>
                </div>

                {/* ── Live Feed Panel ── */}
                {mode === 'live' && (
                    <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-blue-100">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-[#26262c] flex items-center gap-3">
                                <span className="text-[#4747d7]">📡</span> Live Applications Feed
                            </h2>
                            <div className="flex items-center gap-3">
                                {lastRefreshed && (
                                    <span className="text-xs text-[#76767f]">
                                        Updated {lastRefreshed.toLocaleTimeString('en-ZA')}
                                    </span>
                                )}
                                <button
                                    onClick={fetchLiveApplications}
                                    disabled={liveLoading || !GOOGLE_SHEET_CSV_URL}
                                    className="bg-[#4747d7] hover:bg-[#3a3ad7] disabled:opacity-50 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
                                >
                                    {liveLoading ? 'Refreshing…' : 'Refresh Now'}
                                </button>
                            </div>
                        </div>

                        {!GOOGLE_SHEET_CSV_URL ? (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                                <h3 className="font-semibold text-amber-800 mb-2">⚠️ Google Sheet not configured</h3>
                                <p className="text-sm text-amber-700">
                                    Set the <code className="bg-amber-100 px-1 rounded">GOOGLE_SHEET_CSV_URL</code> in{' '}
                                    <code className="bg-amber-100 px-1 rounded">AdminPage.tsx</code> to the published CSV URL of your
                                    Google Sheet.
                                </p>
                            </div>
                        ) : liveError ? (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                                <p className="text-red-700 text-sm">{liveError}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-[#76767f] mb-4">
                                Auto-refreshes every 2 minutes. {applicationsData.length} application(s) loaded.
                            </p>
                        )}
                    </div>
                )}

                {/* ── Manual Upload Panel ── */}
                {mode === 'manual' && (
                    <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-blue-100">
                        <h2 className="text-2xl font-semibold text-[#26262c] mb-6 flex items-center gap-3">
                            <span className="text-[#4747d7]">📁</span> Upload CSV File
                        </h2>

                        <div className="flex flex-col md:flex-row gap-4 items-start">
                            <input
                                type="file"
                                id="csvFileInput"
                                accept=".csv"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="cursor-pointer bg-gradient-to-r from-[#4747d7] to-[#6e71e4] hover:from-[#3a3ad7] hover:to-[#575ae1] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                Choose CSV File
                            </button>

                            <div className={`text-sm py-3 px-4 rounded-lg border flex-grow ${applicationsData.length > 0 ? 'bg-green-50 border-green-300 text-green-800' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                                {fileName ? `Loaded: ${fileName}` : 'No file selected'}
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                            <h3 className="font-semibold text-[#26262c] mb-2 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4747d7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Expected CSV Format
                            </h3>
                            <p className="text-sm text-[#76767f] mb-2">The CSV should contain the following columns:</p>
                            <div className="flex flex-wrap gap-2">
                                {['id', 'Full Name', 'Date of Birth', 'Gender', 'Email Address', 'Phone Number', 'Previous School', 'Application Year', 'Grade Applying For', 'Extracurricular Activities', 'Upload Report'].map(col => (
                                    <span key={col} className="px-2 py-1 bg-white border border-blue-200 rounded text-xs font-mono text-[#4747d7]">
                                        {col}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Applications List ── */}
                {applicationsData.length > 0 && (
                    <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 mb-8 border border-blue-100">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-[#26262c] flex items-center gap-3">
                                <span className="text-green-500">👁️</span> Applications
                                {search && (
                                    <span className="text-sm font-normal text-[#76767f]">
                                        ({filtered.length} of {applicationsData.length})
                                    </span>
                                )}
                            </h2>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search name, email, school…"
                                        className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#4747d7] focus:border-transparent w-64"
                                    />
                                </div>
                                <button
                                    onClick={generateAllPDFs}
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-200 shadow-md flex items-center gap-2 text-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Generate All PDFs
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {filtered.map((app, index) => {
                                const fullName = getFieldValue(app, ['Full Name', 'fullName']) || 'Unknown';
                                const grade = getFieldValue(app, ['Grade Applying For', 'gradeApplyingFor']);
                                const year = app['Application Year'] || '';
                                const isExpanded = expandedIndex === index;

                                return (
                                    <div
                                        key={index}
                                        className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                                            isExpanded ? 'border-[#4747d7] shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                        }`}
                                    >
                                        {/* Header row */}
                                        <div
                                            className="px-5 py-3 flex items-center gap-4 cursor-pointer select-none"
                                            onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                        >
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4747d7] to-[#6e71e4] flex items-center justify-center text-white font-bold text-sm shrink-0">
                                                {initials(fullName)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-[#26262c] truncate">{fullName}</div>
                                                <div className="text-xs text-[#76767f]">
                                                    {grade ? `Grade ${grade}` : 'Grade N/A'}
                                                    {year ? ` · ${year}` : ''}
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); generateSinglePDF(index); }}
                                                className="flex items-center gap-2 bg-[#4747d7] hover:bg-[#3a3ad7] text-white font-medium py-1.5 px-3 rounded-lg transition-colors duration-200 text-xs shadow shrink-0"
                                                title="Generate PDF for this application"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                PDF
                                            </button>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>

                                        {/* Expanded detail */}
                                        {isExpanded && (
                                            <div className="px-5 pb-5 pt-1">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm border-t border-gray-100 pt-3">
                                                    <div className="flex justify-between py-1.5 border-b border-gray-50">
                                                        <span className="text-[#76767f]">Date of Birth</span>
                                                        <span className="font-medium text-[#26262c]">{formatDate(getFieldValue(app, ['Date of Birth', 'dateOfBirth']))}</span>
                                                    </div>
                                                    <div className="flex justify-between py-1.5 border-b border-gray-50">
                                                        <span className="text-[#76767f]">Gender</span>
                                                        <span className="font-medium text-[#26262c]">{getFieldValue(app, ['Gender', 'gender']) || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between py-1.5 border-b border-gray-50">
                                                        <span className="text-[#76767f]">Email</span>
                                                        <span className="font-medium text-[#4747d7] truncate ml-2">{getFieldValue(app, ['Email Address', 'email']) || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between py-1.5 border-b border-gray-50">
                                                        <span className="text-[#76767f]">Phone</span>
                                                        <span className="font-medium text-[#26262c]">{getFieldValue(app, ['Phone Number', 'phone']) || 'N/A'}</span>
                                                    </div>
                                                    <div className="flex justify-between py-1.5 border-b border-gray-50 md:col-span-2">
                                                        <span className="text-[#76767f]">Previous School</span>
                                                        <span className="font-medium text-[#26262c]">{getFieldValue(app, ['Previous School', 'previousSchool']) || 'N/A'}</span>
                                                    </div>
                                                </div>

                                                {getFieldValue(app, ['Extracurricular Activities', 'extracurricular']) && (
                                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                                        <div className="text-[#76767f] text-xs font-medium uppercase tracking-wide mb-1.5">Activities</div>
                                                        <p className="text-[#26262c] whitespace-pre-line text-sm">{getFieldValue(app, ['Extracurricular Activities', 'extracurricular'])}</p>
                                                    </div>
                                                )}

                                                {getFieldValue(app, ['Upload Report', 'report']) && (
                                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                                        <a
                                                            href={getFieldValue(app, ['Upload Report', 'report'])}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center text-sm text-[#4747d7] hover:text-[#2107c8] transition-colors font-medium"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            View Report Document
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {filtered.length === 0 && (
                                <div className="text-center py-10 text-[#76767f] text-sm">
                                    No applications match "{search}".
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {applicationsData.length === 0 && (
                    <div className="bg-white rounded-xl shadow-md border border-blue-100 p-12 text-center">
                        <div className="text-5xl mb-4">{mode === 'live' ? '📡' : '📁'}</div>
                        <p className="text-[#76767f] text-lg mb-1">
                            {mode === 'live'
                                ? 'Waiting for applications from the live feed…'
                                : 'Upload a CSV file to see applications.'}
                        </p>
                        <p className="text-[#76767f] text-sm">
                            {mode === 'live'
                                ? 'New applications appear automatically every 2 minutes.'
                                : 'Use the upload panel above to load a CSV file.'}
                        </p>
                    </div>
                )}
            </div>

            {isLoading && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl p-8 shadow-2xl text-center max-w-md mx-4">
                        <div className="animate-spin text-[#4747d7] mx-auto mb-4">
                            <svg className="h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Generating PDF...</h3>
                        <p className="text-gray-600">{loadingText}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
