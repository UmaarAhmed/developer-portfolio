"use client";

import { useEffect } from "react";

const GlowCard = ({ children, identifier }) => {
  useEffect(() => {
    const CONTAINER = document.querySelector(`.glow-container-${identifier}`);
    const CARDS = document.querySelectorAll(`.glow-card-${identifier}`);

    if (!CONTAINER || CARDS.length === 0) return;

    // Respect reduced motion + skip entirely on touch devices
    if (
      window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches !== true ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true
    ) {
      return;
    }

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    // rAF-throttled: the original ran the full getBoundingClientRect loop on
    // every raw pointermove event (often 100+ Hz), forcing constant layout.
    let ticking = false;
    let px = 0;
    let py = 0;

    const UPDATE = () => {
      for (const CARD of CARDS) {
        const CARD_BOUNDS = CARD.getBoundingClientRect();

        if (
          px > CARD_BOUNDS.left - CONFIG.proximity &&
          px < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
          py > CARD_BOUNDS.top - CONFIG.proximity &&
          py < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
        ) {
          CARD.style.setProperty("--active", 1);
        } else {
          CARD.style.setProperty("--active", CONFIG.opacity);
        }

        const CARD_CENTER = [
          CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
          CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5,
        ];

        let ANGLE =
          (Math.atan2(py - CARD_CENTER[1], px - CARD_CENTER[0]) * 180) /
          Math.PI;

        ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;

        CARD.style.setProperty("--start", ANGLE + 90);
      }
    };

    const onMove = (event) => {
      px = event.x;
      py = event.y;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        UPDATE();
        ticking = false;
      });
    };

    const RESTYLE = () => {
      CONTAINER.style.setProperty("--gap", CONFIG.gap);
      CONTAINER.style.setProperty("--blur", CONFIG.blur);
      CONTAINER.style.setProperty("--spread", CONFIG.spread);
      CONTAINER.style.setProperty(
        "--direction",
        CONFIG.vertical ? "column" : "row"
      );
    };

    RESTYLE();
    UPDATE();

    document.body.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      document.body.removeEventListener("pointermove", onMove);
    };
  }, [identifier]);

  return (
    <div className={`glow-container-${identifier} glow-container`}>
      <article
        className={`glow-card glow-card-${identifier} relative h-fit w-full cursor-pointer rounded-xl border border-[var(--line-strong)] bg-[var(--surface)] text-[var(--ink-2)] transition-all duration-300 hover:border-transparent`}
      >
        <div className="glows" />
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
