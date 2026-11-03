import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { ProjectImage } from "@/data/projects";
import ProjectGalleryItem from "./ProjectGalleryItem";
import styles from "@/styles/home/project-gallery.module.css";
import itemStyles from "@/styles/home/project-gallery-item.module.css";

interface ProjectGalleryProps {
  images: ProjectImage[];
}

const DEFAULT_ACTIVATION_RANGE = 520;

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [expansionProgress, setExpansionProgress] = useState<number[]>(() =>
    images.map((_, index) => (index === 0 ? 1 : 0)),
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const leadingSpaceRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasUserScrolledRef = useRef(false);
  const lastScrollLeftRef = useRef(0);
  const didDragRef = useRef(false);
  const navigationFrameRef = useRef<number | null>(null);

  const dragRef = useRef<{
    startX: number;
    startScrollLeft: number;
  } | null>(null);

  const updateExpansion = useCallback(() => {
    const track = trackRef.current;

    if (!track || !hasUserScrolledRef.current) return;

    const leadingSpace = leadingSpaceRef.current;
    if (!leadingSpace) return;

    const activationContentX = track.scrollLeft + leadingSpace.offsetWidth / 2;

    const items = Array.from(
      track.querySelectorAll<HTMLElement>(`.${itemStyles.item}`),
    );

    const imageStarts = items.map((item) => {
      const imageFrame = item.querySelector<HTMLElement>(
        `.${itemStyles.imageFrame}`,
      );

      if (!imageFrame) return null;

      return item.offsetLeft + imageFrame.offsetLeft;
    });

    const nextProgress = imageStarts.map((imageStart, index) => {
      if (imageStart === null) return 0;

      const direction = activationContentX < imageStart ? -1 : 1;
      const neighborStart = imageStarts[index + direction];

      const activationRange =
        neighborStart === undefined || neighborStart === null
          ? DEFAULT_ACTIVATION_RANGE
          : Math.abs(neighborStart - imageStart);

      const distance = Math.abs(activationContentX - imageStart);
      const progress = Math.max(0, 1 - distance / activationRange);

      return progress * progress * (3 - 2 * progress);
    });

    setExpansionProgress((previous) => {
      const unchanged =
        previous.length === nextProgress.length &&
        nextProgress.every(
          (value, index) => Math.abs(value - (previous[index] ?? 0)) < 0.005,
        );

      return unchanged ? previous : nextProgress;
    });
  }, []);

  const scheduleExpansionUpdate = useCallback(() => {
    if (animationFrameRef.current !== null) return;

    animationFrameRef.current = requestAnimationFrame(() => {
      animationFrameRef.current = null;
      updateExpansion();
    });
  }, [updateExpansion]);

  const animateScrollTo = useCallback((target: number) => {
    const track = trackRef.current;
    if (!track) return;

    if (navigationFrameRef.current !== null) {
      cancelAnimationFrame(navigationFrameRef.current);
    }

    const start = track.scrollLeft;
    const distance = target - start;
    const duration = 850;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Curva ease-in-out cúbica.
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      track.scrollLeft = start + distance * eased;

      if (progress < 1) {
        navigationFrameRef.current = requestAnimationFrame(animate);
      } else {
        navigationFrameRef.current = null;
      }
    };

    navigationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const leadingSpace = leadingSpaceRef.current;

    if (!track || !leadingSpace) return;

    if (navigationFrameRef.current !== null) {
      cancelAnimationFrame(navigationFrameRef.current);
      navigationFrameRef.current = null;
    }

    let previousLeadingWidth = leadingSpace.offsetWidth / 2;

    track.scrollLeft = previousLeadingWidth;
    lastScrollLeftRef.current = track.scrollLeft;

    const resizeObserver = new ResizeObserver(() => {
      scheduleExpansionUpdate();
    });

    resizeObserver.observe(track);

    const handleResize = () => {
      const nextLeadingWidth = leadingSpace.offsetWidth / 2;

      track.scrollLeft += nextLeadingWidth - previousLeadingWidth;
      previousLeadingWidth = nextLeadingWidth;
      lastScrollLeftRef.current = track.scrollLeft;

      scheduleExpansionUpdate();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [images.length, scheduleExpansionUpdate]);

  const getImageStarts = () => {
    const track = trackRef.current;

    if (!track) return [];

    const items = Array.from(
      track.querySelectorAll<HTMLElement>(`.${itemStyles.item}`),
    );

    return items.map((item) => {
      const imageFrame = item.querySelector<HTMLElement>(
        `.${itemStyles.imageFrame}`,
      );

      return imageFrame ? item.offsetLeft + imageFrame.offsetLeft : null;
    });
  };

  const handleGalleryClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const leadingSpace = leadingSpaceRef.current;

    if (!track || !leadingSpace) return;

    // No interpretar como navegación un clic generado por el teclado.
    if (event.detail === 0) return;

    // Evita navegar al terminar un arrastre.
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }

    const imageStarts = getImageStarts();

    if (imageStarts.length === 0) return;

    const activationContentX = track.scrollLeft + leadingSpace.offsetWidth / 2;

    let currentIndex = -1;
    let closestDistance = Infinity;

    imageStarts.forEach((imageStart, index) => {
      if (imageStart === null) return;

      const distance = Math.abs(imageStart - activationContentX);

      if (distance < closestDistance) {
        closestDistance = distance;
        currentIndex = index;
      }
    });

    if (currentIndex === -1) return;

    // Mitad izquierda: anterior. Mitad derecha: siguiente.
    const direction = event.clientX < window.innerWidth / 2 ? -1 : 1;

    const targetIndex = Math.max(
      0,
      Math.min(imageStarts.length - 1, currentIndex + direction),
    );

    if (targetIndex === currentIndex) return;

    const targetImageStart = imageStarts[targetIndex];

    if (targetImageStart === null) return;

    const targetScrollLeft = targetImageStart - leadingSpace.offsetWidth / 2;

    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    const clampedScrollLeft = Math.max(
      0,
      Math.min(maxScrollLeft, targetScrollLeft),
    );

    hasUserScrolledRef.current = true;

    animateScrollTo(clampedScrollLeft);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    if (navigationFrameRef.current !== null) {
      cancelAnimationFrame(navigationFrameRef.current);
      navigationFrameRef.current = null;
    }

    const delta = (event.deltaX || event.deltaY) * 0.45;
    if (delta === 0) return;

    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    const nextScrollLeft = Math.max(
      0,
      Math.min(maxScrollLeft, track.scrollLeft + delta),
    );

    if (nextScrollLeft !== track.scrollLeft) {
      hasUserScrolledRef.current = true;
      event.preventDefault();
      track.scrollLeft = nextScrollLeft;
    }
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    if (Math.abs(track.scrollLeft - lastScrollLeftRef.current) > 0.5) {
      hasUserScrolledRef.current = true;
    }

    lastScrollLeftRef.current = track.scrollLeft;
    scheduleExpansionUpdate();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const track = trackRef.current;
    if (!track) return;

    if (navigationFrameRef.current !== null) {
      cancelAnimationFrame(navigationFrameRef.current);
      navigationFrameRef.current = null;
    }

    didDragRef.current = false;

    dragRef.current = {
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
    };

    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;

    if (!drag || !track) return;

    const movement = event.clientX - drag.startX;

    if (Math.abs(movement) > 5) {
      didDragRef.current = true;
    }

    if (!didDragRef.current) return;

    const nextScrollLeft = drag.startScrollLeft - movement * 0.75;

    if (nextScrollLeft !== track.scrollLeft) {
      hasUserScrolledRef.current = true;
      track.scrollLeft = nextScrollLeft;
    }
  };

  const stopPointerDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const maxImageScale = 1 + 1.5 * Math.max(0, ...expansionProgress);

  return (
    <div className={styles.galleryWrapper}>
      <section className={styles.gallery} aria-label="Galería del proyecto">
        <div
          ref={trackRef}
          className={styles.track}
          style={
            {
              "--max-image-scale": maxImageScale,
            } as React.CSSProperties
          }
          tabIndex={0}
          onScroll={handleScroll}
          onWheel={handleWheel}
          onClick={handleGalleryClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopPointerDrag}
          onPointerCancel={stopPointerDrag}
        >
          <div
            ref={leadingSpaceRef}
            className={styles.leadingSpace}
            aria-hidden="true"
          />

          {images.map((image, index) => (
            <ProjectGalleryItem
              key={`${image.src}-${index}`}
              image={image}
              expansion={expansionProgress[index] ?? 0}
              onImageLoad={scheduleExpansionUpdate}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
