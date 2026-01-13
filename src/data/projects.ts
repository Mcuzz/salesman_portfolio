// Cada imagen es una entidad semántica completa.
// Imagen y descripción no pueden desincronizarse.

export interface ProjectImage {
  src: string;
  description: string;
}

export type ProjectCategory =
  | "architecture"
  | "visual"
  | "experimental";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  images: ProjectImage[];
}

export const projects: Project[] = [
  {
    id: "PJCT 00.1",
    title: "Project 1",
    category: "architecture",
    description:
      "A concise architectural proposal focused on intent, constraints, and outcome...",
    images: [
      {
        src: "/projects/project-01.jpg",
        description:
          "Primary volume: establishes the spatial language of the project through controlled proportions and a restrained geometry that anchors it to its context.",
      },
      {
        src: "/projects/project-01b.jpg",
        description:
          "Transition space: explores the threshold between interior and exterior, using material continuity and filtered natural light to guide movement.",
      },
      {
        src: "/projects/project-01c.jpg",
        description:
          "Facade study: modulation strategy balancing privacy and openness in response to environmental and programmatic constraints.",
      },
    ],
  },
  {
    id: "PJCT 00.2",
    title: "Project 2",
    category: "architecture",
    description:
      "A visual-first project where spatial clarity replaces ornament as the main narrative device.",
    images: [
      {
        src: "/projects/project-02.jpg",
        description:
          "Overall massing: the composition prioritizes legibility and hierarchy over formal complexity.",
      },
      {
        src: "/projects/project-02b.jpg",
        description:
          "Interior perspective: structural rhythm defines circulation and frames the user’s experience.",
      },
      {
        src: "/projects/project-02c.jpg",
        description:
          "Detail view: material junctions reveal the project’s emphasis on precision and constructive logic.",
      },
    ],
  },
  {
    id: "PJCT A.1",
    title: "Experimental Project",
    category: "experimental",
    description:
      "Less decoration, more structure. An exercise in reduction and spatial discipline.",
    images: [
      {
        src: "/projects/project-03.jpg",
        description:
          "Exterior view: the building reads as a clear structural system rather than an object of spectacle.",
      },
      {
        src: "/projects/project-03b.jpg",
        description:
          "Sectional moment: vertical relationships clarify program distribution and scale.",
      },
      {
        src: "/projects/project-03c.jpg",
        description:
          "Interior detail: circulation is treated as an experiential sequence, not a leftover space.",
      },
    ],
  },
];
