// components/Footer.jsx
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { CgGitFork } from "react-icons/cg";
import VisitorCounter from "./VisitorCounter";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0f1a] border-t border-white/10">

      {/* Soft Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#12d8a0]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-10 sm:py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center md:text-left items-start">

          {/* LEFT – Info */}
          <div className="space-y-3">
            <p className="text-sm text-gray-300">
              © Developer Portfolio by{" "}
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/umaar-ahmed-a3b252266/"
                className="text-[#12d8a0] hover:underline font-semibold"
              >
                Umaar Ahmed
              </Link>
            </p>

            <p className="text-[12px] text-gray-400 leading-relaxed">
              Built with <span className="text-[#12d8a0] font-medium">Next.js</span>,
              <span className="text-[#12d8a0] font-medium mx-1">React</span> &
              <span className="text-[#12d8a0] font-medium ml-1">Tailwind CSS</span>.
            </p>

            <p className="text-[11px] text-gray-500">
              Version 1.0.3 • Last Update on Jan 2026
            </p>
          </div>

          {/* CENTER – Visitors */}
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-100">
                Thank You for Visiting
              </h3>
              <p className="mt-1 text-sm text-gray-300">
                Empowering developers & creators worldwide
                <span className="text-[#12d8a0] ml-1 animate-pulse text-xl">♥</span>
              </p>
            </div>

            <div
              className="flex items-center gap-4 px-7 py-3 
              rounded-full bg-white/5 backdrop-blur-md
              border border-[#12d8a0]/20 shadow-md
              shadow-[#12d8a0]/10 transition-all duration-300"
            >
              <span className="text-[14px] text-gray-400">Visited by:</span>
              <span className="text-3xl font-bold text-[#12d8a0]">
                <VisitorCounter />
                <span className="text-sm font-medium text-gray-400"> developers</span>
              </span>
            </div>
          </div>

          {/* RIGHT – GitHub (Shifted Left for Floating Icons) */}
          <div className="flex flex-col items-center md:items-start md:pl-12 lg:pl-20 space-y-5 md:pr-24">
            <div className="flex items-center gap-4">
              {/* Star Button - Yellow with Border */}
              <Link
                href="https://github.com/UmaarAhmed"
                target="_blank"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-yellow-500/30 bg-yellow-500/5 text-gray-300 hover:text-yellow-500 hover:border-yellow-500 transition-all"
              >
                <IoStar className="text-lg group-hover:scale-110" />
                <span className="text-xs font-bold tracking-wide">Star</span>
              </Link>

              {/* Fork Button - Cyan with Border */}
              <Link
                href="https://github.com/UmaarAhmed?tab=repositories"
                target="_blank"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/30 bg-cyan-500/5 text-gray-300 hover:text-cyan-400 hover:border-cyan-500 transition-all"
              >
                <CgGitFork className="text-lg group-hover:rotate-12" />
                <span className="text-xs font-bold tracking-wide">Fork</span>
              </Link>
            </div>

            <div className="text-center md:text-left">
              <p className="text-[12px] text-gray-400 leading-relaxed">
                Built in <span className="text-green-400 font-medium border-b border-green-400/20">Pakistan</span> •  
                Serving worldwide 🌍
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 pt-4 border-t border-white/5 text-center">
          <p className="text-[11px] text-gray-500 tracking-[0.2em] uppercase">
            Handcrafted by Umaar • Keep creating, keep inspiring.
          </p>
        </div>
      </div>
    </footer>
  );
}