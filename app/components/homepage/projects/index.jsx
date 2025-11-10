import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';

const Projects = () => {
  return (
    <div id="projects" className="relative z-50 my-12 lg:my-24">
      {/* ===== Sticky Heading ===== */}
      <div className="sticky top-24 z-40 bg-[#0f172a] py-3"> {/* heading ko top se thoda niche shift */}
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-1/2 -translate-x-1/2 filter blur-3xl opacity-30"></div>

        <div className="flex items-center justify-center relative"> {/* heading center */}
          <span className="bg-[#1a1443] text-white px-6 py-3 text-xl md:text-2xl font-semibold rounded-md z-50">
            PROJECTS
          </span>
          <span className="absolute w-full h-[2px] bg-[#1a1443] top-1/2 -translate-y-1/2"></span>
        </div>
      </div>

      {/* ===== Cards Section ===== */}
      <div className="pt-32"> {/* spacing so heading + cards don't overlap */}
        <div className="flex flex-col gap-6">
          {projectsData.slice(0, 4).map((project, index) => (
            <div
              key={index}
              id={`sticky-card-${index + 1}`}
              className="sticky-card w-full mx-auto max-w-2xl sticky"
              style={{
                top: '11rem', // heading ke neeche se sticky start
              }}
            >
              <div className="box-border flex items-center justify-center rounded shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all duration-500 bg-[#0f172a]/50 backdrop-blur-md">
                <ProjectCard project={project} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
