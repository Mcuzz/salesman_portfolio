// src/components/Navbar.tsx
import { useState } from "react";
import Link from "next/link";
import localFont from "next/font/local";
import { useRouter } from "next/router";

const Scrambled = localFont({
  src: "../../public/fonts/Geist.ttf",
  weight: "600",
  style: "normal",
  variable: "--font-scrambled",
});

export default function Navbar({ inverted }: { inverted?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const isHome = router.pathname === "/";
  const isInverted = isHome ? inverted : true;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b shadow-sm
        transition-colors duration-500
        ${inverted ? "bg-black border-gray-800" : "bg-white border-gray-200"}
      `}
    >
      <nav className="max-w-[1130px] mx-auto px-6 h-16 flex items-center">
        {/* Logo */}
        <Link
          href="/"
          className="h-10 flex items-center transition-opacity duration-300 hover:opacity-80"
        >
          <img
            src={inverted ? "/logow.png" : "/logo.png"}
            alt="Logo"
            className="h-10 w-auto ml-2 transition-all duration-500"
          />
        </Link>

        <div className="ml-auto flex items-center">
          {/* Desktop menu */}
          <div className="hidden md:flex gap-8">
            {["HOME", "PROJECTS", "ABOUT ME", "CONTACT"].map((item) => (
              <Link
                key={item}
                href={`/${item === "HOME" ? "" : item.toLowerCase().replace(" ", "-")}`}
                className={`
                  ${Scrambled.className} font-medium transition-all duration-500 hover:scale-105
                  ${inverted ? "text-white hover:text-[#FF2C65]" : "text-black hover:text-[#FF2C65]"}
                `}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden ml-4 p-2 rounded-md"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              src={menuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
              alt="Menu"
              className={`h-6 w-6 transition duration-500 ${inverted ? "invert" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`
            md:hidden backdrop-blur-md border-t shadow-md transition-colors duration-500
            ${inverted ? "bg-black/90 border-gray-800" : "bg-white/90 border-gray-200"}
          `}
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {["Home", "Projects", "About me", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "-")}`}
                className={`
                  ${Scrambled.className} font-medium transition-all duration-500 hover:scale-105
                  ${inverted ? "text-white hover:text-[#FF2C65]" : "text-black hover:text-[#FF2C65]"}
                `}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
