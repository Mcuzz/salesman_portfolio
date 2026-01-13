// src/components/Navbar/NavbarLogo.tsx
// Logo del Navbar, cambia según si está invertido o no.

import Link from "next/link";

interface NavbarLogoProps {
  isInverted: boolean;
}

export default function NavbarLogo({ isInverted }: NavbarLogoProps) {
  return (
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
  );
}
