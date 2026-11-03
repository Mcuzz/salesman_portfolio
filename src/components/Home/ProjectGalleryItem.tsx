
import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { ProjectImage } from "@/data/projects";
import styles from "@/styles/home/project-gallery-item.module.css";

interface ProjectGalleryItemProps {
  image: ProjectImage;
  expansion: number;
  onImageLoad: () => void;
}

export default function ProjectGalleryItem({
  image,
  expansion,
  onImageLoad,
}: ProjectGalleryItemProps) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [baseImageWidth, setBaseImageWidth] = useState(0);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  const scale = 1 + 1.5 * expansion;

  // Reserva el espacio que ocupa visualmente el crecimiento de la imagen.
  const extraSpace = baseImageWidth * (scale - 1);

  useLayoutEffect(() => {
    const imageFrame = imageFrameRef.current;
    if (!imageFrame) return;

    const updateBaseWidth = () => {
      setBaseImageWidth(imageFrame.offsetWidth);
    };

    const resizeObserver = new ResizeObserver(updateBaseWidth);

    resizeObserver.observe(imageFrame);
    updateBaseWidth();

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <motion.article
      className={styles.item}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      style={{ zIndex: 1 + Math.round(expansion * 10) }}
    >
      <div
        ref={imageFrameRef}
        className={styles.imageFrame}
        style={
          {
            "--image-ratio": aspectRatio ?? 1.5,
            transform: `scale(${scale})`,
            marginRight: `${extraSpace}px`,
          } as React.CSSProperties
        }
      >
        <Image
          src={image.src}
          alt={image.description}
          fill
          sizes="(max-width: 639px) 90vw, 50vw"
          className={styles.image}
          onLoad={(event) => {
            const loadedImage = event.currentTarget;

            if (loadedImage.naturalWidth && loadedImage.naturalHeight) {
              setAspectRatio(
                loadedImage.naturalWidth / loadedImage.naturalHeight
              );
              onImageLoad();
            }
          }}
        />
      </div>

      <div className={styles.description}>
        <p className={styles.caption}>{image.description}</p>
      </div>
    </motion.article>
  );
}
