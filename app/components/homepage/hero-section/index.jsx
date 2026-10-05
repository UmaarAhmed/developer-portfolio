"use client";
// @flow strict

import { personalData } from "@/utils/data/personal-data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaArrowRight, FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { SiDevdotto } from "react-icons/si";

// Typing roles - Covering Websites, Web Apps, and Customer Experience
const roles = [
  "Full-Stack Software Developer",
  "React & Next.js Expert",
  "Web & Mobile Application Developer",
  "Technical Problem Solver",
  "Customer Support & Experience Specialist",
  "Building High-End Websites & Portals",
  "Open for Freelance Projects & Remote Job",
];

function HeroSection() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setText(current);
      const id = setTimeout(
        () => setRoleIndex((i) => (i + 1) % roles.length),
        3000
      );
      return () => clearTimeout(id);
    }

    if (charIndex < current.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + current[charIndex]);
        setCharIndex(charIndex + 1);
      }, 70);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setText("");
      setCharIndex(0);
      setRoleIndex((roleIndex + 1) % roles.length);
    }, 1400);
    return () => clearTimeout(timeout);
  }, [charIndex, roleIndex]);

  const containerVars = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVars = {
    initial: { opacity: 0, y: 26 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // ── Socials with REAL brand colors ──
  const socials = [
    {
      Icon: BsGithub,
      link: personalData.github,
      label: "GitHub",
      brand: "#181717",
      size: 20,
    },
    {
      Icon: BsLinkedin,
      link: personalData.linkedIn,
      label: "LinkedIn",
      brand: "#0A66C2",
      size: 18,
    },
    {
      Icon: SiDevdotto,
      link: `https://dev.to/${personalData.devUsername}`,
      label: "Dev.to",
      brand: "#0A0A0A",
      size: 16,
    },
    {
      Icon: BsTwitter,
      link: personalData.twitter,
      label: "X",
      brand: "#000000",
      size: 18,
    },
  ];

  // Trust badges below CTA
  const trustBadges = [
    { Icon: FaCheckCircle, label: "Free Consultation" },
    { Icon: FaShieldAlt, label: "Enterprise Ready" },
  ];

  return (
    <section className="relative flex flex-col items-center justify-between pb-4 pt-2 lg:pb-6 lg:pt-4">
      {/* Soft ambient glow behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[min(92vw,900px)] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.07] blur-[120px]"
      />

      <motion.div
        variants={containerVars}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, amount: 0.15 }}
        className="grid w-full grid-cols-1 items-center gap-y-10 lg:grid-cols-2 lg:gap-12"
      >
        {/* LEFT Content */}
        <div className="order-2 flex flex-col items-start justify-center lg:order-1">
          <motion.div
            variants={itemVars}
            className="mb-6 flex w-fit items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)]">
              Available for New Projects
            </span>
          </motion.div>

          <motion.h1
            variants={itemVars}
            className="text-3xl font-bold leading-tight text-[var(--ink)] md:text-4xl lg:text-5xl lg:leading-[1.15]"
          >
            Hello, <br />
            This is{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
              {personalData.name}
            </span>
          </motion.h1>

          <motion.h2
            variants={itemVars}
            className="mt-1 text-3xl font-bold leading-tight text-[var(--ink)] md:text-4xl lg:text-5xl lg:leading-[1.15]"
          >
            I&apos;m a Professional
          </motion.h2>

          {/* Typed role */}
          <motion.h2
            variants={itemVars}
            aria-live="polite"
            className="mt-3 flex min-h-[2.2rem] items-center text-lg font-semibold text-[var(--accent)] sm:text-xl md:text-2xl"
          >
            {text}
            <span className="ml-0.5 animate-pulse">|</span>
          </motion.h2>

          {/* ── SOCIALS — real brand colors + perfect circles ── */}
          <motion.ul
            variants={itemVars}
            className="my-7 flex items-center gap-3 sm:gap-3.5"
          >
            {socials.map(({ Icon, link, label, brand, size }) => (
              <li key={label}>
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ backgroundColor: brand }}
                  className="group grid h-11 w-11 place-items-center rounded-full text-white shadow-md ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-black/20 active:scale-95 dark:ring-white/15"
                >
                  <Icon
                    size={size}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </Link>
              </li>
            ))}
          </motion.ul>

          {/* TWO BUTTONS */}
          <motion.div
            variants={itemVars}
            className="flex w-full max-w-[26rem] flex-col items-stretch gap-3 sm:max-w-sm sm:flex-row sm:items-center sm:gap-4"
          >
            <Link
              href="#contact"
              className="btn-zoom btn-fill-brand inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_10px_24px_-12px_rgba(2,120,87,0.7)] sm:flex-none sm:px-6 sm:py-3 sm:text-[13px]"
            >
              <span>Contact me</span>
              <RiContactsFill size={16} />
            </Link>

            <Link
              href="#projects"
              className="btn-right btn-outline inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[var(--accent-text)] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[var(--accent-text)] sm:flex-none sm:px-6 sm:py-3 sm:text-[13px]"
            >
              <span>View My Work</span>
              <FaArrowRight size={16} />
            </Link>
          </motion.div>

          {/* ── AGENCY CTA CARD — with real GTSolution360 logo ── */}
          <motion.a
            variants={itemVars}
            href={personalData.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order a service on ${personalData.companyShort}`}
            className="group relative mt-6 flex w-full max-w-md items-center gap-4 overflow-hidden rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-3.5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/50 hover:shadow-[var(--shadow-card)] lg:mt-7"
          >
            {/* hover gradient sheen */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--accent)]/0 via-[var(--accent)]/[0.04] to-[var(--accent)]/[0.09] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            {/* LOGO */}
            <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-[var(--line)] bg-white p-1.5 shadow-sm">
              <Image
                src="/logo-gtsol.png"
                alt={`${personalData.companyShort} logo`}
                width={56}
                height={56}
                className="h-full w-full object-contain"
                priority={false}
              />
            </span>

            {/* TEXT */}
            <span className="relative min-w-0 flex-1 text-left">
              <span className="block text-[9.5px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                Agency · {personalData.companyRole}
              </span>
              <span className="mt-0.5 block truncate text-[13.5px] font-bold leading-tight text-[var(--ink)] sm:text-sm">
                Order a service on {personalData.companyShort}
              </span>
              <span className="mt-0.5 block truncate text-[11px] leading-tight text-[var(--muted)] sm:text-xs">
                Web · Mobile · Digital Marketing · Track live
              </span>
            </span>

            {/* ARROW BUTTON */}
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--accent)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white">
              <FaArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </motion.a>
        </div>

        {/* RIGHT SIDE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-1 w-full max-w-xl lg:order-2"
        >
          <div className="group relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 opacity-25 blur-lg transition-opacity duration-700 group-hover:opacity-50" />
            <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)] transition-colors duration-500 group-hover:border-[var(--accent)]/40">
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2" aria-hidden="true">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <span className="font-mono text-xs tracking-wider text-[var(--muted-2)]">
                    developer.js
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
                  <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Live
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <code className="block font-mono text-[11px] leading-relaxed text-[var(--ink-2)] sm:text-xs md:text-sm">
                  <div>
                    <span className="text-pink-600 dark:text-pink-400">
                      const
                    </span>{" "}
                    <span className="text-[var(--ink)]">developer</span>{" "}
                    <span className="text-pink-600 dark:text-pink-400">=</span>{" "}
                    <span className="text-[var(--muted-2)]">{"{"}</span>
                  </div>

                  {/* name */}
                  <div className="ml-4">
                    <span className="text-[var(--ink)]">name:</span>{" "}
                    <span className="text-amber-600 dark:text-amber-300">
                      &apos;{personalData.name}&apos;,
                    </span>
                  </div>

                  {/* CEO role line */}
                  <div className="ml-4">
                    <span className="text-[var(--ink)]">role:</span>{" "}
                    <span className="text-amber-600 dark:text-amber-300">
                      &apos;CEO · {personalData.companyShort}&apos;,
                    </span>
                  </div>

                  <div className="ml-4">
                    <span className="text-[var(--ink)]">builds:</span>{" "}
                    <span className="text-[var(--muted-2)]">[</span>
                  </div>
                  <div className="ml-8 text-amber-600 dark:text-amber-300">
                    &apos;Websites&apos;, &apos;WebApps&apos;,
                    &apos;MobileApps&apos;, &apos;Scalable-APIs&apos;
                  </div>
                  <div className="ml-4 text-[var(--muted-2)]">],</div>

                  <div className="ml-4">
                    <span className="text-[var(--ink)]">expertise:</span>{" "}
                    <span className="text-[var(--muted-2)]">[</span>
                  </div>
                  <div className="ml-8 text-amber-600 dark:text-amber-300">
                    &apos;Full-Stack Engineering&apos;, &apos;Architecture &amp;
                    System Design&apos;, &apos;API Integration&apos;, &apos;Database
                    Management&apos;, &apos;UI/UX Design&apos;, &apos;Technical
                    Customer Support&apos;
                  </div>
                  <div className="ml-4 text-[var(--muted-2)]">],</div>

                  <div className="ml-4">
                    <span className="text-[var(--ink)]">skills:</span>{" "}
                    <span className="text-[var(--muted-2)]">[</span>
                  </div>
                  <div className="ml-8 text-amber-600 dark:text-amber-300">
                    &apos;Next.js&apos;, &apos;TypeScript&apos;, &apos;Node.js&apos;,
                    &apos;PostgreSQL&apos;, &apos;Prisma&apos;, &apos;MongoDB&apos;,
                    &apos;Redux&apos;, &apos;Tailwind&apos;, &apos;GitHub&apos;
                  </div>
                  <div className="ml-4 text-[var(--muted-2)]">],</div>

                  <div className="ml-4">
                    <span className="text-[var(--ink)]">problemSolver:</span>{" "}
                    <span className="text-orange-600 dark:text-orange-300">
                      true,
                    </span>
                  </div>
                  <div className="ml-4">
                    <span className="text-[var(--ink)]">
                      customerCentric:
                    </span>{" "}
                    <span className="text-orange-600 dark:text-orange-300">
                      true,
                    </span>
                  </div>
                  <div className="ml-4">
                    <span className="text-[var(--ink)]">
                      responsiveDesign:
                    </span>{" "}
                    <span className="text-orange-600 dark:text-orange-300">
                      true
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--muted-2)]">{"}"}</span>
                  </div>
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;