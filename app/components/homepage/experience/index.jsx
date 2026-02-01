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
      <div className="flex justify-center mb-12 lg:mb-20">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-yellow-500 to-emerald-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative flex items-center gap-4 bg-[#0d1224] px-8 py-3 rounded-xl border border-white/10 shadow-2xl">
            <span className="w-10 h-[2px] bg-yellow-500 rounded-full"></span>
            <span className="text-white text-2xl md:text-3xl font-black uppercase italic tracking-widest">
              Experience
            </span>
            <span className="w-10 h-[2px] bg-yellow-500 rounded-full"></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* --- LEFT SIDE: COMPACT CIRCLE (Education Size) --- */}
        <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-40 mb-10 lg:mb-0">
          {/* max-w-[350px] maintains the Education section feel */}
          <div className="relative w-full max-w-[350px] aspect-square flex items-center justify-center">
            
            {/* Outer Faded Blur */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-yellow-500/5 blur-[60px]"></div>
            
            {/* Animated Ring (Education Size) */}
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: ["0 0 15px rgba(234,179,8,0.1)", "0 0 30px rgba(234,179,8,0.2)", "0 0 15px rgba(234,179,8,0.1)"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute w-full h-full rounded-full border-2 border-yellow-500/20 bg-transparent z-0"
            ></motion.div>

            {/* BIG ANIMATION POP-OUT */}
            <div className="relative w-[130%] z-10 drop-shadow-[0_0_20px_rgba(234,179,8,0.2)]">
              <AnimationLottie animationPath={experienceLottie} />
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: CARDS --- */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 via-yellow-500/10 to-emerald-500/10 rounded-[1.8rem] blur-xl opacity-100"></div>

              <GlowCard identifier={`experience-${experience.id}`}>
                <div className="p-5 md:p-8 relative overflow-hidden bg-[#0d1224]/95 backdrop-blur-xl border border-emerald-500/30 rounded-[1.8rem] transition-all duration-500 hover:border-yellow-500/50">
                  
                  <div className="relative z-10 flex items-start gap-5">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="shrink-0 p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                    >
                      <BsPersonWorkspace size={30} />
                    </motion.div>

                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tight group-hover:text-yellow-400 transition-colors">
                          {experience.title}
                        </h3>
                        <span className="text-[10px] md:text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 w-fit">
                          {experience.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="h-[2px] w-6 bg-yellow-500 rounded-full shadow-[0_0_8px_#eab308]"></span>
                        <p className="text-yellow-500 text-sm md:text-base font-bold uppercase tracking-wider">
                          {experience.company}
                        </p>
                      </div>

                      {experience.description && (
                        <ul className="mt-4 space-y-2 border-l border-emerald-500/30 pl-4">
                          {experience.description.map((desc, i) => (
                            <li key={i} className="text-gray-400 text-xs md:text-sm leading-relaxed flex items-start gap-2">
                              <span className="text-yellow-500 mt-1">•</span>
                              {desc}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
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