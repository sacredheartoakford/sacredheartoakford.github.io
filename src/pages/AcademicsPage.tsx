import React from 'react';
import MetaTags from '../components/MetaTags';
import EducationalInstitutionSchema from '../components/EducationalInstitutionSchema';

const departments = [
  {
    name: 'Science',
    image: '/images/homepage/science.avif',
    alt: 'Learners working in the science laboratory',
    blurb: 'Hands-on labs that encourage reasoning, discovery and invention in Physical and Life Science.',
    tag: 'Science',
  },
  {
    name: 'Mathematics',
    image: '/images/homepage/maths.avif',
    alt: 'Learner working through mathematics problems',
    blurb: 'Understanding the game of numbers and logic to solve real world problems.',
    tag: 'Maths',
  },
  {
    name: 'Computer Application Technology',
    image: '/images/homepage/computerlap.avif',
    alt: 'Learners at computers in the computer lab',
    blurb: 'Hands-on experience with the latest computer applications and technology.',
    tag: 'CAT & IT',
  },
  {
    name: 'Accounting',
    image: '/images/homepage/accounting.avif',
    alt: 'Learner studying accounting',
    blurb: 'Empowering financial mastery. Unlock the power of numbers and finance.',
    tag: 'Business',
  },
  {
    name: 'Business Studies',
    image: '/images/homepage/business studies.avif',
    alt: 'Learners learning business studies concepts',
    blurb: 'Unleashing entrepreneurial potential through real world business scenarios.',
    tag: 'Business',
  },
  {
    name: 'Humanities',
    image: '/images/homepage/humanities.avif',
    alt: 'Learner reading in the library',
    blurb: 'The study of ancient and modern languages, philosophy and history.',
    tag: 'Humanities',
  },
  {
    name: 'Agricultural Science',
    image: '/images/homepage/agriculture.avif',
    alt: 'Learner in the agricultural science field with plants and farming equipment',
    blurb: 'Unravel the mysteries of life and growth in the field and the lab.',
    tag: 'Agriculture',
  },
  {
    name: 'Drama and Music',
    image: '/images/homepage/drama.avif',
    alt: 'Learners performing in drama and music',
    blurb: 'We believe in the power of the arts to inspire. Music, drama and cultural performance form part of the curriculum.',
    tag: 'Arts',
  },
];

const matricResults = [
  { year: '2021', rate: 74 },
  { year: '2022', rate: 78 },
  { year: '2023', rate: 84 },
  { year: '2024', rate: 90 },
  { year: '2025', rate: 99 },
];

const collegePathways = [
  {
    title: 'University Degrees',
    description:
      'Learners progress to degree programmes in science, engineering, commerce, humanities and the arts, with our matric results opening doors to both public and private universities.',
  },
  {
    title: 'TVET Colleges',
    description:
      'For learners aiming for trade and vocational qualifications, we prepare students for National NQF programmes at TVET colleges across the country.',
  },
  {
    title: 'Apprenticeships',
    description:
      'Our Agricultural Science, CAT and Business Studies streams feed directly into industry apprenticeships in agri-business, IT and the corporate sector.',
  },
  {
    title: 'Further Education & Training',
    description:
      'Beyond formal institutions, learners join mentorship, internship and skills programmes that build the foundations for lifelong careers.',
  },
];

