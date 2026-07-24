"use client";

import { useEffect, useRef } from "react";
import { ProjectImage } from "@/data/projects";
import ProjectGalleryItem from "./ProjectGalleryItem";

interface ProjectGalleryProps {
  images: ProjectImage[];
}

export default function ProjectGallery({
  images,
}: ProjectGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      galleryRef.current?.scrollTo({
        left: -300,
        behavior: "instant",
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      className="
        w-screen
        relative
        left-1/2
        right-1/2
        -ml-[50vw]
        -mr-[50vw]
        mt-2
      "
    >
      <div
        ref={galleryRef}
        className="
          flex
          gap-8

          overflow-x-auto

          px-16
          pb-6

          snap-x
          snap-mandatory

          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
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