import React from "react";
import classicfade from "../assets/classicfade.jpg";
import moderncut from "../assets/moderncut.jpg";
import beardstyle from "../assets/beardstyle.jpg";
import colorwork from "../assets/colorwork.jpg";
import sharplineup from "../assets/sharplineup.jpg";
import premiumfade from "../assets/premiumfade.jpg";
import grooming from "../assets/grooming.jpg";
import styletrends from "../assets/styletrends.jpg";

export default function Gallery({ scrollToSection, refs }) {
  const galleryImages = [
    { id: 1, title: "Classic Fade", category: "Haircut", image: classicfade },
    { id: 2, title: "Modern Cut", category: "Haircut", image: moderncut },
    { id: 3, title: "Beard Style", category: "Beard", image: beardstyle },
    { id: 4, title: "Color Work", category: "Coloring", image: colorwork },
    { id: 5, title: "Sharp Lineup", category: "Haircut", image: sharplineup },
    { id: 6, title: "Premium Fade", category: "Haircut", image: premiumfade },
    { id: 7, title: "Grooming", category: "Beard", image: grooming },
    { id: 8, title: "Style Trends", category: "Coloring", image: styletrends },
  ];

  const handleNavClick = (ref) => {
    scrollToSection(ref);
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-yellow-400"></div>
            <p className="tracking-widest text-sm">SHOWCASE</p>
            <div className="w-10 h-[2px] bg-yellow-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Browse through our portfolio of satisfied clients and beautiful
            haircuts
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative group overflow-hidden rounded-lg aspect-square bg-gray-800 hover:shadow-lg hover:shadow-red-600/30 transition duration-300 cursor-pointer"
            >
              {/* Image Display */}
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold mb-2 ">{image.title}</h3>
                <span
                  onClick={() => handleNavClick(refs.contactRef)}
                  className="bg-red-600 px-4 py-1 text-sm font-semibold rounded active:scale-95 transition duration-300 hover:bg-red-700"
                >
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 pt-12 border-t border-gray-700">
          <p className="text-gray-300 mb-6">
            Follow us on social media for more updates and gallery posts
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={() => alert("Social media links will be update soon")} className="bg-red-600 hover:bg-red-700 active:scale-95 px-6 py-2 font-semibold active:scale-95 transition duration-300 rounded">
              Facebook
            </button>
            <button onClick={() => alert("Social media links will be update soon")}className="bg-red-600 hover:bg-red-700 active:scale-95 px-6 py-2 font-semibold active:scale-95 transition duration-300 rounded">
              Instagram
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
