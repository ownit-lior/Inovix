"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

type ScrollSceneProps = {
  children: ReactNode;
  className?: string;
  /** Slight parallax drift while the section is in view */
  intensity?: number;
};

/**
 * Soft scroll-linked fade + lift for homepage sections.
 */
export default function ScrollScene({
  children,
  className = "",
  intensity = 1,
}: ScrollSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.82, 1],
    reduce ? [1, 1, 1, 1] : [0.35, 1, 1, 0.55],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    reduce
      ? [0, 0, 0, 0]
      : [36 * intensity, 0, 0, -22 * intensity],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    reduce ? [1, 1, 1, 1] : [0.985, 1, 1, 0.99],
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y, scale }}
    >
      {children}
    </motion.div>
  );
}
