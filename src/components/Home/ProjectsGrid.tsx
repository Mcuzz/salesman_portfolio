import { motion } from "framer-motion";

import { Project, ProjectCategory } from "@/data/projects";

import ProjectRow from "./ProjectRow";
import ProjectFilters from "./ProjectFilters";

import styles from "@/styles/home/projects-grid.module.css";

interface ProjectsGridProps {
  projects: Project[];
  expandedProjects: Set<string>;
  onToggleProject: (id: string) => void;
  selectedCategories: ProjectCategory[];
  onToggleCategory: (category: ProjectCategory) => void;
  onClearFilters: () => void;
}

export default function ProjectsGrid({
  projects,
  expandedProjects,
  onToggleProject,
  selectedCategories,
  onToggleCategory,
  onClearFilters,
}: ProjectsGridProps) {
  return (
    <motion.section
      key="projects-overview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={styles.section}
    >
      <div className={styles.container}>
        <ProjectFilters
          selectedCategories={selectedCategories}
          onToggleCategory={onToggleCategory}
          onClearFilters={onClearFilters}
        />

        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              expanded={expandedProjects.has(project.id)}
              onToggle={() => onToggleProject(project.id)}
            />
          ))
        ) : (
          <p className="border-b border-black py-8 text-center text-xs text-[#999999]">
            No hay proyectos en esta categoría.
          </p>
        )}
      </div>
    </motion.section>
  );
}
