"use client";
// @flow strict

import { educations } from "@/utils/data/educations";
import Image from "next/image";
import { HiAcademicCap } from "react-icons/hi";
import lottieFile from '../../../assets/lottie/study.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import { motion } from "framer-motion";

function Education() {
  return (
    <div id="education" className="relative z-50 my-12 lg:my-24 px-4 max-w-[1250px] mx-auto">
      
      {/* --- PREMIUM BACKGROUND --- */}
      <div className="absolute top-0 -z-10 w-full h-full opacity-10 pointer-events-none">
        <Image src="/section.svg" alt="Background" width={1572} height={795} className="absolute top-0" />
      </div>

      <div className="flex justify-center mb-12 lg:mb-20">
        <div className="group relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 opacity-25 blur transition-opacity duration-1000 group-hover:opacity-100" />
          <div className="relative flex items-center gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-3 shadow-[var(--shadow-card)] sm:px-8">
            <span className="h-[2px] w-8 bg-violet-500 rounded-full sm:w-10" />
            <span className="text-xl font-black uppercase italic tracking-widest text-[var(--ink)] md:text-3xl">
              Education
            </span>
            <span className="h-[2px] w-8 bg-violet-500 rounded-full sm:w-10" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* --- LEFT SIDE: ANIMATED LOTTIE --- */}
        <div className="mb-10 flex justify-center lg:sticky lg:top-40 lg:col-span-5 lg:mb-0">
          <div className="relative flex aspect-square w-full max-w-[450px] items-center justify-center">
            <div className="absolute h-[80%] w-[80%] rounded-full bg-blue-500/10 blur-[80px]" />
            <div className="absolute h-[90%] w-[90%] rounded-full border-2 border-violet-500/30 bg-transparent" />
            <div className="relative z-10 w-[85%] drop-shadow-[0_0_25px_rgba(37,99,235,0.35)]">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: GLOW CARDS --- */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {educations.map((education, index) => (
            <motion.div
              key={education.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Permanent Glow Background */}
              <div className="absolute -inset-0.5 rounded-[1.8rem] bg-gradient-to-r from-blue-600/20 to-violet-600/20 blur-xl" />

              <GlowCard identifier={`education-${education.id}`}>
                <div className="relative overflow-hidden rounded-[1.8rem] border border-blue-500/25 bg-[var(--surface)] p-5 transition-all duration-500 group-hover:border-violet-400 md:p-6">
                  <div className="relative z-10 flex items-center gap-5 md:gap-6">
                    {/* Rotating icon */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="shrink-0 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-3 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:border-violet-500/40 group-hover:text-violet-500 md:p-4"
                    >
                      <HiAcademicCap size={30} />
                    </motion.div>

                    <div className="flex min-w-0 flex-col gap-1">
                      <div className="flex flex-col gap-1">
                        <span className="w-fit rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-3 py-1 text-[10px] font-bold text-[var(--accent)] md:text-xs">
                          {education.duration}
                        </span>
                        <h3 className="truncate text-lg font-black uppercase italic tracking-tight text-[var(--ink)] transition-colors group-hover:text-blue-500 md:text-2xl">
                          {education.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="h-[2px] w-6 rounded-full bg-blue-500" />
                        <p className="truncate text-sm font-bold uppercase tracking-wider text-blue-500 md:text-base">
                          {education.institution}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Neon Bottom Line */}
                  <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Education;