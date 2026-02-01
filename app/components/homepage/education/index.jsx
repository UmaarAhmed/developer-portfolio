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

      {/* --- SECTION TITLE (Matching Experience Style) --- */}
      <div className="flex justify-center mb-12 lg:mb-20">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative flex items-center gap-4 bg-[#0d1224] px-8 py-3 rounded-xl border border-white/10 shadow-2xl">
            <span className="w-10 h-[2px] bg-violet-500 rounded-full"></span>
            <span className="text-white text-2xl md:text-3xl font-black uppercase italic tracking-widest">
              Education
            </span>
            <span className="w-10 h-[2px] bg-violet-500 rounded-full"></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* --- LEFT SIDE: ANIMATED GIF/LOTTIE --- */}
        <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-40 mb-10 lg:mb-0">
          <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
            <div className="absolute w-[80%] h-[80%] rounded-full bg-blue-500/5 blur-[80px]"></div>
            <motion.div 
              animate={{ 
                scale: [1, 1.03, 1],
                boxShadow: ["0 0 20px rgba(139,92,246,0.2)", "0 0 40px rgba(139,92,246,0.4)", "0 0 20px rgba(139,92,246,0.2)"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute w-[90%] h-[90%] rounded-full border-2 border-violet-500/30 bg-transparent z-0"
            ></motion.div>
            <div className="relative w-[85%] z-10 drop-shadow-[0_0_25px_rgba(37,99,235,0.4)]">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: COMPACT BLUE GLOW CARDS WITH ROTATING ICONS --- */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {educations.map((education, index) => (
            <motion.div
              key={education.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Permanent Glow Background */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/25 to-violet-600/25 rounded-[1.8rem] blur-xl opacity-100 transition-all duration-500 group-hover:blur-2xl"></div>

              <GlowCard identifier={`education-${education.id}`}>
                <div className="p-5 md:p-6 relative overflow-hidden bg-[#0d1224]/90 backdrop-blur-xl border border-blue-500/30 rounded-[1.8rem] transition-all duration-500 group-hover:border-violet-400">
                  
                  <div className="relative z-10 flex items-center gap-6">
                    {/* --- PRO ROTATING ICON --- */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                      className="shrink-0 p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:text-violet-400 group-hover:border-violet-500/40"
                    >
                      <HiAcademicCap size={32} />
                    </motion.div>

                    <div className="flex flex-col gap-1 overflow-hidden">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] md:text-xs font-bold text-[#16f2b3] bg-[#16f2b3]/10 px-3 py-1 rounded-full border border-[#16f2b3]/20 w-fit">
                          {education.duration}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tight group-hover:text-blue-400 transition-colors mt-1 truncate">
                          {education.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="h-[2px] w-6 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"></span>
                        <p className="text-blue-400 text-sm md:text-base font-bold uppercase tracking-wider truncate">
                          {education.institution}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Neon Bottom Line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_10px_#3b82f6]"></div>
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