export default function NavbarSearch() {
  return (
    <div className="flex h-7 w-full items-center gap-2 border-b border-black/40 md:w-[130px] ">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-black text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.8"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m19 19 4 5" />
        </svg>
      </div>

      <input
        type="search"
        placeholder="CASA ABUELOS..."
        aria-label="Buscar proyectos"
        className="min-w-0 w-full bg-transparent text-[12px] tracking-wide text-black outline-none placeholder:text-[#999999]"
      />
    </div>
  );
}
