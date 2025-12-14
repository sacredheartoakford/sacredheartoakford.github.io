import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import ResponsiveImage from '../components/ResponsiveImage';

const SportsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
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
              Sports in Training
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight tracking-tight text-white drop-shadow-lg">
            Unleashing <span className="italic font-light text-blue-300">Potential</span>
          </h1>

          <p className="max-w-2xl mx-auto text-blue-100/90 text-lg md:text-xl leading-relaxed font-light">
            Beyond the classroom, our sports programs build character, resilience, and teamwork.
            We are dedicated to fostering athletic excellence and a lifelong passion for health and fitness in every student.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white" >
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#26262c] mb-6">Sacred Heart Secondary Sport Department</h2>
              <p className="text-[#76767f] font-bold">
                Welcome to our dynamic sports department where physical, mental, and social well-being are at the heart of our program.
                We believe in developing well-rounded individuals through sport and recreation.
              </p>
            </div>
            <div className="text-right lg:text-right">
              <Link
                to="/contact"
                className="inline-flex items-center bg-[#4747d7] hover:bg-[#3a3ac5] text-white font-medium py-3 px-6 rounded-md transition duration-300"
              >
                Make An Enquiry
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Soccer Team Section */}
      <section className="py-16 bg-[#f6f7fd]">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
                <ResponsiveImage src="/images/sports/pic1.jpg" alt="Soccer" loading='lazy' className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#26262c] mb-4">Soccer Team</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-[#26262c]">Our Soccer Program</h4>
                  <p className="text-[#76767f]">
                    Our soccer program is affiliated with the South African Football Association (SAFA) and provides students with
                    professional coaching, competitive matches, and development opportunities.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#26262c]">SAFA Affiliation</h4>
                  <p className="text-[#76767f]">
                    Our affiliation with SAFA ensures our students receive quality training and have access to official tournaments
                    and competitions at various levels.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#26262c]">Girls' Soccer Club Success</h4>
                  <p className="text-[#76767f]">
                    Our girls' soccer club has achieved remarkable success in recent tournaments, demonstrating our commitment to
                    gender equality in sports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section ("Peek Into Our World") */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <h2 className="text-3xl font-bold text-[#26262c] text-center mb-12">Peek Into Our World</h2>

          {/* Placeholder for carousel - actual implementation would use a carousel library */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-200 border-2 border-dashed rounded-lg w-full h-48 flex items-center justify-center">
                {/* <span className="text-gray-500 text-sm">Sport Image {index + 1}</span> */}
                <ResponsiveImage
                  src={`/images/sports/pic${index + 1}.jpg`}
                  alt={`Sport Image ${index + 1}`}
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Swimming Section */}
      <section className="py-16 bg-[#f6f7fd]">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#26262c] mb-4">Upcoming Swimming</h3>
              <p className="text-[#76767f]">
                We are excited to announce the introduction of a swimming program for hostel learners.
                This program will promote fitness, water safety, and provide an additional recreational
                activity for our students.
              </p>
            </div>
            <div>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
                <ResponsiveImage src="/images/sports/swimming.jpg" alt="Swimming" loading='lazy' className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote / Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="text-5xl text-[#76767f] flex justify-center">
              ❝
            </div>
            <div className="text-center">
              <blockquote className="text-lg md:text-xl font-serif italic text-[#26262c]">
                "Through sports, our students learn valuable life skills like perseverance, communication,
                and sportsmanship, preparing them for success in all aspects of life."
              </blockquote>
            </div>
            <div className="text-5xl text-[#76767f] flex justify-center">
              ❞
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SportsPage;