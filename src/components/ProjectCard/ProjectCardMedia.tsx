// src/components/ProjectCard/ProjectCardMedia.tsx
//solo muestra la imagen con la animacion, no sabe de estado, ni routing, ni toggles.

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  id: string;
  image: string;
  title: string;
}

export default function ProjectCardMedia({ id, image, title }: Props) {
  return (
    <motion.div
      className="flex-1 relative overflow-hidden"
      style={{ minWidth: 250, height: "100%" }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <motion.div layoutId={`shared-image-${id}`} className="w-full h-full">
        <Image
          src={image}
          alt={title}
          width={800}
          height={500}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </motion.div>
    </motion.div>
  );
}
