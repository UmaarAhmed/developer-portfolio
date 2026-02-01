import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import Certificates from "./components/homepage/Certificates/Certificates";

// 1. Pehle data fetch karne wala function define karein
async function getData() {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);

  return filtered;
}

// 2. Phir Home component define karein
export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning>
      <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="education">
        <Education />
      </section>

      <section id="projects">
        <Projects />
      </section>

      {/* Certificates component ke andar pehle se <section id="certificates"> hai */}
      <Certificates />

      <section id="blog">
        <Blog blogs={blogs} />
      </section>

      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
}