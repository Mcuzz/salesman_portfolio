// src/components/Home/ProjectsGrid.tsx

import { motion } from "framer-motion";
import localFont from "next/font/local";

import { Project } from "@/data/projects";
import ProjectRow from "./ProjectRow";

const Square = localFont({
  src: "../../fonts/Geist.ttf",
  weight: "600",
  style: "normal",
  variable: "--font-square",
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
    <motion.section
      key="projects-overview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="w-full"
    >
      {/* Encabezado */}

      <div className="max-w-[1200px] mx-auto px-8 mb-14">
        <h2 className={`${Square.className} text-5xl mb-5`}>
          OVERVIEW
        </h2>

        <p className="max-w-2xl text-neutral-600 leading-relaxed">
          Vista rápida de los proyectos y conceptos para comprender el enfoque,
          la metodología y el lenguaje detrás de cada propuesta.
        </p>
      </div>

      {/* Tabla */}

      <div className="w-full border-t border-neutral-300">
        {/* Cabecera */}

        <div
          className="
            hidden
            lg:grid
            grid-cols-[70px_2.2fr_1.5fr_1.2fr_2fr_100px]
            items-center
            px-8
            py-4
            text-xs
            uppercase
            tracking-[0.22em]
            text-neutral-400
          "
        >
          <div />

          <div>Proyecto</div>

          <div>Tipo</div>

          <div>Estado</div>

          <div>Ubicación</div>

          <div className="text-right">Año</div>
        </div>

        {/* Filas */}

        {projects.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            expanded={activeProject === project.id}
            onToggle={() =>
              setActiveProject(
                activeProject === project.id
                  ? null
                  : project.id
              )
            }
          />
        ))}
      </div>
    </motion.section>
  );
}