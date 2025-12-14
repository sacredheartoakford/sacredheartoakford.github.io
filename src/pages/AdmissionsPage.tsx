import React from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText } from 'lucide-react';

const AdmissionsPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#f6f7fd] min-h-screen">
      <div className="container mx-auto px-6 sm:px-8">
        <h1 className="text-3xl font-bold text-[#26262c] mb-8">Admissions</h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#26262c] mb-4">Entry Requirements</h2>
          <p className="text-[#76767f] mb-6">
            Sacred Heart Secondary School welcomes applications from students who demonstrate academic potential
            and a commitment to our values of excellence, integrity, and service.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-[#4747d7] pl-4 py-1">
              <h3 className="text-xl font-semibold text-[#26262c] mb-2">Grade 8 Applications</h3>
              <p className="text-[#76767f] mb-3">
                Applications for Grade 8 are accepted from March to September of the preceding year.
                Prospective students must submit:
              </p>
              <ul className="list-disc pl-5 text-[#76767f] space-y-1 mb-4">
                <li>Completed application form</li>
                <li>Copies of previous academic reports</li>
                <li>Birth certificate</li>
                <li>Two recent passport-sized photographs</li>
              </ul>
            </div>

            <div className="border-l-4 border-[#4747d7] pl-4 py-1">
              <h3 className="text-xl font-semibold text-[#26262c] mb-2">Transfer Students</h3>
              <p className="text-[#76767f] mb-3">
                Students transferring from other institutions must provide:
              </p>
              <ul className="list-disc pl-5 text-[#76767f] space-y-1">
                <li>Letter of transfer from current school</li>
                <li>Academic transcripts from previous school</li>
                <li>Disciplinary record (if applicable)</li>
                <li>Completed application form</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/apply"
              className="inline-flex items-center bg-[#4747d7] hover:bg-[#3a3ac5] text-white font-medium py-3 px-6 rounded-md transition duration-300"
            >
              <FileText className="w-5 h-5 mr-2" />
              Apply Online
            </Link>
            <a
              href="/files/SHS-APPLICATION-FORM.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white border-2 border-[#4747d7] hover:bg-[#f0f0ff] text-[#4747d7] font-medium py-3 px-6 rounded-md transition duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Form (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsPage;