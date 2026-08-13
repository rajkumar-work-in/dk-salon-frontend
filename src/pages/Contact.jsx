import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import phone from "../assets/phone.png";
import Toast from "../components/Toast";

// If the backend (Render free tier) is cold, it can take 30-50s to wake up.
// We give it a generous window, but the UI communicates what's happening
// instead of just sitting there looking frozen.
const REQUEST_TIMEOUT_MS = 45000;

function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timer)
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // guard against double-submits
    setIsSubmitting(true);

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      // Fire both requests in parallel instead of one after another —
      // this alone roughly halves the wait in the best case.
      const results = await Promise.allSettled([
        fetchWithTimeout(
          "https://dk-salon-backend.onrender.com/contact",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          },
          REQUEST_TIMEOUT_MS
        ),
        fetchWithTimeout(
          "https://formspree.io/f/mjgdwgqy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          },
          REQUEST_TIMEOUT_MS
        ),
      ]);

      const [backendResult, emailResult] = results;
      const backendOk =
        backendResult.status === "fulfilled" && backendResult.value.ok;
      const emailOk =
        emailResult.status === "fulfilled" && emailResult.value.ok;

      if (backendOk && emailOk) {
        setToast({ type: "success", message: "Message sent successfully! We'll get back to you soon." });
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else if (backendOk || emailOk) {
        // One channel got through - still a win, worth telling them plainly.
        setToast({
          type: "success",
          message: "Message received! (One delivery channel was slow, but we got it.)",
        });
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        const timedOut =
          (backendResult.status === "rejected" && backendResult.reason?.name === "AbortError") ||
          (emailResult.status === "rejected" && emailResult.reason?.name === "AbortError");
        setToast({
          type: "error",
          message: timedOut
            ? "The server is taking too long to respond. Please try again in a moment."
            : "Something went wrong sending your message. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      setToast({ type: "error", message: "Unexpected error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-yellow-400"></div>
            <p className="tracking-widest text-sm">GET IN TOUCH</p>
            <div className="w-10 h-[2px] bg-yellow-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions or want to book an appointment? Reach out to us
            today!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex gap-4 space-y-[-8px]">
              <div>
                <h3 className="text-xl font-bold mb-2">Address</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  427, Puthupet Main Road, Puthupet
                  <br />
                  Cuddalore 607 108
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300">+91 8825520336</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Mon-Fri: 9am - 6pm</p>
              </div>
            </div>

            <div className="flex gap-4 space-y-[-3px]">
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">dksalon.service@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-4 space-y-[-3px]">
              <div>
                <h3 className="text-xl font-bold mb-2">Hours</h3>
                <p className="text-gray-600 dark:text-gray-300">
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
            className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-8 rounded-lg transition-colors duration-300"
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
                disabled={isSubmitting}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition disabled:opacity-60"
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
                disabled={isSubmitting}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition disabled:opacity-60"
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
                disabled={isSubmitting}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition disabled:opacity-60"
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
                disabled={isSubmitting}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-400 transition disabled:opacity-60"
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
                disabled={isSubmitting}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition resize-none disabled:opacity-60"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 active:scale-95 duration-300 px-6 py-3 font-bold text-lg transition rounded text-white flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
            {isSubmitting && (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                This can take up to 30-40 seconds if our server has been idle.
              </p>
            )}
          </form>
        </div>
      </div>

      {/*Phone Icon*/}
      <div className="fixed bottom-5 right-5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
        <a
          href="tel:+919363351196"
          className="relative bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          <FaPhoneAlt size={25} color="white" className="cursor-pointer" />
        </a>
      </div>
    </section>
  );
}
