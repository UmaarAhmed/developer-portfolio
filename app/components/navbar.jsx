// @flow strict
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 160; 
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSection = sectionId;
        }
      });

      if (scrollY < 100) {
        setActiveSection("home");
      } else {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); 

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mainLinks = [
    { name: "HOME", href: "/#home" },
    { name: "ABOUT", href: "/#about" },
    { name: "SKILLS", href: "/#skills" },
    { name: "EXPERIENCE", href: "/#experience" },
    { name: "EDUCATION", href: "/#education" },
    { name: "PROJECTS", href: "/#projects" },
  ];

  const moreLinks = [
    { name: "CERTIFICATES", href: "/#certificates" },
    { name: "BLOGS", href: "/#blog" },
    { name: "CONTACT", href: "/#contact" },
  ];

  const checkActive = (href) => {
    const targetId = href.includes("#") ? href.split("#")[1] : href.replace("/", "");
    return activeSection === targetId;
  };

  // 🔹 Check if any link inside "More" is active
  const isMoreActive = moreLinks.some((link) => checkActive(link.href));

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl bg-[#070b1e]/80 border-b border-[#16f2b3]/20 shadow-[0_2px_20px_rgba(22,242,179,0.1)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5 md:py-6">
          {/* Logo */}
          <Link
            href="/#home"
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] to-[#4b6fff] text-2xl md:text-3xl font-extrabold tracking-wide hover:opacity-90 transition-all duration-300"
          >
            Umaar Ahmed
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {mainLinks.map((link) => {
              const isActive = checkActive(link.href);
              return (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`relative text-[15px] font-medium tracking-wide transition-all duration-300 ${
                      isActive ? "text-[#16f2b3]" : "text-gray-300 group-hover:text-[#16f2b3]"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-[#16f2b3] to-[#4b6fff] transition-all duration-300 ${
                        isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                      }`}
                    ></span>
                  </Link>
                </li>
              );
            })}

            {/* Dropdown Menu component with isMoreActive prop */}
            <DropdownMenu 
              moreLinks={moreLinks} 
              checkActive={checkActive} 
              isMoreActive={isMoreActive} 
            />
          </ul>

          {/* Hire Me Button */}
          <Link
            href="/#contact"
            className="hidden md:inline-block px-6 py-2.5 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-[#16f2b3] to-[#4b6fff] hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(22,242,179,0.4)] hover:shadow-[0_0_25px_rgba(22,242,179,0.6)]"
          >
            Hire Me
          </Link>

          {/* Mobile Menu */}
          <MobileMenu
            mainLinks={mainLinks}
            moreLinks={moreLinks}
            checkActive={checkActive}
          />
        </nav>
      </header>

      <div className="h-[100px] md:h-[77px]"></div>
    </>
  );
}

/* ✅ Dropdown Menu (Desktop) */
function DropdownMenu({ moreLinks, checkActive, isMoreActive }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button 
        className={`relative text-[15px] font-medium tracking-wide flex items-center gap-1 transition-all duration-300 ${
          isMoreActive ? "text-[#16f2b3]" : "text-gray-300 group-hover:text-[#16f2b3]"
        }`}
      >
        More <FaChevronDown size={12} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        
        {/* Underline for "More" button */}
        <span
          className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-[#16f2b3] to-[#4b6fff] transition-all duration-300 ${
            isMoreActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
          }`}
        ></span>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-48 rounded-xl bg-[#0b112b]/95 backdrop-blur-lg border border-[#16f2b3]/20 p-3 shadow-[0_5px_25px_rgba(22,242,179,0.15)]">
          {moreLinks.map((link) => {
            const isActive = checkActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  isActive ? "text-[#16f2b3] bg-[#16f2b3]/10" : "text-gray-300 hover:text-[#16f2b3] hover:bg-[#16f2b3]/5"
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

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col justify-between w-7 h-6 focus:outline-none group z-[10000]"
      >
        <span className={`h-[2px] bg-white rounded transition-all duration-300 ${open ? "rotate-45 translate-y-[8px]" : ""}`}></span>
        <span className={`h-[2px] bg-white rounded transition-all duration-300 ${open ? "opacity-0" : ""}`}></span>
        <span className={`h-[2px] bg-white rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-[8px]" : ""}`}></span>
      </button>

      <div
        className={`absolute right-0 mt-3 w-56 rounded-xl bg-[#0b112b]/95 backdrop-blur-xl border border-[#16f2b3]/20 p-5 shadow-[0_5px_25px_rgba(22,242,179,0.2)] transition-all duration-500 ease-in-out transform ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{ zIndex: 9998 }}
      >
        {[...mainLinks, ...moreLinks].map((link) => {
          const isActive = checkActive(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block py-2 px-3 text-sm font-medium rounded-md transition-all duration-300 ${
                isActive ? "text-[#16f2b3] bg-[#16f2b3]/10" : "text-gray-300 hover:text-[#16f2b3] hover:bg-[#16f2b3]/5"
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