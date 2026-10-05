"use client";
// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";

function AboutSection() {
  const [isTapped, setIsTapped] = useState(false);

  // Trust badges (same as hero)
  const trustBadges = [
    { Icon: FaCheckCircle, label: "Free Consultation" },
    { Icon: FaShieldAlt, label: "Enterprise Ready" },
  ];

  return (
    <div
      id="about"
      className="relative my-6 overflow-hidden py-8 lg:my-8 lg:py-25"
    >
      {/* Background Decorative Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8rem] top-[10%] h-[300px] w-[300px] rounded-full bg-[var(--accent)] opacity-[0.035] blur-[100px] lg:h-[500px] lg:w-[500px] lg:blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] left-[-6rem] h-[300px] w-[300px] rounded-full bg-[var(--accent-2)] opacity-[0.03] blur-[100px] lg:h-[400px] lg:w-[400px] lg:blur-[120px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[92rem] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-16">
          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 flex w-full justify-center lg:order-2 lg:w-2/5 lg:justify-end"
          >
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-10">
              <button
                type="button"
                onClick={() => setIsTapped(!isTapped)}
                aria-label="Toggle profile photo colour"
                className="group relative cursor-pointer"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-[0.12] blur-[40px] transition-opacity duration-700 group-hover:opacity-[0.25] lg:blur-[50px]"
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative z-10 rounded-[2rem] bg-gradient-to-tr from-[var(--accent)] via-transparent to-[var(--accent)]/30 p-[2px] shadow-[var(--shadow-card)]"
                >
                  <div className="relative aspect-square w-[220px] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] sm:w-[260px] lg:w-[320px]">
                    <Image
                      src={personalData.profile}
                      fill
                      alt={personalData.name}
                      sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 320px"
                      className={`object-cover transition-all duration-700 ${
                        isTapped
                          ? "scale-105 grayscale-0"
                          : "grayscale group-hover:scale-105 group-hover:grayscale-0"
                      }`}
                    />
                  </div>
                </motion.div>

                {/* Years Exp Tag */}
                <div className="absolute -bottom-3 -left-3 z-20 rounded-xl border border-[var(--accent)]/30 bg-[var(--surface)] p-3 shadow-[var(--shadow-card)] lg:-bottom-4 lg:-left-4 lg:rounded-2xl lg:p-4">
                  <p className="text-xl font-black leading-none text-[var(--accent)] lg:text-3xl">
                    4+
                  </p>
                  <p className="mt-0.5 text-[7px] font-bold uppercase tracking-widest text-[var(--muted)] lg:mt-1 lg:text-[8px]">
                    Years Exp.
                  </p>
                </div>
              </button>

              {/* ABOUT ME Label */}
              <div className="flex flex-row items-center lg:flex-col lg:pt-6">
                <div className="rounded-full border border-[var(--accent)]/30 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-6 py-2 shadow-lg lg:rounded-xl lg:px-4 lg:py-8">
                  <p className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.3em] text-white lg:text-[15px] lg:tracking-[0.4em] lg:[writing-mode:vertical-lr]">
                    ABOUT ME
                  </p>
                </div>
                <div className="mt-2 hidden h-24 w-[3px] bg-gradient-to-b from-[var(--accent)] to-transparent lg:block" />
              </div>
            </div>
          </motion.div>

          {/* CONTENT SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 flex w-full flex-col items-center gap-4 text-center lg:order-1 lg:w-3/5 lg:items-start lg:text-left"
          >
            {/* Professional Arsenal Tag */}
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-orange-400" />
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--ink)] lg:text-[10px] lg:tracking-[0.3em]">
                Professional Arsenal
              </p>
              <div className="h-px w-8 bg-orange-400 lg:hidden" />
            </div>

            {/* Heading */}
            <h2 className="flex flex-wrap items-center justify-center gap-x-3 text-3xl font-black uppercase leading-tight tracking-[-0.05em] text-[var(--ink)] md:text-5xl lg:justify-start lg:text-6xl">
              <span className="bg-gradient-to-r from-[var(--ink)] to-[var(--ink-2)] bg-clip-text text-transparent">
                WHO-
              </span>
              <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent)] bg-clip-text text-transparent">
                I-AM?
              </span>
            </h2>

            {/* ── DESCRIPTION — 2 clean paragraphs + real clickable link ── */}
            <div className="relative mt-2 w-full max-w-2xl px-2 lg:px-0">
              {/* subtle left accent rule (desktop only) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-5 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent)]/40 to-transparent lg:block"
              />

              <div className="space-y-4 text-left">
                {/* Paragraph 1 — about me */}
                <p className="text-sm font-normal leading-relaxed text-[var(--body-text)] md:text-[15px] lg:text-[16.5px] lg:leading-[1.75]">
                  {personalData.description}
                </p>

                {/* Paragraph 2 — about the agency + clickable link */}
                <p className="text-sm font-normal leading-relaxed text-[var(--body-text)] md:text-[15px] lg:text-[16.5px] lg:leading-[1.75]">
                  {personalData.companyDescription}{" "}
                  <a
                    href={personalData.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-baseline gap-1 font-semibold text-[var(--accent)] decoration-[var(--accent)]/40 decoration-2 underline-offset-4 transition-colors hover:decoration-[var(--accent)] hover:underline"
                  >
                    Visit gtsol360.com
                    <svg
                      className="h-3.5 w-3.5 translate-y-[1px] transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </a>
                </p>
              </div>
            </div>

            {/* ── TRUST BADGES (View Resume ke upar) ── */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-6 lg:justify-start">
              {trustBadges.map(({ Icon, label }, i) => (
                <div key={label} className="flex items-center gap-3">
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-6 w-px bg-[var(--line-strong)] sm:block"
                    />
                  )}
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]">
                      <Icon size={14} />
                    </span>
                    <span className="text-[12.5px] font-semibold tracking-wide text-[var(--body-text)] sm:text-[13.5px]">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* SINGLE BUTTON → bottom-to-top sheen on hover */}
            <div className="mt-2">
              <a
                href={personalData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-up btn-fill-brand inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 font-bold uppercase text-white shadow-[0_12px_28px_-12px_rgba(2,120,87,0.75)] lg:px-9"
              >
                <span className="relative z-[1] text-[10px] tracking-[0.2em] lg:text-[12px]">
                  View Resume
                </span>
                <svg
                  className="relative z-[1] h-4 w-4 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;