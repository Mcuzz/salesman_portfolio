import { motion } from "framer-motion";

export default function CamposSection() {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-12 mt-24 text-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-3xl font-bold mb-4">Campos de estudio</h3>

      <p>
        Urbanismo, arquitectura sostenible, diseño de interiores y
        análisis del espacio habitacional.
      </p>
    </motion.div>
  );
}
