// src/components/ProjectDetail/ProjectGallery.tsx
//muestra y navega entre imagenes del proyecto

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/data/projects";

interface Props {
  project: Project;
  imageIndex: number;
  setImageIndex: (v: number | ((n: number) => number)) => void;
}

export default function ProjectGallery({ project, imageIndex, setImageIndex }: Props) {
  const images = project.images;
  const n = images.length;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={images[imageIndex].src}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-[80vh]"
          layoutId={`shared-image-${project.id}`}
        >
          <Image
            src={images[imageIndex].src}
            alt={project.title}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={() => setImageIndex(i => (i - 1 + n) % n)}
          className="p-3 bg-white/60 hover:bg-white shadow"
        >
          🡠
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={() => setImageIndex(i => (i + 1) % n)}
          className="p-3 bg-white/70 hover:bg-white shadow"
        >
          🡢
        </button>
      </div>
    </div>
  );
}
