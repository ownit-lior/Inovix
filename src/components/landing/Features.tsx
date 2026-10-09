"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import AmbientOrbs from "@/components/effects/AmbientOrbs";
import SectionShapes from "@/components/effects/SectionShapes";
import { IMAGES } from "@/lib/images";

const FEATURES = [
  {
    href: "/services/smart-home",
    eyebrow: "בית חכם",
    title: "אינטגרציה מלאה מקצה לקצה",
    blurb: "תאורה, אקלים, תריסים ואבטחה — בממשק שליטה אחד.",
    image: IMAGES.services.smartHome,
    imageAlt: "סלון יוקרתי עם מערכת בית חכם משולבת",
  },
  {
    href: "/services/security",
    eyebrow: "אבטחה",
    title: "מעטפת הגנה חכמה",
    blurb: "מצלמות, אזעקה, אינטרקום ומנעולים — מסונכרנים יחד.",
    image: IMAGES.services.securityCameras,
    imageAlt: "מצלמת PTZ על חזית וילה יוקרתית",
  },
  {
    href: "/services/networking",
    eyebrow: "תקשורת",
    title: "רשת יציבה בכל חלל",
    blurb: "תשתית מקצועית שמחזיקה את כל המערכות בלי ניתוקים.",
    image: IMAGES.services.networkingHome,
    imageAlt: "נקודת גישה אלחוטית בתקרה בסלון וילה — כיסוי רשת יציב בכל חלל",
  },
  {
    href: "/services/av",
    eyebrow: "אודיו וידאו",
    title: "חוויית בידור יוקרתית",
    blurb: "קולנוע ביתי, שמע רב־חללי ומסכים שמשתלבים בעיצוב.",
    image: IMAGES.services.av,
    imageAlt: "חלל מגורים עם מערכת אודיו וידאו אדריכלית",
  },
] as const;

export default function Features() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 28,
    mass: 0.35,
  });
  const [active, setActive] = useState(0);
  const count = FEATURES.length;

  useMotionValueEvent(smooth, "change", (v) => {
    if (reduce) return;
    const idx = Math.min(count - 1, Math.max(0, Math.floor(v * count)));
    setActive(idx);
  });

  if (reduce) {
    return (
      <section
        id="features"
        className="brand-section section-seam-y py-16 sm:py-20"
      >
        <div className="relative mx-auto max-w-6xl px-3 sm:px-4">
          <p className="text-center text-xs font-semibold tracking-[0.2em] text-[var(--lime-bright)] uppercase">
            מה אנחנו עושים
          </p>
          <h2 className="mt-3 text-center text-3xl font-extrabold text-white">
            ייעוץ, תכנון וביצוע — מקצה לקצה
          </h2>
          <div className="mt-10 space-y-4">
            {FEATURES.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="relative block aspect-[16/9] overflow-hidden"
              >
                <Image src={f.image} alt={f.imageAlt} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-[var(--navy)]/55" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div>
                    <p className="text-xs text-[var(--lime-bright)]">{f.eyebrow}</p>
                    <h3 className="text-xl font-extrabold text-white">{f.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative bg-[var(--navy)]"
      style={{ height: `${count * 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-x-clip overflow-y-hidden">
        <AmbientOrbs />
        <SectionShapes variant="mixed" />
        <div className="film-grain" aria-hidden />
        <div className="section-seam-top" aria-hidden />
        <div className="section-seam-bottom" aria-hidden />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-3 sm:px-4 md:grid-cols-[1fr_1.15fr] md:gap-12 md:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[var(--lime-bright)] uppercase sm:text-sm">
              מה אנחנו עושים
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
              ייעוץ, תכנון וביצוע — מקצה לקצה
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              גוללים למטה — כל תחום מתהפך ונכנס לפוקוס.
            </p>

            <ul className="mt-8 space-y-2">
              {FEATURES.map((f, i) => (
                <li key={f.href}>
                  <button
                    type="button"
                    onClick={() => {
                      const el = containerRef.current;
                      if (!el) return;
                      const top =
                        el.getBoundingClientRect().top +
                        window.scrollY +
                        (i / count) * el.offsetHeight +
                        4;
                      window.scrollTo({ top, behavior: "smooth" });
                    }}
                    className={[
                      "w-full border-r-2 pr-3 text-right transition",
                      i === active
                        ? "border-[var(--lime)] text-white"
                        : "border-white/15 text-white/45 hover:text-white/75",
                    ].join(" ")}
                  >
                    <span className="text-xs font-semibold tracking-wide">
                      {f.eyebrow}
                    </span>
                    <span className="mt-0.5 block text-sm font-bold sm:text-base">
                      {f.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Flip stage */}
          <div className="relative mx-auto w-full max-w-xl [perspective:1400px]">
            <div className="relative aspect-[16/10] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={FEATURES[active].href}
                  className="absolute inset-0 origin-center"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ rotateX: 78, opacity: 0, y: 40 }}
                  animate={{ rotateX: 0, opacity: 1, y: 0 }}
                  exit={{ rotateX: -78, opacity: 0, y: -40 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={FEATURES[active].href}
                    className="shine-on-hover group relative block h-full overflow-hidden rounded-sm"
                  >
                    <Image
                      src={FEATURES[active].image}
                      alt={FEATURES[active].imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      priority={active === 0}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(5,22,53,0.15) 0%, rgba(5,22,53,0.55) 55%, rgba(5,22,53,0.88) 100%)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                      <p className="text-xs font-semibold tracking-[0.16em] text-[var(--lime-bright)] sm:text-sm">
                        {FEATURES[active].eyebrow}
                      </p>
                      <h3 className="mt-1.5 text-xl font-extrabold text-white sm:text-2xl md:text-3xl">
                        {FEATURES[active].title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm text-white/75">
                        {FEATURES[active].blurb}
                      </p>
                      <p className="mt-4 text-sm font-semibold text-white/80 transition group-hover:text-[var(--lime-bright)]">
                        לפרטים ←
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-4 text-center text-xs text-white/40">
              {active + 1} / {count} — המשיכו לגלול למטה
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
