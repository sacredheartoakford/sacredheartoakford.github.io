import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Music, Dumbbell } from 'lucide-react';
import ResponsiveImage from '../components/ResponsiveImage';


// --- Components ---

// Custom Hook for counting up animation
const CountUp = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation (easeOutExpo)
      const easeOut = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

      setCount(Math.floor(easeOut(progress) * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure it ends exactly on the target
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const HomePage: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[590px] flex items-center">
        {/* Background image - replace src with your image path */}
        <div className="absolute inset-0 overflow-hidden">
          <ResponsiveImage
            src="/images/homepage/sacred.jpg"
            alt="Sacred Heart Secondary School"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gray-900/35"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 w-[80%] mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sacred Heart Secondary School</h1>
            <div className="w-20 h-1 bg-[#4747d7] mb-6"></div>
            <p className="text-xl text-[#bfd1ff] mb-8">
              <span className="font-bold">Unlock your child's potential</span> with the world-class education at Sacred Heart Secondary School and Boarding Facility
            </p>
            <Link
              to="/academics"
              className="bg-[#4747d7] hover:bg-[#3a3ac5] text-white font-medium py-2 px-6 rounded-md transition duration-300 inline-block"
            >
              Our Academics
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="w-[80%] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#26262c] mb-4">Learning Begins With Us</h2>
            <div className="w-20 h-1 bg-[#4747d7] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[#76767f] mb-4">
                Our school's safe and supportive environment creates opportunities for each child to grow and learn through play-based exploration. We believe in the power of passion and dedication to learning.
              </p>
              <p className="text-[#76767f]">
                Our programs are designed to meet the needs of each individual child. We provide an environment that encourages children to become confident and capable learners.
              </p>
            </div>
            <div>
              <p className="text-[#76767f] mb-4">
                Sacred Heart Secondary School is an early learning academy with a passion for social-emotional development, literacy, numeracy, and other foundational skills.
              </p>
              <p className="text-[#76767f]">
                We focus on building a strong foundation for lifelong learning through our comprehensive curriculum and dedicated staff.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/staff"
              className="bg-[#4747d7] hover:bg-[#3a3ac5] text-white font-medium py-2 px-6 rounded-md transition duration-300"
            >
              Know More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Strip */}
      <section className="py-16 bg-[#f6f6f6]">
        <div className="w-[90%] md:w-[80%] mx-auto">
          <h6 className="text-center text-lg font-semibold text-[#26262c] mb-12 uppercase tracking-wider">Sacred Heart Secondary School at a Glance</h6>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm md:bg-transparent md:shadow-none">
              <div className="text-4xl md:text-5xl font-bold text-[#4747d7] mb-2">
                <CountUp end={500} suffix="+" />
              </div>
              <p className="text-[#76767f] font-medium">Current Enrollments</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm md:bg-transparent md:shadow-none">
              <div className="text-4xl md:text-5xl font-bold text-[#4747d7] mb-2">
                <CountUp end={27} suffix="+" duration={1500} />
              </div>
              <p className="text-[#76767f] font-medium">Qualified Staff</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm md:bg-transparent md:shadow-none">
              <div className="text-4xl md:text-5xl font-bold text-[#4747d7] mb-2">
                <CountUp end={12} suffix="+" duration={1500} />
              </div>
              <p className="text-[#76767f] font-medium">Clubs & Activities</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm md:bg-transparent md:shadow-none">
              <div className="text-4xl md:text-5xl font-bold text-[#4747d7] mb-2">
                <CountUp end={8} suffix="+" duration={1000} />
              </div>
              <p className="text-[#76767f] font-medium">SGB Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="w-[80%] mx-auto">
          <div className="max-w-4xl mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
            <div className="w-full h-full">
              <video
                src="https://sacredheartoakford.co.za/wp-content/uploads/2024/05/9d9a96ff18f24580a0ea09388b4e4465.mp4"
                poster="https://sacredheartoakford.co.za/wp-content/uploads/2024/05/20240523_163224-scaled.jpg"
                controls={true}
                className="w-full h-full object-cover rounded-xl"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Principal's Address */}
      <section className="py-16 bg-[#f6f6f6]">
        <div className="w-[80%] mx-auto">
          {/* Increased max-width to 6xl to accommodate side-by-side layout */}
          <div className="max-w-6xl mx-auto">

            <h2 className="text-4xl font-caveat font-bold text-[#948f79] mb-12 text-center">
              Principal's Address
            </h2>

            {/* Flex container: Stacked on mobile (flex-col), Side-by-side on desktop (md:flex-row) */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

              {/* LEFT COLUMN: Image & Name */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-72 h-72 flex items-center justify-center overflow-hidden shadow-sm">
                  <ResponsiveImage
                    src="/images/homepage/principal.jpg"
                    alt="Mrs SP Hlongwa, Principal"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="text-center mt-4">
                  <p className="font-semibold text-[#26262c] text-lg">Mrs SP Hlongwa</p>
                  <p className="text-[#76767f]">Principal</p>
                </div>
              </div>

              {/* RIGHT COLUMN: Speech/Text */}
              <div className="relative text-left flex-1">
                <p className="text-[#76767f] italic text-xl mb-6 border-l-4 border-[#948f79] pl-4">
                  "Education is not the learning of fact, but the training of the mind to think" - Albert Einstein
                </p>
                <p className="text-[#76767f] mb-4 text-lg leading-relaxed">
                  Education is a lifelong process and it begins at school. The purpose of education is to open up a closed mind. Every child here at Sacred Heart Secondary school is a unique individual. The staff at SHSS is committed to provide the students with quality education which shapes the children of today into leaders of tomorrow.

                  The school is striving hard to make the best possible effort to inculcate strong values combining with academics and extra-curricula activities. Converting every individual into a self-reliant and independent citizen.

                  I feel proud to express that the school is performing extremely well in all aspect to ensure academic and human excellence with blessings from God. I pray to Almighty that our journey towards excellence continues……………
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-16 bg-white">
        <div className="w-[80%] mx-auto">
          <h2 className="text-3xl font-bold text-[#26262c] text-center mb-12">Curriculum Overview</h2>

          <p className="text-center text-[#76767f] mb-12 max-w-3xl mx-auto">
            Sacred Heart Secondary School offers a broad and balanced curriculum to meet the needs of each individual child. Our programs are designed to encourage children to become confident and capable learners.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#f6f7fd] rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center">
                <ResponsiveImage
                  src="/images/homepage/computerlap.jpg"
                  alt="Computer Application Technology"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#26262c] mb-2">Computer Application Technology</h3>
                <p className="text-[#76767f]">Developing digital literacy and technical skills for the modern world.</p>
              </div>
            </div>

            <div className="bg-[#f6f7fd] rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center">
                <img
                  src="/images/homepage/science.jpg"
                  alt="Physical Science"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#26262c] mb-2">Physical Science</h3>
                <p className="text-[#76767f]">Exploring the natural world through hands-on experiments and discovery.</p>
              </div>
            </div>

            <div className="bg-[#f6f7fd] rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center">
                <img
                  src="/images/homepage/maths.jpg"
                  alt="Mathematics"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#26262c] mb-2">Mathematics</h3>
                <p className="text-[#76767f]">Building logical thinking and problem-solving capabilities.</p>
              </div>
            </div>

            <div className="bg-[#f6f7fd] rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center">
                <img
                  src="/images/homepage/accounting.jpg"
                  alt="Accounting"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#26262c] mb-2">Accounting</h3>
                <p className="text-[#76767f]">Managing financial records and understanding economic principles.</p>
              </div>
            </div>

            <div className="bg-[#f6f7fd] rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center">
                <img
                  src="/images/homepage/humanities.jpg"
                  alt="Humanities"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#26262c] mb-2">Humanities</h3>
                <p className="text-[#76767f]">Understanding history, geography, and social studies.</p>
              </div>
            </div>

            <div className="bg-[#f6f7fd] rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-200 border-2 border-dashed w-full h-48 flex items-center justify-center">
                <img
                  src="/images/homepage/drama.jpg"
                  alt="Drama and Music"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#26262c] mb-2">Drama and Music</h3>
                <p className="text-[#76767f]">Developing performance skills and creative expression.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Co-curricular Activities */}
      <section className="py-16 bg-[#f6f7fd]">
        <div className="w-[80%] mx-auto">
          <h2 className="text-3xl font-bold text-[#26262c] text-center mb-12">Our Co-curricular Activities</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
                <img
                  src="/images/homepage/soccer.jpg"
                  alt="Athletics"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex">
                <div className="mr-4 mt-1">
                  <Dumbbell className="w-6 h-6 text-[#4747d7]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#26262c] mb-2">Athletics</h3>
                  <p className="text-[#76767f]">Our students are passionate about sports and participate in various athletic competitions throughout the year.</p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 mt-1">
                  <Music className="w-6 h-6 text-[#4747d7]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#26262c] mb-2">Performing Arts & Music</h3>
                  <p className="text-[#76767f]">With professionals on board, we offer comprehensive music and performing arts programs.</p>
                </div>
              </div>

              <div className="flex">
                <div className="mr-4 mt-1">
                  <Target className="w-6 h-6 text-[#4747d7]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#26262c] mb-2">Swimming (coming soon)</h3>
                  <p className="text-[#76767f]">We soon gonna have a swimming sport.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="w-[80%] mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#26262c] mb-10">Our Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="h-16 w-40 flex items-center justify-center">
                <img
                  src={`/images/homepage/sponsor${num}.jpg`}
                  alt={`Sponsor ${num}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
