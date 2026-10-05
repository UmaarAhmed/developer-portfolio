// @flow strict
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { SiDevdotto } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';

function ContactSection() {
  return (
    <div id="contact" className="relative my-16 text-[var(--ink)] lg:my-24">
      {/* Side Vertical Label - New Unique Style */}
      <div className="absolute right-0 top-24 hidden lg:flex lg:flex-col lg:items-center">
        <span className="w-fit rotate-90 rounded-full border border-[var(--line-strong)] bg-[var(--surface)] p-2 px-6 text-sm font-bold tracking-[0.3em] text-[var(--accent)] shadow-[var(--shadow-soft)]">
          GET IN TOUCH
        </span>
        <span className="mt-4 h-36 w-[1px] bg-gradient-to-b from-[var(--line-strong)] to-transparent"></span>
      </div>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 lg:pr-24">
        {/* Contact Form Section */}
        <ContactForm />
        
        <div className="lg:w-3/4 ">
          <div className="flex flex-col gap-5 lg:gap-9">
            {/* Contact Details with Glassmorphism Hover */}
            {[
              { icon: <MdAlternateEmail size={22} />, label: personalData.email },
              { icon: <IoMdCall size={22} />, label: personalData.phone },
              { icon: <CiLocationOn size={22} />, label: personalData.address },
            ].map((item, index) => (
              <p key={index} className="group flex items-center gap-4 text-base md:text-lg">
                <span className="rounded-xl border border-[var(--line-strong)] bg-[var(--surface)] p-3 text-[var(--accent)] transition-all duration-500 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_15px_color-mix(in_oklab,var(--accent)_30%,transparent)]">
                  {item.icon}
                </span>
                <span className="break-all text-[var(--ink-2)] transition-colors duration-300 group-hover:text-[var(--ink)]">
                  {item.label}
                </span>
              </p>
            ))}
          </div>

          {/* Social Icons - Sleek Minimalist Look */}
          <div className="mt-10 flex flex-wrap items-center gap-4 lg:mt-20 lg:gap-6">
            {[
              { icon: <IoLogoGithub size={26} />, link: personalData.github, label: "GitHub" },
              { icon: <BiLogoLinkedin size={26} />, link: personalData.linkedIn, label: "LinkedIn" },
              { icon: <FaXTwitter size={26} />, link: personalData.twitter, label: "X" },
              { icon: <SiDevdotto size={26} />, link: `https://dev.to/${personalData.devUsername}`, label: "Dev.to" },
            ].map((social, index) => (
              <Link key={index} target="_blank" rel="noopener noreferrer" href={social.link} aria-label={social.label}>
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[var(--accent)] to-cyan-400 opacity-20 blur transition-opacity duration-500 group-hover:opacity-70"></div>
                  <div className="relative rounded-full border border-[var(--line-strong)] bg-[var(--surface)] p-4 text-[var(--muted)] transition-all duration-300 hover:-translate-y-1 hover:text-[var(--accent)]">
                    {social.icon}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Agency CTA — order any service on gtsol360.com */}
          <a
            href={personalData.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-zoom group mt-8 flex items-center gap-3 rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)] transition-colors duration-300 hover:border-[var(--accent)] lg:mt-10"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-base font-black text-white">
              GT
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-[var(--ink)]">
                Order a service on {personalData.companyShort}
              </span>
              <span className="block truncate text-xs text-[var(--muted)]">
                Development &amp; digital marketing · track orders live
              </span>
            </span>
            <span className="shrink-0 text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;