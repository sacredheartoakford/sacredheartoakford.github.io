import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, buttonText, onButtonClick }) => {
  return (
    <div className="relative bg-gray-900 h-96 md:h-[500px] flex items-center">
      <div className="absolute inset-0 bg-gray-800 opacity-70"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-xl text-[#bfd1ff] mb-8">{subtitle}</p>
          {buttonText && onButtonClick && (
            <button 
              onClick={onButtonClick}
              className="bg-[#4747d7] hover:bg-[#3a3ac5] text-white font-medium py-3 px-8 rounded-lg transition duration-300"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;