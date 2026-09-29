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

      {/* Matric Pass Rate Table */}
      <section className="py-16 bg-gradient-to-r from-[#4747d7] to-[#6e71e4] text-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Outstanding Matric Results</h2>
          <div className="w-24 h-1 bg-white mx-auto mb-10"></div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/30">
                  <th className="py-3 px-4 font-semibold">Year</th>
                  <th className="py-3 px-4 font-semibold text-center">Matric Pass Rate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { year: '2021', rate: '74%' },
                  { year: '2022', rate: '78%' },
                  { year: '2023', rate: '84%' },
                  { year: '2024', rate: '90%' },
                  { year: '2025', rate: '99%' },
                ].map((row) => (
                  <tr key={row.year} className="border-b border-white/10">
                    <td className="py-3 px-4 font-medium">{row.year}</td>
                    <td className="py-3 px-4 text-center text-2xl font-bold">{row.rate}</td>
                  </tr>
                ))}
                <tr>
                  <td className="py-3 px-4 font-bold text-white/90">2026 Target</td>
                  <td className="py-3 px-4 text-center text-2xl font-bold text-yellow-300">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-xl max-w-3xl mx-auto italic">
            Five consecutive years of growth. These results reflect our commitment to academic excellence and the dedication of our students and teachers.
          </p>
        </div>
      </section>

      {/* Enrollment Growth Section */}
      <section className="py-16 bg-[#f6f7fd]">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h6 className="text-lg font-medium text-[#26262c] mb-2">A School That Is Growing</h6>
              <h2 className="text-3xl md:text-4xl font-bold text-[#26262c] mb-6">From 350 to 730 Learners</h2>
              <p className="text-[#76767f] mb-4">
                Since 2021, enrollment at Sacred Heart Secondary School has more than doubled, from approximately 350 learners to around 730. This growth reflects the confidence that families, alumni and the community place in the school, and it has driven our matric pass rate from 74% to 99% over the same period.
              </p>
              <p className="text-[#76767f] mb-4">
                Academic focus areas include Mathematics, Physical Sciences, English, Music, Art and Culture, CAT and IT, Agriculture and Accounting. A developing swimming programme is also creating pathways for learners to compete at higher levels.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-[#4747d7]">730</div>
                <p className="text-[#76767f] text-sm mt-2">learners enrolled (2025)</p>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-[#76767f]">2021</span>
                  <span className="font-bold text-[#26262c]">≈ 350 learners</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-[#76767f]">2025</span>
                  <span className="font-bold text-[#26262c]">≈ 730 learners</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#76767f]">Growth</span>
                  <span className="font-bold text-[#4747d7]">+109% since 2021</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School History Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <h6 className="text-lg font-medium text-[#26262c] mb-2 text-center">Our Story</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-[#26262c] mb-8 text-center">A Legacy Since 1886</h2>
          <div className="w-16 h-1 bg-[#4747d7] mb-10 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <p className="text-[#76767f] mb-4">
                Sacred Heart Secondary School traces its origins to 1886, when it formed part of a Roman Catholic Mission school serving local primary school children. The Dominican Sisters of Oakford later took over the school, and in 1903 they established St. Mary's, a separate girls' school, on the same estate.
              </p>
            </div>
            <div>
              <p className="text-[#76767f] mb-4">
                When St. Mary's closed in 1980, Sacred Heart Secondary School for African girls was relocated to the St. Mary's premises, where it continues to operate. In 1982 the Dominican Sisters handed management of the school to the Department of Education, with a formal transition agreement signed in 2000.
              </p>
            </div>
          </div>
          <p className="mt-8 text-center text-[#76767f] max-w-3xl mx-auto">
            Today, the school is located at the historic Oakford Priory, approximately 40 km north of Durban, and serves Grades 8–12 as a girls' boarding school. Education extends beyond the classroom through academic, cultural, artistic, sporting and leadership opportunities.
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