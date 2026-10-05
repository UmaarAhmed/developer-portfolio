"use client";

import Image from "next/image";
import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";

/**
 * Brand lockup used in the navbar AND footer.
 * Shows the user's own photo (public/new.png) instead of text initials.
 */
export default function Brand({ size = 40, withName = true, href = "/#home" }) {
  return (
    <Link
      href={href}
      aria-label={`${personalData.name} — home`}
      className="group flex shrink-0 items-center gap-3"
    >
      <span className="relative grid shrink-0 place-items-center">
        {/* Soft brand halo */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-25 blur-lg transition-opacity duration-500 group-hover:opacity-60"
        />
        <span
          className="relative overflow-hidden rounded-full bg-[var(--surface-3)] ring-2 ring-[var(--accent)] transition-transform duration-500 group-hover:scale-105"
          style={{ width: size, height: size }}
        >
          <Image
            src={personalData.profile}
            alt={personalData.name}
            width={size}
            height={size}
            priority
            className="h-full w-full object-cover"
          />
        </span>
        {/* Online pip */}
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--surface)] bg-emerald-400" />
      </span>

      {withName && (
        <span className="hidden min-w-0 flex-col leading-tight sm:flex">
          <span className="truncate text-base font-extrabold tracking-tight text-[var(--ink)] md:text-lg">
            {personalData.name}
          </span>
          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] md:text-[11px]">
            {personalData.designation}
          </span>
        </span>
      )}
    </Link>
  );
}