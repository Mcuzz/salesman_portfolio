// src/components/Projects/ProjectGallery.tsx

import { ProjectImage } from "@/data/projects";
import ProjectGalleryItem from "./ProjectGalleryItem";

interface ProjectGalleryProps {
  images: ProjectImage[];
}

export default function ProjectGallery({
  images,
}: ProjectGalleryProps) {
  return (
    <section
      className="
        w-screen
        relative

        left-1/2
        right-1/2

        -ml-[50vw]
        -mr-[50vw]

        mt-12
      "
    >
      <div
        className="
          flex
          gap-8

          overflow-x-auto

          px-16
          pb-6

          snap-x
          snap-mandatory

          scrollbar-thin
          scrollbar-thumb-neutral-400
          scrollbar-track-transparent
        "
      >
        {images.map((image, index) => (
          <ProjectGalleryItem
            key={index}
            image={image}
          />
        ))}
      </div>
    </section>
  );
}