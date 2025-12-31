// src/components/ProjectDetail.tsx
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Project } from "../data/projects";
import localFont from "next/font/local";

const square = localFont({
  src: "../../public/fonts/Square.ttf",
  weight: "700",
  style: "normal",
  variable: "--font-outward",
});

interface ProjectDetailProps {
  initialId: string;
  projects: Project[];
}

export default function ProjectDetail({
  initialId,
  projects,
}: ProjectDetailProps) {
  const router = useRouter();

  const initialIndex = projects.findIndex((p) => p.id === initialId);
  const [activeProjectIndex, setActiveProjectIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const [imageIndex, setImageIndex] = useState(0);

  const activeProject = projects[activeProjectIndex];
  const images = activeProject.images;
  const n = images.length;

  const prevImage = () => setImageIndex((i) => (i - 1 + n) % n);
  const nextImage = () => setImageIndex((i) => (i + 1) % n);

  return (
    <div className="min-h-screen pt-1 relative">
      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Imagen principal */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={images[imageIndex].src}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-[80vh]"
                layoutId={`shared-image-${activeProject.id}`}
              >
                <Image
                  src={images[imageIndex].src}
                  alt={activeProject.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Controles */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={prevImage}
                className="p-3 bg-white/60 hover:bg-white shadow"
              >
                🡠
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={nextImage}
                className="p-3 bg-white/70 hover:bg-white shadow"
              >
                🡢
              </button>
            </div>
          </div>

          {/* Texto + rectángulo rosa en contenedor compartido */}
          <div className="relative w-full flex justify-center">
            {/* Rectángulo rosa */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="
                absolute inset-0
                w-full
                md:w-[60%]
                lg:w-[550px]
                bg-[#FF2C65]
                pointer-events-none
                -z-10
              "
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="absolute top-20 right-6 h-16 md:h-12 w-auto"
              />
            </motion.div>

            {/* Contenedor del texto */}
            <div
              className="
                relative
                w-full
                md:w-[60%]
                lg:w-[550px]
                px-6
                md:px-10
                py-12
                flex flex-col
              "
            >
              <h5
                className={`${square.className} text-2xl md:text-3xl font-bold mt-8 tracking-widest`}
              >
                {activeProject.id}
              </h5>

              <h4
                className={` text-base md:text-lg mt-6 tracking-wider`}
              >
                Estudio de arquitectura experimental
              </h4>

              <h1
                className={`${square.className} text-4xl md:text-6xl lg:text-7xl mt-6 font-bold leading-tight break-words`}
              >
                {activeProject.title}
              </h1>

              <p className="text-black mt-6 leading-relaxed break-words max-w-[380px] text-justify">
                {activeProject.description}
              </p>

              <p className="text-black mt-4 leading-relaxed text-justify break-words max-w-[380px]">
                Este proyecto explora la relación entre estructura y vacío como
                principio generador del espacio. La geometría se entiende como
                proceso y no como resultado final, articulando recorridos, luz y
                materialidad en una narrativa espacial coherente, waaa waaa
                waaaaa.
              </p>

              <AnimatePresence mode="wait">
                <motion.p
                  key={imageIndex}
                  className="text-black mt-6 text-sm break-words"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {images[imageIndex]?.description}
                </motion.p>
              </AnimatePresence>

              <h1
                className={`${square.className} text-3xl md:text-5xl font-bold absolute right-0.5 bottom-4`}
                style={{
                  writingMode: "vertical-lr",
                  transform: "rotate(180deg)",
                }}
              >
                2025 · 28 · 12
              </h1>
            </div>
          </div>
        </div>

        {/* Miniaturas de otros proyectos */}
        <div className="mt-5 flex gap-4 flex-wrap">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.id}
              className={`w-24 h-24 cursor-pointer overflow-hidden ${
                i === activeProjectIndex ? "ring-2 ring-black" : ""
              }`}
              whileHover={{ scale: 1.08 }}
              onClick={() => {
                setActiveProjectIndex(i);
                setImageIndex(0);
              }}
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
      </div>
    </div>
  );
}
