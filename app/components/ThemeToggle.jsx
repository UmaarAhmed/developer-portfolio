"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

/**
 * Navbar light/dark switch. Renders a stable placeholder on the server
 * and during the first client paint, then fills in once mounted — this
 * keeps hydration clean while still showing the correct icon immediately.
 */
export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`theme-toggle group relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink)] shadow-[var(--shadow-soft)] transition-[transform,box-shadow,background-color] duration-300 hover:scale-110 hover:shadow-[0_0_22px_color-mix(in_oklab,var(--accent)_55%,transparent)] active:scale-95 ${className}`}
    >
      {/* Sun */}
      <svg
        className={`theme-toggle-icon absolute h-5 w-5 transition-[opacity,transform] duration-400 ${
          isDark ? "scale-50 opacity-0 -rotate-90" : "scale-100 opacity-100 rotate-0"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Moon */}
      <svg
        className={`theme-toggle-icon absolute h-5 w-5 transition-[opacity,transform] duration-400 ${
          isDark ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-0 rotate-90"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}