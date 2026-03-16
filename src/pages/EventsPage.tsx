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
  fullSizeImage?: boolean; // Optional flag to render the image in full detail
}

const eventsData: EventData[] = [
  {
    id: 1,
    date: "September 25/ 2026 / Morning",
    title: "SACRED HEART GOLF FUNDRAISING DAY",
    highlightImage: "/images/events/golf_september/WhatsApp Image 2026-03-02 at 13.06.58.jpeg",
    highlightAlt: "Sacred Heart Golf Fundraising Day Invitation",
    galleryCount: 1,
    galleryAltBase: "Golf Fundraising Day",
    specificImages: [
      "/images/events/golf_september/WhatsApp Image 2026-03-02 at 13.06.58.jpeg"
    ],
    fullSizeImage: true,
    content: (
      <>
        <h4 className="text-xl font-bold text-[#26262c] mb-4">Sacred Heart Golf Fundraising Day</h4>
        <p className="text-[#76767f] mb-4">
          Join us for the Sacred Heart Golf Fundraising Day in partnership with Mandate &amp; Sumptuous,
          taking place on <strong>25 September 2026</strong> at <strong>Umhlali Country Club</strong>.
          Format: IPS.
        </p>
        <div className="bg-gradient-to-r from-[#2d6a2e] to-[#4a9e4b] text-white rounded-xl p-6 mb-4">
          <h5 className="text-lg font-bold mb-3 text-center">Packages</h5>
          <div className="space-y-3">
            <div>
              <strong>R50 000 Package:</strong>
              <ul className="list-disc list-inside ml-2 mt-1 text-sm">
                <li>2 x Fourball</li>
                <li>4 People for Dinner</li>
                <li>Hole 1 or Hole 10 Activation</li>
                <li>Dinner Branding</li>
              </ul>
            </div>
            <div>
              <strong>R15 000 Package:</strong>
              <ul className="list-disc list-inside ml-2 mt-1 text-sm">
                <li>1 x Fourball</li>
                <li>Hole Activation</li>
              </ul>
            </div>
            <div>
              <strong>1 x Fourball — R6 000:</strong>
              <ul className="list-disc list-inside ml-2 mt-1 text-sm">
                <li>Greenfees</li>
                <li>Halfway House</li>
                <li>Prize Giving Dinner</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-[#76767f] mb-2">
          <strong>RSVP:</strong> 31 August 2026
        </p>
        <p className="text-[#76767f] mb-2">
          <strong>TEL:</strong> (031) 812 0555 &nbsp;•&nbsp; <strong>EMAIL:</strong> olivia@slgas.co.za
        </p>
        <p className="text-[#76767f] font-semibold mt-4">
          With unity and purpose, Sacred Heart Secondary School
        </p>
      </>
    )
  },
  {
    id: 2,
    date: "February 27/ 2026 / 08:00 am",
    title: "STAFF TEAM BUILDING: 2 Days at The Riverside Hotel",
    highlightImage: "/images/events/team_building_2026/PXL_20260227_131900486.MP.avif",
    highlightAlt: "Team Building at The Riverside Hotel",
    galleryCount: 54,
    galleryAltBase: "Team Building",
    specificImages: [
      "/images/events/team_building_2026/PXL_20260227_124044740.MP.avif",
      "/images/events/team_building_2026/PXL_20260227_124231231.MP.avif",
      "/images/events/team_building_2026/PXL_20260227_125015212.MP.avif",
      "/images/events/team_building_2026/PXL_20260227_125606459.MP.avif",
      "/images/events/team_building_2026/PXL_20260227_131900486.MP.avif",
      "/images/events/team_building_2026/PXL_20260227_132222465.avif",
      "/images/events/team_building_2026/PXL_20260227_132246949.avif",
      "/images/events/team_building_2026/PXL_20260227_132344029.NIGHT.avif",
      "/images/events/team_building_2026/PXL_20260227_132401181.avif",
      "/images/events/team_building_2026/PXL_20260227_132437105.avif",
      "/images/events/team_building_2026/PXL_20260227_132727095.avif",
      "/images/events/team_building_2026/PXL_20260227_133522905.MP.avif",
      "/images/events/team_building_2026/PXL_20260227_133923774.MP.avif",
      "/images/events/team_building_2026/PXL_20260227_134026297.avif",
      "/images/events/team_building_2026/PXL_20260227_134834713.NIGHT.avif",
      "/images/events/team_building_2026/PXL_20260227_135149704.MP.avif",
      "/images/events/team_building_2026/PXL_20260227_140501771.MP.avif",
      "/images/events/team_building_2026/PXL_20260227_140505352.avif",
      "/images/events/team_building_2026/PXL_20260227_140850074.avif",
      "/images/events/team_building_2026/PXL_20260227_140944600.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_065133272.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_065207073.avif",
      "/images/events/team_building_2026/PXL_20260228_065301119.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_065414361.avif",
      "/images/events/team_building_2026/PXL_20260228_072523234.avif",
      "/images/events/team_building_2026/PXL_20260228_073139143.avif",
      "/images/events/team_building_2026/PXL_20260228_073159550.avif",
      "/images/events/team_building_2026/PXL_20260228_084231701.avif",
      "/images/events/team_building_2026/PXL_20260228_084337168.avif",
      "/images/events/team_building_2026/PXL_20260228_084352568.avif",
      "/images/events/team_building_2026/PXL_20260228_084355136.avif",
      "/images/events/team_building_2026/PXL_20260228_092522320.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_092535616.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_092604115.avif",
      "/images/events/team_building_2026/PXL_20260228_092953730.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_093020433.avif",
      "/images/events/team_building_2026/PXL_20260228_093030913.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_093043437.avif",
      "/images/events/team_building_2026/PXL_20260228_093046261.avif",
      "/images/events/team_building_2026/PXL_20260228_093052708.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_093055229.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_093311439.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_093323295.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_094656738.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_094906896.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_094911175.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_095229038.avif",
      "/images/events/team_building_2026/PXL_20260228_095459569.MP.avif",
      "/images/events/team_building_2026/PXL_20260228_172345800.avif",
      "/images/events/team_building_2026/PXL_20260228_173054881.avif",
      "/images/events/team_building_2026/PXL_20260228_173108609.avif",
      "/images/events/team_building_2026/PXL_20260228_181957980.avif",
      "/images/events/team_building_2026/PXL_20260228_182008903.avif",
      "/images/events/team_building_2026/PXL_20260228_183500878.avif"
    ],
    content: (
      <>
        <h4 className="text-xl font-bold text-[#26262c] mb-4">Building Stronger Bonds Beyond the Classroom</h4>
        <p className="text-[#76767f] mb-4">
          On February 27–28, 2026, the Sacred Heart Secondary School staff embarked on an exciting
          2-day team building retreat at The Riverside Hotel. This enriching experience was designed
          to strengthen collaboration, boost morale, and foster deeper connections among our
          dedicated educators and support staff.
        </p>
        <p className="text-[#76767f] mb-4">
          The retreat featured a variety of engaging activities that encouraged teamwork,
          communication, and creative problem-solving. From outdoor challenges to reflective
          sessions, every moment was crafted to bring our team closer together and reignite
          the passion that drives our commitment to excellence in education.
        </p>
        <p className="text-[#76767f] mb-4">
          The beautiful setting of The Riverside Hotel provided the perfect backdrop for
          relaxation and camaraderie, allowing staff members to unwind while building
          lasting memories and strengthening the bonds that make Sacred Heart a truly
          special community.
        </p>
        <p className="text-[#76767f] font-semibold">
          With unity and purpose, Sacred Heart Secondary School
        </p>
      </>
    )
  },
  {
    id: 2,
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
              <span><strong>1st Place:</strong> Certificate + R10,000</span>
            </div>
            <div className="flex justify-between">
              <span><strong>2nd Place:</strong> Certificate + R5,000</span>
            </div>
            <div className="flex justify-between">
              <span><strong>3rd Place:</strong> Certificate + R2,000</span>
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
    date: "November 23/ 2024 / 15:00 pm",
    title: "Class of 2024 MATRIC DANCE: A night to Remember",
    highlightImage: "/images/events/matric_dance_2024/pic1.avif",
    highlightAlt: "Matric Dance Highlight",
    galleryCount: 10,
    galleryPathBase: "/images/events/matric_dance_2024/pic",
    galleryAltBase: "Matric Dance",
    content: (
      <>
        <h4 className="text-xl font-bold text-[#26262c] mb-4">What a night to remember!!!!!</h4>
        <p className="text-[#76767f] mb-4">
          Congratulations to our Class of 2024 graduates on your special night! Your journey has been
          filled with dedication, perseverance, and remarkable achievements. The Brently Lodge and
          Lifestyle Centre in Durban provided the perfect setting for this memorable celebration of
          your accomplishments.
        </p>
        <p className="text-[#76767f] mb-4">
          As you move forward into your next chapter, remember that the Sacred Heart family will
          always be here to support you. Embrace your future with courage and confidence, and never
          forget the friendships and memories you've made here.
        </p>
        <p className="text-[#76767f] mb-4">
          Wishing all the best to the Class of 2024 as you embark on your next adventure.
        </p>
        <p className="text-[#76767f] font-semibold">
          With love and blessings, Sacred Heart Secondary School
        </p>
      </>
    )
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
              ✦ School Life
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight tracking-tight text-white drop-shadow-sm">
            Our <span className="italic font-light text-blue-200">Events</span>
          </h1>

          <p className="max-w-2xl mx-auto text-blue-100 text-lg md:text-xl leading-relaxed font-light mb-10">
            Celebrating milestones, building community, and creating memories that last a lifetime.
          </p>
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
                  <div className={`w-full ${event.fullSizeImage ? '' : 'max-w-lg'}`}>
                    <div className={`w-full ${event.fullSizeImage ? 'h-auto' : 'h-96'} mb-4 overflow-hidden rounded-xl shadow-xl`}>
                      <img
                        src={event.highlightImage}
                        alt={event.highlightAlt}
                        className={`w-full h-full ${event.fullSizeImage ? 'object-contain' : 'object-cover'}`}
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
              {event.galleryCount > 1 && (
                <>
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
                </>
              )}
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