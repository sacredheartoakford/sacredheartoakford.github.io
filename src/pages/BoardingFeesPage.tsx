import React from 'react';

const BoardingFeesPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Title / Hero Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#26262c] relative z-10">
              Payment
            </h1>
            {/* Decorative pattern image - using a placeholder */}
            <div className="absolute -top-12 -left-24 w-48 h-48 bg-gray-200 opacity-20 rounded-full z-0"></div>
          </div>
        </div>
      </section>

      {/* Boarding Fees 2024 Intro */}
      <section className="py-10 bg-[#f6f7fd]">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#26262c] mb-4">Boarding Fees 2024</h2>
            <h6 className="text-lg md:text-xl text-[#76767f]">Choice Of Payment Plans</h6>
          </div>
        </div>
      </section>

      {/* Pricing Grid Section */}
      <section className="py-16 bg-[#f6f7fd]">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1: Grade 8-11 */}
            <div className="bg-white p-8">
              <h5 className="text-2xl font-serif font-bold text-[#26262c] mb-6 text-center">GRADE 8-11</h5>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-[#76767f] underline">Annual</span>
                  <span className="font-bold text-[#26262c]">R 35 000</span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-[#76767f] underline">Quarterly</span>
                  <span className="font-bold text-[#26262c]">R 8 750</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#76767f] underline">12 Monthly</span>
                  <span className="font-bold text-[#26262c]">R 3 181</span>
                </div>
              </div>
            </div>
            
            {/* Column 2: Grade 12 with background image effect */}
            <div 
              className="bg-white p-8 relative overflow-hidden"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-white bg-opacity-90"></div>
              <div className="relative z-10">
                <h5 className="text-2xl font-serif font-bold text-[#26262c] mb-6 text-center">GRADE 12</h5>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-[#76767f] underline font-bold">Annual (Discounted Amount)</span>
                    <span className="font-bold text-[#26262c]">R 32 000</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[#76767f] underline font-bold">12 Monthly</span>
                    <span className="font-bold text-[#26262c]">R 2000potential.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote / Call to Action Section */}
      <section 
        className="py-24 relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1543269865-cbf40ce683ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#11202A] to-[#26262c] opacity-70"></div>
        
        <div className="container mx-auto px-6 sm:px-8 max-w-4xl relative z-10">
          <blockquote className="text-2xl md:text-3xl font-serif text-white text-left italic mb-6">
            "If you think education is expensive, try ignorance."
          </blockquote>
          <p className="text-xl text-white text-right">N.A Khumalo</p>
        </div>
      </section>
    </div>
  );
};

export default BoardingFeesPage;