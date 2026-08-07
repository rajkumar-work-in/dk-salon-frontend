import React from "react";
import salonimage from "../assets/salonimage.jpg";
import quality from "../assets/quality.png";
import community from "../assets/community.png";
import integrity from "../assets/integrity.png";

export default function About({ scrollToSection, refs }) {
  const handleNavClick = (ref) => {
    scrollToSection(ref);
  };

  return (
    <div className="bg-black">
      {/* About Hero Section */}
      <div className="relative w-full h-64 md:h-80 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 text-white z-20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-[2px] bg-yellow-400"></div>
            <p className="tracking-widest text-sm">OUR STORY</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">About DK Salon</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-20 py-16 max-w-6xl mx-auto">
        {/* Section 1: Our Story */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-yellow-400 mb-6">
                Our Story
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Founded in 2016, DK Salon has been the premier destination for
                men's grooming in the city. What started as a small vision has
                transformed into a thriving community of barbers and clients.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                We believe that a great haircut is more than just scissors and
                clippers. It's about confidence, style, and creating an
                unforgettable experience for every client who walks through our
                door.
              </p>
            </div>
            <div className="bg-gradient-to-r from-red-600/20 to-yellow-400/10 h-80 rounded-lg flex items-center justify-center">
                <img
                  src={salonimage}
                  alt="DK Salon interior"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
            </div>
          </div>
        </div>

        {/* Section 2: Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-yellow-400 mb-12 text-center">
            Why Choose DK Salon
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-2xl font-bold mb-3 text-white">
                Expert Barbers
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Our team consists of certified professionals with 10+ years of
                experience in modern cuts, traditional techniques, and
                personalized styling.
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-2xl font-bold mb-3 text-white">
                Premium Quality
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We use only the finest grooming products and state-of-the-art
                equipment to ensure superior results and client satisfaction.
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-2xl font-bold mb-3 text-white">
                Welcoming Space
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Relax in our comfortable, clean, and modern barbershop. Perfect
                for a quick trim or catching up with friends in a laid-back
                atmosphere.
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-2xl font-bold mb-3 text-white">
                Affordable Excellence
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Premium service at competitive prices. We believe great grooming
                shouldn't break the bank.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Our Values */}
        <div className="mb-20 bg-gray-900/50 p-8 md:p-12 rounded-lg">
          <h2 className="text-3xl font-bold text-yellow-400 mb-8">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center flex flex-col items-center">
              <div className="mb-3"><img src={quality} className=""/></div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-gray-300">Excellence in every cut</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="mb-3"><img src={community} className="" /></div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-300">Building relationships daily</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="mb-3"><img src={integrity} className="w-[50px] h-[50px]" /></div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-gray-300">Honest service always</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 border-t border-gray-700">
          <h2 className="text-3xl font-bold mb-4">
            Ready for Your Next Haircut?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Book an appointment today and experience the DK Salon difference.
          </p>
          <button
            onClick={() => handleNavClick(refs.contactRef)}
            className="bg-red-600 hover:bg-red-700 active:scale-95 duration-300 px-8 py-3 font-bold text-lg transition rounded"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
