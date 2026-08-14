import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);

function getInitialTheme() {
  // Respect a theme the user already picked on a previous visit
  const stored = localStorage.getItem("dk-salon-theme");
  if (stored === "light" || stored === "dark") return stored;

  // Otherwise fall back to the OS/browser preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // Keep <html class="dark"> in sync so Tailwind's dark: classes apply
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("dk-salon-theme", theme);
  }, [theme]);

  // If the user never manually chose a theme, keep following the OS setting
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const stored = localStorage.getItem("dk-salon-theme");
      if (!stored) setTheme(e.matches ? "dark" : "light");
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
