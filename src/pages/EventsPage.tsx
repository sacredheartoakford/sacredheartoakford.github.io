import React, { useState } from 'react';
import MetaTags from '../components/MetaTags';
import EducationalInstitutionSchema from '../components/EducationalInstitutionSchema';
import ThreeDCarousel from '../components/ThreeDCarousel';

interface EventData {
  id: number;
  date: string;
  title: string;
  highlightImage: string;
  highlightAlt: string;
  galleryCount: number;
  galleryPathBase?: string; // Optional for pattern-based galleries
  galleryAltBase: string;
  specificImages?: string[]; // Optional for specific image arrays
  content: React.ReactNode;
}

const eventsData: EventData[] = [
  {
    id: 1,
    date: "January 13/ 2026 / 07:00 am",
    title: "MATRIC 2025 AWARDS: Celebrating Excellence with 98% Pass Rate",
    highlightImage: "/images/events/matric_2025_awards/PXL_20260113_075545857.MP.avif",
    highlightAlt: "Matric 2025 Awards Ceremony",
    galleryCount: 16,
    galleryAltBase: "Matric 2025 Awards",
    specificImages: [
      "/images/events/matric_2025_awards/1768320705m1.avif",
      "/images/events/matric_2025_awards/PXL_20260113_075545857.MP.avif",
      "/images/events/matric_2025_awards/PXL_20260113_075547801.MP.avif",
      "/images/events/matric_2025_awards/PXL_20260113_110748489.avif",
      "/images/events/matric_2025_awards/PXL_20260113_115337994.MP.avif",
      "/images/events/matric_2025_awards/PXL_20260113_121738119.MP.avif",
      "/images/events/matric_2025_awards/PXL_20260113_121826737.MP.avif",
      "/images/events/matric_2025_awards/PXL_20260113_125906163.MP.avif",
      "/images/events/matric_2025_awards/PXL_20260113_125958237.avif",
      "/images/events/matric_2025_awards/PXL_20260113_130011938.MP.avif",
      "/images/events/matric_2025_awards/PXL_20260113_131322619.MP.avif",
      "/images/events/matric_2025_awards/PXL_20260113_131427222.avif",
      "/images/events/matric_2025_awards/PXL_20260113_133253531.LONG_EXPOSURE-02.ORIGINAL.avif",
      "/images/events/matric_2025_awards/PXL_20260113_134501813.LONG_EXPOSURE-02.ORIGINAL.avif",
      "/images/events/matric_2025_awards/PXL_20260113_135057785.MP.avif",
      "/images/events/matric_2025_awards/SGCAM_20260113_135003037.avif"
    ],
    content: (
      <>
        <h4 className="text-xl font-bold text-[#26262c] mb-4">Celebrating Outstanding Academic Achievement!</h4>
        <p className="text-[#76767f] mb-4">
          On January 13, 2026, we celebrated the exceptional achievements
          of the Class of 2025, who achieved an outstanding 98% pass rate. This remarkable accomplishment
          reflects the dedication of our learners, teachers, and support staff.
        </p>
        <div className="bg-gradient-to-r from-[#4747d7] to-[#6e71e4] text-white rounded-xl p-6 mb-2">
          <h5 className="text-lg font-bold mb-2 text-center">Award Winners</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span><strong>1st Place:</strong> Certificate + R8,000</span>
            </div>
            <div className="flex justify-between">
              <span><strong>2nd Place:</strong> Certificate + R6,000</span>
            </div>
            <div className="flex justify-between">
              <span><strong>3rd Place:</strong> Certificate + R4,000</span>
            </div>
            <div className="flex justify-between">
              <span><strong>4th-10th Place:</strong> Certificate + R500 each</span>
            </div>
          </div>
        </div>
        <p className="text-[#76767f] mb-4">
          The Top 10 learners were recognized for their exceptional academic performance.
          This ceremony highlighted the importance of hard work, dedication, and perseverance
          in achieving academic excellence.
        </p>
        <p className="text-[#76767f] mb-4">
          We extend our heartfelt congratulations to all the award recipients and
          commend the entire Class of 2025 for their remarkable achievement of a 98% pass rate.
        </p>
        <p className="text-[#76767f] font-semibold">
          With pride and celebration, Sacred Heart Secondary School
        </p>
      </>
    )
  },
  {
    id: 3,
    date: "October 08/ 2024 / 12:00 pm",
    title: "Sacred Heart Business Lunch",
    highlightImage: "/images/events/business_lunch/pic5.avif",
    highlightAlt: "Business Lunch Highlight",
    galleryCount: 7,
    galleryPathBase: "/images/events/business_lunch/pic",
    galleryAltBase: "Business Lunch",
    content: (
      <>
        <h4 className="text-xl font-bold text-[#26262c] mb-4">Business Partnership Celebration</h4>
        <p className="text-[#76767f] mb-4">
          Our exclusive Business Lunch brought together top companies and industry leaders to foster
          meaningful relationships and explore potential partnerships. The event provided an excellent
          platform for networking and collaboration between the business community and our school.
        </p>
        <p className="text-[#76767f] mb-4">
          The Sacred Heart community extends its heartfelt appreciation to all attending businesses
          and their commitment to education and youth development. These partnerships play a crucial
          role in preparing our students for future success in the business world.
        </p>
        <p className="text-[#76767f] mb-4">
          We look forward to building stronger alliances with industry leaders as we continue to
          provide quality education that meets the evolving needs of the marketplace.
        </p>
        <p className="text-[#76767f] font-semibold">
          With gratitude and appreciation, Sacred Heart Secondary School
        </p>
      </>
    )
  },
  {
    id: 4,
    date: "September 19/ 2024 / 18:00 pm",
    title: "GALA DINNER",
    highlightImage: "/images/events/gala_dinner_2024/pic12.avif",
    highlightAlt: "Gala Dinner 2024 Highlight",
    galleryCount: 15,
    galleryPathBase: "/images/events/gala_dinner_2024/pic",
    galleryAltBase: "Gala Dinner",
    content: (
      <>
        <h4 className="text-xl font-bold text-[#26262c] mb-4">Prestigious Annual Gala Dinner</h4>
        <p className="text-[#76767f] mb-4">
          Sacred Heart Secondary School hosted its prestigious Annual Gala Dinner, celebrating
          academic excellence, community spirit, and achievements across various fields. The evening
          brought together students, staff, parents, and distinguished guests for an unforgettable
          experience filled with awards, performances, and recognition.
        </p>
        <p className="text-[#76767f] mb-4">
          The gala highlighted the remarkable talents of our students and the unwavering support
          of our community. It was a testament to the values and traditions that Sacred Heart
          continues to uphold while fostering an environment of growth and achievement.
        </p>
        <p className="text-[#76767f] mb-4">
          As we look back on this successful event, we are reminded of the strength of our
          community bonds and the bright future that lies ahead for our students.
        </p>
        <p className="text-[#76767f] font-semibold">
          With pride and celebration, Sacred Heart Secondary School
        </p>
      </>
    )
  },
  {
    id: 5,
    date: "September 30/ 2023 / 18:30 pm",
    title: "GALA DINNER",
    highlightImage: "/images/events/gala_dinner_2023/pic9.avif",
    highlightAlt: "Gala Dinner 2023 Highlight",
    galleryCount: 9,
    galleryPathBase: "/images/events/gala_dinner_2023/pic",
    galleryAltBase: "Gala Dinner",
    content: (
      <>
        <h4 className="text-xl font-bold text-[#26262c] mb-4">Annual Gala Dinner Partnership</h4>
        <p className="text-[#76767f] mb-4">
          Sacred Heart Secondary School hosted its prestigious Annual Gala Dinner in partnership
          with Sumptuous Caterers. The evening was a resounding success, bringing together the
          entire Sacred Heart community to celebrate academic achievements, cultural performances,
          and the strong bonds that unite us.
        </p>
        <p className="text-[#76767f] mb-4">
          The partnership with Sumptuous Caterers provided an exceptional dining experience,
          enhancing the elegance of the event. It was a beautiful showcase of student talents,
          with performances and presentations that highlighted the diverse abilities of our
          learners.
        </p>
        <p className="text-[#76767f] mb-4">
          This event continues to be a cornerstone of our annual calendar, fostering community
          spirit and creating lasting memories for students, staff, and families alike.
        </p>
        <p className="text-[#76767f] font-semibold">
          With gratitude and celebration, Sacred Heart Secondary School
        </p>
      </>
    )
  },
  {
    id: 6,
    date: "February 14/ 2024 / 10:00 am",
    title: "Valentine's Day Picnic",
    highlightImage: "/images/events/valentines_day_picnic/pic1.avif",
    highlightAlt: "Valentine's Day Highlight",
    galleryCount: 14,
    galleryPathBase: "/images/events/valentines_day_picnic/pic",
    galleryAltBase: "Valentine's Day",
    content: (
      <>
        <h4 className="text-xl font-bold text-[#26262c] mb-4">Community Spirit at its Finest</h4>
        <p className="text-[#76767f] mb-4">
          Our Valentine's Day Picnic remains a cherished tradition that fosters community spirit
          and celebrates the bonds of friendship and love within our Sacred Heart family. Students,
          staff, and families gathered for a day of fun, food, and fellowship under the bright
          February sun.
        </p>
        <p className="text-[#76767f] mb-4">
          The event featured games, entertainment, and shared meals that brought together members
          of our school community in a relaxed, joyful atmosphere. This picnic serves as a
          reminder of the strong community we have built at Sacred Heart.
        </p>
        <p className="text-[#76767f] mb-4">
          These moments of togetherness strengthen our school bonds and create lasting memories
          that our students will treasure for years to come. We look forward to many more
          celebrations together.
        </p>
        <p className="text-[#76767f] font-semibold">
          With love and community spirit, Sacred Heart Secondary School
        </p>
      </>
    )
  }
];

