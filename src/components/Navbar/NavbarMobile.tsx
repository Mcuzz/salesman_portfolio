// src/components/Navbar/NavbarMobile.tsx
// Componente del menú móvil del Navbar, maneja la visualización de enlaces y contactos.

import Link from "next/link";
const font = `font-scrambled`;

interface NavbarMobileState {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isInverted: boolean;
  copy: (text: string, label: string) => void;
}

interface NavbarMobileProps {
  state: NavbarMobileState;
}

export default function NavbarMobile({ state }: NavbarMobileProps) {
  const { menuOpen, setMenuOpen, isInverted, copy } = state;
  const textStyle = `
    ${font}
    font-medium transition-all duration-500
    ${state.isInverted ? "text-white" : "text-black"}
  `;

  return (
    <>
      {/* Hamburger */}
      <button
        className="md:hidden absolute right-6 top-4 p-2 rounded-md"
        onClick={() => state.setMenuOpen(!state.menuOpen)}
      >
        <img
          src={state.menuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
          alt="Menu"
          className={`h-6 w-6 transition duration-500 ${
            state.isInverted ? "invert" : ""
          }`}
        />
      </button>

      {/* Mobile menu */}
      {state.menuOpen && (
        <div
          className={`
            md:hidden backdrop-blur-md border-t shadow-md transition-colors duration-500
            ${
              state.isInverted
                ? "bg-black/90 border-gray-800"
                : "bg-white/90 border-gray-200"
            }
          `}
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            <Link href="/" className={textStyle}>HOME</Link>
            <Link href="/projects" className={textStyle}>PROJECTS</Link>
            <Link href="/about-me" className={textStyle}>ABOUT ME</Link>

            <div className="flex gap-4 pt-4">
              <a href="https://linkedin.com/in/tuusuario">
                <img src="/icons/linkedin.svg" className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/tuusuario">
                <img src="/icons/instagram.svg" className="h-5 w-5" />
              </a>
              <button
                onClick={() =>
                  state.copy("correo@ejemplo.com", "Email copiado")
                }
                className="flex items-center gap-1"
              >
                <img src="/icons/mail.svg" className="h-5 w-5" />
                <span className="text-xs opacity-70">⧉</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
