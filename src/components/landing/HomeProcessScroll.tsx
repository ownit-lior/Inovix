"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import AmbientOrbs from "@/components/effects/AmbientOrbs";
import SectionShapes from "@/components/effects/SectionShapes";

const STEPS = [
  {
    num: "01",
    title: "שיחת ייעוץ",
    subtitle: "מבינים את אורח החיים והחזון",
    body: "נשמע את הצרכים של הבית או העסק — מה חשוב לכם באבטחה, בנוחות ובבידור — ונגדיר יחד את היעדים.",
  },
  {
    num: "02",
    title: "סיור / תוכניות",
    subtitle: "רואים את הנכס כמו שהוא באמת",
    body: "סיור בשטח או סקירת תוכניות אדריכל. ממפים נקודות תורפה, חללים פעילים ותשתיות קיימות.",
  },
  {
    num: "03",
    title: "תכנון מערכות",
    subtitle: "תוכנית מדויקת לפני ציוד",
    body: "בונים מפרט מלא: רשת, אבטחה, אודיו וידאו ובית חכם — כולל מיקומים, תרחישים וחלוקת רשתות.",
  },
  {
    num: "04",
    title: "הצעת מחיר",
    subtitle: "שקיפות מלאה, בלי הפתעות",
    body: "הצעה מפורטת לפי רכיבים ועבודות. אתם יודעים בדיוק מה כלול — ומה אפשר בשלבים.",
  },
  {
    num: "05",
    title: "ביצוע בשטח",
    subtitle: "התקנה נקייה ותיאום מול כולם",
    body: "עבודה מסודרת מול אדריכל, חשמלאי וקבלן. גימור אסתטי, עמידה בלוחות זמנים, בלי בלגן.",
  },
  {
    num: "06",
    title: "מסירה והדרכה",
    subtitle: "אתם בשליטה — ואנחנו נשארים",
    body: "בדיקות מערכת, הדרכה למשתמשים ותרחישים מוכנים. ליווי גם אחרי שמקבלים את המפתח.",
  },
] as const;

export default function HomeProcessScroll() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });

  const [active, setActive] = useState(0);
  const stepCount = STEPS.length;

  useMotionValueEvent(smooth, "change", (v) => {
    if (reduce) return;
    const idx = Math.min(
      stepCount - 1,
      Math.max(0, Math.floor(v * stepCount + 0.001)),
    );
    setActive(idx);
  });

  const progressScale = useTransform(smooth, [0, 1], [0, 1]);

  /** For reduced motion: stack steps normally */
  if (reduce) {
    return (
      <section
        id="process"
        className="brand-section py-16 sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-3 sm:px-4">
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--lime-bright)] uppercase">
            תהליך העבודה
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-white">
            משלב לשלב — עד מערכת חיה
          </h2>
          <ol className="mt-10 space-y-8">
            {STEPS.map((s) => (
              <li key={s.num} className="border-r-2 border-[var(--lime)]/50 pr-4">
                <p className="text-sm font-bold text-[var(--lime-bright)]">
                  {s.num}
                </p>
                <h3 className="mt-1 text-xl font-extrabold text-white">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--lime)]/90">{s.subtitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-[var(--navy)]"
      style={{ height: `${stepCount * 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-x-clip overflow-y-hidden">
        <AmbientOrbs className="opacity-80" />
        <SectionShapes variant="mixed" />
        <div className="film-grain" aria-hidden />
        <div className="section-seam-top" aria-hidden />
        <div className="section-seam-bottom" aria-hidden />

        {/* Vertical progress rail (top → bottom) */}
        <div
          className="pointer-events-none absolute start-3 top-[18%] bottom-[18%] z-20 w-[3px] rounded-full bg-white/10 sm:start-6"
          aria-hidden
        >
          <motion.div
            className="w-full origin-top rounded-full"
            style={{
              scaleY: progressScale,
              height: "100%",
              background:
                "linear-gradient(180deg, #7ed321 0%, #3db89a 50%, #2a7a9b 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center gap-6 px-3 ps-8 sm:gap-10 sm:px-4 sm:ps-12 md:gap-14 md:px-6 md:ps-14 lg:px-8">
          {/* Vertical step dots — always column */}
          <div className="flex shrink-0 flex-col items-center gap-3">
            {STEPS.map((s, i) => (
              <button
                key={s.num}
                type="button"
                aria-label={`שלב ${s.num}: ${s.title}`}
                aria-current={i === active ? "step" : undefined}
                className={[
                  "h-2.5 w-2.5 rounded-full transition-all duration-300 sm:h-3 sm:w-3",
                  i === active
                    ? "scale-125 bg-[var(--lime)] shadow-[0_0_16px_rgba(126,211,33,0.55)]"
                    : i < active
                      ? "bg-[var(--teal)]"
                      : "bg-white/25",
                ].join(" ")}
                onClick={() => {
                  const el = containerRef.current;
                  if (!el) return;
                  const top =
                    el.getBoundingClientRect().top +
                    window.scrollY +
                    (i / stepCount) * el.offsetHeight +
                    8;
                  window.scrollTo({ top, behavior: "smooth" });
                }}
              />
            ))}
          </div>

          <div className="relative min-h-[22rem] flex-1 sm:min-h-[24rem] md:min-h-[26rem]">
            <p className="text-xs font-semibold tracking-[0.22em] text-[var(--lime-bright)] uppercase sm:text-sm">
              תהליך העבודה
            </p>
            <h2 className="mt-2 max-w-xl text-2xl font-extrabold text-white/90 sm:text-3xl md:text-4xl">
              גוללים למטה בין השלבים — מהייעוץ עד המסירה
            </h2>

            <div className="relative mt-8 min-h-[14rem] sm:mt-10 sm:min-h-[15rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={STEPS[active].num}
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -48 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 top-0"
                >
                  <p className="text-[4.5rem] font-extrabold leading-none tracking-tight text-white/[0.08] sm:text-[6rem] md:text-[7.5rem]">
                    {STEPS[active].num}
                  </p>
                  <div className="-mt-8 sm:-mt-10 md:-mt-12">
                    <h3 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
                      {STEPS[active].title}
                    </h3>
                    <p className="mt-2 text-base font-semibold text-[var(--lime-bright)] sm:text-lg">
                      {STEPS[active].subtitle}
                    </p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/72 sm:text-base md:text-lg">
                      {STEPS[active].body}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-6 text-xs text-white/40 sm:mt-8">
              שלב {active + 1} מתוך {stepCount} — המשיכו לגלול
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
