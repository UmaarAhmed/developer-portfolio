"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Bot, ArrowUp, MessageCircle } from "lucide-react";

/**
 * The chatbot pulls in react-markdown + react-syntax-highlighter (~700 KB).
 * Loading it eagerly made the FIRST paint slow for every visitor, so it is
 * code-split and only fetched when the user actually opens it.
 */
const Chatbot = dynamic(() => import("./Chatbot"), {
  ssr: false,
  loading: () => null,
});

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShowScroll(window.scrollY > 300);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="fixed bottom-5 right-4 z-50 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6 sm:gap-4">
        {/* AI Button */}
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          aria-label="Open AI assistant"
          className="btn-zoom relative rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white shadow-2xl sm:p-5"
        >
          <Bot size={26} className="sm:size-8" />
          <span className="absolute -right-1 -top-1 h-4 w-4 animate-ping rounded-full bg-green-400" />
          <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-green-400" />
        </button>

        {/* WhatsApp */}
        <a
          href="https://wa.me/923434688216"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="btn-zoom grid place-items-center rounded-full bg-green-600 p-3.5 text-white shadow-xl sm:p-4"
        >
          <MessageCircle size={24} />
        </a>

        {/* Scroll to top */}
        {showScroll && (
          <button
            type="button"
            onClick={scrollTop}
            aria-label="Scroll back to top"
            className="btn-zoom grid place-items-center rounded-full bg-gradient-to-r from-pink-500 to-violet-600 p-3.5 text-white shadow-xl sm:p-4"
          >
            <ArrowUp size={24} />
          </button>
        )}
      </div>

      {/* Chat Modal */}
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
    </>
  );
}
