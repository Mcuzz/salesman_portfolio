// src/pages/index.tsx
import { useState, useRef, useEffect } from "react";
import Layout from "../layout/Layout";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "../data/projects"; // Tus 4 imágenes y datos
import localFont from "next/font/local";
import { useRouter } from "next/router";
import intro from "@/components/intro";

const Geist = localFont({
  src: "../../public/fonts/Scrambled.ttf",
  weight: "600",
  style: "normal",
  variable: "--font-geist",
});

const Geist2 = localFont({
  src: "../../public/fonts/Square.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-geist2",
});

const sections = ["Architectural projects", "Artistic projects"];



export default function Home() {
  // ================== STATE ==================
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("Architectural projects");
  const [showIntro, setShowIntro] = useState(true);
  const [navbarInverted, setNavbarInverted] = useState(false);

  const handleSelect = (id: string | null) => {
  setActiveProject(prev => (prev === id ? null : id));
};


  // ================== REFS ==================
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  

  // ================== EFFECTS ==================

  // Animación inicial de entrada de las cards
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      card.style.opacity = "0";
      setTimeout(() => {
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 150);
    });
  }, []);

  // Detectar clicks afuera del contenedor
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveProject(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Invertir navbar al pasar el hero
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroHeight = heroRef.current.offsetHeight;
      setNavbarInverted(!(window.scrollY > heroHeight - 80));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ================== HANDLERS ==================
  

  return (
    <Layout>
      <Navbar inverted={navbarInverted} />

      <main className="pt-10">
        {/* ===================== HERO SECTION ===================== */}
        <motion.section
          ref={heroRef}
          exit={{ opacity: 0, y: 40 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center gap-3 relative w-full max-w-[1100px] mx-auto overflow-hidden px-6
          h-[600px] sm:h-[550px] md:h-[500px] lg:h-[450px] xl:h-[670px]"
          //tamano del hero acorde al viewport
        >
          {/* ---------- Fondo full width ---------- */}
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

          {/* ---------- Cortina roja ---------- */}
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
          >
            {/*<img
              src="/logo.png"
              alt="Logo"
              className="absolute top-9 right-3 h-10 w-auto"
            />*/}
          </motion.div>

          {/* ---------- Contenido alineado con las cards ---------- */}
          <div className="relative z-100mx-auto max-w-6xl px-11 py-24 text-white">
            <div className="flex items-start gap-12">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className={`${Geist.className}
                   text-3xl
                   sm:text-4xl
                   md:text-5xl
                   lg:text-6xl
                   xl:text-8xl
                   font-bold
                   leading-[0.85]
                   flex flex-col
                   text-black
                 `}
              >
                <span>SAL</span>
                <span>ESM</span>
                <span>AN</span>
                <span>POR</span>
                <span>TFO</span>
                <span>LIO</span>
              </motion.h1>

              <div className="flex flex-col gap-4 max-w-xl">
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className={`${Geist.className} text-2xl sm:text-5xl font-semibold`}
                >
                  <span className="inline whitespace-nowrap max-w-screen-2xl">
  SALESMAN - PORTFOLIO
</span>
<span className="block">
  Architecture
</span>
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
          </div>
        </motion.section>

        {/* Barra de navegación dentro del hero */}
        <div
          className="
    absolute z-20 flex justify-end px-6 right-40 
    bottom-96 sm:bottom-80 md:bottom-[350px] lg:bottom-[280px] xl:bottom-[85px]
  "
        >
          <div
            className="
      relative flex w-full max-w-xl px-4
      flex-wrap justify-end gap-3
      sm:gap-3
      lg:flex-nowrap lg:justify-end lg:gap-6
    "
          >
            {sections.map((sec) => {
              const isActive = activeSection === sec;
              return (
                <div key={sec} className="relative">
                  <button
                    onClick={() => setActiveSection(sec)}
                    className={`${
                      Geist.className
                    } text-sm sm:text-xl transition-colors ${
                      isActive ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {sec}
                  </button>

                  {isActive && (
                    <motion.div
                      layoutId="about-hero-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Secciones dinámicas debajo del hero */}
        <div className="relative z-10 w-full  mt-24 sm:mt-5 md:mt-10 text-black">
          {activeSection === "Architectural projects" && (
            <motion.div
              key="architectural-projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* ===================== PROJECTS GRID ===================== */}
              <h3
                className={`${Geist.className} text-5xl font-bold mb-4 max-w-[1080px] mx-auto`}
              >
                OVERVIEW
              </h3>
              <p className={`mb-6 max-w-[1080px] mx-auto`}>
                Vista rapida a los proyectos y conceptos para darte una idea de
                mi enfoque, estetica e ideas que quiero proyectar.
              </p>
              <section
                className="mt-10 w-full grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:max-w-6xl lg:mx-auto"
                style={{ maxWidth: "1160px", margin: "40px auto" }}
              >
                {projects.map((project) => {
                  const isActive = activeProject === project.id;

                  return (
                    <div
                      key={project.id}
                      className={isActive ? "lg:col-span-2" : ""}
                    >
                      <ProjectCard
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        images={project.images[0].src}
                        number={project.id}
                        isActive={isActive}
                        onSelect={handleSelect}
                      />
                    </div>
                  );
                })}
              </section>
            </motion.div>
          )}

          {activeSection === "Artistic projects" && (
            <motion.div
              key="artistic-projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3
                className={`${Geist.className} text-3xl font-bold mb-4 max-w-[900px] mx-auto`}
              >
                Cuando las cards de esto esten listas...
              </h3>
              <p className={` mb-6 max-w-[900px] mx-auto`}>
                Aqui mi tilin agrega todos sus proyectos artisticos qque no
                necesariamente tienen que ver con la carrera, si no con el
                preciso placer que crear por gusto, materializar lo abstracto y
                fascinante de las ideas en un solo lienzo.
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <footer className="w-full mt-32 py-10 text-center text-gray-500">
          © 2025 Salesman.
        </footer>
      </main>
    </Layout>
  );
}
