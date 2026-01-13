// src/components/Navbar/useNavbarState.ts
// Hook para manejar el estado del Navbar, incluyendo el menú, contacto y copia al portapapeles.

import { useState } from "react";
import { useRouter } from "next/router";

export function useNavbarState(inverted?: boolean) {
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

  return {
    menuOpen,
    setMenuOpen,
    contactOpen,
    setContactOpen,
    copied,
    isInverted,
    copy,
  };
}
