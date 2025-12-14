import React from 'react';
import { Music, Users, ArrowRight, Star } from 'lucide-react';

const ActivitiesPage: React.FC = () => {

  const galleryImages = [
    { src: "images/activities/pic1.jpg", title: "Instrumental" },
    { src: "images/activities/pic2.jpg", title: "Vocal Training" },
    { src: "images/activities/pic5.jpg", title: "Ensemble" },
    { src: "images/activities/pic6.jpg", title: "Theory" }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[250px] flex items-center justify-center bg-blue-950 text-white overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[10%] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-800/50 border border-blue-700 backdrop-blur-sm text-blue-200 text-xs font-bold uppercase tracking-widest">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              Excellence in Arts
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight tracking-tight text-white drop-shadow-sm">
            Co-curricular <span className="italic font-light text-blue-200">Activities</span>
          </h1>

          <p className="max-w-2xl mx-auto text-blue-100 text-lg md:text-xl leading-relaxed font-light mb-10">
            We believe education extends beyond the classroom. Through music, performance, and creative arts, we nurture the spirit and confidence of every student.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="bg-white relative z-10 -mt-10 rounded-t-[3rem] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)] pt-20 pb-16">

        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">

          {/* Item 1: Music */}
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-center">
            {/* Image Side */}
            <div className="lg:col-span-7 order-2 lg:order-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10">
                <img
                  src="images/activities/main.jpg"
                  alt="Music Class"
                  className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                    <Music size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Department</p>
                    <p className="text-blue-900 font-serif font-bold">Music Theory</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-2 block"> mentorship</span>
              <h2 className="text-4xl font-serif font-bold text-blue-950 mb-6">Music</h2>
              <div className="w-12 h-1 bg-blue-200 mb-6"></div>
              <p className="text-slate-600 leading-8 mb-6 text-lg">
                Sacred Heart is very proud to have <strong className="text-blue-900">Mr. Mthobisi Mthalane</strong> as our full-time music teacher.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                Mr. Mthalane brings world-class experience, having collaborated with high-profile artists such as Dorothy Masuku, Camagwini, and the Jazel brothers. His industry insight bridges the gap between academic theory and professional performance.
              </p>
            </div>
          </div>

          {/* Item 2: Choir */}
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-center">
            {/* Text Side */}
            <div className="lg:col-span-5">
              <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-2 block">Community</span>
              <h2 className="text-4xl font-serif font-bold text-blue-950 mb-6">School Choir</h2>
              <div className="w-12 h-1 bg-blue-200 mb-6"></div>
              <p className="text-slate-600 leading-8 mb-6 text-lg">
                Our voice is our strength. With a low student-to-teacher ratio, every voice is heard and refined.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                Teachers work closely with students to identify their vocal strengths, offering personalized support that helps them reach their full potential. The choir is more than singing; it is about discipline, harmony, and collective achievement.
              </p>
              <button className="flex items-center gap-2 text-blue-700 font-semibold hover:gap-3 transition-all text-sm uppercase tracking-wide">
                Audition Details <ArrowRight size={16} />
              </button>
            </div>

            {/* Image Side */}
            <div className="lg:col-span-7 relative">
              <div className="absolute top-0 right-0 w-full h-full bg-blue-50 rounded-2xl transform translate-x-4 translate-y-4"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10">
                <img
                  src="images/activities/choir.jpg"
                  alt="School Choir"
                  className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-3 rounded-full text-blue-600">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Activity</p>
                    <p className="text-blue-900 font-serif font-bold">Vocal Ensemble</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Item 3: Performing Arts */}
          <div className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Side */}
            <div className="lg:col-span-7 order-2 lg:order-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10">
                <img
                  src="images/activities/pic7.jpg"
                  alt="Performing Arts"
                  className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
              </div>
            </div>

            {/* Text Side */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-2 block">Expression</span>
              <h2 className="text-4xl font-serif font-bold text-blue-950 mb-6">Performing Arts</h2>
              <div className="w-12 h-1 bg-blue-200 mb-6"></div>
              <p className="text-slate-600 leading-8 mb-6 text-lg">
                The stage is a classroom for confidence.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                With professionals on board, we take pride in training our students in dance, drama, and painting. We organize exhibitions, concerts, and musical events to encourage our students to own their talent and flourish.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h6 className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-3">Visual Tour</h6>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-blue-950 mb-4">
              Music on Thursday
            </h3>
            <p className="text-slate-500">
              A glimpse into the weekly sessions with Mr. Mthalane and Mr. Ndebele.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((item, index) => (
              <div key={index} className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 bg-white">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-blue-200 text-xs font-medium uppercase tracking-wider mb-1">Gallery</span>
                  <span className="text-white font-serif font-bold text-lg">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 skew-x-12 transform origin-top-right"></div>

        <div className="container mx-auto px-6 sm:px-8 max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-serif font-bold text-blue-950">Featured Performance</h3>
              <p className="text-slate-500 mt-2">Experience the energy of our annual showcase.</p>
            </div>
          </div>

          <div className="relative bg-slate-900 rounded-2xl overflow-hidden w-full aspect-video shadow-2xl border-4 border-white ring-1 ring-slate-200">
            <video className="w-full h-full object-cover" controls>
              <source src="images/activities/vid.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;