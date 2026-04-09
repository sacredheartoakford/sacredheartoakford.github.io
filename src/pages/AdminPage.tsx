import React, { useState, useRef } from 'react';
import MetaTags from '../components/MetaTags';
import Papa from 'papaparse';
import { jsPDF } from 'jspdf';

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
  'I agree to the school\'s policies and terms'?: string;
  [key: string]: any;
}

const AdminPage: React.FC = () => {
    const [applicationsData, setApplicationsData] = useState<ApplicationData[]>([]);
    const [fileName, setFileName] = useState<string>('No file selected');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingText, setLoadingText] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(`Selected: ${file.name}`);

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

        if (app['Upload Report'] || app['I agree to the school\'s policies and terms']) {
            const extraLines: { label: string, value: string }[] = [];

            if (app['I agree to the school\'s policies and terms'] === 'TRUE') {
                extraLines.push({ label: "Terms Agreement", value: "✓ Agreed" });
            }

            addSection("ADDITIONAL INFORMATION", extraLines);

            if (app['Upload Report']) {
                const url = app['Upload Report'];
                const text = "View Document";

                y -= 10;

                pdf.setFontSize(11);
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor(...colorDark);
                pdf.text("Report Document:", margin, y);

                const labelWidth = pdf.getTextWidth("Report Document: ");
                let valX = margin + labelWidth;

                pdf.setFont('helvetica', 'normal');
                pdf.setTextColor(37, 99, 235);

                pdf.textWithLink(text, valX, y, { url: url });

                pdf.setTextColor(...colorDark);

                y += 15;
            }
        }

        y = pageHeight - 20;
        pdf.setFontSize(10);
        pdf.setTextColor(...colorGray);
        const dateStr = new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
        pdf.text(`Generated on ${dateStr}`, pageWidth / 2, y, { align: 'center' });

        const fName = `${firstName(app['Full Name'])}_Application_${app['id'] || Date.now()}.pdf`;
        pdf.save(fName);
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

    return (
        <div className="bg-gradient-to-b from-[#f6f7fd] to-white min-h-screen py-12 relative">
            <MetaTags
                title="Admin Application Generator - Sacred Heart Secondary School"
                description="Generate application PDFs from CSV."
                url="/admin"
            />
            
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#2107c8] mb-3">📄 Application Generator (Admin)</h1>
                    <p className="text-[#76767f] text-lg">Upload a CSV file to generate formatted PDF documents for each application</p>
                </header>

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
                            {fileName}
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

                {applicationsData.length > 0 && (
                    <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-semibold text-[#26262c] mb-6 flex items-center gap-3">
                            <span className="text-green-500">👁️</span> Application Preview & PDF Generation
                        </h2>

                        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                            <button onClick={generateAllPDFs} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow-md flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Generate All PDFs
                            </button>
                        </div>

                        <div className="space-y-4">
                            {applicationsData.map((app, index) => {
                                const fullName = app['Full Name'] || 'Unknown';
                                const fName = fullName.split(' ')[0] || fullName;
                                return (
                                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                            <h3 className="font-semibold text-lg text-gray-800">{index + 1}. {fName}</h3>
                                            <span className="px-3 py-1 bg-[#4747d7]/10 text-[#4747d7] rounded-full text-sm font-medium">
                                                Grade: {app['Grade Applying For'] || 'N/A'}
                                            </span>
                                        </div>
                                        
                                        <div className="p-6 space-y-3">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <div><span className="text-gray-500">Full Name:</span><span className="ml-2 font-medium">{fullName}</span></div>
                                                <div><span className="text-gray-500">Date of Birth:</span><span className="ml-2 font-medium">{formatDate(app['Date of Birth'])}</span></div>
                                                <div><span className="text-gray-500">Gender:</span><span className="ml-2 font-medium">{app['Gender'] || 'N/A'}</span></div>
                                                <div><span className="text-gray-500">Email:</span><span className="ml-2 font-medium text-blue-600 truncate" title={app['Email Address']}>{app['Email Address'] || 'N/A'}</span></div>
                                                <div><span className="text-gray-500">Phone:</span><span className="ml-2 font-medium">{app['Phone Number'] || 'N/A'}</span></div>
                                                <div><span className="text-gray-500">Previous School:</span><span className="ml-2 font-medium">{app['Previous School'] || 'N/A'}</span></div>
                                            </div>
                                            
                                            {app['Extracurricular Activities'] && (
                                                <div className="mt-4 pt-4 border-t border-gray-100">
                                                    <span className="text-gray-500 text-sm">Activities:</span>
                                                    <p className="text-[#26262c] mt-1 whitespace-pre-line">{app['Extracurricular Activities']}</p>
                                                </div>
                                            )}
                                            
                                            {app['Upload Report'] && (
                                                <div className="mt-3">
                                                    <a href={app['Upload Report']} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm text-[#4747d7] hover:text-[#2107c8] transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        View Report Document
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end gap-3">
                                            <button onClick={() => generateSinglePDF(index)} className="flex items-center gap-2 bg-[#4747d7] hover:bg-[#3a3ad7] text-white font-medium py-1.5 px-4 rounded-lg transition-colors duration-200 text-sm shadow">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Generate PDF
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
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
