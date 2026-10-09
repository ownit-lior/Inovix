"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AmbientOrbs from "@/components/effects/AmbientOrbs";
import Magnetic from "@/components/effects/Magnetic";
import { IMAGES } from "@/lib/images";

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
      className="brand-section relative border-t border-white/5 py-16 sm:py-20 md:py-24"
    >
      <AmbientOrbs />
      <div className="film-grain" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-3 sm:gap-12 sm:px-4 md:grid-cols-2 md:gap-14 md:px-6 lg:px-8">
        <motion.div
          className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6] md:aspect-[4/5]"
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={IMAGES.about.team}
            alt="חלל מגורים יוקרתי — הטכנולוגיה משתלבת בעיצוב"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 45%, rgba(5,22,53,0.75) 100%)",
            }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 p-5 sm:p-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.55 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--lime-bright)] uppercase">
              INOVIX
            </p>
            <p className="mt-1 text-lg font-bold text-white sm:text-xl">
              ייעוץ · תכנון · ביצוע
            </p>
          </motion.div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--lime-bright)] uppercase sm:text-sm">
              אודות
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
              מומחים שמחברים טכנולוגיה לחיי הבית
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              INOVIX נולדה מתוך אמונה פשוטה: בית חכם לא נמדד במספר האפליקציות —
              אלא באיכות התכנון שמאחד אבטחה, תקשורת, אודיו־וידאו וחשמל חכם
              למערכת אחת שעובדת בשקט.
            </p>
          </motion.div>

          <ul className="mt-8 space-y-5">
            {PILLARS.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="border-r-2 border-[var(--lime)]/55 pr-4"
              >
                <h3 className="text-base font-bold text-white sm:text-lg">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-white/65">
                  {p.desc}
                </p>
              </motion.li>
            ))}
          </ul>

          <Magnetic className="mt-8 inline-block" strength={0.28}>
            <Link
              href="/about"
              className="brand-gradient-bg inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3.5 text-sm font-bold text-[var(--navy)] shadow-[0_12px_32px_rgba(126,211,33,0.28)] transition hover:brightness-110"
            >
              לאודות המלא
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
