"use client";

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experienceLottie from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import { motion } from "framer-motion";

function Experience() {
  return (
    <div id="experience" className="relative z-50 my-12 lg:my-24 px-4 max-w-[1250px] mx-auto">
      
      {/* --- PREMIUM BACKGROUND --- */}
      <div className="absolute top-0 -z-10 w-full h-full opacity-10 pointer-events-none">
        <Image src="/section.svg" alt="Background" width={1572} height={795} className="absolute top-0" />
      </div>

      {/* --- SECTION TITLE --- */}
      <div className="mb-12 flex justify-center lg:mb-20">
        <div className="group relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-500 via-yellow-500 to-emerald-500 opacity-30 blur transition-opacity duration-1000 group-hover:opacity-100" />
          <div className="relative flex items-center gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-3 shadow-[var(--shadow-card)] sm:px-8">
            <span className="h-[2px] w-8 rounded-full bg-yellow-500 sm:w-10" />
            <span className="text-xl font-black uppercase italic tracking-widest text-[var(--ink)] md:text-3xl">
              Experience
            </span>
            <span className="h-[2px] w-8 rounded-full bg-yellow-500 sm:w-10" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        {/* --- LEFT SIDE: ANIMATION --- */}
        <div className="mb-10 flex justify-center lg:sticky lg:top-40 lg:col-span-5 lg:mb-0">
          <div className="relative flex aspect-square w-full max-w-[350px] items-center justify-center">
            <div className="absolute h-[80%] w-[80%] rounded-full bg-yellow-500/10 blur-[60px]" />
            <div className="absolute h-full w-full rounded-full border-2 border-yellow-500/20 bg-transparent" />
            <div className="relative z-10 w-[130%] drop-shadow-[0_0_20px_rgba(234,179,8,0.2)]">
              <AnimationLottie animationPath={experienceLottie} />
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: CARDS --- */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 rounded-[1.8rem] bg-gradient-to-r from-emerald-500/10 via-yellow-500/10 to-emerald-500/10 blur-xl" />

              <GlowCard identifier={`experience-${experience.id}`}>
                <div className="relative overflow-hidden rounded-[1.8rem] border border-emerald-500/25 bg-[var(--surface)] p-4 transition-all duration-500 hover:border-yellow-500/50 md:p-8">
                  <div className="relative z-10 flex flex-col items-start gap-4 md:flex-row md:gap-5">
                    {/* Icon Container */}
                    <div className="hidden shrink-0 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)] md:block md:p-4">
                      <BsPersonWorkspace size={30} />
                    </div>

                    <div className="flex w-full flex-col gap-2">
                      {/* Title & Duration */}
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <h3 className="text-lg font-black uppercase italic tracking-tight text-[var(--ink)] transition-colors group-hover:text-yellow-500 md:text-2xl">
                          {experience.title}
                        </h3>
                        <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold text-emerald-500 md:text-xs">
                          {experience.duration}
                        </span>
                      </div>

                      {/* Company Name */}
                      <div className="flex items-center gap-3">
                        <span className="h-[2px] w-4 rounded-full bg-yellow-500 md:w-6" />
                        <p className="text-sm font-bold uppercase tracking-wider text-yellow-600 md:text-base">
                          {experience.company}
                        </p>
                      </div>

                      {/* Description */}
                      {experience.description && (
                        <ul className="ml-1 mt-4 space-y-2 border-l border-emerald-500/30 pl-3 md:ml-0 md:pl-4">
                          {experience.description.map((desc, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs leading-relaxed text-[var(--muted)] md:text-sm"
                            >
                              <span className="shrink-0 text-yellow-500">•</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Experience;