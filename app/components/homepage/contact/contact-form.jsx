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
      await axios.post("/api/contact", userInput);
      toast.success("Message sent successfully!");
      setUserInput({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Professional Title with Underline Glow */}
      <div className="mb-8 relative w-fit">
        <p className="font-bold text-white text-2xl uppercase tracking-widest">
          Contact <span className="text-[#16f2b3]">With Me</span>
        </p>
        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#16f2b3] rounded-full shadow-[0_0_10px_#16f2b3]"></span>
      </div>

      {/* Premium Glowing Card */}
      <div className="max-w-3xl relative group">
        {/* Card Background Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#16f2b3]/20 to-transparent rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
        
        <div className="relative text-white rounded-2xl border border-[#353a52] bg-[#111827] p-6 lg:p-10 shadow-2xl">
          <p className="text-sm md:text-base text-[#d3d8e8] leading-relaxed mb-8 border-l-4 border-[#16f2b3] pl-4 italic">
            {"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300">Your Name</label>
              <input
                className="bg-[#0d1224] w-full border rounded-xl border-[#353a52] focus:border-[#16f2b3] focus:shadow-[0_0_15px_rgba(22,242,179,0.1)] ring-0 outline-0 transition-all duration-300 px-4 py-3 text-gray-200"
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
              <label className="text-sm font-semibold text-gray-300">Your Email</label>
              <input
                className={`bg-[#0d1224] w-full border rounded-xl transition-all duration-300 px-4 py-3 text-gray-200 ring-0 outline-0 ${
                  error.email ? 'border-red-500' : 'border-[#353a52] focus:border-[#16f2b3]'
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
              <label className="text-sm font-semibold text-gray-300">Your Message</label>
              <textarea
                className="bg-[#0d1224] w-full border rounded-xl border-[#353a52] focus:border-[#16f2b3] focus:shadow-[0_0_15px_rgba(22,242,179,0.1)] ring-0 outline-0 transition-all duration-300 px-4 py-3 text-gray-200"
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
                className="flex items-center gap-2 hover:gap-4 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-8 md:px-14 py-3 md:py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(219,39,119,0.5)] active:scale-95 disabled:opacity-50"
                role="button"
                onClick={handleSendMail}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    Send Message
                    <TbMailForward size={22} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;