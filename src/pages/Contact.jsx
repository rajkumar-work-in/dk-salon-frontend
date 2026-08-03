import React, { useState } from "react";
import address from "../assets/address.png";
import clock from "../assets/clock.png";
import email from "../assets/email.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      const backendResponse = await fetch("https://dk-salon-backend.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const emailResponse = await fetch("https://formspree.io/f/mjgdwgqy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (backendResponse.ok && emailResponse.ok) {
        alert("Message sent successfully");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        alert("Error sending message");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-yellow-400"></div>
            <p className="tracking-widest text-sm">GET IN TOUCH</p>
            <div className="w-10 h-[2px] bg-yellow-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions or want to book an appointment? Reach out to us
            today!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex gap-4 space-y-[-8px]">
              <div>
                <img src={address} alt="Address" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Address</h3>
                <p className="text-gray-300">
                  427, Puthupet Main Road, Puthupet
                  <br />
                  Cuddalore 607 108
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">☏</div>
              <div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-gray-300">+91 8825520336</p>
                <p className="text-gray-400 text-sm">Mon-Fri: 9am - 6pm</p>
              </div>
            </div>

            <div className="flex gap-4 space-y-[-3px]">
              <div>
                <img src={email} alt="Email" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-300">dksalon.service@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-4 space-y-[-3px]">
              <div>
                <img src={clock} alt="Hours" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Hours</h3>
                <p className="text-gray-300">
                  Monday - Friday: 9am - 6pm
                  <br />
                  Saturday: 10am - 4pm
                  <br />
                  Sunday: 10pm - 4pm
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900/50 border border-gray-800 p-8 rounded-lg"
          >
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="dksalon.service@gmail.com"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 8825520336"
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Service
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:outline-none focus:border-yellow-400 transition"
              >
                <option value="">Select a service</option>
                <option value="Classic Haircut">Classic Haircut</option>
                <option value="Fade + Lineup">Fade + Lineup</option>
                <option value="Beard Trim">Beard Trim</option>
                <option value="Hair Coloring">Hair Coloring</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows="4"
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 active:scale-95 duration-300 px-6 py-3 font-bold text-lg transition rounded"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
