// src/components/Projects/ProjectGalleryItem.tsx

import Image from "next/image";
import { motion } from "framer-motion";

import { ProjectImage } from "@/data/projects";

interface ProjectGalleryItemProps {
  image: ProjectImage;
}

export default function ProjectGalleryItem({
  image,
}: ProjectGalleryItemProps) {
  return (
    <motion.article
      className="
        flex-shrink-0
        snap-start

        w-[820px]
      "
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.45,
      }}
    >
      {/* Imagen */}

      <div
        className="
          relative
          w-full
          h-[560px]

          overflow-hidden

          bg-neutral-200
        "
      >
        <Image
          src={image.src}
          alt={image.description}
          fill
          sizes="820px"
          className="
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />
      </div>

      {/* Descripción */}

      <div
        className="
          mt-6
          max-w-[720px]
        "
      >
        <p
          className="
            text-[15px]
            leading-7
            text-neutral-600
          "
        >
          {image.description}
        </p>
      </div>
    </motion.article>
  );
}