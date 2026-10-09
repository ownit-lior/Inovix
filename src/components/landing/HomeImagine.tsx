"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const BEATS = [
  {
    eyebrow: "דמיינו",
    lines: ["בית שעובד בשבילכם", "לא אתם בשבילו"],
  },
  {
    eyebrow: "תכנון",
    lines: ["אבטחה, רשת, אודיו וידאו ובית חכם", "מערכת אחת. חוויה אחת."],
  },
  {
    eyebrow: "ביצוע",
    lines: ["מהייעוץ ועד המסירה", "דיוק, אסתטיקה ושקט תפעולי"],
  },
  {
    eyebrow: "INOVIX",
    lines: ["ייעוץ · תכנון · ביצוע", "טכנולוגיה שנעלמת — ונשארת חוויה"],
  },
] as const;

/**
 * Ginnie-style sticky text scrub — tall scroll, one sticky viewport,
 * sentences morph as you scroll.
 */
export default function HomeImagine() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.3,
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(smooth, "change", (v) => {
    if (reduce) return;
    const idx = Math.min(
      BEATS.length - 1,
      Math.max(0, Math.floor(v * BEATS.length)),
    );
    setActive(idx);
  });

  if (reduce) {
    return (
      <section className="brand-section py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          {BEATS.map((b) => (
            <div key={b.eyebrow} className="mb-10 last:mb-0">
              <p className="text-sm text-[var(--lime-bright)]">{b.eyebrow}</p>
              {b.lines.map((l) => (
                <p key={l} className="text-2xl font-extrabold text-white">
                  {l}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${BEATS.length * 100}vh` }}
      aria-label="חוויית INOVIX"
    >
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-x-clip overflow-y-hidden">

        {/* Vertical beat indicators */}
        <div
          className="absolute start-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2.5 sm:start-8"
          aria-hidden
        >
          {BEATS.map((_, i) => (
            <span
              key={i}
              className={[
                "w-1 rounded-full transition-all duration-300",
                i === active ? "h-8 bg-[var(--lime)]" : "h-3 bg-white/25",
              ].join(" ")}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={BEATS[active].eyebrow}
              initial={{ opacity: 0, y: 56 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -56 }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm font-semibold tracking-[0.28em] text-[var(--lime-bright)] uppercase sm:text-base">
                {BEATS[active].eyebrow}
              </p>
              <div className="mt-5 space-y-2 sm:mt-6 sm:space-y-3">
                {BEATS[active].lines.map((line, i) => (
                  <p
                    key={line}
                    className={
                      i === 0
                        ? "text-3xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl"
                        : "text-xl font-medium leading-snug text-white/70 sm:text-3xl md:text-4xl"
                    }
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
