"use client";

import { motion, useReducedMotion } from "framer-motion";

type AmbientOrbsProps = {
  className?: string;
};

export default function AmbientOrbs({ className = "" }: AmbientOrbsProps) {
  const reduce = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <motion.div
        className="absolute -top-24 -end-16 h-72 w-72 rounded-full bg-[var(--teal)]/25 blur-3xl"
        animate={
          reduce
            ? undefined
            : { x: [0, -28, 0], y: [0, 22, 0], scale: [1, 1.08, 1] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-28 -start-20 h-80 w-80 rounded-full bg-[var(--lime)]/18 blur-3xl"
        animate={
          reduce
            ? undefined
            : { x: [0, 24, 0], y: [0, -18, 0], scale: [1, 1.12, 1] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 start-1/3 h-40 w-40 -translate-y-1/2 rounded-full bg-[var(--tech-blue)]/20 blur-2xl"
        animate={
          reduce ? undefined : { opacity: [0.35, 0.65, 0.35], scale: [1, 1.15, 1] }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
