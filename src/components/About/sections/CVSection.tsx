import { motion } from "framer-motion";

export default function CVSection() {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-12 mt-24 text-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-3xl font-bold mb-4">Currículum</h3>

      <p>
        Experiencia en proyectos residenciales y comerciales, dominio de
        herramientas CAD, BIM y visualización arquitectónica.
      </p>
    </motion.div>
  );
}
