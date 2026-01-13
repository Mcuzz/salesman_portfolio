// src/components/Navbar/NavbarLinks.tsx
// Enlaces del Navbar, maneja estilos y muestra el estado de copiado.

import Link from "next/link";
import NavbarContact from "./NavbarContacts";

export default function NavbarLinks({ font, state }: any) {
  const textStyle = `
    ${font}
    font-medium transition-all duration-500 hover:scale-105
    ${state.isInverted ? "text-white hover:text-[#FF2C65]" : "text-black hover:text-[#FF2C65]"}
  `;

  return (
    <div className="ml-auto hidden md:flex gap-8 items-center relative">
      <Link href="/" className={textStyle}>HOME</Link>
      <Link href="/projects" className={textStyle}>PROJECTS</Link>
      <Link href="/about-me" className={textStyle}>ABOUT ME</Link>

      <NavbarContact textStyle={textStyle} state={state} />

      {state.copied && (
        <div className="fixed top-24 right-6 z-50 px-3 py-1 rounded bg-black text-white text-xs shadow-lg">
          {state.copied}
        </div>
      )}
    </div>
  );
}
