
// Cada imagen es una entidad semántica completa.
// Imagen y descripción no pueden desincronizarse.

export interface ProjectImage {
  src: string;
  description: string;
}

export const PROJECT_CATEGORIES = [
  "VIVIENDA COLECTIVA",
  "INFRAESTRUCTURA",
  "RESIDENCIAS",
  "CULTURA",
  "ARTE",
] as const;

export type ProjectCategory =
  (typeof PROJECT_CATEGORIES)[number];

export type ProjectType =
  | "Casa habitación"
  | "Condominio"
  | "Comercial"
  | "Museo"
  | "Hotel"
  | "Urbanismo"
  | "Concurso";

export type ProjectStatus =
  | "Anteproyecto"
  | "Proyecto Ejecutivo"
  | "Construido";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  categories: ProjectCategory[];
  type: ProjectType;
  status: ProjectStatus;
  location: string;
  year: number;
  images: ProjectImage[];
}

// Imagen predeterminada para proyectos sin fotografías propias.
const PLACEHOLDER_IMAGE: ProjectImage = {
  src: "/images/project-placeholder.png",
  description: "Imagen de referencia no disponible. Fotografía pendiente."
};

export const projects: Project[] = [
   {
    id: "mural-unison",
    title: "Mural UNISON",
    subtitle: "Intervención artística en la universidad",
    description: "Lorem itsum jisjas",
    categories: ["ARTE"],
    type: "Comercial",
    status: "Anteproyecto",
    location: "Hermosillo, Sonora, México",
    year: 2026,
    images: [{ src: "/projects/mural/f1Mural.png", description: "Propuesta de mural en la Universidad de Sonora, Hermosillo, Sonora, México." },{ src: "/projects/mural/f1Mural.png", description: "Propuesta de mural en la Universidad de Sonora, Hermosillo, Sonora, México." },{ src: "/projects/mural/f1Mural.png", description: "Propuesta de mural en la Universidad de Sonora, Hermosillo, Sonora, México." },{ src: "/projects/mural/f1Mural.png", description: "Propuesta de mural en la Universidad de Sonora, Hermosillo, Sonora, México." },{ src: "/projects/mural/f1Mural.png", description: "Propuesta de mural en la Universidad de Sonora, Hermosillo, Sonora, México." },{ src: "/projects/mural/f1Mural.png", description: "Propuesta de mural en la Universidad de Sonora, Hermosillo, Sonora, México." },{ src: "/projects/mural/f1Mural.png", description: "Propuesta de mural en la Universidad de Sonora, Hermosillo, Sonora, México." },{ src: "/projects/mural/f1Mural.png", description: "Propuesta de mural en la Universidad de Sonora, Hermosillo, Sonora, México." },{ src: "/projects/mural/f1Mural.png", description: "Propuesta de mural en la Universidad de Sonora, Hermosillo, Sonora, México." }]
  },
  {
    id: "casa-abuelos",
    title: "Casa Abuelos",
    subtitle: "Residencia unifamiliar",
    description:
      "Proyecto residencial concebido como una exploración de la relación entre paisaje, materialidad y proporción.",
    categories: ["ARTE", "CULTURA"],
    type: "Casa habitación",
    status: "Anteproyecto",
    location: "Magdalena, Sonora, México",
    year: 2026,
    images: [PLACEHOLDER_IMAGE]
  },

  {
    id: "casa-lopez",
    title: "Casa López",
    subtitle: "Residencia con patio central",
    description:
      "Residencia desarrollada a partir de una composición lineal y patios interiores.",
    categories: ["ARTE", "CULTURA"],
    type: "Casa habitación",
    status: "Proyecto Ejecutivo",
    location: "Hermosillo, Sonora, México",
    year: 2024,
    images: [PLACEHOLDER_IMAGE]
  }

];
