// @flow strict
"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import Brand from "./Brand";
import ThemeToggle from "./ThemeToggle";

const MAIN_LINKS = [
  { name: "HOME", href: "/#home" },
  { name: "ABOUT", href: "/#about" },
  { name: "SKILLS", href: "/#skills" },
  { name: "EXPERIENCE", href: "/#experience" },
  { name: "EDUCATION", href: "/#education" },
  { name: "PROJECTS", href: "/#projects" },
];

const MORE_LINKS = [
  { name: "CERTIFICATES", href: "/#certificates" },
  { name: "BLOGS", href: "/#blog" },
  { name: "CONTACT", href: "/#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const evaluate = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      if (scrollY < 100) {
        setActiveSection("home");
        return;
      }

      let current = "";
      const sections = document.querySelectorAll("section[id]");
      for (const section of sections) {
        const top = section.offsetTop - 180;
        if (scrollY >= top && scrollY < top + section.offsetHeight) {
          current = section.id;
          break;
        }
      }
      setActiveSection(current);
    };

    // rAF-throttled: without this the handler runs on every frame of
    // momentum scrolling and causes visible jank on low-end devices.
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        evaluate();
        ticking = false;
      });
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const checkActive = useCallback(
    (href) => {
      const targetId = href.includes("#")
        ? href.split("#")[1]
        : href.replace("/", "");
      return activeSection === targetId;
    },
    [activeSection]
  );

  const isMoreActive = MORE_LINKS.some((link) => checkActive(link.href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[9999] transition-all duration-500 ${
          scrolled
            ? "glass-nav border-b shadow-[var(--shadow-soft)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[92rem] items-center justify-between gap-3 px-4 py-3 sm:px-6 md:py-4 lg:px-10">
          {/* Logo — uses the user's photo instead of initials */}
          <Brand size={40} />

          {/* Desktop Menu */}
          <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
            {MAIN_LINKS.map((link) => {
              const isActive = checkActive(link.href);
              return (
                <li key={link.name} className="group relative">
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative py-1 text-[13px] font-semibold tracking-wide transition-colors duration-300 xl:text-[15px] ${
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--muted)] group-hover:text-[var(--accent)]"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] transition-all duration-300 ${
                        isActive
                          ? "w-full opacity-100"
                          : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}

            <DropdownMenu
              moreLinks={MORE_LINKS}
              checkActive={checkActive}
              isMoreActive={isMoreActive}
            />
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* Hire Me — single button → bottom-to-top sheen on hover */}
            <Link
              href="/#contact"
              className="btn-up btn-fill-brand hidden rounded-full px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_20px_-10px_rgba(2,120,87,0.8)] sm:inline-flex sm:items-center md:px-6"
            >
              <span className="relative z-[1]">Hire Me</span>
            </Link>

            <MobileMenu
              mainLinks={MAIN_LINKS}
              moreLinks={MORE_LINKS}
              checkActive={checkActive}
            />
          </div>
        </nav>
      </header>

      {/* Spacer so content clears the fixed header */}
      <div className="h-[76px] sm:h-[84px]" aria-hidden="true" />
    </>
  );
}

/* ✅ Dropdown Menu (Desktop) */
function DropdownMenu({ moreLinks, checkActive, isMoreActive }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        className={`relative flex items-center gap-1 py-1 text-[13px] font-semibold tracking-wide transition-colors duration-300 xl:text-[15px] ${
          isMoreActive
            ? "text-[var(--accent)]"
            : "text-[var(--muted)] hover:text-[var(--accent)]"
        }`}
      >
        More
        <FaChevronDown
          size={11}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />

        <span
          className={`absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] transition-all duration-300 ${
            isMoreActive
              ? "w-full opacity-100"
              : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 w-48 rounded-xl border border-[var(--line-strong)] bg-[var(--menu-bg)] p-2 shadow-[var(--shadow-card)] backdrop-blur-xl">
          {moreLinks.map((link) => {
            const isActive = checkActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "text-[var(--muted)] hover:bg-[var(--accent)]/5 hover:text-[var(--accent)]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ✅ Mobile Menu */
function MobileMenu({ mainLinks, moreLinks, checkActive }) {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-[var(--line-strong)] bg-[var(--surface)]"
      >
        <span
          className={`block h-[2px] w-5 rounded-full bg-[var(--ink)] transition-transform duration-300 ${
            open ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[2px] w-5 rounded-full bg-[var(--ink)] transition-opacity duration-300 ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-[2px] w-5 rounded-full bg-[var(--ink)] transition-transform duration-300 ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>

      <div
        className={`fixed inset-x-0 top-[76px] z-[9998] origin-top rounded-b-2xl border-b border-[var(--line-strong)] bg-[var(--menu-bg)] px-5 pb-6 pt-3 shadow-[var(--shadow-card)] backdrop-blur-2xl transition-all duration-300 ease-out sm:top-[84px] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        {[...mainLinks, ...moreLinks].map((link) => {
          const isActive = checkActive(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                isActive
                  ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "text-[var(--muted)] hover:bg-[var(--accent)]/5 hover:text-[var(--accent)]"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}