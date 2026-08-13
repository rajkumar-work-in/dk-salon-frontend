import React from "react";

export default function Services({ scrollToSection, refs }) {
  const services = [
    {
      id: 1,
      name: "Classic Haircut",
      price: "₹150",
      description: "Clean, sharp haircut with fade and styling",
    },
    {
      id: 2,
      name: "Fade + Lineup",
      price: "₹120",
      description: "Professional fade with precise lineup and shaping",
    },
    {
      id: 3,
      name: "Beard Trim",
      price: "₹50",
      description: "Detailed beard shaping and styling",
    },
    {
      id: 4,
      name: "Hair Coloring",
      price: "₹80",
      description: "Professional hair coloring and highlights",
    },
    {
      id: 5,
      name: "Hair Treatment",
      price: "₹250",
      description: "Premium hair spa and treatment services",
    },
    {
      id: 6,
      name: "Kids Haircut",
      price: "₹100",
      description: "Fun and friendly haircuts for kids",
    },
  ];

  const handleNavClick = (ref) => {
    scrollToSection(ref);
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-yellow-400"></div>
            <p className="tracking-widest text-sm">WHAT WE OFFER</p>
            <div className="w-10 h-[2px] bg-yellow-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Premium grooming services tailored to your style and preferences
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:border-red-600 p-8 rounded-lg transition duration-300 hover:shadow-lg hover:shadow-red-600/20"
            >
              <h3 className="text-2xl font-bold mb-2 text-yellow-600 dark:text-yellow-400">
                {service.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-2xl font-bold text-red-600 dark:text-red-500">
                  {service.price}
                </span>
                <button
                  onClick={() => handleNavClick(refs.contactRef)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-semibold transition duration-300 active:scale-95 rounded"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Special packages available. Contact us for more info!
          </p>
          <button
            onClick={() => handleNavClick(refs.contactRef)}
            className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-3 font-bold text-lg transition duration-300 active:scale-95 rounded"
          >
            Get Custom Package
          </button>
        </div>
      </div>
    </section>
  );
}
