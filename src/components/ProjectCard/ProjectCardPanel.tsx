// src/components/ProjectCard/ProjectCardPanel.tsx
//se expande y muestra la info del proyecto, maneja el toggle.

import { motion } from "framer-motion";
import ProjectCardToggle from "./ProjectCardToggle";
import localFont from "next/font/local";

const Square = localFont({
  src: "../../fonts/Square.ttf",
  weight: "600",
  style: "normal",
  variable: "--font-scrambled",
});

interface Props {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  onToggle?: (id: string | null) => void;
}

export default function ProjectCardPanel({
  id,
  title,
  description,
  isActive,
  onToggle,
}: Props) {
  return (
    <motion.div
      layout
      className="bg-gray-200 relative overflow-hidden"
      style={{ originX: 0 }}
      initial={{ width: 64 }}
      animate={{ width: isActive ? 250 : 64 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <ProjectCardToggle
        isActive={isActive}
        onClick={() => onToggle && onToggle(isActive ? null : id)}
      />

      {isActive && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4"
        >
          <h3 className={`${Square.className} text-2xl font-bold mb-2`}>
            {title}
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed break-words">
            {description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