const timeline = [
  {
    year: '1886',
    title: 'Founding',
    text: 'Sacred Heart forms part of a Roman Catholic Mission school serving local primary school children.',
  },
  {
    year: '1903',
    title: 'St. Mary’s Established',
    text: 'The Dominican Sisters of Oakford establish St. Mary’s, a separate girls’ school, on the same estate.',
  },
  {
    year: '1980',
    title: 'Relocation to St. Mary’s',
    text: 'Sacred Heart Secondary School for African girls is relocated to the St. Mary’s premises, where it continues to operate.',
  },
  {
    year: '1982',
    title: 'Handover to the State',
    text: 'The Dominican Sisters hand management of the school to the Department of Education.',
  },
  {
    year: '2000',
    title: 'Formal Transition',
    text: 'A formal transition agreement between the school and the Department of Education is signed.',
  },
  {
    year: 'Today',
    title: 'Oakford Priory',
    text: 'A girls’ boarding school at historic Oakford Priory, about 40 km north of Durban, serving Grades 8–12.',
  },
];

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

      {/* Hero */}
      <section className="relative bg-[#0f1029] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#26217a] to-[#4747d7] opacity-90"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/images/students/hero.avif')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1029]/80 via-transparent to-transparent"></div>
        <div className="relative container mx-auto px-6 sm:px-8 max-w-6xl py-20 md:py-28">
          <h6 className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-200 mb-4">
            Sacred Heart Secondary
          </h6>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Academics built on a legacy since 1886
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
            A broad, balanced curriculum that prepares girls for university, trade and life,
            grounded in the values of Oakford Priory.
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">730</div>
              <div className="text-sm text-blue-200 mt-1">Learners enrolled</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">99%</div>
              <div className="text-sm text-blue-200 mt-1">Matric pass 2025</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">Gr. 8–12</div>
              <div className="text-sm text-blue-200 mt-1">Girls’ boarding school</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl font-bold">140+</div>
              <div className="text-sm text-blue-200 mt-1">Years of learning</div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-16 bg-[#f6f7fd]">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <h6 className="text-lg font-medium text-[#26262c] mb-2">Our Curriculum</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-[#26262c] mb-6">A Commitment to Excellence</h2>
          <div className="w-16 h-1 bg-[#4747d7] mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-[#76767f]">
                <span className="float-left text-7xl font-bold text-[#4747d7] mr-3 leading-none">S</span>
                acred Heart Secondary offers all our students a broad and balanced curriculum that
                provides rewarding and stimulating activities to prepare them for the best social
                and cultural life.
              </p>
            </div>
            <div>
              <p className="text-[#76767f]">
                Whether it is our books or hands-on training, we make sure each student gets
                personal attention to keep up and flourish in every subject, for better scores
                and a brighter future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Matric Results */}
      <section className="py-16 bg-gradient-to-br from-[#26217a] via-[#3b32a3] to-[#4747d7] text-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h6 className="text-lg font-medium text-blue-200 mb-2">Outstanding Matric Results</h6>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Five Years of Consistent Growth</h2>
              <p className="text-blue-100 mb-6 max-w-md">
                From 74% in 2021 to 99% in 2025, our matric pass rate has risen every year.
                These results reflect the commitment of our students and teachers.
              </p>
              <div className="flex items-end gap-3 text-xs text-blue-200">
                <span>2021</span>
                <span className="text-2xl font-bold text-white">74%</span>
                <span className="text-xl">→</span>
                <span>2025</span>
                <span className="text-2xl font-bold text-yellow-300">99%</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl p-6 md:p-8">
              <div className="space-y-4">
                {matricResults.map((row) => (
                  <div key={row.year}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{row.year}</span>
                      <span className="font-bold text-lg">{row.rate}%</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400"
                        style={{ width: `${row.rate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold">2026 Target</span>
                    <span className="font-bold text-lg text-yellow-300">100%</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-yellow-300 to-yellow-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Growth */}
      <section className="py-16 bg-[#f6f7fd]">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h6 className="text-lg font-medium text-[#26262c] mb-2">A School That Is Growing</h6>
              <h2 className="text-3xl md:text-4xl font-bold text-[#26262c] mb-6">
                From 350 to 730 Learners
              </h2>
              <p className="text-[#76767f] mb-4">
                Since 2021, enrollment at Sacred Heart Secondary School has more than doubled,
                from approximately 350 learners to around 730. This growth reflects the
                confidence that families, alumni and the community place in the school.
              </p>
              <p className="text-[#76767f]">
                Academic focus areas include Mathematics, Physical Sciences, English, Music,
                Art and Culture, CAT and IT, Agriculture and Accounting. A developing swimming
                programme is also creating pathways for learners to compete at higher levels.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-[#4747d7]">730</div>
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

      {/* History Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h6 className="text-lg font-medium text-[#26262c] mb-2">Our Story</h6>
            <h2 className="text-3xl md:text-4xl font-bold text-[#26262c] mb-4">A Legacy Since 1886</h2>
            <div className="w-16 h-1 bg-[#4747d7] mx-auto"></div>
          </div>

          <ol className="relative border-l-2 border-[#4747d7]/30 ml-4 max-w-3xl mx-auto">
            {timeline.map((item) => (
              <li key={item.year} className="mb-8 ml-8 last:mb-0">
                <span className="absolute -left-2 flex h-4 w-4 rounded-full bg-white border-4 border-[#4747d7]"></span>
                <h3 className="text-xl font-bold text-[#26262c]">
                  <span className="text-[#4747d7] font-mono mr-3">{item.year}</span>
                  {item.title}
                </h3>
                <p className="mt-2 text-[#76767f] leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-[#f6f7fd]">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="text-center mb-10">
            <h6 className="text-lg font-medium text-[#26262c] mb-2">Our Departments</h6>
            <h2 className="text-3xl md:text-4xl font-bold text-[#26262c]">Where Learning Happens</h2>
            <div className="w-16 h-1 bg-[#4747d7] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((d) => (
              <div
                key={d.name}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#4747d7] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {d.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#26262c] mb-2">{d.name}</h3>
                  <p className="text-[#76767f]">{d.blurb}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white rounded-lg shadow-md p-6 md:p-8 border-l-4 border-[#4747d7]">
            <h3 className="text-lg font-bold text-[#26262c] mb-2">
              Electrical Engineering (coming soon)
            </h3>
            <p className="text-[#76767f]">
              Ever wondered how electricity flows? Our next addition to the curriculum will
              open the door to the world of circuits, power and design.
            </p>
          </div>
        </div>
      </section>

      {/* College Opportunities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h6 className="text-lg font-medium text-[#26262c] mb-2">Beyond Matric</h6>
            <h2 className="text-3xl md:text-4xl font-bold text-[#26262c]">College Opportunities</h2>
            <div className="w-16 h-1 bg-[#4747d7] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collegePathways.map((p, i) => (
              <div
                key={p.title}
                className="bg-gradient-to-br from-[#f6f7fd] to-white rounded-lg p-6 border border-[#e5e6f5] hover:border-[#4747d7]/40 transition-colors"
              >
                <div className="text-4xl font-bold text-[#4747d7]/30 mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-bold text-[#26262c] mb-3">{p.title}</h3>
                <p className="text-[#76767f] leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-[#76767f] max-w-3xl mx-auto italic">
            Education at Sacred Heart extends beyond the classroom. We prepare learners for
            academic, cultural, artistic, sporting and leadership opportunities at every level.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 bg-gradient-to-r from-[#4747d7] to-[#6e71e4] text-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to join us?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Applications are open for the next academic year. Speak to our admissions office
            to find out more about our programmes and boarding life.
          </p>
          <a
            href="/#/apply"
            className="inline-block bg-white text-[#4747d7] font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
          >
            Start Your Application
          </a>
        </div>
      </section>
    </div>
  );
};

export default AcademicsPage;
