"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/**
 * PERFORMANCE-CRITICAL
 *
 * The original called `setState` on EVERY mousemove, re-rendering 16
 * framer-motion nodes at pointer frequency — a major cause of lag.
 *
 * Fix: the trail is driven by plain DOM nodes through a ref (zero React
 * work) sampled at ~20fps, and hover only re-renders on an actual change.
 */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const trailHostRef = useRef(null);
  const lastSample = useRef(0);

  useEffect(() => {
    // Respect reduced-motion and touch-only devices
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;

    setMounted(true);

    const TRAIL_LEN = 8;
    const SAMPLE_MS = 45;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);

      const now = performance.now();
      if (now - lastSample.current < SAMPLE_MS) return;
      lastSample.current = now;

      const host = trailHostRef.current;
      if (!host) return;

      if (host.children.length < TRAIL_LEN) {
        for (let i = 0; i < TRAIL_LEN; i++) {
          const d = document.createElement("span");
          d.className = "cursor-trail-dot";
          host.appendChild(d);
        }
      }

      const dots = host.children;
      for (let i = 0; i < TRAIL_LEN; i++) {
        const dot = dots[i];
        if (!dot) continue;
        const size = Math.max(4, 12 - i * 1.2);
        dot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        dot.style.opacity = String((1 - i / TRAIL_LEN) * 0.55);
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
      }
    };

    let hovered = false;
    const handleHover = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const next = !!target.closest(
        "a, button, input, textarea, .group, .cursor-pointer"
      );
      if (next !== hovered) {
        hovered = next;
        setIsHovered(next);
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleHover, { passive: true });
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  const orbitDots = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] hidden lg:block">
      {/* 🌫️ RAINBOW TRAIL — plain DOM, no React re-render */}
      <div ref={trailHostRef} className="pointer-events-none fixed inset-0" />

      {/* 🎡 RGB FAST ORBIT */}
      <motion.div
        className="pointer-events-none fixed"
        animate={{
          rotate: 360,
          width: isHovered ? 100 : 60,
          height: isHovered ? 100 : 60,
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 4, ease: "linear" },
          width: { type: "spring", stiffness: 200 },
          height: { type: "spring", stiffness: 200 },
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
            className="absolute h-3.5 w-3.5 rounded-full"
            animate={{
              scale: isHovered ? [1, 1.4, 1] : [1, 1.1, 1],
              backgroundColor: ["#ec4899", "#22d3ee", "#a855f7", "#fbbf24", "#ec4899"],
              boxShadow: [
                "0 0 10px #ec4899",
                "0 0 10px #22d3ee",
                "0 0 10px #a855f7",
                "0 0 10px #fbbf24",
                "0 0 10px #ec4899",
              ],
            }}
            transition={{
              backgroundColor: { repeat: Infinity, duration: 3, ease: "linear" },
              scale: { repeat: Infinity, duration: 1, delay: i * 0.1 },
              boxShadow: { repeat: Infinity, duration: 3, ease: "linear" },
            }}
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translate(${isHovered ? "50px" : "30px"})`,
            }}
          />
        ))}
      </motion.div>

      {/* 🌑 DYNAMIC GLASS CORE */}
      <motion.div
        className="fixed rounded-full"
        animate={{
          width: isHovered ? 75 : 40,
          height: isHovered ? 75 : 40,
          border: ["2px solid #ec4899", "2px solid #22d3ee", "2px solid #ec4899"],
          backgroundColor: ["rgba(236,72,153,0.05)", "rgba(34,211,238,0.05)"],
        }}
        transition={{ repeat: Infinity, duration: 4 }}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* 🎯 PRO LASER CENTER */}
      <motion.div
        className="fixed h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_20px_white]"
        animate={{ scale: isHovered ? 0.5 : 1 }}
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