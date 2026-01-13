// src/components/About/AboutContent.tsx
// This file defines the AboutContent component which renders different sections based on the activeSection prop.

import { SectionKey } from "./constants";
import AboutSection from "./sections/AboutSection";
import CVSection from "./sections/CVSection";
import ServiciosSection from "./sections/ServiciosSection";
import CamposSection from "./sections/CamposSection";
import AlcancesSection from "./sections/AlcancesSection";

export default function AboutContent({ activeSection }: { activeSection: SectionKey }) {
  switch (activeSection) {
    case "About":
      return <AboutSection />;
    case "CV":
      return <CVSection />;
    case "Servicios":
      return <ServiciosSection />;
    case "Campos":
      return <CamposSection />;
    case "Alcances":
      return <AlcancesSection />;
    default:
      return null;
  }
}
