import React from 'react';
import { User } from 'lucide-react';
import { teachersData } from '../data/staff';

const StaffPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#f6f7fd] min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#26262c] mb-8">Our Teachers</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teachersData.map(teacher => (
            <div key={teacher.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#26262c]">{teacher.name}</h3>
                <p className="text-[#4747d7]">{teacher.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffPage;