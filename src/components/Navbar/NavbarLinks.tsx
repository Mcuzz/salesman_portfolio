
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import NavbarContact from "./NavbarContacts";

interface NavbarLinksProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function NavbarLinks({
  mobile = false,
  onNavigate,
}: NavbarLinksProps) {
  const router = useRouter();

  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  const links = [
    { label: "PROYECTOS", href: "/" },
    { label: "SOBRE +MODULOS", href: "/sobre-modulos" },
    { label: "EQUIPO", href: "/equipo" },
    { label: "VIVIENDA COLECTIVA", href: "/vivienda-colectiva" },
  ];

  const linkStyle = (active: boolean) => `
    whitespace-nowrap text-[13px] font-normal tracking-[0.07em]
    transition-colors duration-200
    ${
      active
        ? "text-black underline underline-offset-4"
        : "text-[#999999] hover:text-black"
    }
  `;

  return (
    <div
      className={`
        relative
        ${
          mobile
            ? "flex flex-col items-start gap-5"
            : "flex w-full items-center justify-start gap-20 pl-6"
        }
      `}
    >
      {links.map((link) => {
        const active =
          link.href === "/"
            ? router.pathname === "/"
            : router.pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`${linkStyle(active)} ${
              mobile ? "text-[11px]" : ""
            }`}
          >
            {link.label}
          </Link>
        );
      })}

      <NavbarContact
        textStyle={`${linkStyle(router.pathname === "/contact")} ${
          mobile ? "text-[11px]" : ""
        }`}
        state={{
          contactOpen,
          setContactOpen,
          isInverted: false,
          copy,
        }}
      />

      {copied && (
        <div className="fixed right-6 top-16 z-[70] rounded bg-black px-3 py-1 text-xs text-white">
          {copied}
        </div>
      )}
    </div>
  );
}

