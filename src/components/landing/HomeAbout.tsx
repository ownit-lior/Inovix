"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Magnetic from "@/components/effects/Magnetic";

const PILLARS = [
  {
    title: "שומעים לפני שמתקינים",
    desc: "כל פרויקט מתחיל בשיחה על איך אתם חיים בבית — ורק אחר כך בוחרים טכנולוגיה.",
  },
  {
    title: "גורם אחד לכל המערכות",
    desc: "אבטחה, תקשורת, אודיו וידאו ובית חכם מתוכננים יחד — בלי לקפוץ בין קבלנים.",
  },
  {
    title: "נשארים אחרי המסירה",
    desc: "הדרכה, תרחישים והרחבות כשהבית משתנה. לא מתקינים ונעלמים.",
  },
] as const;

export default function HomeAbout() {
  return (
    <section
      id="about"
      className="relative flex min-h-[85dvh] items-center py-20 sm:py-24 md:min-h-[90dvh] md:py-28"
    >
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
            הטכנולוגיה מאחורי הקלעים.
            <br className="hidden sm:block" />
            החוויה — בחזית.
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-[var(--lime)]/70" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            אנחנו ב־INOVIX מתכננים ומבצעים מערכות מתח נמוך לבתים ולעסקים —
            מהתשתית ועד התרחיש היומיומי. המטרה שלנו פשוטה: שקט תפעולי, עיצוב
            נקי, ושליטה שמרגישה טבעית — בלי עשר אפליקציות ובלי כאב ראש טכני.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            בין אם אתם בונים וילה חדשה או משדרגים בית קיים, אנחנו מתאימים את
            העומק והתקן לנכס — ומלווים אתכם עד שהכל עובד בדיוק כמו שצריך.
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
            להכיר את INOVIX
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
