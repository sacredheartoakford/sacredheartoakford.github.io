import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Tent, Camera } from 'lucide-react';
import MetaTags from '../components/MetaTags';
import EducationalInstitutionSchema from '../components/EducationalInstitutionSchema';


const StudentsPage: React.FC = () => {
  const [bootCampIndex, setBootCampIndex] = useState(0);
  const bootCampImages = Array.from({ length: 13 }, (_, i) => `/images/students/camp/pic${i + 1}.jpg`);

  // State for Matric Camp Carousel
  const [matricCampIndex, setMatricCampIndex] = useState<number>(0);
  const matricCampImages: string[] = Array.from({ length: 10 }, (_, i) => `/images/students/2026Camp/pic${i + 1}.jpg`);

  const nextSlide = (setIndex: React.Dispatch<React.SetStateAction<number>>, total: number) => {
    setIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = (setIndex: React.Dispatch<React.SetStateAction<number>>, total: number) => {
    setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };


  return (
    <div className="bg-[#f6f7fd] min-h-screen">
      <MetaTags
        title="Our Students - Sacred Heart Secondary School"
        description="Discover student life at Sacred Heart Secondary School. Learn about our academic programs, extracurricular activities, boot camps, and matric preparation."
        keywords={['school', 'education', 'secondary school', 'south africa', 'students', 'student life', 'academic programs', 'extracurricular', 'matric camp', 'student development']}
        url="/students"
      />
      <EducationalInstitutionSchema pageType="students" />
      {/* Hero / Intro Section */}
      <section
        className="py-16 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/students/hero.jpg')`,
          backgroundPosition: 'top',
        }}
      >
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl relative z-10">
          <div className="text-center mb-12 text-white">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Students</h2>
            <div className="w-24 h-1.5 bg-[#4747d7] mx-auto mb-8 rounded-full"></div>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl italic leading-relaxed font-light opacity-90">
                "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.
                Winners are not those who never fail, but those who never quit."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Life Description & Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#26262c] mb-5">Students</h2>
            <div className="w-24 h-1 bg-[#4747d7] mx-auto mb-8"></div>
            <p className="text-[#76767f] max-w-4xl mx-auto text-lg leading-relaxed">
              At Sacred Heart Secondary School, we believe in fostering an environment where students can take ownership of their learning,
              develop curiosity, and feel empowered to reach their full potential. Our students are encouraged to explore their passions,
              challenge themselves academically, and grow as individuals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[1, 2, 3, 4].map((num) => (
              <div className="group relative overflow-hidden rounded-xl shadow-lg h-64 cursor-pointer">
                <img
                  src={`/images/students/student${num}.jpg`}
                  alt={`Sacred Heart Secondary School student ${num}`}
                  className="object-cover w-full h-full block transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  {/* <span className="text-white font-medium flex items-center gap-2"><Users size={18}/> Group Photo</span> */}
                </div>
              </div>
            ))}



          </div>
        </div>
      </section>

      {/* Adventure Section */}
      <section className="py-20 bg-[#f6f7fd]">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="flex items-center mb-12">
            <div className="h-0.5 bg-gray-300 flex-grow"></div>
            <div className="mx-6 px-6 py-2 border-2 border-[#4747d7] text-[#4747d7] rounded-full font-bold uppercase tracking-wider text-sm">
              Adventure & Growth
            </div>
            <div className="h-0.5 bg-gray-300 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl font-serif font-bold text-[#26262c] mb-6 flex items-center gap-3">
                <span className="bg-[#4747d7] text-white p-2 rounded-lg"><Tent size={24} /></span>
                Boot Camp
              </h3>
              <p className="text-[#76767f] mb-6 text-lg leading-relaxed">
                Our strong academic and extracurricular programs are complemented by educational boot camps that challenge students
                to push their boundaries. These intensive learning experiences help students develop resilience, teamwork, and leadership skills.
              </p>
              <p className="text-[#76767f] text-lg leading-relaxed">
                Through these programs, students gain valuable life skills and create lasting memories that shape their character and future success.
              </p>
            </div>

            {/* Boot Camp Carousel */}
            <div className="order-1 lg:order-2 relative bg-gray-100 rounded-xl overflow-hidden shadow-xl h-96 group">
              <img
                src={bootCampImages[bootCampIndex]}
                alt="Camping"
                className="w-full h-full object-cover transition-opacity duration-500"
              />

              {/* Carousel Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => prevSlide(setBootCampIndex, bootCampImages.length)}
                  className="bg-white/80 p-2 rounded-full hover:bg-white text-gray-800 transition-colors shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => nextSlide(setBootCampIndex, bootCampImages.length)}
                  className="bg-white/80 p-2 rounded-full hover:bg-white text-gray-800 transition-colors shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {bootCampImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${idx === bootCampIndex ? 'bg-white' : 'bg-white/50'}`}
                  ></div>
                ))}
              </div>

              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm flex items-center gap-2">
                <Camera size={12} /> {bootCampIndex + 1} / {bootCampImages.length}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 Matric Camp Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <div className="w-full h-px bg-gray-200 mb-8 relative">
              <div className="absolute left-1/2 -translate-x-1/2 -top-4 bg-white px-4">
                <Users size={32} className="text-[#4747d7]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Matric Camp Carousel */}
            <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-xl h-80 group">
              <img
                src={matricCampImages[matricCampIndex]}
                alt="2026 Matric Camp"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => prevSlide(setMatricCampIndex, matricCampImages.length)}
                  className="bg-white/80 p-2 rounded-full hover:bg-white text-gray-800 transition-colors shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => nextSlide(setMatricCampIndex, matricCampImages.length)}
                  className="bg-white/80 p-2 rounded-full hover:bg-white text-gray-800 transition-colors shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Dots for Matric Camp */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {matricCampImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${idx === matricCampIndex ? 'bg-white' : 'bg-white/50'}`}
                  ></div>
                ))}
              </div>

              <div className="absolute top-4 left-4 bg-[#4747d7] text-white px-3 py-1 rounded text-xs font-bold shadow-lg">
                MATRIC CAMP 2026
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-serif font-bold text-[#26262c] mb-6">2026 Matric Camp</h3>
              <p className="text-[#76767f] mb-6 text-lg leading-relaxed">
                Our Grade 12 learners participate in an intensive matric camp designed to prepare them for the challenges ahead.
                This camp focuses on academic excellence, personal growth, and building the resilience needed for their final year.
              </p>
              <p className="text-[#76767f] text-lg leading-relaxed border-l-4 border-[#4747d7] pl-4">
                "The matric camp experience empowers our learners with the confidence, discipline, and determination to excel in their final examinations and beyond."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
};

export default StudentsPage;