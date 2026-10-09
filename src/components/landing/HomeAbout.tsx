"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AmbientOrbs from "@/components/effects/AmbientOrbs";
import Magnetic from "@/components/effects/Magnetic";

const PILLARS = [
  {
    title: "תכנון הנדסי",
    desc: "מערכות שמתחילות בתוכניות — לא בציוד מהמדף.",
  },
  {
    title: "אינטגרציה אחת",
    desc: "אבטחה, רשת, AV ובית חכם שעובדים יחד.",
  },
  {
    title: "ביצוע נקי",
    desc: "גימור אסתטי, תיעוד מסודר וליווי אחרי מסירה.",
  },
] as const;

export default function HomeAbout() {
  return (
    <section
      id="about"
      className="brand-section relative flex min-h-[85dvh] items-center border-t border-white/5 py-20 sm:py-24 md:min-h-[90dvh] md:py-28"
    >
      <AmbientOrbs />
      <div className="film-grain" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-3 text-center sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-[var(--lime-bright)] uppercase sm:text-sm">
            אודות INOVIX
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            מומחים שמחברים טכנולוגיה
            <br className="hidden sm:block" /> לחיי הבית
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-[var(--lime)]/70" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            INOVIX נולדה מתוך אמונה פשוטה: בית חכם לא נמדד במספר האפליקציות —
            אלא באיכות התכנון שמאחד אבטחה, תקשורת, אודיו־וידאו וחשמל חכם למערכת
            אחת שעובדת בשקט.
          </p>
        </motion.div>

        <ul className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 sm:mt-14 sm:grid-cols-3 sm:gap-6">
          {PILLARS.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="text-center"
            >
              <p className="text-xs font-bold tracking-[0.18em] text-[var(--teal)]">
                0{i + 1}
              </p>
              <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {p.desc}
              </p>
            </motion.li>
          ))}
        </ul>

        <Magnetic className="mt-12 inline-block sm:mt-14" strength={0.28}>
          <Link
            href="/about"
            className="brand-gradient-bg inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold text-[var(--navy)] shadow-[0_12px_32px_rgba(126,211,33,0.28)] transition hover:brightness-110"
          >
            לאודות המלא
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
