import { motion } from "framer-motion";
import Image from "next/image";
import localFont from "next/font/local";
import { useRouter } from "next/router";

const Outward = localFont({
  src: "../../public/fonts/Geist.ttf",
  weight: "600",
  style: "normal",
  variable: "--font-outward",
});
const Geist = localFont({
  src: "../../public/fonts/Geist.ttf",
  weight: "600",
  style: "normal",
  variable: "--font-geist",
});


interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  images: string;
  number?: string;
  isActive?: boolean;
  onSelect?: (id: string) => void;
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
  const baseHeight = 450; // altura base de la tarjeta
  const expandedHeight = 550; // altura cuando está expandida

  const router = useRouter( );

  return (
    <motion.div
      layout
      onClick={() => {
        if (isActive) {
          router.push(`/projects/${id}`);
        } else {
          onSelect && onSelect(id);
        }
      }}
      className="flex w-full max-w-6xl cursor-pointer overflow-hidden shadow-lg bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isActive ? 1 : 0.9, // activa normal, las demás se encogen
        height: isActive ? expandedHeight : baseHeight,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Imagen izquierda */}
      <motion.div
        className="flex-1 relative overflow-hidden"
        style={{ minWidth: 250, height: "100%" }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.div layoutId={`shared-image-${id}`} className="w-full h-full">
          <Image
            src={images}
            alt={title}
            width={800}
            height={500}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Contenedor derecho */}
      <div className="flex flex-row">
        {/* Negro vertical con número y logo abajo */}
        <div className="bg-black w-12 flex flex-col items-center justify-center">
          <span
            className={`${Geist.className} text-white text-xl whitespace-nowrap`}
            style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
          >
            {number}
          </span>
          <img src="/logow.png" alt="Logo" className="h-6 w-auto mt-72" />
        </div>

        {/* Gris expandible hacia la derecha */}
        <motion.div
          layout
          className="bg-gray-200 relative overflow-hidden"
          style={{ originX: 0 }} //se supone que ancla a la izquierda
          initial={{ width: 64 }}
          animate={{ width: isActive ? 250 : 64 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Pestaña rosa superior */}
          <div className="bg-[#ff2c65] w-full h-12 flex items-center justify-start px-4">
            <img src="/logo.png" alt="Logo" className="h-6 w-auto" />
          </div>

          {/* Contenido expandido */}
          {isActive && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4"
            >
              <h3 className={`${Outward.className} text-2xl font-bold mb-2`}>
                {title}
              </h3>
              <p
                className={` text-gray-700 text-sm leading-relaxed mb-4 break-words`}
                style={{
                  maxWidth: "100%", // asegura que no sobrepase el panel gris
                }}
              >
                {description}
                {}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
