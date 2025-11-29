"use client";
// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import { SiDevdotto } from "react-icons/si";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { useEffect, useState } from "react";

// Typing roles
const roles = [
  "Senior React & Next.js Developer",
  "Full-Stack Engineer — TypeScript & JavaScript",
  "Building High-Performance, Scalable Web Applications",
  "Open for Freelance & Remote Job"
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


  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">

        {/* LEFT Content */}
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">

          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
           Hello, <br />
             This is{" "}
             <span className="text-pink-500">{personalData.name}</span>
</h1>
{/* NEW LINE FOR "I'm a Professional" */}
<h2 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
  I'm a Professional
</h2>

{/* NEW LINE FOR TYPEWRITER TEXT */}
<h2 className="mt-2 text-[#16f2b3] text-xl md:text-2xl font-semibold">
  {text}
  <span className="animate-pulse">|</span>
</h2>


          <div className="my-12 flex items-center gap-5">
  {/* GitHub */}
  <Link
    href={personalData.github}
    target="_blank"
    rel="noopener noreferrer"
    className="transition-all text-pink-500 hover:scale-125 duration-300"
    aria-label="GitHub"
  >
    <BsGithub size={30} />
  </Link>

  {/* LinkedIn */}
  <Link
    href={personalData.linkedIn}
    target="_blank"
    rel="noopener noreferrer"
    className="transition-all text-pink-500 hover:scale-125 duration-300"
    aria-label="LinkedIn"
  >
    <BsLinkedin size={30} />
  </Link>

  {/* Dev.to */}
  <Link
    href={`https://dev.to/${personalData.devUsername}`}
    target="_blank"
    rel="noopener noreferrer"
    className="transition-all text-pink-500 hover:scale-125 duration-300"
    aria-label="Dev.to"
  >
    <SiDevdotto size={40} />
  </Link>

  {/* Twitter */}
  <Link
    href={personalData.twitter}
    target="_blank"
    rel="noopener noreferrer"
    className="transition-all text-pink-500 hover:scale-125 duration-300"
    aria-label="Twitter"
  >
    <BsTwitter size={30} />
  </Link>

</div>

          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600"
            >
              <button className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-[#ffff] no-underline transition-all duration-200 ease-out  md:font-semibold flex items-center gap-1 hover:gap-3">
                <span>Contact me</span>
                <RiContactsFill size={16} />
              </button>
            </Link>

            <Link
              href="#projects"
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              role="button"
            >
              <span>View My Work</span>
              <FaArrowRight size={16} />
            </Link>
          </div>
        </div>

 {/* RIGHT SIDE CARD — ORIGINAL HEIGHT, SUPER CLEAN & PRO */}
<div className="order-1 lg:order-2 w-full max-w-xl mx-auto">
  <div className="relative group">

    {/* Animated Gradient Border */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-1000"></div>

    {/* Main Card — Height bilkul pehle jaisi (compact & clean) */}
    <div className="relative bg-[#0d1224]/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-xl p-6 lg:p-8 overflow-hidden hover:border-pink-500/30 transition-all duration-500">

      {/* Header + Available Badge */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
          </div>
          <span className="text-gray-500 text-xs tracking-wider">developer.js</span>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
          <span className="text-emerald-400 text-xs font-medium">Available</span>
        </div>
      </div>

      {/* Tera Original Code — 100% Same */}
      <div className="overflow-x-auto">
        <code className="font-mono text-xs md:text-sm text-gray-200 leading-relaxed">
          <div><span className="text-pink-500">const</span> <span className="text-white">developer</span> <span className="text-pink-500">=</span> <span className="text-gray-400">{"{"}</span></div>
          <div className="ml-4"><span className="text-white">name:</span> <span className="text-amber-300">'Umaar Ahmed',</span></div>
          <div className="ml-4"><span className="text-white">roles:</span> <span className="text-amber-300">[ "Senior React & Next.js Developer", "Full-Stack Engineer — TypeScript & JavaScript", "Building High-Performance, Scalable Web Applications", "Open for Freelance & Remote Job" ],</span></div>
          <div className="ml-4"><span className="text-white">skills:</span> <span className="text-amber-300">[ "React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Firebase", "Git & GitHub" ],</span></div>
          <div className="ml-4"><span className="text-white">hardWorker:</span> <span className="text-orange-400">true,</span></div>
          <div className="ml-4"><span className="text-white">quickLearner:</span> <span className="text-orange-400">true,</span></div>
          <div className="ml-4"><span className="text-white">problemSolver:</span> <span className="text-orange-400">true</span></div>
          <div className="text-gray-400">{"};"}</div>
        </code>
      </div>

      {/* Subtle Gradient Line */}
      <div className="mt-5 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"></div>
    </div>
  </div>
</div>
      </div>
    </section>
  );
}

export default HeroSection;
