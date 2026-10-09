"use client";

import { motion, useReducedMotion } from "framer-motion";
import AmbientOrbs from "@/components/effects/AmbientOrbs";
import SectionShapes from "@/components/effects/SectionShapes";

/**
 * Full-page special background effects for the homepage.
 * Mounted once on .page-canvas so blocks stay seamless.
 */
export default function PageAtmosphere() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* Soft aurora wash — continuous, no hard edges */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-90"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 90% 50% at 80% 8%, rgba(42,146,155,0.22), transparent 55%), radial-gradient(ellipse 70% 45% at 10% 35%, rgba(126,211,33,0.1), transparent 50%), radial-gradient(ellipse 80% 50% at 70% 55%, rgba(42,122,155,0.16), transparent 55%), radial-gradient(ellipse 75% 40% at 20% 78%, rgba(126,211,33,0.09), transparent 50%), radial-gradient(ellipse 60% 35% at 85% 92%, rgba(42,146,155,0.14), transparent 48%)",
        }}
      />

      <AmbientOrbs />
      <SectionShapes variant="mixed" />

      {/* Floating geometric accents along the scroll */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <motion.div
          className="absolute top-[12%] start-[6%] h-20 w-20 rotate-45 border border-[var(--lime)]/25"
          animate={reduce ? undefined : { y: [0, 24, 0], rotate: [45, 52, 45], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[30%] end-[8%] h-3 w-3 rounded-full bg-[var(--lime-bright)]/45"
          animate={reduce ? undefined : { y: [0, -36, 0], opacity: [0.25, 0.85, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[48%] start-[12%] h-28 w-28 rounded-full border border-white/10"
          animate={reduce ? undefined : { y: [0, 18, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[62%] end-[14%] h-16 w-16 rotate-12 border border-[var(--teal)]/30"
          animate={reduce ? undefined : { y: [0, -20, 0], rotate: [12, 22, 12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[78%] start-[22%] h-2.5 w-2.5 rounded-full bg-[var(--teal)]/50"
          animate={reduce ? undefined : { y: [0, -28, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <svg
          className="absolute top-[18%] end-[18%] h-32 w-32 text-[var(--lime)]/18"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.path
            d="M10 70 C30 20, 70 20, 90 70"
            stroke="currentColor"
            strokeWidth="2"
            animate={reduce ? undefined : { pathLength: [0.15, 1, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        <svg
          className="absolute top-[70%] start-[8%] h-24 w-24 text-[var(--teal)]/20"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="28"
            stroke="currentColor"
            strokeWidth="1.5"
            animate={reduce ? undefined : { pathLength: [0.2, 0.95, 0.2], rotate: [0, 90, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Slow light sweep for presence */}
      {!reduce ? (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[40vh] opacity-[0.12]"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(126,211,33,0.35) 50%, transparent 70%)",
          }}
          animate={{ x: ["-40%", "120%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
          aria-hidden
        />
      ) : null}

      <div className="film-grain" aria-hidden />
    </>
  );
}
