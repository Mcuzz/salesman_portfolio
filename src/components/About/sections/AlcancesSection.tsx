import { motion } from "framer-motion";

export default function AlcancesSection() {
  return (
    <motion.div
      className="max-w-6xl mx-auto px-12 mt-24 text-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-3xl font-bold mb-4">Alcances</h3>

      <p>
        Proyectos a escala local y regional, con capacidad de adaptación a
        distintos contextos y necesidades del cliente.
      </p>
    </motion.div>
  );
}
