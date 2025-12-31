import { useState } from "react";
import Link from "next/link";
import localFont from "next/font/local";
import { useRouter } from "next/router";

const Scrambled = localFont({
  src: "../../public/fonts/Square.ttf",
  weight: "600",
  style: "normal",
  variable: "--font-scrambled",
});

type NavbarProps = {
  inverted?: boolean;
  visible?: boolean;
};

export default function Navbar({ inverted }: { inverted?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const router = useRouter();
  const isHome = router.pathname === "/";
  const isInverted = isHome ? inverted : true;

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  const textStyle = `
    ${Scrambled.className}
    font-medium
    transition-all duration-500
    hover:scale-105
    ${
      isInverted
        ? "text-white hover:text-[#FF2C65]"
        : "text-black hover:text-[#FF2C65]"
    }
  `;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b shadow-sm
        transition-colors duration-500
        ${isInverted ? "bg-black border-gray-800" : "bg-white border-gray-200"}
      `}
    >
      <nav className="max-w-[1130px] mx-auto px-6 h-16 flex items-center">
        {/* Logo */}
        <Link
          href="/"
          className="h-10 flex items-center transition-opacity duration-300 hover:opacity-80"
        >
          <img
            src={isInverted ? "/logow.png" : "/logo.png"}
            alt="Logo"
            className="h-10 w-auto ml-2 transition-all duration-500"
          />
        </Link>

        <div className="ml-auto flex items-center relative">
          {/* Desktop menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className={textStyle}>
              HOME
            </Link>
            <Link href="/projects" className={textStyle}>
              PROJECTS
            </Link>
            <Link href="/about-me" className={textStyle}>
              ABOUT ME
            </Link>

            {/* CONTACT DROPDOWN */}
            <button
              onClick={() => setContactOpen(!contactOpen)}
              className={textStyle}
            >
              CONTACT
            </button>

            {contactOpen && (
              <div
                className={`
                  absolute top-14 right-0
                  rounded-md shadow-lg
                  flex gap-4 px-4 py-3
                  transition-all duration-300
                  ${
                    isInverted
                      ? "bg-black border border-gray-700"
                      : "bg-white border border-gray-200"
                  }
                `}
              >
                {/* Redes sociales */}
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com/in/tuusuario"
                    target="_blank"
                    className="transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/icons/linkedin.svg" className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com/tuusuario"
                    target="_blank"
                    className="transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/icons/instagram.svg" className="h-5 w-5" />
                  </a>
                  <a
                    href="https://x.com/tuusuario"
                    target="_blank"
                    className="transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/icons/x.svg" className="h-5 w-5" />
                  </a>
                  <a
                    href="https://patreon.com/tuusuario"
                    target="_blank"
                    className="transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/icons/patreon.svg" className="h-5 w-5" />
                  </a>
                </div>

                {/* Separador */}
                <div className={`w-px bg-gray-400 opacity-20`}></div>

                {/* Contacto directo */}
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => copy("correo@ejemplo.com", "Email copiado")}
                  >
                    <img src="/icons/mail.svg" className="h-5 w-5" />
                    <span className="text-xs text-white opacity-70">⧉</span>
                  </button>
                  <button
                    onClick={() =>
                      copy("+52 1 55 1234 5678", "Teléfono copiado")
                    }
                  >
                    <img src="/icons/phone.svg" className="h-5 w-5" />
                    <span className="text-xs opacity-70 text-white ">⧉</span>
                  </button>
                </div>
              </div>
            )}

            {/* Feedback toast fijo en pantalla, junto al menú */}
            {copied && (
              <div
                className={`fixed top-24 right-6 z-50 px-3 py-1 rounded bg-black text-white text-xs shadow-lg transition-opacity duration-300`}
              >
                {copied}
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden ml-4 p-2 rounded-md"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              src={menuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
              alt="Menu"
              className={`h-6 w-6 transition duration-500 ${
                isInverted ? "invert" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`
            md:hidden backdrop-blur-md border-t shadow-md transition-colors duration-500
            ${
              isInverted
                ? "bg-black/90 border-gray-800"
                : "bg-white/90 border-gray-200"
            }
          `}
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            <Link href="/" className={textStyle}>
              Home
            </Link>
            <Link href="/projects" className={textStyle}>
              Projects
            </Link>
            <Link href="/about-me" className={textStyle}>
              About me
            </Link>

            {/* Mobile contact icons */}
            <div className="flex gap-4 pt-4">
              <a href="https://linkedin.com/in/tuusuario">
                <img src="/icons/linkedin.svg" className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/tuusuario">
                <img src="/icons/instagram.svg" className="h-5 w-5" />
              </a>
              <button
                onClick={() => copy("correo@ejemplo.com", "Email copiado")}
                className="flex items-center gap-1"
              >
                <img src="/icons/mail.svg" className="h-5 w-5" />
                <span className="text-xs opacity-70">⧉</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
