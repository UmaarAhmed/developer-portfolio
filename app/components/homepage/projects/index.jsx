"use client";
// @flow strict

import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import Image from "next/image";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <div id="projects" className="relative z-50 my-6 lg:my-12 px-4 max-w-[1250px] mx-auto">
      
      {/* --- PREMIUM BACKGROUND --- */}
      <div className="absolute top-0 -z-10 w-full h-full opacity-10 pointer-events-none">
        <Image src="/section.svg" alt="Background" width={1572} height={795} className="absolute top-0" />
      </div>

      {/* --- STICKY SECTION TITLE --- */}
      {/* Mobile pe top-24 rakha hai taaki header se niche rahe */}
      <div className="sticky top-20 md:top-24 z-[60] flex justify-center mb-8 lg:mb-16 py-2">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg blur opacity-40"></div>
          <div className="relative flex items-center gap-4 bg-[#0d1224]/95 px-6 py-2 md:px-8 md:py-3 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md">
            <span className="w-8 md:w-10 h-[2px] bg-cyan-500 rounded-full"></span>
            <span className="text-white text-xl md:text-3xl font-black uppercase italic tracking-widest">
              Projects
            </span>
            <span className="w-8 md:w-10 h-[2px] bg-cyan-500 rounded-full"></span>
          </div>
        </div>
      </div>

      {/* --- STICKY CARDS CONTAINER --- */}
      <div className="relative flex flex-col items-center gap-8 lg:gap-16">
        {projectsData.slice(0, 4).map((project, index) => (
          <div
            key={index}
            id={`sticky-card-${index + 1}`}
            className="sticky w-full max-w-4xl"
            style={{ 
              // Mobile view (top-40 approx) aur Desktop view ke liye balanced top
              top: `calc(120px + ${index * 15}px)`, 
              zIndex: index + 10 
            }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Permanent Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/15 to-emerald-600/15 rounded-[1.5rem] md:rounded-[2rem] blur-xl opacity-100"></div>
              
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-white/10 bg-[#0d1224]/98 backdrop-blur-3xl transition-all duration-500 group-hover:border-cyan-500/40 shadow-2xl">
                
                {/* Subtle Internal Decor */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-[60px]"></div>

                {/* Project Card Content (Padding reduced) */}
                <div className="p-1 md:p-3">
                  <ProjectCard project={project} />
                </div>

                {/* VIP Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_10px_#22d3ee]"></div>
              </div>

              {/* Numbering Decor - Visible only on Desktop */}
              <div className="absolute -left-10 top-8 hidden xl:block">
                <span className="text-5xl font-black text-white/5 italic select-none">
                  0{index + 1}
                </span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Spacing at bottom */}
      <div className="h-20 md:h-32"></div>
    </div>
  );
};

export default Projects;