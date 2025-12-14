import React from 'react';
import { Coffee, Utensils, Clock } from 'lucide-react';

const KitchenPage: React.FC = () => {

  const MenuRow = ({ title, time, icon, items, theme, imgSrc }: any) => {
    // Theme configurations for colors
    const themes: any = {
      amber: 'bg-amber-50 text-amber-600 border-amber-100',
      orange: 'bg-orange-50 text-orange-600 border-orange-100',
      emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    };

    const activeClass = themes[theme] || themes.indigo;

    return (
      <div className="group relative bg-white rounded-3xl p-2 md:p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-4 z-10 relative">

          {/* Image thumb */}
          <div className="hidden md:block shrink-0">
            <img src={imgSrc} alt={title} className="w-24 h-24 rounded-2xl object-cover shadow-sm group-hover:scale-110 transition-transform duration-500" />
          </div>

          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${activeClass} transition-colors`}>
                  {icon}
                </div>
                <h4 className="text-xl font-bold text-slate-800">{title}</h4>
              </div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 uppercase tracking-wide">
                <Clock size={14} className="text-[#4747d7]" />
                {time}
              </div>
            </div>

            <div className="md:pl-[4.5rem]">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {items.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4747d7] opacity-60"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Subtle background color on hover */}
        <div className={`absolute inset-0 ${activeClass.split(' ')[0]} opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0`}></div>
      </div>
    );
  };

  // const TeamCard = ({ name, role, imgSrc }: { name: string; role: string; imgSrc: string }) => (
  //   <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group border border-slate-100/50">
  //     <div className="w-full h-80 overflow-hidden relative bg-slate-100">
  //       <div className="absolute inset-0 bg-gradient-to-t from-[#4747d7] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10 flex flex-col justify-end p-6">
  //         <p className="text-white font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Connect on LinkedIn</p>
  //       </div>
  //       <img src={imgSrc} alt={name} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
  //     </div>
  //     <div className="p-6 text-center bg-white relative z-20">
  //       <h3 className="text-xl font-bold text-slate-800">{name}</h3>
  //       <p className="text-[#4747d7] font-semibold text-xs mt-2 uppercase tracking-widest border-t border-slate-100 pt-3 inline-block">{role}</p>
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Gradient Blue */}
      <section className="py-20 md:py-15 min-h-[150px] bg-gradient-to-br from-[#4747d7] to-[#3232a8] text-white relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white opacity-[0.07] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-80 h-80 bg-blue-400 opacity-[0.15] rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 sm:px-8 max-w-6xl relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-100 text-sm font-semibold mb-6 backdrop-blur-sm">
              Premium Institutional Catering
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1]">
              The Kitchen<span className="text-blue-300">.</span>
            </h1>
            <p className="text-blue-50/90 text-lg md:text-2xl font-normal leading-relaxed max-w-2xl border-l-4 border-blue-400 pl-6">
              Nourishing minds and bodies with nutritious, cost-effective meals designed specifically for schools and residential institutions.
            </p>
          </div>
        </div>
      </section>

      {/* Intro / "Sumptuous Kitchen" Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Text */}
            <div>
              <div className="w-24 h-16 mb-4 flex items-center justify-center">
                <img src="/images/kitchen/pic192.png" alt="parcelli" className="max-w-full max-h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-[#26262c] mb-4">Sumptuous Kitchen at Sacred Heart Secondary School</h3>
              <p className="text-[#76767f]">
                Sumptuous caters for youth in schools, colleges and residential universities. These ages usually range from 5-25 years old. We have a responsibility to build a strong and healthy population. When creating a menu for an institutional facility / hostel, the following points must be kept in mind. Sumptuous offers meals that are cost effective, quality services to those in the industrial, commercial and institutional sectors.
              </p>
            </div>

            {/* Column 2: Image */}
            <div>
              <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-2xl">
                <img src="/images/kitchen/food1.jpg" alt="pic1" className="w-full h-full object-cover align-middle" />
              </div>
            </div>

            {/* Column 3: Images (Hidden on Mobile/Tablet) */}
            <div className="hidden md:block">
              <div className="grid grid-cols-1 gap-6">
                <div className="relative w-full h-40 overflow-hidden rounded-2xl">
                  <img src="/images/kitchen/food2.jpg" alt="pic2" className="w-full h-full object-cover" />
                </div>
                <div className="relative w-full h-40 overflow-hidden rounded-2xl">
                  <img src="/images/kitchen/food3.jpg" alt="pic3" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menus Section - White with Modern Cards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Daily Nutrition Plan</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#4747d7] to-blue-400 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 max-w-2xl mx-auto text-xl font-light">
              Balanced menus featuring local favorites to keep students energetic, focused, and healthy throughout the academic day.
            </p>
          </div>

          <div className="space-y-6">
            {/* Breakfast */}
            <MenuRow
              title="Breakfast"
              time="6:00am - 6:30am"
              icon={<Coffee size={24} />}
              items={["Hot Sorghum Porridge / Oats", "Fresh Milk & Brown Sugar", "Whole Grain Bread"]}
              theme="amber"
              imgSrc="https://images.unsplash.com/photo-1538220856186-0be0e085984d?auto=format&fit=crop&w=300&q=80"
            />

            {/* AM Tea */}
            <MenuRow
              title="Mid-Morning Tea"
              time="11:00am - 11:30am"
              icon={<Coffee size={24} />}
              items={["Rooibos Tea or Juice", "Seasonal Fruit (Apples/Bananas)", "Scones or Muffins"]}
              theme="orange"
              imgSrc="https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=300&q=80"

            />

            {/* Lunch */}
            <MenuRow
              title="Lunch"
              time="14:30pm - 15:00pm"
              icon={<Utensils size={24} />}
              items={["Grilled Chicken & Rice", "Beef Stew with Samp & Beans", "Steam Mixed Vegetables"]}
              theme="emerald"
              imgSrc="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=300&q=80"
            />

            {/* Supper */}
            <MenuRow
              title="Supper"
              time="17:00pm - 17:30pm"
              icon={<Utensils size={24} />}
              items={["Phuthu & Maas (Amasi)", "Lean Protein Stew", "Coleslaw & Beetroot Salad"]}
              theme="indigo"
              imgSrc="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80"
            />
          </div>
        </div>
      </section>

      {/* "Our Team" Section */}
      <section className="py-16 bg-[#f6f7fd]">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#26262c] text-center mb-6">Our Team</h2>
          <div className="w-64 h-1 bg-[#4747d7] mx-auto mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Sibonelo Mlangeni */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48">
                <img src="/images/kitchen/mlangeni.jpg" alt="Sibonelo Mlangeni" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#26262c]">Sibonelo Mlangeni</h3>
                <p className="text-[#4747d7]">Director</p>
              </div>
            </div>

            {/* Card 2: Alfred Peta */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48">
                <img src="/images/kitchen/peta.jpg" alt="Alfred Peta" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#26262c]">Alfred Peta</h3>
                <p className="text-[#4747d7]">Area Manager</p>
              </div>
            </div>

            {/* Card 3: Nkosiyavuma Ndebele */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48">
                <img src="/images/kitchen/ndebele.jpg" alt="Alfred Peta" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#26262c]">Nkosiyavuma Ndebele</h3>
                <p className="text-[#4747d7]">Catering Manager</p>
              </div>
            </div>

            {/* Card 4: Bongiwe Khanyile */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48">
                <img src="/images/kitchen/bongiwe.jpg" alt="Bongiwe Khanyile" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#26262c]">Bongiwe Khanyile</h3>
                <p className="text-[#4747d7]">Head Chef</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default KitchenPage;