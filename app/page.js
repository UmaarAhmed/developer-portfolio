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

/**
 * Blogs are fetched with a HARD TIMEOUT and a graceful fallback.
 *
 * Why: an unbounded `fetch()` to a third-party API blocks the whole server
 * render. If dev.to is slow or unreachable the page simply never opens.
 * `AbortSignal.timeout` guarantees we bail out, and the catch guarantees the
 * rest of the portfolio still renders even with zero blogs.
 */
async function getBlogs() {
  try {
    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}&per_page=6`,
      {
        signal: AbortSignal.timeout(4000),
        next: { revalidate: 3600 }, // cache for 1 hour
      }
    );

    if (!res.ok) {
      console.warn("[blogs] dev.to responded with", res.status);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data
      .filter((item) => item?.cover_image)
      .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
  } catch (err) {
    console.warn("[blogs] fetch failed, rendering without blogs:", err?.name);
    return [];
  }
}

export default async function Home() {
  const blogs = await getBlogs();

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