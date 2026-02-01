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
    <div id="contact" className="my-12 lg:my-16 relative mt-24 text-white">
      {/* Side Vertical Label - New Unique Style */}
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-10">
        <span className="bg-[#0f172a] border border-[#334155] w-fit text-[#00f2fe] rotate-90 p-2 px-6 text-sm font-bold tracking-[0.3em] rounded-full shadow-sm">
          GET IN TOUCH
        </span>
        <span className="h-36 w-[1px] bg-gradient-to-b from-[#334155] to-transparent mt-4"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
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
              <p key={index} className="text-base md:text-lg flex items-center gap-4 group">
                <span className="bg-[#1e293b] border border-[#334155] p-3 rounded-xl text-[#00f2fe] group-hover:border-[#00f2fe] group-hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-500">
                  {item.icon}
                </span>
                <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </span>
              </p>
            ))}
          </div>

          {/* Social Icons - Sleek Minimalist Look */}
          <div className="mt-10 lg:mt-20 flex items-center gap-4 lg:gap-6">
            {[
              { icon: <IoLogoGithub size={28} />, link: personalData.github },
              { icon: <BiLogoLinkedin size={28} />, link: personalData.linkedIn },
              { icon: <FaXTwitter size={28} />, link: personalData.twitter },
              { icon: <SiDevdotto size={28} />, link: `https://dev.to/${personalData.devUsername}` },
            ].map((social, index) => (
              <Link key={index} target="_blank" href={social.link}>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                  <div className="relative bg-[#0f172a] p-4 rounded-full text-slate-300 hover:text-white transition-all duration-300 border border-[#334155]">
                    {social.icon}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;