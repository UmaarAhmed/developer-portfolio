"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Bot, Send, X, Zap } from "lucide-react";

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Bot not responding");

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("AI Bot Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `### ⚡ System Override! \n\nMy apologies! My connection to **Umaar's digital brain** is recalibrating. \n\n👉 **[Message Umaar on LinkedIn](https://www.linkedin.com/in/umaar-ahmed-a3b252266/)**`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Responsive Container: Mobile par inset-0 (Full Screen), Laptop par bottom-10 right-8
   <div className="fixed bottom-0 left-0 right-0 md:inset-auto md:bottom-10 md:right-8 w-full md:w-[350px] h-[75dvh] md:h-[510px] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col z-[100] overflow-hidden border border-gray-200 transition-all duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <Bot size={28} />
          <div>
            <h3 className="font-bold text-base md:text-lg leading-tight tracking-tight">Umaar's Assistant</h3>
            <p className="text-[10px] opacity-90">Powered by Grok 2.0 • Online</p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition active:scale-90">
          <X size={24} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scroll-smooth">
        {messages.length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-10 md:mt-6 px-6">
            <Bot size={48} className="mx-auto mb-3 opacity-20" />
            <p className="font-semibold text-sm">Hello! I'm Umaar's AI Assistant</p>
            <p className="text-xs mt-2">Ask about projects, skills, or freelance availability.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={`max-w-[88%] px-4 py-2.5 rounded-2xl shadow-sm text-[14px] leading-relaxed ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-sm max-w-none break-words dark:prose-invert">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <div className="max-w-full overflow-x-auto my-2">
                            <SyntaxHighlighter
                              style={tomorrow}
                              language={match[1]}
                              PreTag="div"
                              className="rounded-lg text-[12px]"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className="bg-gray-100 px-1 rounded text-pink-600 font-mono" {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
              <Bot size={14} className="text-indigo-600 animate-pulse" />
              <span className="text-sm font-medium text-gray-500">Thinking</span>
              <div className="flex gap-1 items-end pb-1">
                <span className="w-1 h-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1 h-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1 h-1 bg-indigo-600 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area: Adjusted for Mobile Keyboard */}
      <div className="px-4 pt-2 pb-6 md:pb-4 bg-white border-t border-gray-100 shrink-0">
        <div className="group relative mt-2 flex items-center bg-gray-100 border border-transparent rounded-full p-1 transition-all focus-within:bg-white focus-within:border-indigo-600">
          <div className="pl-3 text-indigo-400">
            <Zap size={18} fill="currentColor" />
          </div>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-3 py-3 md:py-2.5 bg-transparent border-none text-[16px] outline-none text-gray-700 placeholder:text-gray-400 min-w-0"
            disabled={loading}
          />
          
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-indigo-600 text-white p-3 md:p-2.5 rounded-full hover:bg-indigo-700 active:scale-95 disabled:opacity-20 shadow-md shrink-0"
          >
            <Send size={18} />
          </button>
        </div>

        {/* Footer info */}
        <div className="flex justify-between items-center px-3 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Secure AI</span>
          </div>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest italic">By Umaar Ahmed</p>
        </div>
      </div>
    </div>
  );
}