// src/components/Home/Hero.tsx
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "@/styles/home/hero.module.css";

interface HeroProps {
  navbarInverted: boolean;
  setNavbarInverted: (value: boolean) => void;
}

export default function Hero({
  navbarInverted,
  setNavbarInverted,
}: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);

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
      className={styles.hero}
    >
      {/* Leyendas superiores */}
      <div className={styles.eyebrow}>
        <span>+MODULOS</span>
        <span>DICIPULOS DE LOS ESPACIOS</span>
      </div>

      {/* Línea debajo de las leyendas */}
      <div className={styles.rule} />

      {/* Imagen de fondo del hero */}
      <div className={styles.imageFrame}>
        <Image
          src="/images/bg1.jpeg"
          alt="Home background"
          fill
          priority
          className={styles.background}
        />

        {/* Símbolos "+" en las esquinas */}
        <span className={`${styles.mark} ${styles.topLeft}`}>
          +
        </span>

        <span className={`${styles.mark} ${styles.topRight}`}>
          +
        </span>

        <span className={`${styles.mark} ${styles.bottomRight}`}>
          +
        </span>

        {/* Logo en la esquina inferior izquierda */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/modulos.svg"
          alt="Modulos"
          className={styles.logo}
        />
      </div>
    </motion.section>
  );
}