const EventsPage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 1, eventsData.length));
  };

  return (
    <div className="bg-white min-h-screen">
      <MetaTags
        title="Events - Sacred Heart Secondary School"
        description="View upcoming and past events at Sacred Heart Secondary School including matric dances, gala dinners, and special celebrations."
        keywords={['school', 'education', 'secondary school', 'south africa', 'school events', 'matric dance', 'gala dinner', 'community events']}
        url="/events"
      />
      <EducationalInstitutionSchema pageType="events" />
      {/* Page Title */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#26262c] mb-4">Events</h1>
          <div className="w-20 h-1 bg-[#4747d7]"></div>
        </div>
      </section>

      {eventsData.slice(0, visibleCount).map((event, index) => (
        <React.Fragment key={event.id}>
          <section className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f6f7fd]'}`}>
            <div className="container mx-auto px-6 sm:px-8 max-w-6xl">
              {/* Top Section - Date and Title */}
              <div className="mb-8">
                <h6 className="text-lg font-medium text-[#6e71e4] mb-2">{event.date}</h6>
                <h3 className="text-2xl md:text-3xl font-bold text-[#2107c8] mb-8" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
                  {event.title}
                </h3>
              </div>

              {/* Main Content - Large Photo Left, Text Right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Main Content - Left: Large Photo */}
                <div className="flex justify-center">
                  <div className="w-full max-w-lg">
                    <div className="w-full h-96 mb-4 overflow-hidden rounded-xl shadow-xl">
                      <img
                        src={event.highlightImage}
                        alt={event.highlightAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Main Content - Right: Text Content */}
                <div className="flex flex-col justify-center">
                  {event.content}
                </div>
              </div>

              {/* Gallery Carousel */}
              <h4 className="text-xl font-bold text-[#26262c] mb-6">Photo Gallery</h4>
              <ThreeDCarousel
                images={
                  event.specificImages
                    ? event.specificImages
                    : Array.from({ length: event.galleryCount }, (_, i) => `${event.galleryPathBase}${i + 1}.avif`)
                }
                altTexts={
                  event.specificImages
                    ? Array.from({ length: event.specificImages?.length || 0 }, (_, i) =>
                        i === 0 ? `${event.galleryAltBase} Highlight` : `${event.galleryAltBase} ${i + 1}`
                      )
                    : Array.from({ length: event.galleryCount }, (_, i) =>
                        i === 0 ? `${event.galleryAltBase} Highlight` : `${event.galleryAltBase} ${i + 1}`
                      )
                }
              />
            </div>
          </section>

          {/* Divider between events, but not after the last one if it's the end of the list */}
          {index < visibleCount - 1 && (
            <div className="border-t border-gray-200 mx-6 sm:mx-8 max-w-6xl"></div>
          )}
        </React.Fragment>
      ))}

      {/* Show More Button */}
      {visibleCount < eventsData.length && (
        <div className="py-12 flex justify-center bg-white">
          <button
            onClick={handleShowMore}
            className="px-8 py-3 bg-[#4747d7] text-white font-bold rounded-full shadow-lg hover:bg-[#3b3bb5] transition-colors duration-300"
          >
            Show More Events
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsPage;