// src/components/ProjectCard/ProjectCard.tsx
// no sabe como se ve la pantalla, ni maneja eventos finos, solo conecta piezas. 

import { motion } from "framer-motion";
import { useRouter } from "next/router";
import ProjectCardMedia from "./ProjectCardMedia";
import ProjectCardSidebar from "./ProjectCardSidebar";
import ProjectCardPanel from "./ProjectCardPanel";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  images: string;
  number?: string;
  isActive?: boolean;
  onSelect?: (id: string | null) => void;
}

export default function ProjectCard({
  id,
  title,
  description,
  images,
  number,
  isActive = false,
  onSelect,
}: ProjectCardProps) {
  const router = useRouter();

  return (
    <motion.div
      layout
      onClick={() => {
        if (isActive) router.push(`/projects/${id}`);
      }}
      className="flex w-full max-w-6xl cursor-pointer overflow-hidden shadow-lg bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isActive ? 1 : 0.9,
        height: isActive ? 550 : 450,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <ProjectCardMedia id={id} image={images} title={title} />

      <div className="flex flex-row">
        <ProjectCardSidebar number={number} />
        <ProjectCardPanel
          id={id}
          title={title}
          description={description}
          isActive={isActive}
          onToggle={onSelect}
        />
      </div>
    </motion.div>
  );
}