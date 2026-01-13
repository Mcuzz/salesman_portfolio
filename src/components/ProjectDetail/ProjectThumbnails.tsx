// src/components/ProjectDetail/ProjectThumbnails.tsx
//muestra miniaturas de todos los proyectos para navegar entre ellos

import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/data/projects";

interface Props {
  projects: Project[];
  activeIndex: number;
  onSelect: (i: number) => void;
}

export default function ProjectThumbnails({ projects, activeIndex, onSelect }: Props) {
  return (
    <div className="mt-5 flex gap-4 flex-wrap">
      {projects.map((proj, i) => (
        <motion.div
          key={proj.id}
          className={`w-24 h-24 cursor-pointer overflow-hidden ${
            i === activeIndex ? "ring-2 ring-black" : ""
          }`}
          whileHover={{ scale: 1.08 }}
          onClick={() => onSelect(i)}
        >
          <Image
            src={proj.images[0].src}
            alt={proj.title}
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </motion.div>
      ))}
    </div>
  );
}
