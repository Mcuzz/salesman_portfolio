// src/components/Home/ProjectsGrid.tsx
import { motion } from "framer-motion";
import ProjectCard from "../ProjectCard/ProjectCard";
import { Project } from "../../data/projects";
import localFont from "next/font/local";

const Square = localFont({
  src: "../../fonts/Geist.ttf",
  weight: "600",
  style: "normal",
  variable: "--font-scrambled",
});


interface ProjectsGridProps {
  projects: Project[];
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
}

export default function ProjectsGrid({
  projects,
  activeProject,
  setActiveProject,
}: ProjectsGridProps) {
  return (
    <motion.div
      key="architectural-projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className={`${Square.className} text-5xl font-bold mb-4 max-w-[1080px] mx-auto `}>
        OVERVIEW
      </h3>
      <p className="mb-6 max-w-[1080px] mx-auto">
        Vista rapida a los proyectos y conceptos para darte una idea de mi enfoque, estetica e ideas que quiero proyectar.
      </p>

      <section className="mt-10 w-full grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:max-w-6xl lg:mx-auto" style={{ maxWidth: "1160px", margin: "40px auto" }}>
        {projects.map((project) => {
          const isActive = activeProject === project.id;
          return (
            <div key={project.id} className={isActive ? "lg:col-span-2" : ""}>
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                images={project.images[0].src}
                number={project.id}
                isActive={isActive}
                onSelect={setActiveProject}
              />
            </div>
          );
        })}
      </section>
    </motion.div>
  );
}
