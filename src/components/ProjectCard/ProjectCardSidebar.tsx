// src/components/ProjectCard/ProjectCardSidebar.tsx
//barra lateral negra con el numero del proyecto en vertical y el logo abajo, decorascion pura.

import localFont from "next/font/local";

const Square = localFont({
  src: "../../fonts/Square.ttf",
  weight: "600",
  style: "normal",
  variable: "--font-scrambled",
});
export default function ProjectCardSidebar({ number }: { number?: string }) {
  return (
    <div className="bg-black w-12 flex flex-col items-center justify-center">
      <span
        className={`${Square.className} text-white text-xl whitespace-nowrap`}
        style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
      >
        {number}
      </span>
      <img src="/logow.png" alt="Logo" className="h-6 w-auto mt-72" />
    </div>
  );
}
