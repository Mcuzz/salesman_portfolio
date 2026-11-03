// src/components/Projects/ProjectExpanded.tsx

import { Project } from "@/data/projects";
import ProjectGallery from "./ProjectGallery";
import styles from "@/styles/home/project-expanded.module.css";

interface Props {
  project: Project;
}

export default function ProjectExpanded({ project }: Props) {
  return (
    <div className={styles.expanded}>
      <ProjectGallery images={project.images} />
    </div>
  );
}
