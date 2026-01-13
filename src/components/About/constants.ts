// src/components/About/constants.ts
// This file defines constants and types related to About sections.

export const SECTIONS = ["About", "CV", "Servicios", "Campos", "Alcances"] as const;
export type SectionKey = typeof SECTIONS[number];
export type AboutSection = SectionKey;