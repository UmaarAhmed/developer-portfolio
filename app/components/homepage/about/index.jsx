"use client";
// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { motion } from "framer-motion"; 
import { useState } from "react";

function AboutSection() {
  const [isTapped, setIsTapped] = useState(false);

  return (
    <div id="about" className="relative my-12 lg:my-24 py-12 overflow-hidden min-h-screen flex items-center">
      {/* Background Decorative Glow */}
      <div className="absolute top-[10%] -right-20 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-[#16f2b3] opacity-[0.05] blur-[100px] lg:blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] -left-20 w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-cyan-500 opacity-[0.03] blur-[100px] lg:blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* IMAGE SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-2/5 flex justify-center lg:justify-end relative order-1 lg:order-2"
          >
            <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10">
              <div 
                className="relative group cursor-pointer"
                onClick={() => setIsTapped(!isTapped)}
              >
                <div className="absolute inset-0 bg-[#16f2b3] opacity-[0.12] blur-[40px] lg:blur-[50px] rounded-full group-hover:opacity-[0.25] transition-all duration-700"></div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative z-10 p-[2px] rounded-[2rem] bg-gradient-to-tr from-[#16f2b3] via-transparent to-[#16f2b3]/30 shadow-2xl"
                >
                  <div className="bg-[#0d1224] rounded-[2rem] overflow-hidden w-[240px] md:w-[280px] lg:w-[320px] aspect-square relative border border-white/10">
                    <Image
                      src={personalData.profile}
                      fill
                      alt="Umaar Ahmed"
                      className={`object-cover transition-all duration-700 ${isTapped ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'}`}
                    />
                  </div>
                </motion.div>

                {/* Years Exp Tag */}
                <div className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 bg-[#0d1224] border border-[#16f2b3]/30 p-3 lg:p-4 rounded-xl lg:rounded-2xl shadow-2xl z-20">
                  <p className="text-[#16f2b3] font-black text-xl lg:text-3xl leading-none">4+</p>
                  <p className="text-white text-[7px] lg:text-[8px] font-bold uppercase tracking-widest mt-0.5 lg:mt-1 opacity-80">Years Exp.</p>
                </div>
              </div>

              {/* ABOUT ME Label */}
              <div className="flex flex-row lg:flex-col items-center lg:pt-6">
                <div className="bg-gradient-to-r lg:bg-gradient-to-b from-[#14DEA5] to-[#162559] px-6 lg:px-4 py-2 lg:py-8 rounded-full lg:rounded-xl border border-[#16f2b3]/30 shadow-lg">
                  <p className="text-white font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-[10px] lg:text-[15px] lg:[writing-mode:vertical-lr] whitespace-nowrap">
                    ABOUT ME
                  </p>
                </div>
                <div className="hidden lg:block w-[3px] h-24 bg-gradient-to-b from-[#16f2b3] via-[#16f2b3]/50 to-transparent mt-2"></div>
              </div>
            </div>
          </motion.div>

          {/* CONTENT SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-3/5 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
          >
            {/* Professional Arsenal Tag */}
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-8 bg-orange-400"></div>
              <p className="text-white/90 font-bold uppercase tracking-[0.2em] lg:tracking-[0.3em] text-[8px] lg:text-[10px]">
                Professional Arsenal
              </p>
              <div className="h-[1px] w-8 bg-orange-400 lg:hidden"></div>
            </div>

            {/* Heading - Single Line on Desktop */}
            <h2 className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-x-3 text-3xl md:text-5xl lg:text-6xl font-[1000] text-white leading-tight uppercase tracking-[-0.05em] whitespace-nowrap">
              <span>WHO-</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] via-cyan-400 to-emerald-500">
                I-AM?
              </span>
            </h2>

            {/* Description - Padding reduced */}
            <p className="text-gray-400 text-xs md:text-sm lg:text-base leading-relaxed max-w-xl font-light px-2 lg:px-0">
              {personalData.description}
            </p>

            {/* Updated Compact Button with Laptop Border Fix */}
            <div className="mt-4">
              <motion.a
                href={personalData.resume}
                target="_blank"
                whileHover={{ 
                  y: -3,
                  scale: 1.02,
                  boxShadow: "0px 10px 25px rgba(22, 242, 179, 0.2)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="
                  group relative px-6 lg:px-8 py-3 lg:py-3.5 rounded-full inline-flex items-center gap-3 overflow-hidden transition-all duration-300
                  /* Mobile: Solid background, No border */
                  bg-[#16f2b3] text-[#0d1224] border-0
                  /* Laptop/Desktop: Clear Border and Hover Fill */
                  lg:bg-transparent lg:text-[#16f2b3] lg:border-2 lg:border-solid lg:border-[#16f2b3]
                "
              >
                {/* Desktop Hover Fill Effect */}
                <div className="hidden lg:block absolute inset-0 w-full h-full bg-[#16f2b3] translate-y-[101%] group-hover:translate-y-[0%] transition-transform duration-400 ease-out z-0"></div>

                {/* Button Text */}
                <span className="relative z-10 font-bold uppercase text-[10px] lg:text-[12px] tracking-[0.2em] lg:group-hover:text-[#0d1224] transition-colors duration-300">
                  View Resume
                </span>

                {/* Arrow Icon */}
                <svg 
                  className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 lg:group-hover:text-[#0d1224]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default AboutSection;