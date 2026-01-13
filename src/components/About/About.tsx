// src/components/About/AboutMe.tsx
// This file defines the AboutMe component which uses the ABOUT_SECTIONS.
//Estado solo aqui, nada de useStacte regado pordoquiera

import { motion } from "framer-motion";
import { useState } from "react";
import AboutHero from "./AboutHero";
import AboutContent from "./AboutContent";
import { SectionKey } from "./constants";

export default function About() {
  const [activeSection, setActiveSection] = useState<SectionKey>("About");

  return (
    <motion.div
      className="min-h-screen py-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AboutHero
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <AboutContent activeSection={activeSection} />
    </motion.div>
  );
}
