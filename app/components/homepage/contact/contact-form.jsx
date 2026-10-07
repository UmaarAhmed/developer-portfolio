"use client";
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  // 👇 YAHAN HAI WO UPDATED FUNCTION 👇
  const handleSendMail = async (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    try {
      setIsLoading(true);
      // Backend ka response store karein
      const response = await axios.post("/api/contact", userInput);
      
      // Check karein ki backend ne success true bheja hai ya false
      if (response.data.success) {
        toast.success(response.data.message || "Message sent successfully!");
        setUserInput({ name: "", email: "", message: "" });
      } else {
        toast.error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Professional Title with Underline Glow */}
      <div className="mb-8 relative w-fit mx-auto lg:mx-0">
        <p className="text-2xl font-bold uppercase tracking-widest text-[var(--ink)]">
          Contact <span className="text-[var(--accent-text)]">With Me</span>
        </p>
        <span className="absolute -bottom-2 left-0 h-1 w-1/2 rounded-full bg-[var(--accent)]"></span>
      </div>

      {/* Premium Glowing Card */}
      <div className="max-w-3xl relative group">
        {/* Card Background Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#16f2b3]/20 to-transparent rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
        
        <div className="relative rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 text-[var(--ink)] shadow-[var(--shadow-card)] lg:p-10">
          <p className="mb-8 border-l-4 border-[var(--accent)] pl-4 text-sm italic leading-relaxed text-[var(--ink-2)] md:text-base">
            {"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[var(--muted)]">Your Name</label>
              <input
                className="w-full rounded-xl border border-[var(--line-strong)] bg-[var(--input)] px-4 py-3 text-[var(--ink)] outline-0 ring-0 transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_15px_color-mix(in_oklab,var(--accent)_20%,transparent)]"
                type="text"
                maxLength="100"
                required={true}
                onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
                onBlur={checkRequired}
                value={userInput.name}
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[var(--muted)]">Your Email</label>
              <input
                className={`w-full rounded-xl border bg-[var(--input)] px-4 py-3 text-[var(--ink)] outline-0 ring-0 transition-all duration-300 ${
                  error.email ? 'border-red-500' : ''
                }`}
                type="email"
                maxLength="100"
                required={true}
                value={userInput.email}
                onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                onBlur={() => {
                  checkRequired();
                  setError({ ...error, email: !isValidEmail(userInput.email) });
                }}
                placeholder="Enter your email"
              />
              {error.email && <p className="text-xs text-red-400">Please provide a valid email!</p>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[var(--muted)]">Your Message</label>
              <textarea
                className="w-full rounded-xl border border-[var(--line-strong)] bg-[var(--input)] px-4 py-3 text-[var(--ink)] outline-0 ring-0 transition-all duration-300 focus:border-[var(--accent)] focus:shadow-[0_0_15px_color-mix(in_oklab,var(--accent)_20%,transparent)]"
                maxLength="500"
                name="message"
                required={true}
                onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
                onBlur={checkRequired}
                rows="4"
                value={userInput.message}
                placeholder="How can I help you?"
              />
            </div>

            <div className="flex flex-col items-center gap-3 mt-4">
              {error.required && (
                <p className="text-sm text-red-400 animate-bounce">All fields are required!</p>
              )}
              
              <button
                type="button"
                className="btn-up btn-fill-brand inline-flex items-center gap-2 rounded-full px-8 py-3 text-center text-sm font-bold uppercase tracking-widest text-white shadow-[0_12px_28px_-12px_rgba(2,120,87,0.75)] md:px-14 md:py-4 disabled:cursor-not-allowed disabled:opacity-50"
                role="button"
                onClick={handleSendMail}
                disabled={isLoading}
              >
                <span className="relative z-[1]">
                  {isLoading ? "Sending..." : "Send Message"}
                </span>
                {!isLoading && <TbMailForward size={22} className="relative z-[1]" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;