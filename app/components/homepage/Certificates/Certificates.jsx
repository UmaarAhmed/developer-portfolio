// @flow strict
import React from "react";

// Example certificates data
const certificates = [

    {
    title: "Introduction to Generative AI Studio – Simplilearn",
    issuer: "Simplilearn (SkillUp by Simplilearn)",
    year: "2025",
    image: "/certi.PNG",
    link: "https://simpli-web.app.link/e/cFMfbujN2Xb",
    description: "Gained hands-on experience with Google Cloud’s Generative AI Studio, exploring techniques for text, image, and code generation using advanced foundation models. Developed a practical understanding of prompt engineering and AI-driven content creation workflows."
  },
  {
    title: "Core Java Development Certified Professional",
    issuer: "Great Learning Academy",
    year: "2024",
    image: "/java certificate.jpeg",
    link: "https://www.mygreatlearning.com/certificate/LIAWVLST?referrer_code=GLVNKJLTJMIKW",
    description: "Hi Everyone, I’ve just completed the “Core Java Programming” course with Great Learning Academy. This course helped me strengthen my understanding of Java fundamentals, object-oriented programming, and core development concepts essential for building efficient and scalable applications."
  },
  {
    title: "Object Oriented Programming (OOP) in Java",
    issuer: "MindLuster",
    year: "2024",
    image: "/oop.jpeg",
    link: "https://www.mindluster.com/student/certificate/15876143308",
    description: "Successfully completed the Object Oriented Programming (OOP) in Java course with MindLuster, gaining practical knowledge of key concepts such as inheritance, polymorphism, encapsulation, and abstraction in Java development."
  },
];

function Certificates() {
  return (
    <section
      id="certificates"
      className="relative overflow-hidden bg-[var(--surface-2)] py-20 text-[var(--ink)]"
    >
      {/* Decorative gradient circles */}
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-64 w-64 rounded-full bg-violet-600/15 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-14 text-center text-3xl font-extrabold tracking-wide sm:text-4xl">
          <span className="bg-gradient-to-r from-[var(--accent)] to-cyan-400 bg-clip-text text-transparent">
            Certificates &amp; Achievements
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)]/50"
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#16f2b3]/40 transition-all duration-500"></div>

              <img
                src={cert.image}
                alt={cert.title}
                className="mb-4 h-44 w-full rounded-md bg-[var(--surface-3)] object-contain p-2 transition-transform duration-500 group-hover:scale-105"
              />
              
              <h3
  className="mb-1 text-base font-semibold text-[var(--accent)] transition-colors duration-300 group-hover:text-cyan-400 sm:text-lg"
>
  {cert.title}
</h3>

              <p className="mb-2 text-xs text-[var(--muted)]">
                {cert.issuer} • {cert.year}
              </p>
              <p className="text-sm leading-snug text-[var(--ink-2)]">
                {cert.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certificates;
