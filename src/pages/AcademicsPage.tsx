import React from 'react';
import MetaTags from '../components/MetaTags';
import EducationalInstitutionSchema from '../components/EducationalInstitutionSchema';

const AcademicsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <MetaTags
        title="Academics - Sacred Heart Secondary School"
        description="Explore our comprehensive academic programs at Sacred Heart Secondary School, including Science, Mathematics, Computer Application Technology, Accounting, and more."
        keywords={['school', 'education', 'secondary school', 'south africa', 'academic programs', 'curriculum', 'science', 'mathematics', 'computer application technology', 'accounting']}
        url="/academics"
      />
      <EducationalInstitutionSchema pageType="academics" />
      {/* Page Title Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#26262c]">Academics</h1>
        </div>
      </section>

      {/* "Curriculum Overview" Intro Section */}
      <section className="py-16 bg-[#f6f7fd]">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <h6 className="text-lg font-medium text-[#26262c] mb-2">Our Curriculum Overview</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-[#26262c] mb-6">A Commitment to Excellence</h2>
          <div className="w-16 h-1 bg-[#4747d7] mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[#76767f]">
                <span className="float-left text-7xl font-bold text-[#26262c] mr-3 leading-none">S</span>
                acred heart Secondary​ aims at offering all our students a broad and balanced curriculum that provides rewarding and stimulating activities to prepare them for the best social and cultural life.
              </p>
            </div>
            <div>
              <p className="text-[#76767f]">
                Whether it is our books or hands-on training, we make sure each student gets personal attention to cope up and flourish in every subject for better scores and a brighter future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Grid Section */}
      <section className="py-16 bg-[#f6f7fd]">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Science Department */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                <img
                  src="images/homepage/science.jpg"
                  alt="Science laboratory with students conducting experiments"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#26262c] mb-3">Science Department</h3>
                <p className="text-[#76767f]">
                  Science Lab Fun Edutainment Lab, encouraging reasoning, discoveries, and inventions.
                </p>
              </div>
            </div>

            {/* Mathematics */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                <img
                  src="https://sacredheartoakford.co.za/wp-content/uploads/2024/05/school-template-curriculum-img-5.jpg"
                  alt="Students learning mathematics with numbers and equations"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#26262c] mb-3">Mathematics</h3>
                <p className="text-[#76767f]">
                  Understanding the game of numbers and logic to solve real world problems.
                </p>
              </div>
            </div>

            {/* Computer Application Technology */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                <img
                  src="https://sacredheartoakford.co.za/wp-content/uploads/2024/05/20240528_082309-scaled.jpg"
                  alt="Students using computers for Computer Application Technology class"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#26262c] mb-3">Computer Application Technology</h3>
                <p className="text-[#76767f]">
                  Hands-on experience with the latest computer applications and technology.
                </p>
              </div>
            </div>

            {/* Accounting */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                <img
                  src="https://sacredheartoakford.co.za/wp-content/uploads/2024/07/20240722_110832-scaled.jpg"
                  alt="Students learning accounting with financial documents and calculators"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#26262c] mb-3">Accounting</h3>
                <p className="text-[#76767f]">
                  Empowering Financial Mastery. Unlock the power of numbers and finance.
                </p>
              </div>
            </div>

            {/* Humanities */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                <img
                  src="https://sacredheartoakford.co.za/wp-content/uploads/2024/05/school-template-curriculum-img-3.jpg"
                  alt="Students studying humanities with books and educational materials"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#26262c] mb-3">Humanities</h3>
                <p className="text-[#76767f]">
                  The study of ancient and modern languages, philosophy, history, and more.
                </p>
              </div>
            </div>

            {/* Business Studies */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                <img
                  src="https://sacredheartoakford.co.za/wp-content/uploads/2024/07/20240722_110739-scaled.jpg"
                  alt="Students learning business studies concepts"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#26262c] mb-3">Business Studies</h3>
                <p className="text-[#76767f]">
                  Unleashing Entrepreneurial Potential.
                </p>
              </div>
            </div>

            {/* Agricultural Science */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                <img
                  src="https://sacredheartoakford.co.za/wp-content/uploads/2024/05/shutterstock_1289254792.jpg"
                  alt="Student learning agricultural science with plants and farming equipment"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#26262c] mb-3">Agricultural Science</h3>
                <p className="text-[#76767f]">
                  Unravel the mysteries of life and growth.
                </p>
              </div>
            </div>

            {/* Drama Program */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                <img
                  src="/images/activities/main.jpg"
                  alt="Students participating in drama and music activities"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#26262c] mb-3">Drama and Music</h3>
                <p className="text-[#76767f]">
                  At Sacred Heart Secondary School, we believe in the power of the art to inspire.
                </p>
              </div>
            </div>

            {/* Electrical Engineering (up coming) */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                <img
                  src="https://sacredheartoakford.co.za/wp-content/uploads/2024/05/ElectricalEngineering_1000x750.jpg"
                  alt="Electrical engineering equipment and circuits"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#26262c] mb-3">Electrical Engineering (up coming)</h3>
                <p className="text-[#76767f]">
                  Ever wondered how electricity flows.
                </p>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* "College Opportunities" Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <h6 className="text-lg font-medium text-[#26262c] text-center">College Opportunities</h6>
        </div>
      </section>
    </div>
  );
};

export default AcademicsPage;