"use client";
// @flow strict

import { personalData } from "@/utils/data/personal-data";
import { motion, useScroll, useTransform } from "framer-motion"; 
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { SiDevdotto } from "react-icons/si";

const roles = [
  "Full-Stack Software Developer",
  "React & Next.js Expert",
  "Web & Mobile Application Developer", 
  "Technical Problem Solver",
  "Customer Support & Experience Specialist",
  "Building High-End Websites & Portals",
  "Open for Freelance Projects & Remote Job"
];

function HeroSection() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];
    if (charIndex < current.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + current[charIndex]);
        setCharIndex(charIndex + 1);
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setRoleIndex((roleIndex + 1) % roles.length);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, roleIndex]);

  const containerVars = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.4 } 
    }
  };

  const itemVars = {
    initial: { opacity: 0, y: 30, x: -20 },
    whileInView: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  };

  return (
    // YAHAN SE HEIGHT CONTROL HO RAHI HAI: 
    // min-h-[78vh] use kiya hai taake screen thori aur fill ho jaye.
    <div className="relative p-[4px] overflow-hidden rounded-6xl mt-8 lg:mt-4 min-h-[74vh] flex items-center">
      
      {/* Moving Border Animation */}
      <div 
        className="absolute inset-[-500%] animate-[spin_5s_linear_infinite] opacity-80"
        style={{
          background: "conic-gradient(from 360deg, #16f2b3, #ff0055, #7000ff, #00fbff, #16f2b3)",
          animationDirection: "reverse"
        }}
      ></div>

      {/* SECTION PADDING: 
          py-8 (mobile) aur lg:py-16 (desktop) se section ke andar ki height barh rahi hai. */}
      <section className="relative z-10 w-full flex flex-col items-center justify-between py-8 lg:py-16 bg-[#050816] rounded-[22px] px-4 md:px-8 lg:px-8 overflow-hidden">
        
        {/* GEOMETRIC PLEXUS BACKGROUND */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="line_grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#16f2b3" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#7000ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00fbff" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <g className="animate-pulse duration-[5s]">
              <path d="M150 100 L300 50 L500 80 L650 150 L450 350 L200 300 Z" stroke="url(#line_grad)" strokeWidth="0.8" />
              <line x1="300" y1="50" x2="450" y2="200" stroke="url(#line_grad)" strokeWidth="0.5" />
              <line x1="150" y1="100" x2="450" y2="200" stroke="url(#line_grad)" strokeWidth="0.5" />
              <line x1="500" y1="80" x2="450" y2="200" stroke="url(#line_grad)" strokeWidth="0.5" />
              <line x1="650" y1="150" x2="450" y2="200" stroke="url(#line_grad)" strokeWidth="0.5" />
              <line x1="200" y1="300" x2="450" y2="200" stroke="url(#line_grad)" strokeWidth="0.5" />
            </g>
            <g>
              <circle cx="150" cy="100" r="3" fill="#16f2b3" className="animate-pulse" />
              <circle cx="300" cy="50" r="2.5" fill="#00fbff" />
              <circle cx="500" cy="80" r="3" fill="#7000ff" />
              <circle cx="650" cy="150" r="3" fill="#ff0055" />
              <circle cx="450" cy="200" r="4" fill="#16f2b3">
                 <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="200" cy="300" r="2.5" fill="#00fbff" />
              <circle cx="450" cy="350" r="3" fill="#7000ff" />
            </g>
          </svg>
        </div>

        <Image
          src="/hero.svg"
          alt="Hero"
          width={1572}
          height={795}
          className="absolute -top-[98px] -z-10 opacity-40"
        />

        <motion.div 
          variants={containerVars}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: false, amount: 0.2 }} 
          className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8 w-full relative z-10"
        >
          {/* LEFT Content */}
          <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2">
            <motion.div variants={itemVars} className="mb-6 flex items-center gap-2 px-3 py-1 rounded-full border border-[#16f2b3]/30 bg-[#16f2b3]/10 w-fit backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16f2b3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16f2b3]"></span>
              </span>
              <span className="text-[#16f2b3] text-xs font-medium uppercase tracking-wider">
                Available for New Projects
              </span>
            </motion.div>

            <motion.h1 variants={itemVars} className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
              Hello, <br />
              This is <span className="text-pink-500">{personalData.name}</span>
            </motion.h1>

            <motion.h2 variants={itemVars} className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
              I'm a Professional
            </motion.h2>

            <motion.h2 variants={itemVars} className="mt-3 text-cyan-400 text-xl md:text-2xl font-semibold min-h-[42px] drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]">
              {text}<span className="animate-pulse">|</span>
            </motion.h2>

            <motion.div variants={itemVars} className="my-6 flex items-center gap-5">
              {[
                { Icon: BsGithub, link: personalData.github },
                { Icon: BsLinkedin, link: personalData.linkedIn },
                { Icon: SiDevdotto, link: `https://dev.to/${personalData.devUsername}`, size: 40 },
                { Icon: BsTwitter, link: personalData.twitter }
              ].map((social, i) => (
                <motion.div key={i} whileHover={{ scale: 1.3, y: -5 }} whileTap={{ scale: 0.9 }}>
                  <Link href={social.link} target="_blank" className="transition-all text-pink-500 hover:text-cyan-400 duration-300">
                    <social.Icon size={social.size || 30} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVars} className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#contact" className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full flex">
                  <button className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-[#ffff] flex items-center gap-1 hover:gap-3 transition-all">
                    <span>Contact me</span>
                    <RiContactsFill size={16} />
                  </button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#projects" className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white transition-all duration-200 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                  <span>View My Work</span>
                  <FaArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT SIDE CARD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1, 
              x: 0,
            }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-1 lg:order-2 w-full max-w-xl mx-auto"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-[#0d1224]/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]"></span>
                      <span className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span>
                    </div>
                    <span className="text-gray-500 text-xs tracking-wider">developer.js</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
                    <span className="text-emerald-400 text-xs font-medium">Live</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <code className="font-mono text-xs md:text-sm text-gray-200 leading-relaxed">
                    <div><span className="text-pink-500">const</span> <span className="text-white">developer</span> <span className="text-pink-500">=</span> <span className="text-gray-400">{"{"}</span></div>
                    <div className="ml-4"><span className="text-white">name:</span> <span className="text-amber-300">'Umaar Ahmed',</span></div>
                    <div className="ml-4"><span className="text-white">builds:</span> <span className="text-gray-400">[</span></div>
                    <div className="ml-8 text-amber-300">'Websites', 'WebApps', 'MobileApps', 'Scalable-APIs'</div>
                    <div className="ml-4 text-gray-400">],</div>
                    <div className="ml-4">
                      <span className="text-white">expertise:</span> <span className="text-gray-400">[</span>
                      <div className="ml-8 text-amber-300">'Full-Stack Engineering','Architecture & System Design','API Integration','Database Management','UI/UX Design','Technical Customer Support'</div>
                      <div className="ml-4 text-gray-400">],</div>
                    </div>
                    <div className="ml-4">
                      <span className="text-white">skills:</span> <span className="text-gray-400">[</span>
                      <div className="ml-8">
                        <span className="text-amber-300">
                        'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'MongoDB', 'Redux', 'Tailwind', 'Github'
                        </span>
                        <span className="text-gray-400">],</span>
                      </div>
                    </div>
                    <div className="ml-4"><span className="text-white">problemSolver:</span> <span className="text-orange-400">true,</span></div>
                    <div className="ml-4"><span className="text-white">customerCentric:</span> <span className="text-orange-400">true,</span></div>
                    <div className="ml-4"><span className="text-white">responsiveDesign:</span> <span className="text-orange-400">true,</span></div>
                    <div><span className="text-gray-400">{"}"}</span></div>
                  </code>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default HeroSection;