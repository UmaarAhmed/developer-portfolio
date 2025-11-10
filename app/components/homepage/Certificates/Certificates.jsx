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
      className="relative bg-gradient-to-b from-[#0d1224] via-[#111637] to-[#0d1224] py-20 text-white overflow-hidden"
    >
      {/* Decorative gradient circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-extrabold text-center mb-14 tracking-wide">
          <span className="bg-gradient-to-r from-[#16f2b3] to-[#4ad7ff] bg-clip-text text-transparent">
            Certificates & Achievements
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-xl shadow-lg hover:shadow-[#16f2b3]/40 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-[#16f2b3]/40 transition-all duration-500"></div>

              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-46 object-contain mb-4 rounded-md transition-transform duration-500 group-hover:scale-105"
              />
              
              <h3
  className="text-lg font-semibold mb-1 text-[#16f2b3] group-hover:text-[#4ad7ff] transition-colors duration-300"
>
  {cert.title}
</h3>

              <p className="text-xs text-gray-400 mb-2">
                {cert.issuer} • {cert.year}
              </p>
              <p className="text-sm text-gray-300 leading-snug">
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
