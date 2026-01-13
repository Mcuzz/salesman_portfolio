// src/components/ProjectCard/ProjectCardToggle.tsx
// Toggle button para expandir o contraer el ProjectCardPanel.

interface Props {
  isActive: boolean;
  onClick: () => void;
}

export default function ProjectCardToggle({ onClick }: Props) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="bg-[#ff2c65] w-full h-12 flex items-center justify-start px-4 cursor-pointer"
    >
      <img src="/logo.png" alt="Logo" className="h-6 w-auto" />
    </div>
  );
}
