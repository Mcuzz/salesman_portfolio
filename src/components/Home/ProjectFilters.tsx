
import {
  PROJECT_CATEGORIES,
  ProjectCategory,
} from "@/data/projects";

interface ProjectFiltersProps {
  selectedCategories: ProjectCategory[];
  onToggleCategory: (category: ProjectCategory) => void;
  onClearFilters: () => void;
}

export default function ProjectFilters({
  selectedCategories,
  onToggleCategory,
  onClearFilters,
}: ProjectFiltersProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-black py-2">
      <div className="grid flex-1 grid-cols-2 gap-x-4 sm:grid-cols-3 md:grid-cols-5">
        {PROJECT_CATEGORIES.map((category) => {
          const active = selectedCategories.includes(category);

          return (
            <button
              key={category}
              type="button"
              onClick={() => onToggleCategory(category)}
              aria-pressed={active}
              className={`
                flex items-center gap-1 whitespace-nowrap
                text-left text-[10px] md:text-[12px]
                font-normal tracking-[-0.02em]
                transition-colors duration-200
                ${
                  active
                    ? "text-black"
                    : "text-[#999999] hover:text-black"
                }
              `}
            >
              <span className="inline-block w-3 text-center">
                {active ? "−" : "+"}
              </span>

              <span>{category}</span>
            </button>
          );
        })}
      </div>

      {selectedCategories.length > 0 && (
        <button
          type="button"
          onClick={onClearFilters}
          className="shrink-0 whitespace-nowrap text-[9px] text-[#999999] transition-colors hover:text-black"
        >
          × LIMPIAR FILTROS
        </button>
      )}
    </div>
  );
}
