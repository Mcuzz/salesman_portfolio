// src/components/Home/Hero.tsx
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import localFont from "next/font/local";


const Square = localFont({
  src: "../../fonts/Geist.ttf",
  weight: "600",
  style: "normal",
  variable: "--font-scrambled",
});

interface HeroProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  navbarInverted: boolean;
  setNavbarInverted: (value: boolean) => void;
}

const sections = ["Architectural projects", "Artistic projects"];

export default function Hero({
  activeSection,
  setActiveSection,
  navbarInverted,
  setNavbarInverted,
}: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);

  // Efecto para invertir navbar
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroHeight = heroRef.current.offsetHeight;
      setNavbarInverted(!(window.scrollY > heroHeight - 80));
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setNavbarInverted]);

  return (
    <motion.section
      ref={heroRef}
      exit={{ opacity: 0, y: 40 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col justify-center gap-3 relative w-full max-w-[1100px] mx-auto overflow-hidden px-6
        h-[400px] sm:h-[550px] md:h-[500px] lg:h-[450px] xl:h-[370px] -mt-[135px] mb-12"
    >
      {/* Fondo */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute inset-0 flex justify-center"
      >
        <Image
          src="/images/backgroundHome.jpg"
          alt="Home background"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Cortinas 
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-[gray]/30 pointer-events-none"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 max-w-72 left-7 bg-[#FF2C65] pointer-events-none"
      />*/}

      {/* Contenido */}
      <div className="relative z-100mx-auto max-w-6xl px-11 py-24 text-white">
        <div className="flex items-start gap-12">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className={`${Square.className} text-6xl font-bold leading-[0.85] flex flex-col text-[#FFFAFA]`}
          >
            <span>SAL</span>
            <span>ESM</span>
            <span>AN</span>
            <span>POR</span>
            <span>TFO</span>
            <span>LIO</span>
          </motion.h1>

          <div className="flex flex-col gap-4 max-w-xl ml-12">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className={`${Square.className} text-2xl sm:text-5xl font-semibold `}
            >
              <span className="inline whitespace-nowrap max-w-screen-2xl ">
                SALESMAN - PORTFOLIO
              </span>
              <span className="block">Architecture</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className={`text-base sm:text-lg max-w-md`}
            >
              Proyectos del lindote del Diego. Este sera tu rincon
              personalizado del internet, lindo, ayudame a volverlo cada vez
              mas de tu gusto.
            </motion.p>
          </div>
        </div>

        {/* Barra dentro del hero */}
        <div className="absolute z-20 flex justify-end px-6 left-[275px] bottom-[115px] w-[calc(100%-275px)]">
          <div className="relative flex w-full max-w-xl px-4 flex-wrap justify-end gap-3 sm:gap-3 lg:flex-nowrap lg:justify-end lg:gap-6">
            {sections.map((sec) => {
              const isActive = activeSection === sec;
              return (
                <div key={sec} className="relative">
                  <button
                    onClick={() => setActiveSection(sec)}
                    className={`${Square.className} text-sm sm:text-xl transition-colors ${
                      isActive ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {sec}
                  </button>

                  {isActive && (
                    <motion.div
                      layoutId="about-hero-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
