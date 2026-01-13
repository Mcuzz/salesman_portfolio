import { motion } from "framer-motion";

export default function ServiciosSection() {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-12 mt-24 text-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-3xl font-bold mb-4">Servicios</h3>

      <p>
        Diseño arquitectónico, conceptualización, desarrollo ejecutivo,
        visualización 3D y acompañamiento en obra.
      </p>
    </motion.div>
  );
}
