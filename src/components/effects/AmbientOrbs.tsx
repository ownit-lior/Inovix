"use client";

import { motion, useReducedMotion } from "framer-motion";

type AmbientOrbsProps = {
  className?: string;
};

/** Soft teal/lime washes distributed along the full page canvas — never section-bound. */
export default function AmbientOrbs({ className = "" }: AmbientOrbsProps) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <motion.div
        className="absolute top-[4%] -end-16 h-72 w-72 rounded-full bg-[var(--teal)]/20 blur-3xl"
        animate={
          reduce
            ? undefined
            : { x: [0, -28, 0], y: [0, 22, 0], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[22%] -start-20 h-64 w-64 rounded-full bg-[var(--lime)]/14 blur-3xl"
        animate={
          reduce
            ? undefined
            : { x: [0, 24, 0], y: [0, -18, 0], scale: [1, 1.1, 1] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] end-[10%] h-48 w-48 rounded-full bg-[var(--tech-blue)]/16 blur-3xl"
        animate={
          reduce ? undefined : { opacity: [0.3, 0.55, 0.3], scale: [1, 1.12, 1] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[58%] -start-16 h-72 w-72 rounded-full bg-[var(--teal)]/18 blur-3xl"
        animate={
          reduce
            ? undefined
            : { x: [0, 18, 0], y: [0, 20, 0], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[76%] end-[-2rem] h-64 w-64 rounded-full bg-[var(--lime)]/12 blur-3xl"
        animate={
          reduce
            ? undefined
            : { x: [0, -20, 0], y: [0, -14, 0], scale: [1, 1.1, 1] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[92%] start-[20%] h-56 w-56 rounded-full bg-[var(--teal)]/16 blur-3xl"
        animate={
          reduce ? undefined : { opacity: [0.28, 0.5, 0.28] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
