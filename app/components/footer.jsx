// components/Footer.jsx
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { CgGitFork } from "react-icons/cg";
import VisitorCounter from "./VisitorCounter";
import Brand from "./Brand";
import { personalData } from "@/utils/data/personal-data";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)]">
      {/* Soft Glow Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

      <div className="mx-auto max-w-[92rem] px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:items-start">
          {/* LEFT – Brand + info */}
          <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
            {/* Your photo + name */}
            <Brand size={64} />

            <p className="text-sm text-[var(--muted)]">
              © {new Date().getFullYear()} · Built by{" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={personalData.linkedIn}
                className="font-semibold text-[var(--accent)] underline-offset-4 transition-colors hover:underline"
              >
                {personalData.name}
              </Link>
            </p>

            <p className="text-[12px] leading-relaxed text-[var(--muted-2)]">
              Built with{" "}
              <span className="font-medium text-[var(--accent)]">Next.js</span>,{" "}
              <span className="font-medium text-[var(--accent)]">React</span> &amp;{" "}
              <span className="font-medium text-[var(--accent)]">Tailwind CSS</span>.
            </p>

            <p className="text-[11px] text-[var(--muted-2)]">
              Version 2.0.0 · Built with Next.js 16 &amp; React 19
            </p>
          </div>

          {/* CENTER – Visitors */}
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-[var(--ink)] sm:text-2xl">
                Thank You for Visiting
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Empowering developers &amp; creators worldwide
                <span className="ml-1 text-[var(--accent)]">♥</span>
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-full border border-[var(--line-strong)] bg-[var(--surface)] px-7 py-3 shadow-[var(--shadow-soft)] transition-transform duration-300 hover:scale-105">
              <span className="text-[14px] text-[var(--muted)]">Visited by:</span>
              <span className="text-3xl font-bold text-[var(--accent)]">
                <VisitorCounter />
                <span className="text-sm font-medium text-[var(--muted)]">
                  {" "}
                  developers
                </span>
              </span>
            </div>
          </div>

          {/* RIGHT – GitHub */}
          <div className="flex flex-col items-center gap-5 md:items-start lg:pl-8">
            {/* Two buttons: #1 (left) = zoom, #2 (right) = left→right fill */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Star on GitHub"
                className="btn-zoom group inline-flex items-center gap-2 rounded-lg border border-[var(--line-strong)] bg-[var(--surface)] px-4 py-2 text-[var(--ink)]"
              >
                <IoStar className="relative z-[1] text-lg text-yellow-500 transition-transform duration-300 group-hover:scale-125" />
                <span className="relative z-[1] text-xs font-bold tracking-wide">
                  Star
                </span>
              </Link>

              <Link
                href={`${personalData.github}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fork on GitHub"
                className="btn-right btn-outline inline-flex items-center gap-2 rounded-lg border border-[var(--line-strong)] px-4 py-2 text-[var(--ink)]"
              >
                <CgGitFork className="relative z-[1] text-lg text-cyan-500" />
                <span className="relative z-[1] text-xs font-bold tracking-wide">Fork</span>
              </Link>
            </div>

            <p className="text-center text-[12px] leading-relaxed text-[var(--muted)] md:text-left">
              Built in{" "}
              <span className="font-medium text-emerald-500">Pakistan</span> ·
              Serving worldwide 🌍
            </p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 border-t border-[var(--line)] pt-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted-2)]">
            Handcrafted by {personalData.name} · Keep creating, keep inspiring.
          </p>
        </div>
      </div>
    </footer>
  );
}