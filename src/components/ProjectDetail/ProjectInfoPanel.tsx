// src/components/ProjectDetail/ProjectInfoPanel.tsx
//Aquí vive todo el discurso. Nada más.

import { motion, AnimatePresence } from "framer-motion";
import localFont from "next/font/local";
import { Project } from "@/data/projects";

const Square = localFont({
  src: "../../fonts/Square.ttf",
  weight: "700",
  style: "normal",
  variable: "--font-square",
});

interface Props {
  project: Project;
  imageIndex: number;
}

export default function ProjectInfoPanel({ project, imageIndex }: Props) {
  const images = project.images;

  return (
    <div className="relative w-full flex justify-center">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 w-full md:w-[60%] lg:w-[550px] bg-[#FF2C65] -z-10"
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="absolute top-10 right-6 h-16 md:h-12 w-auto"
        />
      </motion.div>

      <div className="relative w-full md:w-[60%] lg:w-[550px] px-6 md:px-10 py-12 flex flex-col">
        <h5 className={`${Square.className} text-2xl md:text-3xl mt-8 tracking-widest`}>
          {project.id}
        </h5>

        <h4 className="text-base md:text-lg mt-6 tracking-wider">
          Estudio de arquitectura experimental
        </h4>

        <h1 className={`${Square.className} text-4xl md:text-6xl lg:text-7xl mt-6 font-bold`}>
          {project.title}
        </h1>

        <p className="mt-6 leading-relaxed max-w-[380px] text-justify">
          {project.description}
        </p>

        <p className="mt-4 leading-relaxed max-w-[380px] text-justify">
          Este proyecto explora la relación entre estructura y vacío como
          principio generador del espacio. La geometría se entiende como
          proceso y no como resultado final, articulando recorridos, luz y
          materialidad en una narrativa espacial coherente, waaa waaa
          waaaaa.
        </p>

        <AnimatePresence mode="wait">
          <motion.p
            key={imageIndex}
            className="mt-6 text-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {images[imageIndex]?.description}
          </motion.p>
        </AnimatePresence>

        <h1
          className={`${Square.className} text-3xl md:text-5xl absolute right-0.5 bottom-20`}
          style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
        >
          2025 · 28 · 12
        </h1>
      </div>
    </div>
  );
}
