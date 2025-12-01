"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Bot, Send, X } from "lucide-react";

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
      const res = await fetch(
        "https://developer-portfolio-1-l1f4.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Bot not responding");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error("AI Bot Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I'm currently experiencing technical difficulties.\n\nPlease try again in a moment or refresh the page.\n\nUmaar has been notified and is resolving the issue.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-w-[95vw] h-[520px] bg-white rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200 md:bottom-10 md:right-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 flex justify-between items-center rounded-t-3xl">
        <div className="flex items-center gap-4">
          <Bot size={34} />
          <div>
            <h3 className="font-bold text-xl">Umaar's Assistant</h3>
            <p className="text-xs opacity-90">
              Powered by Grok • Online • Ask anything!
            </p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition">
          <X size={22} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-gray-50 to-white">
        {messages.length === 0 && !loading && (
          <div className="text-center text-gray-600 mt-24">
            <Bot size={72} className="mx-auto mb-5 opacity-40" />
            <p className="text-xl font-semibold">Hello! I'm Umaar's AI Assistant</p>
            <p className="text-sm mt-3 max-w-xs mx-auto leading-relaxed">
              Ask about projects, skills, experience, rates, or freelance availability.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
            <div
              className={`inline-block max-w-[85%] px-5 py-3.5 rounded-2xl shadow-md ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "bg-white border border-gray-200 text-gray-800"
              }`}
            >
              {msg.role === "assistant" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg mt-3 text-sm overflow-x-auto"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-gray-800 text-pink-300 px-2 py-1 rounded text-sm font-medium" {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                <p className="font-medium">{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-left">
            <div className="inline-block bg-white px-6 py-4 rounded-2xl shadow-md border">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
              </div>
              <p className="text-sm text-gray-500 mt-3">thinking...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-5 bg-gray-50 border-t">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Ask about projects, skills, or hire me..."
            className="flex-1 px-6 py-3.5 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm text-gray-800 placeholder-gray-500"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full hover:scale-110 transition-all disabled:opacity-60 shadow-lg flex items-center justify-center"
          >
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}