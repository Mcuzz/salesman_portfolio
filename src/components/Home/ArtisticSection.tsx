// src/components/Home/ArtisticSection.tsx
import { motion } from "framer-motion";
import localFont from "next/font/local";

const Square = localFont({
  src: "../../fonts/Square.ttf",
  weight: "600",
  style: "normal",
  variable: "--font-scrambled",
});

export default function ArtisticSection() {
  return (
    <motion.div
      key="artistic-projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className={`${Square.className} text-3xl font-bold mb-4 max-w-[900px] mx-auto`}>
        Cuando las cards de esto esten listas...
      </h3>
      <p className="mb-6 max-w-[900px] mx-auto">
        Aqui mi tilin agrega todos sus proyectos artisticos qque no necesariamente tienen que ver con la carrera, si no con el preciso placer que crear por gusto, materializar lo abstracto y fascinante de las ideas en un solo lienzo.
      </p>
    </motion.div>
  );
}
