// src/components/Projects/ProjectRow.tsx

import { motion, AnimatePresence } from "framer-motion";

import { Project } from "@/data/projects";
import ProjectExpanded from "./ProjectExpanded";

interface ProjectRowProps {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
}

export default function ProjectRow({
  project,
  expanded,
  onToggle,
}: ProjectRowProps) {
  return (
    <>
      {/* Fila principal */}

      <motion.div
        layout
        className="
          border-b
          border-neutral-300
          hover:bg-neutral-50
          transition-colors
        "
      >
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[70px_2.2fr_1.5fr_1.2fr_2fr_100px]
            gap-4
            items-center

            px-8
            py-8
          "
        >
          {/* Botón */}

          <button
            onClick={onToggle}
            className="
              flex
              items-center
              justify-center

              w-10
              h-10

              text-3xl
              font-light

              transition-transform
              hover:scale-110
            "
          >
            {expanded ? "−" : "+"}
          </button>

          {/* Proyecto */}

          <div>
            <h3 className="text-2xl leading-none uppercase font-semibold">
              {project.title}
            </h3>

            <p className="text-sm text-neutral-500 mt-2">{project.subtitle}</p>
          </div>

          {/* Tipo */}

          <div className="text-sm text-neutral-700">{project.type}</div>

          {/* Estado */}

          <div className="text-sm text-neutral-700">{project.status}</div>

          {/* Ubicación */}

          <div className="text-sm text-neutral-700">{project.location}</div>

          {/* Año */}

          <div className="text-right text-sm text-neutral-700">
            {project.year}
          </div>
        </div>
      </motion.div>

      {/* Panel desplegable */}

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            layout
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <ProjectExpanded project={project} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
