"use client";

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaTools, FaStar, FaTerminal, FaFingerprint, FaChevronLeft, FaChevronRight, FaMicrochip } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";

function Skills() {
  const categories = [
    { title: "Frontend", icon: <FaCode />, color: "#fb923c" },
    { title: "Backend", icon: <FaServer />, color: "#22d3ee" },
    { title: "Databases", icon: <FaDatabase />, color: "#34d399" },
    { title: "DevOps", icon: <FaTools />, color: "#a78bfa" }
  ];

  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  // ⭐ DRAG LOGIC
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => { isDown.current = false; };
  const handleMouseUp = () => { isDown.current = false; };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.5; 
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleOnScroll = () => {
    setIsScrolling(true);
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => setIsScrolling(false), 1000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [categories.length]);

  return (
    <div id="skills" className="relative z-50 my-8 lg:my-20 max-w-[1400px] mx-auto px-4 lg:px-10 overflow-hidden select-none">
      
      {/* HEADER */}
      <div className="flex flex-col items-center mb-10 lg:mb-14 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="h-px w-8 bg-[#16f2b3]"></span>
          <p className="text-[#16f2b3] font-bold uppercase tracking-[0.3em] text-[10px]">Technical Proficiency</p>
          <span className="h-px w-8 bg-[#16f2b3]"></span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-[#16f2b3]">Arsenal</span>
        </h2>
      </div>

      {/* TOP SCROLLING SKILLS */}
      <div className="relative mb-12 lg:mb-16 group/scroll px-2 sm:px-0">
        <button onClick={() => scroll('left')} className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-40 h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-[#16f2b3] hover:scale-110 active:scale-90 transition-all cursor-pointer">
          <FaChevronLeft size={14} />
        </button>

        <div ref={scrollContainerRef} onScroll={handleOnScroll} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className="flex overflow-x-auto no-scrollbar scroll-smooth px-12 sm:px-16 py-4 cursor-grab active:cursor-grabbing snap-x snap-proximity">
          <div className="flex gap-6 lg:gap-12 flex-nowrap">
            {skillsData.map((skill, id) => (
              <div className="flex flex-col items-center gap-2 group/item flex-shrink-0 snap-center pointer-events-none" key={id}>
                <div className="h-14 w-14 lg:h-16 lg:w-16 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center relative z-10 transition-all group-hover/item:border-[#16f2b3]/40">
                  <Image src={skillsImage(skill)?.src} alt={skill} width={32} height={32} className="h-7 lg:h-8 w-auto filter brightness-110" />
                </div>
                <p className="text-white/30 text-[8px] font-bold uppercase tracking-widest">{skill}</p>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => scroll('right')} className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-40 h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-[#16f2b3] hover:scale-110 active:scale-90 transition-all cursor-pointer">
          <FaChevronRight size={14} />
        </button>
      </div>

      {/* CARDS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
        
        {/* LEFT CARD */}
        <div className="lg:col-span-5 relative group overflow-hidden rounded-3xl">
          <div className="absolute -inset-[2px] bg-gradient-to-br from-[#16f2b3] via-transparent to-violet-500 opacity-20 group-hover:opacity-100 transition duration-1000 blur-sm"></div>
          
          <div className="relative h-full bg-[#0d1224]/90 border border-white/10 p-6 lg:p-8 flex flex-col justify-between min-h-[350px]">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none transform rotate-12 scale-125 group-hover:text-[#16f2b3] transition-all duration-700">
              <FaFingerprint size={150} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#16f2b3]/5 border border-[#16f2b3]/20 w-fit">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#16f2b3] shadow-[0_0_8px_#16f2b3] animate-pulse"></span>
                <span className="text-[#16f2b3] text-[9px] font-bold uppercase tracking-[0.2em]">Verified Architecture</span>
              </div>
              
              <h3 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-[1.1] tracking-tight"> 
                Mastering <br/> High-Load <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] to-cyan-400">Stacks.</span>
              </h3>
              <p className="text-white/40 text-[13px] leading-relaxed max-w-[280px] border-l border-[#16f2b3]/30 pl-4 italic"> 
                "Architecting digital ecosystems where performance meets absolute reliability." 
              </p>
            </div>

            <div className="mt-6 relative z-10 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <div className="flex flex-col">
                   <span className="text-[9px] text-white/30 uppercase font-bold tracking-widest">Efficiency Index</span>
                   <span className="text-3xl font-mono font-bold text-white group-hover:text-[#16f2b3] transition-colors">0.99<span className="text-[#16f2b3] text-sm">ms</span></span>
                </div>
                <FaStar className="text-[#16f2b3]/40 animate-spin-slow" />
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '95%' }} transition={{ duration: 1.5 }} className="h-full bg-gradient-to-r from-[#16f2b3] to-violet-500 shadow-[0_0_8px_#16f2b3]" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD - UPGRADED DESIGN */}
        <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden">
          <div className="absolute -inset-[1px] bg-gradient-to-tr from-violet-500/20 via-transparent to-[#16f2b3]/20 opacity-50"></div>
          
          <div className="bg-[#0d1224]/90 border border-white/10 backdrop-blur-3xl h-full flex flex-col min-h-[350px]">
            
            {/* TABS */}
            <div className="flex p-1.5 gap-1 bg-white/[0.03] border-b border-white/5">
              {categories.map((cat, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`relative flex-1 py-3 px-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all duration-500 ${activeTab === i ? 'text-[#0d1224]' : 'text-white/40 hover:text-white/60'}`}
                >
                  {activeTab === i && (
                    <motion.div layoutId="activeTabGlow" className="absolute inset-0 bg-[#16f2b3] rounded-lg shadow-[0_0_15px_rgba(22,242,179,0.4)]" />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-xs">{cat.icon}</span>
                    <span className="hidden sm:inline">{cat.title}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="p-6 lg:p-8 flex-grow flex flex-col relative overflow-hidden">
              
              {/* SIDE DECORATION (Fill Right Empty Space) */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-20 pointer-events-none hidden md:flex">
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[7px] text-white/50 font-mono">LATENCY_CORE</span>
                    <div className="w-12 h-[1px] bg-gradient-to-l from-[#16f2b3] to-transparent"></div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[7px] text-white/50 font-mono">BIT_RATE_V3</span>
                    <div className="w-16 h-[1px] bg-gradient-to-l from-violet-500 to-transparent"></div>
                </div>
              </div>

              {/* GRID AREA */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab} 
                  initial={{ opacity: 0, scale: 0.98 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 1.02 }} 
                  className="grid grid-cols-2 gap-y-8 gap-x-6 lg:gap-x-12 relative z-10 mb-10"
                >
                  {skillsData.slice(activeTab * 6, (activeTab + 1) * 6).map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-3 group/skill">
                      <div className="h-10 w-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/skill:border-[#16f2b3]/60 group-hover/skill:shadow-[0_0_15px_rgba(22,242,179,0.15)]">
                        <Image src={skillsImage(skill)?.src} alt="" width={24} height={24} className="group-hover/skill:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <p className="text-white/90 text-[13px] font-bold truncate mb-1 group-hover/skill:text-[#16f2b3] transition-colors">{skill}</p>
                        <div className="flex gap-1">
                           {[1,2,3,4].map(i => (
                             <div key={i} className={`h-1 w-3.5 rounded-full transition-colors ${i <= 3 ? 'bg-[#16f2b3]' : 'bg-white/10'}`}></div>
                           ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* BOTTOM SYSTEM STATS (Fill Bottom Empty Space) */}
              <div className="mt-auto grid grid-cols-3 gap-4 pt-6 border-t border-white/5 relative z-10">
                <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-white/20 font-bold uppercase tracking-tighter">Memory Load</span>
                    <div className="flex items-center gap-2">
                        <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div animate={{ width: ["20%", "45%", "30%"] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-[#16f2b3]/40" />
                        </div>
                        <span className="text-[9px] font-mono text-[#16f2b3]/60">32%</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[8px] text-white/20 font-bold uppercase tracking-tighter">Uptime</span>
                    <span className="text-[10px] font-mono text-white/60">99.998%</span>
                </div>
                <div className="flex flex-col gap-1 items-end">
                    <span className="text-[8px] text-white/20 font-bold uppercase tracking-tighter">Core Encryption</span>
                    <span className="text-[9px] font-mono text-[#16f2b3] animate-pulse">AES-256</span>
                </div>
              </div>

              {/* WATERMARK */}
              <div className="absolute right-[-20px] bottom-[-20px] text-[150px] text-white/[0.01] pointer-events-none transform -rotate-12">
                <FaMicrochip />
              </div>

              {/* FOOTER BAR */}
              <div className="mt-6 flex items-center justify-between font-mono text-[9px] tracking-widest uppercase">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#16f2b3] shadow-[0_0_8px_#16f2b3]"></div>
                  <span className="text-white/40">SYSTEM: <span className="text-[#16f2b3]">OPTIMIZED</span></span>
                </div>
                <div className="text-white/10 tracking-[0.4em] hidden sm:block">
                    {categories[activeTab].title}_V2.0.4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Skills;