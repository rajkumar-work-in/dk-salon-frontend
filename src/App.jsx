import { useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const serviceRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
  if (!ref.current) return;

  const navbarHeight = 60;

  const elementPosition =
    ref.current.getBoundingClientRect().top + window.scrollY;

  const offsetPosition = elementPosition - navbarHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

  return (
    <div className="text-gray-900 bg-white dark:text-white dark:bg-black transition-colors duration-300">
      <Navbar
        scrollToSection={scrollToSection}
        refs={{ homeRef, aboutRef, serviceRef, galleryRef, contactRef }}
      />

      <div ref={homeRef}>
        <Hero
          scrollToSection={scrollToSection}
          refs={{ homeRef, aboutRef, serviceRef, galleryRef, contactRef }}
        />
      </div>

      <div ref={aboutRef}>
        <About scrollToSection={scrollToSection} refs={{ homeRef, aboutRef, serviceRef, galleryRef, contactRef }} />
      </div>

      <div ref={serviceRef}>
        <Services scrollToSection={scrollToSection} refs={{ homeRef, aboutRef, serviceRef, galleryRef, contactRef }} />
      </div>

      <div ref={galleryRef}>
        <Gallery scrollToSection={scrollToSection} refs={{ homeRef, aboutRef, serviceRef, galleryRef, contactRef }} />
      </div>

      <div ref={contactRef}>
        <Contact scrollToSection={scrollToSection} refs={{ homeRef, aboutRef, serviceRef, galleryRef, contactRef }} />
      </div>
    </div>
  );
}

export default App;
