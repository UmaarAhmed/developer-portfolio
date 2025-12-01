"use client";

import { useState, useEffect } from "react";
import { Bot, ArrowUp, MessageCircle } from "lucide-react";
import Chatbot from "./Chatbot";

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed right-6 bottom-6 z-50 flex flex-col items-center gap-4">

        {/* AI Button — Same design as inside Chatbot */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                     p-5 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <Bot size={32} className="animate-pulse" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"></span>
        </button>

        {/* WhatsApp */}
        <a
          href="https://wa.me/923434688216"
          target="_blank"
          className="bg-green-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition"
        >
          <MessageCircle size={26} />
        </a>

        {/* Scroll to top — UPDATED DESIGN */}
        {showScroll && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center justify-center
                       bg-gradient-to-r from-pink-500 to-violet-600 text-white
                       p-4 rounded-full shadow-xl hover:scale-110 transition-all duration-300"
          >
            <ArrowUp size={26} />
          </button>
        )}
      </div>

      {/* Chat Modal */}
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
    </>
  );
}
