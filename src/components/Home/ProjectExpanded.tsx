// src/components/Projects/ProjectExpanded.tsx

import { Project } from "@/data/projects";

interface Props {
  project: Project;
}

export default function ProjectExpanded({ project }: Props) {
  return (
    <div className="px-8 py-10 bg-neutral-100">
      <h3 className="text-2xl font-bold mb-4">
        {project.title}
      </h3>

      <p className="max-w-3xl text-neutral-600">
        {project.description}
      </p>
    </div>
  );
}