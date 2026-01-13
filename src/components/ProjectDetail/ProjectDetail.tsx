// src/components/ProjectDetail/ProjectDetail.tsx
//solo es el orquestador de los componentes del project detail. Este archivo no dibuja detalles.
//Solo coordina. Como debe ser.

import { useState } from "react";
import { Project } from "@/data/projects";
import ProjectGallery from "./ProjectGallery";
import ProjectInfoPanel from "./ProjectInfoPanel";
import ProjectThumbnails from "./ProjectThumbnails";

interface ProjectDetailProps {
  initialId: string;
  projects: Project[];
}

export default function ProjectDetail({ initialId, projects }: ProjectDetailProps) {
  const initialIndex = projects.findIndex(p => p.id === initialId);
  const [activeProjectIndex, setActiveProjectIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const [imageIndex, setImageIndex] = useState(0);

  const activeProject = projects[activeProjectIndex];

  return (
    <div className="min-h-screen pt-1 relative">
      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ProjectGallery
            project={activeProject}
            imageIndex={imageIndex}
            setImageIndex={setImageIndex}
          />

          <ProjectInfoPanel
            project={activeProject}
            imageIndex={imageIndex}
          />
        </div>

        <ProjectThumbnails
          projects={projects}
          activeIndex={activeProjectIndex}
          onSelect={(i) => {
            setActiveProjectIndex(i);
            setImageIndex(0);
          }}
        />
      </div>
    </div>
  );
}
