// @flow strict

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";

function Skills() {
  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">

      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Skills
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* UPPER MARQUEE — UNTOUCHED */}
      <div className="w-full my-12">
        <Marquee
          gradient={false}
          speed={80}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="left"
        >
          {skillsData.map((skill, id) => (
            <div
              className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-5 rounded-lg group relative hover:scale-[1.15] cursor-pointer"
              key={id}
            >
              <div className="h-full w-full rounded-lg border border-[#1f223c] bg-[#11152c] shadow-none group-hover:border-violet-500 transition-all duration-500">
                <div className="flex -translate-y-[1px] justify-center">
                  <div className="w-3/4">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 p-6">
                  <div className="h-8 sm:h-10">
                    <Image
                      src={skillsImage(skill)?.src}
                      alt={skill}
                      width={40}
                      height={40}
                      className="h-full w-auto rounded-lg"
                    />
                  </div>
                  <p className="text-white text-sm sm:text-lg">{skill}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* ⭐ BOTTOM SKILLS + GIF SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20 px-6 items-center">

        {/* LEFT — SKILLS TEXT */}
        <div className="space-y-10 text-white">

          <div>
            <h2 className="text-2xl font-semibold text-violet-400 mb-4">Frontend</h2>
            <p className="text-white/80 leading-7">
              HTML, CSS, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS, Bootstrap, Material UI
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-violet-400 mb-4">Backend</h2>
            <p className="text-white/80 leading-7">
              Node.js, Express.js, PHP, Python, Django, Strapi, .NET
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-violet-400 mb-4">Databases</h2>
            <p className="text-white/80 leading-7">
              MongoDB, Firebase, MySQL, PostgreSQL, SQLite, Prisma
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-violet-400 mb-4">Tools & Cloud</h2>
            <p className="text-white/80 leading-7">
              Git & GitHub, Docker, AWS, Nginx, Vercel, Netlify
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-violet-400 mb-4">Design Tools</h2>
            <p className="text-white/80 leading-7">
              Figma, Adobe XD, Photoshop, Illustrator, After Effects, Canva
            </p>
          </div>

        </div>

        {/* RIGHT — PREMIUM GIF */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
            alt="coding-gif"
            className="w-[270px] sm:w-[340px] lg:w-[420px] rounded-2xl shadow-xl shadow-violet-900/40 border border-[#1f223c]"
          />
        </div>

      </div>

    </div>
  );
}

export default Skills;
