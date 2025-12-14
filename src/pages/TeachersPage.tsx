import { useState } from 'react';
import { Star, User, Quote } from 'lucide-react';
import ResponsiveImage from '../components/ResponsiveImage';

// Interface for ProfileImage props
interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

// Reusable Image Component with Fallback and lazy loading
const ProfileImage = ({ src, alt, className }: ProfileImageProps) => {
  const [error] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-blue-50 text-blue-300 ${className}`}>
        <User size={48} />
      </div>
    );
  }

  return (
    <ResponsiveImage
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

const TeachersPage = () => {
  // Teachers data
  const teachers = [
    { id: 1, name: 'Mr NA Khumalo', subject: 'CAT', photo: 'khumalo' },
    { id: 2, name: 'Miss T Mngadi', subject: 'Mathematics', photo: 'mngadi' },
    { id: 3, name: 'Ms NS Ndlovu', subject: 'Life Sciences', photo: 'ns_ndlovu' },
    { id: 4, name: 'Miss NP Luthuli', subject: 'Physical Science', photo: 'luthuli' },
    { id: 5, name: 'Miss T Mazibuko', subject: 'Tourism', photo: 'mazibuko' },
    { id: 6, name: 'Miss TL Mvubu', subject: 'IsiZulu', photo: 'mvubu' },
    { id: 7, name: 'Miss TN Shozi', subject: 'Business Studies', photo: 'shozi' },
    { id: 8, name: 'Miss HP Ndlovu', subject: 'IsiZulu', photo: 'ndlovu' },
    { id: 9, name: 'Miss TH Msomi', subject: 'Geography', photo: 'msomi' },
    { id: 10, name: 'Miss NP Zulu', subject: 'Agriculture', photo: 'zulu' },
    { id: 11, name: 'Miss MA ndlovu', subject: 'IsiZulu', photo: 'ma_ndlovu' },
    { id: 12, name: 'Mrs BG Makhanya', subject: 'Life Orientation', photo: 'makhanya' },
    { id: 13, name: 'Mr M Mthalane', subject: 'Music', photo: 'mthalane' },
    { id: 14, name: 'Mr Mthethwa', subject: 'Isizulu', photo: 'mthethwa' },
    { id: 15, name: 'Miss Kheswa', subject: 'English & History', photo: 'kheswa' },
    { id: 16, name: 'Miss TC Simon', subject: 'English', photo: 'simon' },
    { id: 17, name: 'Mr S Ndlovu', subject: 'Mathematics & N.S', photo: 's_ndlovu' },
    { id: 18, name: 'Miss A Mzobe', subject: 'Business Studies', photo: 'mzobe' },
    { id: 19, name: 'Miss Miya', subject: 'Drama', photo: 'miya' },
    { id: 20, name: 'Miss T Ngidi', subject: 'Clerk', photo: 'ngidi' },
    { id: 22, name: 'Mr. Malinga', subject: 'Lithographic Operator', photo: 'malinga' },
    { id: 23, name: 'Mr. Mhlengi', subject: 'Technician', photo: 'mhlengi' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-slate-800">

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-blue-950 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px]"></div>
          <div className="absolute top-[20%] right-[20%] w-4 h-4 bg-yellow-400 rounded-full blur-[1px] opacity-60"></div>
          <div className="absolute bottom-[30%] left-[10%] w-3 h-3 bg-blue-300 rounded-full blur-[1px] opacity-40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-blue-100 text-xs font-bold uppercase tracking-widest shadow-lg">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              Excellence in Education
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight tracking-tight text-white drop-shadow-lg">
            Our <span className="italic font-light text-blue-300">Dedicated Team</span>
          </h1>

          <p className="max-w-2xl mx-auto text-blue-100/90 text-lg md:text-xl leading-relaxed font-light">
            Behind every student's success is a passionate team of educators and staff.
            We are mentors, innovators, and support systems dedicated to nurturing the spirit and confidence of every learner.
          </p>
        </div>
      </section>

      {/* Principal Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl transform -rotate-2 transition-transform group-hover:-rotate-1"></div>
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl bg-white">
                <ProfileImage src="images/teachers/principal.jpg" alt="Principal" className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <div>
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                School Leadership
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Principal</h3>
              <div className="prose prose-lg text-slate-600 mb-6 leading-relaxed">
                <p>
                  Our dedicated Principal leads Sacred Heart Secondary School with vision, integrity, and a deep commitment to educational excellence.
                  Under their guidance, our school continues to thrive as a nurturing environment for academic and personal growth.
                </p>
                <p>
                  With years of experience in education, our Principal champions innovation, inclusivity, and the holistic development of every learner.
                  Their leadership inspires both staff and students to reach their full potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deputy Principal Section */}
      <section className="py-20 bg-blue-50/50">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                Leadership
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Deputy Principal</h3>
              <div className="prose prose-lg text-slate-600 mb-6 leading-relaxed">
                <p>
                  Meet our dedicated Deputy Principal, <strong>Mrs. NS Goba</strong>, fostering excellence and supporting student success.
                  Our Deputy Principal ensures every student's potential is nurtured. Guiding academic excellence, she leads with passion.
                </p>
                <p>
                  At the heart of our school's success, our Deputy Principal champions innovation and collaboration.
                  Working alongside the principal, she shapes the future of our school.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-2"></div>
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl bg-white">
                  <ProfileImage src="images/teachers/goba.jpg" alt="Mrs. NS Goba" className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOD Science Section */}
      <section className="py-20 bg-blue-50/50">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-l from-blue-100 to-indigo-100 rounded-2xl transform -rotate-2 transition-transform group-hover:-rotate-1"></div>
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl bg-white">
                <ProfileImage src="images/teachers/mtshali.jpg" alt="Miss. NC Mtshali" className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <div>
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
                Department Head
              </div>
              <h4 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">HOD of Science</h4>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                <strong>Miss. NC Mtshali</strong>, our Head of the Science Department, is a dedicated educator with over a decade of experience.
                Her leadership fosters a collaborative learning environment.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Miss Mtshali's passion for science and her warm, approachable nature inspire both students and staff to explore the wonders of the physical world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOD Language Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
                Department Head
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">HOD Language</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                <strong>Mr. SMN Mkhize</strong>, our Head of the Language Department, brings over fifteen years of experience. He is celebrated for his innovative teaching techniques.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Known for his approachable demeanor, Mr. Mkhize inspires both students and colleagues to embrace the power of communication and literature.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl transform rotate-2 transition-transform group-hover:rotate-1"></div>
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl bg-white">
                  <ProfileImage src="images/teachers/mkhize.jpg" alt="Mr. SMN Mkhize" className="w-full h-full object-cover object-top" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOD Commerce Section */}
      <section className="py-20 bg-blue-50/50">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-l from-blue-100 to-indigo-100 rounded-2xl transform -rotate-3 transition-transform group-hover:-rotate-2"></div>
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl bg-white">
                <ProfileImage src="images/teachers/vambe.jpg" alt="Mr. Vambe" className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <div>
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
                Department Head
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">HOD Commerce</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                <strong>Mr. Vambe</strong>, our Head of the Commerce Department, brings over a decade of expertise. He is renowned for his innovative teaching methods that connect theoretical concepts to real-world applications.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                His approachable nature and mentorship inspire students and colleagues alike to strive for excellence in the business sciences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro to Grid Section */}
      <section className="pt-24 pb-12 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-4xl text-center">
          <div className="inline-block w-20 h-1.5 bg-blue-600 rounded-full mb-8"></div>
          <h4 className="text-lg font-semibold text-blue-600 uppercase tracking-widest mb-3">Our Community</h4>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-8">Meet The Full Team</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Our educators are not just teachers; they are mentors, role models, and advocates for learning.
            Supported by our efficient admin and technical staff, they create a nurturing environment where every learner has the opportunity to succeed.
          </p>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="pb-24 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {teachers.map(teacher => (
              <div key={teacher.id} className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-64 overflow-hidden bg-slate-100 relative">
                  <ProfileImage
                    src={`images/teachers/${teacher.photo}.jpg`}
                    alt={teacher.name}
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">View Profile</p>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">{teacher.name}</h4>
                  <p className="text-blue-600 font-medium text-sm">{teacher.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-blue-900 text-white relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

        <div className="container relative z-10 mx-auto px-6 sm:px-8 max-w-4xl text-center">
          <Quote size={48} className="mx-auto text-blue-400 mb-8 opacity-80" />
          <blockquote className="text-2xl md:text-4xl font-serif font-medium leading-tight mb-8">
            "Live as if you were to die tomorrow. Learn as if you were to live forever."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-blue-400/50"></div>
            <p className="text-lg font-bold text-blue-200 uppercase tracking-widest">Mahatma Gandhi</p>
            <div className="h-px w-12 bg-blue-400/50"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeachersPage;
