import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/UseTheme"; 

// Moved OUTSIDE Navbar — now it's a stable, top-level component.
// theme & toggleTheme come in as props instead of being read from
// the closure, so React won't recreate this on every Navbar render.
function ThemeToggleButton({ theme, toggleTheme, className = "" }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full border transition duration-300 active:scale-90
        border-gray-300 text-gray-700 hover:bg-gray-100
        dark:border-gray-700 dark:text-yellow-400 dark:hover:bg-gray-800 ${className}`}
    >
      {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={16} />}
    </button>
  );
}

export default function Navbar({ scrollToSection, refs }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Home", ref: refs.homeRef },
    { name: "About", ref: refs.aboutRef },
    { name: "Service", ref: refs.serviceRef },
    { name: "Gallery", ref: refs.galleryRef },
  ];

  const handleNavClick = (ref) => {
    scrollToSection(ref);
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 bg-white dark:bg-black z-50 flex justify-between items-center px-6 py-2 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700/30 transition-colors duration-300">
      {/* Logo Section */}
      <div
        className="cursor-pointer flex items-center"
        onClick={() => scrollToSection(refs.homeRef)}
      >
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-blackops text-yellow-500 dark:text-yellow-400">DK SALON</h1>
          <p className="text-[10px] md:text-[13px] font-semibold -mt-2">Haircut | Styling</p>
        </div>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => (
          <li
            key={link.name}
            onClick={() => handleNavClick(link.ref)}
            className="transition duration-300 cursor-pointer font-semibold text-lg hover:text-yellow-500 dark:hover:text-yellow-400"
          >
            {link.name}
          </li>
        ))}
        <li
          onClick={() => handleNavClick(refs.contactRef)}
          className="text-lg bg-red-600 text-white px-6 py-1 cursor-pointer hover:bg-red-700 active:scale-95 duration-300 font-semibold transition rounded"
        >
          Contact
        </li>
        <li>
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        </li>
      </ul>

      {/* Mobile: theme toggle + hamburger */}
      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        <button
          type="button"
          className="px-4 py-4 text-gray-900 dark:text-white transform hover:scale-105 active:scale-95 transition duration-300 font-bold text-lg"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Overlay Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 md:hidden z-40 transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <ul
        className={`absolute top-full left-0 right-0 md:hidden bg-white dark:bg-black backdrop-blur-sm shadow-2xl transform transition-all duration-300 ease-in-out z-50
          ${
            menuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
      >
        {navLinks.map((link) => (
          <li key={link.name}>
            <button
              type="button"
              onClick={() => handleNavClick(link.ref)}
              className="w-full px-10 py-6 text-left transition duration-200 font-semibold text-lg border-b border-gray-200 dark:border-gray-700/50 last:border-b-0 text-gray-900 dark:text-white hover:bg-yellow-400/20 hover:text-yellow-500 dark:hover:text-yellow-400"
            >
              {link.name}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => handleNavClick(refs.contactRef)}
            className="w-fit px-10 py-6 text-left transition active:scale-95 duration-300 font-semibold text-lg border-b border-gray-200 dark:border-gray-700/50 text-gray-900 dark:text-white hover:bg-yellow-400/20 hover:text-yellow-500 dark:hover:text-yellow-400"
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
}