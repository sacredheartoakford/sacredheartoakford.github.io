import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#f6f7fd] min-h-screen">
      <div className="w-[80%] mx-auto">
        <h1 className="text-3xl font-bold text-[#26262c] mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#26262c] mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-[#4747d7] mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold text-[#26262c]">Address</h3>
                    <p className="text-[#76767f]">Oakford Sacred Heart Secondary School,Osindisweni, Iqadi, 4340</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-[#4747d7] mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold text-[#26262c]">Phone</h3>
                    <p className="text-[#76767f]">+27 - 78 629 9152</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-[#4747d7] mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold text-[#26262c]">Email</h3>
                    <p className="text-[#76767f]">sacredhearthostel01@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl overflow-hidden shadow-md h-64 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3468.9267126630275!2d31.011114581955876!3d-29.60581664697598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef71b003b7a062f%3A0x3f1f38839e2173c1!2sOakford%20Sacred%20Heart%20Secondary%20School!5e0!3m2!1sen!2sza!4v1764951514257!5m2!1sen!2sza"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Location"
                ></iframe>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-[#26262c] mb-6">Get in Touch</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#76767f] mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4747d7] focus:border-[#4747d7]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#76767f] mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4747d7] focus:border-[#4747d7]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#76767f] mb-1">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4747d7] focus:border-[#4747d7]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#76767f] mb-1">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4747d7] focus:border-[#4747d7]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#4747d7] hover:bg-[#3a3ac5] text-white font-medium py-3 px-6 rounded-md transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;