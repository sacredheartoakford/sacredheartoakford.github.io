import React from 'react';
import MetaTags from '../components/MetaTags';
import EducationalInstitutionSchema from '../components/EducationalInstitutionSchema';
import ApplicationForm from '../components/ApplicationForm';

const ApplyPage: React.FC = () => {
  return (
    <div className="py-12 bg-gradient-to-b from-[#f6f7fd] to-white min-h-screen flex flex-col">
      <MetaTags
        title="Apply - Sacred Heart Secondary School"
        description="Apply to Sacred Heart Secondary School. Complete our online application form for Grade 8 or transfer students. Submit your application today."
        keywords={['school', 'education', 'secondary school', 'south africa', 'application', 'apply online', 'grade 8', 'transfer students', 'school application']}
        url="/apply"
      />
      <EducationalInstitutionSchema pageType="admissions" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#26262c] mb-3">
            Apply to Sacred Heart Secondary School
          </h1>
          <p className="text-[#76767f] text-lg">
            Complete the form below to submit your application
          </p>
        </div>

        {/* Native Application Form */}
        <ApplicationForm />

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-[#76767f] text-sm">
            By submitting this form, you agree to our terms and conditions.
            We will contact you via the telephone number or email address provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
