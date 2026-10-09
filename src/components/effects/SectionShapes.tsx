"use client";

import { motion, useReducedMotion } from "framer-motion";

type SectionShapesProps = {
  variant?: "teal" | "lime" | "mixed";
  className?: string;
};

/** Soft geometric accents for transition blocks — vertical motion only. */
export default function SectionShapes({
  variant = "mixed",
  className = "",
}: SectionShapesProps) {
  const reduce = useReducedMotion();
  const a =
    variant === "lime"
      ? "bg-[var(--lime)]/20"
      : variant === "teal"
        ? "bg-[var(--teal)]/25"
        : "bg-[var(--teal)]/22";
  const b =
    variant === "lime"
      ? "border-[var(--lime)]/35"
      : "border-[var(--lime)]/30";

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <motion.div
        className={`absolute -top-16 start-[8%] h-40 w-40 rounded-full blur-2xl ${a}`}
        animate={reduce ? undefined : { y: [0, 28, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute top-[35%] end-[6%] h-24 w-24 rotate-45 border ${b}`}
        animate={reduce ? undefined : { y: [0, -22, 0], rotate: [45, 55, 45] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[12%] start-[18%] h-3 w-3 rounded-full bg-[var(--lime-bright)]/50"
        animate={reduce ? undefined : { y: [0, -40, 0], opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[22%] end-[22%] h-16 w-16 rounded-full border border-white/10"
        animate={reduce ? undefined : { y: [0, 18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg
        className="absolute top-[18%] end-[14%] h-28 w-28 text-[var(--lime)]/15"
        viewBox="0 0 100 100"
        fill="none"
      >
        <motion.path
          d="M10 70 C30 20, 70 20, 90 70"
          stroke="currentColor"
          strokeWidth="2"
          animate={reduce ? undefined : { pathLength: [0.2, 1, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
