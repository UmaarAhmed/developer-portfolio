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
      <div className="sticky top-20 z-[60] mb-8 flex justify-center py-2 md:top-24 lg:mb-16">
        <div className="group relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 opacity-40 blur" />
          <div className="relative flex items-center gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-6 py-2 shadow-[var(--shadow-card)] backdrop-blur-md md:px-8 md:py-3">
            <span className="h-[2px] w-8 rounded-full bg-cyan-500 md:w-10" />
            <span className="text-xl font-black uppercase italic tracking-widest text-[var(--ink)] md:text-3xl">
              Projects
            </span>
            <span className="h-[2px] w-8 rounded-full bg-cyan-500 md:w-10" />
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
              zIndex: index + 10,
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
              <div className="absolute -inset-1 rounded-[1.5rem] bg-gradient-to-r from-cyan-600/15 to-emerald-600/15 blur-xl md:rounded-[2rem]" />

              {/* Card Container */}
              <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-card)] transition-all duration-500 group-hover:border-cyan-500/40 md:rounded-[2rem]">
                {/* Subtle Internal Decor */}
                <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/5 blur-[60px]" />

                {/* Project Card Content (Padding reduced) */}
                <div className="p-1 md:p-3">
                  <ProjectCard project={project} />
                </div>

                {/* VIP Bottom Accent Line */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              </div>

              {/* Numbering Decor - Visible only on Desktop */}
              <div className="absolute -left-10 top-8 hidden xl:block">
                <span className="select-none text-5xl font-black italic text-[var(--ink)] opacity-10">
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