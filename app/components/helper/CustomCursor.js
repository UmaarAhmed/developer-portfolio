"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [trail, setTrail] = useState([]); 

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);

      const newDot = { 
        x: clientX, 
        y: clientY, 
        id: `${Date.now()}-${Math.random()}` 
      };

      setTrail((prev) => [newDot, ...prev.slice(0, 15)]); 
    };

    const handleHover = (e) => {
      if (e.target.closest("a, button, .group, .cursor-pointer")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  const orbitDots = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden lg:block">
      
      {/* 🌫️ RAINBOW TRAIL */}
      {trail.map((dot) => (
        <motion.div
          key={dot.id}
          initial={{ opacity: 0.8, scale: 1.5 }}
          animate={{ 
            opacity: 0, 
            scale: 0,
            backgroundColor: ["#ec4899", "#8b5cf6", "#06b6d4"] 
          }}
          transition={{ duration: 0.6 }}
          className="fixed w-2 h-2 rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            translateX: "-50%",
            translateY: "-50%",
            boxShadow: "0 0 15px currentColor"
          }}
        />
      ))}

      {/* 🎡 RGB FAST ORBIT (Thick Dots) */}
      <motion.div
        className="fixed pointer-events-none"
        animate={{ 
            rotate: 360, // Speed barha di hai (duration niche check karein)
            width: isHovered ? 100 : 60,
            height: isHovered ? 100 : 60,
        }}
        transition={{ 
            rotate: { repeat: Infinity, duration: 4, ease: "linear" }, // 8s se 4s kar di (Tez rotation)
            width: { type: "spring", stiffness: 200 },
            height: { type: "spring", stiffness: 200 }
        }}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {orbitDots.map((angle, i) => (
          <motion.div
            key={i}
            className="absolute w-3.5 h-3.5 rounded-full" // Size or motta kar diya
            animate={{ 
              scale: isHovered ? [1, 1.4, 1] : [1, 1.1, 1],
              // Auto Color Change: Pink -> Cyan -> Purple -> Yellow
              backgroundColor: ["#ec4899", "#22d3ee", "#a855f7", "#fbbf24", "#ec4899"],
              boxShadow: [
                "0 0 10px #ec4899",
                "0 0 10px #22d3ee",
                "0 0 10px #a855f7",
                "0 0 10px #fbbf24",
                "0 0 10px #ec4899"
              ]
            }}
            transition={{ 
              backgroundColor: { repeat: Infinity, duration: 3, ease: "linear" },
              scale: { repeat: Infinity, duration: 1, delay: i * 0.1 },
              boxShadow: { repeat: Infinity, duration: 3, ease: "linear" }
            }}
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translate(${isHovered ? '50px' : '30px'})`,
            }}
          />
        ))}
      </motion.div>

      {/* 🌑 DYNAMIC GLASS CORE */}
      <motion.div
        className="fixed rounded-full mix-blend-screen"
        animate={{
          width: isHovered ? 75 : 40,
          height: isHovered ? 75 : 40,
          border: ["2px solid #ec4899", "2px solid #22d3ee", "2px solid #ec4899"],
          backgroundColor: ["rgba(236,72,153,0.05)", "rgba(34,211,238,0.05)"]
        }}
        transition={{ repeat: Infinity, duration: 4 }}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          backdropFilter: "blur(2px)"
        }}
      />

      {/* 🎯 PRO LASER CENTER (White Dot) */}
      <motion.div
        className="fixed w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_20px_white]"
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}