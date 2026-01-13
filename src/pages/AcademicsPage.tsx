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

      {/* Academic Achievement Section */}
      <section className="py-16 bg-gradient-to-r from-[#4747d7] to-[#6e71e4] text-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Outstanding Matric Results</h2>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Class of 2024</h3>
              <div className="text-5xl font-bold mb-2">94.5%</div>
              <p className="text-lg">Pass Rate</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Class of 2025</h3>
              <div className="text-5xl font-bold mb-2">98%</div>
              <p className="text-lg">Pass Rate</p>
            </div>
          </div>
          <p className="mt-8 text-xl max-w-3xl mx-auto italic">
            These exceptional results reflect our commitment to academic excellence and the dedication of our students and teachers.
          </p>
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
                  src="/images/homepage/science.avif"
                  alt="Physical Science"
                  className="w-full h-full object-cover"
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
                  src="/images/homepage/maths.avif"
                  alt="Mathematics"
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
                  src="/images/homepage/computerlap.avif"
                  alt="Computer Application Technology"
                  className="w-full h-full object-cover"
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
                  src="/images/homepage/accounting.avif"
                  alt="Accounting"
                  className="w-full h-full object-cover"
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
                  src="/images/homepage/humanities.avif"
                  alt="Humanities"
                  className="w-full h-full object-cover"
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
                  src="/images/homepage/business studies.avif"
                  alt="Students learning business studies concepts"
                  className="w-full h-72 object-cover object-center"
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
                  src="/images/homepage/agriculture.avif"
                  alt="Student learning agricultural science with plants and farming equipment"
                  className="w-full h-72 object-cover object-center"
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
                  src="/images/homepage/drama.avif"
                  alt="Drama and Music"
                  className="w-full h-full object-cover"
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
                  src="https://sacredheartoakford.co.za/wp-content/uploads/2024/05/ElectricalEngineering_1000x750.avif"
                  alt="Electrical engineering equipment and circuits"
                  className="w-full h-72 object-cover object-center"
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