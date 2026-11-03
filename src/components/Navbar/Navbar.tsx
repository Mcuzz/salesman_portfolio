import { useState } from "react";
import NavbarLinks from "./NavbarLinks";
import NavbarSearch from "./NavbarSearch";
import Logo from "@/icons/logo.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] w-full bg-white">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1130px] py-5 sm:w-[calc(100%-48px)]">
        <nav className="flex min-h-7 items-center justify-between ">
          {/* Logo */}
          <a
            href="/"
            aria-label="Ir a proyectos"
            className="flex shrink-0 items-center"
          >
            <Logo className="h-7 w-auto max-w-[110px]" />
          </a>

          {/* Navegación de escritorio */}
          <div className="hidden min-w-0 flex-1 md:flex">
            <NavbarLinks />
          </div>

          {/* Buscador de escritorio */}
          <div className="hidden shrink-0 md:block md:relative md:-left-">
            <NavbarSearch />
          </div>

          {/* Botón móvil */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-px w-5 bg-black transition-transform ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-black transition-transform ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {/* Navegación móvil */}
        {menuOpen && (
          <div className="mt-5 border-t border-black/20 pt-5 md:hidden">
            <NavbarLinks mobile onNavigate={() => setMenuOpen(false)} />

            <div className="mt-5">
              <NavbarSearch />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
