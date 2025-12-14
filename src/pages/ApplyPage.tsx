import React, { useEffect } from 'react';

const ApplyPage: React.FC = () => {
  useEffect(() => {
    // Load the OpnForm iframe script
    const script = document.createElement('script');
    script.src = 'https://opnform.com/widgets/iframe.min.js';
    script.type = 'text/javascript';
    script.onload = () => {
      // Initialize the embed after script loads
      if (typeof (window as any).initEmbed === 'function') {
        (window as any).initEmbed('high-school-application-form-htqamj', { autoResize: false });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="py-12 bg-gradient-to-b from-[#f6f7fd] to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#26262c] mb-3">
            Apply to Sacred Heart Secondary School
          </h1>
          <p className="text-[#76767f] text-lg">
            Complete the form below to submit your application
          </p>
        </div>

        {/* OpnForm Embedded Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <iframe
            style={{ border: 'none', width: '100%', height: '700px', maxHeight: '50vh' }}
            id="high-school-application-form-htqamj"
            src="https://opnform.com/forms/high-school-application-form-htqamj"
            title="High School Application Form"
          />
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-[#76767f] text-sm">
            By submitting this form, you agree to our terms and conditions.
            We will contact you via the telephone number provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;