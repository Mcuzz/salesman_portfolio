
import { motion, AnimatePresence } from "framer-motion";

import { Project } from "@/data/projects";
import ProjectExpanded from "./ProjectExpanded";
import styles from "@/styles/home/project-row.module.css";

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
      <div className={styles.row}>
        <div className={styles.columns}>
          <div className={styles.projectName}>
            <button
              onClick={onToggle}
              className={styles.toggle}
              aria-expanded={expanded}
              aria-label={
                expanded
                  ? `Contraer ${project.title}`
                  : `Expandir ${project.title}`
              }
            >
              {expanded ? "−" : "+"}
            </button>

            <h3 className={styles.title}>{project.title}</h3>
          </div>

          <div className={styles.detail}>{project.type}</div>

          <div className={styles.detail}>{project.status}</div>

          <div className={styles.locationYear}>
            <div className={`${styles.detail} ${styles.location}`}>
              {project.location}
            </div>

            <div className={styles.detail}>{project.year}</div>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              height: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            style={{ overflow: "hidden" }}
          >
            <ProjectExpanded project={project} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
