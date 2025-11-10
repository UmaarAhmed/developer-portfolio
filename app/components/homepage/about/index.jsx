// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";

function AboutSection() {
  return (
    <div
      id="about"
      className="relative my-16 lg:my-24 bg-[#0b0b1f]/40 backdrop-blur-sm rounded-2xl p-6 lg:p-12 border border-[#1a1443]/50"
    >
      {/* ===== Section Title on Side ===== */}
      <div className="hidden lg:flex flex-col items-center absolute top-20 -right-10">
        <span className="bg-gradient-to-r from-[#16f2b3] to-[#1a1443] text-white rotate-90 p-2 px-6 text-lg rounded-md font-semibold tracking-wider shadow-lg">
          ABOUT ME
        </span>
        <span className="h-40 w-[2px] bg-[#16f2b3]"></span>
      </div>

      {/* ===== Main Grid ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        {/* === Left: Text Section === */}
        <div className="order-2 lg:order-1">
          <h3 className="font-semibold mb-3 text-[#16f2b3] text-2xl uppercase tracking-wide">
            Who I Am?
          </h3>
          <p className="text-gray-300 text-base leading-relaxed">
            {personalData.description}
          </p>

          <div className="mt-6">
            <a
              href={personalData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#16f2b3] text-[#16f2b3] hover:bg-[#16f2b3] hover:text-[#0b0b1f] px-6 py-2 rounded-lg font-medium transition-all duration-300"
            >
              View Resume
            </a>
          </div>
        </div>

        {/* === Right: Profile Image === */}
        <div className="flex justify-center order-1 lg:order-2">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#16f2b3] to-[#1a1443] rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500"></div>
            <Image
              src={personalData.profile}
              width={300}
              height={300}
              alt="Umaar Ahmed"
              className="relative rounded-xl transition-all duration-700 grayscale hover:grayscale-0 hover:scale-105 cursor-pointer shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
