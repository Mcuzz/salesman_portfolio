import { useState } from "react";

import ProjectsGrid from "@/components/Home/ProjectsGrid";
import { projects, ProjectCategory } from "@/data/projects";

export default function Projects() {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    () => new Set(),
  );

  const [selectedCategories, setSelectedCategories] = useState<
    ProjectCategory[]
  >([]);

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  const toggleProject = (id: string) => {
    setExpandedProjects((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const toggleCategory = (category: ProjectCategory) => {
    setSelectedCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category],
    );
  };

  const filteredProjects =
    selectedCategories.length === 0
      ? projects
      : projects.filter((project) =>
          project.categories.some((category) =>
            selectedCategories.includes(category),
          ),
        );

  return (
    <section className="w-full">
      <ProjectsGrid
        projects={filteredProjects}
        expandedProjects={expandedProjects}
        onToggleProject={toggleProject}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        onClearFilters={clearFilters}
      />
    </section>
  );
}
